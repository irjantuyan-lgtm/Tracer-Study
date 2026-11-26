import React from 'react';
import { User } from '../../types';

export interface NavbarProps {
    user: User;
    onToggleSidebar?: () => void;
    onNotificationClick?: () => void;
    searchTerm: string;
    onSearchChange: (value: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
    user,
    onToggleSidebar,
    onNotificationClick,
    searchTerm,
    onSearchChange,
}) => {
    return (
        <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-gray-200 bg-white/95 px-4 backdrop-blur-md dark:border-gray-800 dark:bg-gray-900/95 sm:px-6">
            <div className="flex items-center gap-3">
                <button
                    type="button"
                    onClick={onToggleSidebar}
                    className="inline-flex items-center justify-center rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white md:hidden"
                >
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>

                <div className="flex items-center gap-2">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white font-bold shadow-md shadow-blue-500/20">
                        TS
                    </div>
                    <div className="hidden sm:block">
                        <h1 className="text-base font-bold text-gray-900 dark:text-white leading-tight">Tracer Study</h1>
                        <p className="text-[11px] text-gray-500 dark:text-gray-400">Sistem Pelacakan Jejak Alumni</p>
                    </div>
                </div>
            </div>

            {/* Pencarian Global */}
            <div className="hidden md:flex max-w-md flex-1 mx-8">
                <div className="relative w-full">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => onSearchChange(e.target.value)}
                        placeholder="Cari kuesioner, periode, atau riwayat..."
                        className="w-full rounded-full border border-gray-200 bg-gray-50 py-1.5 pl-9 pr-4 text-xs text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder-gray-500"
                    />
                </div>
            </div>

            {/* User Profile & Actions */}
            <div className="flex items-center gap-3">
                <button
                    onClick={onNotificationClick}
                    className="relative rounded-full p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white transition-colors"
                >
                    <span className="sr-only">Notifikasi</span>
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                    <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white dark:ring-gray-900"></span>
                </button>

                <div className="flex items-center gap-2.5 pl-2 border-l border-gray-200 dark:border-gray-800">
                    <div className="hidden text-right lg:block">
                        <p className="text-xs font-semibold text-gray-900 dark:text-white">{user.name}</p>
                        <p className="text-[10px] text-gray-500 uppercase tracking-wider">{user.role} • {user.prodi || 'Fakultas'}</p>
                    </div>
                    <div className="h-9 w-9 overflow-hidden rounded-full ring-2 ring-blue-500/30">
                        {user.avatarUrl ? (
                            <img src={user.avatarUrl} alt={user.name} className="h-full w-full object-cover" />
                        ) : (
                            <div className="flex h-full w-full items-center justify-center bg-blue-100 text-blue-700 font-bold text-xs">
                                {user.name.charAt(0)}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};
