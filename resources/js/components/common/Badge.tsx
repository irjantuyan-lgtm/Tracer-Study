import React from 'react';
import { classNames } from '../../utils';

export interface BadgeProps {
    children: React.ReactNode;
    variant?: 'success' | 'warning' | 'info' | 'danger' | 'neutral';
    size?: 'sm' | 'md';
    className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
    children,
    variant = 'neutral',
    size = 'md',
    className = '',
}) => {
    const variantStyles = {
        success: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800',
        warning: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800',
        info: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-800',
        danger: 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-800',
        neutral: 'bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700',
    };

    const sizeStyles = {
        sm: 'text-xs px-2 py-0.5',
        md: 'text-xs px-2.5 py-1',
    };

    return (
        <span
            className={classNames(
                'inline-flex items-center font-medium rounded-full border',
                variantStyles[variant],
                sizeStyles[size],
                className
            )}
        >
            {children}
        </span>
    );
};
