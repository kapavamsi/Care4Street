'use client';

interface FilterButtonsProps {
  onFilter: (type: string) => void;
  activeFilter: string;
}

const FILTERS = [
  { value: 'all', label: 'All', emoji: '📍' },
  { value: 'pothole', label: 'Pothole', emoji: '🕳️' },
  { value: 'graffiti', label: 'Graffiti', emoji: '🎨' },
  { value: 'streetlight', label: 'Streetlight', emoji: '💡' },
  { value: 'tree', label: 'Tree', emoji: '🌳' },
  { value: 'broken_wires', label: 'Broken Wires', emoji: '⚡' },
  { value: 'waste_dump', label: 'Waste Dump', emoji: '🗑️' },
];

export default function FilterButtons({ onFilter, activeFilter }: FilterButtonsProps) {
  return (
    <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-10 flex gap-2 bg-white p-2 rounded-lg shadow-lg border border-gray-200">
      {FILTERS.map((filter) => (
        <button
          key={filter.value}
          onClick={() => onFilter(filter.value)}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
            activeFilter === filter.value
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {filter.emoji} {filter.label}
        </button>
      ))}
    </div>
  );
}
