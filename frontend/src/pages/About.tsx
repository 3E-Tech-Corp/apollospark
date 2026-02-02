import { useEffect, useState } from 'react';
import { useI18n } from '../contexts/I18nContext';
import { contentApi, type ContentBlock } from '../services/api';
import ImageCarousel from '../components/ImageCarousel';

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

      {/* Founder Bio */}
      <section className="py-24 px-4 bg-gradient-to-b from-indigo-950/30 via-gray-900 to-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-sm uppercase tracking-widest text-amber-400 mb-4">
              {locale === 'zh' ? '创始人' : 'Our Founder'}
            </h2>
            <h3 className="text-4xl font-bold text-white mb-2">
              {locale === 'zh' ? '杨心灵 (Lynn Young)' : 'Xinling Yang (Lynn Young)'}
            </h3>
            <p className="text-amber-400/80 text-lg">
              {locale === 'zh' ? '杨心灵 · 旅美音乐剧演员 · "韶山百灵鸟"' : '"Shaoshan Skylark" · Vocalist · Musical Theatre Performer'}
            </p>
          </div>

          {/* Photo Carousel */}
          <div className="max-w-2xl mx-auto mb-16">
            <ImageCarousel
              images={[
                { src: '/images/lynn-4.jpg', alt: 'Lynn Young — artistic portrait in red' },
                { src: '/images/lynn-3.jpg', alt: 'Lynn Young performing on stage' },
                { src: '/images/lynn-headshot.jpg', alt: 'Lynn Young portrait' },
                { src: '/images/lynn-1.jpg', alt: 'Lynn Young — casual portrait' },
                { src: '/images/lynn-5.jpg', alt: 'Lynn Young — elegant close-up' },
                { src: '/images/lynn-2.jpg', alt: 'Lynn Young — denim editorial' },
                { src: '/images/lynn-6.jpg', alt: 'Lynn Young practicing tai chi' },
                { src: '/images/lynn-stage.jpg', alt: 'Lynn Young on stage' },
                { src: '/images/lynn-gala.jpg', alt: 'Lynn Young at cultural gala' },
              ]}
              autoPlayMs={4500}
              className="aspect-[3/4] border border-indigo-700/30 rounded-2xl"
            />
          </div>

          {/* Bio Text */}
          <div className="max-w-4xl mx-auto space-y-6">
            {locale === 'zh' ? (
              <>
                <p className="text-gray-300 leading-relaxed text-lg">
                  杨心灵（Lynn Young），毕业于中国音乐学院，中国东方演艺集团独唱演员、旅美音乐剧演员。她被海内外媒体赞誉为"韶山百灵鸟"，并担任城市代言人。
                </p>
                <p className="text-gray-300 leading-relaxed text-lg">
                  她荣获中宣部第十一届精神文明建设"五个一工程"奖，并于2008年在CCTV-3《星光大道》节目中获得周冠军。她的个人代表作品包括《我陪妈妈去韶山》《喝彩》等。
                </p>
                <p className="text-gray-300 leading-relaxed text-lg">
                  作为ApolloSpark的创始人，Lynn致力于在中美两国之间搭建音乐文化交流的桥梁。她深信音乐是跨越语言和文化的通用语言，能够将不同背景的人们联结在一起。通过ApolloSpark，她为年轻音乐人才提供指导、演出机会和国际巡演的平台，帮助他们在世界舞台上绽放光芒。
                </p>
              </>
            ) : (
              <>
                <p className="text-gray-300 leading-relaxed text-lg">
                  Xinling Yang, known as Lynn Young, is a graduate of the prestigious China Conservatory of Music and a solo vocalist with the China Oriental Performing Arts Group. A celebrated musical theatre performer in the United States, she has been praised by media at home and abroad as the <span className="text-amber-400 font-medium">"Shaoshan Skylark"</span> and serves as a city ambassador.
                </p>
                <p className="text-gray-300 leading-relaxed text-lg">
                  Lynn is a recipient of the <span className="text-amber-400 font-medium">11th "Five-One Project Award"</span> for Spiritual Civilization Construction by the Publicity Department of the CPC Central Committee — one of China's most prestigious cultural honors. She was also the <span className="text-amber-400 font-medium">Weekly Champion of CCTV-3's <em>Avenue of Stars</em></span> (星光大道) in 2008. Her representative works include <em>"I Accompany My Mother to Shaoshan"</em> (我陪妈妈去韶山) and <em>"Cheers"</em> (喝彩), among others.
                </p>
                <p className="text-gray-300 leading-relaxed text-lg">
                  As the founder of ApolloSpark, Lynn is dedicated to building bridges of musical and cultural exchange between the United States and China. She believes that music is a universal language that transcends borders and unites people from all backgrounds. Through ApolloSpark, she provides young musical talents with mentorship, performance opportunities, and international touring experiences — helping them shine on the world stage.
                </p>
              </>
            )}
          </div>

          {/* Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 max-w-4xl mx-auto">
            {[
              {
                icon: '🎓',
                title: locale === 'zh' ? '中国音乐学院' : 'China Conservatory of Music',
                desc: locale === 'zh' ? '中国顶尖音乐学府毕业' : 'Graduate of China\'s premier music institution'
              },
              {
                icon: '🏆',
                title: locale === 'zh' ? '"五个一工程"奖' : 'Five-One Project Award',
                desc: locale === 'zh' ? '中宣部第十一届精神文明建设奖' : 'CPC Central Committee cultural honor'
              },
              {
                icon: '⭐',
                title: locale === 'zh' ? '《星光大道》周冠军' : 'Avenue of Stars Champion',
                desc: locale === 'zh' ? 'CCTV-3 2008年度周冠军' : 'CCTV-3 Weekly Champion, 2008'
              },
            ].map(item => (
              <div key={item.title} className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-6 text-center">
                <span className="text-3xl block mb-3">{item.icon}</span>
                <h4 className="text-white font-semibold mb-1">{item.title}</h4>
                <p className="text-gray-400 text-sm">{item.desc}</p>
              </div>
            ))}
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
