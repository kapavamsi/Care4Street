'use client';

interface City {
  id: string;
  city_name: string;
  country: string;
  committee_name: string;
  lat: number;
  lng: number;
  radius_km: number;
}

// All 80+ cities with their civic bodies
const CITIES: City[] = [
  // ============ INDIA (30+ cities) ============
  { id: '1', city_name: 'Bangalore', country: 'India', committee_name: 'BBMP', lat: 12.9716, lng: 77.5946, radius_km: 50 },
  { id: '2', city_name: 'Mumbai', country: 'India', committee_name: 'MCGM', lat: 19.0760, lng: 72.8777, radius_km: 50 },
  { id: '3', city_name: 'Delhi', country: 'India', committee_name: 'MCD', lat: 28.6139, lng: 77.2090, radius_km: 50 },
  { id: '4', city_name: 'Chennai', country: 'India', committee_name: 'GCC', lat: 13.0827, lng: 80.2707, radius_km: 50 },
  { id: '5', city_name: 'Hyderabad', country: 'India', committee_name: 'GHMC', lat: 17.3850, lng: 78.4867, radius_km: 50 },
  { id: '6', city_name: 'Kolkata', country: 'India', committee_name: 'KMC', lat: 22.5726, lng: 88.3639, radius_km: 50 },
  { id: '7', city_name: 'Pune', country: 'India', committee_name: 'PMC', lat: 18.5204, lng: 73.8567, radius_km: 50 },
  { id: '8', city_name: 'Ahmedabad', country: 'India', committee_name: 'AMC', lat: 23.0225, lng: 72.5714, radius_km: 50 },
  { id: '9', city_name: 'Jaipur', country: 'India', committee_name: 'JMC', lat: 26.9124, lng: 75.7873, radius_km: 50 },
  { id: '10', city_name: 'Lucknow', country: 'India', committee_name: 'LMC', lat: 26.8467, lng: 80.9462, radius_km: 50 },
  { id: '11', city_name: 'Nagpur', country: 'India', committee_name: 'NMC', lat: 21.1458, lng: 79.0882, radius_km: 50 },
  { id: '12', city_name: 'Indore', country: 'India', committee_name: 'IMC', lat: 22.7196, lng: 75.8577, radius_km: 50 },
  { id: '13', city_name: 'Bhopal', country: 'India', committee_name: 'BMC', lat: 23.2599, lng: 77.4126, radius_km: 50 },
  { id: '14', city_name: 'Visakhapatnam', country: 'India', committee_name: 'GVMC', lat: 17.6868, lng: 83.2185, radius_km: 50 },
  { id: '15', city_name: 'Coimbatore', country: 'India', committee_name: 'CCMC', lat: 11.0168, lng: 76.9558, radius_km: 50 },
  { id: '16', city_name: 'Kochi', country: 'India', committee_name: 'GCDA', lat: 9.9312, lng: 76.2673, radius_km: 50 },
  { id: '17', city_name: 'Thiruvananthapuram', country: 'India', committee_name: 'TMC', lat: 8.5241, lng: 76.9366, radius_km: 50 },
  { id: '18', city_name: 'Chandigarh', country: 'India', committee_name: 'MCC', lat: 30.7333, lng: 76.7794, radius_km: 50 },
  { id: '19', city_name: 'Patna', country: 'India', committee_name: 'PMC', lat: 25.5941, lng: 85.1376, radius_km: 50 },
  { id: '20', city_name: 'Ranchi', country: 'India', committee_name: 'RMC', lat: 23.3441, lng: 85.3096, radius_km: 50 },
  { id: '21', city_name: 'Bhubaneswar', country: 'India', committee_name: 'BMC', lat: 20.2961, lng: 85.8245, radius_km: 50 },
  { id: '22', city_name: 'Guwahati', country: 'India', committee_name: 'GMC', lat: 26.1445, lng: 91.7362, radius_km: 50 },
  { id: '23', city_name: 'Mysore', country: 'India', committee_name: 'MCC', lat: 12.2958, lng: 76.6394, radius_km: 50 },
  { id: '24', city_name: 'Vijayawada', country: 'India', committee_name: 'VMC', lat: 16.5062, lng: 80.6480, radius_km: 50 },
  { id: '25', city_name: 'Madurai', country: 'India', committee_name: 'MMC', lat: 9.9252, lng: 78.1198, radius_km: 50 },
  { id: '26', city_name: 'Surat', country: 'India', committee_name: 'SMC', lat: 21.1702, lng: 72.8311, radius_km: 50 },
  { id: '27', city_name: 'Vadodara', country: 'India', committee_name: 'VMC', lat: 22.3072, lng: 73.1812, radius_km: 50 },
  { id: '28', city_name: 'Agra', country: 'India', committee_name: 'AMC', lat: 27.1767, lng: 78.0081, radius_km: 50 },
  { id: '29', city_name: 'Nashik', country: 'India', committee_name: 'NMC', lat: 19.9975, lng: 73.7898, radius_km: 50 },
  { id: '30', city_name: 'Faridabad', country: 'India', committee_name: 'FMC', lat: 28.4089, lng: 77.3178, radius_km: 50 },

  // ============ USA ============
  { id: '31', city_name: 'New York', country: 'USA', committee_name: 'NYC DOT', lat: 40.7128, lng: -74.0060, radius_km: 50 },
  { id: '32', city_name: 'Los Angeles', country: 'USA', committee_name: 'LA DOT', lat: 34.0522, lng: -118.2437, radius_km: 50 },
  { id: '33', city_name: 'Chicago', country: 'USA', committee_name: 'CDOT', lat: 41.8781, lng: -87.6298, radius_km: 50 },
  { id: '34', city_name: 'Houston', country: 'USA', committee_name: 'HDOT', lat: 29.7604, lng: -95.3698, radius_km: 50 },

  // ============ UK ============
  { id: '35', city_name: 'London', country: 'UK', committee_name: 'TfL', lat: 51.5074, lng: -0.1278, radius_km: 50 },
  { id: '36', city_name: 'Manchester', country: 'UK', committee_name: 'MCC', lat: 53.4808, lng: -2.2426, radius_km: 50 },
  { id: '37', city_name: 'Birmingham', country: 'UK', committee_name: 'BCC', lat: 52.4862, lng: -1.8904, radius_km: 50 },

  // ============ Australia ============
  { id: '38', city_name: 'Sydney', country: 'Australia', committee_name: 'Transport NSW', lat: -33.8688, lng: 151.2093, radius_km: 50 },
  { id: '39', city_name: 'Melbourne', country: 'Australia', committee_name: 'DoT VIC', lat: -37.8136, lng: 144.9631, radius_km: 50 },

  // ============ Canada ============
  { id: '40', city_name: 'Toronto', country: 'Canada', committee_name: 'City of Toronto', lat: 43.6532, lng: -79.3832, radius_km: 50 },
  { id: '41', city_name: 'Vancouver', country: 'Canada', committee_name: 'CoV', lat: 49.2827, lng: -123.1207, radius_km: 50 },

  // ============ France ============
  { id: '42', city_name: 'Paris', country: 'France', committee_name: 'Ville de Paris', lat: 48.8566, lng: 2.3522, radius_km: 50 },

  // ============ Germany ============
  { id: '43', city_name: 'Berlin', country: 'Germany', committee_name: 'Senate Department', lat: 52.5200, lng: 13.4050, radius_km: 50 },
  { id: '44', city_name: 'Munich', country: 'Germany', committee_name: 'Muenchner Stadt', lat: 48.1351, lng: 11.5820, radius_km: 50 },

  // ============ Italy ============
  { id: '45', city_name: 'Rome', country: 'Italy', committee_name: 'Roma Capitale', lat: 41.9028, lng: 12.4964, radius_km: 50 },
  { id: '46', city_name: 'Milan', country: 'Italy', committee_name: 'Comune di Milano', lat: 45.4642, lng: 9.1900, radius_km: 50 },

  // ============ Japan ============
  { id: '47', city_name: 'Tokyo', country: 'Japan', committee_name: 'MLIT', lat: 35.6762, lng: 139.6503, radius_km: 50 },
  { id: '48', city_name: 'Osaka', country: 'Japan', committee_name: 'Osaka City', lat: 34.6937, lng: 135.5023, radius_km: 50 },

  // ============ Asia-Pacific ============
  { id: '49', city_name: 'Singapore', country: 'Singapore', committee_name: 'LTA', lat: 1.3521, lng: 103.8198, radius_km: 50 },
  { id: '50', city_name: 'Kuala Lumpur', country: 'Malaysia', committee_name: 'DBKL', lat: 3.1390, lng: 101.6869, radius_km: 50 },
  { id: '51', city_name: 'Jakarta', country: 'Indonesia', committee_name: 'DKI', lat: -6.2088, lng: 106.8456, radius_km: 50 },
  { id: '52', city_name: 'Manila', country: 'Philippines', committee_name: 'MMDA', lat: 14.5995, lng: 120.9842, radius_km: 50 },
  { id: '53', city_name: 'Bangkok', country: 'Thailand', committee_name: 'BMA', lat: 13.7563, lng: 100.5018, radius_km: 50 },

  // ============ Middle East ============
  { id: '54', city_name: 'Dubai', country: 'UAE', committee_name: 'RTA', lat: 25.2048, lng: 55.2708, radius_km: 50 },
  { id: '55', city_name: 'Abu Dhabi', country: 'UAE', committee_name: 'DoT', lat: 24.4539, lng: 54.3773, radius_km: 50 },

  // ============ China ============
  { id: '56', city_name: 'Shanghai', country: 'China', committee_name: 'SMG', lat: 31.2304, lng: 121.4737, radius_km: 50 },
  { id: '57', city_name: 'Beijing', country: 'China', committee_name: 'BMG', lat: 39.9042, lng: 116.4074, radius_km: 50 },
  { id: '58', city_name: 'Hong Kong', country: 'Hong Kong', committee_name: 'HK Gov', lat: 22.3193, lng: 114.1694, radius_km: 50 },
  { id: '59', city_name: 'Taipei', country: 'Taiwan', committee_name: 'TCC', lat: 25.0330, lng: 121.5654, radius_km: 50 },

  // ============ South Korea ============
  { id: '60', city_name: 'Seoul', country: 'South Korea', committee_name: 'SMG', lat: 37.5665, lng: 126.9780, radius_km: 50 },

  // ============ Brazil ============
  { id: '61', city_name: 'Sao Paulo', country: 'Brazil', committee_name: 'CET', lat: -23.5505, lng: -46.6333, radius_km: 50 },
  { id: '62', city_name: 'Rio de Janeiro', country: 'Brazil', committee_name: 'CRJ', lat: -22.9068, lng: -43.1729, radius_km: 50 },

  // ============ Mexico ============
  { id: '63', city_name: 'Mexico City', country: 'Mexico', committee_name: 'SEDUVI', lat: 19.4326, lng: -99.1332, radius_km: 50 },

  // ============ New Zealand ============
  { id: '64', city_name: 'Auckland', country: 'New Zealand', committee_name: 'AT', lat: -36.8485, lng: 174.7633, radius_km: 50 },
  { id: '65', city_name: 'Wellington', country: 'New Zealand', committee_name: 'WCC', lat: -41.2865, lng: 174.7762, radius_km: 50 },
];

// Find nearest city based on coordinates
export function findNearestCity(lat: number, lng: number): City {
  let nearest = CITIES[0];
  let minDistance = Infinity;

  for (const city of CITIES) {
    const distance = calculateDistance(lat, lng, city.lat, city.lng);
    if (distance < minDistance) {
      minDistance = distance;
      nearest = city;
    }
  }

  return nearest;
}

// Get city name from coordinates
export function getCityName(lat: number, lng: number): string {
  const city = findNearestCity(lat, lng);
  return city.city_name;
}

// Get civic committee name from coordinates
export function getCityCommittee(lat: number, lng: number): string {
  const city = findNearestCity(lat, lng);
  return city.committee_name;
}

// Get full city object from coordinates
export function getCity(lat: number, lng: number): City {
  return findNearestCity(lat, lng);
}

// Get all cities
export function getAllCities(): City[] {
  return CITIES;
}

// Haversine formula for distance calculation (km)
function calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}
