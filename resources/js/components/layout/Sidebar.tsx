import React from 'react';
import { ViewType } from '../../types';

export interface SidebarProps {
    currentView: ViewType;
    onViewChange: (view: ViewType) => void;
    isOpen?: boolean;
    onClose?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
    currentView,
    onViewChange,
    isOpen = true,
    onClose,
}) => {
    const navItems = [
        {
            id: 'home' as ViewType,
            label: 'Dashboard & Beranda',
            icon: (
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
            ),
            badge: 'Utama',
        },
        {
            id: 'detail' as ViewType,
            label: 'Detail Kuesioner',
            icon: (
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
            ),
        },
        {
            id: 'settings' as ViewType,
            label: 'Pengaturan Akun',
            icon: (
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
            ),
        },
    ];

    return (
        <>
            {/* Mobile backdrop */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/40 backdrop-blur-xs md:hidden"
                    onClick={onClose}
                ></div>
            )}

            <aside
                className={`fixed top-16 bottom-0 left-0 z-40 w-64 border-r border-gray-200 bg-white transition-transform duration-300 ease-in-out dark:border-gray-800 dark:bg-gray-900 md:static md:translate-x-0 ${
                    isOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                <div className="flex h-full flex-col justify-between p-4">
                    <div className="space-y-6">
                        <div>
                            <p className="px-3 text-[11px] font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">
                                Menu Navigasi
                            </p>
                            <nav className="mt-2 space-y-1">
                                {navItems.map((item) => {
                                    const active = currentView === item.id;
                                    return (
                                        <button
                                            key={item.id}
                                            onClick={() => {
                                                onViewChange(item.id);
                                                if (onClose) onClose();
                                            }}
                                            className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                                                active
                                                    ? 'bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-300 shadow-2xs font-semibold'
                                                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white'
                                            }`}
                                        >
                                            <div className="flex items-center gap-3">
                                                <span className={active ? 'text-blue-600 dark:text-blue-400' : 'text-gray-400'}>
                                                    {item.icon}
                                                </span>
                                                <span>{item.label}</span>
                                            </div>
                                            {item.badge && (
                                                <span className="rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-semibold text-blue-600 dark:bg-blue-900/60 dark:text-blue-300">
                                                    {item.badge}
                                                </span>
                                            )}
                                        </button>
                                    );
                                })}
                            </nav>
                        </div>

                        {/* Periode Info Box */}
                        <div className="rounded-xl bg-gradient-to-br from-blue-500/10 via-indigo-500/5 to-purple-500/10 p-4 border border-blue-200/50 dark:border-blue-900/40">
                            <div className="flex items-center gap-2 text-blue-700 dark:text-blue-400">
                                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                                <h4 className="text-xs font-bold uppercase tracking-wider">Tracer 2026 Aktif</h4>
                            </div>
                            <p className="mt-1.5 text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                                Mohon lengkapi kuesioner sebelum batas penutupan periode 31 Desember 2026.
                            </p>
                        </div>
                    </div>

                    {/* Bottom Status */}
                    <div className="rounded-lg border border-gray-100 p-3 dark:border-gray-800 bg-gray-50/60 dark:bg-gray-800/40 text-xs text-gray-500">
                        <div className="flex items-center justify-between">
                            <span>Status Server:</span>
                            <span className="font-semibold text-emerald-600 dark:text-emerald-400">Online API</span>
                        </div>
                        <div className="flex items-center justify-between mt-1 text-[11px] text-gray-400">
                            <span>Versi View:</span>
                            <span>v1.0.0</span>
                        </div>
                    </div>
                </div>
            </aside>
        </>
    );
};
