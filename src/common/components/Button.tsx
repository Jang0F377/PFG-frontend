import clsx from 'clsx';
import { ButtonHTMLAttributes } from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'custom';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Which variant of button to use
   */
  variant?: ButtonVariant;
  /**
   * Custom Tailwind classes for further styling or overrides
   */
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  className = '',
  children,
  ...props
}) => {
  // Define base styles that apply to all buttons
  const baseStyles = `inline-block items-center py-2 px-3 justify-center rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2`;

  // Define variant-specific styles
  const variantStyles = {
    primary: `bg-neon-blue-700 text-white hover:bg-neon-blue-800 focus:ring-neon-blue-primary`,
    secondary: `bg-neon-blue-50 text-neon-blue-700 hover:bg-neon-blue-50/80 focus:ring-neon-blue-primary`,
    custom: '',
  };

  // Compute the final className
  const combinedClasses = clsx(baseStyles, variantStyles[variant], className);

  return (
    <button className={combinedClasses} {...props}>
      {children}
    </button>
  );
};

export default Button;
