import React, { useState } from 'react';
import { Search, X, Megaphone, Folder, Calendar, MessageSquare, ChevronRight } from 'lucide-react';
import { Announcement, SubjectItem, SchoolEvent, ChatThread } from '../types';

interface SearchModalProps {
  onClose: () => void;
  announcements: Announcement[];
  subjects: SubjectItem[];
  events: SchoolEvent[];
  chats: ChatThread[];
  onSelectAnnouncement: (item: Announcement) => void;
  onSelectSubject: (item: SubjectItem) => void;
  onSelectEvent: (item: SchoolEvent) => void;
  onSelectChat: (item: ChatThread) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  onClose,
  announcements,
  subjects,
  events,
  chats,
  onSelectAnnouncement,
  onSelectSubject,
  onSelectEvent,
  onSelectChat,
}) => {
  const [query, setQuery] = useState('');

  const q = query.trim().toLowerCase();

  const matchingAnnouncements = q
    ? announcements.filter(
        (a) => a.title.toLowerCase().includes(q) || a.content.toLowerCase().includes(q)
      )
    : [];

  const matchingSubjects = q
    ? subjects.filter(
        (s) => s.name.toLowerCase().includes(q) || s.teacher.toLowerCase().includes(q)
      )
    : [];

  const matchingEvents = q
    ? events.filter(
        (e) => e.title.toLowerCase().includes(q) || e.location.toLowerCase().includes(q)
      )
    : [];

  const matchingChats = q
    ? chats.filter(
        (c) =>
          c.participantName.toLowerCase().includes(q) ||
          c.lastMessage.toLowerCase().includes(q)
      )
    : [];

  const totalResults =
    matchingAnnouncements.length +
    matchingSubjects.length +
    matchingEvents.length +
    matchingChats.length;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-start justify-center p-3 sm:p-6 pt-12 sm:pt-20">
      <div className="bg-white w-full max-w-lg rounded-3xl flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 border border-[#e5e2e1]">
        {/* Search Input Bar */}
        <div className="p-4 border-b border-[#e5e2e1] flex items-center gap-3 bg-[#fcf9f8]">
          <Search className="w-5 h-5 text-[#003366] shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search classes, timetable, teachers, chats..."
            className="flex-1 bg-transparent text-sm font-semibold text-[#1c1b1b] placeholder-[#737780] outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-[#737780] hover:text-[#1c1b1b] cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="text-xs font-bold text-[#003366] hover:text-[#001e40] px-2 py-1 cursor-pointer"
          >
            Done
          </button>
        </div>

        {/* Results Container */}
        <div className="p-4 overflow-y-auto max-h-[60vh] space-y-4">
          {!query ? (
            <div className="text-center py-8 text-[#575f65] space-y-2">
              <Search className="w-8 h-8 mx-auto text-[#c3c6d1]" />
              <p className="text-xs font-medium">Type keywords like &ldquo;Math&rdquo;, &ldquo;Drama&rdquo;, &ldquo;Teacher&rdquo;, or &ldquo;Exam&rdquo;</p>
            </div>
          ) : totalResults === 0 ? (
            <div className="text-center py-8 text-[#575f65]">
              <p className="text-sm font-bold text-[#1c1b1b]">No results found</p>
              <p className="text-xs text-[#737780] mt-1">
                No matches for &ldquo;{query}&rdquo; in BBS Connect records.
              </p>
            </div>
          ) : (
            <>
              {/* Announcements results */}
              {matchingAnnouncements.length > 0 && (
                <div className="space-y-1.5">
                  <h4 className="text-[11px] font-extrabold text-[#575f65] uppercase tracking-wider flex items-center gap-1.5">
                    <Megaphone className="w-3.5 h-3.5 text-[#003366]" /> Announcements ({matchingAnnouncements.length})
                  </h4>
                  {matchingAnnouncements.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => {
                        onSelectAnnouncement(item);
                        onClose();
                      }}
                      className="p-3 bg-[#f6f3f2] hover:bg-[#e7effc] rounded-xl flex items-center justify-between cursor-pointer transition-colors"
                    >
                      <div className="min-w-0 pr-2">
                        <p className="text-xs font-bold text-[#1c1b1b] truncate">{item.title}</p>
                        <p className="text-[11px] text-[#575f65] truncate">{item.content}</p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-[#737780] shrink-0" />
                    </div>
                  ))}
                </div>
              )}

              {/* Subjects results */}
              {matchingSubjects.length > 0 && (
                <div className="space-y-1.5">
                  <h4 className="text-[11px] font-extrabold text-[#575f65] uppercase tracking-wider flex items-center gap-1.5">
                    <Folder className="w-3.5 h-3.5 text-[#003366]" /> Subjects ({matchingSubjects.length})
                  </h4>
                  {matchingSubjects.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => {
                        onSelectSubject(item);
                        onClose();
                      }}
                      className="p-3 bg-[#f6f3f2] hover:bg-[#e7effc] rounded-xl flex items-center justify-between cursor-pointer transition-colors"
                    >
                      <div>
                        <p className="text-xs font-bold text-[#1c1b1b]">{item.name}</p>
                        <p className="text-[11px] text-[#575f65]">{item.teacher} • {item.chapters}</p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-[#737780] shrink-0" />
                    </div>
                  ))}
                </div>
              )}

              {/* Events results */}
              {matchingEvents.length > 0 && (
                <div className="space-y-1.5">
                  <h4 className="text-[11px] font-extrabold text-[#575f65] uppercase tracking-wider flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#003366]" /> Upcoming Events ({matchingEvents.length})
                  </h4>
                  {matchingEvents.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => {
                        onSelectEvent(item);
                        onClose();
                      }}
                      className="p-3 bg-[#f6f3f2] hover:bg-[#e7effc] rounded-xl flex items-center justify-between cursor-pointer transition-colors"
                    >
                      <div>
                        <p className="text-xs font-bold text-[#1c1b1b]">{item.title}</p>
                        <p className="text-[11px] text-[#575f65]">{item.time} • {item.location}</p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-[#737780] shrink-0" />
                    </div>
                  ))}
                </div>
              )}

              {/* Chats results */}
              {matchingChats.length > 0 && (
                <div className="space-y-1.5">
                  <h4 className="text-[11px] font-extrabold text-[#575f65] uppercase tracking-wider flex items-center gap-1.5">
                    <MessageSquare className="w-3.5 h-3.5 text-[#003366]" /> Chats & Messages ({matchingChats.length})
                  </h4>
                  {matchingChats.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => {
                        onSelectChat(item);
                        onClose();
                      }}
                      className="p-3 bg-[#f6f3f2] hover:bg-[#e7effc] rounded-xl flex items-center justify-between cursor-pointer transition-colors"
                    >
                      <div>
                        <p className="text-xs font-bold text-[#1c1b1b]">{item.participantName}</p>
                        <p className="text-[11px] text-[#575f65] truncate">{item.lastMessage}</p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-[#737780] shrink-0" />
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
