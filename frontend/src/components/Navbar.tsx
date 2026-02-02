import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useI18n } from '../contexts/I18nContext';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { t, locale, setLocale } = useI18n();

  const links = [
    { to: '/', label: t('nav.home') },
    { to: '/about', label: t('nav.about') },
    { to: '/artists', label: t('nav.artists') },
    { to: '/programs', label: t('nav.programs') },
    { to: '/events', label: t('nav.events') },
    { to: '/contact', label: t('nav.contact') },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-gray-950/90 backdrop-blur-md border-b border-amber-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <img src="/images/logo.jpg" alt="ApolloSpark" className="w-8 h-8 rounded-full object-cover" />
            <span className="text-xl font-bold bg-gradient-to-r from-amber-400 to-yellow-200 bg-clip-text text-transparent">
              ApolloSpark
            </span>
          </Link>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-1">
            {links.map(l => (
              <Link
                key={l.to}
                to={l.to}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  location.pathname === l.to
                    ? 'text-amber-400 bg-amber-400/10'
                    : 'text-gray-300 hover:text-amber-400 hover:bg-amber-400/5'
                }`}
              >
                {l.label}
              </Link>
            ))}

            {/* Language Switcher */}
            <div className="ml-3 flex items-center border border-gray-700 rounded-lg overflow-hidden">
              <button
                onClick={() => setLocale('en')}
                className={`px-2.5 py-1.5 text-xs font-medium transition-colors ${
                  locale === 'en'
                    ? 'bg-amber-500 text-gray-900'
                    : 'text-gray-400 hover:text-amber-400'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLocale('zh')}
                className={`px-2.5 py-1.5 text-xs font-medium transition-colors ${
                  locale === 'zh'
                    ? 'bg-amber-500 text-gray-900'
                    : 'text-gray-400 hover:text-amber-400'
                }`}
              >
                中文
              </button>
            </div>
          </div>

          {/* Mobile toggle */}
          <div className="flex items-center gap-2 md:hidden">
            {/* Mobile Language Switcher */}
            <div className="flex items-center border border-gray-700 rounded-lg overflow-hidden">
              <button
                onClick={() => setLocale('en')}
                className={`px-2 py-1 text-xs font-medium transition-colors ${
                  locale === 'en'
                    ? 'bg-amber-500 text-gray-900'
                    : 'text-gray-400 hover:text-amber-400'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLocale('zh')}
                className={`px-2 py-1 text-xs font-medium transition-colors ${
                  locale === 'zh'
                    ? 'bg-amber-500 text-gray-900'
                    : 'text-gray-400 hover:text-amber-400'
                }`}
              >
                中文
              </button>
            </div>
            <button onClick={() => setOpen(!open)} className="text-gray-300 hover:text-amber-400">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {open
                  ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-gray-950/95 backdrop-blur-md border-t border-amber-500/20">
          <div className="px-4 py-3 space-y-1">
            {links.map(l => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className={`block px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  location.pathname === l.to
                    ? 'text-amber-400 bg-amber-400/10'
                    : 'text-gray-300 hover:text-amber-400'
                }`}
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
