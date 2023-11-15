import { ButtonHTMLAttributes, ForwardedRef, forwardRef } from 'react';
import classNames from 'classnames';

export type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  variant?: 'primary' | 'danger' | 'success';
  size?: 'small' | 'medium' | 'large' |'xlarge';
  outline?: boolean;
  className?: string;
};

function Button({ children, className, variant, size = 'medium', outline, ...rest }: Props, ref: ForwardedRef<HTMLButtonElement>) {
  return (
    <button
      {...rest}
      ref={ref}
      className={classNames(
        'inline-block text-center leading-5 border rounded focus:outline-none focus:ring-0 hover:ring-0 transition-colors duration-150 ease-in-out',
        'cursor-pointer disabled:cursor-not-allowed',
        // Sizes
        {
          'py-1 px-2 text-sm': size === 'small',
          'py-2 px-4': size === 'medium',
          'py-4 px-6 text-xl': size === 'large',
          'py-4 px-8 text-2xl': size === 'xlarge',
        },
        // Colors
        {
          // Default
          'text-gray-800 hover:text-gray-900': !variant,
          'border bg-gray-100 border-gray-500 hover:bg-gray-200 focus:bg-gray-200' : !variant && !outline,
          'bg-transparent hover:bg-gray-100 focus:text-gray-900 focus:bg-gray-100' : !variant && outline,

          // Default (Dark)
          'dark:border-gray-900 dark:hover:text-white dark:hover:bg-black dark:focus:bg-black': !variant,
          'dark:text-gray-100 dark:bg-gray-900' : !variant && !outline,
          'dark:text-gray-900 dark:bg-transparent dark:focus:text-white': !variant && outline,

          // Primary
          'border-indigo-500': variant === 'primary',
          'text-gray-100 bg-indigo-500 hover:text-white hover:bg-indigo-600 hover:border-indigo-600 focus:bg-indigo-600 focus:border-indigo-600': variant === 'primary' && !outline,
          'text-indigo-500 bg-transparent hover:text-gray-100 hover:bg-indigo-500 focus:text-gray-100 focus:bg-indigo-500': variant === 'primary' && outline,

          // Danger
          'border-red-500': variant === 'danger',
          'text-gray-100 bg-red-500 hover:text-white hover:bg-red-600 hover:border-red-600 focus:bg-red-600 focus:border-red-600': variant === 'danger' && !outline,
          'text-red-500 bg-transparent hover:text-gray-100 hover:bg-red-500 focus:text-gray-100 focus:bg-red-500': variant === 'danger' && outline,

          // Success
          'border-green-600': variant === 'success',
          'text-gray-100 bg-green-600 hover:text-white hover:bg-green-700 hover:border-green-700 focus:bg-green-700 focus:border-green-700': variant === 'success' && !outline,
          'text-green-600 bg-transparent hover:text-gray-100 hover:bg-green-600 focus:text-gray-100 focus:bg-green-600': variant === 'success' && outline,
        },
        className,
      )}
    >
      {children}
    </button>
  );
}

export default forwardRef(Button);
