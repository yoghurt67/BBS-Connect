import React, { useState } from 'react';
import { 
  X, 
  BookOpen, 
  Calendar, 
  MapPin, 
  User, 
  Clock, 
  CheckCircle2, 
  Circle, 
  FileText, 
  MessageSquare, 
  ChevronRight,
  TrendingUp
} from 'lucide-react';
import { SubjectItem } from '../types';

interface SubjectDetailModalProps {
  subject: SubjectItem;
  onClose: () => void;
  onStartTeacherChat?: (teacherName: string) => void;
}

export const SubjectDetailModal: React.FC<SubjectDetailModalProps> = ({
  subject,
  onClose,
  onStartTeacherChat,
}) => {
  const [activeTab, setActiveTab] = useState<'syllabus' | 'assignments' | 'resources'>('syllabus');

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white w-full max-w-lg rounded-3xl flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 border border-[#e5e2e1]">
        {/* Header with subject color styling */}
        <div className="bg-[#001e40] text-white p-5 flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-black uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded-md">
                {subject.code}
              </span>
              <span className="text-xs text-blue-200">{subject.chapters}</span>
            </div>
            <h2 className="text-xl font-bold">{subject.name}</h2>
            <p className="text-xs text-blue-200 flex items-center gap-1 mt-1">
              <User className="w-3.5 h-3.5" /> {subject.teacher}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-white/10 rounded-full transition-colors cursor-pointer text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Details Bar */}
        <div className="bg-[#f6f3f2] px-5 py-3 border-b border-[#e5e2e1] grid grid-cols-2 gap-3 text-xs">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#003366] shrink-0" />
            <div className="truncate">
              <span className="block text-[10px] text-[#575f65] uppercase font-bold">Venue</span>
              <span className="font-semibold text-[#1c1b1b] truncate">{subject.room}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#003366] shrink-0" />
            <div className="truncate">
              <span className="block text-[10px] text-[#575f65] uppercase font-bold">Timeslot</span>
              <span className="font-semibold text-[#1c1b1b] truncate">{subject.schedule}</span>
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="px-5 py-3 bg-white border-b border-[#f0eded]">
          <div className="flex items-center justify-between text-xs mb-1.5 font-bold">
            <span className="text-[#001e40] flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" /> Term Syllabus Completion
            </span>
            <span className="text-[#003366]">{subject.progress}%</span>
          </div>
          <div className="w-full h-2.5 bg-[#f0eded] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#001e40] rounded-full transition-all duration-500"
              style={{ width: `${subject.progress}%` }}
            />
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-[#e5e2e1] bg-[#fcf9f8] px-3">
          {[
            { id: 'syllabus', label: 'Syllabus & Units' },
            { id: 'assignments', label: 'Assignments' },
            { id: 'resources', label: 'Notes & Files' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 py-2.5 text-xs font-bold border-b-2 transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'border-[#001e40] text-[#001e40]'
                  : 'border-transparent text-[#575f65] hover:text-[#1c1b1b]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="p-5 overflow-y-auto max-h-[50vh] space-y-3">
          {activeTab === 'syllabus' && (
            <div className="space-y-2.5">
              {subject.syllabus.map((item, i) => (
                <div
                  key={i}
                  className="p-3 bg-[#f6f3f2] rounded-xl flex items-center justify-between border border-[#e5e2e1]"
                >
                  <div className="flex items-center gap-2.5">
                    {item.status === 'Completed' ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    ) : item.status === 'In Progress' ? (
                      <div className="w-4 h-4 rounded-full border-2 border-[#001e40] flex items-center justify-center shrink-0">
                        <div className="w-1.5 h-1.5 bg-[#001e40] rounded-full" />
                      </div>
                    ) : (
                      <Circle className="w-4 h-4 text-gray-400 shrink-0" />
                    )}
                    <div>
                      <span className="text-[10px] font-bold text-[#575f65] uppercase">
                        {item.chapter}
                      </span>
                      <p className="text-xs font-bold text-[#1c1b1b]">{item.title}</p>
                    </div>
                  </div>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                      item.status === 'Completed'
                        ? 'bg-emerald-100 text-emerald-800'
                        : item.status === 'In Progress'
                        ? 'bg-blue-100 text-blue-900'
                        : 'bg-gray-200 text-gray-700'
                    }`}
                  >
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'assignments' && (
            <div className="space-y-3">
              {subject.nextAssignment && (
                <div className="p-4 bg-[#e7effc] rounded-2xl border border-[#c3c6d1]">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-black uppercase text-blue-900 bg-white/70 px-2 py-0.5 rounded">
                      Active Homework
                    </span>
                    <span className="text-xs font-bold text-red-600">
                      {subject.nextAssignment.dueDate}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-[#001e40] mb-2">
                    {subject.nextAssignment.title}
                  </h4>
                  <p className="text-xs text-[#43474f] leading-relaxed mb-3">
                    Submit scanned copy or typed worksheet via the BBS portal before 11:59 PM.
                  </p>
                  <button
                    onClick={() => alert('Assignment submission file upload dialog open')}
                    className="w-full bg-[#001e40] text-white py-2 rounded-xl text-xs font-bold hover:bg-[#003366] transition-colors cursor-pointer shadow-xs"
                  >
                    Submit Assignment
                  </button>
                </div>
              )}
            </div>
          )}

          {activeTab === 'resources' && (
            <div className="space-y-2">
              {[
                { name: `${subject.name}_Course_Syllabus_2026.pdf`, size: '2.1 MB' },
                { name: `${subject.name}_Formula_Handbook.pdf`, size: '4.8 MB' },
                { name: 'Weekly_Revision_Questionnaire.pdf', size: '1.1 MB' },
              ].map((res, idx) => (
                <div
                  key={idx}
                  onClick={() => alert(`Downloading "${res.name}"...`)}
                  className="p-3 bg-[#f6f3f2] hover:bg-[#eae7e7] rounded-xl flex items-center justify-between border border-[#e5e2e1] transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-[#003366]" />
                    <span className="text-xs font-semibold text-[#1c1b1b]">{res.name}</span>
                  </div>
                  <span className="text-[10px] text-[#575f65]">{res.size}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer with Chat Teacher Action */}
        <div className="p-4 bg-[#fcf9f8] border-t border-[#e5e2e1] flex items-center justify-between gap-3">
          <button
            onClick={() => {
              if (onStartTeacherChat) onStartTeacherChat(subject.teacher);
              onClose();
            }}
            className="flex-1 bg-white border border-[#001e40] text-[#001e40] hover:bg-[#f0eded] font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xs"
          >
            <MessageSquare className="w-4 h-4" /> Message {subject.teacher}
          </button>
          <button
            onClick={onClose}
            className="bg-[#001e40] hover:bg-[#003366] text-white font-bold py-2.5 px-5 rounded-xl text-xs transition-colors cursor-pointer shadow-xs"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
