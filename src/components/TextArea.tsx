import { TextareaHTMLAttributes, forwardRef } from 'react';

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  id: string;
  isRequired?: boolean;
  error?: string;
}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ label, id, isRequired, error, className = '', ...props }, ref) => {
    return (
      <div>
        <label
          htmlFor={id}
          className="block text-sm/6 font-semibold text-gray-900 dark:text-white"
        >
          {label} {isRequired && <span className="text-orange-500">*</span>}
        </label>
        <div className="mt-2.5">
          <textarea
            ref={ref}
            id={id}
            {...props}
            className={`block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 backdrop-blur placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500 ${className}`}
          />
        </div>
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      </div>
    );
  }
);

TextArea.displayName = 'TextArea';

export default TextArea;
