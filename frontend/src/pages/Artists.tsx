import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { artistApi, type Artist } from '../services/api';

const countryColors: Record<string, string> = {
  'China': 'from-red-900 to-amber-900',
  'USA': 'from-blue-900 to-indigo-900',
};

export default function Artists() {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [filter, setFilter] = useState<'all' | 'USA' | 'China'>('all');

  useEffect(() => {
    artistApi.list().then(setArtists).catch(() => {});
  }, []);

  const filtered = filter === 'all' ? artists : artists.filter(a => a.country === filter);

  return (
    <div className="pt-16">
      <section className="py-24 px-4 bg-gradient-to-br from-gray-950 via-indigo-950/40 to-gray-950">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-sm uppercase tracking-widest text-amber-400 mb-4">Our Artists</h2>
          <h1 className="text-5xl font-bold text-white mb-6">Rising Talents</h1>
          <p className="text-xl text-gray-300">Exceptional young musicians from the USA and China</p>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Filter */}
          <div className="flex justify-center gap-3 mb-12">
            {(['all', 'USA', 'China'] as const).map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  filter === f
                    ? 'bg-amber-500 text-gray-900'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {f === 'all' ? 'All Artists' : f}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map(artist => (
              <Link to={`/artists/${artist.id}`} key={artist.id} className="group">
                <div className="bg-gray-900/80 border border-gray-800 rounded-xl overflow-hidden hover:border-amber-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/10 hover:-translate-y-1">
                  <div className={`h-56 bg-gradient-to-br ${countryColors[artist.country] || 'from-gray-800 to-gray-700'} flex items-center justify-center relative`}>
                    <span className="text-6xl opacity-40 group-hover:opacity-70 transition-opacity">🎶</span>
                    {artist.featured && (
                      <span className="absolute top-3 right-3 bg-amber-500 text-gray-900 text-xs font-bold px-2 py-1 rounded-full">Featured</span>
                    )}
                    <span className="absolute bottom-3 left-3 bg-black/50 text-white text-xs px-2 py-1 rounded">{artist.country}</span>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-white group-hover:text-amber-400 transition-colors">{artist.name}</h3>
                    <p className="text-amber-400/80 text-sm mt-1">{artist.instrument}</p>
                    <p className="text-gray-400 text-sm mt-3 line-clamp-2">{artist.bio}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="text-center text-gray-500 py-12">No artists found.</p>
          )}
        </div>
      </section>
    </div>
  );
}
