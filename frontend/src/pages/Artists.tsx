import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useI18n } from '../contexts/I18nContext';
import { artistApi, type Artist } from '../services/api';

export default function Artists() {
  const { t } = useI18n();
  const [artists, setArtists] = useState<Artist[]>([]);
  const [filter, setFilter] = useState<'all' | 'USA' | 'China'>('all');

  useEffect(() => {
    artistApi.list().then(setArtists).catch(() => {});
  }, []);

  const filtered = filter === 'all' ? artists : artists.filter(a => a.country === filter);

  return (
    <div className="pt-16">
      <section className="relative py-24 px-4 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=1920&h=600&fit=crop"
            alt="Performance"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-gray-950/95 via-indigo-950/85 to-gray-950/95" />
        </div>
        <div className="relative max-w-4xl mx-auto text-center">
          <h2 className="text-sm uppercase tracking-widest text-amber-400 mb-4">{t('artists.hero.label')}</h2>
          <h1 className="text-5xl font-bold text-white mb-6">{t('artists.hero.title')}</h1>
          <p className="text-xl text-gray-300">{t('artists.hero.subtitle')}</p>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Filter */}
          <div className="flex justify-center gap-3 mb-12">
            {([
              { key: 'all' as const, label: t('artists.filter.all') },
              { key: 'USA' as const, label: t('artists.filter.usa') },
              { key: 'China' as const, label: t('artists.filter.china') },
            ]).map(f => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  filter === f.key
                    ? 'bg-amber-500 text-gray-900'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filtered.map(artist => (
              <Link to={`/artists/${artist.id}`} key={artist.id} className="group">
                <div className="bg-gray-900/80 border border-gray-800 rounded-xl overflow-hidden hover:border-amber-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/10 hover:-translate-y-1">
                  <div className="h-64 overflow-hidden relative">
                    {artist.imageUrl ? (
                      <img
                        src={artist.imageUrl}
                        alt={artist.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className={`w-full h-full bg-gradient-to-br ${artist.country === 'China' ? 'from-red-900 to-amber-900' : 'from-blue-900 to-indigo-900'} flex items-center justify-center`}>
                        <span className="text-6xl opacity-40 group-hover:opacity-70 transition-opacity">🎶</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 to-transparent" />
                    {artist.featured && (
                      <span className="absolute top-3 right-3 bg-amber-500 text-gray-900 text-xs font-bold px-2 py-1 rounded-full">{t('artists.featured_badge')}</span>
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
            <p className="text-center text-gray-500 py-12">{t('artists.none')}</p>
          )}
        </div>
      </section>
    </div>
  );
}
