'use client';
import TopBar from '@/components/layout/TopBar';
import BottomNav from '@/components/layout/BottomNav';

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen flex flex-col" style={{ background: 'var(--bg-primary)' }}>
      <TopBar />
      <main className="flex-1 overflow-y-auto pt-16 pb-20">
        {children}
      </main>
      <BottomNav />
    </div>
  );
}
