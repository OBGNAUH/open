'use client';
import { create } from 'zustand';
import { User, ChatRoom, Message, Post, Notification, Conversation, Friendship, Group } from '@/types';
import { currentUser, users, chatRooms, messages as mockMessages, posts as mockPosts, notifications as mockNotifications, conversations as mockConversations, friendships as mockFriendships, groups as mockGroups } from '@/data/mock';

interface AppState {
  currentUser: User;
  users: User[];
  chatRooms: ChatRoom[];
  messages: Message[];
  posts: Post[];
  notifications: Notification[];
  conversations: Conversation[];
  friendships: Friendship[];
  groups: Group[];
  activeTab: string;
  selectedRoom: ChatRoom | null;
  selectedUser: User | null;
  showNotifications: boolean;
  showSearch: boolean;

  setActiveTab: (tab: string) => void;
  setSelectedRoom: (room: ChatRoom | null) => void;
  setSelectedUser: (user: User | null) => void;
  toggleNotifications: () => void;
  toggleSearch: () => void;
  addMessage: (msg: Message) => void;
  toggleLikePost: (postId: string) => void;
  toggleBookmarkPost: (postId: string) => void;
  toggleFavoriteRoom: (roomId: string) => void;
  toggleJoinRoom: (roomId: string) => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
}

export const useStore = create<AppState>((set) => ({
  currentUser,
  users,
  chatRooms,
  messages: mockMessages,
  posts: mockPosts,
  notifications: mockNotifications,
  conversations: mockConversations,
  friendships: mockFriendships,
  groups: mockGroups,
  activeTab: 'world',
  selectedRoom: null,
  selectedUser: null,
  showNotifications: false,
  showSearch: false,

  setActiveTab: (tab) => set({ activeTab: tab }),
  setSelectedRoom: (room) => set({ selectedRoom: room }),
  setSelectedUser: (user) => set({ selectedUser: user }),
  toggleNotifications: () => set((s) => ({ showNotifications: !s.showNotifications })),
  toggleSearch: () => set((s) => ({ showSearch: !s.showSearch })),
  addMessage: (msg) => set((s) => ({ messages: [...s.messages, msg] })),
  toggleLikePost: (postId) =>
    set((s) => ({
      posts: s.posts.map((p) =>
        p.id === postId ? { ...p, isLiked: !p.isLiked, likes: p.isLiked ? p.likes - 1 : p.likes + 1 } : p
      ),
    })),
  toggleBookmarkPost: (postId) =>
    set((s) => ({
      posts: s.posts.map((p) =>
        p.id === postId ? { ...p, isBookmarked: !p.isBookmarked } : p
      ),
    })),
  toggleFavoriteRoom: (roomId) =>
    set((s) => ({
      chatRooms: s.chatRooms.map((r) =>
        r.id === roomId ? { ...r, isFavorite: !r.isFavorite } : r
      ),
    })),
  toggleJoinRoom: (roomId) =>
    set((s) => ({
      chatRooms: s.chatRooms.map((r) =>
        r.id === roomId ? { ...r, isJoined: !r.isJoined, memberCount: r.isJoined ? r.memberCount - 1 : r.memberCount + 1 } : r
      ),
    })),
  markNotificationRead: (id) =>
    set((s) => ({
      notifications: s.notifications.map((n) =>
        n.id === id ? { ...n, isRead: true } : n
      ),
    })),
  markAllNotificationsRead: () =>
    set((s) => ({
      notifications: s.notifications.map((n) => ({ ...n, isRead: true })),
    })),
}));
