import type { Event } from '../services/api';

interface EventCardProps {
  event: Event;
}

export default function EventCard({ event }: EventCardProps) {
  const date = new Date(event.eventDate);
  const month = date.toLocaleDateString('en-US', { month: 'short' });
  const day = date.getDate();
  const year = date.getFullYear();
  const time = date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });

  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
      <div className="flex flex-col sm:flex-row">
        {/* Date block */}
        <div className="sm:w-32 bg-gradient-to-br from-navy to-navy-light p-4 sm:p-6 flex sm:flex-col items-center justify-center gap-2 sm:gap-0 text-center">
          <span className="text-gold font-bold text-sm uppercase">{month}</span>
          <span className="text-white text-3xl sm:text-4xl font-bold leading-none">{day}</span>
          <span className="text-white/60 text-sm">{year}</span>
        </div>

        {/* Content */}
        <div className="flex-1 p-5 sm:p-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <h3 className="text-lg font-bold text-navy group-hover:text-gold-dark transition-colors">
                {event.title}
              </h3>
              <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {time}
                </span>
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {event.location}
                </span>
              </div>
              <p className="text-sm text-gray-600 mt-3 line-clamp-2">{event.description}</p>
            </div>
            {event.isUpcoming && (
              <span className="shrink-0 px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                Upcoming
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
