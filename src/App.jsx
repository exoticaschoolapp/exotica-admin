import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import BulkUpload from './pages/BulkUpload';
import StudentList from './pages/StudentList';
import FeesManagement from './pages/FeesManagement';
import Attendance from './pages/Attendance';
import MarksExams from './pages/MarksExams';
import Homework from './pages/Homework';
import NoticeBoard from './pages/NoticeBoard';
import StaffPayroll from './pages/StaffPayroll';

export default function App() {
  return (
    <Router>
      <div className="flex h-screen bg-gray-100 overflow-hidden">
        <Sidebar />
        <main className="flex-1 h-screen overflow-y-auto p-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/bulk-upload" element={<BulkUpload />} />
            <Route path="/student-list" element={<StudentList />} />
            <Route path="/fees" element={<FeesManagement />} />
            <Route path="/attendance" element={<Attendance />} />
            <Route path="/marks" element={<MarksExams />} />
            <Route path="/homework" element={<Homework />} />
            <Route path="/notice-board" element={<NoticeBoard />} />
            <Route path="/staff-payroll" element={<StaffPayroll />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}