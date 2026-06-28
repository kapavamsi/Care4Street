'use client';

import { useState } from 'react';

interface HeatmapToggleProps {
  onToggle: (enabled: boolean) => void;
}

export default function HeatmapToggle({ onToggle }: HeatmapToggleProps) {
  const [enabled, setEnabled] = useState(false);

  const handleToggle = () => {
    const newState = !enabled;
    setEnabled(newState);
    onToggle(newState);
  };

  return (
    <button
      onClick={handleToggle}
      className={`fixed top-20 left-1/2 transform -translate-x-1/2 z-10 px-4 py-2 rounded-lg shadow-lg text-sm font-medium transition-colors ${
        enabled 
          ? 'bg-purple-600 text-white hover:bg-purple-700' 
          : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
      }`}
    >
      {enabled ? '🔥 Heatmap: ON' : '🗺️ Show Heatmap'}
    </button>
  );
}
