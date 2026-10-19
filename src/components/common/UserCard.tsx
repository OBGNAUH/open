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
        <div className="relative h-20" style={{ background: 'var(--gradient-1)' }}>
          <button onClick={onClose} className="absolute top-2 right-2 w-6 h-6 rounded-full bg-black/30 flex items-center justify-center text-white">
            <X size={12} />
          </button>
        </div>
        <div className="px-3 pb-3 -mt-7">
          <img src={user.avatar} alt={user.nickname} className="w-14 h-14 rounded-full border-2 object-cover"
            style={{ borderColor: 'var(--bg-secondary)' }} />
          <div className="mt-1.5">
            <div className="flex items-center gap-1.5">
              <h3 className="font-bold text-sm">{user.nickname}</h3>
              {user.online && <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />}
            </div>
            <p className="text-[11px] text-[var(--text-secondary)] mt-0.5">{user.bio}</p>
            <p className="text-[10px] text-[var(--text-muted)] mt-0.5">{user.city}, {user.country}</p>
            <div className="flex flex-wrap gap-1 mt-1.5">
              {user.tags.map((tag) => (
                <span key={tag} className="px-1.5 py-0.5 rounded-full text-[9px] font-medium"
                  style={{ background: 'rgba(99,102,241,0.15)', color: 'var(--accent-light)' }}>
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex gap-1.5 mt-3">
              <button
                onClick={() => { onClose(); router.push('/chat/' + user.id); }}
                className="flex-1 h-8 rounded-full text-xs font-medium flex items-center justify-center gap-1 transition-opacity hover:opacity-80"
                style={{ background: 'var(--gradient-1)', color: 'white' }}
              >
                <MessageCircle size={12} /> 私聊
              </button>
              <button className="h-8 px-3 rounded-full text-xs font-medium flex items-center justify-center gap-1 border transition-colors"
                style={{ borderColor: 'var(--accent)', color: 'var(--accent-light)' }}>
                <UserPlus size={12} /> 好友
              </button>
              <button className="w-8 h-8 rounded-full flex items-center justify-center border transition-colors"
                style={{ borderColor: 'var(--border)', color: 'var(--text-secondary)' }}>
                <Heart size={12} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
