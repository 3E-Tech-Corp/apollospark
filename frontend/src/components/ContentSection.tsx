interface ContentSectionProps {
  title: string;
  body: string;
  imageUrl?: string;
  reverse?: boolean;
  icon?: string;
  className?: string;
}

export default function ContentSection({ title, body, icon, reverse, className = '' }: ContentSectionProps) {
  return (
    <div className={`flex flex-col ${reverse ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-8 md:gap-12 ${className}`}>
      {/* Image placeholder */}
      <div className="w-full md:w-5/12">
        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br from-navy to-navy-light shadow-lg">
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-7xl opacity-20">{icon || '🎵'}</span>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-navy/40 to-transparent" />
        </div>
      </div>

      {/* Text */}
      <div className="w-full md:w-7/12">
        <h2 className="text-2xl sm:text-3xl font-bold text-navy">{title}</h2>
        <div className="mt-1 w-16 h-1 bg-gradient-to-r from-gold to-gold-dark rounded-full" />
        <p className="mt-4 text-gray-600 leading-relaxed whitespace-pre-line">{body}</p>
      </div>
    </div>
  );
}
