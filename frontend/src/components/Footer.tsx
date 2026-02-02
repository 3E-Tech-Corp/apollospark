import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gray-950 border-t border-amber-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🎵</span>
              <span className="text-lg font-bold bg-gradient-to-r from-amber-400 to-yellow-200 bg-clip-text text-transparent">ApolloSpark</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Bridging musical traditions between the USA and China. Nurturing young talents, creating lasting cultural connections.
            </p>
          </div>
          <div>
            <h3 className="text-amber-400 font-semibold mb-4">Quick Links</h3>
            <div className="space-y-2">
              {[
                { to: '/about', label: 'About Us' },
                { to: '/artists', label: 'Our Artists' },
                { to: '/programs', label: 'Programs' },
                { to: '/events', label: 'Events' },
                { to: '/contact', label: 'Contact' },
              ].map(l => (
                <Link key={l.to} to={l.to} className="block text-gray-400 hover:text-amber-400 text-sm transition-colors">{l.label}</Link>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-amber-400 font-semibold mb-4">Connect</h3>
            <p className="text-gray-400 text-sm mb-2">info@apollospark.org</p>
            <p className="text-gray-400 text-sm mb-4">New York, NY | Shanghai, China</p>
            <div className="flex gap-3">
              {['Facebook', 'Instagram', 'YouTube'].map(s => (
                <span key={s} className="text-gray-500 hover:text-amber-400 text-xs cursor-pointer transition-colors">{s}</span>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="text-gray-500 text-xs">© {new Date().getFullYear()} ApolloSpark. All rights reserved.</p>
          <Link to="/login" className="text-gray-600 hover:text-gray-400 text-xs transition-colors">Admin</Link>
        </div>
      </div>
    </footer>
  );
}
