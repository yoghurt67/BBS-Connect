import React, { useState } from 'react';
import { 
  INITIAL_ANNOUNCEMENTS, 
  INITIAL_CHATS, 
  INITIAL_EVENTS, 
  INITIAL_STUDENT_PROFILE, 
  INITIAL_SUBJECTS 
} from './data/mockData';
import { Announcement, ChatThread, SchoolEvent, StudentProfile, SubjectItem, TabType } from './types';
import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { ClassScreen } from './components/ClassScreen';
import { EventsScreen } from './components/EventsScreen';
import { ChatsScreen } from './components/ChatsScreen';
import { ProfileScreen } from './components/ProfileScreen';
import { ChatDetailModal } from './components/ChatDetailModal';
import { TimetableModal } from './components/TimetableModal';
import { CreateChatLinkModal } from './components/CreateChatLinkModal';
import { AnnouncementDetailModal } from './components/AnnouncementDetailModal';
import { SubjectDetailModal } from './components/SubjectDetailModal';
import { AddEventModal } from './components/AddEventModal';
import { 
  EditProfileModal, 
  HelpModal, 
  LogoutModal, 
  NotificationModal, 
  PrivacyModal 
} from './components/SettingsModals';
import { SearchModal } from './components/SearchModal';
import { Smartphone, Monitor, Sparkles, LogIn } from 'lucide-react';

export default function App() {
  // Navigation & Data States
  const [currentTab, setCurrentTab] = useState<TabType>('class');
  const [student, setStudent] = useState<StudentProfile>(INITIAL_STUDENT_PROFILE);
  const [announcements, setAnnouncements] = useState<Announcement[]>(INITIAL_ANNOUNCEMENTS);
  const [subjects, setSubjects] = useState<SubjectItem[]>(INITIAL_SUBJECTS);
  const [events, setEvents] = useState<SchoolEvent[]>(INITIAL_EVENTS);
  const [chatThreads, setChatThreads] = useState<ChatThread[]>(INITIAL_CHATS);

  // View frame mode: 'mobile' (matching screenshots) vs 'wide' (expanded viewport)
  const [viewMode, setViewMode] = useState<'mobile' | 'wide'>('mobile');

  // Modals
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<Announcement | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<SubjectItem | null>(null);
  const [selectedChat, setSelectedChat] = useState<ChatThread | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<SchoolEvent | null>(null);
  const [showAddEventModal, setShowAddEventModal] = useState<boolean>(false);
  const [showTimetableModal, setShowTimetableModal] = useState<boolean>(false);
  const [showCreateChatLinkModal, setShowCreateChatLinkModal] = useState<boolean>(false);
  const [showEditProfileModal, setShowEditProfileModal] = useState<boolean>(false);
  const [showNotificationModal, setShowNotificationModal] = useState<boolean>(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState<boolean>(false);
  const [showHelpModal, setShowHelpModal] = useState<boolean>(false);
  const [showLogoutModal, setShowLogoutModal] = useState<boolean>(false);
  const [showSearchModal, setShowSearchModal] = useState<boolean>(false);

  // Auth simulation
  const [isLoggedOut, setIsLoggedOut] = useState<boolean>(false);

  // Add event handler
  const handleAddEvent = (eventData: {
    title: string;
    date: string;
    time: string;
    description: string;
    category: SchoolEvent['category'];
    location: string;
    speakerOrLead?: string;
  }) => {
    const badgeStyles: Record<SchoolEvent['category'], SchoolEvent['badgeStyle']> = {
      Academic: { bg: 'bg-[#dbe3ea]', text: 'text-[#001e40]', pillBg: 'bg-[#f0eded]' },
      CCA: { bg: 'bg-[#ffe088]', text: 'text-[#574500]', pillBg: 'bg-[#ffe088]' },
      General: { bg: 'bg-[#f0eded]', text: 'text-[#43474f]', pillBg: 'bg-[#f0eded]' },
      Exam: { bg: 'bg-rose-100', text: 'text-rose-900', pillBg: 'bg-rose-100' },
    };

    const newEv: SchoolEvent = {
      id: `ev-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      title: eventData.title,
      date: eventData.date,
      time: eventData.time,
      period: eventData.time.split(' ')[0] || '12:00',
      description: eventData.description,
      category: eventData.category,
      location: eventData.location,
      speakerOrLead: eventData.speakerOrLead,
      badgeStyle: badgeStyles[eventData.category] || badgeStyles.Academic,
    };

    setEvents((prev) => [newEv, ...prev]);
  };

  // Delete event handler
  const handleDeleteEvent = (id: string) => {
    setEvents((prev) => prev.filter((e) => e.id !== id));
  };

  // Chat message sending handler
  const handleSendMessage = (threadId: string, text: string) => {
    setChatThreads((prev) =>
      prev.map((thread) => {
        if (thread.id === threadId) {
          const newMsg = {
            id: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
            senderId: text.startsWith('Thank you') || text.startsWith('Great') || text.startsWith('Your request') || text.startsWith('Have a great') ? thread.id : 'me',
            senderName: text.startsWith('Thank you') || text.startsWith('Great') || text.startsWith('Your request') || text.startsWith('Have a great') ? thread.participantName : student.name,
            avatar: text.startsWith('Thank you') || text.startsWith('Great') || text.startsWith('Your request') || text.startsWith('Have a great') ? thread.avatar : student.avatarUrl,
            text,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            isMe: !(text.startsWith('Thank you') || text.startsWith('Great') || text.startsWith('Your request') || text.startsWith('Have a great')),
          };
          return {
            ...thread,
            lastMessage: text,
            lastMessageTime: 'Just now',
            unreadCount: 0,
            messages: [...thread.messages, newMsg],
          };
        }
        return thread;
      })
    );

    // Also update current active chat modal if open
    setSelectedChat((prev) => {
      if (!prev || prev.id !== threadId) return prev;
      const isAutoReply = text.startsWith('Thank you') || text.startsWith('Great') || text.startsWith('Your request') || text.startsWith('Have a great');
      const newMsg = {
        id: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
        senderId: isAutoReply ? prev.id : 'me',
        senderName: isAutoReply ? prev.participantName : student.name,
        avatar: isAutoReply ? prev.avatar : student.avatarUrl,
        text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isMe: !isAutoReply,
      };
      return {
        ...prev,
        lastMessage: text,
        lastMessageTime: 'Just now',
        messages: [...prev.messages, newMsg],
      };
    });
  };

  // Profile save
  const handleSaveProfile = (updated: Partial<StudentProfile>) => {
    setStudent((prev) => ({ ...prev, ...updated }));
  };

  // Start chat with a teacher from subject modal
  const handleStartTeacherChat = (teacherName: string) => {
    const existingThread = chatThreads.find((t) =>
      t.participantName.toLowerCase().includes(teacherName.toLowerCase()) ||
      t.role.toLowerCase().includes(teacherName.toLowerCase())
    );

    if (existingThread) {
      setSelectedChat(existingThread);
    } else {
      // Find or create Teacher 1 thread
      const t1 = chatThreads.find((t) => t.id === 'chat-teacher1') || chatThreads[0];
      setSelectedChat(t1);
    }
  };

  // Handle Event selection -> open timetable or event detail
  const handleSelectEvent = (event: SchoolEvent) => {
    setSelectedEvent(event);
  };

  if (isLoggedOut) {
    return (
      <div className="min-h-screen bg-[#001e40] flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl space-y-5 animate-in fade-in zoom-in-95">
          <div className="w-16 h-16 bg-[#dbe3ea] text-[#001e40] rounded-2xl flex items-center justify-center mx-auto shadow-xs font-black text-xl">
            BBS
          </div>
          <div>
            <h1 className="text-2xl font-black text-[#001e40]">BBS Connect</h1>
            <p className="text-xs text-[#575f65] mt-1">Bina Bangsa School Student Portal</p>
          </div>
          <p className="text-xs text-[#43474f] bg-[#f6f3f2] p-3 rounded-xl">
            You have successfully logged out of student session.
          </p>
          <button
            onClick={() => setIsLoggedOut(false)}
            className="w-full bg-[#001e40] hover:bg-[#003366] text-white font-bold py-3 px-6 rounded-2xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
          >
            <LogIn className="w-4 h-4" /> Sign In as Student 1
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#e5e9f0] flex flex-col items-center justify-start sm:py-6 sm:px-4 selection:bg-[#d5e3ff] selection:text-[#001e40]">
      {/* Top Floating App Frame Toolbar */}
      <div className="w-full max-w-md mb-2 sm:mb-3 px-3 flex items-center justify-between text-xs text-[#43474f]">
        <div className="flex items-center gap-1.5 font-bold text-[#001e40]">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>BBS Connect • Student Portal</span>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center bg-white/80 backdrop-blur-xs p-1 rounded-xl shadow-xs border border-gray-200">
          <button
            onClick={() => setViewMode('mobile')}
            className={`p-1.5 rounded-lg flex items-center gap-1 transition-all cursor-pointer font-semibold ${
              viewMode === 'mobile'
                ? 'bg-[#001e40] text-white shadow-xs'
                : 'text-[#575f65] hover:text-[#001e40]'
            }`}
            title="Mobile Screen View (Matches Mockups)"
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span className="hidden xs:inline text-[11px]">Mobile</span>
          </button>
          <button
            onClick={() => setViewMode('wide')}
            className={`p-1.5 rounded-lg flex items-center gap-1 transition-all cursor-pointer font-semibold ${
              viewMode === 'wide'
                ? 'bg-[#001e40] text-white shadow-xs'
                : 'text-[#575f65] hover:text-[#001e40]'
            }`}
            title="Responsive Full View"
          >
            <Monitor className="w-3.5 h-3.5" />
            <span className="hidden xs:inline text-[11px]">Expanded</span>
          </button>
        </div>
      </div>

      {/* Main App Container (Simulating Phone or Tablet container) */}
      <div
        className={`w-full bg-[#fcf9f8] text-[#1c1b1b] flex flex-col transition-all duration-300 relative ${
          viewMode === 'mobile'
            ? 'max-w-[430px] h-[94vh] max-h-[844px] min-h-[560px] sm:rounded-[40px] shadow-2xl overflow-hidden border-0 sm:border-8 sm:border-slate-800'
            : 'max-w-2xl h-[94vh] max-h-[860px] min-h-[560px] sm:rounded-3xl shadow-xl overflow-hidden border border-[#c3c6d1]'
        }`}
      >
        {/* Device Status Bar in mobile frame */}
        {viewMode === 'mobile' && (
          <div className="bg-[#fcf9f8] px-6 pt-3 pb-1 flex items-center justify-between text-[11px] font-bold text-[#1c1b1b] select-none shrink-0">
            <span>9:41</span>
            <div className="w-20 h-4 bg-black rounded-full mx-auto -mt-1" />
            <div className="flex items-center gap-1 text-[10px]">
              <span>5G</span>
              <span className="w-4 h-2.5 border border-current rounded-xs inline-block relative after:absolute after:right-[-2px] after:top-[1px] after:w-[1.5px] after:h-[4px] after:bg-current">
                <span className="block h-full bg-current w-3/4 rounded-2xs" />
              </span>
            </div>
          </div>
        )}

        {/* Dynamic Header Component */}
        <Header
          currentTab={currentTab}
          student={student}
          onOpenSearch={() => setShowSearchModal(true)}
          onOpenMenu={() => setShowSearchModal(true)}
          onBack={() => setCurrentTab('class')}
          onProfileClick={() => setCurrentTab('profile')}
        />

        {/* Main Screen Body View - Scrollable */}
        <main className="flex-1 overflow-y-auto overscroll-contain min-h-0 relative">
          {currentTab === 'class' && (
            <ClassScreen
              announcements={announcements}
              subjects={subjects}
              onSelectAnnouncement={(ann) => setSelectedAnnouncement(ann)}
              onSelectSubject={(subj) => setSelectedSubject(subj)}
            />
          )}

          {currentTab === 'events' && (
            <EventsScreen
              events={events}
              onOpenTimetableModal={() => setShowTimetableModal(true)}
              onSelectEvent={(ev) => handleSelectEvent(ev)}
              onOpenAddEventModal={() => setShowAddEventModal(true)}
              onDeleteEvent={handleDeleteEvent}
            />
          )}

          {currentTab === 'chats' && (
            <ChatsScreen
              chatThreads={chatThreads}
              onSelectChat={(thread) => setSelectedChat(thread)}
              onCreateChatLink={() => setShowCreateChatLinkModal(true)}
            />
          )}

          {currentTab === 'profile' && (
            <ProfileScreen
              student={student}
              onEditProfile={() => setShowEditProfileModal(true)}
              onOpenNotifications={() => setShowNotificationModal(true)}
              onOpenPrivacy={() => setShowPrivacyModal(true)}
              onOpenHelp={() => setShowHelpModal(true)}
              onLogout={() => setShowLogoutModal(true)}
            />
          )}
        </main>

        {/* Bottom Navigation Component matching screenshots */}
        <Navigation
          currentTab={currentTab}
          onSelectTab={(tab) => setCurrentTab(tab)}
          unreadChatsCount={chatThreads.reduce((acc, c) => acc + c.unreadCount, 0)}
          unreadAnnouncementsCount={announcements.filter((a) => !a.isRead).length}
        />
      </div>

      {/* --- Interactive Modals --- */}

      {/* Add New Event Modal */}
      {showAddEventModal && (
        <AddEventModal
          onClose={() => setShowAddEventModal(false)}
          onAddEvent={handleAddEvent}
        />
      )}

      {/* Chat Detail Modal */}
      {selectedChat && (
        <ChatDetailModal
          thread={selectedChat}
          onClose={() => setSelectedChat(null)}
          onSendMessage={handleSendMessage}
        />
      )}

      {/* Timetable Modal */}
      {showTimetableModal && (
        <TimetableModal onClose={() => setShowTimetableModal(false)} />
      )}

      {/* Create Chat Link Modal */}
      {showCreateChatLinkModal && (
        <CreateChatLinkModal onClose={() => setShowCreateChatLinkModal(false)} />
      )}

      {/* Announcement Detail Modal */}
      {selectedAnnouncement && (
        <AnnouncementDetailModal
          announcement={selectedAnnouncement}
          onClose={() => setSelectedAnnouncement(null)}
        />
      )}

      {/* Subject Detail Modal */}
      {selectedSubject && (
        <SubjectDetailModal
          subject={selectedSubject}
          onClose={() => setSelectedSubject(null)}
          onStartTeacherChat={handleStartTeacherChat}
        />
      )}

      {/* Event Detail Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white w-full max-w-sm rounded-3xl p-5 shadow-2xl border border-[#e5e2e1] animate-in fade-in zoom-in-95 space-y-4">
            <div className="flex items-center justify-between">
              <span className={`text-xs font-bold px-2.5 py-0.5 rounded-md ${selectedEvent.badgeStyle.bg} ${selectedEvent.badgeStyle.text}`}>
                {selectedEvent.category}
              </span>
              <span className="text-xs font-semibold text-[#575f65]">{selectedEvent.date}</span>
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#001e40]">{selectedEvent.title}</h3>
              <p className="text-xs text-[#575f65] mt-1">{selectedEvent.time} • {selectedEvent.location}</p>
            </div>
            <p className="text-xs text-[#43474f] leading-relaxed bg-[#f6f3f2] p-3 rounded-xl">
              {selectedEvent.description}
            </p>
            {selectedEvent.speakerOrLead && (
              <p className="text-xs font-semibold text-[#001e40]">
                Lead: {selectedEvent.speakerOrLead}
              </p>
            )}
            <button
              onClick={() => setSelectedEvent(null)}
              className="w-full bg-[#001e40] text-white py-2.5 rounded-xl text-xs font-bold hover:bg-[#003366] transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Edit Profile Modal */}
      {showEditProfileModal && (
        <EditProfileModal
          student={student}
          onClose={() => setShowEditProfileModal(false)}
          onSave={handleSaveProfile}
        />
      )}

      {/* Notification Preferences Modal */}
      {showNotificationModal && (
        <NotificationModal onClose={() => setShowNotificationModal(false)} />
      )}

      {/* Privacy Modal */}
      {showPrivacyModal && (
        <PrivacyModal onClose={() => setShowPrivacyModal(false)} />
      )}

      {/* Help & Support Modal */}
      {showHelpModal && (
        <HelpModal onClose={() => setShowHelpModal(false)} />
      )}

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <LogoutModal
          onConfirm={() => {
            setShowLogoutModal(false);
            setIsLoggedOut(true);
          }}
          onCancel={() => setShowLogoutModal(false)}
        />
      )}

      {/* Global Search Modal */}
      {showSearchModal && (
        <SearchModal
          onClose={() => setShowSearchModal(false)}
          announcements={announcements}
          subjects={subjects}
          events={events}
          chats={chatThreads}
          onSelectAnnouncement={(a) => setSelectedAnnouncement(a)}
          onSelectSubject={(s) => setSelectedSubject(s)}
          onSelectEvent={(e) => setSelectedEvent(e)}
          onSelectChat={(c) => setSelectedChat(c)}
        />
      )}
    </div>
  );
}
