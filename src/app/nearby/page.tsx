'use client';
import { useState } from 'react';
import { MapPin, TrendingUp, Users, ChevronRight } from 'lucide-react';
import { useStore } from '@/store';
import { useRouter } from 'next/navigation';
import AppShell from '@/components/layout/AppShell';
import { countries } from '@/data/mock';

export default function NearbyPage() {
  const { chatRooms, users } = useStore();
  const router = useRouter();
  const [selectedCountry, setSelectedCountry] = useState('中国');
  const [selectedCity, setSelectedCity] = useState('北京');

  const country = countries.find((c) => c.name === selectedCountry)!;
  const regionalRooms = chatRooms.filter((r) => r.type === 'regional');
  const cityRooms = regionalRooms.filter((r) => r.category === selectedCity);
  const activeUsers = users.filter((u) => u.country === selectedCountry).slice(0, 6);

  return (
    <AppShell>
      <div className="max-w-lg mx-auto px-4 py-3">
        <div className="flex items-center gap-3 mb-3">
          <MapPin size={20} className="text-[var(--accent-light)]" />
          <h1 className="text-lg font-bold">地方区域</h1>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 mb-3 scrollbar-none">
          {countries.map((c) => (
            <button
              key={c.code}
              onClick={() => { setSelectedCountry(c.name); setSelectedCity(c.cities[0]); }}
              className="flex items-center gap-1.5 px-3 h-9 rounded-full text-xs font-medium whitespace-nowrap flex-shrink-0 transition-all"
              style={selectedCountry === c.name
                ? { background: 'var(--gradient-1)', color: 'white' }
                : { background: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}>
              <span>{c.flag}</span> {c.name}
            </button>
          ))}
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 mb-3 scrollbar-none">
          {country.cities.map((city) => (
            <button
              key={city}
              onClick={() => setSelectedCity(city)}
              className="px-3 h-7 rounded-full text-xs whitespace-nowrap flex-shrink-0 transition-all"
              style={selectedCity === city
                ? { background: 'rgba(99,102,241,0.2)', color: 'var(--accent-light)' }
                : { background: 'var(--bg-card)', color: 'var(--text-muted)' }}>
              {city}
            </button>
          ))}
        </div>

        <div className="rounded-xl border border-[var(--border)] p-4 mb-3" style={{ background: 'var(--bg-card)' }}>
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp size={16} className="text-[var(--accent-light)]" />
            <span className="font-semibold text-sm">{selectedCity}热门话题</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {['周末去哪玩', '美食推荐', '同城交友', '语言交流', '工作机会', '文化活动'].map((topic) => (
              <span key={topic} className="px-2.5 py-1.5 rounded-lg text-xs cursor-pointer transition-colors hover:opacity-80"
                style={{ background: 'rgba(99,102,241,0.1)', color: 'var(--accent-light)' }}>
                #{topic}
              </span>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="font-semibold text-sm flex items-center gap-2">
              <Users size={14} className="text-[var(--accent-light)]" />
              {selectedCity}聊天室
            </span>
            <button className="text-xs text-[var(--accent-light)] flex items-center gap-1">
              更多 <ChevronRight size={12} />
            </button>
          </div>
          {cityRooms.length > 0 ? cityRooms.map((room) => (
            <div key={room.id}
              onClick={() => router.push('/chat/' + room.id)}
              className="flex items-center gap-3 p-3 rounded-xl border border-[var(--border)] mb-2 cursor-pointer transition-all hover:border-[var(--accent)]/30"
              style={{ background: 'var(--bg-card)' }}>
              <img src={room.avatar} alt={room.name} className="w-11 h-11 rounded-xl" />
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-sm">{room.name}</h3>
                <p className="text-xs text-[var(--text-muted)] truncate">{room.lastMessage}</p>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-green-400">{room.onlineCount} 在线</span>
                <p className="text-[10px] text-[var(--text-muted)]">{room.lastMessageTime}</p>
              </div>
            </div>
          )) : (
            <div className="text-center py-8 text-sm text-[var(--text-muted)]" style={{ background: 'var(--bg-card)', borderRadius: 12 }}>
              {selectedCity}暂无聊天室，成为第一个创建者吧！
            </div>
          )}
        </div>

        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="font-semibold text-sm flex items-center gap-2">
              <Users size={14} className="text-[var(--accent-light)]" />
              {selectedCountry}活跃用户
            </span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {activeUsers.map((user) => (
              <div key={user.id}
                onClick={() => router.push('/chat/' + user.id)}
                className="flex flex-col items-center p-3 rounded-xl border border-[var(--border)] cursor-pointer transition-all hover:border-[var(--accent)]/30"
                style={{ background: 'var(--bg-card)' }}>
                <img src={user.avatar} alt={user.nickname} className="w-12 h-12 rounded-full mb-1.5" />
                <span className="text-xs font-medium truncate w-full text-center">{user.nickname}</span>
                <span className="text-[10px] text-[var(--text-muted)]">{user.city}</span>
                {user.online && <span className="w-2 h-2 bg-green-400 rounded-full mt-1" />}
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-[var(--border)] p-4" style={{ background: 'var(--bg-card)' }}>
          <h3 className="font-semibold text-sm mb-3">区域推荐</h3>
          <div className="space-y-2">
            {regionalRooms.slice(0, 3).map((room) => (
              <div key={room.id}
                onClick={() => router.push('/chat/' + room.id)}
                className="flex items-center gap-3 p-2.5 rounded-lg cursor-pointer transition-colors hover:bg-[var(--bg-hover)]">
                <img src={room.avatar} alt={room.name} className="w-10 h-10 rounded-lg" />
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium">{room.name}</h4>
                  <p className="text-xs text-[var(--text-muted)]">{room.memberCount.toLocaleString()} 成员</p>
                </div>
                <button className="px-3 h-7 rounded-full text-xs font-medium"
                  style={room.isJoined
                    ? { background: 'rgba(99,102,241,0.15)', color: 'var(--accent-light)' }
                    : { background: 'var(--gradient-1)', color: 'white' }}>
                  {room.isJoined ? '已加入' : '加入'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
