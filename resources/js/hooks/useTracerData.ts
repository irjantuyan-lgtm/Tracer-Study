import { useState, useMemo } from 'react';
import { ViewType, KuesionerItem, RiwayatPekerjaan } from '../types';
import {
    mockCurrentUser,
    mockTracerStats,
    mockKuesionerList,
    mockRiwayatPekerjaan,
    mockPeriodeTracer,
    mockActivityLogs,
} from '../data';

export function useTracerData() {
    const [currentView, setCurrentView] = useState<ViewType>('home');
    const [selectedKuesionerId, setSelectedKuesionerId] = useState<number | null>(1);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [kuesionerList, setKuesionerList] = useState<KuesionerItem[]>(mockKuesionerList);
    const [riwayatList] = useState<RiwayatPekerjaan[]>(mockRiwayatPekerjaan);
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);

    // Kuesioner yang sedang dipilih untuk DetailView
    const selectedKuesioner = useMemo(() => {
        return kuesionerList.find((k) => k.id === selectedKuesionerId) || kuesionerList[0];
    }, [kuesionerList, selectedKuesionerId]);

    // Filter kuesioner berdasarkan pencarian
    const filteredKuesioner = useMemo(() => {
        if (!searchTerm.trim()) return kuesionerList;
        return kuesionerList.filter(
            (k) =>
                k.judul.toLowerCase().includes(searchTerm.toLowerCase()) ||
                k.kategori.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [kuesionerList, searchTerm]);

    const navigateTo = (view: ViewType, kuesionerId?: number) => {
        if (kuesionerId !== undefined) {
            setSelectedKuesionerId(kuesionerId);
        }
        setCurrentView(view);
    };

    const handleAnswerQuestion = (kuesionerId: number) => {
        setKuesionerList((prev) =>
            prev.map((item) => {
                if (item.id === kuesionerId) {
                    const nextTerjawab = Math.min(item.terjawab + 1, item.totalPertanyaan);
                    const nextStatus =
                        nextTerjawab === item.totalPertanyaan
                            ? 'Selesai'
                            : nextTerjawab > 0
                            ? 'Dalam Proses'
                            : 'Belum Diisi';
                    return { ...item, terjawab: nextTerjawab, status: nextStatus };
                }
                return item;
            })
        );
    };

    return {
        user: mockCurrentUser,
        stats: mockTracerStats,
        kuesionerList,
        filteredKuesioner,
        riwayatList,
        periodeTracer: mockPeriodeTracer,
        activityLogs: mockActivityLogs,
        currentView,
        selectedKuesioner,
        searchTerm,
        setSearchTerm,
        navigateTo,
        handleAnswerQuestion,
        isNotificationOpen,
        setIsNotificationOpen,
    };
}
