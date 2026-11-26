import React, { useState } from 'react';
import { KuesionerItem, RiwayatPekerjaan } from '../types';
import { Header } from '../components/layout';
import { Card, Button, Badge, Modal } from '../components/common';
import { formatDate } from '../utils';

export interface DetailViewProps {
    kuesioner: KuesionerItem;
    riwayatList: RiwayatPekerjaan[];
    onBackToHome: () => void;
    onAnswerQuestion: (kuesionerId: number) => void;
}

export const DetailView: React.FC<DetailViewProps> = ({
    kuesioner,
    riwayatList,
    onBackToHome,
    onAnswerQuestion,
}) => {
    const [activeTab, setActiveTab] = useState<'kuesioner' | 'riwayat'>('kuesioner');
    const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
    const [selectedRadio, setSelectedRadio] = useState<string>('Bekerja Penuh Waktu');

    const handleSimulateAnswer = () => {
        onAnswerQuestion(kuesioner.id);
    };

    return (
        <div className="space-y-6">
            {/* Header dengan Breadcrumbs */}
            <Header
                title={kuesioner.judul}
                subtitle={`Kategori: ${kuesioner.kategori} Batas Pengisian: ${formatDate(kuesioner.tenggatWaktu)}`}
                breadcrumbs={[
                    { label: 'Beranda', onClick: onBackToHome },
                    { label: 'Detail Kuesioner' },
                    { label: kuesioner.kategori },
                ]}
                actions={
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" onClick={onBackToHome}>
                            Kembali
                        </Button>
                        <Button
                            variant="primary"
                            size="sm"
                            onClick={() => setIsSubmitModalOpen(true)}
                        >
                            Kirim Jawaban
                        </Button>
                    </div>
                }
            />

            {/* Status Info Banner */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200/60 dark:border-blue-900/40">
                <div className="flex items-center gap-3">
                    <Badge
                        variant={
                            kuesioner.status === 'Selesai'
                                ? 'success'
                                : kuesioner.status === 'Dalam Proses'
                                    ? 'warning'
                                    : 'neutral'
                        }
                    >
                        {kuesioner.status}
                    </Badge>
                    <span className="text-xs text-gray-600 dark:text-gray-300">
                        Pertanyaan terjawab:{' '}
                        <strong className="text-blue-600 dark:text-blue-400">
                            {kuesioner.terjawab}
                        </strong>{' '}
                        dari {kuesioner.totalPertanyaan}
                    </span>
                </div>
                <div className="text-xs text-gray-500">
                    Terakhir disimpan otomatis hari ini
                </div>
            </div>

            {/* Tabs Navigasi */}
            <div className="flex border-b border-gray-200 dark:border-gray-700 gap-4 text-sm font-medium">
                <button
                    onClick={() => setActiveTab('kuesioner')}
                    className={`pb-3 transition-colors border-b-2 ${activeTab === 'kuesioner'
                        ? 'border-blue-600 text-blue-600 dark:text-blue-400 font-semibold'
                        : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                        }`}
                >
                    Lembar Pertanyaan ({kuesioner.totalPertanyaan})
                </button>
                <button
                    onClick={() => setActiveTab('riwayat')}
                    className={`pb-3 transition-colors border-b-2 ${activeTab === 'riwayat'
                        ? 'border-blue-600 text-blue-600 dark:text-blue-400 font-semibold'
                        : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                        }`}
                >
                    Riwayat Pekerjaan Terkait ({riwayatList.length})
                </button>
            </div>

            {/* Isi Konten Tab */}
            {activeTab === 'kuesioner' ? (
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    {/* Kolom Lembar Pertanyaan */}
                    <div className="lg:col-span-2 space-y-4">
                        <Card
                            title={`Pertanyaan 1: Status Aktivitas Saat Ini`}
                            subtitle="Pilih salah satu kondisi utama yang paling menggambarkan kondisi Anda saat ini"
                        >
                            <div className="space-y-3 pt-2">
                                {[
                                    'Bekerja Penuh Waktu',
                                    'Bekerja Paruh Waktu / Freelance',
                                    'Wiraswasta / Pemilik Usaha',
                                    'Melanjutkan Studi Magister / Doktoral',
                                    'Sedang Mencari Pekerjaan',
                                ].map((option) => (
                                    <label
                                        key={option}
                                        className={`flex items-center gap-3 p-3.5 rounded-lg border cursor-pointer transition-all ${selectedRadio === option
                                            ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-950/30 text-blue-900 dark:text-blue-200'
                                            : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800'
                                            }`}
                                    >
                                        <input
                                            type="radio"
                                            name="aktivitas"
                                            value={option}
                                            checked={selectedRadio === option}
                                            onChange={() => setSelectedRadio(option)}
                                            className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                                        />
                                        <span className="text-sm">{option}</span>
                                    </label>
                                ))}
                            </div>

                            <div className="mt-6 flex items-center justify-between border-t border-gray-100 dark:border-gray-700 pt-4">
                                <Button
                                    variant="secondary"
                                    size="sm"
                                    onClick={handleSimulateAnswer}
                                >
                                    Simpan Jawaban Sementara
                                </Button>
                                <Button
                                    variant="primary"
                                    size="sm"
                                    onClick={handleSimulateAnswer}
                                >
                                    Selanjutnya &rarr;
                                </Button>
                            </div>
                        </Card>
                    </div>

                    {/* Sidebar Ringkasan Navigasi Soal */}
                    <div className="space-y-4">
                        <Card title="Daftar Nomor Pertanyaan">
                            <div className="grid grid-cols-5 gap-2 text-center text-xs">
                                {Array.from({ length: kuesioner.totalPertanyaan }, (_, i) => i + 1).map(
                                    (num) => {
                                        const isDone = num <= kuesioner.terjawab;
                                        const isCurrent = num === kuesioner.terjawab + 1;
                                        return (
                                            <button
                                                key={num}
                                                onClick={handleSimulateAnswer}
                                                className={`h-9 w-9 rounded-lg font-semibold flex items-center justify-center transition-all ${isDone
                                                    ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-300'
                                                    : isCurrent
                                                        ? 'bg-blue-600 text-white shadow-sm'
                                                        : 'bg-gray-100 dark:bg-gray-800 text-gray-500 hover:bg-gray-200'
                                                    }`}
                                            >
                                                {num}
                                            </button>
                                        );
                                    }
                                )}
                            </div>

                            <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-700 space-y-1.5 text-[11px] text-gray-500">
                                <div className="flex items-center gap-2">
                                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-500"></span>
                                    <span>Sudah Terjawab</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="h-2.5 w-2.5 rounded-full bg-blue-600"></span>
                                    <span>Sedang Dikerjakan</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="h-2.5 w-2.5 rounded-full bg-gray-300"></span>
                                    <span>Belum Terisi</span>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            ) : (
                /* Tab Riwayat Pekerjaan */
                <div className="space-y-4">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        {riwayatList.map((job) => (
                            <Card key={job.id} title={job.posisi} subtitle={job.namaPerusahaan}>
                                <div className="space-y-2 text-xs text-gray-600 dark:text-gray-300">
                                    <div className="flex justify-between">
                                        <span className="text-gray-400">Industri:</span>
                                        <span className="font-medium text-gray-900 dark:text-white">
                                            {job.bidangIndustri}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-400">Periode:</span>
                                        <span className="font-medium text-gray-900 dark:text-white">
                                            {job.tahunMulai} - {job.tahunSelesai || 'Sekarang'}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-400">Status:</span>
                                        <Badge variant="info" size="sm">
                                            {job.statusPekerjaan}
                                        </Badge>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-400">Relevansi Kurikulum:</span>
                                        <Badge variant="success" size="sm">
                                            {job.kesesuaianBidang}
                                        </Badge>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            )}

            {/* Modal Konfirmasi Submit */}
            <Modal
                isOpen={isSubmitModalOpen}
                onClose={() => setIsSubmitModalOpen(false)}
                title="Konfirmasi Pengiriman Jawaban"
                footer={
                    <>
                        <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => setIsSubmitModalOpen(false)}
                        >
                            Periksa Kembali
                        </Button>
                        <Button
                            variant="primary"
                            size="sm"
                            onClick={() => {
                                setIsSubmitModalOpen(false);
                                onBackToHome();
                            }}
                        >
                            Kirim Sekarang
                        </Button>
                    </>
                }
            >
                <p>
                    Apakah Anda yakin ingin mengirimkan jawaban kuesioner ini? Setelah dikirim secara final,
                    perubahan data membutuhkan verifikasi atau pengajuan revisi ke admin Tracer Study.
                </p>
            </Modal>
        </div>
    );
};
