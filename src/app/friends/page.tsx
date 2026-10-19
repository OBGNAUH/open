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
      <div className="max-w-lg mx-auto px-4 py-3">
        <div className="flex items-center gap-3 mb-3">
          <Users size={20} className="text-[var(--accent-light)]" />
          <h1 className="text-lg font-bold">好友</h1>
        </div>

        <div className="flex gap-2 mb-3">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="flex items-center gap-1.5 px-3 h-8 rounded-full text-xs font-medium transition-all flex-1 justify-center"
              style={activeTab === tab.id
                ? { background: 'var(--gradient-1)', color: 'white' }
                : { background: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}>
              {tab.icon}
              {tab.label}
              {tab.count !== undefined && tab.count > 0 && (
                <span className="w-4 h-4 rounded-full text-[10px] flex items-center justify-center"
                  style={{ background: 'rgba(255,255,255,0.2)' }}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {activeTab === 'friends' && (
          <>
            <div className="flex items-center gap-2 h-10 px-4 rounded-full mb-3" style={{ background: 'var(--bg-secondary)' }}>
              <Search size={15} className="text-[var(--text-muted)]" />
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="搜索好友..."
                className="flex-1 text-sm"
              />
            </div>

            {filteredFriends.length === 0 ? (
              <div className="text-center py-12">
                <Users size={36} className="mx-auto text-[var(--text-muted)] mb-2" />
                <p className="text-sm text-[var(--text-muted)]">暂无好友</p>
                <button onClick={() => setActiveTab('discover')}
                  className="mt-3 px-4 h-9 rounded-full text-xs font-medium"
                  style={{ background: 'var(--gradient-1)', color: 'white' }}>
                  去发现新朋友
                </button>
              </div>
            ) : (
              <div className="space-y-1">
                {filteredFriends.map((f) => (
                  <div key={f.id}
                    className="flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-colors hover:bg-[var(--bg-hover)]"
                    style={{ background: 'var(--bg-card)' }}>
                    <img
                      src={f.user.avatar}
                      alt={f.user.nickname}
                      className="w-11 h-11 rounded-full cursor-pointer"
                      onClick={() => setSelectedUser(f.user)}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-sm">{f.user.nickname}</span>
                        {f.user.online && <span className="w-2 h-2 bg-green-400 rounded-full" />}
                      </div>
                      <p className="text-xs text-[var(--text-muted)] truncate">{f.user.bio}</p>
                    </div>
                    <button
                      onClick={() => router.push('/chat/' + f.user.id)}
                      className="w-8 h-8 rounded-full flex items-center justify-center transition-colors hover:bg-[var(--bg-hover)]"
                      style={{ background: 'rgba(99,102,241,0.15)' }}>
                      <MessageCircle size={14} className="text-[var(--accent-light)]" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {activeTab === 'requests' && (
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-[var(--text-secondary)] mb-2">待处理的好友申请</h3>
            {pendingRequests.map((user) => {
              const isAccepted = acceptedRequests.includes(user.id);
              const isRejected = rejectedRequests.includes(user.id);
              if (isAccepted || isRejected) return null;
              return (
                <div key={user.id}
                  className="flex items-center gap-3 p-3 rounded-xl"
                  style={{ background: 'var(--bg-card)' }}>
                  <img src={user.avatar} alt={user.nickname} className="w-11 h-11 rounded-full cursor-pointer"
                    onClick={() => setSelectedUser(user)} />
                  <div className="flex-1 min-w-0">
                    <span className="font-medium text-sm">{user.nickname}</span>
                    <p className="text-xs text-[var(--text-muted)] truncate">{user.city}, {user.country}</p>
                    <div className="flex gap-1.5 mt-1">
                      {user.tags.slice(0, 2).map((tag) => (
                        <span key={tag} className="px-2 py-0.5 rounded-lg text-[10px]"
                          style={{ background: 'rgba(99,102,241,0.1)', color: 'var(--accent-light)' }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setAcceptedRequests([...acceptedRequests, user.id])}
                      className="w-8 h-8 rounded-full flex items-center justify-center"
                      style={{ background: 'rgba(16,185,129,0.15)' }}>
                      <Check size={14} className="text-green-400" />
                    </button>
                    <button
                      onClick={() => setRejectedRequests([...rejectedRequests, user.id])}
                      className="w-8 h-8 rounded-full flex items-center justify-center"
                      style={{ background: 'rgba(239,68,68,0.15)' }}>
                      <X size={14} className="text-red-400" />
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
            <div className="rounded-xl p-4 mb-3" style={{ background: 'var(--gradient-1)' }}>
              <h3 className="font-semibold text-sm text-white mb-1">发现新朋友</h3>
              <p className="text-xs text-white/70">基于兴趣和语言匹配推荐</p>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {discoverUsers.map((user) => (
                <div key={user.id}
                  className="flex flex-col items-center p-4 rounded-xl border border-[var(--border)] cursor-pointer transition-all hover:border-[var(--accent)]/30"
                  style={{ background: 'var(--bg-card)' }}>
                  <img src={user.avatar} alt={user.nickname} className="w-14 h-14 rounded-full mb-2 cursor-pointer"
                    onClick={() => setSelectedUser(user)} />
                  <span className="text-sm font-medium">{user.nickname}</span>
                  <span className="text-[10px] text-[var(--text-muted)]">{user.city}</span>
                  <div className="flex gap-1.5 mt-2 flex-wrap justify-center">
                    {user.tags.slice(0, 2).map((tag) => (
                      <span key={tag} className="px-2 py-0.5 rounded-lg text-[10px]"
                        style={{ background: 'rgba(99,102,241,0.1)', color: 'var(--accent-light)' }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                  <button className="mt-3 w-full h-8 rounded-full text-xs font-medium flex items-center justify-center gap-1.5"
                    style={{ background: 'rgba(99,102,241,0.15)', color: 'var(--accent-light)' }}>
                    <UserPlus size={12} /> 添加好友
                  </button>
                </div>
              ))}
            </div>
          </>
        )}

        {activeTab === 'groups' && (
          <div className="space-y-2">
            {groups.map((group) => (
              <div key={group.id}
                className="flex items-center gap-3 p-3 rounded-xl border border-[var(--border)]"
                style={{ background: 'var(--bg-card)' }}>
                <img src={group.avatar} alt={group.name} className="w-12 h-12 rounded-xl" />
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-sm">{group.name}</h3>
                  <p className="text-xs text-[var(--text-muted)] truncate">{group.description}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] text-[var(--text-muted)]">{group.memberCount.toLocaleString()} 成员</span>
                    <span className="text-[10px] text-[var(--text-muted)]">
                      {group.joinType === 'open' ? '公开' : group.joinType === 'request' ? '需申请' : '仅邀请'}
                    </span>
                  </div>
                </div>
                <button className="px-3 h-8 rounded-full text-xs font-medium"
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
