import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import AdminLoginPage from '../../src/app/admin/login/page';
import AdminPage from '../../src/app/admin/page';

const auth = jest.fn();
// Mirrors the real `redirect`, which throws to unwind the render.
const redirect = jest.fn((path: string): never => {
  throw new Error(`NEXT_REDIRECT:${path}`);
});

jest.mock('../../src/auth', () => ({
  auth: () => auth(),
}));

jest.mock('next/navigation', () => ({
  redirect: (path: string) => redirect(path),
}));

jest.mock('../../src/components/admin/AdminSignOutButton', () => ({
  __esModule: true,
  default: () => <button data-test="admin-sign-out">Sign out</button>,
}));

jest.mock('../../src/components/admin/AdminLoginForm', () => ({
  __esModule: true,
  default: ({ callbackUrl }: { callbackUrl?: string }) => (
    <form data-test="admin-login-form">callback:{callbackUrl}</form>
  ),
}));

const session = { user: { email: 'admin@flyingdolly.co.nz' } };

describe('Admin dashboard page', () => {
  beforeEach(() => jest.clearAllMocks());

  it('redirects to the login page when there is no session', async () => {
    auth.mockResolvedValue(null);

    await expect(AdminPage()).rejects.toThrow('NEXT_REDIRECT');
    expect(redirect).toHaveBeenCalledWith('/admin/login');
  });

  it('redirects when the session has no user', async () => {
    auth.mockResolvedValue({});

    await expect(AdminPage()).rejects.toThrow('NEXT_REDIRECT');
    expect(redirect).toHaveBeenCalledWith('/admin/login');
  });

  it('renders the dashboard for a signed-in admin', async () => {
    auth.mockResolvedValue(session);

    render(await AdminPage());

    expect(screen.getByTestId('admin-page')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /admin dashboard/i })).toBeInTheDocument();
    expect(screen.getByText('admin@flyingdolly.co.nz')).toBeInTheDocument();
    expect(screen.getByTestId('admin-sign-out')).toBeInTheDocument();
    expect(redirect).not.toHaveBeenCalled();
  });

  it('is kept out of search results', async () => {
    const { metadata } = await import('../../src/app/admin/page');

    expect(metadata.robots).toEqual({ index: false, follow: false });
  });
});

describe('Admin login page', () => {
  beforeEach(() => jest.clearAllMocks());

  it('renders the sign-in form for a signed-out visitor', async () => {
    auth.mockResolvedValue(null);

    render(await AdminLoginPage({}));

    expect(screen.getByTestId('admin-login-form')).toBeInTheDocument();
    expect(redirect).not.toHaveBeenCalled();
  });

  it('sends an already signed-in admin straight to the dashboard', async () => {
    auth.mockResolvedValue(session);

    await expect(AdminLoginPage({})).rejects.toThrow('NEXT_REDIRECT');
    expect(redirect).toHaveBeenCalledWith('/admin');
  });

  it('passes a relative callback url through to the form', async () => {
    auth.mockResolvedValue(null);

    render(
      await AdminLoginPage({
        searchParams: Promise.resolve({ callbackUrl: '/admin/reports' }),
      })
    );

    expect(screen.getByTestId('admin-login-form')).toHaveTextContent('callback:/admin/reports');
  });

  // The proxy always hands the login page an absolute url for the blocked route.
  it('keeps the path of a same-site absolute callback url', async () => {
    auth.mockResolvedValue(null);

    render(
      await AdminLoginPage({
        searchParams: Promise.resolve({
          callbackUrl: 'http://localhost:3000/admin/reports?tab=leads',
        }),
      })
    );

    expect(screen.getByTestId('admin-login-form')).toHaveTextContent(
      'callback:/admin/reports?tab=leads'
    );
  });

  it('strips the host from an off-site callback url so it cannot open-redirect', async () => {
    auth.mockResolvedValue(null);

    render(
      await AdminLoginPage({
        searchParams: Promise.resolve({ callbackUrl: 'https://evil.test/admin' }),
      })
    );

    expect(screen.getByTestId('admin-login-form')).toHaveTextContent('callback:/admin');
  });

  it('refuses a protocol-relative callback url', async () => {
    auth.mockResolvedValue(null);

    render(
      await AdminLoginPage({
        searchParams: Promise.resolve({ callbackUrl: '//evil.test' }),
      })
    );

    expect(screen.getByTestId('admin-login-form')).toHaveTextContent('callback:/admin');
  });

  it('refuses a callback url that points outside the admin area', async () => {
    auth.mockResolvedValue(null);

    render(
      await AdminLoginPage({
        searchParams: Promise.resolve({ callbackUrl: '/photography' }),
      })
    );

    expect(screen.getByTestId('admin-login-form')).toHaveTextContent('callback:/admin');
  });

  it('falls back to the dashboard when no callback url is given', async () => {
    auth.mockResolvedValue(null);

    render(await AdminLoginPage({ searchParams: Promise.resolve({}) }));

    expect(screen.getByTestId('admin-login-form')).toHaveTextContent('callback:/admin');
  });
});
