import React from 'react';
import { classNames } from '../../utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    helperText?: string;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({
    label,
    error,
    helperText,
    leftIcon,
    rightIcon,
    className = '',
    id,
    disabled,
    ...props
}) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
        <div className="w-full">
            {label && (
                <label
                    htmlFor={inputId}
                    className="block text-xs font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-1.5"
                >
                    {label}
                </label>
            )}
            <div className="relative rounded-lg shadow-2xs">
                {leftIcon && (
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                        {leftIcon}
                    </div>
                )}
                <input
                    id={inputId}
                    disabled={disabled}
                    className={classNames(
                        'block w-full rounded-lg border bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 text-sm transition-colors',
                        'focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20',
                        leftIcon ? 'pl-10' : 'pl-3.5',
                        rightIcon ? 'pr-10' : 'pr-3.5',
                        'py-2.5',
                        error
                            ? 'border-red-400 focus:border-red-500 focus:ring-red-500/20'
                            : 'border-gray-300 dark:border-gray-600',
                        disabled && 'bg-gray-100 dark:bg-gray-900 cursor-not-allowed opacity-75',
                        className
                    )}
                    {...props}
                />
                {rightIcon && (
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400">
                        {rightIcon}
                    </div>
                )}
            </div>
            {error && <p className="mt-1 text-xs text-red-600 dark:text-red-400">{error}</p>}
            {helperText && !error && (
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{helperText}</p>
            )}
        </div>
    );
};
