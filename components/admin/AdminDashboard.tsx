
import React, { useState } from 'react';

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'USERS' | 'PRODUCTS' | 'STATS' | 'REPORTS'>('STATS');
  const [users, setUsers] = useState([
    { id: '1', email: 'jane@lumeskin.com', role: 'Patient', status: 'Active' },
    { id: '2', email: 'dr.smith@lumeskin.com', role: 'Doctor', status: 'Pending Approval' },
    { id: '3', email: 'staff1@lumeskin.com', role: 'Staff', status: 'Active' }
  ]);

  const handleDeleteUser = (id: string) => {
    if(confirm('Are you sure you want to remove this user?')) {
      setUsers(users.filter(u => u.id !== id));
    }
  };

  const handleApprove = (id: string) => {
    setUsers(users.map(u => u.id === id ? {...u, status: 'Active'} : u));
    alert('Dermatologist approved successfully!');
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-20">
      <header>
        <h2 className="text-2xl font-bold text-gray-800">Admin Control</h2>
        <p className="text-gray-500 text-sm">Manage platform operations and users</p>
      </header>

      <div className="flex bg-white p-1 rounded-2xl border border-pink-100 shadow-sm overflow-x-auto">
        {(['STATS', 'USERS', 'PRODUCTS', 'REPORTS'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 min-w-[80px] py-2 text-[10px] font-bold rounded-xl transition-all ${activeTab === tab ? 'bg-pink-400 text-white shadow-md' : 'text-gray-400 hover:text-pink-300'}`}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === 'STATS' && (
        <div className="space-y-4">
          <div className="bg-white p-6 rounded-3xl border border-pink-100 shadow-sm">
            <h4 className="font-bold text-gray-800 mb-4 flex items-center">
              <i className="fas fa-chart-line mr-2 text-pink-400"></i> Platform Health
            </h4>
            <div className="space-y-4">
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-bold text-gray-500">
                  <span>Server Performance</span>
                  <span>98%</span>
                </div>
                <div className="w-full bg-pink-50 h-2 rounded-full"><div className="bg-green-400 h-full w-[98%] rounded-full"></div></div>
              </div>
              <button onClick={() => alert('Detailed system log downloaded.')} className="w-full py-2 bg-pink-50 text-pink-500 rounded-xl text-xs font-bold">Download Performance Report</button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
             <div onClick={() => setActiveTab('REPORTS')} className="bg-orange-50 p-4 rounded-3xl border border-orange-100 text-center cursor-pointer">
               <p className="text-xl font-bold text-orange-600">4</p>
               <p className="text-[10px] font-bold text-orange-400 uppercase">Complaints</p>
             </div>
             <div onClick={() => setActiveTab('USERS')} className="bg-pink-50 p-4 rounded-3xl border border-pink-100 text-center cursor-pointer">
               <p className="text-xl font-bold text-pink-600">12</p>
               <p className="text-[10px] font-bold text-pink-400 uppercase">New Signups</p>
             </div>
          </div>
        </div>
      )}

      {activeTab === 'USERS' && (
        <div className="space-y-3">
           <h4 className="font-bold text-gray-700 text-sm px-1">User Management</h4>
           {users.map(u => (
             <div key={u.id} className="bg-white p-4 rounded-2xl border border-pink-100 flex items-center justify-between shadow-sm">
               <div>
                 <p className="font-bold text-gray-800 text-sm">{u.email}</p>
                 <p className="text-[10px] text-gray-400 font-bold">{u.role} • <span className={u.status === 'Active' ? 'text-green-500' : 'text-orange-500'}>{u.status}</span></p>
               </div>
               <div className="flex space-x-2">
                 {u.status === 'Pending Approval' && (
                   <button onClick={() => handleApprove(u.id)} className="p-2 bg-green-100 text-green-600 rounded-lg text-xs"><i className="fas fa-check"></i></button>
                 )}
                 <button onClick={() => handleDeleteUser(u.id)} className="p-2 bg-red-50 text-red-400 rounded-lg text-xs"><i className="fas fa-trash"></i></button>
               </div>
             </div>
           ))}
        </div>
      )}

      {activeTab === 'PRODUCTS' && (
        <div className="space-y-4">
          <button onClick={() => alert('Add product modal would open here')} className="w-full py-3 bg-pink-400 text-white rounded-2xl font-bold text-sm shadow-md flex items-center justify-center space-x-2">
            <i className="fas fa-plus"></i>
            <span>Add New Product</span>
          </button>
          {[1,2,3].map(i => (
            <div key={i} className="bg-white p-4 rounded-2xl border border-pink-100 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-pink-50 rounded-xl flex items-center justify-center text-pink-300">
                  <i className="fas fa-box"></i>
                </div>
                <div>
                  <p className="font-bold text-gray-800 text-sm">Serum Alpha {i}</p>
                  <p className="text-xs text-pink-400">$35.00 • 20 Units</p>
                </div>
              </div>
              <button onClick={() => alert('Edit product')} className="p-2 text-gray-400 hover:text-pink-500"><i className="fas fa-edit"></i></button>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'REPORTS' && (
        <div className="space-y-3">
          <div className="bg-white p-4 rounded-2xl border border-l-4 border-l-orange-400 border-pink-100">
            <p className="text-xs font-bold text-orange-600 mb-1">COMPLAINT #902</p>
            <p className="text-sm font-semibold">User reported a delay in skin analysis result.</p>
            <button onClick={() => alert('Report marked as handled')} className="mt-3 text-[10px] font-bold bg-gray-100 px-3 py-1 rounded-full">Mark Resolved</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
