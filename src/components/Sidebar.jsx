import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  CalendarCheck,
  CreditCard,
  GraduationCap,
  BookOpen,
  Bell,
  Briefcase,
  LogOut,
  School,
  ChevronRight
} from "lucide-react";

export default function Sidebar() {
  const navigate = useNavigate();

  const navLinks = [
    { name: "Dashboard", path: "/", icon: LayoutDashboard },
    { name: "Students", path: "/students", icon: Users },
    { name: "Attendance", path: "/attendance", icon: CalendarCheck },
    { name: "Fees & Dues", path: "/fees", icon: CreditCard },
    { name: "Marks & Exams", path: "/marks", icon: GraduationCap },
    { name: "Homework", path: "/homework", icon: BookOpen },
    { name: "Notice Board", path: "/notice", icon: Bell },
    { name: "Staff Directory", path: "/staff", icon: Briefcase },
  ];

  const handleLogout = () => {
    localStorage.removeItem("exotica_auth_token");
    navigate("/login");
  };

  return (
    <aside className="w-64 h-screen bg-white/70 backdrop-blur-xl border-r border-white/80 p-5 flex flex-col justify-between fixed left-0 top-0 z-30 shadow-xl shadow-blue-900/5 select-none">
      {/* Brand Header */}
      <div>
        <div className="flex items-center gap-3 px-2 py-1 mb-8">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-lg shadow-blue-600/25 flex-shrink-0">
            <School className="w-6 h-6" />
          </div>
          <div className="overflow-hidden">
            <h1 className="text-base font-extrabold tracking-tight text-slate-900 leading-none">
              EXOTICA
            </h1>
            <p className="text-[10px] uppercase font-bold tracking-widest text-blue-600 mt-1">
              Admin Desktop
            </p>
          </div>
        </div>

        {/* Navigation Item List */}
        <div className="px-2 mb-2">
          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Menu
          </p>
        </div>

        <nav className="space-y-1.5">
          {navLinks.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/"}
                className={({ isActive }) =>
                  `group flex items-center justify-between px-3.5 py-2.5 rounded-xl font-semibold text-xs tracking-wide transition-all ${
                    isActive
                      ? "bg-blue-600 text-white shadow-md shadow-blue-600/25"
                      : "text-slate-600 hover:text-slate-900 hover:bg-white/80"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <div className="flex items-center gap-3">
                      <Icon
                        className={`w-4 h-4 transition-colors ${
                          isActive
                            ? "text-white"
                            : "text-slate-400 group-hover:text-blue-600"
                        }`}
                      />
                      <span>{item.name}</span>
                    </div>
                    {isActive && (
                      <ChevronRight className="w-3.5 h-3.5 text-blue-200" />
                    )}
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* User Footer Profile & Terminate Button */}
      <div className="pt-4 border-t border-slate-200/60">
        <div className="flex items-center gap-3 px-2 py-2 mb-2 bg-white/60 rounded-xl border border-white/80">
          <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 font-bold text-xs flex items-center justify-center">
            AD
          </div>
          <div className="overflow-hidden">
            <p className="text-xs font-bold text-slate-800 truncate">Administrator</p>
            <p className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block animate-pulse"></span>
              Connected
            </p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-red-600 hover:bg-red-50/80 border border-transparent hover:border-red-200/60 transition-all"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out Session</span>
        </button>
      </div>
    </aside>
  );
}