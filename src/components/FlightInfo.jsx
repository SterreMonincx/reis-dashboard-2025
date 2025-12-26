import { useState, useEffect } from 'react';

const FlightInfo = () => {
  const [flightData, setFlightData] = useState(null);
  const [accommodations, setAccommodations] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('flights');

  useEffect(() => {
    Promise.all([
      fetch('/data/flights.json').then(res => res.json()),
      fetch('/data/accommodations.json').then(res => res.json())
    ])
      .then(([flights, accom]) => {
        setFlightData(flights);
        setAccommodations(accom);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error loading data:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  if (!flightData || !accommodations) {
    return (
      <div className="card bg-red-50">
        <p className="text-red-800">Error loading data.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">✈️ Vluchten & Accommodaties</h1>
        <p className="text-gray-600">Alle reis- en verblijfsinformatie op een rij</p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 bg-white p-4 rounded-lg shadow-md">
        {[
          { id: 'flights', label: 'Vluchten ✈️' },
          { id: 'transfers', label: 'Transfers 🚗' },
          { id: 'hotels', label: 'Hotels 🏨' },
          { id: 'reminders', label: 'Belangrijke Info ⚠️' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              activeTab === tab.id
                ? 'bg-primary-600 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Flights Tab */}
      {activeTab === 'flights' && (
        <div className="space-y-6">
          {flightData.flights.map((flight) => (
            <div key={flight.id} className="card hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    {flight.airline} {flight.flightNumber}
                  </h3>
                  <p className="text-sm text-gray-600">{flight.class}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-primary-600">
                    {new Date(flight.date).toLocaleDateString('nl-NL', {
                      weekday: 'short',
                      day: 'numeric',
                      month: 'short'
                    })}
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Departure */}
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-xs text-gray-600 mb-1">🛫 VERTREK</p>
                  <p className="font-bold text-2xl text-blue-600 mb-2">{flight.departure.time}</p>
                  <p className="font-semibold">{flight.departure.airport}</p>
                  <p className="text-sm text-gray-600">{flight.departure.code}</p>
                </div>

                {/* Arrival */}
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="text-xs text-gray-600 mb-1">
                    🛬 AANKOMST{flight.arrival.nextDay && ' (volgende dag)'}
                  </p>
                  <p className="font-bold text-2xl text-green-600 mb-2">{flight.arrival.time}</p>
                  <p className="font-semibold">{flight.arrival.airport}</p>
                  <p className="text-sm text-gray-600">{flight.arrival.code}</p>
                </div>
              </div>

              {flight.note && (
                <div className="mt-4 bg-yellow-50 border-l-4 border-yellow-400 p-3">
                  <p className="text-yellow-800 text-sm">💡 {flight.note}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Transfers Tab */}
      {activeTab === 'transfers' && (
        <div className="space-y-4">
          {flightData.transfers.map((transfer, idx) => (
            <div key={idx} className="card bg-blue-50 border-2 border-blue-200">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-sm text-gray-600 mb-1">
                    {new Date(transfer.date).toLocaleDateString('nl-NL', {
                      weekday: 'long',
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </p>
                  <h3 className="font-bold text-lg">{transfer.type}</h3>
                </div>
                <span className="text-3xl">🚗</span>
              </div>
              
              <div className="space-y-2">
                <p className="text-sm">
                  <span className="font-semibold">Van:</span> {transfer.from}
                </p>
                <p className="text-sm">
                  <span className="font-semibold">Naar:</span> {transfer.to}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Hotels Tab */}
      {activeTab === 'hotels' && (
        <div className="space-y-6">
          {accommodations.accommodations.map((hotel) => (
            <div key={hotel.id} className="card hover:shadow-xl transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">{hotel.name}</h3>
                  <p className="text-lg text-primary-600 font-semibold">{hotel.destination}</p>
                  <p className="text-sm text-gray-600">{hotel.location}</p>
                </div>
                <span className="text-4xl">🏨</span>
              </div>

              {/* Dates */}
              <div className="bg-gradient-to-r from-primary-50 to-blue-50 p-4 rounded-lg mb-4">
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Check-in</p>
                    <p className="font-bold">
                      {new Date(hotel.checkIn).toLocaleDateString('nl-NL', {
                        day: 'numeric',
                        month: 'short'
                      })}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Check-out</p>
                    <p className="font-bold">
                      {new Date(hotel.checkOut).toLocaleDateString('nl-NL', {
                        day: 'numeric',
                        month: 'short'
                      })}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Nachten</p>
                    <p className="font-bold">{hotel.nights} nachten</p>
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-700 mb-4">{hotel.description}</p>

              {/* Details */}
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm font-semibold mb-1">🛏️ Kamers:</p>
                  <p className="text-sm text-gray-700">{hotel.roomType}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold mb-1">🍽️ Verblijf:</p>
                  <p className="text-sm text-gray-700">{hotel.board}</p>
                </div>
              </div>

              {/* Amenities */}
              {hotel.amenities && hotel.amenities.length > 0 && (
                <div className="mb-4">
                  <p className="text-sm font-semibold mb-2">✨ Voorzieningen:</p>
                  <div className="flex flex-wrap gap-2">
                    {hotel.amenities.map((amenity, i) => (
                      <span
                        key={i}
                        className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs"
                      >
                        {amenity}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Contact Info */}
              {(hotel.address || hotel.phone) && (
                <div className="bg-gray-50 p-3 rounded-lg mb-4 text-sm space-y-1">
                  {hotel.address && (
                    <p><span className="font-semibold">📍 Adres:</span> {hotel.address}</p>
                  )}
                  {hotel.phone && (
                    <p><span className="font-semibold">📞 Telefoon:</span> {hotel.phone}</p>
                  )}
                  {hotel.distance && (
                    <p><span className="font-semibold">🚗 Afstand:</span> {hotel.distance}</p>
                  )}
                </div>
              )}

              {/* Website */}
              {hotel.website && (
                <a
                  href={hotel.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-primary-600 hover:text-primary-800 underline text-sm"
                >
                  🔗 Website bezoeken
                </a>
              )}
            </div>
          ))}

          {/* Contact Information */}
          <div className="card bg-blue-50 border-2 border-blue-300">
            <h3 className="text-xl font-bold mb-4">📞 Belangrijke Contacten</h3>
            
            <div className="space-y-4">
              <div>
                <p className="font-semibold text-lg mb-2">Reizigers:</p>
                {accommodations.contacts.map((contact, idx) => (
                  <div key={idx} className="mb-2">
                    <p className="font-medium">{contact.name}</p>
                    <p className="text-sm text-gray-700">{contact.phone}</p>
                  </div>
                ))}
              </div>

              <div className="border-t-2 border-blue-200 pt-4">
                <p className="font-semibold text-lg mb-2">Reisbureau:</p>
                <p className="font-medium">{accommodations.travelAgency.name}</p>
                <p className="text-sm text-gray-700">
                  Agent: {accommodations.travelAgency.agent}
                </p>
                <p className="text-sm text-gray-700">
                  Telefoon: {accommodations.travelAgency.phone}
                </p>
                <p className="text-xs text-gray-600 mt-1">
                  Referentie: {accommodations.travelAgency.reference}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Reminders Tab */}
      {activeTab === 'reminders' && (
        <div className="space-y-4">
          <div className="card bg-red-50 border-2 border-red-300">
            <h3 className="text-xl font-bold text-red-800 mb-4">
              ⚠️ BELANGRIJK: Invullen voor vertrek!
            </h3>
            <p className="text-gray-700 mb-4">
              Deze documenten moeten binnen 3 dagen vóór aankomst worden ingevuld:
            </p>
          </div>

          {flightData.importantReminders.map((reminder, idx) => (
            <div key={idx} className="card bg-yellow-50 border-2 border-yellow-400">
              <div className="flex items-start gap-4">
                <span className="text-4xl">📝</span>
                <div className="flex-1">
                  <h4 className="font-bold text-lg mb-2">{reminder.title}</h4>
                  <p className="text-gray-700 mb-3">{reminder.description}</p>
                  
                  <div className="bg-white p-3 rounded border-2 border-yellow-300 mb-3">
                    <p className="text-sm font-semibold text-red-600 mb-2">
                      ⏰ Deadline: {reminder.deadline}
                    </p>
                    <p className="text-sm text-gray-600 mb-2">
                      Van toepassing op: <span className="font-semibold">{reminder.applicableTo}</span>
                    </p>
                  </div>

                  <a
                    href={reminder.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                  >
                    🔗 Registreren →
                  </a>
                </div>
              </div>
            </div>
          ))}

          <div className="card bg-blue-50">
            <h4 className="font-bold mb-2">💡 Extra Tips:</h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>✓ Print kopieën van alle reserveringsbevestigingen</li>
              <li>✓ Zorg dat je paspoort minimaal 6 maanden geldig is</li>
              <li>✓ Check of je reisverzekering actief is</li>
              <li>✓ Download offline kaarten voor elke bestemming</li>
              <li>✓ Zet belangrijke telefoonnummers in je telefoon</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default FlightInfo;

