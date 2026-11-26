import React, { useState } from 'react';
import { useTracerData } from './hooks';
import { Navbar, Sidebar, Footer } from './components/layout';
import { HomeView, DetailView, SettingsView } from './views';
import { Modal, Button } from './components/common';

export const App: React.FC = () => {
    const {
        user,
        stats,
        kuesionerList,
        filteredKuesioner,
        riwayatList,
        periodeTracer,
        activityLogs,
        currentView,
        selectedKuesioner,
        searchTerm,
        setSearchTerm,
        navigateTo,
        handleAnswerQuestion,
        isNotificationOpen,
        setIsNotificationOpen,
    } = useTracerData();

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="flex min-h-screen flex-col bg-gray-50 text-gray-900 dark:bg-gray-950 dark:text-gray-100 font-sans antialiased">
            {/* Top Navigation Bar */}
            <Navbar
                user={user}
                onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)}
                onNotificationClick={() => setIsNotificationOpen(true)}
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
            />

            <div className="flex flex-1">
                {/* Sidebar Navigation */}
                <Sidebar
                    currentView={currentView}
                    onViewChange={(view) => navigateTo(view)}
                    isOpen={isSidebarOpen}
                    onClose={() => setIsSidebarOpen(false)}
                />

                {/* Main Content Area */}
                <main className="flex-1 overflow-x-hidden p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
                    {currentView === 'home' && (
                        <HomeView
                            user={user}
                            stats={stats}
                            kuesionerList={filteredKuesioner}
                            activityLogs={activityLogs}
                            onSelectKuesioner={(item) => navigateTo('detail', item.id)}
                            onGoToSettings={() => navigateTo('settings')}
                        />
                    )}

                    {currentView === 'detail' && (
                        <DetailView
                            kuesioner={selectedKuesioner}
                            riwayatList={riwayatList}
                            onBackToHome={() => navigateTo('home')}
                            onAnswerQuestion={handleAnswerQuestion}
                        />
                    )}

                    {currentView === 'settings' && (
                        <SettingsView
                            user={user}
                            periodeTracer={periodeTracer}
                            onBackToHome={() => navigateTo('home')}
                        />
                    )}
                </main>
            </div>

            {/* Global Footer */}
            <Footer />

            {/* Modal Notifikasi */}
            <Modal
                isOpen={isNotificationOpen}
                onClose={() => setIsNotificationOpen(false)}
                title="Pemberitahuan & Notifikasi"
                footer={
                    <Button
                        variant="primary"
                        size="sm"
                        onClick={() => setIsNotificationOpen(false)}
                    >
                        Tandai Sudah Dibaca
                    </Button>
                }
            >
                <div className="space-y-3">
                    <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/40 text-xs">
                        <p className="font-semibold text-blue-900 dark:text-blue-300">
                            Periode Pengisian Tracer Study 2026 Telah Dibuka
                        </p>
                        <p className="mt-1 text-gray-600 dark:text-gray-300">
                            Silakan melengkapi kuesioner Anda untuk evaluasi kurikulum dan akreditasi program studi.
                        </p>
                        <span className="mt-2 block text-[10px] text-gray-400">Hari ini, 09:00 WIB</span>
                    </div>

                    <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-800/40 border border-gray-100 dark:border-gray-700 text-xs">
                        <p className="font-semibold text-gray-800 dark:text-gray-200">
                            Verifikasi Data Alumni Berhasil
                        </p>
                        <p className="mt-1 text-gray-500 dark:text-gray-400">
                            Data kelulusan dan ijazah Anda telah terverifikasi oleh pangkalan data universitas.
                        </p>
                        <span className="mt-2 block text-[10px] text-gray-400">Kemarin, 14:30 WIB</span>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default App;
