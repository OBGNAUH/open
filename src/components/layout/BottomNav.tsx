'use client';
import { Globe, MapPin, Users, Image, User } from 'lucide-react';
import { useStore } from '@/store';
import { useRouter } from 'next/navigation';

const tabs = [
  { id: 'world', label: '世界', icon: Globe, path: '/world' },
  { id: 'nearby', label: '附近', icon: MapPin, path: '/nearby' },
  { id: 'friends', label: '好友', icon: Users, path: '/friends' },
  { id: 'moments', label: '动态', icon: Image, path: '/moments' },
  { id: 'profile', label: '我的', icon: User, path: '/profile' },
];

export default function BottomNav() {
  const { activeTab, setActiveTab, notifications } = useStore();
  const router = useRouter();
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const handleTab = (tab: typeof tabs[0]) => {
    setActiveTab(tab.id);
    router.push(tab.path);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-[var(--border)]"
      style={{ background: 'rgba(15,15,26,0.98)', backdropFilter: 'blur(20px)' }}>
      <div className="max-w-lg mx-auto flex items-center justify-around h-16 px-2">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => handleTab(tab)}
              className="flex flex-col items-center justify-center gap-1 w-16 h-14 rounded-xl transition-all duration-200 relative"
              style={{
                color: isActive ? 'var(--accent-light)' : 'var(--text-muted)',
                background: isActive ? 'rgba(99,102,241,0.08)' : 'transparent',
              }}
            >
              <div className="relative">
                <Icon size={22} strokeWidth={isActive ? 2.2 : 1.6} />
                {tab.id === 'friends' && unreadCount > 0 && (
                  <span className="absolute -top-1.5 -right-2 w-4 h-4 bg-red-500 rounded-full text-[9px] text-white flex items-center justify-center font-bold">
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </span>
                )}
              </div>
              <span className="text-xs font-medium">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
