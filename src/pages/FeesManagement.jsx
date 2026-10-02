import React, { useState } from 'react';
import { Search, Printer, Banknote, X, CheckCircle2 } from 'lucide-react';

// ટેસ્ટિંગ માટેનો ડમી ડેટા (પછીથી આ ફાયરબેઝમાંથી આવશે)
const initialStudents = [
  { id: 1, name: 'Rahul Patel', rollNo: '101', standard: '10', division: 'A', totalFee: 25000, paid: 15000 },
  { id: 2, name: 'Priya Shah', rollNo: '102', standard: '10', division: 'A', totalFee: 25000, paid: 25000 },
  { id: 3, name: 'Amit Desai', rollNo: '103', standard: '10', division: 'A', totalFee: 25000, paid: 5000 },
];

export default function FeesManagement() {
  const [students] = useState(initialStudents);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  
  // પેમેન્ટ માટેના સ્ટેટ
  const [amount, setAmount] = useState('');
  const [payMode, setPayMode] = useState('Cash');
  const [receiptData, setReceiptData] = useState(null);

  const openModal = (student) => {
    setSelectedStudent(student);
    setIsModalOpen(true);
  };

  const handlePayment = (e) => {
    e.preventDefault();
    // રસીદ માટેનો ડેટા સેટ કરો
    setReceiptData({
      ...selectedStudent,
      paidAmount: amount,
      mode: payMode,
      date: new Date().toLocaleDateString('en-IN'),
      receiptNo: `EXO-${Math.floor(Math.random() * 10000)}`
    });
    
    setIsModalOpen(false);
    setAmount('');
    
    // પેમેન્ટ થયા પછી તરત જ પ્રિન્ટ ડાયલોગ ખોલો
    setTimeout(() => {
      window.print();
    }, 500);
  };

  return (
    <div className="p-6 h-full relative">
      {/* ================= સ્ક્રીન UI (પ્રિન્ટ વખતે છુપાઈ જશે) ================= */}
      <div className="print:hidden h-full flex flex-col">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 drop-shadow-sm">Fees & Dues Management</h1>

        {/* સર્ચ અને ફિલ્ટર (Glassmorphism) */}
        <div className="bg-white/40 backdrop-blur-lg border border-white/50 shadow-xl rounded-2xl p-4 mb-6 flex flex-wrap gap-4 items-center">
          <div className="relative flex-1 min-w-[250px]">
            <Search className="absolute left-3 top-3 text-gray-500 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Search by Student Name or Roll No..." 
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border-none bg-white/60 focus:bg-white focus:ring-2 focus:ring-blue-500 transition-all shadow-inner"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select className="px-4 py-2.5 rounded-xl border-none bg-white/60 shadow-inner focus:ring-2 focus:ring-blue-500 font-medium text-gray-700">
            <option>Std 10</option>
            <option>Std 9</option>
          </select>
          <select className="px-4 py-2.5 rounded-xl border-none bg-white/60 shadow-inner focus:ring-2 focus:ring-blue-500 font-medium text-gray-700">
            <option>Div A</option>
            <option>Div B</option>
          </select>
        </div>

        {/* ડેટા ટેબલ (Glassmorphism) */}
        <div className="bg-white/40 backdrop-blur-lg border border-white/50 shadow-xl rounded-2xl flex-1 overflow-hidden flex flex-col">
          <div className="overflow-y-auto p-4">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-gray-600 border-b border-gray-300/50">
                  <th className="pb-3 pl-2 font-semibold">Roll No</th>
                  <th className="pb-3 font-semibold">Student Name</th>
                  <th className="pb-3 font-semibold">Total Fee</th>
                  <th className="pb-3 font-semibold text-green-600">Paid</th>
                  <th className="pb-3 font-semibold text-red-500">Pending</th>
                  <th className="pb-3 font-semibold text-right pr-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {students.map((s) => (
                  <tr key={s.id} className="border-b border-gray-200/50 hover:bg-white/50 transition-colors">
                    <td className="py-4 pl-2 font-medium text-gray-700">{s.rollNo}</td>
                    <td className="py-4 font-bold text-gray-800">{s.name}</td>
                    <td className="py-4 text-gray-600">₹{s.totalFee.toLocaleString()}</td>
                    <td className="py-4 text-green-600 font-semibold">₹{s.paid.toLocaleString()}</td>
                    <td className="py-4 text-red-500 font-semibold">₹{(s.totalFee - s.paid).toLocaleString()}</td>
                    <td className="py-4 text-right pr-2">
                      {(s.totalFee - s.paid) > 0 ? (
                        <button 
                          onClick={() => openModal(s)}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-md flex items-center justify-end ml-auto gap-2 transition-all"
                        >
                          <Banknote className="w-4 h-4" /> Collect Fee
                        </button>
                      ) : (
                        <span className="text-green-600 font-bold flex items-center justify-end gap-1">
                          <CheckCircle2 className="w-5 h-5" /> Fully Paid
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ================= મોડલ (Modal) પેમેન્ટ માટે ================= */}
      {isModalOpen && selectedStudent && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center print:hidden">
          <div className="bg-white/90 backdrop-blur-xl border border-white shadow-2xl p-6 rounded-2xl w-[400px]">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">Collect Fee</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-red-500"><X /></button>
            </div>
            <div className="mb-4 p-3 bg-blue-50 rounded-xl">
              <p className="font-bold text-blue-900">{selectedStudent.name}</p>
              <p className="text-sm text-blue-700">Pending Amount: ₹{(selectedStudent.totalFee - selectedStudent.paid).toLocaleString()}</p>
            </div>
            
            <form onSubmit={handlePayment} className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-1">Paying Amount (₹)</label>
                <input 
                  type="number" 
                  required
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter amount"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-1">Payment Mode</label>
                <select 
                  value={payMode}
                  onChange={(e) => setPayMode(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                >
                  <option>Cash</option>
                  <option>UPI / QR</option>
                  <option>Bank Transfer</option>
                  <option>Cheque</option>
                </select>
              </div>
              <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-xl mt-2 shadow-lg flex justify-center items-center gap-2">
                <Printer className="w-5 h-5" /> Save & Print Receipt
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ================= પ્રિન્ટ UI (માત્ર કાગળ પર દેખાશે) ================= */}
      {receiptData && (
        <div className="hidden print:block absolute top-0 left-0 w-full h-full bg-white text-black p-8">
          <div className="max-w-2xl mx-auto border-2 border-gray-800 p-8">
            {/* Header */}
            <div className="text-center border-b-2 border-gray-800 pb-6 mb-6">
              <h1 className="text-4xl font-extrabold tracking-wider uppercase">Exotica School</h1>
              <p className="text-lg italic mt-1 font-semibold">"एकझोटीका है, तो सब कुछ मुमकिन है।"</p>
              <p className="text-sm mt-2 text-gray-700">Administrative Headquarters, Gujarat</p>
            </div>
            
            <h2 className="text-2xl font-bold text-center mb-6 underline">FEE RECEIPT</h2>

            {/* Details */}
            <div className="grid grid-cols-2 gap-y-4 mb-8 text-lg">
              <p><span className="font-semibold">Receipt No:</span> {receiptData.receiptNo}</p>
              <p className="text-right"><span className="font-semibold">Date:</span> {receiptData.date}</p>
              <p className="col-span-2"><span className="font-semibold">Student Name:</span> {receiptData.name}</p>
              <p><span className="font-semibold">Standard:</span> {receiptData.standard}</p>
              <p className="text-right"><span className="font-semibold">Division:</span> {receiptData.division}</p>
            </div>

            {/* Amount Section */}
            <div className="border-t-2 border-b-2 border-gray-400 py-4 mb-16 text-xl">
              <p className="flex justify-between font-bold">
                <span>Amount Paid:</span>
                <span>₹ {Number(receiptData.paidAmount).toLocaleString()}</span>
              </p>
              <p className="flex justify-between text-lg mt-2 text-gray-700">
                <span>Payment Mode:</span>
                <span>{receiptData.mode}</span>
              </p>
            </div>

            {/* Signatures */}
            <div className="flex justify-between mt-20 pt-8 border-t border-gray-300">
              <div className="text-center">
                <div className="w-32 border-b border-gray-800 mb-2"></div>
                <p className="font-semibold">Parent's Signature</p>
              </div>
              <div className="text-center">
                <div className="w-32 border-b border-gray-800 mb-2"></div>
                <p className="font-semibold">Authorized Signatory</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}