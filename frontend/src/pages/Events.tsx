import { useEffect, useState } from 'react';
import { eventApi, type Event } from '../services/api';

export default function Events() {
  const [events, setEvents] = useState<Event[]>([]);
  const [tab, setTab] = useState<'upcoming' | 'past'>('upcoming');

  useEffect(() => {
    eventApi.list().then(setEvents).catch(() => {});
  }, []);

  const upcoming = events.filter(e => e.isUpcoming);
  const past = events.filter(e => !e.isUpcoming);
  const shown = tab === 'upcoming' ? upcoming : past;

  return (
    <div className="pt-16">
      <section className="py-24 px-4 bg-gradient-to-br from-gray-950 via-indigo-950/40 to-gray-950">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-sm uppercase tracking-widest text-amber-400 mb-4">Events</h2>
          <h1 className="text-5xl font-bold text-white mb-6">Concerts & Performances</h1>
          <p className="text-xl text-gray-300">Experience the beauty of cross-cultural music</p>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex justify-center gap-3 mb-12">
            {(['upcoming', 'past'] as const).map(t => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  tab === t ? 'bg-amber-500 text-gray-900' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {t === 'upcoming' ? `Upcoming (${upcoming.length})` : `Past (${past.length})`}
              </button>
            ))}
          </div>

          <div className="space-y-6">
            {shown.map(event => (
              <div key={event.id} className="bg-gray-900/60 border border-gray-800 rounded-xl overflow-hidden hover:border-amber-500/30 transition-all">
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-48 bg-gradient-to-br from-indigo-900 to-purple-900 flex flex-col items-center justify-center p-6 text-center">
                    <span className="text-amber-400 text-sm font-semibold uppercase">
                      {new Date(event.eventDate).toLocaleDateString('en-US', { month: 'short' })}
                    </span>
                    <span className="text-4xl font-bold text-white">
                      {new Date(event.eventDate).getDate()}
                    </span>
                    <span className="text-gray-400 text-sm">
                      {new Date(event.eventDate).getFullYear()}
                    </span>
                  </div>
                  <div className="flex-1 p-6">
                    <h3 className="text-xl font-semibold text-white mb-2">{event.title}</h3>
                    <p className="text-amber-400/80 text-sm mb-3 flex items-center gap-1">
                      📍 {event.location}
                    </p>
                    <p className="text-gray-400 leading-relaxed">{event.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {shown.length === 0 && (
            <p className="text-center text-gray-500 py-12">
              {tab === 'upcoming' ? 'No upcoming events. Check back soon!' : 'No past events to display.'}
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
