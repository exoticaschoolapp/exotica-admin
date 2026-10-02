import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import BulkUpload from './pages/BulkUpload';
import FeesManagement from './pages/FeesManagement';
import Attendance from './pages/Attendance';
import MarksExams from './pages/MarksExams';
import NoticeBoard from './pages/NoticeBoard';
import StaffPayroll from './pages/StaffPayroll';
import Homework from './pages/Homework';
function App() {
  return (
    <Router>
      <div className="flex h-screen bg-gray-50 text-gray-800 font-sans">
        
        {/* પ્રિન્ટ વખતે સાઇડબાર છુપાવવા માટે print:hidden ઉમેર્યું */}
        <div className="print:hidden">
          <Sidebar />
        </div>
        
        {/* પ્રિન્ટ વખતે સાઇડબારની ખાલી જગ્યા (margin) કાઢવા માટે print:ml-0 ઉમેર્યું */}
        <div className="flex-1 overflow-y-auto ml-64 print:ml-0">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/students" element={<BulkUpload />} />
            <Route path="/fees" element={<FeesManagement />} />
            <Route path="/attendance" element={<Attendance />} />
            <Route path="/marks" element={<MarksExams />} />
            <Route path="/notice" element={<NoticeBoard />} />
            <Route path="/staff" element={<StaffPayroll />} />
            <Route path="/homework" element={<Homework />} />
          </Routes>
        </div>
        
      </div>
    </Router>
  );
}

export default App;