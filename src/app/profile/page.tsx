'use client';
import { useState } from 'react';
import { Settings, Edit3, Camera, MapPin, Link as LinkIcon, Shield, Bell, Moon, LogOut, ChevronRight, Eye } from 'lucide-react';
import { useStore } from '@/store';
import AppShell from '@/components/layout/AppShell';
import { posts } from '@/data/mock';

type Tab = 'posts' | 'album' | 'info';

export default function ProfilePage() {
  const { currentUser, posts: allPosts } = useStore();
  const [activeTab, setActiveTab] = useState<Tab>('posts');
  const [isEditing, setIsEditing] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [editBio, setEditBio] = useState(currentUser.bio);
  const [editCity, setEditCity] = useState(currentUser.city);

  const myPosts = allPosts.slice(0, 3);

  const settingsItems = [
    { icon: Shield, label: '隐私设置', desc: '管理谁能看到你的信息' },
    { icon: Bell, label: '通知设置', desc: '管理通知偏好' },
    { icon: Moon, label: '深色模式', desc: '已开启', toggle: true, value: darkMode, onChange: () => setDarkMode(!darkMode) },
    { icon: Eye, label: '访客记录', desc: '查看谁访问了你的主页' },
    { icon: LogOut, label: '退出登录', desc: '', danger: true },
  ];

  return (
    <AppShell>
      <div className="max-w-lg mx-auto">
        <div className="relative">
          <div className="h-28" style={{ background: 'var(--gradient-1)' }}>
            <button className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/30 flex items-center justify-center">
              <Camera size={14} className="text-white" />
            </button>
          </div>
          <div className="px-4 -mt-9">
            <div className="flex items-end gap-3">
              <div className="relative">
                <img src={currentUser.avatar} alt={currentUser.nickname}
                  className="w-18 h-18 rounded-full border-2 object-cover"
                  style={{ borderColor: 'var(--bg-primary)' }} />
                <button className="absolute bottom-0 right-0 w-6 h-6 rounded-full flex items-center justify-center border-2"
                  style={{ background: 'var(--accent)', borderColor: 'var(--bg-primary)' }}>
                  <Camera size={10} className="text-white" />
                </button>
              </div>
              <div className="flex-1 pb-1">
                <h1 className="text-xl font-bold">{currentUser.nickname}</h1>
                <p className="text-xs text-[var(--text-muted)]">ID: open_user_001</p>
              </div>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="h-8 px-4 rounded-full text-xs font-medium flex items-center gap-1.5"
                style={isEditing
                  ? { background: 'var(--success)', color: 'white' }
                  : { background: 'rgba(99,102,241,0.15)', color: 'var(--accent-light)' }}>
                <Edit3 size={12} />
                {isEditing ? '保存' : '编辑'}
              </button>
            </div>

            {isEditing ? (
              <div className="mt-3 space-y-2">
                <textarea
                  value={editBio}
                  onChange={(e) => setEditBio(e.target.value)}
                  className="w-full h-14 p-3 rounded-xl text-xs resize-none"
                  style={{ background: 'var(--bg-secondary)' }}
                />
                <input
                  value={editCity}
                  onChange={(e) => setEditCity(e.target.value)}
                  className="w-full h-9 px-3 rounded-xl text-xs"
                  style={{ background: 'var(--bg-secondary)' }}
                />
              </div>
            ) : (
              <p className="text-sm text-[var(--text-secondary)] mt-2">{editBio}</p>
            )}

            <div className="flex items-center gap-4 mt-3 text-xs text-[var(--text-muted)]">
              <span className="flex items-center gap-1.5"><MapPin size={12} /> {editCity}, {currentUser.country}</span>
              <span>{currentUser.languages.join(' / ')}</span>
            </div>

            <div className="flex gap-2 mt-2 flex-wrap">
              {currentUser.tags.map((tag) => (
                <span key={tag} className="px-2.5 py-1 rounded-lg text-xs"
                  style={{ background: 'rgba(99,102,241,0.15)', color: 'var(--accent-light)' }}>
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-6 mt-4 py-3 border-y border-[var(--border)]">
              <div className="text-center">
                <span className="text-lg font-bold">5</span>
                <p className="text-[10px] text-[var(--text-muted)]">好友</p>
              </div>
              <div className="text-center">
                <span className="text-lg font-bold">128</span>
                <p className="text-[10px] text-[var(--text-muted)]">关注</p>
              </div>
              <div className="text-center">
                <span className="text-lg font-bold">42</span>
                <p className="text-[10px] text-[var(--text-muted)]">粉丝</p>
              </div>
              <div className="text-center">
                <span className="text-lg font-bold">{myPosts.length}</span>
                <p className="text-[10px] text-[var(--text-muted)]">动态</p>
              </div>
            </div>
          </div>
        </div>

        <div className="px-4 py-3">
          <div className="flex gap-2 mb-3">
            {(['posts', 'album', 'info'] as Tab[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="flex-1 h-8 rounded-full text-xs font-medium transition-all"
                style={activeTab === tab
                  ? { background: 'var(--gradient-1)', color: 'white' }
                  : { background: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}>
                {tab === 'posts' ? '动态' : tab === 'album' ? '相册' : '资料'}
              </button>
            ))}
          </div>

          {activeTab === 'posts' && (
            <div className="space-y-3">
              {myPosts.map((post) => (
                <div key={post.id} className="rounded-xl border border-[var(--border)] p-3" style={{ background: 'var(--bg-card)' }}>
                  <p className="text-sm line-clamp-3">{post.content}</p>
                  {post.images.length > 0 && (
                    <div className="flex gap-1.5 mt-2">
                      {post.images.map((img, i) => (
                        <img key={i} src={img} alt="" className="w-16 h-16 rounded-lg object-cover" />
                      ))}
                    </div>
                  )}
                  <div className="flex items-center gap-4 mt-2 text-xs text-[var(--text-muted)]">
                    <span>{post.createdAt}</span>
                    <span>❤ {post.likes}</span>
                    <span>💬 {post.comments}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'album' && (
            <div className="grid grid-cols-3 gap-2">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="aspect-square rounded-xl flex items-center justify-center"
                  style={{ background: 'var(--bg-card)' }}>
                  <Camera size={24} className="text-[var(--text-muted)]" />
                </div>
              ))}
            </div>
          )}

          {activeTab === 'info' && (
            <div className="space-y-2">
              {[
                { label: '昵称', value: currentUser.nickname },
                { label: 'ID', value: 'open_user_001' },
                { label: '城市', value: editCity },
                { label: '国家', value: currentUser.country },
                { label: '语言', value: currentUser.languages.join(', ') },
                { label: '兴趣', value: currentUser.tags.join(', ') },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between p-3 rounded-xl" style={{ background: 'var(--bg-card)' }}>
                  <span className="text-xs text-[var(--text-muted)]">{item.label}</span>
                  <span className="text-sm">{item.value}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="px-4 pb-4">
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="w-full flex items-center gap-3 p-3 rounded-xl mb-2"
            style={{ background: 'var(--bg-card)' }}>
            <Settings size={16} className="text-[var(--accent-light)]" />
            <span className="text-sm font-medium flex-1 text-left">设置</span>
            <ChevronRight size={14} className="text-[var(--text-muted)]" />
          </button>

          {showSettings && (
            <div className="rounded-xl border border-[var(--border)] overflow-hidden animate-fadeIn" style={{ background: 'var(--bg-card)' }}>
              {settingsItems.map((item, i) => (
                <div key={i} className={`flex items-center gap-3 p-3 ${i < settingsItems.length - 1 ? 'border-b border-[var(--border)]' : ''}`}>
                  <item.icon size={16} className={item.danger ? 'text-red-400' : 'text-[var(--accent-light)]'} />
                  <div className="flex-1">
                    <span className={`text-sm ${item.danger ? 'text-red-400' : ''}`}>{item.label}</span>
                    {item.desc && <p className="text-[10px] text-[var(--text-muted)]">{item.desc}</p>}
                  </div>
                  {item.toggle ? (
                    <button
                      onClick={item.onChange}
                      className="w-11 h-6 rounded-full transition-colors relative"
                      style={{ background: item.value ? 'var(--accent)' : 'var(--bg-secondary)' }}>
                      <span className="absolute top-0.5 w-5 h-5 rounded-full bg-white transition-all"
                        style={{ left: item.value ? 24 : 2 }} />
                    </button>
                  ) : (
                    <ChevronRight size={14} className="text-[var(--text-muted)]" />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AppShell>
  );
}
