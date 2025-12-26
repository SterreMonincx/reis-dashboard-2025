import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [timeUntilTrip, setTimeUntilTrip] = useState('');
  const [currentDestination, setCurrentDestination] = useState(null);

  const destinations = [
    {
      name: 'Hong Kong',
      emoji: '🇭🇰',
      dates: '27-30 dec',
      nights: 3,
      hotel: 'The Hari Hong Kong',
      highlights: ['Victoria Peak', 'Din Tai Fung', 'Dragons Back', 'LKF Nightlife']
    },
    {
      name: 'Singapore',
      emoji: '🇸🇬',
      dates: '30 dec - 3 jan',
      nights: 4,
      hotel: 'Artyzen Singapore',
      highlights: ['Oudejaarsavond!', 'Gardens by the Bay', 'Marina Bay Sands', 'Bike Tour']
    },
    {
      name: 'Langkawi',
      emoji: '🇲🇾',
      dates: '3-7 jan',
      nights: 4,
      hotel: 'Pelangi Beach Resort',
      highlights: ['Cenang Beach', 'Cable Car', 'Island Hopping', 'Resort Relaxen']
    },
    {
      name: 'Dubai',
      emoji: '🇦🇪',
      dates: '7-10 jan',
      nights: 3,
      hotel: 'Bab Al Shams Desert Resort',
      highlights: ['Woestijn Ervaring', 'Burj Khalifa', 'Spa & Wellness', 'Desert Dinner']
    }
  ];

  useEffect(() => {
    const calculateTimeUntilTrip = () => {
      const tripStart = new Date('2025-12-26T22:00:00');
      const now = new Date();
      const diff = tripStart - now;

      if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        setTimeUntilTrip(`${days} dagen en ${hours} uur`);
      } else {
        setTimeUntilTrip('We zijn onderweg! 🎉');
        
        // Determine current destination based on date
        const hongKongEnd = new Date('2025-12-30');
        const singaporeEnd = new Date('2026-01-03');
        const langkawiEnd = new Date('2026-01-07');
        const dubaiEnd = new Date('2026-01-10');
        
        if (now < hongKongEnd) setCurrentDestination('Hong Kong');
        else if (now < singaporeEnd) setCurrentDestination('Singapore');
        else if (now < langkawiEnd) setCurrentDestination('Langkawi');
        else if (now < dubaiEnd) setCurrentDestination('Dubai');
        else setCurrentDestination('Thuis! 🏠');
      }
    };

    calculateTimeUntilTrip();
    const interval = setInterval(calculateTimeUntilTrip, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="card bg-gradient-to-r from-primary-500 to-primary-700 text-white">
        <h1 className="text-4xl font-bold mb-4">
          Welkom bij jullie Azië Reis Dashboard! 🌏
        </h1>
        <p className="text-xl mb-6">
          {timeUntilTrip === 'We zijn onderweg! 🎉' 
            ? `🎉 ${timeUntilTrip} Huidige locatie: ${currentDestination}`
            : `Vertrek over: ${timeUntilTrip}`
          }
        </p>
        <div className="flex flex-wrap gap-4">
          <div className="bg-white/20 px-4 py-2 rounded-lg">
            <span className="font-semibold">16 dagen</span> • 15 nachten
          </div>
          <div className="bg-white/20 px-4 py-2 rounded-lg">
            <span className="font-semibold">4 bestemmingen</span>
          </div>
          <div className="bg-white/20 px-4 py-2 rounded-lg">
            <span className="font-semibold">7 reizigers</span>
          </div>
        </div>
      </div>

      {/* Destinations Overview */}
      <div>
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <span>🗺️</span>
          Onze Bestemmingen
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {destinations.map((dest, index) => (
            <div
              key={dest.name}
              className={`card hover:shadow-lg transition-shadow ${
                currentDestination === dest.name ? 'ring-4 ring-primary-400' : ''
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-bold flex items-center gap-2">
                    <span className="text-3xl">{dest.emoji}</span>
                    {dest.name}
                  </h3>
                  <p className="text-gray-600">{dest.dates} • {dest.nights} nachten</p>
                </div>
                {currentDestination === dest.name && (
                  <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Nu hier!
                  </span>
                )}
              </div>
              
              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-1">🏨 Accommodatie:</p>
                <p className="font-medium">{dest.hotel}</p>
              </div>

              <div>
                <p className="text-sm text-gray-600 mb-2">✨ Highlights:</p>
                <div className="flex flex-wrap gap-2">
                  {dest.highlights.map((highlight) => (
                    <span
                      key={highlight}
                      className="bg-gray-100 px-3 py-1 rounded-full text-sm"
                    >
                      {highlight}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Links */}
      <div>
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <span>🔗</span>
          Snelle Links
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link to="/itinerary" className="card hover:bg-gray-50 transition-colors">
            <div className="text-4xl mb-2">📅</div>
            <h3 className="font-bold mb-1">Dagplanning</h3>
            <p className="text-sm text-gray-600">Bekijk je dag-tot-dag schema</p>
          </Link>
          
          <Link to="/tips" className="card hover:bg-gray-50 transition-colors">
            <div className="text-4xl mb-2">🍜</div>
            <h3 className="font-bold mb-1">Restaurant Tips</h3>
            <p className="text-sm text-gray-600">Alle aanbevelingen op een rij</p>
          </Link>
          
          <Link to="/flights" className="card hover:bg-gray-50 transition-colors">
            <div className="text-4xl mb-2">✈️</div>
            <h3 className="font-bold mb-1">Vluchten</h3>
            <p className="text-sm text-gray-600">Vlucht tijden en transfers</p>
          </Link>
          
          <div className="card bg-yellow-50 border-2 border-yellow-300">
            <div className="text-4xl mb-2">⚠️</div>
            <h3 className="font-bold mb-1 text-yellow-800">Belangrijk!</h3>
            <p className="text-sm text-gray-700">
              Invullen 3 dagen voor aankomst:
              <br />
              • SG Arrival Card
              <br />
              • Malaysia MDAC
            </p>
          </div>
        </div>
      </div>

      {/* Important Contact Info */}
      <div className="card bg-blue-50">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <span>📞</span>
          Belangrijke Contacten
        </h2>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div>
            <p className="font-semibold">Oscar Monincx</p>
            <p className="text-gray-600">+31 6 5200 8060</p>
          </div>
          <div>
            <p className="font-semibold">Travel Agent: Desiree Kok</p>
            <p className="text-gray-600">06 2030 0510</p>
            <p className="text-gray-600 text-xs">Ref: A2501439</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

