import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Dashboard from './components/Dashboard';
import ItineraryView from './components/ItineraryView';
import TipsDatabase from './components/TipsDatabase';
import FlightInfo from './components/FlightInfo';
import './App.css';

function App() {
  return (
    <Router basename="/reis-dashboard-2025">
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <main className="container mx-auto px-4 py-8 max-w-7xl">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/itinerary" element={<ItineraryView />} />
            <Route path="/tips" element={<TipsDatabase />} />
            <Route path="/flights" element={<FlightInfo />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
