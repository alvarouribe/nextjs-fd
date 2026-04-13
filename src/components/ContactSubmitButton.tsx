import CTAButton from './CTAButton';
import React from 'react';

interface ContactSubmitButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  children?: React.ReactNode;
}

const ContactSubmitButton: React.FC<ContactSubmitButtonProps> = ({
  isLoading = false,
  children = "Let's talk",
  ...props
}) => {
  return (
    <CTAButton type="submit" isLoading={isLoading} {...props}>
      {children}
    </CTAButton>
  );
};

export default ContactSubmitButton;
