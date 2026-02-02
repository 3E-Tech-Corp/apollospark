import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { contactApi, type ContactMessage } from '../services/api';

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const [messages, setMessages] = useState<ContactMessage[]>([]);

  useEffect(() => {
    contactApi.list().then(setMessages).catch(() => {});
  }, []);

  const unread = messages.filter(m => !m.isRead).length;

  const markRead = async (id: number) => {
    await contactApi.markRead(id);
    setMessages(msgs => msgs.map(m => m.id === id ? { ...m, isRead: true } : m));
  };

  const deleteMsg = async (id: number) => {
    await contactApi.delete(id);
    setMessages(msgs => msgs.filter(m => m.id !== id));
  };

  return (
    <div className="pt-16">
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
              <p className="text-gray-400 mt-1">Welcome, {user?.username}</p>
            </div>
            <button onClick={logout} className="px-4 py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors text-sm">
              Logout
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-gray-900/60 border border-gray-800 rounded-xl p-6">
              <p className="text-gray-400 text-sm">Total Messages</p>
              <p className="text-3xl font-bold text-white mt-1">{messages.length}</p>
            </div>
            <div className="bg-gray-900/60 border border-amber-500/30 rounded-xl p-6">
              <p className="text-amber-400 text-sm">Unread</p>
              <p className="text-3xl font-bold text-amber-400 mt-1">{unread}</p>
            </div>
            <div className="bg-gray-900/60 border border-gray-800 rounded-xl p-6">
              <p className="text-gray-400 text-sm">Read</p>
              <p className="text-3xl font-bold text-white mt-1">{messages.length - unread}</p>
            </div>
          </div>

          {/* Messages */}
          <h2 className="text-xl font-semibold text-white mb-4">Contact Messages</h2>
          <div className="space-y-3">
            {messages.map(msg => (
              <div key={msg.id} className={`bg-gray-900/60 border rounded-xl p-5 ${msg.isRead ? 'border-gray-800' : 'border-amber-500/40'}`}>
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      {!msg.isRead && <span className="w-2 h-2 rounded-full bg-amber-400" />}
                      <h3 className="font-semibold text-white">{msg.name}</h3>
                      <span className="text-gray-500 text-sm">({msg.email})</span>
                    </div>
                    {msg.subject && <p className="text-amber-400/80 text-sm mb-1">{msg.subject}</p>}
                    <p className="text-gray-400 text-sm">{msg.message}</p>
                    <p className="text-gray-600 text-xs mt-2">{new Date(msg.createdAt).toLocaleString()}</p>
                  </div>
                  <div className="flex gap-2">
                    {!msg.isRead && (
                      <button onClick={() => markRead(msg.id)} className="px-3 py-1 bg-amber-500/20 text-amber-400 rounded text-xs hover:bg-amber-500/30">
                        Mark Read
                      </button>
                    )}
                    <button onClick={() => deleteMsg(msg.id)} className="px-3 py-1 bg-red-500/20 text-red-400 rounded text-xs hover:bg-red-500/30">
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
            {messages.length === 0 && (
              <p className="text-center text-gray-500 py-8">No contact messages yet.</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
