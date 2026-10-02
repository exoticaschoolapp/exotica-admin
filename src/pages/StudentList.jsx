import React, { useState, useEffect } from 'react';
import { Users, Search, Trash2, Loader2, RefreshCw } from 'lucide-react';
import { db } from '../firebase/firebaseConfig';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';

export default function StudentList() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, 'students'));
      const studentArray = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setStudents(studentArray);
    } catch (error) {
      console.error("Error fetching students: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this student from database?")) {
      try {
        await deleteDoc(doc(db, 'students', id));
        setStudents(students.filter(s => s.id !== id));
        alert('Student deleted successfully!');
      } catch (error) {
        console.error("Error deleting student: ", error);
      }
    }
  };

  const filteredStudents = students.filter(s => 
    s.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.standard?.toString().includes(searchTerm) ||
    s.rollNo?.toString().includes(searchTerm)
  );

  return (
    <div className="p-6 h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800 drop-shadow-sm flex items-center gap-3">
          <Users className="w-8 h-8 text-blue-600" /> Student Directory (Live Firebase)
        </h1>
        <button 
          onClick={fetchStudents}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl font-bold shadow-lg flex items-center gap-2 transition-all transform hover:scale-105"
        >
          <RefreshCw className="w-4 h-4" /> Refresh List
        </button>
      </div>

      {/* સર્ચ બાર (Glassmorphism) */}
      <div className="bg-white/40 backdrop-blur-lg border border-white/50 shadow-xl rounded-2xl p-4 mb-6 flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 text-gray-500 w-5 h-5" />
          <input 
            type="text" 
            placeholder="Search by student name, standard, or roll no..." 
            value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border-none bg-white/60 focus:bg-white focus:ring-2 focus:ring-blue-500 transition-all shadow-inner"
          />
        </div>
      </div>

      {/* વિદ્યાર્થીઓનું ટેબલ (Glassmorphism) */}
      <div className="bg-white/40 backdrop-blur-lg border border-white/50 shadow-xl rounded-2xl flex-1 flex flex-col overflow-hidden">
        {loading ? (
          <div className="flex-1 flex justify-center items-center">
            <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
          </div>
        ) : filteredStudents.length === 0 ? (
          <div className="flex-1 flex flex-col justify-center items-center text-gray-500 font-medium">
            <Users className="w-16 h-16 text-gray-300 mb-2" />
            <p>No students found in Firebase database.</p>
          </div>
        ) : (
          <div className="overflow-y-auto p-4 flex-1">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-gray-600 border-b border-gray-300/50">
                  <th className="pb-3 pl-2 font-semibold">Roll No</th>
                  <th className="pb-3 font-semibold">Student Name</th>
                  <th className="pb-3 font-semibold">Std-Div</th>
                  <th className="pb-3 font-semibold">Parent Name</th>
                  <th className="pb-3 font-semibold">WhatsApp No</th>
                  <th className="pb-3 font-semibold text-right pr-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((student) => (
                  <tr key={student.id} className="border-b border-gray-200/50 hover:bg-white/50 transition-colors">
                    <td className="py-4 pl-2 font-bold text-gray-800">{student.rollNo}</td>
                    <td className="py-4 font-bold text-blue-700">{student.name}</td>
                    <td className="py-4 font-semibold text-gray-700">Std {student.standard}-{student.division}</td>
                    <td className="py-4 text-gray-600">{student.parentName}</td>
                    <td className="py-4 text-gray-600">{student.phone}</td>
                    <td className="py-4 text-right pr-4">
                      <button 
                        onClick={() => handleDelete(student.id)}
                        className="text-gray-400 hover:text-red-500 p-2 rounded-lg hover:bg-red-50 transition-colors"
                        title="Delete Student"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}