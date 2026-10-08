import React, { useState } from 'react';
import { X, Calendar, Download, Clock, MapPin, CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react';
import { TIMETABLE_DATA } from '../data/mockData';

interface TimetableModalProps {
  onClose: () => void;
}

export const TimetableModal: React.FC<TimetableModalProps> = ({ onClose }) => {
  const [activeDay, setActiveDay] = useState<'ALL' | 'mon' | 'tue' | 'wed' | 'thu' | 'fri'>('ALL');

  const days = [
    { key: 'ALL', label: 'Full Week' },
    { key: 'mon', label: 'Monday' },
    { key: 'tue', label: 'Tuesday' },
    { key: 'wed', label: 'Wednesday' },
    { key: 'thu', label: 'Thursday' },
    { key: 'fri', label: 'Friday' },
  ];

  const getSubjectColor = (subjectName: string) => {
    const s = subjectName.toUpperCase();
    if (s.includes('SILENT READING') || s.includes('BREAK') || s.includes('LUNCH')) {
      return 'bg-amber-100 text-amber-900 border-amber-300 font-bold';
    }
    if (s.includes('ASSEMBLY') || s.includes('CHAPEL')) {
      return 'bg-amber-200 text-amber-950 border-amber-400 font-bold';
    }
    if (s.includes('MATH')) {
      return 'bg-blue-100 text-blue-950 border-blue-300 font-bold';
    }
    if (s.includes('PHYSICS') || s.includes('CHEM') || s.includes('BIOLOGY') || s.includes('SCIENCE')) {
      return 'bg-emerald-100 text-emerald-950 border-emerald-300 font-bold';
    }
    if (s.includes('ENGLISH') || s.includes('BAHASA')) {
      return 'bg-sky-100 text-sky-950 border-sky-300 font-bold';
    }
    if (s.includes('CHINESE')) {
      return 'bg-rose-100 text-rose-950 border-rose-300 font-bold';
    }
    if (s.includes('COMPUTER SCIENCE')) {
      return 'bg-cyan-100 text-cyan-950 border-cyan-300 font-bold';
    }
    if (s.includes('PE') || s.includes('MUSIC') || s.includes('DRAMA')) {
      return 'bg-purple-100 text-purple-950 border-purple-300 font-bold';
    }
    if (s.includes('DISMISSAL')) {
      return 'bg-yellow-300 text-amber-950 border-yellow-400 font-black';
    }
    return 'bg-gray-100 text-gray-800 border-gray-300';
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4">
      <div className="bg-white w-full max-w-4xl max-h-[92vh] rounded-3xl flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 border border-[#c3c6d1]">
        {/* Header */}
        <div className="bg-[#001e40] text-white px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/10 rounded-xl">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold">Sec 3 Logic Timetable</h2>
              <p className="text-xs text-blue-200">
                Academic Year 2026-2027 • Effective per 20 July 2026
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => alert('Exporting PDF timetable document...')}
              className="hidden sm:flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold px-3 py-2 rounded-xl transition-colors cursor-pointer"
            >
              <Download className="w-4 h-4" /> Download PDF
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-full transition-colors cursor-pointer text-white"
              title="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Day Filter Tabs */}
        <div className="px-4 py-3 bg-[#f6f3f2] border-b border-[#e5e2e1] flex items-center gap-1.5 overflow-x-auto">
          {days.map((d) => (
            <button
              key={d.key}
              onClick={() => setActiveDay(d.key as any)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                activeDay === d.key
                  ? 'bg-[#001e40] text-white shadow-xs'
                  : 'bg-white text-[#575f65] border border-[#e5e2e1] hover:bg-[#e5e2e1]'
              }`}
            >
              {d.label}
            </button>
          ))}
        </div>

        {/* Timetable Table Content */}
        <div className="flex-1 overflow-auto p-4 bg-gray-50">
          {activeDay === 'ALL' ? (
            <div className="min-w-[640px] border border-gray-300 rounded-2xl overflow-hidden shadow-xs bg-white">
              <table className="w-full text-xs text-center border-collapse">
                <thead>
                  <tr className="bg-[#001e40] text-white font-bold">
                    <th className="p-2.5 border-r border-blue-900 w-28 bg-[#001733]">PERIOD</th>
                    <th className="p-2.5 border-r border-blue-900 bg-[#cca830] text-blue-950 font-black">MON</th>
                    <th className="p-2.5 border-r border-blue-900 bg-[#cca830] text-blue-950 font-black">TUE</th>
                    <th className="p-2.5 border-r border-blue-900 bg-[#cca830] text-blue-950 font-black">WED</th>
                    <th className="p-2.5 border-r border-blue-900 bg-[#cca830] text-blue-950 font-black">THU</th>
                    <th className="p-2.5 bg-[#cca830] text-blue-950 font-black">FRI</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {TIMETABLE_DATA.map((row, idx) => (
                    <tr key={idx} className="hover:bg-blue-50/40 transition-colors">
                      <td className="p-2 font-mono text-[11px] font-bold text-gray-600 bg-gray-100 border-r border-gray-200 whitespace-nowrap">
                        {row.time}
                      </td>
                      <td className="p-1.5 border-r border-gray-200">
                        <span className={`inline-block w-full py-1.5 px-1 rounded-md text-[11px] border ${getSubjectColor(row.mon)}`}>
                          {row.mon}
                        </span>
                      </td>
                      <td className="p-1.5 border-r border-gray-200">
                        <span className={`inline-block w-full py-1.5 px-1 rounded-md text-[11px] border ${getSubjectColor(row.tue)}`}>
                          {row.tue}
                        </span>
                      </td>
                      <td className="p-1.5 border-r border-gray-200">
                        <span className={`inline-block w-full py-1.5 px-1 rounded-md text-[11px] border ${getSubjectColor(row.wed)}`}>
                          {row.wed}
                        </span>
                      </td>
                      <td className="p-1.5 border-r border-gray-200">
                        <span className={`inline-block w-full py-1.5 px-1 rounded-md text-[11px] border ${getSubjectColor(row.thu)}`}>
                          {row.thu}
                        </span>
                      </td>
                      <td className="p-1.5">
                        <span className={`inline-block w-full py-1.5 px-1 rounded-md text-[11px] border ${getSubjectColor(row.fri)}`}>
                          {row.fri}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            /* Day Specific Detailed Timeline */
            <div className="space-y-2.5 max-w-lg mx-auto">
              {TIMETABLE_DATA.map((row, idx) => {
                const subject = row[activeDay as 'mon' | 'tue' | 'wed' | 'thu' | 'fri'];
                if (!subject || subject === '-') return null;

                return (
                  <div
                    key={idx}
                    className="bg-white border border-[#e5e2e1] rounded-2xl p-3.5 flex items-center justify-between shadow-xs hover:border-[#001e40] transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-24 bg-[#f0eded] text-[#43474f] font-mono text-xs font-bold py-2 px-2.5 rounded-xl text-center">
                        {row.time}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-[#1c1b1b]">{subject}</h4>
                        <p className="text-xs text-[#575f65] flex items-center gap-1 mt-0.5">
                          <MapPin className="w-3 h-3 text-[#003366]" /> Sec 3 Main Floor
                        </p>
                      </div>
                    </div>

                    <span className={`text-xs px-2.5 py-1 rounded-lg border ${getSubjectColor(subject)}`}>
                      Scheduled
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#fcf9f8] border-t border-[#e5e2e1] flex items-center justify-between text-xs text-[#575f65]">
          <span>Class: Sec 3 Logic • Bina Bangsa School</span>
          <button
            onClick={onClose}
            className="bg-[#001e40] text-white font-bold px-5 py-2 rounded-xl hover:bg-[#003366] transition-colors cursor-pointer"
          >
            Close Timetable
          </button>
        </div>
      </div>
    </div>
  );
};
