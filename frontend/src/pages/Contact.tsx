import { useState } from 'react';
import { useI18n } from '../contexts/I18nContext';
import { contactApi } from '../services/api';

export default function Contact() {
  const { t } = useI18n();
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      await contactApi.submit(form);
      setStatus('sent');
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Failed to send message');
    }
  };

  return (
    <div className="pt-16">
      <section className="relative py-24 px-4 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=1920&h=600&fit=crop"
            alt="Piano"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-gray-950/95 via-indigo-950/85 to-gray-950/95" />
        </div>
        <div className="relative max-w-4xl mx-auto text-center">
          <h2 className="text-sm uppercase tracking-widest text-amber-400 mb-4">{t('contact.hero.label')}</h2>
          <h1 className="text-5xl font-bold text-white mb-6">{t('contact.hero.title')}</h1>
          <p className="text-xl text-gray-300">{t('contact.hero.subtitle')}</p>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Info */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-6">{t('contact.info.title')}</h3>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <span className="text-2xl">📧</span>
                <div>
                  <p className="text-amber-400 text-sm font-medium">{t('contact.info.email_label')}</p>
                  <p className="text-gray-300">{t('contact.info.email_value')}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="text-2xl">📍</span>
                <div>
                  <p className="text-amber-400 text-sm font-medium">{t('contact.info.offices_label')}</p>
                  <p className="text-gray-300 whitespace-pre-line">{t('contact.info.offices_value')}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="text-2xl">🏛️</span>
                <div>
                  <p className="text-amber-400 text-sm font-medium">{t('contact.info.beijing_label')}</p>
                  <p className="text-gray-300 whitespace-pre-line">{t('contact.info.beijing_value')}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="text-2xl">🌐</span>
                <div>
                  <p className="text-amber-400 text-sm font-medium">{t('contact.info.web_label')}</p>
                  <p className="text-gray-300">{t('contact.info.web_value')}</p>
                </div>
              </div>
            </div>

            <div className="mt-12 bg-gray-900/60 border border-gray-800 rounded-xl p-6">
              <h4 className="text-lg font-semibold text-white mb-3">{t('contact.musicians.title')}</h4>
              <p className="text-gray-400 text-sm leading-relaxed">
                {t('contact.musicians.desc')}
              </p>
            </div>
          </div>

          {/* Form */}
          <div>
            {status === 'sent' ? (
              <div className="bg-green-900/30 border border-green-700/50 rounded-xl p-8 text-center">
                <span className="text-5xl block mb-4">{t('contact.success.icon')}</span>
                <h3 className="text-2xl font-bold text-white mb-2">{t('contact.success.title')}</h3>
                <p className="text-gray-300">{t('contact.success.text')}</p>
                <button onClick={() => setStatus('idle')} className="mt-6 text-amber-400 hover:text-amber-300 text-sm">{t('contact.success.again')}</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {status === 'error' && (
                  <div className="bg-red-900/30 border border-red-700/50 text-red-300 px-4 py-3 rounded-lg text-sm">{errorMsg}</div>
                )}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">{t('contact.form.name')}</label>
                  <input
                    required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    placeholder={t('contact.form.name_placeholder')}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">{t('contact.form.email')}</label>
                  <input
                    type="email" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    placeholder={t('contact.form.email_placeholder')}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">{t('contact.form.subject')}</label>
                  <input
                    value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    placeholder={t('contact.form.subject_placeholder')}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">{t('contact.form.message')}</label>
                  <textarea
                    required rows={5} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent resize-none"
                    placeholder={t('contact.form.message_placeholder')}
                  />
                </div>
                <button
                  type="submit" disabled={status === 'sending'}
                  className="w-full py-4 bg-gradient-to-r from-amber-500 to-yellow-500 text-gray-900 font-bold rounded-lg hover:from-amber-400 hover:to-yellow-400 disabled:opacity-50 transition-all shadow-lg shadow-amber-500/25"
                >
                  {status === 'sending' ? t('contact.form.sending') : t('contact.form.submit')}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
