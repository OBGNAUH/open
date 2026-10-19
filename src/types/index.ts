export interface User {
  id: string;
  nickname: string;
  avatar: string;
  bio: string;
  city: string;
  country: string;
  tags: string[];
  languages: string[];
  online: boolean;
  lastActive: string;
  coverImage?: string;
  themeColor?: string;
}

export interface ChatRoom {
  id: string;
  name: string;
  description: string;
  avatar: string;
  type: 'world' | 'regional' | 'topic' | 'private';
  category: string;
  memberCount: number;
  onlineCount: number;
  tags: string[];
  isFavorite: boolean;
  isJoined: boolean;
  lastMessage?: string;
  lastMessageTime?: string;
}

export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  content: string;
  type: 'text' | 'image' | 'voice' | 'file';
  timestamp: string;
  replyTo?: string;
  isOwn: boolean;
}

export interface Friendship {
  id: string;
  user: User;
  status: 'pending' | 'accepted' | 'blocked';
  group?: string;
  note?: string;
  since: string;
}

export interface Post {
  id: string;
  author: User;
  content: string;
  images: string[];
  likes: number;
  comments: number;
  shares: number;
  isLiked: boolean;
  isBookmarked: boolean;
  visibility: 'public' | 'friends' | 'private';
  tags: string[];
  createdAt: string;
}

export interface Comment {
  id: string;
  author: User;
  content: string;
  likes: number;
  isLiked: boolean;
  createdAt: string;
  replyTo?: string;
}

export interface Notification {
  id: string;
  type: 'message' | 'friend_request' | 'like' | 'comment' | 'follow' | 'group_invite' | 'system';
  title: string;
  content: string;
  avatar: string;
  isRead: boolean;
  createdAt: string;
  actionUrl?: string;
}

export interface Conversation {
  id: string;
  type: 'dm' | 'group';
  participant: User | ChatRoom;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  isPinned: boolean;
  isMuted: boolean;
  isOnline?: boolean;
}

export interface Group {
  id: string;
  name: string;
  avatar: string;
  description: string;
  memberCount: number;
  owner: string;
  joinType: 'open' | 'request' | 'invite';
  tags: string[];
  isJoined: boolean;
}
