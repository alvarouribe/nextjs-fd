import useFlashMessages from '../../src/hooks/useFlashMessages';

const toastSuccess = jest.fn();
const toastError = jest.fn();
const toastDefault = jest.fn();
const toastDismiss = jest.fn();

jest.mock('react-hot-toast', () => ({
  __esModule: true,
  default: Object.assign(
    (...args: unknown[]) => toastDefault(...args),
    {
      success: (...args: unknown[]) => toastSuccess(...args),
      error: (...args: unknown[]) => toastError(...args),
      dismiss: (...args: unknown[]) => toastDismiss(...args),
    }
  ),
}));

describe('useFlashMessages', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('shows a success toast for success messages', () => {
    const { addFlashMessage } = useFlashMessages();

    addFlashMessage({ type: 'success', message: 'Done!' });

    expect(toastSuccess).toHaveBeenCalledWith('Done!');
  });

  it('shows an error toast for error messages', () => {
    const { addFlashMessage } = useFlashMessages();

    addFlashMessage({ type: 'error', message: 'Failed!' });

    expect(toastError).toHaveBeenCalledWith('Failed!');
  });

  it('shows the info variant with icon', () => {
    const { addFlashMessage } = useFlashMessages();

    addFlashMessage({ type: 'info', message: 'Info text' });

    expect(toastSuccess).toHaveBeenCalledWith('info', { icon: '👏' });
  });

  it('shows a custom dismissable toast for info-close messages', () => {
    const { addFlashMessage } = useFlashMessages();

    addFlashMessage({ type: 'info-close', message: 'Closable' });

    expect(toastDefault).toHaveBeenCalledWith(expect.any(Function), {
      icon: '🧨',
    });
  });

  it('uses the default fallback when no type is provided', () => {
    const { addFlashMessage } = useFlashMessages();

    addFlashMessage({ message: 'Fallback' });

    expect(toastSuccess).toHaveBeenCalledWith('info', { icon: '👏' });
  });
});
