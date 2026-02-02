import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useI18n } from '../contexts/I18nContext';
import { contentApi, type ContentBlock } from '../services/api';

const programIcons: Record<string, string> = {
  mentoring_program: '🎓',
  touring_program: '✈️',
  masterclass_program: '🎼',
  summer_intensive_program: '☀️',
  concert_series_program: '🎵',
};

export default function Programs() {
  const { t, locale } = useI18n();
  const [content, setContent] = useState<ContentBlock[]>([]);

  useEffect(() => {
    contentApi.list(locale).then(blocks => {
      setContent(blocks.filter(b => b.key.endsWith('_program')));
    }).catch(() => {});
  }, [locale]);

  return (
    <div className="pt-16">
      <section className="relative py-24 px-4 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=1920&h=600&fit=crop"
            alt="Music education"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-gray-950/95 via-indigo-950/85 to-gray-950/95" />
        </div>
        <div className="relative max-w-4xl mx-auto text-center">
          <h2 className="text-sm uppercase tracking-widest text-amber-400 mb-4">{t('programs.hero.label')}</h2>
          <h1 className="text-5xl font-bold text-white mb-6">{t('programs.hero.title')}</h1>
          <p className="text-xl text-gray-300">{t('programs.hero.subtitle')}</p>
        </div>
      </section>

      <section className="py-24 px-4">
        <div className="max-w-5xl mx-auto space-y-24">
          {content.length > 0 ? (
            content.map((program, i) => (
              <div key={program.key} className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center`}>
                <div className={i % 2 === 1 ? 'lg:order-2' : ''}>
                  <div className="rounded-2xl overflow-hidden aspect-video border border-indigo-700/20">
                    {program.imageUrl ? (
                      <img src={program.imageUrl} alt={program.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-indigo-900/40 to-purple-900/40 flex items-center justify-center">
                        <span className="text-7xl">{programIcons[program.key] || '🎵'}</span>
                      </div>
                    )}
                  </div>
                </div>
                <div className={i % 2 === 1 ? 'lg:order-1' : ''}>
                  <span className="text-4xl mb-4 block">{programIcons[program.key] || '🎵'}</span>
                  <h3 className="text-3xl font-bold text-white mb-4">{program.title}</h3>
                  <p className="text-gray-300 leading-relaxed text-lg">{program.body}</p>
                </div>
              </div>
            ))
          ) : (
            /* Fallback content */
            [
              { icon: '🎓', title: t('programs.fallback.mentoring.title'), desc: t('programs.fallback.mentoring.desc'), img: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&h=500&fit=crop' },
              { icon: '✈️', title: t('programs.fallback.touring.title'), desc: t('programs.fallback.touring.desc'), img: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&h=500&fit=crop' },
              { icon: '🎼', title: t('programs.fallback.masterclass.title'), desc: t('programs.fallback.masterclass.desc'), img: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=800&h=500&fit=crop' },
            ].map((p, i) => (
              <div key={p.title} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className={i % 2 === 1 ? 'lg:order-2' : ''}>
                  <div className="rounded-2xl overflow-hidden aspect-video border border-indigo-700/20">
                    <img src={p.img} alt={p.title} className="w-full h-full object-cover" />
                  </div>
                </div>
                <div className={i % 2 === 1 ? 'lg:order-1' : ''}>
                  <span className="text-4xl mb-4 block">{p.icon}</span>
                  <h3 className="text-3xl font-bold text-white mb-4">{p.title}</h3>
                  <p className="text-gray-300 leading-relaxed text-lg">{p.desc}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      <section className="py-24 px-4">
        <div className="max-w-3xl mx-auto text-center bg-gradient-to-r from-amber-500/10 to-indigo-500/10 border border-amber-500/20 rounded-2xl p-12">
          <h2 className="text-3xl font-bold text-white mb-4">{t('programs.cta.title')}</h2>
          <p className="text-gray-300 mb-8">{t('programs.cta.text')}</p>
          <Link to="/contact" className="px-8 py-4 bg-gradient-to-r from-amber-500 to-yellow-500 text-gray-900 font-bold rounded-lg hover:from-amber-400 hover:to-yellow-400 transition-all shadow-lg shadow-amber-500/25 inline-block">
            {t('programs.cta.button')}
          </Link>
        </div>
      </section>
    </div>
  );
}
