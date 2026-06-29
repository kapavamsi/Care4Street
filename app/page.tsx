'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import ReportModal from './components/ReportModal';
import Dashboard from './components/Dashboard';
import { getCityName, getCityCommittee } from '@/lib/city';

const Map = dynamic(() => import('./components/Map'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="mt-4 text-gray-600 font-medium">Loading map...</p>
      </div>
    </div>
  )
});

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [isClient, setIsClient] = useState(false);
  const [currentCity, setCurrentCity] = useState('Bangalore');
  const [currentCommittee, setCurrentCommittee] = useState('BBMP');

  useEffect(() => {
    setIsClient(true);
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const city = getCityName(pos.coords.latitude, pos.coords.longitude);
          const committee = getCityCommittee(pos.coords.latitude, pos.coords.longitude);
          setCurrentCity(city);
          setCurrentCommittee(committee);
        },
        () => {
          setCurrentCity('Bangalore');
          setCurrentCommittee('BBMP');
        }
      );
    }
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
          <span className="font-bold text-gray-800">
            🏛️ {currentCommittee} Dashboard
          </span>
        </div>
        <Dashboard />
      </div>
    );
  }

  return (
    <main className="relative w-screen h-screen overflow-hidden">
      <Map onLocationClick={handleLocationClick} />

      <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-10 bg-white shadow-lg rounded-xl px-5 py-2.5 text-sm text-center max-w-sm border border-gray-100">
        <span className="font-bold text-gray-800">🏙️ Care4Street</span>
        <span className="text-gray-300 mx-2">|</span>
        <span className="text-gray-600">{currentCity}</span>
        <span className="text-gray-400 text-xs ml-1">• {currentCommittee}</span>
      </div>

      <button
        onClick={handleCurrentLocation}
        className="fixed bottom-8 right-8 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3.5 rounded-full shadow-lg hover:shadow-xl transition-all z-10 flex items-center gap-2 font-medium"
      >
        <span className="text-xl">📸</span>
        Report Issue
      </button>

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
