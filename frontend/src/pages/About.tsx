import { useEffect, useState } from 'react';
import { contentApi, type ContentBlock } from '../services/api';

export default function About() {
  const [content, setContent] = useState<Record<string, ContentBlock>>({});

  useEffect(() => {
    contentApi.list().then(blocks => {
      const map: Record<string, ContentBlock> = {};
      blocks.forEach(b => { map[b.key] = b; });
      setContent(map);
    }).catch(() => {});
  }, []);

  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="py-24 px-4 bg-gradient-to-br from-gray-950 via-indigo-950/40 to-gray-950">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-sm uppercase tracking-widest text-amber-400 mb-4">About Us</h2>
          <h1 className="text-5xl font-bold text-white mb-6">Our Story</h1>
          <p className="text-xl text-gray-300 leading-relaxed">
            {content.about_history?.body || 'Building bridges between musical traditions of the USA and China since 2020.'}
          </p>
        </div>
      </section>

      {/* Founder Spotlight */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="bg-gradient-to-br from-indigo-900/50 to-purple-900/50 rounded-2xl aspect-square flex items-center justify-center border border-indigo-700/30">
              <div className="text-center">
                <span className="text-8xl block mb-4">🎹</span>
                <p className="text-gray-400 text-sm">Founder Photo</p>
              </div>
            </div>
            <div>
              <h2 className="text-sm uppercase tracking-widest text-amber-400 mb-4">Meet Our Founder</h2>
              <h3 className="text-4xl font-bold text-white mb-6">{content.founder_bio?.title || 'Our Founder'}</h3>
              <p className="text-gray-300 leading-relaxed text-lg">
                {content.founder_bio?.body || 'A visionary leader dedicated to bridging musical cultures.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-24 px-4 bg-gradient-to-b from-transparent via-amber-500/5 to-transparent">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-sm uppercase tracking-widest text-amber-400 mb-4">Our Mission</h2>
          <h3 className="text-4xl font-bold text-white mb-8">{content.mission_statement?.title || 'Our Mission'}</h3>
          <p className="text-xl text-gray-300 leading-relaxed">
            {content.mission_statement?.body || 'Promoting cultural exchange in the musical arts between the USA and China.'}
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-sm uppercase tracking-widest text-amber-400 mb-4 text-center">Our Values</h2>
          <h3 className="text-4xl font-bold text-white mb-16 text-center">What Drives Us</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: '🌏', title: 'Cultural Exchange', desc: 'We believe music transcends borders. By connecting young artists across cultures, we foster understanding and mutual respect.' },
              { icon: '⭐', title: 'Excellence', desc: 'We are committed to nurturing the highest level of artistry, providing world-class mentoring and performance opportunities.' },
              { icon: '🤝', title: 'Community', desc: 'We build lasting relationships between musicians, educators, and audiences in both countries, creating a global community of music lovers.' },
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
