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
        <div className="max-w-lg mx-auto flex items-center h-12 px-3 gap-2">
          <div className="font-bold text-base bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            OPEN
          </div>

          {!showSearch ? (
            <button
              onClick={() => setShowSearch(true)}
              className="flex-1 flex items-center gap-2 h-8 px-3 rounded-full transition-colors"
              style={{ background: 'var(--bg-secondary)' }}
            >
              <Search size={14} className="text-[var(--text-muted)]" />
              <span className="text-xs text-[var(--text-muted)]">搜索用户、聊天室、动态...</span>
            </button>
          ) : (
            <div className="flex-1 flex items-center gap-2 h-8 px-3 rounded-full" style={{ background: 'var(--bg-secondary)' }}>
              <Search size={14} className="text-[var(--text-muted)]" />
              <input
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onBlur={() => { if (!searchQuery) setShowSearch(false); }}
                placeholder="搜索..."
                className="flex-1 text-xs bg-transparent"
              />
              {searchQuery && (
                <button onClick={() => { setSearchQuery(''); setShowSearch(false); }} className="text-[var(--text-muted)]">
                  ✕
                </button>
              )}
            </div>
          )}

          <div className="flex items-center gap-0.5">
            <button
              onClick={() => router.push('/chat/global')}
              className="w-8 h-8 flex items-center justify-center rounded-full transition-colors hover:bg-[var(--bg-hover)]"
            >
              <MessageCircle size={18} className="text-[var(--text-secondary)]" />
            </button>
            <button
              onClick={toggleNotifications}
              className="w-8 h-8 flex items-center justify-center rounded-full transition-colors hover:bg-[var(--bg-hover)] relative"
            >
              <Bell size={18} className="text-[var(--text-secondary)]" />
              {unreadCount > 0 && (
                <span className="absolute top-0.5 right-0.5 w-3.5 h-3.5 bg-red-500 rounded-full text-[9px] text-white flex items-center justify-center font-bold">
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
          <div className="fixed top-12 right-2 z-50 w-72 max-h-80 rounded-xl border border-[var(--border)] overflow-hidden animate-fadeIn shadow-2xl"
            style={{ background: 'var(--bg-secondary)' }}>
            <div className="flex items-center justify-between p-2 border-b border-[var(--border)]">
              <span className="font-semibold text-[11px]">通知</span>
              {unreadCount > 0 && (
                <button onClick={markAllNotificationsRead} className="text-[10px] text-[var(--accent-light)]">
                  全部已读
                </button>
              )}
            </div>
            <div className="overflow-y-auto max-h-72">
              {notifications.length === 0 ? (
                <div className="p-4 text-center text-[var(--text-muted)] text-[10px]">暂无通知</div>
              ) : (
                notifications.map((n) => (
                  <div
                    key={n.id}
                    className="flex items-start gap-2 p-2 transition-colors hover:bg-[var(--bg-hover)] cursor-pointer"
                    style={{ background: n.isRead ? 'transparent' : 'rgba(99,102,241,0.05)' }}
                  >
                    <img src={n.avatar} alt="" className="w-7 h-7 rounded-full flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1">
                        <span className="text-[11px] font-medium">{n.title}</span>
                        {!n.isRead && <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full" />}
                      </div>
                      <p className="text-[10px] text-[var(--text-secondary)] mt-0.5 truncate">{n.content}</p>
                      <span className="text-[9px] text-[var(--text-muted)] mt-0.5">{n.createdAt}</span>
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
