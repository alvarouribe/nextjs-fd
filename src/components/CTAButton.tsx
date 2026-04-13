import React from 'react';

export interface CTAButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  children?: React.ReactNode;
}

const CTAButton: React.FC<CTAButtonProps> = ({
  isLoading = false,
  children,
  className = '',
  ...props
}) => {
  return (
    <div className="flex">
      <button
        type={props.type || 'button'}
        role="button"
        className={`button-pushable ${className}`}
        disabled={isLoading || props.disabled}
        {...props}
      >
        <span className="button-shadow"></span>
        <span className="button-edge"></span>
        <span className="button-front text">
          {isLoading ? '...' : children}
        </span>
      </button>
    </div>
  );
};

export default CTAButton;
