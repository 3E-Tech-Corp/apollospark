import { Link } from 'react-router-dom';
import { useI18n } from '../contexts/I18nContext';

export default function Footer() {
  const { t } = useI18n();

  return (
    <footer className="bg-gray-950 border-t border-amber-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img src="/images/logo.jpg" alt="ApolloSpark" className="w-8 h-8 rounded-full object-cover" />
              <span className="text-lg font-bold bg-gradient-to-r from-amber-400 to-yellow-200 bg-clip-text text-transparent">ApolloSpark</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              {t('footer.desc')}
            </p>
          </div>
          <div>
            <h3 className="text-amber-400 font-semibold mb-4">{t('footer.links_title')}</h3>
            <div className="space-y-2">
              {[
                { to: '/about', label: t('nav.about') },
                { to: '/artists', label: t('nav.artists') },
                { to: '/programs', label: t('nav.programs') },
                { to: '/events', label: t('nav.events') },
                { to: '/contact', label: t('nav.contact') },
              ].map(l => (
                <Link key={l.to} to={l.to} className="block text-gray-400 hover:text-amber-400 text-sm transition-colors">{l.label}</Link>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-amber-400 font-semibold mb-4">{t('footer.connect_title')}</h3>
            <p className="text-gray-400 text-sm mb-2">info@apollospark.org</p>
            <p className="text-gray-400 text-sm mb-4">New York, NY | Beijing, China</p>
            <div className="flex gap-3">
              {['Facebook', 'Instagram', 'YouTube'].map(s => (
                <span key={s} className="text-gray-500 hover:text-amber-400 text-xs cursor-pointer transition-colors">{s}</span>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="text-gray-500 text-xs">© {new Date().getFullYear()} {t('footer.copyright')}</p>
          <Link to="/login" className="text-gray-600 hover:text-gray-400 text-xs transition-colors">{t('footer.admin')}</Link>
        </div>
      </div>
    </footer>
  );
}
