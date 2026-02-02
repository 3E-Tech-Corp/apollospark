import { useEffect, useState } from 'react';
import { useI18n } from '../contexts/I18nContext';
import { contentApi, type ContentBlock } from '../services/api';

export default function About() {
  const { t, locale } = useI18n();
  const [content, setContent] = useState<Record<string, ContentBlock>>({});

  useEffect(() => {
    contentApi.list(locale).then(blocks => {
      const map: Record<string, ContentBlock> = {};
      blocks.forEach(b => { map[b.key] = b; });
      setContent(map);
    }).catch(() => {});
  }, [locale]);

  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="relative py-24 px-4 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=1920&h=600&fit=crop"
            alt="Concert"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-gray-950/95 via-indigo-950/85 to-gray-950/95" />
        </div>
        <div className="relative max-w-4xl mx-auto text-center">
          <h2 className="text-sm uppercase tracking-widest text-amber-400 mb-4">{t('about.hero.label')}</h2>
          <h1 className="text-5xl font-bold text-white mb-6">{t('about.hero.title')}</h1>
          <p className="text-xl text-gray-300 leading-relaxed">
            {content.about_history?.body || t('about.hero.subtitle')}
          </p>
        </div>
      </section>

      {/* Founder Spotlight */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="rounded-2xl overflow-hidden aspect-square border border-indigo-700/30">
              {content.founder_bio?.imageUrl ? (
                <img
                  src={content.founder_bio.imageUrl}
                  alt={content.founder_bio?.title || t('about.founder.default_title')}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-indigo-900/50 to-purple-900/50 flex items-center justify-center">
                  <span className="text-8xl">🎹</span>
                </div>
              )}
            </div>
            <div>
              <h2 className="text-sm uppercase tracking-widest text-amber-400 mb-4">{t('about.founder.label')}</h2>
              <h3 className="text-4xl font-bold text-white mb-6">{content.founder_bio?.title || t('about.founder.default_title')}</h3>
              <p className="text-gray-300 leading-relaxed text-lg">
                {content.founder_bio?.body || t('about.founder.default_body')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-24 px-4 bg-gradient-to-b from-transparent via-amber-500/5 to-transparent">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-sm uppercase tracking-widest text-amber-400 mb-4">{t('about.mission.label')}</h2>
          <h3 className="text-4xl font-bold text-white mb-8">{content.mission_statement?.title || t('about.mission.default_title')}</h3>
          <p className="text-xl text-gray-300 leading-relaxed">
            {content.mission_statement?.body || t('about.mission.default_body')}
          </p>
        </div>
      </section>

      {/* Vision */}
      {content.about_vision && (
        <section className="py-24 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="lg:order-2 rounded-2xl overflow-hidden aspect-video border border-indigo-700/30">
                {content.about_vision.imageUrl ? (
                  <img src={content.about_vision.imageUrl} alt={content.about_vision.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-indigo-900/50 to-purple-900/50 flex items-center justify-center">
                    <span className="text-8xl">🌏</span>
                  </div>
                )}
              </div>
              <div className="lg:order-1">
                <h2 className="text-sm uppercase tracking-widest text-amber-400 mb-4">{t('about.vision.label')}</h2>
                <h3 className="text-4xl font-bold text-white mb-6">{content.about_vision.title}</h3>
                <p className="text-gray-300 leading-relaxed text-lg">{content.about_vision.body}</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Impact Numbers */}
      <section className="py-24 px-4 bg-gradient-to-r from-amber-500/5 via-indigo-500/5 to-amber-500/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-sm uppercase tracking-widest text-amber-400 mb-4">{t('about.impact.label')}</h2>
            <h3 className="text-4xl font-bold text-white">{t('about.impact.title')}</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { num: '120+', label: t('about.impact.students') },
              { num: '12', label: t('about.impact.cities') },
              { num: '85+', label: t('about.impact.concerts') },
              { num: '40+', label: t('about.impact.mentors') },
            ].map(stat => (
              <div key={stat.label} className="text-center bg-gray-900/40 border border-gray-800 rounded-xl p-8">
                <p className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-amber-400 to-yellow-300 bg-clip-text text-transparent">{stat.num}</p>
                <p className="text-gray-400 mt-2">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-sm uppercase tracking-widest text-amber-400 mb-4 text-center">{t('about.values.label')}</h2>
          <h3 className="text-4xl font-bold text-white mb-16 text-center">{t('about.values.title')}</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: '🌏', title: t('about.values.exchange.title'), desc: t('about.values.exchange.desc') },
              { icon: '⭐', title: t('about.values.excellence.title'), desc: t('about.values.excellence.desc') },
              { icon: '🤝', title: t('about.values.community.title'), desc: t('about.values.community.desc') },
            ].map(v => (
              <div key={v.title} className="bg-gray-900/60 border border-gray-800 rounded-xl p-8 text-center hover:border-amber-500/30 transition-all">
                <span className="text-5xl block mb-4">{v.icon}</span>
                <h4 className="text-xl font-semibold text-white mb-3">{v.title}</h4>
                <p className="text-gray-400 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
