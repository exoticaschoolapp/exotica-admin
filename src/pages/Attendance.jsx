import React, { useState } from 'react';
import { Calendar, Search, Save, Check, X, Clock, MessageCircle } from 'lucide-react';

// ટેસ્ટિંગ માટેનો ડમી ડેટા
const initialStudents = [
  { id: 1, name: 'Rahul Patel', rollNo: '101' },
  { id: 2, name: 'Priya Shah', rollNo: '102' },
  { id: 3, name: 'Amit Desai', rollNo: '103' },
  { id: 4, name: 'Neha Sharma', rollNo: '104' },
  { id: 5, name: 'Rohan Verma', rollNo: '105' },
];

export default function Attendance() {
  const [students] = useState(initialStudents);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  
  // હાજરીનો ડેટા સ્ટોર કરવા માટે (ડિફોલ્ટ બધા Present)
  const [attendance, setAttendance] = useState(
    initialStudents.reduce((acc, student) => ({ ...acc, [student.id]: 'Present' }), {})
  );

  const [sendWhatsApp, setSendWhatsApp] = useState(true);

  const handleStatusChange = (studentId, status) => {
    setAttendance(prev => ({ ...prev, [studentId]: status }));
  };

  const handleSaveAttendance = () => {
    const absentees = Object.entries(attendance).filter(([_, status]) => status === 'Absent').length;
    alert(`Attendance Saved Successfully!\nTotal Present: ${students.length - absentees}\nTotal Absent: ${absentees}\n${sendWhatsApp && absentees > 0 ? 'WhatsApp alerts sent to absentees.' : ''}`);
  };

  return (
    <div className="p-6 h-full flex flex-col">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 drop-shadow-sm">Daily Attendance</h1>

      {/* ટોપ કંટ્રોલ બાર (Glassmorphism) */}
      <div className="bg-white/40 backdrop-blur-lg border border-white/50 shadow-xl rounded-2xl p-4 mb-6 flex flex-wrap gap-4 items-center justify-between">
        <div className="flex gap-4 items-center flex-1">
          <div className="flex items-center gap-2 bg-white/60 px-4 py-2.5 rounded-xl shadow-inner">
            <Calendar className="text-blue-600 w-5 h-5" />
            <input 
              type="date" 
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="bg-transparent border-none focus:ring-0 text-gray-700 font-semibold cursor-pointer outline-none"
            />
          </div>
          <select className="px-4 py-2.5 rounded-xl border-none bg-white/60 shadow-inner focus:ring-2 focus:ring-blue-500 font-medium text-gray-700">
            <option>Standard 10</option>
            <option>Standard 9</option>
          </select>
          <select className="px-4 py-2.5 rounded-xl border-none bg-white/60 shadow-inner focus:ring-2 focus:ring-blue-500 font-medium text-gray-700">
            <option>Division A</option>
            <option>Division B</option>
          </select>
        </div>

        <div className="relative min-w-[250px]">
          <Search className="absolute left-3 top-3 text-gray-500 w-5 h-5" />
          <input 
            type="text" 
            placeholder="Search student..." 
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border-none bg-white/60 focus:bg-white focus:ring-2 focus:ring-blue-500 transition-all shadow-inner"
          />
        </div>
      </div>

      {/* સ્ટુડન્ટ લિસ્ટ (Glassmorphism) */}
      <div className="bg-white/40 backdrop-blur-lg border border-white/50 shadow-xl rounded-2xl flex-1 flex flex-col overflow-hidden mb-6">
        <div className="overflow-y-auto p-4">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-gray-600 border-b border-gray-300/50">
                <th className="pb-3 pl-2 font-semibold w-24">Roll No</th>
                <th className="pb-3 font-semibold">Student Name</th>
                <th className="pb-3 font-semibold text-center">Mark Attendance</th>
              </tr>
            </thead>
            <tbody>
              {students.map((s) => (
                <tr key={s.id} className="border-b border-gray-200/50 hover:bg-white/50 transition-colors">
                  <td className="py-4 pl-2 font-medium text-gray-700">{s.rollNo}</td>
                  <td className="py-4 font-bold text-gray-800">{s.name}</td>
                  <td className="py-4 text-center">
                    <div className="inline-flex bg-white/50 p-1 rounded-xl shadow-inner gap-1">
                      <button 
                        onClick={() => handleStatusChange(s.id, 'Present')}
                        className={`flex items-center gap-1 px-4 py-1.5 rounded-lg text-sm font-bold transition-all ${attendance[s.id] === 'Present' ? 'bg-green-500 text-white shadow-md' : 'text-gray-500 hover:bg-green-100'}`}
                      >
                        <Check className="w-4 h-4" /> Present
                      </button>
                      <button 
                        onClick={() => handleStatusChange(s.id, 'Absent')}
                        className={`flex items-center gap-1 px-4 py-1.5 rounded-lg text-sm font-bold transition-all ${attendance[s.id] === 'Absent' ? 'bg-red-500 text-white shadow-md' : 'text-gray-500 hover:bg-red-100'}`}
                      >
                        <X className="w-4 h-4" /> Absent
                      </button>
                      <button 
                        onClick={() => handleStatusChange(s.id, 'Late')}
                        className={`flex items-center gap-1 px-4 py-1.5 rounded-lg text-sm font-bold transition-all ${attendance[s.id] === 'Late' ? 'bg-yellow-500 text-white shadow-md' : 'text-gray-500 hover:bg-yellow-100'}`}
                      >
                        <Clock className="w-4 h-4" /> Late
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* સેવ બટન અને WhatsApp ટોગલ */}
      <div className="flex justify-between items-center bg-white/40 backdrop-blur-lg border border-white/50 p-4 rounded-2xl shadow-xl">
        <label className="flex items-center gap-2 cursor-pointer font-semibold text-gray-700">
          <input 
            type="checkbox" 
            checked={sendWhatsApp}
            onChange={(e) => setSendWhatsApp(e.target.checked)}
            className="w-5 h-5 rounded text-green-500 focus:ring-green-500 border-gray-300"
          />
          <MessageCircle className="w-5 h-5 text-green-500" />
          Send WhatsApp alert to absent students
        </label>
        
        <button 
          onClick={handleSaveAttendance}
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-bold shadow-lg flex items-center gap-2 transition-all transform hover:scale-105"
        >
          <Save className="w-5 h-5" /> Save Attendance
        </button>
      </div>
    </div>
  );
}