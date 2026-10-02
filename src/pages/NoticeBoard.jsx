import React, { useState } from 'react';
import { Bell, Send, Megaphone, Clock, Trash2, Users, CheckCircle2 } from 'lucide-react';

const initialNotices = [
  { id: 1, title: 'Diwali Vacation Announcement', audience: 'All Students & Parents', date: '01/10/2026', time: '10:00 AM', status: 'Delivered' },
  { id: 2, title: 'Term 1 Exam Timetable', audience: 'Standard 10', date: '25/09/2026', time: '02:30 PM', status: 'Delivered' },
];

export default function NoticeBoard() {
  const [notices, setNotices] = useState(initialNotices);
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [audience, setAudience] = useState('All Students & Parents');
  const [sendWhatsApp, setSendWhatsApp] = useState(true);

  const handleSendNotice = (e) => {
    e.preventDefault();
    
    const newNotice = {
      id: Date.now(),
      title,
      audience,
      date: new Date().toLocaleDateString('en-IN'),
      time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
      status: 'Sent'
    };

    setNotices([newNotice, ...notices]);
    setTitle('');
    setMessage('');
    
    let alertMsg = `Notice "${title}" Broadcasted Successfully to ${audience}!`;
    if(sendWhatsApp) alertMsg += '\n✅ WhatsApp Alerts have been triggered.';
    alert(alertMsg);
  };

  const handleDelete = (id) => {
    setNotices(notices.filter(n => n.id !== id));
  };

  return (
    <div className="p-6 h-full flex flex-col">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 drop-shadow-sm flex items-center gap-3">
        <Megaphone className="w-8 h-8 text-purple-600" /> Notice Board & Broadcast
      </h1>

      <div className="flex flex-col lg:flex-row gap-6 flex-1 overflow-hidden">
        
        {/* Left Side: Compose Notice */}
        <div className="lg:w-1/2 flex flex-col">
          <div className="bg-white/40 backdrop-blur-lg border border-white/50 shadow-xl rounded-2xl p-6 flex-1 flex flex-col">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Bell className="w-5 h-5 text-blue-600" /> Compose New Notice
            </h2>
            
            <form onSubmit={handleSendNotice} className="flex flex-col gap-5 flex-1">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Notice Title</label>
                <input 
                  type="text" required placeholder="e.g. Tomorrow is a holiday"
                  value={title} onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border-none bg-white/70 shadow-inner focus:ring-2 focus:ring-purple-500 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Select Audience</label>
                <div className="relative">
                  <Users className="absolute left-3 top-3.5 text-gray-500 w-5 h-5" />
                  <select 
                    value={audience} onChange={(e) => setAudience(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border-none bg-white/70 shadow-inner focus:ring-2 focus:ring-purple-500 font-medium text-gray-700 appearance-none"
                  >
                    <option>All Students & Parents</option>
                    <option>Only Parents</option>
                    <option>Standard 10 Students</option>
                    <option>Standard 9 Students</option>
                    <option>Staff & Teachers Only</option>
                  </select>
                </div>
              </div>

              <div className="flex-1 flex flex-col">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Message Body</label>
                <textarea 
                  required placeholder="Type your detailed notice here..."
                  value={message} onChange={(e) => setMessage(e.target.value)}
                  className="w-full flex-1 p-4 rounded-xl border-none bg-white/70 shadow-inner focus:ring-2 focus:ring-purple-500 transition-all resize-none min-h-[150px]"
                ></textarea>
              </div>

              <div className="flex items-center gap-3 bg-green-50 p-3 rounded-xl border border-green-200 mt-2">
                <input 
                  type="checkbox" id="whatsapp"
                  checked={sendWhatsApp} onChange={(e) => setSendWhatsApp(e.target.checked)}
                  className="w-5 h-5 rounded text-green-600 focus:ring-green-500 border-green-300 cursor-pointer"
                />
                <label htmlFor="whatsapp" className="font-bold text-green-800 cursor-pointer text-sm">
                  Send Instant WhatsApp Push Notification
                </label>
              </div>

              <button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3.5 px-6 rounded-xl shadow-lg flex justify-center items-center gap-2 mt-2 transition-all transform hover:scale-[1.02]">
                <Send className="w-5 h-5" /> Broadcast Notice
              </button>
            </form>
          </div>
        </div>

        {/* Right Side: Notice History */}
        <div className="lg:w-1/2 flex flex-col">
          <div className="bg-white/40 backdrop-blur-lg border border-white/50 shadow-xl rounded-2xl flex-1 flex flex-col overflow-hidden">
            <div className="p-6 border-b border-gray-200/50 bg-white/30">
              <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <Clock className="w-5 h-5 text-purple-600" /> Recent Broadcasts
              </h2>
            </div>
            
            <div className="p-4 overflow-y-auto flex-1 flex flex-col gap-4">
              {notices.map((notice) => (
                <div key={notice.id} className="bg-white/60 p-4 rounded-xl shadow-sm border border-white hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-gray-800 text-lg">{notice.title}</h3>
                    <button onClick={() => handleDelete(notice.id)} className="text-gray-400 hover:text-red-500 transition-colors p-1" title="Delete">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 text-sm font-semibold text-gray-600 mb-3">
                    <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-md flex items-center gap-1">
                      <Users className="w-3 h-3" /> {notice.audience}
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-xs text-gray-500 pt-3 border-t border-gray-200">
                    <span>{notice.date} at {notice.time}</span>
                    <span className="flex items-center gap-1 text-green-600 font-bold">
                      <CheckCircle2 className="w-4 h-4" /> {notice.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
}