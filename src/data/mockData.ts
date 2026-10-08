import { Announcement, ChatThread, SchoolEvent, StudentProfile, SubjectItem, TimetableSlot } from '../types';

export const INITIAL_STUDENT_PROFILE: StudentProfile = {
  name: 'Student 1',
  grade: 'Sec 3 Logic',
  classSize: '25 students',
  email: 'student1@bbs.sch.id',
  studentId: '2026001',
  academicYear: '2026-2027',
  avatarUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&auto=format&fit=crop&q=80',
  topRightAvatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  phone: '+62 812-3456-7890',
  homeroomTeacher: 'Ms. Clara Chen (Sec 3 Logic Advisor)',
  attendanceRate: '98.5%',
  gpa: '3.88 / 4.00'
};

export const INITIAL_ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'ann-1',
    tag: 'Important',
    timestamp: 'Today, 09:00 AM',
    title: 'Upcoming Math Term Test',
    content: 'Please be reminded that the Term 2 Mathematics test covers chapters 4 through 7. Bring your approved calculators (Casio fx-991EX or similar). Formula sheets will be provided in the exam hall.',
    author: 'Mr. David Lee',
    authorRole: 'Head of Mathematics',
    date: 'Oct 24, 2026',
    isRead: false,
    attachments: [
      { name: 'Math_Term2_Topics_Checklist.pdf', size: '1.2 MB', type: 'pdf' },
      { name: 'Past_Year_Revision_Set.pdf', size: '3.4 MB', type: 'pdf' }
    ]
  },
  {
    id: 'ann-2',
    tag: 'Reminder',
    timestamp: 'Yesterday',
    title: 'Science Fair Registration',
    content: 'Final call for Science Fair project proposals. Submit your abstracts via the portal by Friday 5 PM. Teams can consist of 2 to 3 students from Sec 3 & Sec 4.',
    author: 'Dr. Sarah Tan',
    authorRole: 'Science Department Coordinator',
    date: 'Oct 23, 2026',
    isRead: true,
    attachments: [
      { name: 'Science_Fair_Guidelines_2026.pdf', size: '850 KB', type: 'pdf' }
    ]
  },
  {
    id: 'ann-3',
    tag: 'Academic',
    timestamp: 'Oct 21, 2026',
    title: 'Cambridge IGCSE Mock Exam Timetable Release',
    content: 'The provisional schedule for the upcoming November Mock Examinations has been posted on the student bulletin board and student portal.',
    author: 'Academic Office',
    authorRole: 'Examinations Department',
    date: 'Oct 21, 2026',
    isRead: true
  },
  {
    id: 'ann-4',
    tag: 'General',
    timestamp: 'Oct 19, 2026',
    title: 'Founder\'s Day Celebration & Early Dismissal',
    content: 'All students are expected in formal assembly uniform for the annual celebration on Friday. Dismissal will be at 12:45 PM.',
    author: 'Principal Office',
    authorRole: 'School Administration',
    date: 'Oct 19, 2026',
    isRead: true
  }
];

export const INITIAL_SUBJECTS: SubjectItem[] = [
  {
    id: 'subj-1',
    name: 'Mathematics',
    code: 'MATH-301',
    teacher: 'Teacher 1',
    chapters: 'Chapter 4-7',
    iconType: 'math',
    color: '#001e40',
    bgColor: '#e7effc',
    room: 'Room 302, Science Block',
    schedule: 'Mon 13:15, Wed 08:45, Thu 14:15',
    progress: 72,
    nextAssignment: {
      title: 'Trigonometric Identities Problem Set 4.2',
      dueDate: 'Due Oct 27, 2026'
    },
    syllabus: [
      { chapter: 'Chapter 4', title: 'Quadratic Equations & Inequalities', status: 'Completed' },
      { chapter: 'Chapter 5', title: 'Coordinate Geometry & Straight Lines', status: 'Completed' },
      { chapter: 'Chapter 6', title: 'Trigonometric Functions & Graphs', status: 'In Progress' },
      { chapter: 'Chapter 7', title: 'Circular Measure & Radian Calculations', status: 'Upcoming' }
    ]
  },
  {
    id: 'subj-2',
    name: 'Science',
    code: 'SCI-302',
    teacher: 'Teacher 2',
    chapters: 'Chapter 1-2',
    iconType: 'science',
    color: '#003366',
    bgColor: '#e8f0f8',
    room: 'Lab B-104, Newton Wing',
    schedule: 'Tue 08:15, Thu 09:15, Fri 07:45',
    progress: 60,
    nextAssignment: {
      title: 'Titration Lab Report & Error Analysis',
      dueDate: 'Due Oct 29, 2026'
    },
    syllabus: [
      { chapter: 'Chapter 1', title: 'Kinematics & Newtonian Dynamics', status: 'Completed' },
      { chapter: 'Chapter 2', title: 'Thermal Physics & Kinetic Theory', status: 'In Progress' },
      { chapter: 'Chapter 3', title: 'Chemical Energetics & Reaction Rates', status: 'Upcoming' }
    ]
  },
  {
    id: 'subj-3',
    name: 'English Language',
    code: 'ENG-303',
    teacher: 'Ms. Clara Chen',
    chapters: 'Module 3: Persuasive Rhetoric',
    iconType: 'language',
    color: '#1e3a5f',
    bgColor: '#f1f5f9',
    room: 'Room 204, Humanities Block',
    schedule: 'Mon 07:45, Wed 11:15, Thu 08:15',
    progress: 80,
    nextAssignment: {
      title: 'Argumentative Essay: Ethics of AI in Education',
      dueDate: 'Due Oct 31, 2026'
    },
    syllabus: [
      { chapter: 'Module 1', title: 'Literary Analysis: Classic Drama', status: 'Completed' },
      { chapter: 'Module 2', title: 'Descriptive & Narrative Craft', status: 'Completed' },
      { chapter: 'Module 3', title: 'Persuasive Speech & Formal Writing', status: 'In Progress' }
    ]
  },
  {
    id: 'subj-4',
    name: 'Computer Science',
    code: 'CS-304',
    teacher: 'Mr. Kenji Sato',
    chapters: 'Algorithms & Data Structures',
    iconType: 'tech',
    color: '#0d324d',
    bgColor: '#e6f3fa',
    room: 'Mac Lab 4, Tech Centre',
    schedule: 'Mon 14:15, Thu 10:15, Fri 11:15',
    progress: 85,
    nextAssignment: {
      title: 'Binary Search Tree & Sorting Algorithm Implementation',
      dueDate: 'Due Nov 02, 2026'
    },
    syllabus: [
      { chapter: 'Unit 1', title: 'Number Systems & Boolean Logic', status: 'Completed' },
      { chapter: 'Unit 2', title: 'Data Types, Arrays, and Linked Lists', status: 'Completed' },
      { chapter: 'Unit 3', title: 'Search & Sorting Algorithms', status: 'In Progress' }
    ]
  },
  {
    id: 'subj-5',
    name: 'Chinese Language',
    code: 'CHN-305',
    teacher: 'Lao Shi Zhang',
    chapters: 'Unit 5-6 HSK 5 Prep',
    iconType: 'language',
    color: '#735c00',
    bgColor: '#fff9e6',
    room: 'Room 105, East Wing',
    schedule: 'Mon 10:15, Tue 10:15, Wed 10:15',
    progress: 68,
    nextAssignment: {
      title: 'Composition: Modern Urban Life in Asia',
      dueDate: 'Due Nov 04, 2026'
    },
    syllabus: [
      { chapter: 'Unit 4', title: 'Idioms & Classical Proverb Analysis', status: 'Completed' },
      { chapter: 'Unit 5', title: 'Cultural Readings & Comprehension', status: 'In Progress' },
      { chapter: 'Unit 6', title: 'Formal Letter & Business Correspondence', status: 'Upcoming' }
    ]
  }
];

export const INITIAL_EVENTS: SchoolEvent[] = [
  {
    id: 'ev-1',
    time: '09:00 AM',
    period: '09:00 AM',
    category: 'Academic',
    title: 'Grade 10 Math Class',
    location: 'Room 302, Science Block',
    date: 'Today, Oct 24',
    description: 'Calculus fundamentals, derivative applications, and practice problem sets.',
    speakerOrLead: 'Mr. David Lee',
    badgeStyle: {
      bg: 'bg-[#dbe3ea]',
      text: 'text-[#001e40]',
      pillBg: 'bg-[#e2eaf2]'
    }
  },
  {
    id: 'ev-2',
    time: '03:30 PM',
    period: '03:30 PM',
    category: 'CCA',
    title: 'Drama CCA Rehearsal',
    location: 'Main Auditorium Stage',
    date: 'Today, Oct 24',
    description: 'Full cast rehearsal for the upcoming semester theatrical production "The Crucible".',
    speakerOrLead: 'Ms. Henderson & Drama Council',
    badgeStyle: {
      bg: 'bg-[#ffe088]',
      text: 'text-[#574500]',
      pillBg: 'bg-[#fff1c7]'
    }
  },
  {
    id: 'ev-3',
    time: '05:00 PM',
    period: '05:00 PM',
    category: 'General',
    title: 'All-School Assembly',
    location: 'Grand Sports Arena',
    date: 'Today, Oct 24',
    description: 'Weekly gathering, award announcements, and leadership reflections.',
    speakerOrLead: 'Principal Dr. Evelyn Vance',
    badgeStyle: {
      bg: 'bg-[#eae7e7]',
      text: 'text-[#43474f]',
      pillBg: 'bg-[#f0eded]'
    }
  },
  {
    id: 'ev-4',
    time: '11:15 AM',
    period: '11:15 AM',
    category: 'Academic',
    title: 'Physics Practical Lab Experiment',
    location: 'Physics Lab 3',
    date: 'Tomorrow, Oct 25',
    description: 'Investigating simple harmonic motion and pendulum resonance frequencies.',
    speakerOrLead: 'Dr. Sarah Tan',
    badgeStyle: {
      bg: 'bg-[#dbe3ea]',
      text: 'text-[#001e40]',
      pillBg: 'bg-[#e2eaf2]'
    }
  }
];

export const TIMETABLE_DATA: TimetableSlot[] = [
  { time: '07:15 - 07:30', mon: 'SILENT READING', tue: 'SILENT READING', wed: 'SILENT READING', thu: 'SILENT READING', fri: 'SILENT READING', type: 'regular' },
  { time: '07:30 - 07:45', mon: 'ASSEMBLY', tue: 'ASSEMBLY', wed: 'ASSEMBLY', thu: 'ASSEMBLY', fri: 'ASSEMBLY', type: 'assembly' },
  { time: '07:45 - 08:15', mon: 'ENGLISH', tue: 'PHYSICS', wed: 'A-MATH', thu: 'ENGLISH', fri: 'CHEMISTRY / BUSINESS', type: 'regular' },
  { time: '08:15 - 08:45', mon: 'ENGLISH', tue: 'PHYSICS', wed: 'A-MATH', thu: 'ENGLISH', fri: 'CHEMISTRY / BUSINESS', type: 'regular' },
  { time: '08:45 - 09:15', mon: 'CHEMISTRY / BUSINESS', tue: 'E-MATH', wed: 'SOCIOLOGY', thu: 'ENGLISH', fri: 'BAHASA', type: 'regular' },
  { time: '09:15 - 09:45', mon: 'CHEMISTRY / BUSINESS', tue: 'E-MATH', wed: 'SOCIOLOGY', thu: 'PHYSICS', fri: 'BAHASA', type: 'regular' },
  { time: '09:45 - 10:15', mon: 'BREAK', tue: 'BREAK', wed: 'BREAK', thu: 'BREAK', fri: 'BREAK', type: 'break' },
  { time: '10:15 - 10:45', mon: 'CHINESE', tue: 'CHINESE', wed: 'CHINESE', thu: 'COMPUTER SCIENCE', fri: 'E-MATH', type: 'regular' },
  { time: '10:45 - 11:15', mon: 'CHINESE', tue: 'CHINESE', wed: 'CHINESE', thu: 'COMPUTER SCIENCE', fri: 'E-MATH', type: 'regular' },
  { time: '11:15 - 11:45', mon: 'BIOLOGY', tue: 'PPKN', wed: 'ENGLISH', thu: 'FB / CF', fri: 'COMPUTER SCIENCE', type: 'regular' },
  { time: '11:45 - 12:15', mon: 'PHYSICS', tue: 'MUSIC', wed: 'ENGLISH', thu: 'FB / CF', fri: 'LIFE SKILLS', type: 'regular' },
  { time: '12:15 - 12:45', mon: 'PHYSICS', tue: 'MUSIC', wed: 'ENGLISH', thu: 'PE', fri: 'BIOLOGY', type: 'regular' },
  { time: '12:45 - 13:15', mon: 'LUNCH', tue: 'LUNCH', wed: 'LUNCH', thu: 'LUNCH', fri: 'LUNCH', type: 'break' },
  { time: '13:15 - 13:45', mon: 'A-MATH', tue: 'CHEMISTRY / BUSINESS', wed: 'BIOLOGY', thu: 'CHAPEL', fri: 'SOCIOLOGY', type: 'regular' },
  { time: '13:45 - 14:15', mon: 'A-MATH', tue: 'BIOLOGY', wed: 'PE', thu: 'FT', fri: 'SOCIOLOGY', type: 'regular' },
  { time: '14:15 - 14:45', mon: 'COMPUTER SCIENCE', tue: 'BIOLOGY', wed: 'PE', thu: 'A-MATH', fri: 'DISMISSAL', type: 'regular' },
  { time: '14:45 - 15:15', mon: 'DISMISSAL', tue: 'DISMISSAL', wed: 'DISMISSAL', thu: 'DISMISSAL', fri: '-', type: 'special' }
];

export const INITIAL_CHATS: ChatThread[] = [
  {
    id: 'chat-principal',
    participantName: 'Principal',
    role: 'Principal Dr. Evelyn Vance',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80',
    isOnline: true,
    lastMessage: 'Please review the new guidelines for the Term 2 academic awards and leadership nominations.',
    lastMessageTime: '4:30 PM',
    unreadCount: 1,
    messages: [
      {
        id: 'm-p-1',
        senderId: 'principal',
        senderName: 'Principal',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80',
        text: 'Hello Student 1, congratulations on your recent exemplary performance in the regional debate qualifiers!',
        timestamp: '4:15 PM',
        isMe: false
      },
      {
        id: 'm-p-2',
        senderId: 'me',
        senderName: 'Student 1',
        avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&auto=format&fit=crop&q=80',
        text: 'Thank you very much, Dr. Vance! The whole Sec 3 team prepared diligently.',
        timestamp: '4:22 PM',
        isMe: true
      },
      {
        id: 'm-p-3',
        senderId: 'principal',
        senderName: 'Principal',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80',
        text: 'Please review the new guidelines for the Term 2 academic awards and leadership nominations.',
        timestamp: '4:30 PM',
        isMe: false
      }
    ]
  },
  {
    id: 'chat-teacher1',
    participantName: 'Teacher 1',
    role: 'Mr. David Lee (Mathematics)',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&auto=format&fit=crop&q=80',
    isOnline: false,
    lastMessage: 'See you at the assembly.',
    lastMessageTime: 'Yesterday',
    unreadCount: 0,
    messages: [
      {
        id: 'm-t-1',
        senderId: 'teacher1',
        senderName: 'Teacher 1',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&auto=format&fit=crop&q=80',
        text: 'Hi class, remember to bring the Chapter 5 problem set tomorrow during the second period.',
        timestamp: 'Yesterday 10:15 AM',
        isMe: false
      },
      {
        id: 'm-t-2',
        senderId: 'me',
        senderName: 'Student 1',
        avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&auto=format&fit=crop&q=80',
        text: 'Understood Mr. Lee! I completed question 14 on coordinate transformations.',
        timestamp: 'Yesterday 11:00 AM',
        isMe: true
      },
      {
        id: 'm-t-3',
        senderId: 'teacher1',
        senderName: 'Teacher 1',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&auto=format&fit=crop&q=80',
        text: 'See you at the assembly.',
        timestamp: 'Yesterday 02:40 PM',
        isMe: false
      }
    ]
  },
  {
    id: 'chat-admin',
    participantName: 'Admin',
    role: 'BBS Student Affairs Office',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&auto=format&fit=crop&q=80',
    isOnline: true,
    lastMessage: 'The forms have been processed.',
    lastMessageTime: 'Tuesday',
    unreadCount: 0,
    messages: [
      {
        id: 'm-a-1',
        senderId: 'me',
        senderName: 'Student 1',
        avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&auto=format&fit=crop&q=80',
        text: 'Good morning, I submitted my CCA excursion consent slip through the student portal.',
        timestamp: 'Tuesday 09:00 AM',
        isMe: true
      },
      {
        id: 'm-a-2',
        senderId: 'admin',
        senderName: 'Admin',
        avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&auto=format&fit=crop&q=80',
        text: 'The forms have been processed. Your digital clearance pass is now active.',
        timestamp: 'Tuesday 11:20 AM',
        isMe: false
      }
    ]
  },
  {
    id: 'chat-parent1',
    participantName: 'Parent 1',
    role: 'Mother (Emergency Contact)',
    avatar: '', // uses user placeholder avatar icon
    isOnline: false,
    lastMessage: 'Thanks for the update!',
    lastMessageTime: 'Monday',
    unreadCount: 0,
    messages: [
      {
        id: 'm-pa-1',
        senderId: 'me',
        senderName: 'Student 1',
        avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&auto=format&fit=crop&q=80',
        text: 'Hi Mom, I will be staying back for Drama CCA rehearsal until 5:00 PM today.',
        timestamp: 'Monday 01:10 PM',
        isMe: true
      },
      {
        id: 'm-pa-2',
        senderId: 'parent1',
        senderName: 'Parent 1',
        avatar: '',
        text: 'Thanks for the update! Dad will pick you up near the North Gate.',
        timestamp: 'Monday 01:25 PM',
        isMe: false
      }
    ]
  }
];
