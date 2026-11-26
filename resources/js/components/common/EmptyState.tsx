import React from 'react';
import { Button } from './Button';

export interface EmptyStateProps {
    title: string;
    description: string;
    actionLabel?: string;
    onAction?: () => void;
    icon?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
    title,
    description,
    actionLabel,
    onAction,
    icon,
}) => {
    return (
        <div className="flex flex-col items-center justify-center p-8 text-center bg-gray-50/50 dark:bg-gray-800/30 rounded-xl border border-dashed border-gray-200 dark:border-gray-700 my-4">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 mb-3">
                {icon || (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                )}
            </div>
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">{title}</h4>
            <p className="text-xs text-gray-500 dark:text-gray-400 max-w-sm mb-4">{description}</p>
            {actionLabel && onAction && (
                <Button size="sm" onClick={onAction}>
                    {actionLabel}
                </Button>
            )}
        </div>
    );
};
