import React from 'react';
import { classNames } from '../../utils';

export interface CardProps {
    children: React.ReactNode;
    title?: React.ReactNode;
    subtitle?: string;
    action?: React.ReactNode;
    footer?: React.ReactNode;
    className?: string;
    bodyClassName?: string;
    onClick?: () => void;
    hoverable?: boolean;
}

export const Card: React.FC<CardProps> = ({
    children,
    title,
    subtitle,
    action,
    footer,
    className = '',
    bodyClassName = '',
    onClick,
    hoverable = false,
}) => {
    return (
        <div
            onClick={onClick}
            className={classNames(
                'bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden transition-all',
                hoverable && 'hover:shadow-md hover:border-blue-400 dark:hover:border-blue-500 cursor-pointer',
                className
            )}
        >
            {(title || subtitle || action) && (
                <div className="px-5 py-4 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between">
                    <div>
                        {title && <h3 className="font-semibold text-gray-900 dark:text-white text-base">{title}</h3>}
                        {subtitle && <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{subtitle}</p>}
                    </div>
                    {action && <div>{action}</div>}
                </div>
            )}
            <div className={classNames('p-5', bodyClassName)}>{children}</div>
            {footer && (
                <div className="px-5 py-3 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-100 dark:border-gray-700 text-sm">
                    {footer}
                </div>
            )}
        </div>
    );
};
