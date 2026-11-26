import React from 'react';
import { KuesionerItem } from '../../types';
import { Badge, Button } from '../common';
import { formatPercentage } from '../../utils';

export interface KuesionerProgressProps {
    item: KuesionerItem;
    onStartOrContinue: (item: KuesionerItem) => void;
}

export const KuesionerProgress: React.FC<KuesionerProgressProps> = ({
    item,
    onStartOrContinue,
}) => {
    const percentage = Math.round((item.terjawab / item.totalPertanyaan) * 100);

    const statusBadgeVariant =
        item.status === 'Selesai'
            ? 'success'
            : item.status === 'Dalam Proses'
            ? 'warning'
            : 'neutral';

    return (
        <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5 shadow-2xs hover:border-blue-400 dark:hover:border-blue-500 transition-all">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="space-y-1">
                    <div className="flex items-center gap-2">
                        <Badge variant={statusBadgeVariant} size="sm">
                            {item.status}
                        </Badge>
                        <span className="text-xs text-gray-400">• Kategori {item.kategori}</span>
                    </div>
                    <h4 className="text-base font-semibold text-gray-900 dark:text-white">
                        {item.judul}
                    </h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400 max-w-xl">
                        {item.deskripsi}
                    </p>
                </div>

                <div className="shrink-0 flex items-center gap-3">
                    <Button
                        variant={item.status === 'Selesai' ? 'outline' : 'primary'}
                        size="sm"
                        onClick={() => onStartOrContinue(item)}
                    >
                        {item.status === 'Selesai'
                            ? 'Lihat Detail'
                            : item.status === 'Dalam Proses'
                            ? 'Lanjutkan'
                            : 'Mulai Isi'}
                    </Button>
                </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-700/60">
                <div className="flex items-center justify-between text-xs text-gray-500 mb-1.5">
                    <span>Progres Pengisian ({item.terjawab} dari {item.totalPertanyaan} pertanyaan)</span>
                    <span className="font-semibold text-blue-600 dark:text-blue-400">
                        {formatPercentage(item.terjawab, item.totalPertanyaan)}
                    </span>
                </div>
                <div className="w-full bg-gray-100 dark:bg-gray-700 h-2 rounded-full overflow-hidden">
                    <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-500 ease-out"
                        style={{ width: `${percentage}%` }}
                    ></div>
                </div>
            </div>
        </div>
    );
};
