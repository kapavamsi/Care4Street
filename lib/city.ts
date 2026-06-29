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

// All 156 cities with their civic bodies
// Generated from database - includes 80+ countries
const CITIES: City[] = [
  // ============ INDIA (30 cities) ============
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

  // ============ EUROPE (30+ cities) ============
  { id: '31', city_name: 'London', country: 'UK', committee_name: 'TfL', lat: 51.5074, lng: -0.1278, radius_km: 50 },
  { id: '32', city_name: 'Manchester', country: 'UK', committee_name: 'MCC', lat: 53.4808, lng: -2.2426, radius_km: 50 },
  { id: '33', city_name: 'Birmingham', country: 'UK', committee_name: 'BCC', lat: 52.4862, lng: -1.8904, radius_km: 50 },
  { id: '34', city_name: 'Edinburgh', country: 'UK', committee_name: 'CEC', lat: 55.9533, lng: -3.1883, radius_km: 50 },
  { id: '35', city_name: 'Glasgow', country: 'UK', committee_name: 'GCC', lat: 55.8642, lng: -4.2518, radius_km: 50 },
  { id: '36', city_name: 'Paris', country: 'France', committee_name: 'Ville de Paris', lat: 48.8566, lng: 2.3522, radius_km: 50 },
  { id: '37', city_name: 'Berlin', country: 'Germany', committee_name: 'Senate Department', lat: 52.5200, lng: 13.4050, radius_km: 50 },
  { id: '38', city_name: 'Munich', country: 'Germany', committee_name: 'Muenchner Stadt', lat: 48.1351, lng: 11.5820, radius_km: 50 },
  { id: '39', city_name: 'Hamburg', country: 'Germany', committee_name: 'Hamburg City', lat: 53.5511, lng: 9.9937, radius_km: 50 },
  { id: '40', city_name: 'Rome', country: 'Italy', committee_name: 'Roma Capitale', lat: 41.9028, lng: 12.4964, radius_km: 50 },
  { id: '41', city_name: 'Milan', country: 'Italy', committee_name: 'Comune di Milano', lat: 45.4642, lng: 9.1900, radius_km: 50 },
  { id: '42', city_name: 'Amsterdam', country: 'Netherlands', committee_name: 'Gemeente Amsterdam', lat: 52.3676, lng: 4.9041, radius_km: 50 },
  { id: '43', city_name: 'Barcelona', country: 'Spain', committee_name: 'Ajuntament de Barcelona', lat: 41.3851, lng: 2.1734, radius_km: 50 },
  { id: '44', city_name: 'Madrid', country: 'Spain', committee_name: 'Ayuntamiento de Madrid', lat: 40.4168, lng: -3.7038, radius_km: 50 },
  { id: '45', city_name: 'Lisbon', country: 'Portugal', committee_name: 'Camara Municipal de Lisboa', lat: 38.7223, lng: -9.1393, radius_km: 50 },
  { id: '46', city_name: 'Vienna', country: 'Austria', committee_name: 'Stadt Wien', lat: 48.2082, lng: 16.3738, radius_km: 50 },
  { id: '47', city_name: 'Zurich', country: 'Switzerland', committee_name: 'Stadt Zurich', lat: 47.3769, lng: 8.5417, radius_km: 50 },
  { id: '48', city_name: 'Geneva', country: 'Switzerland', committee_name: 'Ville de Geneve', lat: 46.2044, lng: 6.1432, radius_km: 50 },
  { id: '49', city_name: 'Brussels', country: 'Belgium', committee_name: 'Bruxelles-Ville', lat: 50.8503, lng: 4.3517, radius_km: 50 },
  { id: '50', city_name: 'Stockholm', country: 'Sweden', committee_name: 'Stockholms stad', lat: 59.3293, lng: 18.0686, radius_km: 50 },
  { id: '51', city_name: 'Oslo', country: 'Norway', committee_name: 'Oslo Kommune', lat: 59.9139, lng: 10.7522, radius_km: 50 },
  { id: '52', city_name: 'Copenhagen', country: 'Denmark', committee_name: 'Kobenhavns Kommune', lat: 55.6761, lng: 12.5683, radius_km: 50 },
  { id: '53', city_name: 'Helsinki', country: 'Finland', committee_name: 'Helsingin kaupunki', lat: 60.1699, lng: 24.9384, radius_km: 50 },
  { id: '54', city_name: 'Dublin', country: 'Ireland', committee_name: 'Dublin City Council', lat: 53.3498, lng: -6.2603, radius_km: 50 },
  { id: '55', city_name: 'Prague', country: 'Czech Republic', committee_name: 'Hlavni mesto Praha', lat: 50.0755, lng: 14.4378, radius_km: 50 },
  { id: '56', city_name: 'Warsaw', country: 'Poland', committee_name: 'Miasto Stoleczne Warszawa', lat: 52.2297, lng: 21.0122, radius_km: 50 },
  { id: '57', city_name: 'Budapest', country: 'Hungary', committee_name: 'Budapest Fovaros', lat: 47.4979, lng: 19.0402, radius_km: 50 },
  { id: '58', city_name: 'Athens', country: 'Greece', committee_name: 'Dimos Athinaion', lat: 37.9838, lng: 23.7275, radius_km: 50 },
  { id: '59', city_name: 'Belgrade', country: 'Serbia', committee_name: 'City of Belgrade', lat: 44.7866, lng: 20.4489, radius_km: 50 },
  { id: '60', city_name: 'Sofia', country: 'Bulgaria', committee_name: 'Sofia Municipality', lat: 42.6977, lng: 23.3219, radius_km: 50 },
  { id: '61', city_name: 'Bucharest', country: 'Romania', committee_name: 'PMB', lat: 44.4268, lng: 26.1025, radius_km: 50 },
  { id: '62', city_name: 'Zagreb', country: 'Croatia', committee_name: 'Grad Zagreb', lat: 45.8150, lng: 15.9819, radius_km: 50 },
  { id: '63', city_name: 'Ljubljana', country: 'Slovenia', committee_name: 'MOL', lat: 46.0569, lng: 14.5058, radius_km: 50 },
  { id: '64', city_name: 'Bratislava', country: 'Slovakia', committee_name: 'Hlavne mesto SR', lat: 48.1486, lng: 17.1077, radius_km: 50 },
  { id: '65', city_name: 'Tallinn', country: 'Estonia', committee_name: 'Tallinna Linn', lat: 59.4370, lng: 24.7536, radius_km: 50 },
  { id: '66', city_name: 'Riga', country: 'Latvia', committee_name: 'Rigas Dome', lat: 56.9496, lng: 24.1052, radius_km: 50 },
  { id: '67', city_name: 'Vilnius', country: 'Lithuania', committee_name: 'Vilniaus Miestas', lat: 54.6872, lng: 25.2797, radius_km: 50 },

  // ============ USA (4 cities) ============
  { id: '68', city_name: 'New York', country: 'USA', committee_name: 'NYC DOT', lat: 40.7128, lng: -74.0060, radius_km: 50 },
  { id: '69', city_name: 'Los Angeles', country: 'USA', committee_name: 'LA DOT', lat: 34.0522, lng: -118.2437, radius_km: 50 },
  { id: '70', city_name: 'Chicago', country: 'USA', committee_name: 'CDOT', lat: 41.8781, lng: -87.6298, radius_km: 50 },
  { id: '71', city_name: 'Houston', country: 'USA', committee_name: 'HDOT', lat: 29.7604, lng: -95.3698, radius_km: 50 },

  // ============ Canada (2 cities) ============
  { id: '72', city_name: 'Toronto', country: 'Canada', committee_name: 'City of Toronto', lat: 43.6532, lng: -79.3832, radius_km: 50 },
  { id: '73', city_name: 'Vancouver', country: 'Canada', committee_name: 'CoV', lat: 49.2827, lng: -123.1207, radius_km: 50 },

  // ============ Australia (5 cities) ============
  { id: '74', city_name: 'Sydney', country: 'Australia', committee_name: 'Transport NSW', lat: -33.8688, lng: 151.2093, radius_km: 50 },
  { id: '75', city_name: 'Melbourne', country: 'Australia', committee_name: 'DoT VIC', lat: -37.8136, lng: 144.9631, radius_km: 50 },
  { id: '76', city_name: 'Brisbane', country: 'Australia', committee_name: 'BCC', lat: -27.4698, lng: 153.0251, radius_km: 50 },
  { id: '77', city_name: 'Perth', country: 'Australia', committee_name: 'City of Perth', lat: -31.9505, lng: 115.8605, radius_km: 50 },
  { id: '78', city_name: 'Adelaide', country: 'Australia', committee_name: 'City of Adelaide', lat: -34.9285, lng: 138.6007, radius_km: 50 },

  // ============ Asia Pacific ============
  { id: '79', city_name: 'Singapore', country: 'Singapore', committee_name: 'LTA', lat: 1.3521, lng: 103.8198, radius_km: 50 },
  { id: '80', city_name: 'Kuala Lumpur', country: 'Malaysia', committee_name: 'DBKL', lat: 3.1390, lng: 101.6869, radius_km: 50 },
  { id: '81', city_name: 'Jakarta', country: 'Indonesia', committee_name: 'DKI', lat: -6.2088, lng: 106.8456, radius_km: 50 },
  { id: '82', city_name: 'Manila', country: 'Philippines', committee_name: 'MMDA', lat: 14.5995, lng: 120.9842, radius_km: 50 },
  { id: '83', city_name: 'Bangkok', country: 'Thailand', committee_name: 'BMA', lat: 13.7563, lng: 100.5018, radius_km: 50 },

  // ============ East Asia ============
  { id: '84', city_name: 'Tokyo', country: 'Japan', committee_name: 'MLIT', lat: 35.6762, lng: 139.6503, radius_km: 50 },
  { id: '85', city_name: 'Osaka', country: 'Japan', committee_name: 'Osaka City', lat: 34.6937, lng: 135.5023, radius_km: 50 },
  { id: '86', city_name: 'Seoul', country: 'South Korea', committee_name: 'SMG', lat: 37.5665, lng: 126.9780, radius_km: 50 },
  { id: '87', city_name: 'Busan', country: 'South Korea', committee_name: 'Busan Metropolitan', lat: 35.1796, lng: 129.0756, radius_km: 50 },
  { id: '88', city_name: 'Shanghai', country: 'China', committee_name: 'SMG', lat: 31.2304, lng: 121.4737, radius_km: 50 },
  { id: '89', city_name: 'Beijing', country: 'China', committee_name: 'BMG', lat: 39.9042, lng: 116.4074, radius_km: 50 },
  { id: '90', city_name: 'Guangzhou', country: 'China', committee_name: 'Guangzhou Municipal', lat: 23.1291, lng: 113.2644, radius_km: 50 },
  { id: '91', city_name: 'Shenzhen', country: 'China', committee_name: 'Shenzhen Municipal', lat: 22.5431, lng: 114.0579, radius_km: 50 },
  { id: '92', city_name: 'Hong Kong', country: 'Hong Kong', committee_name: 'HK Gov', lat: 22.3193, lng: 114.1694, radius_km: 50 },

  // ============ Middle East ============
  { id: '93', city_name: 'Dubai', country: 'UAE', committee_name: 'RTA', lat: 25.2048, lng: 55.2708, radius_km: 50 },
  { id: '94', city_name: 'Abu Dhabi', country: 'UAE', committee_name: 'DoT', lat: 24.4539, lng: 54.3773, radius_km: 50 },
  { id: '95', city_name: 'Riyadh', country: 'Saudi Arabia', committee_name: 'Riyadh Municipality', lat: 24.7136, lng: 46.6753, radius_km: 50 },
  { id: '96', city_name: 'Jeddah', country: 'Saudi Arabia', committee_name: 'Jeddah Municipality', lat: 21.4858, lng: 39.1925, radius_km: 50 },
  { id: '97', city_name: 'Doha', country: 'Qatar', committee_name: 'Ministry of Municipality', lat: 25.2854, lng: 51.5310, radius_km: 50 },
  { id: '98', city_name: 'Tel Aviv', country: 'Israel', committee_name: 'Tel Aviv-Yafo', lat: 32.0853, lng: 34.7818, radius_km: 50 },
  { id: '99', city_name: 'Jerusalem', country: 'Israel', committee_name: 'Jerusalem Municipality', lat: 31.7683, lng: 35.2137, radius_km: 50 },
  { id: '100', city_name: 'Kuwait City', country: 'Kuwait', committee_name: 'Kuwait Municipality', lat: 29.3759, lng: 47.9774, radius_km: 50 },
  { id: '101', city_name: 'Muscat', country: 'Oman', committee_name: 'Muscat Municipality', lat: 23.5880, lng: 58.3829, radius_km: 50 },
  { id: '102', city_name: 'Manama', country: 'Bahrain', committee_name: 'Ministry of Works', lat: 26.2285, lng: 50.5860, radius_km: 50 },

  // ============ South Asia ============
  { id: '103', city_name: 'Colombo', country: 'Sri Lanka', committee_name: 'Colombo Municipal', lat: 6.9271, lng: 79.8612, radius_km: 50 },
  { id: '104', city_name: 'Kathmandu', country: 'Nepal', committee_name: 'Kathmandu Metropolitan', lat: 27.7172, lng: 85.3240, radius_km: 50 },
  { id: '105', city_name: 'Dhaka', country: 'Bangladesh', committee_name: 'Dhaka North City', lat: 23.8103, lng: 90.4125, radius_km: 50 },
  { id: '106', city_name: 'Islamabad', country: 'Pakistan', committee_name: 'ICT Administration', lat: 33.6844, lng: 73.0479, radius_km: 50 },
  { id: '107', city_name: 'Karachi', country: 'Pakistan', committee_name: 'Karachi Metropolitan', lat: 24.8607, lng: 67.0011, radius_km: 50 },
  { id: '108', city_name: 'Lahore', country: 'Pakistan', committee_name: 'Lahore Metropolitan', lat: 31.5204, lng: 74.3587, radius_km: 50 },

  // ============ Southeast Asia ============
  { id: '109', city_name: 'Hanoi', country: 'Vietnam', committee_name: 'Hanoi Peoples Committee', lat: 21.0278, lng: 105.8342, radius_km: 50 },
  { id: '110', city_name: 'Ho Chi Minh City', country: 'Vietnam', committee_name: 'HCMC Peoples Committee', lat: 10.8231, lng: 106.6297, radius_km: 50 },
  { id: '111', city_name: 'Phnom Penh', country: 'Cambodia', committee_name: 'Phnom Penh Municipality', lat: 11.5564, lng: 104.9282, radius_km: 50 },
  { id: '112', city_name: 'Vientiane', country: 'Laos', committee_name: 'Vientiane Capital', lat: 17.9757, lng: 102.6331, radius_km: 50 },
  { id: '113', city_name: 'Yangon', country: 'Myanmar', committee_name: 'YCDC', lat: 16.8661, lng: 96.1951, radius_km: 50 },

  // ============ Latin America ============
  { id: '114', city_name: 'Mexico City', country: 'Mexico', committee_name: 'SEDUVI', lat: 19.4326, lng: -99.1332, radius_km: 50 },
  { id: '115', city_name: 'Sao Paulo', country: 'Brazil', committee_name: 'CET', lat: -23.5505, lng: -46.6333, radius_km: 50 },
  { id: '116', city_name: 'Rio de Janeiro', country: 'Brazil', committee_name: 'CRJ', lat: -22.9068, lng: -43.1729, radius_km: 50 },
  { id: '117', city_name: 'Buenos Aires', country: 'Argentina', committee_name: 'GCBA', lat: -34.6037, lng: -58.3816, radius_km: 50 },
  { id: '118', city_name: 'Santiago', country: 'Chile', committee_name: 'Municipalidad de Santiago', lat: -33.4489, lng: -70.6693, radius_km: 50 },
  { id: '119', city_name: 'Lima', country: 'Peru', committee_name: 'Municipalidad de Lima', lat: -12.0464, lng: -77.0428, radius_km: 50 },
  { id: '120', city_name: 'Bogota', country: 'Colombia', committee_name: 'Alcaldia de Bogota', lat: 4.7110, lng: -74.0721, radius_km: 50 },
  { id: '121', city_name: 'Medellin', country: 'Colombia', committee_name: 'Alcaldia de Medellin', lat: 6.2442, lng: -75.5812, radius_km: 50 },
  { id: '122', city_name: 'Caracas', country: 'Venezuela', committee_name: 'Alcaldia de Caracas', lat: 10.4806, lng: -66.9036, radius_km: 50 },
  { id: '123', city_name: 'Quito', country: 'Ecuador', committee_name: 'Municipio de Quito', lat: -0.1807, lng: -78.4678, radius_km: 50 },
  { id: '124', city_name: 'La Paz', country: 'Bolivia', committee_name: 'GAMLP', lat: -16.5000, lng: -68.1500, radius_km: 50 },
  { id: '125', city_name: 'Asuncion', country: 'Paraguay', committee_name: 'Municipalidad de Asuncion', lat: -25.2637, lng: -57.5759, radius_km: 50 },
  { id: '126', city_name: 'Montevideo', country: 'Uruguay', committee_name: 'IM', lat: -34.9011, lng: -56.1645, radius_km: 50 },
  { id: '127', city_name: 'Panama City', country: 'Panama', committee_name: 'Alcaldia de Panama', lat: 8.9824, lng: -79.5199, radius_km: 50 },
  { id: '128', city_name: 'San Jose', country: 'Costa Rica', committee_name: 'Municipalidad de San Jose', lat: 9.9281, lng: -84.0907, radius_km: 50 },
  { id: '129', city_name: 'Guatemala City', country: 'Guatemala', committee_name: 'Municipalidad de Guatemala', lat: 14.6349, lng: -90.5069, radius_km: 50 },
  { id: '130', city_name: 'Managua', country: 'Nicaragua', committee_name: 'Alcaldia de Managua', lat: 12.1150, lng: -86.2362, radius_km: 50 },
  { id: '131', city_name: 'Tegucigalpa', country: 'Honduras', committee_name: 'Alcaldia de Tegucigalpa', lat: 14.0723, lng: -87.1921, radius_km: 50 },

  // ============ Africa ============
  { id: '132', city_name: 'Cairo', country: 'Egypt', committee_name: 'Cairo Governorate', lat: 30.0444, lng: 31.2357, radius_km: 50 },
  { id: '133', city_name: 'Alexandria', country: 'Egypt', committee_name: 'Alexandria Governorate', lat: 31.2001, lng: 29.9187, radius_km: 50 },
  { id: '134', city_name: 'Cape Town', country: 'South Africa', committee_name: 'City of Cape Town', lat: -33.9249, lng: 18.4241, radius_km: 50 },
  { id: '135', city_name: 'Johannesburg', country: 'South Africa', committee_name: 'City of Johannesburg', lat: -26.2041, lng: 28.0473, radius_km: 50 },
  { id: '136', city_name: 'Pretoria', country: 'South Africa', committee_name: 'City of Tshwane', lat: -25.7479, lng: 28.2293, radius_km: 50 },
  { id: '137', city_name: 'Lagos', country: 'Nigeria', committee_name: 'Lagos State', lat: 6.5244, lng: 3.3792, radius_km: 50 },
  { id: '138', city_name: 'Abuja', country: 'Nigeria', committee_name: 'FCT', lat: 9.0765, lng: 7.3986, radius_km: 50 },
  { id: '139', city_name: 'Nairobi', country: 'Kenya', committee_name: 'Nairobi City County', lat: -1.2921, lng: 36.8219, radius_km: 50 },
  { id: '140', city_name: 'Accra', country: 'Ghana', committee_name: 'Accra Metropolitan', lat: 5.6037, lng: -0.1870, radius_km: 50 },
  { id: '141', city_name: 'Casablanca', country: 'Morocco', committee_name: 'Casablanca-Settat', lat: 33.5731, lng: -7.5898, radius_km: 50 },
  { id: '142', city_name: 'Tunis', country: 'Tunisia', committee_name: 'Municipalite de Tunis', lat: 36.8065, lng: 10.1815, radius_km: 50 },
  { id: '143', city_name: 'Addis Ababa', country: 'Ethiopia', committee_name: 'Addis Ababa City', lat: 9.0320, lng: 38.7469, radius_km: 50 },
  { id: '144', city_name: 'Dakar', country: 'Senegal', committee_name: 'Ville de Dakar', lat: 14.7167, lng: -17.4677, radius_km: 50 },

  // ============ Caucasus & Central Asia ============
  { id: '145', city_name: 'Tbilisi', country: 'Georgia', committee_name: 'Tbilisi City Hall', lat: 41.7151, lng: 44.8271, radius_km: 50 },
  { id: '146', city_name: 'Baku', country: 'Azerbaijan', committee_name: 'Baku City Executive', lat: 40.4093, lng: 49.8671, radius_km: 50 },
  { id: '147', city_name: 'Yerevan', country: 'Armenia', committee_name: 'Yerevan Municipality', lat: 40.1792, lng: 44.4991, radius_km: 50 },
  { id: '148', city_name: 'Tashkent', country: 'Uzbekistan', committee_name: 'Tashkent City', lat: 41.2995, lng: 69.2401, radius_km: 50 },
  { id: '149', city_name: 'Almaty', country: 'Kazakhstan', committee_name: 'Almaty City', lat: 43.2220, lng: 76.8512, radius_km: 50 },
  { id: '150', city_name: 'Astana', country: 'Kazakhstan', committee_name: 'Astana City', lat: 51.1694, lng: 71.4491, radius_km: 50 },

  // ============ Oceania ============
  { id: '151', city_name: 'Auckland', country: 'New Zealand', committee_name: 'AT', lat: -36.8485, lng: 174.7633, radius_km: 50 },
  { id: '152', city_name: 'Wellington', country: 'New Zealand', committee_name: 'WCC', lat: -41.2865, lng: 174.7762, radius_km: 50 },

  // ============ Caribbean ============
  { id: '153', city_name: 'San Juan', country: 'Puerto Rico', committee_name: 'Municipio de San Juan', lat: 18.4663, lng: -66.1057, radius_km: 50 },
  { id: '154', city_name: 'Santo Domingo', country: 'Dominican Republic', committee_name: 'ADN', lat: 18.4861, lng: -69.9312, radius_km: 50 },
  { id: '155', city_name: 'Havana', country: 'Cuba', committee_name: 'La Habana', lat: 23.1136, lng: -82.3666, radius_km: 50 },
  { id: '156', city_name: 'Port-au-Prince', country: 'Haiti', committee_name: 'Mairie de Port-au-Prince', lat: 18.5944, lng: -72.3074, radius_km: 50 },
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
