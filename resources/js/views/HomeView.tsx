import React from 'react';
import { User, TracerStat, KuesionerItem, ActivityLog } from '../types';
import { Header } from '../components/layout';
import { Card, Button, Badge } from '../components/common';
import { TracerSummaryCard, KuesionerProgress } from '../components/features';

export interface HomeViewProps {
    user: User;
    stats: TracerStat[];
    kuesionerList: KuesionerItem[];
    activityLogs: ActivityLog[];
    onSelectKuesioner: (item: KuesionerItem) => void;
    onGoToSettings: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
    user,
    stats,
    kuesionerList,
    activityLogs,
    onSelectKuesioner,
    onGoToSettings,
}) => {
    return (
        <div className="space-y-6">
            {/* Header Halaman */}
            <Header
                title={`Selamat Datang, ${user.name}`}
                subtitle={`Program Studi ${user.prodi || 'Fakultas'} • Lulusan Tahun ${user.tahunLulus || '2024'}`}
                actions={
                    <Button variant="outline" size="sm" onClick={onGoToSettings}>
                        Pengaturan Profil
                    </Button>
                }
            />

            {/* Banner Pengumuman Pengisian Tracer Study */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-800 p-6 text-white shadow-lg">
                <div className="relative z-10 max-w-2xl">
                    <span className="inline-flex items-center rounded-full bg-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider backdrop-blur-md">
                        Periode Tracer 2026 Dibuka
                    </span>
                    <h2 className="mt-3 text-xl font-bold sm:text-2xl">
                        Bantu Kami Meningkatkan Kualitas Lulusan Melalui Umpan Balik Anda
                    </h2>
                    <p className="mt-2 text-xs text-blue-100 sm:text-sm">
                        Data kuesioner Anda sangat berharga bagi akreditasi universitas, pengembangan kurikulum prodi, serta evaluasi penyerapan dunia kerja.
                    </p>
                    <div className="mt-5 flex flex-wrap items-center gap-3">
                        <Button
                            variant="secondary"
                            size="sm"
                            className="text-blue-900 bg-white hover:bg-blue-50 font-semibold"
                            onClick={() => onSelectKuesioner(kuesionerList[0])}
                        >
                            Mulai Isi Kuesioner Sekarang
                        </Button>
                        <span className="text-xs text-blue-100">
                            Batas pengisian: 31 Desember 2026
                        </span>
                    </div>
                </div>
            </div>

            {/* Statistik Ringkasan */}
            <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-3">
                    Ringkasan Capaian Tracer Study
                </h3>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {stats.map((stat) => (
                        <TracerSummaryCard key={stat.id} stat={stat} />
                    ))}
                </div>
            </div>

            {/* Bagian Utama: Daftar Kuesioner & Aktivitas Terakhir */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                {/* Kolom Kiri: Daftar Kuesioner Tracer */}
                <div className="lg:col-span-2 space-y-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-base font-bold text-gray-900 dark:text-white">
                                Modul Kuesioner Alumni
                            </h3>
                            <p className="text-xs text-gray-500">
                                Selesaikan seluruh modul di bawah ini secara berurutan
                            </p>
                        </div>
                    </div>

                    <div className="space-y-3">
                        {kuesionerList.map((item) => (
                            <KuesionerProgress
                                key={item.id}
                                item={item}
                                onStartOrContinue={onSelectKuesioner}
                            />
                        ))}
                    </div>
                </div>

                {/* Kolom Kanan: Aktivitas & Panduan */}
                <div className="space-y-4">
                    <Card
                        title="Aktivitas Terakhir"
                        subtitle="Log pengisian & interaksi Anda"
                    >
                        <div className="space-y-3.5">
                            {activityLogs.map((log) => (
                                <div key={log.id} className="flex items-start gap-3 text-xs">
                                    <div className="mt-1 h-2 w-2 rounded-full bg-blue-500 shrink-0"></div>
                                    <div className="flex-1 space-y-0.5">
                                        <p className="font-medium text-gray-900 dark:text-white leading-tight">
                                            {log.action}
                                        </p>
                                        <p className="text-[11px] text-gray-400">{log.timestamp}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>

                    <Card
                        title="Pusat Bantuan Alumni"
                        subtitle="Butuh klarifikasi atau ada kendala?"
                    >
                        <div className="space-y-2 text-xs text-gray-600 dark:text-gray-300">
                            <p>
                                Jika terdapat data riwayat pekerjaan atau program studi yang tidak sesuai, Anda dapat mengajukan permohonan revisi data.
                            </p>
                            <div className="pt-2">
                                <Button variant="outline" size="sm" className="w-full">
                                    Hubungi Admin Tracer
                                </Button>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};
