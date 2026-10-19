'use client';
import { Search, Bell, MessageCircle } from 'lucide-react';
import { useStore } from '@/store';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function TopBar() {
  const { notifications, toggleNotifications, showNotifications, markAllNotificationsRead } = useStore();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-[var(--border)]"
        style={{ background: 'rgba(15,15,26,0.98)', backdropFilter: 'blur(20px)' }}>
        <div className="max-w-lg mx-auto flex items-center h-14 px-4 gap-3">
          <div className="font-bold text-lg bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            OPEN
          </div>

          {!showSearch ? (
            <button
              onClick={() => setShowSearch(true)}
              className="flex-1 flex items-center gap-2 h-10 px-4 rounded-full transition-colors"
              style={{ background: 'var(--bg-secondary)' }}
            >
              <Search size={16} className="text-[var(--text-muted)]" />
              <span className="text-sm text-[var(--text-muted)]">搜索用户、聊天室、动态...</span>
            </button>
          ) : (
            <div className="flex-1 flex items-center gap-2 h-10 px-4 rounded-full" style={{ background: 'var(--bg-secondary)' }}>
              <Search size={16} className="text-[var(--text-muted)]" />
              <input
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onBlur={() => { if (!searchQuery) setShowSearch(false); }}
                placeholder="搜索..."
                className="flex-1 text-sm bg-transparent"
              />
              {searchQuery && (
                <button onClick={() => { setSearchQuery(''); setShowSearch(false); }} className="text-[var(--text-muted)]">
                  ✕
                </button>
              )}
            </div>
          )}

          <div className="flex items-center gap-1">
            <button
              onClick={() => router.push('/chat/global')}
              className="w-10 h-10 flex items-center justify-center rounded-full transition-colors hover:bg-[var(--bg-hover)]"
            >
              <MessageCircle size={20} className="text-[var(--text-secondary)]" />
            </button>
            <button
              onClick={toggleNotifications}
              className="w-10 h-10 flex items-center justify-center rounded-full transition-colors hover:bg-[var(--bg-hover)] relative"
            >
              <Bell size={20} className="text-[var(--text-secondary)]" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 rounded-full text-[10px] text-white flex items-center justify-center font-bold">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {showNotifications && (
        <>
          <div className="fixed inset-0 z-40" onClick={toggleNotifications} />
          <div className="fixed top-14 right-3 z-50 w-80 max-h-96 rounded-2xl border border-[var(--border)] overflow-hidden animate-fadeIn shadow-2xl"
            style={{ background: 'var(--bg-secondary)' }}>
            <div className="flex items-center justify-between p-3 border-b border-[var(--border)]">
              <span className="font-semibold text-sm">通知</span>
              {unreadCount > 0 && (
                <button onClick={markAllNotificationsRead} className="text-xs text-[var(--accent-light)]">
                  全部已读
                </button>
              )}
            </div>
            <div className="overflow-y-auto max-h-80">
              {notifications.length === 0 ? (
                <div className="p-6 text-center text-[var(--text-muted)] text-sm">暂无通知</div>
              ) : (
                notifications.map((n) => (
                  <div
                    key={n.id}
                    className="flex items-start gap-3 p-3 transition-colors hover:bg-[var(--bg-hover)] cursor-pointer"
                    style={{ background: n.isRead ? 'transparent' : 'rgba(99,102,241,0.05)' }}
                  >
                    <img src={n.avatar} alt="" className="w-9 h-9 rounded-full flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm font-medium">{n.title}</span>
                        {!n.isRead && <span className="w-2 h-2 bg-indigo-500 rounded-full" />}
                      </div>
                      <p className="text-xs text-[var(--text-secondary)] mt-1 truncate">{n.content}</p>
                      <span className="text-[11px] text-[var(--text-muted)] mt-1">{n.createdAt}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}
