export type TabType = 'class' | 'events' | 'chats' | 'profile';

export interface Announcement {
  id: string;
  tag: 'Important' | 'Reminder' | 'General' | 'Academic';
  timestamp: string;
  title: string;
  content: string;
  author: string;
  authorRole: string;
  date: string;
  attachments?: { name: string; size: string; type: string }[];
  isRead?: boolean;
}

export interface SubjectItem {
  id: string;
  name: string;
  code: string;
  teacher: string;
  chapters: string;
  iconType: 'math' | 'science' | 'language' | 'tech' | 'arts' | 'humanities';
  color: string;
  bgColor: string;
  room: string;
  schedule: string;
  progress: number;
  nextAssignment?: {
    title: string;
    dueDate: string;
  };
  syllabus: { chapter: string; title: string; status: 'Completed' | 'In Progress' | 'Upcoming' }[];
}

export interface TimetableSlot {
  time: string;
  mon: string;
  tue: string;
  wed: string;
  thu: string;
  fri: string;
  type?: 'regular' | 'break' | 'assembly' | 'special';
}

export interface SchoolEvent {
  id: string;
  time: string;
  period: string; // "09:00 AM"
  category: 'Academic' | 'CCA' | 'General' | 'Exam';
  title: string;
  location: string;
  date: string;
  description: string;
  speakerOrLead?: string;
  badgeStyle: {
    bg: string;
    text: string;
    pillBg: string;
  };
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderRole?: string;
  avatar: string;
  text: string;
  timestamp: string;
  isMe: boolean;
}

export interface ChatThread {
  id: string;
  participantName: string;
  role: string;
  avatar: string;
  isOnline: boolean;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  messages: ChatMessage[];
}

export interface StudentProfile {
  name: string;
  grade: string;
  classSize?: string;
  email: string;
  studentId: string;
  academicYear: string;
  avatarUrl: string;
  topRightAvatarUrl: string;
  phone: string;
  homeroomTeacher: string;
  attendanceRate: string;
  gpa: string;
}
