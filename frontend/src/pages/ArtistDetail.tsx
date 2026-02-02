import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useI18n } from '../contexts/I18nContext';
import { artistApi, type Artist } from '../services/api';

export default function ArtistDetail() {
  const { t } = useI18n();
  const { id } = useParams();
  const [artist, setArtist] = useState<Artist | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      artistApi.get(Number(id)).then(setArtist).catch(() => {}).finally(() => setLoading(false));
    }
  }, [id]);

  if (loading) return <div className="pt-32 text-center text-gray-400">Loading...</div>;
  if (!artist) return <div className="pt-32 text-center text-gray-400">Artist not found</div>;

  return (
    <div className="pt-16">
      <section className="py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <Link to="/artists" className="text-amber-400 hover:text-amber-300 text-sm mb-8 inline-block">{t('artist_detail.back')}</Link>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className="rounded-2xl overflow-hidden aspect-square border border-gray-700/30">
              {artist.imageUrl ? (
                <img src={artist.imageUrl} alt={artist.name} className="w-full h-full object-cover" />
              ) : (
                <div className={`w-full h-full bg-gradient-to-br ${artist.country === 'China' ? 'from-red-900 to-amber-900' : 'from-blue-900 to-indigo-900'} flex items-center justify-center`}>
                  <span className="text-9xl opacity-40">🎶</span>
                </div>
              )}
            </div>
            <div>
              <div className="flex items-center gap-3 mb-2">
                {artist.featured && <span className="bg-amber-500 text-gray-900 text-xs font-bold px-2 py-1 rounded-full">{t('artist_detail.featured')}</span>}
                <span className="bg-gray-800 text-gray-300 text-xs px-2 py-1 rounded">{artist.country}</span>
              </div>
              <h1 className="text-5xl font-bold text-white mb-2">{artist.name}</h1>
              <p className="text-xl text-amber-400 mb-8">{artist.instrument}</p>
              <p className="text-gray-300 leading-relaxed text-lg">{artist.bio}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
