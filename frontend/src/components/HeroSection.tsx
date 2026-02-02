import { Link } from 'react-router-dom';

interface HeroSectionProps {
  title: string;
  subtitle?: string;
  cta?: { label: string; to: string };
  secondaryCta?: { label: string; to: string };
  large?: boolean;
}

export default function HeroSection({ title, subtitle, cta, secondaryCta, large }: HeroSectionProps) {
  return (
    <section
      className={`relative overflow-hidden ${large ? 'min-h-[85vh]' : 'min-h-[50vh]'} flex items-center justify-center`}
    >
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-navy-dark via-navy to-navy-light" />

      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-gold/5 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-gold/5 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-gold/10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-gold/5" />
      </div>

      {/* Musical note decorations */}
      <div className="absolute top-20 left-10 text-gold/10 text-6xl font-serif select-none">♪</div>
      <div className="absolute bottom-20 right-10 text-gold/10 text-8xl font-serif select-none">♫</div>
      <div className="absolute top-1/3 right-1/4 text-gold/5 text-5xl font-serif select-none">♩</div>

      <div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto">
        <h1
          className={`font-bold text-white leading-tight ${
            large ? 'text-4xl sm:text-5xl md:text-6xl lg:text-7xl' : 'text-3xl sm:text-4xl md:text-5xl'
          }`}
        >
          {title}
        </h1>
        {subtitle && (
          <p className="mt-4 sm:mt-6 text-lg sm:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        )}
        {(cta || secondaryCta) && (
          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            {cta && (
              <Link
                to={cta.to}
                className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-gold to-gold-dark text-navy font-semibold rounded-full hover:from-gold-light hover:to-gold transition-all shadow-lg shadow-gold/20 hover:shadow-gold/30"
              >
                {cta.label}
              </Link>
            )}
            {secondaryCta && (
              <Link
                to={secondaryCta.to}
                className="inline-flex items-center px-8 py-3 border-2 border-gold/40 text-gold font-semibold rounded-full hover:bg-gold/10 transition-all"
              >
                {secondaryCta.label}
              </Link>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
