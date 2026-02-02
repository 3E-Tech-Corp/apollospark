import { Link } from 'react-router-dom';
import type { Artist } from '../services/api';

interface ArtistCardProps {
  artist: Artist;
}

const countryFlags: Record<string, string> = {
  'USA': '🇺🇸',
  'China': '🇨🇳',
};

const instrumentIcons: Record<string, string> = {
  'Piano': '🎹',
  'Violin': '🎻',
  'Cello': '🎻',
  'Flute': '🎵',
  'Erhu': '🎶',
  'Guzheng': '🎶',
};

export default function ArtistCard({ artist }: ArtistCardProps) {
  return (
    <Link
      to={`/artists/${artist.id}`}
      className="group block bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
    >
      {/* Image placeholder */}
      <div className="relative h-64 bg-gradient-to-br from-navy to-navy-light overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-6xl opacity-30">
            {instrumentIcons[artist.instrument] || '🎵'}
          </span>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-navy/80 to-transparent" />
        <div className="absolute bottom-3 left-4 right-4">
          <div className="flex items-center gap-2">
            <span className="text-sm">{countryFlags[artist.country] || '🌍'}</span>
            <span className="text-white/80 text-sm">{artist.country}</span>
          </div>
        </div>
        {artist.featured && (
          <div className="absolute top-3 right-3 px-3 py-1 bg-gold/90 text-navy text-xs font-semibold rounded-full">
            Featured
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-5">
        <h3 className="text-lg font-bold text-navy group-hover:text-gold-dark transition-colors">
          {artist.name}
        </h3>
        <p className="text-sm text-gold-dark font-medium mt-1">{artist.instrument}</p>
        <p className="text-sm text-gray-600 mt-2 line-clamp-2">{artist.bio}</p>
      </div>
    </Link>
  );
}
