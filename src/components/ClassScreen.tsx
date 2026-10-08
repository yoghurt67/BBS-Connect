import React, { useState } from 'react';
import { 
  Calculator, 
  FlaskConical, 
  BookOpen, 
  Laptop, 
  Languages, 
  Megaphone, 
  Folder, 
  ChevronRight, 
  Sparkles,
  Paperclip,
  CheckCircle2
} from 'lucide-react';
import { Announcement, SubjectItem } from '../types';

interface ClassScreenProps {
  announcements: Announcement[];
  subjects: SubjectItem[];
  onSelectAnnouncement: (announcement: Announcement) => void;
  onSelectSubject: (subject: SubjectItem) => void;
  searchQuery?: string;
}

export const ClassScreen: React.FC<ClassScreenProps> = ({
  announcements,
  subjects,
  onSelectAnnouncement,
  onSelectSubject,
  searchQuery = '',
}) => {
  const [selectedTag, setSelectedTag] = useState<string>('All');

  // Filter announcements
  const filteredAnnouncements = announcements.filter((ann) => {
    const matchesTag = selectedTag === 'All' || ann.tag === selectedTag;
    const matchesSearch =
      !searchQuery ||
      ann.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ann.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTag && matchesSearch;
  });

  // Filter subjects
  const filteredSubjects = subjects.filter((subj) => {
    return (
      !searchQuery ||
      subj.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      subj.teacher.toLowerCase().includes(searchQuery.toLowerCase()) ||
      subj.chapters.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const getSubjectIcon = (iconType: SubjectItem['iconType'], index: number) => {
    switch (iconType) {
      case 'math':
        return <Calculator className="w-6 h-6 text-white" strokeWidth={2.2} />;
      case 'science':
        return <FlaskConical className="w-6 h-6 text-[#001e40]" strokeWidth={2.2} />;
      case 'language':
        return <BookOpen className="w-6 h-6 text-[#001e40]" strokeWidth={2.2} />;
      case 'tech':
        return <Laptop className="w-6 h-6 text-white" strokeWidth={2.2} />;
      case 'arts':
      case 'humanities':
      default:
        return <Languages className="w-6 h-6 text-[#001e40]" strokeWidth={2.2} />;
    }
  };

  return (
    <div className="px-4 py-5 space-y-6 pb-20 max-w-lg mx-auto">
      {/* Search active indicator */}
      {searchQuery && (
        <div className="p-3 bg-[#e7effc] rounded-xl text-xs text-[#001e40] font-medium flex items-center justify-between">
          <span>Filtering by query: &ldquo;{searchQuery}&rdquo;</span>
          <span className="text-[11px] text-[#575f65]">
            {filteredAnnouncements.length + filteredSubjects.length} results
          </span>
        </div>
      )}

      {/* Class Announcements Header */}
      <section className="space-y-3.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-[#001e40]">
            <Megaphone className="w-5 h-5 stroke-[2.4] text-[#001e40]" />
            <h2 className="text-xl font-extrabold tracking-tight">Class Announcements</h2>
          </div>
          <span className="text-xs font-semibold text-[#575f65] bg-[#e5e2e1]/80 px-2 py-0.5 rounded-full">
            {announcements.length} Total
          </span>
        </div>

        {/* Filter Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
          {['All', 'Important', 'Reminder', 'Academic'].map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`text-xs px-3 py-1 rounded-full font-medium transition-all cursor-pointer whitespace-nowrap ${
                selectedTag === tag
                  ? 'bg-[#001e40] text-white shadow-xs'
                  : 'bg-[#e5e2e1]/70 text-[#43474f] hover:bg-[#dbe3ea]'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Announcements List */}
        <div className="space-y-3">
          {filteredAnnouncements.length === 0 ? (
            <div className="text-center py-6 bg-white rounded-2xl border border-[#e5e2e1] p-4 text-[#575f65] text-sm">
              No announcements match your criteria.
            </div>
          ) : (
            filteredAnnouncements.map((announcement) => {
              const isImportant = announcement.tag === 'Important';
              const isReminder = announcement.tag === 'Reminder';

              return (
                <div
                  key={announcement.id}
                  id={`announcement-card-${announcement.id}`}
                  onClick={() => onSelectAnnouncement(announcement)}
                  className="bg-white border border-[#e5e2e1] rounded-2xl p-4.5 shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer group active:scale-[0.99] relative overflow-hidden"
                >
                  {/* Top Row: Tag + Timestamp */}
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${
                        isImportant
                          ? 'bg-[#dbe3ea] text-[#43474f]'
                          : isReminder
                          ? 'bg-[#eae7e7] text-[#43474f]'
                          : 'bg-[#f0eded] text-[#575f65]'
                      }`}
                    >
                      {announcement.tag}
                    </span>
                    <span className="text-xs font-normal text-[#575f65]">
                      {announcement.timestamp}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-base font-bold text-[#1c1b1b] group-hover:text-[#001e40] transition-colors leading-snug mb-1.5">
                    {announcement.title}
                  </h3>

                  {/* Snippet / Content */}
                  <p className="text-[13.5px] text-[#43474f] leading-relaxed line-clamp-3">
                    {announcement.content}
                  </p>

                  {/* Bottom info: Attachments tag if present */}
                  {announcement.attachments && announcement.attachments.length > 0 && (
                    <div className="mt-3 pt-2.5 border-t border-[#f0eded] flex items-center justify-between text-xs text-[#575f65]">
                      <span className="flex items-center gap-1">
                        <Paperclip className="w-3.5 h-3.5 text-[#003366]" />
                        {announcement.attachments.length} attachments
                      </span>
                      <span className="text-[#003366] font-semibold flex items-center gap-0.5 group-hover:underline">
                        View details <ChevronRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </section>

      {/* Subjects Section */}
      <section className="space-y-3.5 pt-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-[#001e40]">
            <Folder className="w-5 h-5 stroke-[2.4] text-[#001e40]" />
            <h2 className="text-xl font-extrabold tracking-tight">Subjects</h2>
          </div>
          <span className="text-xs font-semibold text-[#575f65]">
            Semester 2
          </span>
        </div>

        {/* Subjects List */}
        <div className="space-y-3">
          {filteredSubjects.map((subject, idx) => {
            const isNavyCard = idx % 2 === 0;

            return (
              <div
                key={subject.id}
                id={`subject-card-${subject.id}`}
                onClick={() => onSelectSubject(subject)}
                className="bg-white border border-[#e5e2e1] rounded-2xl p-4 flex items-center justify-between shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer group active:scale-[0.99] relative overflow-hidden"
              >
                <div className="flex items-center gap-3.5">
                  {/* Icon Box */}
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-105 shrink-0 ${
                      isNavyCard
                        ? 'bg-[#001e40] text-white shadow-xs'
                        : 'bg-[#dbe3ea] text-[#001e40]'
                    }`}
                  >
                    {getSubjectIcon(subject.iconType, idx)}
                  </div>

                  {/* Title & Teacher info */}
                  <div>
                    <h3 className="text-base font-bold text-[#1c1b1b] group-hover:text-[#001e40] transition-colors leading-tight">
                      {subject.name}
                    </h3>
                    <p className="text-xs text-[#575f65] mt-1 font-medium">
                      {subject.teacher} • {subject.chapters}
                    </p>
                  </div>
                </div>

                {/* Right Decorative Circular Shape / Action */}
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-full bg-[#f0eded] group-hover:bg-[#dbe3ea] flex items-center justify-center text-[#575f65] group-hover:text-[#001e40] transition-all">
                    <ChevronRight className="w-4 h-4 stroke-[2.5]" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Class Quick Overview Footer Card */}
      <div className="bg-[#eef4fb] border border-[#c3c6d1]/50 rounded-2xl p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-[#001e40] text-white rounded-xl">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-[#001e40]">Sec 3 Logic Homeroom</h4>
            <p className="text-xs text-[#575f65]">Class Advisor: Ms. Clara Chen</p>
          </div>
        </div>
        <div className="text-right">
          <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" /> In Good Standing
          </span>
        </div>
      </div>
    </div>
  );
};
