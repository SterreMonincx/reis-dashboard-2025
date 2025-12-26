import { useState, useEffect } from 'react';

const ItineraryView = () => {
  const [itinerary, setItinerary] = useState(null);
  const [activeDestination, setActiveDestination] = useState('hong-kong');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}data/itinerary.json`)
      .then((res) => res.json())
      .then((data) => {
        setItinerary(data.destinations);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error loading itinerary:', error);
        setLoading(false);
      });
  }, []);

  const getIconForType = (type) => {
    const icons = {
      arrival: '🛬',
      departure: '🛫',
      transfer: '🚗',
      accommodation: '🏨',
      reservation: '🍽️',
      activity: '🎯',
      free: '⏰',
      relaxation: '🏖️',
      special: '🎉',
      breakfast: '☕',
      lunch: '🍴',
      dinner: '🍽️',
    };
    return icons[type] || '📍';
  };

  const getTypeColor = (type) => {
    const colors = {
      arrival: 'bg-green-100 text-green-800 border-green-300',
      departure: 'bg-red-100 text-red-800 border-red-300',
      transfer: 'bg-blue-100 text-blue-800 border-blue-300',
      accommodation: 'bg-purple-100 text-purple-800 border-purple-300',
      reservation: 'bg-orange-100 text-orange-800 border-orange-300',
      activity: 'bg-teal-100 text-teal-800 border-teal-300',
      free: 'bg-gray-100 text-gray-800 border-gray-300',
      relaxation: 'bg-cyan-100 text-cyan-800 border-cyan-300',
      special: 'bg-pink-100 text-pink-800 border-pink-300',
    };
    return colors[type] || 'bg-gray-100 text-gray-800 border-gray-300';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-xl text-gray-600">Loading planning...</div>
      </div>
    );
  }

  if (!itinerary) {
    return (
      <div className="card bg-red-50">
        <p className="text-red-800">Error loading itinerary data.</p>
      </div>
    );
  }

  const destinations = [
    { id: 'hong-kong', label: 'Hong Kong 🇭🇰', emoji: '🇭🇰' },
    { id: 'singapore', label: 'Singapore 🇸🇬', emoji: '🇸🇬' },
    { id: 'langkawi', label: 'Langkawi 🇲🇾', emoji: '🇲🇾' },
    { id: 'dubai', label: 'Dubai 🇦🇪', emoji: '🇦🇪' },
  ];

  const currentData = itinerary[activeDestination];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">📅 Dagplanning</h1>
        <p className="text-gray-600">Jouw dag-tot-dag schema voor de hele reis</p>
      </div>

      {/* Destination Tabs */}
      <div className="flex flex-wrap gap-2 bg-white p-4 rounded-lg shadow-md">
        {destinations.map((dest) => (
          <button
            key={dest.id}
            onClick={() => setActiveDestination(dest.id)}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              activeDestination === dest.id
                ? 'bg-primary-600 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {dest.label}
          </button>
        ))}
      </div>

      {/* Current Destination Info */}
      {currentData && (
        <div className="card bg-gradient-to-r from-primary-50 to-blue-50">
          <h2 className="text-2xl font-bold mb-2">{currentData.name}</h2>
          <p className="text-gray-700">{currentData.dates}</p>
        </div>
      )}

      {/* Days */}
      {currentData && (
        <div className="space-y-6">
          {currentData.days.map((day) => (
            <div key={day.date} className="card">
              <div className="border-l-4 border-primary-500 pl-4 mb-4">
                <h3 className="text-xl font-bold text-primary-700">
                  {day.dayName}, {new Date(day.date).toLocaleDateString('nl-NL', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}
                </h3>
                <p className="text-sm text-gray-600">Dag {day.dayNumber}</p>
              </div>

              <div className="space-y-4">
                {day.items.map((item, idx) => (
                  <div
                    key={idx}
                    className={`border-2 rounded-lg p-4 ${getTypeColor(item.type)}`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="text-2xl flex-shrink-0">
                        {getIconForType(item.type)}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <div>
                            <h4 className="font-bold text-lg">{item.title}</h4>
                            {item.location && (
                              <p className="text-sm opacity-80">📍 {item.location}</p>
                            )}
                          </div>
                          {item.time && (
                            <span className="bg-white/50 px-3 py-1 rounded-full text-sm font-semibold whitespace-nowrap">
                              🕐 {item.time}
                            </span>
                          )}
                        </div>

                        {item.details && (
                          <p className="text-sm mb-2">{item.details}</p>
                        )}

                        {item.note && (
                          <p className="text-sm italic mb-2">💡 {item.note}</p>
                        )}

                        {item.confirmed && (
                          <span className="inline-block bg-green-500 text-white px-2 py-1 rounded text-xs font-semibold">
                            ✓ Gereserveerd
                          </span>
                        )}

                        {item.suggestions && item.suggestions.length > 0 && (
                          <div className="mt-3 bg-white/50 rounded p-3">
                            <p className="text-sm font-semibold mb-2">💡 Suggesties:</p>
                            <ul className="text-sm space-y-1">
                              {item.suggestions.map((suggestion, i) => (
                                <li key={i} className="flex items-start gap-2">
                                  <span className="text-primary-600">•</span>
                                  <span>{suggestion}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ItineraryView;

