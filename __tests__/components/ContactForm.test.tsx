import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import ContactForm from '../../src/components/ContactForm';

const addFlashMessage = jest.fn();
const checkEmailLimitCookie = jest.fn();
const setEmailLimitCookie = jest.fn();

jest.mock('../../src/hooks/useFlashMessages', () => ({
  __esModule: true,
  default: () => ({ addFlashMessage }),
}));

jest.mock('../../src/app/utils/cookies-functions', () => ({
  setEmailLimitCookie: (...args: unknown[]) => setEmailLimitCookie(...args),
  checkEmailLimitCookie: (...args: unknown[]) => checkEmailLimitCookie(...args),
}));

describe('ContactForm', () => {
  const fetchMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    checkEmailLimitCookie.mockReturnValue(false);
    (global.fetch as unknown as jest.Mock) = fetchMock;
  });

  it('shows a validation error when email is empty', () => {
    render(<ContactForm />);

    fireEvent.click(screen.getByRole('button', { name: /let's talk/i }));

    expect(addFlashMessage).toHaveBeenCalledWith({
      type: 'error',
      message: 'Please fill in your Email so we can contact you.',
    });
    expect(screen.getByLabelText(/email/i)).toHaveFocus();
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('shows a validation error when message is empty', () => {
    render(<ContactForm />);

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'user@example.com' },
    });
    fireEvent.click(screen.getByRole('button', { name: /let's talk/i }));

    expect(addFlashMessage).toHaveBeenCalledWith({
      type: 'error',
      message: 'Please fill the Message field so we can assist you better.',
    });
    expect(screen.getByLabelText(/message/i)).toHaveFocus();
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('shows a validation error when email format is invalid', () => {
    render(<ContactForm />);

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'not-an-email' },
    });
    fireEvent.change(screen.getByLabelText(/message/i), {
      target: { value: 'Hello' },
    });

    fireEvent.click(screen.getByRole('button', { name: /let's talk/i }));

    expect(addFlashMessage).toHaveBeenCalledWith({
      type: 'error',
      message: 'Please enter a valid email address.',
    });
    expect(screen.getByLabelText(/email/i)).toHaveFocus();
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('submits successfully and locks the form', async () => {
    fetchMock.mockResolvedValue({
      json: async () => ({ success: true }),
    });

    render(<ContactForm />);

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'user@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/message/i), {
      target: { value: 'I need a website.' },
    });

    fireEvent.click(screen.getByRole('button', { name: /let's talk/i }));

    await waitFor(() =>
      expect(addFlashMessage).toHaveBeenCalledWith({
        type: 'success',
        message: 'Your message has been sent successfully!',
      })
    );

    expect(fetchMock).toHaveBeenCalledWith('/api/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstName: '',
        lastName: '',
        email: 'user@example.com',
        message: 'I need a website.',
      }),
    });
    expect(setEmailLimitCookie).toHaveBeenCalledWith(60);
    expect(screen.getByText('Thank you for your message!')).toBeInTheDocument();
  });

  it('shows an error message when the API returns an unsuccessful response', async () => {
    fetchMock.mockResolvedValue({
      json: async () => ({ success: false, error: 'smtp failure' }),
    });

    render(<ContactForm />);

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'user@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/message/i), {
      target: { value: 'Hello' },
    });
    fireEvent.click(screen.getByRole('button', { name: /let's talk/i }));

    await waitFor(() =>
      expect(addFlashMessage).toHaveBeenCalledWith({
        type: 'error',
        message:
          'There was an error sending your message. Please try again later.',
      })
    );
    expect(setEmailLimitCookie).not.toHaveBeenCalled();
  });

  it('shows an error message when the network request fails', async () => {
    fetchMock.mockRejectedValue(new Error('network down'));

    render(<ContactForm />);

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'user@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/message/i), {
      target: { value: 'Hello' },
    });
    fireEvent.click(screen.getByRole('button', { name: /let's talk/i }));

    await waitFor(() =>
      expect(addFlashMessage).toHaveBeenCalledWith({
        type: 'error',
        message:
          'There was an error sending your message. Please try again later.',
      })
    );
    expect(setEmailLimitCookie).not.toHaveBeenCalled();
  });

  it('renders as already sent when cookie check returns true', () => {
    checkEmailLimitCookie.mockReturnValue(true);

    render(<ContactForm />);

    expect(screen.getByText('Thank you for your message!')).toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: /let's talk/i })
    ).not.toBeInTheDocument();
  });
});
