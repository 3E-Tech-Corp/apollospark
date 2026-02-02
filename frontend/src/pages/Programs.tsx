import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { contentApi, type ContentBlock } from '../services/api';

const programIcons: Record<string, string> = {
  mentoring_program: '🎓',
  touring_program: '✈️',
  masterclass_program: '🎼',
};

export default function Programs() {
  const [content, setContent] = useState<ContentBlock[]>([]);

  useEffect(() => {
    contentApi.list().then(blocks => {
      setContent(blocks.filter(b => b.key.endsWith('_program')));
    }).catch(() => {});
  }, []);

  return (
    <div className="pt-16">
      <section className="py-24 px-4 bg-gradient-to-br from-gray-950 via-indigo-950/40 to-gray-950">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-sm uppercase tracking-widest text-amber-400 mb-4">Our Programs</h2>
          <h1 className="text-5xl font-bold text-white mb-6">Shaping the Future of Music</h1>
          <p className="text-xl text-gray-300">World-class opportunities for young musicians to learn, grow, and perform across cultures.</p>
        </div>
      </section>

      <section className="py-24 px-4">
        <div className="max-w-5xl mx-auto space-y-16">
          {content.map((program, i) => (
            <div key={program.key} className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${i % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
              <div className={`order-${i % 2 === 1 ? '2' : '1'} lg:order-${i % 2 === 1 ? '2' : '1'}`}>
                <div className="bg-gradient-to-br from-indigo-900/40 to-purple-900/40 rounded-2xl aspect-video flex items-center justify-center border border-indigo-700/20">
                  <span className="text-7xl">{programIcons[program.key] || '🎵'}</span>
                </div>
              </div>
              <div className={`order-${i % 2 === 1 ? '1' : '2'} lg:order-${i % 2 === 1 ? '1' : '2'}`}>
                <h3 className="text-3xl font-bold text-white mb-4">{program.title}</h3>
                <p className="text-gray-300 leading-relaxed text-lg">{program.body}</p>
              </div>
            </div>
          ))}

          {content.length === 0 && (
            <div className="space-y-16">
              {[
                { icon: '🎓', title: 'Mentoring Program', desc: 'Our flagship program pairs rising musicians with established artists from both countries for year-long mentorship.' },
                { icon: '✈️', title: 'Touring Opportunities', desc: 'Annual concert tours bring young musicians to perform at prestigious venues across the USA and China.' },
                { icon: '🎼', title: 'Masterclasses', desc: 'Intensive workshops led by world-class musicians, combining technical instruction with cultural immersion.' },
              ].map((p, i) => (
                <div key={p.title} className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center`}>
                  <div className={i % 2 === 1 ? 'lg:order-2' : ''}>
                    <div className="bg-gradient-to-br from-indigo-900/40 to-purple-900/40 rounded-2xl aspect-video flex items-center justify-center border border-indigo-700/20">
                      <span className="text-7xl">{p.icon}</span>
                    </div>
                  </div>
                  <div className={i % 2 === 1 ? 'lg:order-1' : ''}>
                    <h3 className="text-3xl font-bold text-white mb-4">{p.title}</h3>
                    <p className="text-gray-300 leading-relaxed text-lg">{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="py-24 px-4">
        <div className="max-w-3xl mx-auto text-center bg-gradient-to-r from-amber-500/10 to-indigo-500/10 border border-amber-500/20 rounded-2xl p-12">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Apply?</h2>
          <p className="text-gray-300 mb-8">We're always looking for talented young musicians. Get in touch to learn about upcoming opportunities.</p>
          <Link to="/contact" className="px-8 py-4 bg-gradient-to-r from-amber-500 to-yellow-500 text-gray-900 font-bold rounded-lg hover:from-amber-400 hover:to-yellow-400 transition-all shadow-lg shadow-amber-500/25 inline-block">
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  );
}
