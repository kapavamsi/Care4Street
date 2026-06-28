'use client';

import { useState, useEffect } from 'react';
import ReportModal from './components/ReportModal';
import Dashboard from './components/Dashboard';
import Map from './components/Map';

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleLocationClick = (lat: number, lng: number) => {
    setSelectedLocation({ lat, lng });
    setShowModal(true);
  };

  const handleReportSubmit = () => {
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  const handleCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setSelectedLocation({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude
          });
          setShowModal(true);
        },
        () => {
          setSelectedLocation({ lat: 12.9716, lng: 77.5946 });
          setShowModal(true);
        }
      );
    } else {
      setSelectedLocation({ lat: 12.9716, lng: 77.5946 });
      setShowModal(true);
    }
  };

  if (!isClient) {
    return (
      <div className="w-screen h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (showDashboard) {
    return (
      <div className="w-screen h-screen bg-gray-50">
        <div className="p-4 bg-white shadow-sm border-b border-gray-200 flex items-center justify-between">
          <button
            onClick={() => setShowDashboard(false)}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
          >
            ← Back to Map
          </button>
          <span className="font-bold text-gray-800">🏛️ BBMP Dashboard</span>
        </div>
        <Dashboard />
      </div>
    );
  }

  return (
    <main className="relative w-screen h-screen overflow-hidden">
      <Map onLocationClick={handleLocationClick} />

      {/* Top Banner */}
      <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-10 bg-white shadow-lg rounded-xl px-5 py-2.5 text-sm text-center max-w-sm border border-gray-100">
        <span className="font-bold text-gray-800">🏙️ Care4Street</span>
        <span className="text-gray-300 mx-2">|</span>
        <span className="text-gray-600">Bangalore</span>
      </div>

      {/* Report Button - Bottom Right */}
      <button
        onClick={handleCurrentLocation}
        className="fixed bottom-8 right-8 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3.5 rounded-full shadow-lg hover:shadow-xl transition-all z-10 flex items-center gap-2 font-medium"
      >
        <span className="text-xl">📸</span>
        Report Issue
      </button>

      {/* Dashboard Button - Bottom Left */}
      <button
        onClick={() => setShowDashboard(true)}
        className="fixed bottom-8 left-8 z-10 bg-purple-600 hover:bg-purple-700 text-white px-5 py-3.5 rounded-full shadow-lg hover:shadow-xl transition-all flex items-center gap-2 font-medium"
      >
        <span className="text-xl">🏛️</span>
        Dashboard
      </button>

      {showModal && selectedLocation && (
        <ReportModal
          lat={selectedLocation.lat}
          lng={selectedLocation.lng}
          onClose={() => setShowModal(false)}
          onSubmit={handleReportSubmit}
        />
      )}
    </main>
  );
}
