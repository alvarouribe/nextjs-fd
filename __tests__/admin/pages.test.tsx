import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import AdminLoginPage from '../../src/app/admin/login/page';
import AdminPage from '../../src/app/admin/page';

const getAdminSession = jest.fn();
const redirect = jest.fn((path: string) => {
  throw new Error(`NEXT_REDIRECT to ${path}`);
});

jest.mock('../../src/app/utils/admin-session', () => ({
  getAdminSession: () => getAdminSession(),
}));

jest.mock('next/navigation', () => ({
  redirect: (path: string) => redirect(path),
  useRouter: () => ({ push: jest.fn(), refresh: jest.fn() }),
}));

jest.mock('../../src/hooks/useFlashMessages', () => ({
  __esModule: true,
  default: () => ({ addFlashMessage: jest.fn() }),
}));

describe('Admin server pages', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    redirect.mockImplementation((path: string) => {
      throw new Error(`NEXT_REDIRECT to ${path}`);
    });
  });

  it('redirects anonymous visitors from /admin to the login page', async () => {
    getAdminSession.mockResolvedValue(null);

    await expect(AdminPage()).rejects.toThrow('NEXT_REDIRECT');
    expect(redirect).toHaveBeenCalledWith('/admin/login');
  });

  it('renders the dashboard for a signed-in admin', async () => {
    getAdminSession.mockResolvedValue({
      email: 'admin@example.com',
      expiresAt: 1_700_000_000_000,
    });

    render(await AdminPage());

    expect(screen.getByTestId('admin-page')).toBeInTheDocument();
    expect(screen.getByText('admin@example.com')).toBeInTheDocument();
    expect(redirect).not.toHaveBeenCalled();
  });

  it('renders the login form for anonymous visitors', async () => {
    getAdminSession.mockResolvedValue(null);

    render(await AdminLoginPage());

    expect(screen.getByTestId('admin-login-page')).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(redirect).not.toHaveBeenCalled();
  });

  it('redirects an already signed-in admin away from the login page', async () => {
    getAdminSession.mockResolvedValue({
      email: 'admin@example.com',
      expiresAt: 1_700_000_000_000,
    });

    await expect(AdminLoginPage()).rejects.toThrow('NEXT_REDIRECT');
    expect(redirect).toHaveBeenCalledWith('/admin');
  });
});
