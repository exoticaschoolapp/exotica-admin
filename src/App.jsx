import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import BulkUpload from './pages/BulkUpload';
import StudentList from './pages/StudentList';

export default function App() {
  return (
    <Router>
      <div className="flex h-screen bg-gray-100 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/bulk-upload" element={<BulkUpload />} />
            <Route path="/student-list" element={<StudentList />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}