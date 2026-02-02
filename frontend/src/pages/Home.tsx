import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useI18n } from '../contexts/I18nContext';
import { artistApi, eventApi, type Artist, type Event } from '../services/api';

export default function Home() {
  const { t, tArray, locale } = useI18n();
  const [artists, setArtists] = useState<Artist[]>([]);
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    artistApi.featured().then(setArtists).catch(() => {});
    eventApi.upcoming().then(setEvents).catch(() => {});
  }, []);

  const testimonials = tArray('home.testimonials.items') as { quote: string; name: string; role: string }[];

  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=1920&h=1080&fit=crop"
            alt="Concert hall"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-gray-950/90 via-indigo-950/80 to-gray-950/90" />
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(251,191,36,0.08)_0%,transparent_70%)]" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-amber-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl" />
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-amber-400 via-yellow-200 to-amber-400 bg-clip-text text-transparent">
              {t('home.hero.title1')}
            </span>
            <br />
            <span className="text-white">{t('home.hero.title2')}</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed max-w-2xl mx-auto">
            {t('home.hero.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/artists" className="px-8 py-4 bg-gradient-to-r from-amber-500 to-yellow-500 text-gray-900 font-bold rounded-lg hover:from-amber-400 hover:to-yellow-400 transition-all shadow-lg shadow-amber-500/25">
              {t('home.hero.cta_artists')}
            </Link>
            <Link to="/programs" className="px-8 py-4 border-2 border-amber-500/50 text-amber-400 font-bold rounded-lg hover:bg-amber-500/10 transition-all">
              {t('home.hero.cta_programs')}
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
          <h2 className="text-sm uppercase tracking-widest text-amber-400 mb-4">{t('home.mission.label')}</h2>
          <p className="text-2xl md:text-3xl text-gray-200 leading-relaxed font-light">
            {t('home.mission.text')}
          </p>
        </div>
      </section>

      {/* Impact Numbers */}
      <section className="py-16 px-4 bg-gradient-to-r from-amber-500/5 via-indigo-500/5 to-amber-500/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-sm uppercase tracking-widest text-amber-400 mb-4">{t('home.impact.label')}</h2>
            <h3 className="text-4xl font-bold text-white">{t('home.impact.title')}</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { num: '120+', label: t('home.impact.students') },
              { num: '12', label: t('home.impact.countries') },
              { num: '85+', label: t('home.impact.concerts') },
              { num: '40+', label: t('home.impact.mentors') },
            ].map(stat => (
              <div key={stat.label} className="text-center">
                <p className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-amber-400 to-yellow-300 bg-clip-text text-transparent">{stat.num}</p>
                <p className="text-gray-400 mt-2 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Artists */}
      {artists.length > 0 && (
        <section className="py-24 px-4 bg-gradient-to-b from-transparent via-indigo-950/30 to-transparent">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-sm uppercase tracking-widest text-amber-400 mb-4">{t('home.featured.label')}</h2>
              <h3 className="text-4xl font-bold text-white">{t('home.featured.title')}</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {artists.slice(0, 4).map(artist => (
                <Link to={`/artists/${artist.id}`} key={artist.id} className="group">
                  <div className="bg-gray-900/80 border border-gray-800 rounded-xl overflow-hidden hover:border-amber-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/10">
                    <div className="h-48 overflow-hidden relative">
                      {artist.imageUrl ? (
                        <img src={artist.imageUrl} alt={artist.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-indigo-900 to-purple-900 flex items-center justify-center">
                          <span className="text-5xl opacity-50 group-hover:opacity-80 transition-opacity">🎶</span>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent" />
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
                {t('home.featured.view_all')}
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Testimonials */}
      {testimonials.length > 0 && (
        <section className="py-24 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-sm uppercase tracking-widest text-amber-400 mb-4">{t('home.testimonials.label')}</h2>
              <h3 className="text-4xl font-bold text-white">{t('home.testimonials.title')}</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((item, i) => (
                <div key={i} className="bg-gray-900/60 border border-gray-800 rounded-xl p-8 hover:border-amber-500/30 transition-all">
                  <svg className="w-8 h-8 text-amber-400/40 mb-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                  <p className="text-gray-300 leading-relaxed mb-6 italic">"{item.quote}"</p>
                  <div>
                    <p className="text-white font-semibold">{item.name}</p>
                    <p className="text-amber-400/70 text-sm">{item.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Upcoming Events */}
      {events.length > 0 && (
        <section className="py-24 px-4 bg-gradient-to-b from-transparent via-indigo-950/20 to-transparent">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-sm uppercase tracking-widest text-amber-400 mb-4">{t('home.events.label')}</h2>
              <h3 className="text-4xl font-bold text-white">{t('home.events.title')}</h3>
            </div>
            <div className="space-y-4">
              {events.slice(0, 3).map(event => (
                <div key={event.id} className="bg-gray-900/60 border border-gray-800 rounded-xl overflow-hidden hover:border-amber-500/30 transition-all">
                  <div className="flex flex-col md:flex-row">
                    {event.imageUrl && (
                      <div className="md:w-48 h-32 md:h-auto flex-shrink-0">
                        <img src={event.imageUrl} alt={event.title} className="w-full h-full object-cover" />
                      </div>
                    )}
                    <div className="flex flex-col md:flex-row md:items-center gap-4 p-6 flex-1">
                      <div className="flex-shrink-0 w-20 text-center">
                        <div className="text-amber-400 text-sm font-semibold">
                          {new Date(event.eventDate).toLocaleDateString(locale === 'zh' ? 'zh-CN' : 'en-US', { month: 'short' })}
                        </div>
                        <div className="text-3xl font-bold text-white">
                          {new Date(event.eventDate).getDate()}
                        </div>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-white">{event.title}</h4>
                        <p className="text-gray-400 text-sm mt-1">📍 {event.location}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-12">
              <Link to="/events" className="text-amber-400 hover:text-amber-300 font-medium transition-colors">
                {t('home.events.view_all')}
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-24 px-4">
        <div className="max-w-3xl mx-auto text-center bg-gradient-to-r from-amber-500/10 to-indigo-500/10 border border-amber-500/20 rounded-2xl p-12">
          <h2 className="text-3xl font-bold text-white mb-4">{t('home.cta.title')}</h2>
          <p className="text-gray-300 mb-8">{t('home.cta.text')}</p>
          <Link to="/contact" className="px-8 py-4 bg-gradient-to-r from-amber-500 to-yellow-500 text-gray-900 font-bold rounded-lg hover:from-amber-400 hover:to-yellow-400 transition-all shadow-lg shadow-amber-500/25 inline-block">
            {t('home.cta.button')}
          </Link>
        </div>
      </section>
    </div>
  );
}
