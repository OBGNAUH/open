'use client';
import { useState } from 'react';
import { Star, Users, Search, Plus, Globe, MessageSquare } from 'lucide-react';
import { useStore } from '@/store';
import { useRouter } from 'next/navigation';
import AppShell from '@/components/layout/AppShell';
import { topicCategories } from '@/data/mock';
import { ChatRoom } from '@/types';

function RoomCard({ room, onOpen, onFav, onJoin }: {
  room: ChatRoom; onOpen: () => void; onFav: () => void; onJoin: () => void;
}) {
  return (
    <div className="rounded-2xl border-2 border-indigo-500/40 p-6 transition-all hover:border-[var(--accent)]/30 cursor-pointer"
      style={{ background: 'var(--bg-card)' }}
      onClick={onOpen}>
      <div className="flex items-start gap-4">
        <img src={room.avatar} alt={room.name} className="w-16 h-16 rounded-2xl object-cover flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-lg truncate">{room.name}</h3>
            <button onClick={(e) => { e.stopPropagation(); onFav(); }}
              className="flex-shrink-0">
              <Star size={18} fill={room.isFavorite ? '#f59e0b' : 'none'}
                className={room.isFavorite ? 'text-amber-400' : 'text-[var(--text-muted)]'} />
            </button>
          </div>
          <p className="text-base text-[var(--text-secondary)] mt-2 truncate">{room.description}</p>
          <div className="flex items-center gap-4 mt-3">
            <span className="flex items-center gap-1.5 text-sm text-[var(--text-muted)]">
              <Users size={14} /> {room.memberCount.toLocaleString()}
            </span>
            <span className="flex items-center gap-1.5 text-sm text-green-400">
              <span className="w-2.5 h-2.5 bg-green-400 rounded-full animate-pulse-slow" />
              {room.onlineCount} 在线
            </span>
            {room.lastMessage && (
              <span className="text-sm text-[var(--text-muted)] truncate flex-1">
                {room.lastMessage}
              </span>
            )}
          </div>
        </div>
        <button
          onClick={(e) => { e.stopPropagation(); onJoin(); }}
          className="px-5 h-10 rounded-full text-sm font-medium flex-shrink-0 transition-opacity hover:opacity-80"
          style={room.isJoined
            ? { background: 'rgba(99,102,241,0.15)', color: 'var(--accent-light)' }
            : { background: 'var(--gradient-1)', color: 'white' }}>
          {room.isJoined ? '已加入' : '加入'}
        </button>
      </div>
      <div className="flex gap-2 mt-3">
        {room.tags.map((tag) => (
          <span key={tag} className="px-3 py-1.5 rounded-xl text-sm font-medium"
            style={{ background: 'rgba(99,102,241,0.1)', color: 'var(--accent-light)' }}>
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function WorldPage() {
  const { chatRooms, toggleFavoriteRoom, toggleJoinRoom, setActiveTab } = useStore();
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState('全部');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFavorites, setShowFavorites] = useState(false);

  const filteredRooms = chatRooms.filter((r) => {
    if (showFavorites && !r.isFavorite) return false;
    if (activeCategory !== '全部' && !r.tags.includes(activeCategory) && r.category !== activeCategory) return false;
    if (searchQuery && !r.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !r.description.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const openRoom = (room: ChatRoom) => {
    router.push('/chat/' + room.id);
  };

  return (
    <AppShell>
      <div className="max-w-lg mx-auto px-5 py-4">
        <div className="flex items-center gap-3 mb-4">
          <Globe size={24} className="text-[var(--accent-light)]" />
          <h1 className="text-xl font-bold">世界聊天大厅</h1>
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-500 text-white">HIG v2</span>
          <div className="flex-1" />
          <button
            onClick={() => setShowFavorites(!showFavorites)}
            className="flex items-center gap-1.5 px-4 h-10 rounded-full text-sm transition-colors"
            style={{ background: showFavorites ? 'rgba(245,158,11,0.15)' : 'var(--bg-secondary)', color: showFavorites ? '#f59e0b' : 'var(--text-secondary)' }}>
            <Star size={14} fill={showFavorites ? '#f59e0b' : 'none'} /> 收藏
          </button>
        </div>

        <div className="flex items-center gap-3 mb-4">
          <div className="flex-1 flex items-center gap-2 h-12 px-5 rounded-2xl" style={{ background: 'var(--bg-secondary)' }}>
            <Search size={18} className="text-[var(--text-muted)]" />
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="搜索聊天室..."
              className="flex-1 text-base"
            />
          </div>
          <button className="w-12 h-12 rounded-2xl flex items-center justify-center"
            style={{ background: 'var(--gradient-1)' }}>
            <Plus size={20} className="text-white" />
          </button>
        </div>

        <div className="flex gap-2.5 overflow-x-auto pb-2 mb-4 scrollbar-none">
          {topicCategories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => setActiveCategory(cat.name)}
              className="flex items-center gap-2 px-4 h-10 rounded-2xl text-sm font-medium whitespace-nowrap flex-shrink-0 transition-all"
              style={activeCategory === cat.name
                ? { background: 'var(--gradient-1)', color: 'white' }
                : { background: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}>
              <span>{cat.icon}</span> {cat.name}
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between mb-3">
          <span className="text-sm text-[var(--text-muted)]">
            {filteredRooms.length} 个聊天室
          </span>
          <div className="flex gap-2">
            <button className="text-sm px-4 py-1.5 rounded-full" style={{ background: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}>
              公开
            </button>
            <button className="text-sm px-4 py-1.5 rounded-full" style={{ background: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}>
              主题
            </button>
          </div>
        </div>

        <div className="space-y-3">
          {filteredRooms.map((room) => (
            <RoomCard
              key={room.id}
              room={room}
              onOpen={() => openRoom(room)}
              onFav={() => toggleFavoriteRoom(room.id)}
              onJoin={() => toggleJoinRoom(room.id)}
            />
          ))}
        </div>

        {filteredRooms.length === 0 && (
          <div className="text-center py-12">
            <MessageSquare size={32} className="mx-auto text-[var(--text-muted)] mb-2" />
            <p className="text-xs text-[var(--text-muted)]">没有找到匹配的聊天室</p>
          </div>
        )}
      </div>
    </AppShell>
  );
}
