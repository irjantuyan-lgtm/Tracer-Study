import React from 'react';
import { TracerStat } from '../../types';
import { Card } from '../common';

export interface TracerSummaryCardProps {
    stat: TracerStat;
}

export const TracerSummaryCard: React.FC<TracerSummaryCardProps> = ({ stat }) => {
    return (
        <Card hoverable className="relative overflow-hidden">
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider dark:text-gray-400">
                        {stat.label}
                    </p>
                    <p className="mt-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {stat.value}
                    </p>
                </div>
                <div className="rounded-xl bg-blue-50 dark:bg-blue-900/30 p-2.5 text-blue-600 dark:text-blue-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                </div>
            </div>

            <div className="mt-4 flex items-center justify-between text-xs">
                {stat.change && (
                    <span
                        className={`font-medium ${
                            stat.isPositive
                                ? 'text-emerald-600 dark:text-emerald-400'
                                : 'text-gray-500 dark:text-gray-400'
                        }`}
                    >
                        {stat.change}
                    </span>
                )}
                {stat.description && (
                    <span className="text-gray-400 dark:text-gray-500 truncate max-w-[150px]">
                        {stat.description}
                    </span>
                )}
            </div>
        </Card>
    );
};
