import React, { useState } from 'react';
import { 
  Calendar as CalendarIcon, 
  MapPin, 
  Clock, 
  Maximize2, 
  ChevronRight, 
  Sparkles,
  Info,
  CalendarCheck,
  ChevronLeft,
  Plus,
  Trash2
} from 'lucide-react';
import { SchoolEvent, TimetableSlot } from '../types';
import { TIMETABLE_DATA } from '../data/mockData';

interface EventsScreenProps {
  events: SchoolEvent[];
  onOpenTimetableModal: () => void;
  onSelectEvent: (event: SchoolEvent) => void;
  onOpenAddEventModal: () => void;
  onDeleteEvent?: (eventId: string) => void;
  searchQuery?: string;
}

export const EventsScreen: React.FC<EventsScreenProps> = ({
  events,
  onOpenTimetableModal,
  onSelectEvent,
  onOpenAddEventModal,
  onDeleteEvent,
  searchQuery = '',
}) => {
  const [selectedDayTab, setSelectedDayTab] = useState<'ALL' | 'TODAY' | 'WEEK'>('TODAY');
  const [currentWeek, setCurrentWeek] = useState<number>(4);

  const filteredEvents = events.filter((ev) => {
    return (
      !searchQuery ||
      ev.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ev.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ev.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div className="px-4 py-5 space-y-5 pb-24 max-w-lg mx-auto">
      {/* Date & Week Header + Add Event Button */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-[#1c1b1b] tracking-tight">
            Today, Oct 24
          </h2>
          <p className="text-xs font-semibold text-[#575f65] mt-0.5">
            Term 2 • Semester A • Sec 3
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentWeek((w) => (w % 8) + 1)}
            className="bg-[#001e40] text-white text-xs font-extrabold px-3 py-1.5 rounded-full shadow-xs hover:bg-[#003366] transition-all cursor-pointer flex items-center gap-1 active:scale-95"
            title="Click to toggle academic week"
          >
            <span>WEEK {currentWeek}</span>
          </button>
          
          <button
            id="add-event-btn-top"
            onClick={onOpenAddEventModal}
            className="bg-[#ffe088] hover:bg-[#fed35b] text-[#574500] font-black text-xs px-3 py-1.5 rounded-full shadow-xs transition-all cursor-pointer flex items-center gap-1 active:scale-95 border border-[#e5c05e]"
            title="Add New Event"
          >
            <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Add Event</span>
          </button>
        </div>
      </div>

      {/* Timetable Schedule Graphic Card */}
      <div className="bg-white border border-[#e5e2e1] rounded-2xl p-3.5 shadow-xs hover:shadow-md transition-all group relative overflow-hidden">
        <div className="flex items-center justify-between mb-2.5 px-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#001e40] uppercase tracking-wider">
              Weekly Timetable
            </span>
            <span className="text-[11px] text-[#575f65] bg-[#f0eded] px-2 py-0.5 rounded-md font-medium">
              Sec 3 Logic
            </span>
          </div>
          <button
            onClick={onOpenTimetableModal}
            className="text-xs font-bold text-[#003366] hover:text-[#001e40] flex items-center gap-1 cursor-pointer group-hover:underline"
          >
            <Maximize2 className="w-3.5 h-3.5" /> Full Table
          </button>
        </div>

        {/* Timetable visual miniature table representation matching Image 7 */}
        <div 
          onClick={onOpenTimetableModal}
          className="rounded-xl overflow-hidden border border-[#dbe3ea] bg-[#fafafa] cursor-pointer relative shadow-inner group/table"
        >
          {/* Visual Mini Table Header */}
          <div className="grid grid-cols-6 bg-[#003366] text-white text-[9px] font-bold text-center py-1 border-b border-blue-900">
            <div className="bg-[#002244] py-0.5">TIME</div>
            <div className="bg-[#ffd700] text-blue-950 font-black py-0.5">MON</div>
            <div className="bg-[#ffd700] text-blue-950 font-black py-0.5">TUE</div>
            <div className="bg-[#ffd700] text-blue-950 font-black py-0.5">WED</div>
            <div className="bg-[#ffd700] text-blue-950 font-black py-0.5">THU</div>
            <div className="bg-[#ffd700] text-blue-950 font-black py-0.5">FRI</div>
          </div>

          {/* Mini Rows */}
          <div className="text-[8.5px] leading-tight divide-y divide-gray-200">
            <div className="grid grid-cols-6 text-center py-1 bg-yellow-50 text-gray-700">
              <span className="font-semibold text-gray-500">07:15</span>
              <span className="bg-yellow-200 font-bold text-amber-900 col-span-5">SILENT READING</span>
            </div>
            <div className="grid grid-cols-6 text-center py-1 bg-amber-100 text-amber-900 font-bold">
              <span className="text-gray-500">07:30</span>
              <span className="col-span-5 bg-amber-200">ASSEMBLY</span>
            </div>
            <div className="grid grid-cols-6 text-center py-1 bg-white">
              <span className="font-semibold text-gray-500">07:45</span>
              <span className="bg-blue-50 text-blue-900 font-medium">ENGLISH</span>
              <span className="bg-sky-50 text-sky-900 font-medium">PHYSICS</span>
              <span className="bg-indigo-50 text-indigo-900 font-medium">A-MATH</span>
              <span className="bg-blue-50 text-blue-900 font-medium">ENGLISH</span>
              <span className="bg-emerald-50 text-emerald-900 font-medium">CHEM</span>
            </div>
            <div className="grid grid-cols-6 text-center py-1 bg-gray-50">
              <span className="font-semibold text-gray-500">08:45</span>
              <span className="bg-emerald-50 text-emerald-900 font-medium">CHEM</span>
              <span className="bg-indigo-50 text-indigo-900 font-medium">E-MATH</span>
              <span className="bg-purple-50 text-purple-900 font-medium">SOCIOLOGY</span>
              <span className="bg-blue-50 text-blue-900 font-medium">ENGLISH</span>
              <span className="bg-amber-50 text-amber-900 font-medium">BAHASA</span>
            </div>
            <div className="grid grid-cols-6 text-center py-1 bg-yellow-200 text-amber-950 font-black">
              <span className="text-gray-600">09:45</span>
              <span className="col-span-5 tracking-widest">BREAK TIME</span>
            </div>
            <div className="grid grid-cols-6 text-center py-1 bg-white">
              <span className="font-semibold text-gray-500">10:15</span>
              <span className="bg-rose-50 text-rose-900 font-medium">CHINESE</span>
              <span className="bg-rose-50 text-rose-900 font-medium">CHINESE</span>
              <span className="bg-rose-50 text-rose-900 font-medium">CHINESE</span>
              <span className="bg-cyan-50 text-cyan-900 font-medium">COMP SCI</span>
              <span className="bg-indigo-50 text-indigo-900 font-medium">E-MATH</span>
            </div>
            <div className="grid grid-cols-6 text-center py-1 bg-yellow-300 text-amber-950 font-black">
              <span className="text-gray-600">12:45</span>
              <span className="col-span-5 tracking-widest">LUNCH BREAK</span>
            </div>
          </div>

          {/* Hover overlay hint */}
          <div className="absolute inset-0 bg-[#001e40]/75 backdrop-blur-[1px] opacity-0 group-hover/table:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold gap-1.5">
            <Maximize2 className="w-4 h-4" /> Tap to Open Full Timetable & Room Map
          </div>
        </div>
      </div>

      {/* Upcoming Events Section */}
      <section className="space-y-3.5">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-extrabold text-[#1c1b1b] tracking-tight">
            Upcoming
          </h3>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-[#575f65]">
              {filteredEvents.length} Items
            </span>
            <button
              onClick={onOpenAddEventModal}
              className="text-xs font-bold text-[#003366] hover:text-[#001e40] bg-[#e7effc] hover:bg-[#d5e3ff] px-2.5 py-1 rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" /> Add
            </button>
          </div>
        </div>

        {/* Event Cards List */}
        <div className="space-y-3">
          {filteredEvents.length === 0 ? (
            <div className="bg-white border border-dashed border-gray-300 rounded-2xl p-8 text-center space-y-2">
              <CalendarIcon className="w-8 h-8 text-gray-400 mx-auto" />
              <p className="text-sm font-bold text-[#1c1b1b]">No events found</p>
              <p className="text-xs text-[#575f65]">Tap &ldquo;Add Event&rdquo; to create a new activity on your schedule.</p>
              <button
                onClick={onOpenAddEventModal}
                className="mt-2 bg-[#001e40] text-white text-xs font-bold px-4 py-2 rounded-xl inline-flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" /> Create Event
              </button>
            </div>
          ) : (
            filteredEvents.map((event) => {
              const isAcademic = event.category === 'Academic';
              const isCCA = event.category === 'CCA';
              const isGeneral = event.category === 'General';
              const isExam = event.category === 'Exam';

              return (
                <div
                  key={event.id}
                  id={`event-card-${event.id}`}
                  onClick={() => onSelectEvent(event)}
                  className="bg-white border border-[#e5e2e1] rounded-2xl p-4 flex items-start gap-3.5 shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer group active:scale-[0.99] relative"
                >
                  {/* Left Time Box */}
                  <div
                    className={`w-20 rounded-xl p-2.5 text-center flex flex-col items-center justify-center shrink-0 leading-tight transition-transform group-hover:scale-105 ${
                      isAcademic
                        ? 'bg-[#dbe3ea] text-[#001e40]'
                        : isCCA
                        ? 'bg-[#ffe088] text-[#574500]'
                        : isExam
                        ? 'bg-rose-100 text-rose-900'
                        : 'bg-[#f0eded] text-[#43474f]'
                    }`}
                  >
                    <span className="text-sm font-extrabold tracking-tight">
                      {event.time.split(' ')[0]}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider opacity-80">
                      {event.time.split(' ')[1] || ''}
                    </span>
                  </div>

                  {/* Right Content Details */}
                  <div className="flex-1 min-w-0">
                    {/* Category Pill Tag & Date */}
                    <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                      <span
                        className={`inline-block text-[11px] font-bold px-2.5 py-0.5 rounded-md ${
                          isAcademic
                            ? 'bg-[#f0eded] text-[#43474f]'
                            : isCCA
                            ? 'bg-[#ffe088] text-[#574500]'
                            : isExam
                            ? 'bg-rose-100 text-rose-900'
                            : 'bg-[#f0eded] text-[#43474f]'
                        }`}
                      >
                        {event.category}
                      </span>
                      <span className="text-[11px] font-semibold text-[#575f65] bg-[#f6f3f2] px-2 py-0.5 rounded-md">
                        {event.date}
                      </span>
                    </div>

                    {/* Event Title */}
                    <h4 className="text-base font-bold text-[#1c1b1b] group-hover:text-[#001e40] transition-colors leading-snug truncate">
                      {event.title}
                    </h4>

                    {/* Location & Room */}
                    <p className="text-xs text-[#737780] flex items-center gap-1.5 mt-1 truncate">
                      <MapPin className="w-3.5 h-3.5 text-[#003366] shrink-0" />
                      <span>{event.location}</span>
                    </p>
                  </div>

                  {/* Actions / Chevron */}
                  <div className="flex items-center gap-1 self-center pl-1">
                    {onDeleteEvent && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeleteEvent(event.id);
                        }}
                        className="p-1.5 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors opacity-0 group-hover:opacity-100 cursor-pointer"
                        title="Delete Event"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                    <div className="text-[#c3c6d1] group-hover:text-[#001e40] transition-colors">
                      <ChevronRight className="w-5 h-5 stroke-[2]" />
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </section>

      {/* Calendar Sync Quick Action */}
      <div className="bg-[#f6f3f2] border border-[#e5e2e1] rounded-2xl p-4 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2.5">
          <CalendarCheck className="w-5 h-5 text-[#003366]" />
          <div>
            <p className="font-bold text-[#001e40]">Subscribe to Class Calendar</p>
            <p className="text-[11px] text-[#575f65]">Sync automatically with Google/Apple iCal</p>
          </div>
        </div>
        <button
          onClick={() => alert('Calendar subscription link copied to clipboard!')}
          className="bg-white border border-[#c3c6d1] hover:border-[#001e40] text-[#001e40] font-bold px-3 py-1.5 rounded-lg transition-colors cursor-pointer shadow-xs active:scale-95"
        >
          Sync
        </button>
      </div>
    </div>
  );
};
