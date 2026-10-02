import React, { useState } from 'react';
import { BookOpen, PlusCircle, Calendar, CheckCircle2, Trash2, Layers } from 'lucide-react';

const initialHomework = [
  { id: 1, title: 'Solve Quadratic Equations (Ex 4.2)', subject: 'Mathematics', standard: 'Standard 10', dueDate: '05/10/2026', status: 'Active' },
  { id: 2, title: 'Read Chapter 3 & Write Summary', subject: 'English', standard: 'Standard 9', dueDate: '06/10/2026', status: 'Active' },
  { id: 3, title: 'Chemical Reactions Balanced Equations', subject: 'Science', standard: 'Standard 10', dueDate: '07/10/2026', status: 'Active' },
];

export default function Homework() {
  const [homeworkList, setHomeworkList] = useState(initialHomework);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // નવા હોમવર્ક માટેનું સ્ટેટ
  const [newHw, setNewHw] = useState({
    title: '',
    subject: 'Mathematics',
    standard: 'Standard 10',
    dueDate: '',
    description: ''
  });

  const handleAddHomework = (e) => {
    e.preventDefault();
    const item = {
      id: Date.now(),
      ...newHw,
      status: 'Active'
    };
    setHomeworkList([item, ...homeworkList]);
    setNewHw({ title: '', subject: 'Mathematics', standard: 'Standard 10', dueDate: '', description: '' });
    setIsModalOpen(false);
    alert('Homework assigned successfully!');
  };

  const handleDelete = (id) => {
    setHomeworkList(homeworkList.filter(h => h.id !== id));
  };

  return (
    <div className="p-6 h-full flex flex-col relative">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800 drop-shadow-sm flex items-center gap-3">
          <BookOpen className="w-8 h-8 text-blue-600" /> Homework & Assignments
        </h1>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-bold shadow-lg flex items-center gap-2 transition-all transform hover:scale-105"
        >
          <PlusCircle className="w-5 h-5" /> Assign Homework
        </button>
      </div>

      {/* હોમવર્ક લિસ્ટ કાર્ડ્સ (Glassmorphism) */}
      <div className="bg-white/40 backdrop-blur-lg border border-white/50 shadow-xl rounded-2xl flex-1 flex flex-col overflow-hidden p-4">
        <div className="overflow-y-auto flex flex-col gap-4">
          {homeworkList.map((hw) => (
            <div key={hw.id} className="bg-white/60 backdrop-blur-md p-5 rounded-xl shadow-sm border border-white hover:shadow-md transition-all flex justify-between items-center">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-3">
                  <span className="bg-blue-100 text-blue-700 px-3 py-0.5 rounded-full text-xs font-bold border border-blue-200">
                    {hw.subject}
                  </span>
                  <span className="bg-purple-100 text-purple-700 px-3 py-0.5 rounded-full text-xs font-bold border border-purple-200">
                    {hw.standard}
                  </span>
                </div>
                <h3 className="font-bold text-gray-800 text-lg mt-1">{hw.title}</h3>
                <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                  <Calendar className="w-4 h-4 text-gray-400" /> Due Date: <span className="font-semibold text-gray-700">{hw.dueDate}</span>
                </p>
              </div>

              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1 text-green-600 font-bold text-sm bg-green-50 px-3 py-1.5 rounded-lg border border-green-200">
                  <CheckCircle2 className="w-4 h-4" /> Active
                </span>
                <button 
                  onClick={() => handleDelete(hw.id)}
                  className="text-gray-400 hover:text-red-500 p-2 rounded-lg hover:bg-red-50 transition-colors"
                  title="Delete Homework"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* મોડલ: નવું હોમવર્ક અસાઇન કરવા માટે */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white/90 backdrop-blur-xl border border-white shadow-2xl p-6 rounded-2xl w-[450px]">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <PlusCircle className="w-5 h-5 text-blue-600" /> Assign New Homework
            </h2>
            
            <form onSubmit={handleAddHomework} className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-1">Homework Title / Topic</label>
                <input 
                  type="text" required placeholder="e.g. Exercise 4.2 questions"
                  value={newHw.title} onChange={(e) => setNewHw({...newHw, title: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-1">Subject</label>
                <select 
                  value={newHw.subject} onChange={(e) => setNewHw({...newHw, subject: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                >
                  <option>Mathematics</option>
                  <option>Science</option>
                  <option>English</option>
                  <option>Social Science</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-1">Standard</label>
                <select 
                  value={newHw.standard} onChange={(e) => setNewHw({...newHw, standard: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                >
                  <option>Standard 10</option>
                  <option>Standard 9</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-1">Due Date</label>
                <input 
                  type="date" required
                  value={newHw.dueDate} onChange={(e) => setNewHw({...newHw, dueDate: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex gap-3 mt-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2.5 rounded-xl">
                  Cancel
                </button>
                <button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-xl shadow-lg">
                  Publish Homework
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}