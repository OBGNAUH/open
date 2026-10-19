'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  useEffect(() => { router.replace('/world'); }, [router]);
  return (
    <div className="h-screen flex items-center justify-center" style={{ background: 'var(--bg-primary)' }}>
      <div className="text-center animate-fadeIn">
        <div className="text-4xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent mb-3">
          OPEN
        </div>
        <p className="text-sm text-[var(--text-muted)]">无界社交，连接世界</p>
      </div>
    </div>
  );
}
