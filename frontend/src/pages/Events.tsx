import { useEffect, useState } from 'react';
import { useI18n } from '../contexts/I18nContext';
import { eventApi, type Event } from '../services/api';

export default function Events() {
  const { t, locale } = useI18n();
  const [events, setEvents] = useState<Event[]>([]);
  const [tab, setTab] = useState<'upcoming' | 'past'>('upcoming');

  useEffect(() => {
    eventApi.list().then(setEvents).catch(() => {});
  }, []);

  const upcoming = events.filter(e => e.isUpcoming);
  const past = events.filter(e => !e.isUpcoming);
  const shown = tab === 'upcoming' ? upcoming : past;
  const dateLocale = locale === 'zh' ? 'zh-CN' : 'en-US';

  return (
    <div className="pt-16">
      <section className="relative py-24 px-4 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=1920&h=600&fit=crop"
            alt="Concert stage"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-gray-950/95 via-indigo-950/85 to-gray-950/95" />
        </div>
        <div className="relative max-w-4xl mx-auto text-center">
          <h2 className="text-sm uppercase tracking-widest text-amber-400 mb-4">{t('events.hero.label')}</h2>
          <h1 className="text-5xl font-bold text-white mb-6">{t('events.hero.title')}</h1>
          <p className="text-xl text-gray-300">{t('events.hero.subtitle')}</p>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex justify-center gap-3 mb-12">
            {(['upcoming', 'past'] as const).map(tKey => (
              <button
                key={tKey}
                onClick={() => setTab(tKey)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  tab === tKey ? 'bg-amber-500 text-gray-900' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {t(`events.tab.${tKey}`)} ({tKey === 'upcoming' ? upcoming.length : past.length})
              </button>
            ))}
          </div>

          <div className="space-y-6">
            {shown.map(event => (
              <div key={event.id} className="bg-gray-900/60 border border-gray-800 rounded-xl overflow-hidden hover:border-amber-500/30 transition-all">
                <div className="flex flex-col md:flex-row">
                  {event.imageUrl ? (
                    <div className="md:w-56 h-40 md:h-auto flex-shrink-0">
                      <img src={event.imageUrl} alt={event.title} className="w-full h-full object-cover" />
                    </div>
                  ) : (
                    <div className="md:w-48 bg-gradient-to-br from-indigo-900 to-purple-900 flex flex-col items-center justify-center p-6 text-center">
                      <span className="text-amber-400 text-sm font-semibold uppercase">
                        {new Date(event.eventDate).toLocaleDateString(dateLocale, { month: 'short' })}
                      </span>
                      <span className="text-4xl font-bold text-white">
                        {new Date(event.eventDate).getDate()}
                      </span>
                      <span className="text-gray-400 text-sm">
                        {new Date(event.eventDate).getFullYear()}
                      </span>
                    </div>
                  )}
                  <div className="flex-1 p-6">
                    <div className="flex items-start gap-4">
                      {event.imageUrl && (
                        <div className="flex-shrink-0 text-center min-w-[60px]">
                          <span className="text-amber-400 text-sm font-semibold uppercase block">
                            {new Date(event.eventDate).toLocaleDateString(dateLocale, { month: 'short' })}
                          </span>
                          <span className="text-3xl font-bold text-white block">
                            {new Date(event.eventDate).getDate()}
                          </span>
                          <span className="text-gray-500 text-xs block">
                            {new Date(event.eventDate).getFullYear()}
                          </span>
                        </div>
                      )}
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-white mb-2">{event.title}</h3>
                        <p className="text-amber-400/80 text-sm mb-3 flex items-center gap-1">
                          📍 {event.location}
                        </p>
                        <p className="text-gray-400 leading-relaxed">{event.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {shown.length === 0 && (
            <p className="text-center text-gray-500 py-12">
              {tab === 'upcoming' ? t('events.none.upcoming') : t('events.none.past')}
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
