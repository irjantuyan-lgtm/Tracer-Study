import React from 'react';

export const Footer: React.FC = () => {
    return (
        <footer className="mt-auto border-t border-gray-200 bg-white py-6 dark:border-gray-800 dark:bg-gray-900 text-xs text-gray-500">
            <div className="mx-auto flex flex-col items-center justify-between gap-4 px-4 sm:flex-row sm:px-6 max-w-7xl">
                <div className="flex items-center gap-2">
                    <span className="font-semibold text-gray-700 dark:text-gray-300">Tracer Study Portal</span>
                    <span>•</span>
                    <span>Direktorat Kemahasiswaan & Hubungan Alumni</span>
                </div>
                <div className="flex items-center gap-4 text-gray-400">
                    <a href="#bantuan" className="hover:text-gray-600 dark:hover:text-gray-300">Bantuan & FAQ</a>
                    <span>•</span>
                    <a href="#kebijakan" className="hover:text-gray-600 dark:hover:text-gray-300">Kebijakan Privasi</a>
                    <span>•</span>
                    <span>&copy; {new Date().getFullYear()} Tracer Study. All rights reserved.</span>
                </div>
            </div>
        </footer>
    );
};
