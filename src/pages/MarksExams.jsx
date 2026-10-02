import React, { useState } from 'react';
import { Award, Search, Save, FileText, CheckCircle2, BookOpen } from 'lucide-react';

// ટેસ્ટિંગ માટેનો ડમી ડેટા
const initialStudents = [
  { id: 1, name: 'Rahul Patel', rollNo: '101' },
  { id: 2, name: 'Priya Shah', rollNo: '102' },
  { id: 3, name: 'Amit Desai', rollNo: '103' },
  { id: 4, name: 'Neha Sharma', rollNo: '104' },
  { id: 5, name: 'Rohan Verma', rollNo: '105' },
];

export default function MarksExams() {
  const [students] = useState(initialStudents);
  const [totalMarks, setTotalMarks] = useState(80); // બોર્ડ પેટર્ન મુજબ 80 માર્ક્સ ડિફોલ્ટ
  
  // માર્ક્સ સ્ટોર કરવા માટે (સ્ટુડન્ટ ID મુજબ)
  const [marks, setMarks] = useState({});

  // માર્ક્સ પરથી ગ્રેડ ગણવા માટેનું ફંક્શન
  const calculateGrade = (obtained, total) => {
    if (!obtained && obtained !== 0) return '-';
    const percentage = (obtained / total) * 100;
    if (percentage >= 91) return { grade: 'A1', color: 'bg-green-100 text-green-700 border-green-300' };
    if (percentage >= 81) return { grade: 'A2', color: 'bg-green-50 text-green-600 border-green-200' };
    if (percentage >= 71) return { grade: 'B1', color: 'bg-blue-100 text-blue-700 border-blue-300' };
    if (percentage >= 61) return { grade: 'B2', color: 'bg-blue-50 text-blue-600 border-blue-200' };
    if (percentage >= 51) return { grade: 'C1', color: 'bg-yellow-100 text-yellow-700 border-yellow-300' };
    if (percentage >= 41) return { grade: 'C2', color: 'bg-yellow-50 text-yellow-600 border-yellow-200' };
    if (percentage >= 33) return { grade: 'D', color: 'bg-orange-100 text-orange-700 border-orange-300' };
    return { grade: 'E', color: 'bg-red-100 text-red-700 border-red-300' }; // ફેલ
  };

  const handleMarkChange = (studentId, value) => {
    // માર્ક્સ Total Marks કરતા વધવા ના જોઈએ
    let val = parseInt(value);
    if (val > totalMarks) val = totalMarks;
    if (val < 0) val = 0;
    
    setMarks(prev => ({ ...prev, [studentId]: isNaN(val) ? '' : val }));
  };

  const handleSaveMarks = () => {
    alert('Marks Saved Successfully! Result sheets are now ready to print.');
  };

  return (
    <div className="p-6 h-full flex flex-col">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 drop-shadow-sm flex items-center gap-3">
        <Award className="w-8 h-8 text-blue-600" /> Marks & Examination
      </h1>

      {/* ટોપ કંટ્રોલ બાર (Glassmorphism) */}
      <div className="bg-white/40 backdrop-blur-lg border border-white/50 shadow-xl rounded-2xl p-4 mb-6 flex flex-wrap gap-4 items-center">
        
        <select className="px-4 py-2.5 rounded-xl border-none bg-white/60 shadow-inner focus:ring-2 focus:ring-blue-500 font-bold text-gray-700">
          <option>Standard 10 (GSEB)</option>
          <option>Standard 11 (Science)</option>
          <option>Standard 12</option>
        </select>
        
        <select className="px-4 py-2.5 rounded-xl border-none bg-white/60 shadow-inner focus:ring-2 focus:ring-blue-500 font-bold text-gray-700">
          <option>First Prelim Exam</option>
          <option>Unit Test 1</option>
          <option>Final Board Pattern</option>
        </select>

        <select className="px-4 py-2.5 rounded-xl border-none bg-white/60 shadow-inner focus:ring-2 focus:ring-blue-500 font-bold text-gray-700">
          <option>Mathematics</option>
          <option>Science</option>
          <option>English</option>
          <option>Social Science</option>
        </select>

        <div className="flex items-center gap-2 bg-white/60 px-4 py-2 rounded-xl shadow-inner ml-auto">
          <label className="text-sm font-semibold text-gray-600">Total Marks:</label>
          <input 
            type="number" 
            value={totalMarks}
            onChange={(e) => setTotalMarks(e.target.value)}
            className="w-16 bg-transparent border-b-2 border-blue-500 focus:ring-0 text-center font-bold text-lg text-blue-700 outline-none p-0"
          />
        </div>
      </div>

      {/* સ્ટુડન્ટ માર્ક્સ એન્ટ્રી ટેબલ (Glassmorphism) */}
      <div className="bg-white/40 backdrop-blur-lg border border-white/50 shadow-xl rounded-2xl flex-1 flex flex-col overflow-hidden mb-6">
        <div className="overflow-y-auto p-4">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-gray-600 border-b border-gray-300/50">
                <th className="pb-3 pl-2 font-semibold w-24">Roll No</th>
                <th className="pb-3 font-semibold">Student Name</th>
                <th className="pb-3 font-semibold text-center">Marks Obtained</th>
                <th className="pb-3 font-semibold text-center">Percentage</th>
                <th className="pb-3 font-semibold text-center">Grade</th>
                <th className="pb-3 font-semibold text-right pr-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {students.map((s) => {
                const obtained = marks[s.id];
                const gradeInfo = calculateGrade(obtained, totalMarks);
                
                return (
                  <tr key={s.id} className="border-b border-gray-200/50 hover:bg-white/50 transition-colors">
                    <td className="py-4 pl-2 font-medium text-gray-700">{s.rollNo}</td>
                    <td className="py-4 font-bold text-gray-800">{s.name}</td>
                    
                    <td className="py-4 text-center">
                      <div className="inline-flex items-center bg-white/60 rounded-lg shadow-inner border border-gray-200 overflow-hidden">
                        <input 
                          type="number" 
                          value={obtained !== undefined ? obtained : ''}
                          onChange={(e) => handleMarkChange(s.id, e.target.value)}
                          placeholder="00"
                          className="w-16 px-2 py-1.5 text-center font-bold text-gray-800 bg-transparent border-none outline-none focus:ring-0"
                        />
                        <span className="px-2 py-1.5 bg-gray-100 text-gray-500 text-sm font-semibold border-l border-gray-200">
                          / {totalMarks}
                        </span>
                      </div>
                    </td>
                    
                    <td className="py-4 text-center font-semibold text-gray-600">
                      {(obtained >= 0 && obtained !== '') ? ((obtained / totalMarks) * 100).toFixed(1) + '%' : '-'}
                    </td>
                    
                    <td className="py-4 text-center">
                      {(obtained >= 0 && obtained !== '') ? (
                        <span className={`px-3 py-1 rounded-full font-bold text-sm border shadow-sm ${gradeInfo.color}`}>
                          {gradeInfo.grade}
                        </span>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                    
                    <td className="py-4 text-right pr-4">
                      {(obtained >= 0 && obtained !== '') ? (
                        <span className="inline-flex items-center gap-1 text-green-600 text-sm font-bold">
                          <CheckCircle2 className="w-4 h-4" /> Entered
                        </span>
                      ) : (
                        <span className="text-orange-500 text-sm font-semibold italic">Pending...</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* સેવ અને રિપોર્ટ બટન */}
      <div className="flex justify-between items-center bg-white/40 backdrop-blur-lg border border-white/50 p-4 rounded-2xl shadow-xl">
        <button className="text-blue-600 font-semibold flex items-center gap-2 hover:text-blue-800 transition-colors">
          <BookOpen className="w-5 h-5" /> View Subject Analysis
        </button>
        
        <div className="flex gap-4">
          <button className="bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 px-6 py-2.5 rounded-xl font-bold shadow-md flex items-center gap-2 transition-all">
            <FileText className="w-5 h-5 text-purple-500" /> Generate Marksheets
          </button>
          
          <button 
            onClick={handleSaveMarks}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2.5 rounded-xl font-bold shadow-lg flex items-center gap-2 transition-all transform hover:scale-105"
          >
            <Save className="w-5 h-5" /> Save Marks
          </button>
        </div>
      </div>
    </div>
  );
}