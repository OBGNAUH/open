import { User, ChatRoom, Message, Post, Notification, Conversation, Group, Friendship } from '@/types';

const avatarColors = ['4F46E5', '7C3AED', 'EC4899', 'F59E0B', '10B981', '3B82F6', '8B5CF6', 'EF4444'];
const avatar = (seed: string, idx = 0) =>
  `https://api.dicebear.com/7.x/initials/png?seed=${seed}&backgroundColor=${avatarColors[idx % avatarColors.length]}`;

export const currentUser: User = {
  id: 'u0',
  nickname: '我',
  avatar: avatar('me', 0),
  bio: '探索世界，连接你我 🌍',
  city: '北京',
  country: '中国',
  tags: ['科技', '旅行', '音乐', '摄影'],
  languages: ['中文', 'English'],
  online: true,
  lastActive: '刚刚',
  coverImage: '',
  themeColor: '#4F46E5',
};

export const users: User[] = [
  { id: 'u1', nickname: 'Alex', avatar: avatar('alex', 1), bio: 'Traveler & photographer 📸', city: 'Tokyo', country: '日本', tags: ['旅行', '摄影', '美食'], languages: ['日本語', 'English'], online: true, lastActive: '刚刚' },
  { id: 'u2', nickname: 'Sofia', avatar: avatar('sofia', 2), bio: 'Music is life 🎵', city: 'Madrid', country: '西班牙', tags: ['音乐', '舞蹈', '艺术'], languages: ['Español', 'English'], online: true, lastActive: '2分钟前' },
  { id: 'u3', nickname: '李明', avatar: avatar('liming', 3), bio: '程序员 / 开源爱好者', city: '上海', country: '中国', tags: ['科技', '编程', '游戏'], languages: ['中文', 'English'], online: false, lastActive: '30分钟前' },
  { id: 'u4', nickname: 'Emma', avatar: avatar('emma', 4), bio: 'Yoga & meditation 🧘‍♀️', city: 'London', country: '英国', tags: ['健康', '瑜伽', '冥想'], languages: ['English', 'Français'], online: true, lastActive: '刚刚' },
  { id: 'u5', nickname: 'Yuki', avatar: avatar('yuki', 5), bio: 'アニメとゲームが好き！', city: 'Osaka', country: '日本', tags: ['动漫', '游戏', '绘画'], languages: ['日本語'], online: false, lastActive: '1小时前' },
  { id: 'u6', nickname: 'Carlos', avatar: avatar('carlos', 6), bio: 'Chef & food lover 🍳', city: 'Mexico City', country: '墨西哥', tags: ['美食', '烹饪', '旅行'], languages: ['Español', 'English'], online: true, lastActive: '5分钟前' },
  { id: 'u7', nickname: 'Fatima', avatar: avatar('fatima', 7), bio: 'Student, dreamer ✨', city: 'Dubai', country: '阿联酋', tags: ['学习', '文学', '科技'], languages: ['العربية', 'English'], online: true, lastActive: '刚刚' },
  { id: 'u8', nickname: '王芳', avatar: avatar('wangfang', 0), bio: '自由撰稿人 / 旅行博主', city: '成都', country: '中国', tags: ['写作', '旅行', '咖啡'], languages: ['中文'], online: false, lastActive: '2小时前' },
  { id: 'u9', nickname: 'Hans', avatar: avatar('hans', 1), bio: 'Engineer at heart 🔧', city: 'Berlin', country: '德国', tags: ['科技', '汽车', '音乐'], languages: ['Deutsch', 'English'], online: true, lastActive: '10分钟前' },
  { id: 'u10', nickname: 'Priya', avatar: avatar('priya', 2), bio: 'Dancing through life 💃', city: 'Mumbai', country: '印度', tags: ['舞蹈', '音乐', '电影'], languages: ['हिन्दी', 'English'], online: true, lastActive: '刚刚' },
];

export const chatRooms: ChatRoom[] = [
  { id: 'r1', name: '全球大厅', description: '与全世界的人聊天', avatar: avatar('global', 0), type: 'world', category: '公开', memberCount: 12580, onlineCount: 3420, tags: ['全球', '公开'], isFavorite: true, isJoined: true, lastMessage: '大家好！有人想聊天吗？', lastMessageTime: '刚刚' },
  { id: 'r2', name: 'English Speaking', description: 'Practice English together', avatar: avatar('english', 1), type: 'world', category: '语言', memberCount: 8920, onlineCount: 1560, tags: ['英语', '学习'], isFavorite: false, isJoined: true, lastMessage: 'Anyone up for a conversation?', lastMessageTime: '2分钟前' },
  { id: 'r3', name: '科技前沿', description: '讨论最新科技动态', avatar: avatar('tech', 2), type: 'topic', category: '科技', memberCount: 5640, onlineCount: 890, tags: ['科技', 'AI', '编程'], isFavorite: true, isJoined: true, lastMessage: '新的AI模型发布了！', lastMessageTime: '5分钟前' },
  { id: 'r4', name: '音乐分享', description: '分享你喜欢的音乐', avatar: avatar('music', 3), type: 'topic', category: '音乐', memberCount: 4320, onlineCount: 670, tags: ['音乐', '分享'], isFavorite: false, isJoined: false, lastMessage: '推荐一首新歌给大家', lastMessageTime: '10分钟前' },
  { id: 'r5', name: '旅行者联盟', description: '旅行故事与攻略分享', avatar: avatar('travel', 4), type: 'topic', category: '旅行', memberCount: 7890, onlineCount: 1230, tags: ['旅行', '攻略', '摄影'], isFavorite: true, isJoined: true, lastMessage: '刚从冰岛回来，太美了！', lastMessageTime: '3分钟前' },
  { id: 'r6', name: '北京同城', description: '北京朋友交流聚会', avatar: avatar('beijing', 5), type: 'regional', category: '北京', memberCount: 3450, onlineCount: 560, tags: ['北京', '同城'], isFavorite: false, isJoined: true, lastMessage: '周末有人想去故宫吗？', lastMessageTime: '8分钟前' },
  { id: 'r7', name: '东京生活', description: '東京の生活を共有', avatar: avatar('tokyo', 6), type: 'regional', category: '东京', memberCount: 2890, onlineCount: 430, tags: ['东京', '日本'], isFavorite: false, isJoined: false, lastMessage: '新宿の新スポット発見！', lastMessageTime: '15分钟前' },
  { id: 'r8', name: '美食天地', description: '分享美食与烹饪', avatar: avatar('food', 7), type: 'topic', category: '美食', memberCount: 6780, onlineCount: 980, tags: ['美食', '烹饪'], isFavorite: false, isJoined: true, lastMessage: '今天的晚餐做了火锅', lastMessageTime: '1分钟前' },
  { id: 'r9', name: '运动健身', description: '健身打卡与运动交流', avatar: avatar('fitness', 0), type: 'topic', category: '运动', memberCount: 4560, onlineCount: 720, tags: ['运动', '健身'], isFavorite: false, isJoined: false, lastMessage: '今天跑了10公里！', lastMessageTime: '20分钟前' },
  { id: 'r10', name: '上海同城', description: '上海朋友交流', avatar: avatar('shanghai', 1), type: 'regional', category: '上海', memberCount: 2980, onlineCount: 480, tags: ['上海', '同城'], isFavorite: false, isJoined: false, lastMessage: '外滩夜景太美了', lastMessageTime: '12分钟前' },
];

export const messages: Message[] = [
  { id: 'm1', senderId: 'u1', senderName: 'Alex', senderAvatar: avatar('alex', 1), content: '大家好！有人想聊天吗？', type: 'text', timestamp: '14:30', isOwn: false },
  { id: 'm2', senderId: 'u2', senderName: 'Sofia', senderAvatar: avatar('sofia', 2), content: 'Hola! 我在马德里，很高兴认识大家 🎵', type: 'text', timestamp: '14:31', isOwn: false },
  { id: 'm3', senderId: 'u0', senderName: '我', senderAvatar: avatar('me', 0), content: '大家好！我在北京，很高兴加入这个聊天室', type: 'text', timestamp: '14:32', isOwn: true },
  { id: 'm4', senderId: 'u4', senderName: 'Emma', senderAvatar: avatar('emma', 4), content: 'Welcome everyone! London here 🇬🇧', type: 'text', timestamp: '14:33', isOwn: false },
  { id: 'm5', senderId: 'u6', senderName: 'Carlos', senderAvatar: avatar('carlos', 6), content: 'Hey! Anyone tried Mexican food? I can share recipes 🌮', type: 'text', timestamp: '14:34', isOwn: false },
  { id: 'm6', senderId: 'u7', senderName: 'Fatima', senderAvatar: avatar('fatima', 7), content: 'This is so cool! People from all over the world chatting together ✨', type: 'text', timestamp: '14:35', isOwn: false },
  { id: 'm7', senderId: 'u3', senderName: '李明', senderAvatar: avatar('liming', 3), content: '大家好，作为程序员，我觉得这个平台太棒了', type: 'text', timestamp: '14:36', isOwn: false },
  { id: 'm8', senderId: 'u1', senderName: 'Alex', senderAvatar: avatar('alex', 1), content: '我最近去了京都拍照，太美了！下次可以分享给你们', type: 'text', timestamp: '14:37', isOwn: false },
  { id: 'm9', senderId: 'u0', senderName: '我', senderAvatar: avatar('me', 0), content: '期待你的照片！我也很喜欢摄影 📸', type: 'text', timestamp: '14:38', isOwn: true },
  { id: 'm10', senderId: 'u9', senderName: 'Priya', senderAvatar: avatar('priya', 2), content: 'Namaste! 来自印度的问候 💃 有人喜欢宝莱坞舞蹈吗？', type: 'text', timestamp: '14:39', isOwn: false },
];

export const posts: Post[] = [
  {
    id: 'p1',
    author: users[0],
    content: '今天在京都的金阁寺拍到了绝美的日落！夕阳把整个寺庙染成了金色，水面上的倒影美得不真实 🌅\n\n#旅行 #摄影 #日本 #京都',
    images: ['https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=600'],
    likes: 234,
    comments: 45,
    shares: 12,
    isLiked: false,
    isBookmarked: true,
    visibility: 'public',
    tags: ['旅行', '摄影', '日本'],
    createdAt: '2小时前',
  },
  {
    id: 'p2',
    author: users[1],
    content: '新单曲循环中！推荐给大家 🎵\n有时候音乐能跨越语言的障碍，连接每一个心灵。\n\n#音乐 #分享 #日常',
    images: [],
    likes: 156,
    comments: 23,
    shares: 8,
    isLiked: true,
    isBookmarked: false,
    visibility: 'public',
    tags: ['音乐', '分享'],
    createdAt: '4小时前',
  },
  {
    id: 'p3',
    author: users[2],
    content: '刚刚完成了一个开源项目的第一个版本！虽然还很粗糙，但看到代码跑起来的那一刻真的很开心 💻\n\n开源地址稍后分享，欢迎star和贡献代码！\n\n#编程 #开源 #科技',
    images: [],
    likes: 89,
    comments: 34,
    shares: 15,
    isLiked: false,
    isBookmarked: false,
    visibility: 'public',
    tags: ['编程', '开源'],
    createdAt: '6小时前',
  },
  {
    id: 'p4',
    author: users[3],
    content: 'Morning yoga flow 🧘‍♀️ 新的一天从平静的心灵开始。\n\n今天分享的是一组适合初学者的晨间瑜伽动作，每天15分钟，你会感受到身体的变化。\n\n#瑜伽 #健康 #冥想',
    images: ['https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600'],
    likes: 312,
    comments: 67,
    shares: 28,
    isLiked: true,
    isBookmarked: true,
    visibility: 'public',
    tags: ['瑜伽', '健康'],
    createdAt: '8小时前',
  },
  {
    id: 'p5',
    author: users[5],
    content: '今天教大家做一道正宗的墨西哥塔可！🌮\n\n材料：玉米饼、牛肉、洋葱、香菜、青柠、莎莎酱\n\n秘诀在于慢炖牛肉，加入秘制香料，炖足3小时。配上手工玉米饼，一口咬下去就是满满的幸福感！\n\n#美食 #烹饪 #墨西哥菜',
    images: ['https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=600'],
    likes: 445,
    comments: 89,
    shares: 56,
    isLiked: false,
    isBookmarked: false,
    visibility: 'public',
    tags: ['美食', '烹饪'],
    createdAt: '10小时前',
  },
  {
    id: 'p6',
    author: users[7],
    content: '成都的秋天真的太舒服了 🍂\n\n在人民公园喝了一下午的盖碗茶，看老大爷们下棋聊天。这种慢生活，才是成都的灵魂。\n\n推荐大家来成都走走，感受这座城市的温度。\n\n#成都 #旅行 #生活',
    images: ['https://images.unsplash.com/photo-1590417975018-5b74e2d13f56?w=600'],
    likes: 278,
    comments: 56,
    shares: 19,
    isLiked: true,
    isBookmarked: false,
    visibility: 'public',
    tags: ['旅行', '生活'],
    createdAt: '12小时前',
  },
];

export const notifications: Notification[] = [
  { id: 'n1', type: 'friend_request', title: '新好友申请', content: 'Alex 请求添加你为好友', avatar: avatar('alex', 1), isRead: false, createdAt: '5分钟前' },
  { id: 'n2', type: 'like', title: '新点赞', content: 'Sofia 赞了你的动态', avatar: avatar('sofia', 2), isRead: false, createdAt: '15分钟前' },
  { id: 'n3', type: 'message', title: '新消息', content: '李明 给你发了一条消息', avatar: avatar('liming', 3), isRead: false, createdAt: '30分钟前' },
  { id: 'n4', type: 'comment', title: '新评论', content: 'Emma 评论了你的动态："太美了！"', avatar: avatar('emma', 4), isRead: true, createdAt: '1小时前' },
  { id: 'n5', type: 'group_invite', title: '群组邀请', content: 'Carlos 邀请你加入"美食天地"', avatar: avatar('carlos', 6), isRead: true, createdAt: '2小时前' },
  { id: 'n6', type: 'follow', title: '新关注', content: 'Yuki 关注了你', avatar: avatar('yuki', 5), isRead: true, createdAt: '3小时前' },
];

export const conversations: Conversation[] = [
  { id: 'c1', type: 'dm', participant: users[0], lastMessage: '你的照片太棒了！', lastMessageTime: '10分钟前', unreadCount: 2, isPinned: true, isMuted: false, isOnline: true },
  { id: 'c2', type: 'dm', participant: users[1], lastMessage: '谢谢推荐的音乐 🎵', lastMessageTime: '1小时前', unreadCount: 0, isPinned: false, isMuted: false, isOnline: true },
  { id: 'c3', type: 'dm', participant: users[2], lastMessage: '代码已经提交了，你看看', lastMessageTime: '3小时前', unreadCount: 1, isPinned: false, isMuted: false, isOnline: false },
  { id: 'c4', type: 'group', participant: chatRooms[0], lastMessage: '大家好！', lastMessageTime: '刚刚', unreadCount: 15, isPinned: true, isMuted: false },
  { id: 'c5', type: 'group', participant: chatRooms[2], lastMessage: '新AI模型太强了', lastMessageTime: '5分钟前', unreadCount: 8, isPinned: false, isMuted: false },
  { id: 'c6', type: 'dm', participant: users[4], lastMessage: 'こんにちは！', lastMessageTime: '昨天', unreadCount: 0, isPinned: false, isMuted: true, isOnline: false },
];

export const groups: Group[] = [
  { id: 'g1', name: '摄影爱好者', avatar: avatar('photo-group', 0), description: '分享摄影作品和技巧', memberCount: 2340, owner: 'u1', joinType: 'open', tags: ['摄影', '艺术'], isJoined: true },
  { id: 'g2', name: '编程学习小组', avatar: avatar('code-group', 1), description: '一起学编程，互相督促', memberCount: 1890, owner: 'u3', joinType: 'open', tags: ['编程', '学习'], isJoined: true },
  { id: 'g3', name: '环球旅行者', avatar: avatar('travel-group', 2), description: '分享旅行故事和攻略', memberCount: 5670, owner: 'u5', joinType: 'request', tags: ['旅行', '探险'], isJoined: false },
  { id: 'g4', name: '美食俱乐部', avatar: avatar('food-group', 3), description: '美食分享与烹饪交流', memberCount: 3450, owner: 'u6', joinType: 'open', tags: ['美食', '烹饪'], isJoined: true },
  { id: 'g5', name: '音乐发烧友', avatar: avatar('music-group', 4), description: '分享好音乐，讨论音乐话题', memberCount: 4120, owner: 'u2', joinType: 'open', tags: ['音乐'], isJoined: false },
];

export const friendships: Friendship[] = [
  { id: 'f1', user: users[0], status: 'accepted', group: '默认', since: '2024-01-15' },
  { id: 'f2', user: users[1], status: 'accepted', group: '默认', since: '2024-02-20' },
  { id: 'f3', user: users[2], status: 'accepted', group: '同事', since: '2024-03-10' },
  { id: 'f4', user: users[3], status: 'accepted', group: '默认', since: '2024-04-05' },
  { id: 'f5', user: users[5], status: 'accepted', group: '默认', since: '2024-05-12' },
];

export const countries = [
  { name: '中国', code: 'CN', flag: '🇨🇳', cities: ['北京', '上海', '成都', '广州', '深圳', '杭州'] },
  { name: '日本', code: 'JP', flag: '🇯🇵', cities: ['东京', '大阪', '京都', '名古屋'] },
  { name: '美国', code: 'US', flag: '🇺🇸', cities: ['纽约', '洛杉矶', '旧金山', '芝加哥'] },
  { name: '英国', code: 'GB', flag: '🇬🇧', cities: ['伦敦', '曼彻斯特', '伯明翰'] },
  { name: '法国', code: 'FR', flag: '🇫🇷', cities: ['巴黎', '里昂', '马赛'] },
  { name: '德国', code: 'DE', flag: '🇩🇪', cities: ['柏林', '慕尼黑', '汉堡'] },
  { name: '西班牙', code: 'ES', flag: '🇪🇸', cities: ['马德里', '巴塞罗那', '瓦伦西亚'] },
  { name: '韩国', code: 'KR', flag: '🇰🇷', cities: ['首尔', '釜山', '济州岛'] },
  { name: '印度', code: 'IN', flag: '🇮🇳', cities: ['孟买', '新德里', '班加罗尔'] },
  { name: '墨西哥', code: 'MX', flag: '🇲🇽', cities: ['墨西哥城', '坎昆', '瓜达拉哈拉'] },
];

export const topicCategories = [
  { name: '全部', icon: '🌐' },
  { name: '科技', icon: '💻' },
  { name: '音乐', icon: '🎵' },
  { name: '旅行', icon: '✈️' },
  { name: '美食', icon: '🍳' },
  { name: '运动', icon: '⚽' },
  { name: '艺术', icon: '🎨' },
  { name: '学习', icon: '📚' },
  { name: '游戏', icon: '🎮' },
  { name: '生活', icon: '🌱' },
];
