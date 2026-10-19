'use client';
import { useState } from 'react';
import { UserPlus, Search, Users, Shuffle, Heart, Check, X, MessageCircle } from 'lucide-react';
import { useStore } from '@/store';
import { useRouter } from 'next/navigation';
import AppShell from '@/components/layout/AppShell';
import { users } from '@/data/mock';
import { User } from '@/types';
import UserCard from '@/components/common/UserCard';

type Tab = 'friends' | 'requests' | 'discover' | 'groups';

export default function FriendsPage() {
  const { friendships, conversations, groups } = useStore();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>('friends');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [acceptedRequests, setAcceptedRequests] = useState<string[]>([]);
  const [rejectedRequests, setRejectedRequests] = useState<string[]>([]);

  const tabs: { id: Tab; label: string; icon: React.ReactNode; count?: number }[] = [
    { id: 'friends', label: '好友', icon: <Users size={14} />, count: friendships.length },
    { id: 'requests', label: '申请', icon: <UserPlus size={14} />, count: 3 },
    { id: 'discover', label: '发现', icon: <Shuffle size={14} /> },
    { id: 'groups', label: '群组', icon: <MessageCircle size={14} />, count: groups.filter((g) => g.isJoined).length },
  ];

  const pendingRequests = users.slice(5, 8);
  const discoverUsers = users.filter((u) => !friendships.some((f) => f.user.id === u.id)).slice(0, 6);
  const filteredFriends = friendships.filter((f) =>
    f.user.nickname.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AppShell>
      <div className="max-w-lg mx-auto px-3 py-2">
        <div className="flex items-center gap-2 mb-2.5">
          <Users size={18} className="text-[var(--accent-light)]" />
          <h1 className="text-base font-bold">好友</h1>
        </div>

        <div className="flex gap-1 mb-3">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="flex items-center gap-1 px-2.5 h-7 rounded-full text-[11px] font-medium transition-all flex-1 justify-center"
              style={activeTab === tab.id
                ? { background: 'var(--gradient-1)', color: 'white' }
                : { background: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}>
              {tab.icon}
              {tab.label}
              {tab.count !== undefined && tab.count > 0 && (
                <span className="w-3.5 h-3.5 rounded-full text-[9px] flex items-center justify-center"
                  style={{ background: 'rgba(255,255,255,0.2)' }}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {activeTab === 'friends' && (
          <>
            <div className="flex items-center gap-2 h-8 px-3 rounded-full mb-2" style={{ background: 'var(--bg-secondary)' }}>
              <Search size={13} className="text-[var(--text-muted)]" />
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="搜索好友..."
                className="flex-1 text-xs"
              />
            </div>

            {filteredFriends.length === 0 ? (
              <div className="text-center py-12">
                <Users size={32} className="mx-auto text-[var(--text-muted)] mb-2" />
                <p className="text-xs text-[var(--text-muted)]">暂无好友</p>
                <button onClick={() => setActiveTab('discover')}
                  className="mt-2 px-3 h-7 rounded-full text-[11px] font-medium"
                  style={{ background: 'var(--gradient-1)', color: 'white' }}>
                  去发现新朋友
                </button>
              </div>
            ) : (
              <div className="space-y-0.5">
                {filteredFriends.map((f) => (
                  <div key={f.id}
                    className="flex items-center gap-2 p-2 rounded-lg cursor-pointer transition-colors hover:bg-[var(--bg-hover)]"
                    style={{ background: 'var(--bg-card)' }}>
                    <img
                      src={f.user.avatar}
                      alt={f.user.nickname}
                      className="w-9 h-9 rounded-full cursor-pointer"
                      onClick={() => setSelectedUser(f.user)}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="font-medium text-sm">{f.user.nickname}</span>
                        {f.user.online && <span className="w-1.5 h-1.5 bg-green-400 rounded-full" />}
                      </div>
                      <p className="text-[10px] text-[var(--text-muted)] truncate">{f.user.bio}</p>
                    </div>
                    <button
                      onClick={() => router.push('/chat/' + f.user.id)}
                      className="w-6 h-6 rounded-full flex items-center justify-center transition-colors hover:bg-[var(--bg-hover)]"
                      style={{ background: 'rgba(99,102,241,0.15)' }}>
                      <MessageCircle size={12} className="text-[var(--accent-light)]" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {activeTab === 'requests' && (
          <div className="space-y-1.5">
            <h3 className="text-xs font-semibold text-[var(--text-secondary)] mb-1.5">待处理的好友申请</h3>
            {pendingRequests.map((user) => {
              const isAccepted = acceptedRequests.includes(user.id);
              const isRejected = rejectedRequests.includes(user.id);
              if (isAccepted || isRejected) return null;
              return (
                <div key={user.id}
                  className="flex items-center gap-2 p-2 rounded-lg"
                  style={{ background: 'var(--bg-card)' }}>
                  <img src={user.avatar} alt={user.nickname} className="w-9 h-9 rounded-full cursor-pointer"
                    onClick={() => setSelectedUser(user)} />
                  <div className="flex-1 min-w-0">
                    <span className="font-medium text-sm">{user.nickname}</span>
                    <p className="text-[10px] text-[var(--text-muted)] truncate">{user.city}, {user.country}</p>
                    <div className="flex gap-1 mt-0.5">
                      {user.tags.slice(0, 2).map((tag) => (
                        <span key={tag} className="px-1 py-0.5 rounded text-[9px]"
                          style={{ background: 'rgba(99,102,241,0.1)', color: 'var(--accent-light)' }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-1.5">
                    <button
                      onClick={() => setAcceptedRequests([...acceptedRequests, user.id])}
                      className="w-7 h-7 rounded-full flex items-center justify-center"
                      style={{ background: 'rgba(16,185,129,0.15)' }}>
                      <Check size={12} className="text-green-400" />
                    </button>
                    <button
                      onClick={() => setRejectedRequests([...rejectedRequests, user.id])}
                      className="w-7 h-7 rounded-full flex items-center justify-center"
                      style={{ background: 'rgba(239,68,68,0.15)' }}>
                      <X size={12} className="text-red-400" />
                    </button>
                  </div>
                </div>
              );
            })}
            {acceptedRequests.length === pendingRequests.length && rejectedRequests.length + acceptedRequests.length === pendingRequests.length && (
              <div className="text-center py-8 text-sm text-[var(--text-muted)]">
                所有申请已处理
              </div>
            )}
          </div>
        )}

        {activeTab === 'discover' && (
          <>
            <div className="rounded-lg p-3 mb-3" style={{ background: 'var(--gradient-1)' }}>
              <h3 className="font-semibold text-xs text-white mb-0.5">发现新朋友</h3>
              <p className="text-[10px] text-white/70">基于兴趣和语言匹配推荐</p>
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              {discoverUsers.map((user) => (
                <div key={user.id}
                  className="flex flex-col items-center p-3 rounded-lg border border-[var(--border)] cursor-pointer transition-all hover:border-[var(--accent)]/30"
                  style={{ background: 'var(--bg-card)' }}>
                  <img src={user.avatar} alt={user.nickname} className="w-12 h-12 rounded-full mb-1.5 cursor-pointer"
                    onClick={() => setSelectedUser(user)} />
                  <span className="text-sm font-medium">{user.nickname}</span>
                  <span className="text-[10px] text-[var(--text-muted)]">{user.city}</span>
                  <div className="flex gap-1 mt-1.5 flex-wrap justify-center">
                    {user.tags.slice(0, 2).map((tag) => (
                      <span key={tag} className="px-1 py-0.5 rounded text-[9px]"
                        style={{ background: 'rgba(99,102,241,0.1)', color: 'var(--accent-light)' }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                  <button className="mt-2 w-full h-6 rounded-full text-[10px] font-medium flex items-center justify-center gap-1"
                    style={{ background: 'rgba(99,102,241,0.15)', color: 'var(--accent-light)' }}>
                    <UserPlus size={10} /> 添加好友
                  </button>
                </div>
              ))}
            </div>
          </>
        )}

        {activeTab === 'groups' && (
          <div className="space-y-1">
            {groups.map((group) => (
              <div key={group.id}
                className="flex items-center gap-2.5 p-2.5 rounded-lg border border-[var(--border)]"
                style={{ background: 'var(--bg-card)' }}>
                <img src={group.avatar} alt={group.name} className="w-10 h-10 rounded-lg" />
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-sm">{group.name}</h3>
                  <p className="text-[10px] text-[var(--text-muted)] truncate">{group.description}</p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="text-[9px] text-[var(--text-muted)]">{group.memberCount.toLocaleString()} 成员</span>
                    <span className="text-[9px] text-[var(--text-muted)]">
                      {group.joinType === 'open' ? '公开' : group.joinType === 'request' ? '需申请' : '仅邀请'}
                    </span>
                  </div>
                </div>
                <button className="px-2.5 h-6 rounded-full text-[10px] font-medium"
                  style={group.isJoined
                    ? { background: 'rgba(99,102,241,0.15)', color: 'var(--accent-light)' }
                    : { background: 'var(--gradient-1)', color: 'white' }}>
                  {group.isJoined ? '已加入' : '加入'}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedUser && <UserCard user={selectedUser} onClose={() => setSelectedUser(null)} />}
    </AppShell>
  );
}
