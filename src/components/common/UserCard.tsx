'use client';
import { X, MessageCircle, UserPlus, Heart } from 'lucide-react';
import { User } from '@/types';
import { useRouter } from 'next/navigation';

interface UserCardProps {
  user: User;
  onClose: () => void;
}

export default function UserCard({ user, onClose }: UserCardProps) {
  const router = useRouter();

  return (
    <>
      <div className="fixed inset-0 z-50 bg-black/50" onClick={onClose} />
      <div className="fixed inset-x-6 top-1/3 z-50 rounded-2xl border border-[var(--border)] overflow-hidden animate-fadeIn shadow-2xl max-w-sm mx-auto"
        style={{ background: 'var(--bg-secondary)' }}>
        <div className="relative h-24" style={{ background: 'var(--gradient-1)' }}>
          <button onClick={onClose} className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/30 flex items-center justify-center text-white">
            <X size={14} />
          </button>
        </div>
        <div className="px-4 pb-4 -mt-8">
          <img src={user.avatar} alt={user.nickname} className="w-16 h-16 rounded-full border-2 object-cover"
            style={{ borderColor: 'var(--bg-secondary)' }} />
          <div className="mt-2">
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-base">{user.nickname}</h3>
              {user.online && <span className="w-2 h-2 bg-green-500 rounded-full" />}
            </div>
            <p className="text-xs text-[var(--text-secondary)] mt-1">{user.bio}</p>
            <p className="text-[11px] text-[var(--text-muted)] mt-1">{user.city}, {user.country}</p>
            <div className="flex flex-wrap gap-1.5 mt-2">
              {user.tags.map((tag) => (
                <span key={tag} className="px-2 py-1 rounded-full text-[10px] font-medium"
                  style={{ background: 'rgba(99,102,241,0.15)', color: 'var(--accent-light)' }}>
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex gap-2 mt-4">
              <button
                onClick={() => { onClose(); router.push('/chat/' + user.id); }}
                className="flex-1 h-9 rounded-full text-sm font-medium flex items-center justify-center gap-1.5 transition-opacity hover:opacity-80"
                style={{ background: 'var(--gradient-1)', color: 'white' }}
              >
                <MessageCircle size={14} /> 私聊
              </button>
              <button className="h-9 px-4 rounded-full text-sm font-medium flex items-center justify-center gap-1.5 border transition-colors"
                style={{ borderColor: 'var(--accent)', color: 'var(--accent-light)' }}>
                <UserPlus size={14} /> 好友
              </button>
              <button className="w-9 h-9 rounded-full flex items-center justify-center border transition-colors"
                style={{ borderColor: 'var(--border)', color: 'var(--text-secondary)' }}>
                <Heart size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
