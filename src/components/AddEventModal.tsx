import React, { useState } from 'react';
import { X, Calendar, Clock, BookOpen, MapPin, AlignLeft, Sparkles, Plus } from 'lucide-react';
import { SchoolEvent } from '../types';

interface AddEventModalProps {
  onClose: () => void;
  onAddEvent: (eventData: {
    title: string;
    date: string;
    time: string;
    description: string;
    category: SchoolEvent['category'];
    location: string;
    speakerOrLead?: string;
  }) => void;
}

export const AddEventModal: React.FC<AddEventModalProps> = ({ onClose, onAddEvent }) => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('Today, Oct 24');
  const [time, setTime] = useState('02:30 PM');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<SchoolEvent['category']>('Academic');
  const [location, setLocation] = useState('Main Auditorium');
  const [speakerOrLead, setSpeakerOrLead] = useState('');
  const [error, setError] = useState('');

  const quickDates = ['Today, Oct 24', 'Tomorrow, Oct 25', 'Mon, Oct 28', 'Wed, Oct 30'];
  const quickTimes = ['08:00 AM', '10:15 AM', '01:30 PM', '03:15 PM', '04:00 PM'];
  const quickLocations = ['Main Auditorium', 'Science Lab 3', 'Computer Lab 1', 'Sports Complex', 'Library'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Please enter the activity title');
      return;
    }
    if (!date.trim()) {
      setError('Please specify the event date');
      return;
    }
    if (!time.trim()) {
      setError('Please specify the event time');
      return;
    }
    if (!description.trim()) {
      setError('Please enter a short description');
      return;
    }

    onAddEvent({
      title: title.trim(),
      date: date.trim(),
      time: time.trim(),
      description: description.trim(),
      category,
      location: location.trim() || 'Campus',
      speakerOrLead: speakerOrLead.trim() || undefined,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white w-full max-w-md rounded-3xl flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 border border-[#e5e2e1] my-auto">
        {/* Header */}
        <div className="bg-[#001e40] text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center">
              <Plus className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-base font-bold">Add New School Event</h2>
              <p className="text-[11px] text-blue-200">Sec 3 Academic Calendar</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-white/10 rounded-full transition-colors cursor-pointer text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4 max-h-[75vh] overflow-y-auto">
          {error && (
            <div className="p-3 bg-red-50 text-red-700 text-xs rounded-xl border border-red-200 font-medium">
              {error}
            </div>
          )}

          {/* Activity / Title */}
          <div>
            <label className="block text-xs font-bold text-[#575f65] uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-[#003366]" />
              Activity / Event Name *
            </label>
            <input
              type="text"
              required
              placeholder="e.g., Robotics Workshop, Drama Rehearsal, Lab Quiz"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                setError('');
              }}
              className="w-full bg-[#f6f3f2] border border-[#e5e2e1] focus:border-[#001e40] focus:bg-white text-sm font-semibold p-3 rounded-xl outline-none transition-colors"
            />
          </div>

          {/* Date & Quick Presets */}
          <div>
            <label className="block text-xs font-bold text-[#575f65] uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#003366]" />
              Date *
            </label>
            <input
              type="text"
              required
              placeholder="e.g., Today, Oct 24 or Nov 2, 2026"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full bg-[#f6f3f2] border border-[#e5e2e1] focus:border-[#001e40] focus:bg-white text-sm font-semibold p-3 rounded-xl outline-none transition-colors mb-2"
            />
            <div className="flex flex-wrap gap-1.5">
              {quickDates.map((d) => (
                <button
                  type="button"
                  key={d}
                  onClick={() => setDate(d)}
                  className={`text-[11px] px-2.5 py-1 rounded-lg font-medium transition-colors cursor-pointer ${
                    date === d
                      ? 'bg-[#001e40] text-white'
                      : 'bg-[#f0eded] text-[#575f65] hover:bg-[#e5e2e1]'
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          {/* Time & Presets */}
          <div>
            <label className="block text-xs font-bold text-[#575f65] uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#003366]" />
              Time *
            </label>
            <input
              type="text"
              required
              placeholder="e.g., 02:30 PM or 09:00 AM - 10:30 AM"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full bg-[#f6f3f2] border border-[#e5e2e1] focus:border-[#001e40] focus:bg-white text-sm font-semibold p-3 rounded-xl outline-none transition-colors mb-2"
            />
            <div className="flex flex-wrap gap-1.5">
              {quickTimes.map((t) => (
                <button
                  type="button"
                  key={t}
                  onClick={() => setTime(t)}
                  className={`text-[11px] px-2.5 py-1 rounded-lg font-medium transition-colors cursor-pointer ${
                    time === t
                      ? 'bg-[#001e40] text-white'
                      : 'bg-[#f0eded] text-[#575f65] hover:bg-[#e5e2e1]'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Category Selector */}
          <div>
            <label className="block text-xs font-bold text-[#575f65] uppercase tracking-wider mb-1.5">
              Category
            </label>
            <div className="grid grid-cols-4 gap-2">
              {(['Academic', 'CCA', 'General', 'Exam'] as const).map((cat) => {
                const isSelected = category === cat;
                return (
                  <button
                    type="button"
                    key={cat}
                    onClick={() => setCategory(cat)}
                    className={`py-2 px-1 text-center text-xs font-bold rounded-xl transition-all border cursor-pointer ${
                      isSelected
                        ? cat === 'Academic'
                          ? 'bg-[#dbe3ea] text-[#001e40] border-[#001e40]'
                          : cat === 'CCA'
                          ? 'bg-[#ffe088] text-[#574500] border-[#574500]'
                          : cat === 'Exam'
                          ? 'bg-rose-100 text-rose-900 border-rose-600'
                          : 'bg-[#f0eded] text-[#1c1b1b] border-gray-400'
                        : 'bg-white border-[#e5e2e1] text-[#575f65] hover:bg-[#f6f3f2]'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="block text-xs font-bold text-[#575f65] uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#003366]" />
              Location / Venue
            </label>
            <input
              type="text"
              placeholder="e.g., Auditorium, Lab 2, Field"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full bg-[#f6f3f2] border border-[#e5e2e1] focus:border-[#001e40] focus:bg-white text-sm font-semibold p-3 rounded-xl outline-none transition-colors mb-2"
            />
            <div className="flex flex-wrap gap-1.5">
              {quickLocations.map((loc) => (
                <button
                  type="button"
                  key={loc}
                  onClick={() => setLocation(loc)}
                  className={`text-[11px] px-2 py-0.5 rounded-md font-medium transition-colors cursor-pointer ${
                    location === loc
                      ? 'bg-[#001e40] text-white'
                      : 'bg-[#f0eded] text-[#575f65] hover:bg-[#e5e2e1]'
                  }`}
                >
                  {loc}
                </button>
              ))}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold text-[#575f65] uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <AlignLeft className="w-3.5 h-3.5 text-[#003366]" />
              Event Description *
            </label>
            <textarea
              required
              rows={3}
              placeholder="Provide event details, required preparation, or agenda..."
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
                setError('');
              }}
              className="w-full bg-[#f6f3f2] border border-[#e5e2e1] focus:border-[#001e40] focus:bg-white text-xs font-medium p-3 rounded-xl outline-none transition-colors resize-none"
            />
          </div>

          {/* Optional Lead / Teacher */}
          <div>
            <label className="block text-xs font-bold text-[#575f65] uppercase tracking-wider mb-1.5">
              Teacher / Lead (Optional)
            </label>
            <input
              type="text"
              placeholder="e.g., Mr. Tan, Ms. Chloe"
              value={speakerOrLead}
              onChange={(e) => setSpeakerOrLead(e.target.value)}
              className="w-full bg-[#f6f3f2] border border-[#e5e2e1] focus:border-[#001e40] focus:bg-white text-xs font-medium p-2.5 rounded-xl outline-none transition-colors"
            />
          </div>

          {/* Action Buttons */}
          <div className="pt-3 border-t border-[#e5e2e1] flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 text-xs font-bold text-[#575f65] hover:text-[#1c1b1b] cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-[#001e40] hover:bg-[#003366] text-white px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm cursor-pointer flex items-center gap-1.5 active:scale-95"
            >
              <Plus className="w-4 h-4" /> Save Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
