import React, { useState } from 'react';
import { Users, UserPlus, DollarSign, FileText, CheckCircle2, Search, Briefcase } from 'lucide-react';

const initialStaff = [
  { id: 1, name: 'Rajesh Sharma', role: 'Maths Teacher', subject: 'Mathematics', salary: 35000, status: 'Paid' },
  { id: 2, name: 'Sunita Patel', role: 'Science Teacher', subject: 'Physics/Chem', salary: 32000, status: 'Pending' },
  { id: 3, name: 'Anil Kumar', role: 'English Expert', subject: 'English', salary: 30000, status: 'Paid' },
  { id: 4, name: 'Pooja Mehta', role: 'Admin Staff', subject: 'Office Management', salary: 22000, status: 'Pending' },
];

export default function StaffPayroll() {
  const [staffList, setStaffList] = useState(initialStaff);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // નવા સ્ટાફ માટેનું સ્ટેટ
  const [newStaff, setNewStaff] = useState({ name: '', role: '', subject: '', salary: '' });

  const handleAddStaff = (e) => {
    e.preventDefault();
    const staffMember = {
      id: Date.now(),
      ...newStaff,
      salary: Number(newStaff.salary),
      status: 'Pending'
    };
    setStaffList([staffMember, ...staffList]);
    setNewStaff({ name: '', role: '', subject: '', salary: '' });
    setIsModalOpen(false);
    alert('Staff member added successfully!');
  };

  const toggleSalaryStatus = (id) => {
    setStaffList(staffList.map(s => {
      if (s.id === id) {
        const nextStatus = s.status === 'Paid' ? 'Pending' : 'Paid';
        return { ...s, status: nextStatus };
      }
      return s;
    }));
  };

  return (
    <div className="p-6 h-full flex flex-col relative">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800 drop-shadow-sm flex items-center gap-3">
          <Briefcase className="w-8 h-8 text-indigo-600" /> Staff Directory & Payroll
        </h1>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-bold shadow-lg flex items-center gap-2 transition-all transform hover:scale-105"
        >
          <UserPlus className="w-5 h-5" /> Add New Staff
        </button>
      </div>

      {/* સર્ચ બાર (Glassmorphism) */}
      <div className="bg-white/40 backdrop-blur-lg border border-white/50 shadow-xl rounded-2xl p-4 mb-6 flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 text-gray-500 w-5 h-5" />
          <input 
            type="text" 
            placeholder="Search staff by name or role..." 
            value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border-none bg-white/60 focus:bg-white focus:ring-2 focus:ring-indigo-500 transition-all shadow-inner"
          />
        </div>
      </div>

      {/* સ્ટાફ ટેબલ (Glassmorphism) */}
      <div className="bg-white/40 backdrop-blur-lg border border-white/50 shadow-xl rounded-2xl flex-1 flex flex-col overflow-hidden mb-6">
        <div className="overflow-y-auto p-4">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-gray-600 border-b border-gray-300/50">
                <th className="pb-3 pl-2 font-semibold">Staff Name</th>
                <th className="pb-3 font-semibold">Designation / Role</th>
                <th className="pb-3 font-semibold">Specialization</th>
                <th className="pb-3 font-semibold">Monthly Salary</th>
                <th className="pb-3 font-semibold text-center">Salary Status</th>
                <th className="pb-3 font-semibold text-right pr-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {staffList.map((staff) => (
                <tr key={staff.id} className="border-b border-gray-200/50 hover:bg-white/50 transition-colors">
                  <td className="py-4 pl-2 font-bold text-gray-800">{staff.name}</td>
                  <td className="py-4 text-gray-700 font-medium">{staff.role}</td>
                  <td className="py-4 text-gray-600">{staff.subject}</td>
                  <td className="py-4 font-bold text-indigo-700">₹{staff.salary.toLocaleString()}</td>
                  <td className="py-4 text-center">
                    <span className={`px-3 py-1 rounded-full font-bold text-xs shadow-sm ${staff.status === 'Paid' ? 'bg-green-100 text-green-700 border border-green-300' : 'bg-orange-100 text-orange-700 border border-orange-300'}`}>
                      {staff.status}
                    </span>
                  </td>
                  <td className="py-4 text-right pr-4">
                    <button 
                      onClick={() => toggleSalaryStatus(staff.id)}
                      className={`px-4 py-1.5 rounded-lg text-sm font-semibold shadow-md transition-all ${staff.status === 'Paid' ? 'bg-gray-200 hover:bg-gray-300 text-gray-700' : 'bg-green-600 hover:bg-green-700 text-white'}`}
                    >
                      {staff.status === 'Paid' ? 'Mark Pending' : 'Pay Salary'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* મોડલ: નવો સ્ટાફ ઉમેરવા માટે */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white/90 backdrop-blur-xl border border-white shadow-2xl p-6 rounded-2xl w-[450px]">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <UserPlus className="w-5 h-5 text-indigo-600" /> Add New Staff Member
            </h2>
            
            <form onSubmit={handleAddStaff} className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-1">Full Name</label>
                <input 
                  type="text" required placeholder="e.g. Ramesh Patel"
                  value={newStaff.name} onChange={(e) => setNewStaff({...newStaff, name: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-1">Role / Designation</label>
                <input 
                  type="text" required placeholder="e.g. Science Teacher"
                  value={newStaff.role} onChange={(e) => setNewStaff({...newStaff, role: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-1">Subject / Department</label>
                <input 
                  type="text" required placeholder="e.g. Chemistry"
                  value={newStaff.subject} onChange={(e) => setNewStaff({...newStaff, subject: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-1">Monthly Salary (₹)</label>
                <input 
                  type="number" required placeholder="e.g. 35000"
                  value={newStaff.salary} onChange={(e) => setNewStaff({...newStaff, salary: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              
              <div className="flex gap-3 mt-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2.5 rounded-xl">
                  Cancel
                </button>
                <button type="submit" className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 rounded-xl shadow-lg">
                  Save Staff
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}