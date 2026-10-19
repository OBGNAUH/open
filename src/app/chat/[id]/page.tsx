'use client';
import { useState, useRef, useEffect, Suspense } from 'react';
import { ArrowLeft, Send, Smile, Paperclip, Image, Mic, MoreVertical, Phone, Video, Users, Search } from 'lucide-react';
import { useStore } from '@/store';
import { useRouter, useParams } from 'next/navigation';
import { Message } from '@/types';
import { users, chatRooms, currentUser, messages as initialMessages } from '@/data/mock';
import UserCard from '@/components/common/UserCard';
import { User } from '@/types';

export default function ChatPageWrapper() {
  return (
    <Suspense fallback={
      <div className="h-screen flex items-center justify-center" style={{ background: 'var(--bg-primary)' }}>
        <div className="animate-pulse-slow text-[var(--text-muted)]">加载中...</div>
      </div>
    }>
      <ChatPage />
    </Suspense>
  );
}

function ChatPage() {
  const params = useParams();
  const chatId = params.id as string;
  const router = useRouter();
  const { messages, addMessage } = useStore();
  const [inputText, setInputText] = useState('');
  const [showEmoji, setShowEmoji] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const isGroupChat = chatRooms.some((r) => r.id === chatId);
  const chatRoom = chatRooms.find((r) => r.id === chatId);
  const chatUser = users.find((u) => u.id === chatId);

  const chatTitle = chatRoom?.name || chatUser?.nickname || '聊天';
  const chatAvatar = chatRoom?.avatar || chatUser?.avatar || '';
  const chatOnline = chatUser?.online;
  const memberCount = chatRoom?.memberCount;

  const chatMessages = chatRoom
    ? messages
    : messages.filter((m) => m.senderId === chatId || m.isOwn).length > 0
      ? messages.filter((m) => m.senderId === chatId || m.isOwn)
      : messages.slice(0, 5);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages.length]);

  const sendMessage = () => {
    if (!inputText.trim()) return;
    const newMsg: Message = {
      id: 'm' + Date.now(),
      senderId: currentUser.id,
      senderName: currentUser.nickname,
      senderAvatar: currentUser.avatar,
      content: inputText,
      type: 'text',
      timestamp: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
      isOwn: true,
    };
    addMessage(newMsg);
    setInputText('');
    setShowEmoji(false);

    if (chatUser) {
      setTimeout(() => {
        const replies = ['好的！', '哈哈 😄', '有意思！', '我也这么觉得', '谢谢你分享！', '太棒了 👍', '下次一起！'];
        const reply: Message = {
          id: 'm' + Date.now() + 'r',
          senderId: chatUser.id,
          senderName: chatUser.nickname,
          senderAvatar: chatUser.avatar,
          content: replies[Math.floor(Math.random() * replies.length)],
          type: 'text',
          timestamp: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
          isOwn: false,
        };
        addMessage(reply);
      }, 1000 + Math.random() * 2000);
    }
  };

  const emojis = ['😀', '😂', '🥰', '😎', '🤔', '😢', '👍', '❤️', '🎉', '🔥', '✨', '🌍', '📸', '🎵', '🍳', '⚽'];

  return (
    <div className="h-screen flex flex-col" style={{ background: 'var(--bg-primary)' }}>
      <header className="flex items-center h-14 px-3 border-b border-[var(--border)] flex-shrink-0"
        style={{ background: 'rgba(15,15,26,0.98)', backdropFilter: 'blur(20px)' }}>
        <button onClick={() => router.back()} className="w-9 h-9 rounded-full flex items-center justify-center mr-2 hover:bg-[var(--bg-hover)]">
          <ArrowLeft size={20} />
        </button>
        <img src={chatAvatar} alt="" className="w-9 h-9 rounded-full mr-2" />
        <div className="flex-1 min-w-0" onClick={() => isGroupChat && setShowInfo(!showInfo)}>
          <h2 className="font-semibold text-base truncate cursor-pointer">{chatTitle}</h2>
          <p className="text-xs text-[var(--text-muted)]">
            {chatRoom ? `${memberCount?.toLocaleString()} 成员 · ${chatRoom.onlineCount} 在线` :
              chatOnline ? '在线' : '最后活跃 ' + (chatUser?.lastActive || '')}
          </p>
        </div>
        <div className="flex items-center gap-1">
          <button className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-[var(--bg-hover)]">
            <Phone size={18} className="text-[var(--text-secondary)]" />
          </button>
          <button className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-[var(--bg-hover)]">
            <Video size={18} className="text-[var(--text-secondary)]" />
          </button>
          <button onClick={() => setShowInfo(!showInfo)} className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-[var(--bg-hover)]">
            <MoreVertical size={18} className="text-[var(--text-secondary)]" />
          </button>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto px-3 py-4">
        {!isGroupChat && chatMessages.length > 0 && (
          <div className="text-center mb-4">
            <span className="text-xs text-[var(--text-muted)] px-3 py-1 rounded-full" style={{ background: 'var(--bg-secondary)' }}>
              以下是你和 {chatUser?.nickname} 的对话
            </span>
          </div>
        )}

        {chatMessages.map((msg, idx) => {
          const isOwn = msg.isOwn;
          const showAvatar = !isOwn && (idx === 0 || chatMessages[idx - 1].senderId !== msg.senderId);
          return (
            <div key={msg.id} className={`flex gap-2 mb-3 ${isOwn ? 'flex-row-reverse' : ''} animate-fadeIn`}>
              {!isOwn && (
                <div className="w-8 flex-shrink-0">
                  {showAvatar && (
                    <img src={msg.senderAvatar} alt="" className="w-8 h-8 rounded-full cursor-pointer"
                      onClick={() => {
                        const u = users.find((u) => u.id === msg.senderId);
                        if (u) setSelectedUser(u);
                      }} />
                  )}
                </div>
              )}
              <div className={`max-w-[75%] ${isOwn ? 'items-end' : 'items-start'}`}>
                {showAvatar && !isOwn && (
                  <span className="text-xs text-[var(--text-muted)] mb-1 block">{msg.senderName}</span>
                )}
                <div
                  className="px-3 py-2 rounded-2xl text-sm"
                  style={isOwn
                    ? { background: 'var(--gradient-1)', color: 'white', borderBottomRightRadius: 4 }
                    : { background: 'var(--bg-card)', color: 'var(--text-primary)', borderBottomLeftRadius: 4 }}>
                  {msg.content}
                </div>
                <span className="text-[10px] text-[var(--text-muted)] mt-1 block" style={{ textAlign: isOwn ? 'right' : 'left' }}>
                  {msg.timestamp}
                </span>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {showEmoji && (
        <div className="px-3 py-2 border-t border-[var(--border)] flex gap-2 flex-wrap" style={{ background: 'var(--bg-secondary)' }}>
          {emojis.map((emoji) => (
            <button key={emoji} onClick={() => setInputText(inputText + emoji)}
              className="w-9 h-9 rounded-lg flex items-center justify-center text-base hover:bg-[var(--bg-hover)] transition-colors">
              {emoji}
            </button>
          ))}
        </div>
      )}

      <div className="flex items-center gap-2 p-3 border-t border-[var(--border)] flex-shrink-0"
        style={{ background: 'rgba(15,15,26,0.98)' }}>
        <button onClick={() => setShowEmoji(!showEmoji)}
          className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-[var(--bg-hover)]">
          <Smile size={20} className={showEmoji ? 'text-[var(--accent-light)]' : 'text-[var(--text-secondary)]'} />
        </button>
        <button className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-[var(--bg-hover)]">
          <Paperclip size={20} className="text-[var(--text-secondary)]" />
        </button>
        <div className="flex-1 flex items-center h-10 px-4 rounded-full" style={{ background: 'var(--bg-secondary)' }}>
          <input
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && sendMessage()}
            placeholder="输入消息..."
            className="flex-1 text-sm"
          />
        </div>
        {inputText.trim() ? (
          <button onClick={sendMessage}
            className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{ background: 'var(--gradient-1)' }}>
            <Send size={16} className="text-white" />
          </button>
        ) : (
          <button className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-[var(--bg-hover)]">
            <Mic size={20} className="text-[var(--text-secondary)]" />
          </button>
        )}
      </div>

      {showInfo && isGroupChat && chatRoom && (
        <>
          <div className="fixed inset-0 z-40 bg-black/50" onClick={() => setShowInfo(false)} />
          <div className="fixed right-0 top-0 bottom-0 z-50 w-72 border-l border-[var(--border)] overflow-y-auto animate-fadeIn"
            style={{ background: 'var(--bg-secondary)' }}>
            <div className="p-4 text-center">
              <img src={chatRoom.avatar} alt="" className="w-16 h-16 rounded-2xl mx-auto mb-2" />
              <h3 className="font-bold text-base">{chatRoom.name}</h3>
              <p className="text-xs text-[var(--text-muted)] mt-1">{chatRoom.description}</p>
              <p className="text-xs text-[var(--text-muted)] mt-1">
                {chatRoom.memberCount.toLocaleString()} 成员 · {chatRoom.onlineCount} 在线
              </p>
            </div>
            <div className="px-4 pb-4">
              <h4 className="text-xs font-semibold text-[var(--text-muted)] mb-2">在线成员</h4>
              <div className="space-y-1">
                {users.filter((u) => u.online).slice(0, 6).map((user) => (
                  <div key={user.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-[var(--bg-hover)] cursor-pointer"
                    onClick={() => { setSelectedUser(user); setShowInfo(false); }}>
                    <img src={user.avatar} alt="" className="w-9 h-9 rounded-full" />
                    <div className="flex-1 min-w-0">
                      <span className="text-sm">{user.nickname}</span>
                      <span className="w-2 h-2 bg-green-400 rounded-full ml-2 inline-block" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      {selectedUser && <UserCard user={selectedUser} onClose={() => setSelectedUser(null)} />}
    </div>
  );
}
