import { useState, useEffect } from 'react';

const TipsDatabase = () => {
  const [tips, setTips] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeDestination, setActiveDestination] = useState('hong-kong');
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('all');

  useEffect(() => {
    fetch('/data/tips.json')
      .then((res) => res.json())
      .then((data) => {
        setTips(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error loading tips:', error);
        setLoading(false);
      });
  }, []);

  const destinations = [
    { id: 'hong-kong', label: 'Hong Kong 🇭🇰' },
    { id: 'singapore', label: 'Singapore 🇸🇬' },
    { id: 'langkawi', label: 'Langkawi 🇲🇾' },
    { id: 'dubai', label: 'Dubai 🇦🇪' },
  ];

  const getPriorityBadge = (priority) => {
    const badges = {
      'must-do': { label: 'Must Do!', color: 'bg-red-500 text-white' },
      'recommended': { label: 'Recommended', color: 'bg-blue-500 text-white' },
      'optional': { label: 'Optional', color: 'bg-gray-400 text-white' },
      'fun': { label: 'Fun!', color: 'bg-purple-500 text-white' },
      'cultural': { label: 'Cultural', color: 'bg-green-500 text-white' },
      'special-occasion': { label: 'Special', color: 'bg-pink-500 text-white' },
      'instagram': { label: 'Insta-worthy', color: 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' },
      'nye-recommended': { label: 'NYE Pick!', color: 'bg-yellow-500 text-black' },
      'nye-option': { label: 'NYE Option', color: 'bg-yellow-400 text-black' },
    };
    return badges[priority] || { label: priority, color: 'bg-gray-300 text-gray-800' };
  };

  const filterTips = (categoryData) => {
    if (!categoryData) return [];
    
    return categoryData.filter((tip) => {
      const matchesSearch = searchTerm === '' || 
        tip.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tip.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tip.category?.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesPriority = priorityFilter === 'all' || tip.priority === priorityFilter;
      
      return matchesSearch && matchesPriority;
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-xl text-gray-600">Loading tips...</div>
      </div>
    );
  }

  if (!tips) {
    return (
      <div className="card bg-red-50">
        <p className="text-red-800">Error loading tips data.</p>
      </div>
    );
  }

  const currentDestTips = tips[activeDestination];
  
  const categories = currentDestTips ? Object.keys(currentDestTips) : [];
  const allCategories = [
    { id: 'all', label: 'Alles', icon: '🌟' },
    { id: 'restaurants', label: 'Restaurants', icon: '🍜' },
    { id: 'nightlife', label: 'Nightlife', icon: '🍹' },
    { id: 'activities', label: 'Activiteiten', icon: '🎯' },
    { id: 'beaches', label: 'Stranden', icon: '🏖️' },
    { id: 'sights', label: 'Bezienswaardigheden', icon: '📸' },
    { id: 'cafes', label: 'Cafés', icon: '☕' },
    { id: 'practical', label: 'Praktisch', icon: '💡' },
    { id: 'dining', label: 'Dining', icon: '🍽️' },
  ].filter(cat => cat.id === 'all' || categories.includes(cat.id));

  let filteredTips = [];
  if (activeCategory === 'all') {
    categories.forEach(cat => {
      if (cat !== 'practical') {
        const categoryTips = filterTips(currentDestTips[cat]);
        filteredTips.push(...categoryTips.map(tip => ({ ...tip, categoryName: cat })));
      }
    });
  } else {
    filteredTips = filterTips(currentDestTips[activeCategory]);
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">🍜 Tips & Restaurants Database</h1>
        <p className="text-gray-600">Alle aanbevelingen van vrienden en locals</p>
      </div>

      {/* Destination Tabs */}
      <div className="flex flex-wrap gap-2 bg-white p-4 rounded-lg shadow-md">
        {destinations.map((dest) => (
          <button
            key={dest.id}
            onClick={() => {
              setActiveDestination(dest.id);
              setActiveCategory('all');
              setSearchTerm('');
            }}
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

      {/* Filters */}
      <div className="card space-y-4">
        {/* Search */}
        <div>
          <label className="block text-sm font-semibold mb-2">🔍 Zoeken</label>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Zoek op naam, beschrijving, categorie..."
            className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-primary-500 focus:outline-none"
          />
        </div>

        {/* Category Filter */}
        <div>
          <label className="block text-sm font-semibold mb-2">📂 Categorie</label>
          <div className="flex flex-wrap gap-2">
            {allCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${
                  activeCategory === cat.id
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {cat.icon} {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Priority Filter */}
        <div>
          <label className="block text-sm font-semibold mb-2">⭐ Prioriteit</label>
          <div className="flex flex-wrap gap-2">
            {['all', 'must-do', 'recommended', 'optional', 'nye-recommended'].map((priority) => (
              <button
                key={priority}
                onClick={() => setPriorityFilter(priority)}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${
                  priorityFilter === priority
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {priority === 'all' ? 'Alles' : priority.replace('-', ' ')}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="text-sm text-gray-600">
        {filteredTips.length} {filteredTips.length === 1 ? 'resultaat' : 'resultaten'}
      </div>

      {/* Tips Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {filteredTips.map((tip, idx) => {
          const priorityBadge = tip.priority ? getPriorityBadge(tip.priority) : null;
          
          return (
            <div key={tip.id || idx} className="card hover:shadow-xl transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-xl font-bold text-gray-900">{tip.name || tip.title}</h3>
                {priorityBadge && (
                  <span className={`px-2 py-1 rounded-full text-xs font-bold ${priorityBadge.color} whitespace-nowrap`}>
                    {priorityBadge.label}
                  </span>
                )}
              </div>

              {tip.category && (
                <p className="text-sm text-gray-600 mb-2">
                  🏷️ {tip.category}
                </p>
              )}

              {tip.location && (
                <p className="text-sm text-gray-600 mb-2">
                  📍 {tip.location}
                </p>
              )}

              {tip.area && (
                <p className="text-sm text-gray-600 mb-2">
                  📍 {tip.area}
                </p>
              )}

              <p className="text-gray-700 mb-3">{tip.description}</p>

              {/* Additional Info */}
              <div className="space-y-2">
                {tip.dishes && tip.dishes.length > 0 && (
                  <div className="text-sm">
                    <span className="font-semibold">🍽️ Aanraders:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {tip.dishes.map((dish, i) => (
                        <span key={i} className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs">
                          {dish}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {tip.priceRange && (
                  <p className="text-sm">
                    <span className="font-semibold">💰 Prijs:</span> {tip.priceRange}
                  </p>
                )}

                {tip.difficulty && (
                  <p className="text-sm">
                    <span className="font-semibold">🥾 Moeilijkheid:</span> {tip.difficulty}
                  </p>
                )}

                {tip.duration && (
                  <p className="text-sm">
                    <span className="font-semibold">⏱️ Duur:</span> {tip.duration}
                  </p>
                )}

                {tip.time && (
                  <p className="text-sm">
                    <span className="font-semibold">🕐 Tijd:</span> {tip.time}
                  </p>
                )}

                {tip.openingDays && (
                  <p className="text-sm">
                    <span className="font-semibold">📅 Open:</span> {tip.openingDays.join(', ')}
                  </p>
                )}

                {tip.tips && (
                  <div className="bg-blue-50 border-l-4 border-blue-400 p-3 text-sm">
                    <p className="font-semibold text-blue-900 mb-1">💡 Tip:</p>
                    <p className="text-blue-800">{tip.tips}</p>
                  </div>
                )}

                {tip.note && (
                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 text-sm">
                    <p className="font-semibold text-yellow-900 mb-1">📝 Note:</p>
                    <p className="text-yellow-800">{tip.note}</p>
                  </div>
                )}

                {tip.source && (
                  <p className="text-xs text-gray-500 italic">
                    Bron: {tip.source}
                  </p>
                )}

                {tip.website && (
                  <a
                    href={tip.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block text-sm text-primary-600 hover:text-primary-800 underline"
                  >
                    🔗 Website
                  </a>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {filteredTips.length === 0 && (
        <div className="card bg-gray-50 text-center py-12">
          <p className="text-gray-600 text-lg">Geen tips gevonden met deze filters 🤷‍♂️</p>
          <p className="text-gray-500 text-sm mt-2">Probeer andere zoektermen of filters</p>
        </div>
      )}

      {/* Practical Info Section */}
      {activeCategory === 'practical' && currentDestTips.practical && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">💡 Praktische Informatie</h2>
          {currentDestTips.practical.map((info, idx) => (
            <div key={idx} className="card bg-blue-50 border-2 border-blue-200">
              <h3 className="font-bold text-lg mb-2">{info.title}</h3>
              <p className="text-gray-700 mb-2">{info.description}</p>
              {info.url && (
                <a
                  href={info.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-600 hover:text-primary-800 underline text-sm"
                >
                  🔗 {info.url}
                </a>
              )}
              {info.deadline && (
                <p className="text-sm text-red-600 font-semibold mt-2">
                  ⚠️ Deadline: {info.deadline}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TipsDatabase;

