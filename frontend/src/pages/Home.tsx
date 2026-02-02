import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { artistApi, eventApi, type Artist, type Event } from '../services/api';

export default function Home() {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    artistApi.featured().then(setArtists).catch(() => {});
    eventApi.upcoming().then(setEvents).catch(() => {});
  }, []);

  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-indigo-950 to-gray-950" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(251,191,36,0.08)_0%,transparent_70%)]" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-amber-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl" />
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <div className="text-6xl mb-6">🎵</div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-amber-400 via-yellow-200 to-amber-400 bg-clip-text text-transparent">
              Where Music
            </span>
            <br />
            <span className="text-white">Bridges Cultures</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed max-w-2xl mx-auto">
            Nurturing young rising talents and fostering cultural exchange in the musical arts between the USA and China.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/artists" className="px-8 py-4 bg-gradient-to-r from-amber-500 to-yellow-500 text-gray-900 font-bold rounded-lg hover:from-amber-400 hover:to-yellow-400 transition-all shadow-lg shadow-amber-500/25">
              Discover Our Artists
            </Link>
            <Link to="/programs" className="px-8 py-4 border-2 border-amber-500/50 text-amber-400 font-bold rounded-lg hover:bg-amber-500/10 transition-all">
              Our Programs
            </Link>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-amber-400/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Mission */}
      <section className="py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-sm uppercase tracking-widest text-amber-400 mb-4">Our Mission</h2>
          <p className="text-2xl md:text-3xl text-gray-200 leading-relaxed font-light">
            ApolloSpark discovers, nurtures, and elevates young musical talents — providing world-class mentoring, performance exposure, and touring opportunities across the USA and China.
          </p>
        </div>
      </section>

      {/* Featured Artists */}
      {artists.length > 0 && (
        <section className="py-24 px-4 bg-gradient-to-b from-transparent via-indigo-950/30 to-transparent">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-sm uppercase tracking-widest text-amber-400 mb-4">Featured Artists</h2>
              <h3 className="text-4xl font-bold text-white">Rising Stars</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {artists.slice(0, 4).map(artist => (
                <Link to={`/artists/${artist.id}`} key={artist.id} className="group">
                  <div className="bg-gray-900/80 border border-gray-800 rounded-xl overflow-hidden hover:border-amber-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/10">
                    <div className="h-48 bg-gradient-to-br from-indigo-900 to-purple-900 flex items-center justify-center">
                      <span className="text-5xl opacity-50 group-hover:opacity-80 transition-opacity">🎶</span>
                    </div>
                    <div className="p-5">
                      <h4 className="text-lg font-semibold text-white group-hover:text-amber-400 transition-colors">{artist.name}</h4>
                      <p className="text-amber-400/80 text-sm">{artist.instrument}</p>
                      <p className="text-gray-500 text-sm mt-1">{artist.country}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            <div className="text-center mt-12">
              <Link to="/artists" className="text-amber-400 hover:text-amber-300 font-medium transition-colors">
                View All Artists →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Upcoming Events */}
      {events.length > 0 && (
        <section className="py-24 px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-sm uppercase tracking-widest text-amber-400 mb-4">Upcoming Events</h2>
              <h3 className="text-4xl font-bold text-white">Join Us</h3>
            </div>
            <div className="space-y-4">
              {events.slice(0, 3).map(event => (
                <div key={event.id} className="bg-gray-900/60 border border-gray-800 rounded-xl p-6 hover:border-amber-500/30 transition-all">
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    <div className="flex-shrink-0 w-20 text-center">
                      <div className="text-amber-400 text-sm font-semibold">
                        {new Date(event.eventDate).toLocaleDateString('en-US', { month: 'short' })}
                      </div>
                      <div className="text-3xl font-bold text-white">
                        {new Date(event.eventDate).getDate()}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-white">{event.title}</h4>
                      <p className="text-gray-400 text-sm mt-1">{event.location}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-12">
              <Link to="/events" className="text-amber-400 hover:text-amber-300 font-medium transition-colors">
                View All Events →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-24 px-4">
        <div className="max-w-3xl mx-auto text-center bg-gradient-to-r from-amber-500/10 to-indigo-500/10 border border-amber-500/20 rounded-2xl p-12">
          <h2 className="text-3xl font-bold text-white mb-4">Be Part of the Journey</h2>
          <p className="text-gray-300 mb-8">Whether you're a young musician, a supporter, or a music lover — there's a place for you at ApolloSpark.</p>
          <Link to="/contact" className="px-8 py-4 bg-gradient-to-r from-amber-500 to-yellow-500 text-gray-900 font-bold rounded-lg hover:from-amber-400 hover:to-yellow-400 transition-all shadow-lg shadow-amber-500/25 inline-block">
            Get in Touch
          </Link>
        </div>
      </section>
    </div>
  );
}
