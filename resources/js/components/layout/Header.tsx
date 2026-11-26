import React from 'react';

export interface HeaderProps {
    title: string;
    subtitle?: string;
    breadcrumbs?: { label: string; onClick?: () => void }[];
    actions?: React.ReactNode;
}

export const Header: React.FC<HeaderProps> = ({
    title,
    subtitle,
    breadcrumbs,
    actions,
}) => {
    return (
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
                {breadcrumbs && breadcrumbs.length > 0 && (
                    <nav className="mb-1 flex items-center gap-1.5 text-xs text-gray-400">
                        {breadcrumbs.map((crumb, idx) => (
                            <React.Fragment key={idx}>
                                {idx > 0 && <span>/</span>}
                                {crumb.onClick ? (
                                    <button
                                        onClick={crumb.onClick}
                                        className="hover:text-blue-600 transition-colors"
                                    >
                                        {crumb.label}
                                    </button>
                                ) : (
                                    <span className="text-gray-600 dark:text-gray-300 font-medium">
                                        {crumb.label}
                                    </span>
                                )}
                            </React.Fragment>
                        ))}
                    </nav>
                )}
                <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-3xl">
                    {title}
                </h1>
                {subtitle && (
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400 sm:text-sm">
                        {subtitle}
                    </p>
                )}
            </div>

            {actions && <div className="flex items-center gap-2.5">{actions}</div>}
        </div>
    );
};
