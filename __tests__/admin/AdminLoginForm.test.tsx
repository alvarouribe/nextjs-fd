import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import AdminLoginForm from '../../src/components/admin/AdminLoginForm';

const signIn = jest.fn();
const replace = jest.fn();
const refresh = jest.fn();
const addFlashMessage = jest.fn();

jest.mock('next-auth/react', () => ({
  signIn: (...args: unknown[]) => signIn(...args),
}));

jest.mock('next/navigation', () => ({
  useRouter: () => ({ replace, refresh }),
}));

jest.mock('../../src/hooks/useFlashMessages', () => ({
  __esModule: true,
  default: () => ({ addFlashMessage }),
}));

const fillAndSubmit = (
  email: string | null = 'admin@flyingdolly.co.nz',
  password: string | null = 'secret'
) => {
  if (email !== null) {
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: email },
    });
  }

  if (password !== null) {
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: password },
    });
  }

  fireEvent.click(screen.getByRole('button', { name: /sign in/i }));
};

describe('AdminLoginForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('signs in with the typed credentials without letting NextAuth redirect', async () => {
    signIn.mockResolvedValue({ ok: true, error: undefined });

    render(<AdminLoginForm />);
    fillAndSubmit();

    await waitFor(() => {
      expect(signIn).toHaveBeenCalledWith('credentials', {
        email: 'admin@flyingdolly.co.nz',
        password: 'secret',
        redirect: false,
      });
    });
  });

  it('trims the email before submitting it', async () => {
    signIn.mockResolvedValue({ ok: true, error: undefined });

    render(<AdminLoginForm />);
    fillAndSubmit('  admin@flyingdolly.co.nz  ');

    await waitFor(() => {
      expect(signIn).toHaveBeenCalledWith(
        'credentials',
        expect.objectContaining({ email: 'admin@flyingdolly.co.nz' })
      );
    });
  });

  it('navigates to the callback url on success', async () => {
    signIn.mockResolvedValue({ ok: true, error: undefined });

    render(<AdminLoginForm callbackUrl="/admin/reports" />);
    fillAndSubmit();

    await waitFor(() => expect(replace).toHaveBeenCalledWith('/admin/reports'));
    expect(refresh).toHaveBeenCalled();
  });

  it('shows a generic error and clears the password when credentials are rejected', async () => {
    signIn.mockResolvedValue({ ok: false, error: 'CredentialsSignin' });

    render(<AdminLoginForm />);
    fillAndSubmit();

    const error = await screen.findByTestId('admin-login-error');
    expect(error).toHaveTextContent('That email and password combination did not work.');
    // Never hint at which half was wrong.
    expect(error).not.toHaveTextContent(/password is|email is|no such user/i);
    expect(replace).not.toHaveBeenCalled();
    expect(screen.getByLabelText(/password/i)).toHaveValue('');
  });

  it('does not call signIn when a field is empty', async () => {
    render(<AdminLoginForm />);
    fillAndSubmit('admin@flyingdolly.co.nz', null);

    expect(signIn).not.toHaveBeenCalled();
    expect(await screen.findByTestId('admin-login-error')).toHaveTextContent(
      'Please enter both your email and password.'
    );
  });

  it('recovers when signIn throws', async () => {
    signIn.mockRejectedValue(new Error('network down'));

    render(<AdminLoginForm />);
    fillAndSubmit();

    expect(await screen.findByTestId('admin-login-error')).toHaveTextContent(
      'Could not sign you in right now. Please try again.'
    );
    expect(screen.getByRole('button', { name: /sign in/i })).not.toBeDisabled();
  });
});
