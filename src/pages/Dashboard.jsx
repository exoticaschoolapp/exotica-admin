import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Users,
  UserPlus,
  CreditCard,
  CalendarCheck,
  PlusCircle,
  Receipt,
  Send,
  ArrowUpRight,
  TrendingUp,
  Clock,
  Sparkles,
  ShieldCheck
} from "lucide-react";

export default function Dashboard() {
  const navigate = useNavigate();

  // Core Metric Stat Cards
  const stats = [
    {
      title: "Total Students",
      value: "842",
      change: "+18 this month",
      subtext: "Across 14 Standards",
      icon: Users,
      accentColor: "text-blue-600",
      accentBg: "bg-blue-50",
      borderColor: "border-blue-100",
    },
    {
      title: "Active Inquiries",
      value: "14",
      change: "4 follow-ups due",
      subtext: "Admissions Pipeline",
      icon: UserPlus,
      accentColor: "text-amber-600",
      accentBg: "bg-amber-50",
      borderColor: "border-amber-100",
    },
    {
      title: "Pending Fees",
      value: "₹3,45,000",
      change: "Term 2 balances",
      subtext: "Due by Oct 15",
      icon: CreditCard,
      accentColor: "text-rose-600",
      accentBg: "bg-rose-50",
      borderColor: "border-rose-100",
    },
    {
      title: "Today's Attendance",
      value: "94.6%",
      change: "796 / 842 Present",
      subtext: "Optimal Student Ratio",
      icon: CalendarCheck,
      accentColor: "text-emerald-600",
      accentBg: "bg-emerald-50",
      borderColor: "border-emerald-100",
    },
  ];

  // Quick Action Buttons
  const quickActions = [
    {
      title: "Add New Student",
      desc: "Enroll candidate with parent WhatsApp",
      icon: PlusCircle,
      path: "/students",
      color: "bg-blue-600 text-white hover:bg-blue-700",
    },
    {
      title: "Collect Fee",
      desc: "Record payment & print 2-copy A4 receipt",
      icon: Receipt,
      path: "/fees",
      color: "bg-emerald-600 text-white hover:bg-emerald-700",
    },
    {
      title: "Mark Attendance",
      desc: "Instant roll-call with WhatsApp alerts",
      icon: CalendarCheck,
      path: "/attendance",
      color: "bg-indigo-600 text-white hover:bg-indigo-700",
    },
    {
      title: "Broadcast Notice",
      desc: "Send school announcements via WhatsApp",
      icon: Send,
      path: "/notice",
      color: "bg-purple-600 text-white hover:bg-purple-700",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden bg-white/75 backdrop-blur-xl border border-white/90 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/60 text-blue-700 font-bold text-[11px] mb-2">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            Institutional Telemetry Active
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Administrative Headquarters
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Real-time telemetry and operational controls for Exotica School.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="px-4 py-2.5 rounded-xl bg-white/90 border border-slate-200/80 shadow-sm text-center">
            <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Campus Status</p>
            <p className="text-xs font-bold text-emerald-600 flex items-center gap-1 justify-center">
              <ShieldCheck className="w-3.5 h-3.5" /> Normal Operations
            </p>
          </div>
        </div>
      </div>

      {/* 1. 4-Column Grid of Glassmorphism Stat Cards */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Core Institutional Metrics
          </h2>
          <span className="text-[11px] font-semibold text-blue-600 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> Live Synchronization
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="bg-white/75 backdrop-blur-xl border border-white/90 rounded-2xl p-5 shadow-sm hover:shadow-md hover:bg-white/90 transition-all group"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-slate-500">
                    {stat.title}
                  </span>
                  <div
                    className={`w-9 h-9 rounded-xl ${stat.accentBg} ${stat.accentColor} border ${stat.borderColor} flex items-center justify-center transition-transform group-hover:scale-105`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                <div className="space-y-1">
                  <p className="text-2xl font-black text-slate-900 tracking-tight">
                    {stat.value}
                  </p>
                  <p className="text-[11px] font-semibold text-slate-600 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600 inline-block"></span>
                    {stat.change}
                  </p>
                  <p className="text-[10px] text-slate-400 font-medium">
                    {stat.subtext}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. Quick Action Section */}
      <div>
        <div className="mb-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Administrative Fast-Actions
          </h2>
          <p className="text-xs text-slate-400">
            Execute critical school operations directly from your workstation.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, idx) => {
            const Icon = action.icon;
            return (
              <button
                key={idx}
                onClick={() => navigate(action.path)}
                className="p-5 bg-white/75 backdrop-blur-xl border border-white/90 rounded-2xl shadow-sm hover:shadow-md hover:bg-white transition-all text-left group flex flex-col justify-between"
              >
                <div>
                  <div
                    className={`w-10 h-10 rounded-xl ${action.color} flex items-center justify-center shadow-md mb-4 transition-transform group-hover:scale-105`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors flex items-center justify-between">
                    {action.title}
                    <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-blue-600" />
                  </h3>
                  <p className="text-[11px] text-slate-500 mt-1 leading-snug">
                    {action.desc}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Operational Feed / Campus Notices Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white/75 backdrop-blur-xl border border-white/90 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-slate-900">
              Recent Institutional Transmittals
            </h3>
            <span className="text-[11px] font-bold text-blue-600 cursor-pointer hover:underline" onClick={() => navigate("/notice")}>
              View All
            </span>
          </div>

          <div className="space-y-3">
            {[
              {
                title: "Mid-Term Examination Schedule Released",
                target: "All Standards (1–12)",
                time: "2 hours ago",
                sender: "Academic Director",
              },
              {
                title: "Annual Sports Day Uniform Advisory",
                target: "Primary & Middle Division",
                time: "Yesterday, 4:15 PM",
                sender: "Sports Committee",
              },
              {
                title: "CBSE Affiliation Compliance Audit Completed",
                target: "Board of Trustees",
                time: "Oct 1, 10:00 AM",
                sender: "Principal Office",
              },
            ].map((notice, i) => (
              <div
                key={i}
                className="p-3.5 rounded-xl bg-slate-50/60 border border-slate-100 flex items-start justify-between gap-4 hover:bg-blue-50/40 transition-colors"
              >
                <div>
                  <h4 className="text-xs font-bold text-slate-900">
                    {notice.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Target: {notice.target} • Authorized: {notice.sender}
                  </p>
                </div>
                <span className="text-[10px] font-medium text-slate-400 flex items-center gap-1 flex-shrink-0">
                  <Clock className="w-3 h-3" /> {notice.time}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick System Integrity Status */}
        <div className="bg-white/75 backdrop-blur-xl border border-white/90 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900 mb-1">
              Backend Synchronization
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Direct connection to Firebase Firestore cluster.
            </p>

            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs py-2 border-b border-slate-100">
                <span className="text-slate-600 font-medium">Firestore Engine</span>
                <span className="font-bold text-emerald-600">Online (Latency 24ms)</span>
              </div>
              <div className="flex items-center justify-between text-xs py-2 border-b border-slate-100">
                <span className="text-slate-600 font-medium">WhatsApp Gateway</span>
                <span className="font-bold text-emerald-600">Ready</span>
              </div>
              <div className="flex items-center justify-between text-xs py-2 border-b border-slate-100">
                <span className="text-slate-600 font-medium">Active Database</span>
                <span className="font-mono text-[11px] text-blue-600 font-semibold">exotica-school</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 mt-4 text-center">
            <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
              Exotica School Cloud Engine v2.4
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}