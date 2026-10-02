import React, { useState } from 'react';
import { UploadCloud, FileSpreadsheet, UserPlus, Save, CheckCircle2 } from 'lucide-react';

export default function BulkUpload() {
  const [activeTab, setActiveTab] = useState('bulk'); // 'bulk' અથવા 'direct'
  
  // Bulk Upload માટેના સ્ટેટ
  const [file, setFile] = useState(null);
  const [standard, setStandard] = useState('10');
  const [division, setDivision] = useState('A');

  // Direct Entry માટેના સ્ટેટ
  const [formData, setFormData] = useState({
    name: '', rollNo: '', dob: '', parentName: '', phone: '', std: '10', div: 'A'
  });

  const handleBulkUpload = (e) => {
    e.preventDefault();
    if (!file) return alert('Please select a CSV file first!');
    alert(`File "${file.name}" uploaded successfully for Std ${standard}-${division}!`);
    setFile(null);
  };

  const handleDirectSubmit = (e) => {
    e.preventDefault();
    alert(`Student ${formData.name} registered successfully in Std ${formData.std}-${formData.div}!`);
    setFormData({ name: '', rollNo: '', dob: '', parentName: '', phone: '', std: '10', div: 'A' });
  };

  return (
    <div className="p-6 h-full flex flex-col">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 drop-shadow-sm">Student Registration</h1>

      {/* Tabs (બલ્ક અપલોડ અને ડાયરેક્ટ એન્ટ્રી માટેના બટન) */}
      <div className="flex gap-4 mb-6">
        <button 
          onClick={() => setActiveTab('bulk')}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all shadow-md ${activeTab === 'bulk' ? 'bg-blue-600 text-white' : 'bg-white/60 text-gray-600 hover:bg-white'}`}
        >
          <FileSpreadsheet className="w-5 h-5" /> CSV Bulk Upload
        </button>
        <button 
          onClick={() => setActiveTab('direct')}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all shadow-md ${activeTab === 'direct' ? 'bg-blue-600 text-white' : 'bg-white/60 text-gray-600 hover:bg-white'}`}
        >
          <UserPlus className="w-5 h-5" /> Direct Single Entry
        </button>
      </div>

      {/* મુખ્ય કન્ટેન્ટ એરિયા (Glassmorphism) */}
      <div className="bg-white/40 backdrop-blur-lg border border-white/50 shadow-xl rounded-2xl p-8 max-w-4xl">
        
        {/* ================= TAB 1: Bulk Upload ================= */}
        {activeTab === 'bulk' && (
          <form onSubmit={handleBulkUpload} className="flex flex-col gap-6 animate-fade-in">
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Standard</label>
                <select 
                  value={standard} onChange={(e) => setStandard(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border-none bg-white/70 shadow-inner focus:ring-2 focus:ring-blue-500"
                >
                  <option>10</option>
                  <option>9</option>
                </select>
              </div>
              <div className="flex-1">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Division</label>
                <select 
                  value={division} onChange={(e) => setDivision(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border-none bg-white/70 shadow-inner focus:ring-2 focus:ring-blue-500"
                >
                  <option>A</option>
                  <option>B</option>
                </select>
              </div>
            </div>

            <div className="border-2 border-dashed border-blue-300 bg-blue-50/50 rounded-2xl p-10 flex flex-col items-center justify-center text-center transition-all hover:bg-blue-50">
              <UploadCloud className="w-16 h-16 text-blue-500 mb-4" />
              <p className="text-gray-600 font-medium mb-2">Drag and drop your CSV file here, or click to browse</p>
              <input 
                type="file" 
                accept=".csv"
                onChange={(e) => setFile(e.target.files[0])}
                className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200 cursor-pointer"
              />
              {file && <p className="mt-4 text-green-600 font-bold flex items-center gap-1"><CheckCircle2 className="w-4 h-4"/> {file.name} selected</p>}
            </div>

            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl shadow-lg transition-all transform hover:scale-[1.02]">
              Upload to Database
            </button>
          </form>
        )}

        {/* ================= TAB 2: Direct Entry Form ================= */}
        {activeTab === 'direct' && (
          <form onSubmit={handleDirectSubmit} className="flex flex-col gap-6 animate-fade-in">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Student Full Name</label>
                <input 
                  type="text" required placeholder="e.g. Rahul Patel"
                  value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border-none bg-white/70 shadow-inner focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Roll Number</label>
                <input 
                  type="number" required placeholder="e.g. 101"
                  value={formData.rollNo} onChange={(e) => setFormData({...formData, rollNo: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border-none bg-white/70 shadow-inner focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Date of Birth</label>
                <input 
                  type="date" required
                  value={formData.dob} onChange={(e) => setFormData({...formData, dob: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border-none bg-white/70 shadow-inner focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Standard</label>
                  <select 
                    value={formData.std} onChange={(e) => setFormData({...formData, std: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border-none bg-white/70 shadow-inner focus:ring-2 focus:ring-blue-500"
                  >
                    <option>10</option>
                    <option>9</option>
                  </select>
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Division</label>
                  <select 
                    value={formData.div} onChange={(e) => setFormData({...formData, div: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border-none bg-white/70 shadow-inner focus:ring-2 focus:ring-blue-500"
                  >
                    <option>A</option>
                    <option>B</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Parent/Guardian Name</label>
                <input 
                  type="text" required placeholder="e.g. Ramesh Patel"
                  value={formData.parentName} onChange={(e) => setFormData({...formData, parentName: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border-none bg-white/70 shadow-inner focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Parent WhatsApp No.</label>
                <input 
                  type="tel" required placeholder="+91"
                  value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border-none bg-white/70 shadow-inner focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <button type="submit" className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-xl shadow-lg flex justify-center items-center gap-2 mt-4 transition-all transform hover:scale-[1.02]">
              <Save className="w-5 h-5" /> Save Student Entry
            </button>
          </form>
        )}
        
      </div>
    </div>
  );
}