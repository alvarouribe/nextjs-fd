import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import AdminLoginForm from '../../src/components/admin/AdminLoginForm';

const addFlashMessage = jest.fn();
const push = jest.fn();
const refresh = jest.fn();

jest.mock('../../src/hooks/useFlashMessages', () => ({
  __esModule: true,
  default: () => ({ addFlashMessage }),
}));

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push, refresh }),
}));

describe('AdminLoginForm', () => {
  const fetchMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (global.fetch as unknown as jest.Mock) = fetchMock;
  });

  const fillIn = (email: string, password: string) => {
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: email },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: password },
    });
  };

  const submit = () => fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

  it('shows an error and focuses email when it is empty', () => {
    render(<AdminLoginForm />);

    submit();

    expect(addFlashMessage).toHaveBeenCalledWith({
      type: 'error',
      message: 'Please enter your email address.',
    });
    expect(screen.getByLabelText(/email/i)).toHaveFocus();
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('shows an error and focuses password when it is empty', () => {
    render(<AdminLoginForm />);

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'admin@example.com' },
    });
    submit();

    expect(addFlashMessage).toHaveBeenCalledWith({
      type: 'error',
      message: 'Please enter your password.',
    });
    expect(screen.getByLabelText(/password/i)).toHaveFocus();
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('posts the credentials and redirects to the dashboard on success', async () => {
    fetchMock.mockResolvedValue({
      ok: true,
      json: async () => ({ success: true }),
    });

    render(<AdminLoginForm />);
    fillIn('admin@example.com', '1234');
    submit();

    await waitFor(() =>
      expect(fetchMock).toHaveBeenCalledWith('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: 'admin@example.com', password: '1234' }),
      })
    );

    await waitFor(() => expect(push).toHaveBeenCalledWith('/admin'));
    expect(refresh).toHaveBeenCalled();
  });

  it('surfaces the server error message on failure', async () => {
    fetchMock.mockResolvedValue({
      ok: false,
      json: async () => ({ success: false, error: 'Invalid email or password.' }),
    });

    render(<AdminLoginForm />);
    fillIn('admin@example.com', 'wrong');
    submit();

    await waitFor(() =>
      expect(addFlashMessage).toHaveBeenCalledWith({
        type: 'error',
        message: 'Invalid email or password.',
      })
    );
    expect(push).not.toHaveBeenCalled();
  });

  it('shows a generic error when the request throws', async () => {
    fetchMock.mockRejectedValue(new Error('offline'));
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});

    render(<AdminLoginForm />);
    fillIn('admin@example.com', '1234');
    submit();

    await waitFor(() =>
      expect(addFlashMessage).toHaveBeenCalledWith({
        type: 'error',
        message: 'Something went wrong. Please try again.',
      })
    );

    consoleError.mockRestore();
  });
});
