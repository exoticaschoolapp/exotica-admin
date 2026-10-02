import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  UserPlus, 
  Users, 
  CreditCard, 
  CalendarCheck, 
  GraduationCap, 
  BookOpen, 
  Bell, 
  Wallet, 
  LogOut 
} from 'lucide-react';

export default function Sidebar() {
  const location = useLocation();

  const menuItems = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'Student Registration', path: '/bulk-upload', icon: UserPlus },
    { name: 'Student Directory', path: '/student-list', icon: Users },
    { name: 'Fees Management', path: '/fees', icon: CreditCard },
    { name: 'Attendance', path: '/attendance', icon: CalendarCheck },
    { name: 'Marks & Exams', path: '/marks', icon: GraduationCap },
    { name: 'Homework', path: '/homework', icon: BookOpen },
    { name: 'Notice Board', path: '/notice-board', icon: Bell },
    { name: 'Staff Payroll', path: '/staff-payroll', icon: Wallet },
  ];

  return (
    <aside className="w-64 bg-white/40 backdrop-blur-xl border-r border-white/50 shadow-xl h-screen flex flex-col p-4">
      {/* સ્કૂલ લોગો અથવા ટાઇટલ */}
      <div className="flex items-center gap-3 px-4 py-6 mb-4 border-b border-gray-200/50">
        <div className="bg-blue-600 text-white p-2.5 rounded-2xl shadow-lg">
          <GraduationCap className="w-7 h-7" />
        </div>
        <div>
          <h1 className="font-bold text-gray-800 text-lg">Exotica School</h1>
          <p className="text-xs text-gray-500 font-medium">Admin Panel</p>
        </div>
      </div>

      {/* મેનૂ લિસ્ટ */}
      <nav className="flex-1 flex flex-col gap-1.5 overflow-y-auto pr-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all shadow-sm ${
                isActive 
                  ? 'bg-blue-600 text-white shadow-md' 
                  : 'text-gray-600 hover:bg-white/60 hover:text-blue-600'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* લોગઆઉટ બટન */}
      <div className="pt-4 border-t border-gray-200/50">
        <Link
          to="/login"
          className="flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-red-600 hover:bg-red-50 transition-all"
        >
          <LogOut className="w-5 h-5" />
          <span>Sign Out</span>
        </Link>
      </div>
    </aside>
  );
}