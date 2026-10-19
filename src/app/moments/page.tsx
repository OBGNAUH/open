'use client';
import { useState } from 'react';
import { Heart, MessageCircle, Share2, Bookmark, MoreHorizontal, Image, Send, X } from 'lucide-react';
import { useStore } from '@/store';
import AppShell from '@/components/layout/AppShell';
import { Post } from '@/types';
import { currentUser } from '@/data/mock';
import UserCard from '@/components/common/UserCard';
import { User } from '@/types';

function PostCard({ post, onLike, onBookmark, onUserClick }: {
  post: Post; onLike: () => void; onBookmark: () => void; onUserClick: (user: User) => void;
}) {
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState<{ author: string; avatar: string; text: string; time: string }[]>([
    { author: 'Alex', avatar: 'https://api.dicebear.com/96/alex.png', text: '太美了！想去！', time: '1小时前' },
    { author: 'Sofia', avatar: 'https://api.dicebear.com/96/sofia.png', text: '好棒的照片 📸', time: '30分钟前' },
  ]);

  const addComment = () => {
    if (!commentText.trim()) return;
    setComments([...comments, { author: currentUser.nickname, avatar: currentUser.avatar, text: commentText, time: '刚刚' }]);
    setCommentText('');
  };

  return (
    <div className="rounded-lg border border-[var(--border)] overflow-hidden animate-fadeIn" style={{ background: 'var(--bg-card)' }}>
      <div className="p-2.5">
        <div className="flex items-center gap-2.5 mb-2">
          <img src={post.author.avatar} alt={post.author.nickname}
            className="w-9 h-9 rounded-full cursor-pointer"
            onClick={() => onUserClick(post.author)} />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-sm cursor-pointer hover:text-[var(--accent-light)]"
                onClick={() => onUserClick(post.author)}>
                {post.author.nickname}
              </span>
              <span className="text-[9px] px-1 py-0.5 rounded"
                style={{ background: 'rgba(99,102,241,0.1)', color: 'var(--accent-light)' }}>
                {post.visibility === 'public' ? '公开' : post.visibility === 'friends' ? '好友' : '私密'}
              </span>
            </div>
            <span className="text-[10px] text-[var(--text-muted)]">{post.createdAt} · {post.author.city}</span>
          </div>
          <button className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-[var(--bg-hover)]">
            <MoreHorizontal size={14} className="text-[var(--text-muted)]" />
          </button>
        </div>

        <p className="text-sm leading-relaxed whitespace-pre-line">{post.content}</p>

        {post.images.length > 0 && (
          <div className="mt-3 grid gap-1" style={{ gridTemplateColumns: post.images.length === 1 ? '1fr' : '1fr 1fr' }}>
            {post.images.map((img, i) => (
              <img key={i} src={img} alt="" className="rounded-lg w-full object-cover" style={{ maxHeight: 240 }} />
            ))}
          </div>
        )}

        <div className="flex gap-2 mt-2 flex-wrap">
          {post.tags.map((tag) => (
            <span key={tag} className="text-[10px] text-[var(--accent-light)]">#{tag}</span>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between px-2 py-1.5 border-t border-[var(--border)]">
        <button onClick={onLike}
          className="flex items-center gap-1 px-2 py-1 rounded-full transition-all"
          style={{ color: post.isLiked ? '#ef4444' : 'var(--text-muted)' }}>
          <Heart size={14} fill={post.isLiked ? '#ef4444' : 'none'} />
          <span className="text-[11px]">{post.likes}</span>
        </button>
        <button onClick={() => setShowComments(!showComments)}
          className="flex items-center gap-1 px-2 py-1 rounded-full text-[var(--text-muted)]">
          <MessageCircle size={14} />
          <span className="text-[11px]">{post.comments}</span>
        </button>
        <button className="flex items-center gap-1 px-2 py-1 rounded-full text-[var(--text-muted)]">
          <Share2 size={14} />
          <span className="text-[11px]">{post.shares}</span>
        </button>
        <button onClick={onBookmark}
          className="flex items-center gap-1 px-2 py-1 rounded-full transition-all"
          style={{ color: post.isBookmarked ? '#f59e0b' : 'var(--text-muted)' }}>
          <Bookmark size={14} fill={post.isBookmarked ? '#f59e0b' : 'none'} />
        </button>
      </div>

      {showComments && (
        <div className="border-t border-[var(--border)] p-2.5">
          <div className="space-y-1.5 mb-2">
            {comments.map((c, i) => (
              <div key={i} className="flex gap-1.5">
                <img src={c.avatar} alt="" className="w-6 h-6 rounded-full flex-shrink-0" />
                <div className="flex-1">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] font-medium">{c.author}</span>
                    <span className="text-[9px] text-[var(--text-muted)]">{c.time}</span>
                  </div>
                  <p className="text-[11px] text-[var(--text-secondary)] mt-0.5">{c.text}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-1.5">
            <input
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addComment()}
              placeholder="写评论..."
              className="flex-1 h-7 px-2.5 rounded-full text-[11px]"
              style={{ background: 'var(--bg-secondary)' }}
            />
            <button onClick={addComment}
              className="w-7 h-7 rounded-full flex items-center justify-center"
              style={{ background: commentText ? 'var(--gradient-1)' : 'var(--bg-secondary)' }}>
              <Send size={11} className={commentText ? 'text-white' : 'text-[var(--text-muted)]'} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function MomentsPage() {
  const { posts, toggleLikePost, toggleBookmarkPost } = useStore();
  const [activeFeed, setActiveFeed] = useState<'recommend' | 'following'>('recommend');
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [newPostContent, setNewPostContent] = useState('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  return (
    <AppShell>
      <div className="max-w-lg mx-auto px-3 py-2">
        <div className="flex items-center justify-between mb-2.5">
          <h1 className="text-base font-bold">动态</h1>
          <button
            onClick={() => setShowCreatePost(true)}
            className="px-3 h-7 rounded-full text-[11px] font-medium flex items-center gap-1"
            style={{ background: 'var(--gradient-1)', color: 'white' }}>
            <Image size={12} /> 发布
          </button>
        </div>

        <div className="flex gap-1.5 mb-3">
          <button
            onClick={() => setActiveFeed('recommend')}
            className="flex-1 h-8 rounded-full text-xs font-medium transition-all"
            style={activeFeed === 'recommend'
              ? { background: 'var(--gradient-1)', color: 'white' }
              : { background: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}>
            推荐
          </button>
          <button
            onClick={() => setActiveFeed('following')}
            className="flex-1 h-8 rounded-full text-xs font-medium transition-all"
            style={activeFeed === 'following'
              ? { background: 'var(--gradient-1)', color: 'white' }
              : { background: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}>
            关注
          </button>
        </div>

        <div className="space-y-2">
          {posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onLike={() => toggleLikePost(post.id)}
              onBookmark={() => toggleBookmarkPost(post.id)}
              onUserClick={setSelectedUser}
            />
          ))}
        </div>
      </div>

      {showCreatePost && (
        <>
          <div className="fixed inset-0 z-50 bg-black/50" onClick={() => setShowCreatePost(false)} />
          <div className="fixed inset-x-4 bottom-20 z-50 rounded-2xl border border-[var(--border)] overflow-hidden animate-slideUp shadow-2xl"
            style={{ background: 'var(--bg-secondary)' }}>
            <div className="flex items-center justify-between p-3 border-b border-[var(--border)]">
              <span className="font-semibold text-sm">发布动态</span>
              <button onClick={() => setShowCreatePost(false)}>
                <X size={16} className="text-[var(--text-muted)]" />
              </button>
            </div>
            <div className="p-3">
              <textarea
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
                placeholder="分享你的想法..."
                className="w-full h-24 text-sm resize-none bg-transparent"
                autoFocus
              />
              <div className="flex items-center justify-between mt-2">
                <div className="flex gap-2">
                  <button className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: 'var(--bg-card)' }}>
                    <Image size={14} className="text-[var(--accent-light)]" />
                  </button>
                </div>
                <button
                  onClick={() => { setShowCreatePost(false); setNewPostContent(''); }}
                  className="px-4 h-8 rounded-full text-xs font-medium"
                  style={{ background: newPostContent ? 'var(--gradient-1)' : 'var(--bg-card)', color: newPostContent ? 'white' : 'var(--text-muted)' }}>
                  发布
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {selectedUser && <UserCard user={selectedUser} onClose={() => setSelectedUser(null)} />}
    </AppShell>
  );
}
