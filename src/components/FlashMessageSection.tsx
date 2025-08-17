import useFlashMessages from '../hooks/useFlashMessages';

export default function FlashMessageSection() {
  const { addFlashMessage } = useFlashMessages();
  const infoFlashMessage = () => {
    addFlashMessage({ type: 'info-close', message: 'This is an info message' });
  };

  const successFlashMessage = () => {
    addFlashMessage({ type: 'success', message: 'This is a success message' });
  };

  const errorFlashMessage = () => {
    addFlashMessage({ type: 'error', message: 'This is an error message' });
  };

  return (
    <section
      data-test="flash-msg-section"
      className="mt-10 flex items-center justify-center gap-x-6"
    >
      <button
        type="button"
        onClick={successFlashMessage}
        className="rounded-md bg-green-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
      >
        Success message
      </button>
      <button
        type="button"
        onClick={errorFlashMessage}
        className="rounded-md bg-red-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
      >
        Error Message
      </button>
      <button
        type="button"
        onClick={infoFlashMessage}
        className="rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
      >
        Custom info message
      </button>
      <a href="#" className="text-sm/6 font-semibold text-white">
        Learn more <span aria-hidden="true">→</span>
      </a>
    </section>
  );
}
