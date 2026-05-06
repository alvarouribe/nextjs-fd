jest.mock('next/server', () => ({
  NextResponse: {
    json: (body: unknown, init?: { status?: number }) => ({
      status: init?.status ?? 200,
      json: async () => body,
    }),
  },
}));

import { POST } from '../../src/app/api/send-email/route';

const sendMail = jest.fn();
const createTransport = jest.fn(() => ({ sendMail }));

jest.mock('nodemailer', () => ({
  __esModule: true,
  default: {
    createTransport: (...args: unknown[]) => createTransport(...args),
  },
}));

describe('POST /api/send-email', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    process.env.password = 'password';
    process.env.fromEmail = 'from@example.com';
    process.env.toEmail = 'to@example.com';
  });

  it('returns success when the email is sent', async () => {
    sendMail.mockResolvedValueOnce(undefined);

    const request = {
      json: async () => ({
        firstName: 'Jane',
        lastName: 'Doe',
        email: 'jane@example.com',
        message: 'Hi there',
      }),
    } as Request;

    const response = await POST(request);
    const body = await response.json();

    expect(createTransport).toHaveBeenCalledWith({
      host: 'smtp.zoho.com.au',
      secure: true,
      port: 465,
      auth: {
        user: 'from@example.com',
        pass: 'password',
      },
    });
    expect(sendMail).toHaveBeenCalledWith(
      expect.objectContaining({
        from: 'from@example.com',
        to: 'to@example.com',
        subject: 'New Contact Form Submission',
      })
    );
    expect(body).toEqual({ success: true });
    expect(response.status).toBe(200);
  });

  it('returns an error response when sending mail fails', async () => {
    sendMail.mockRejectedValueOnce(new Error('smtp unavailable'));

    const request = {
      json: async () => ({
        firstName: 'Jane',
        lastName: 'Doe',
        email: 'jane@example.com',
        message: 'Hi there',
      }),
    } as Request;

    const response = await POST(request);
    const body = await response.json();

    expect(body).toEqual({
      success: false,
      error: 'smtp unavailable',
    });
    expect(response.status).toBe(500);
  });
});
