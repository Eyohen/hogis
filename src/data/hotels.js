import { addDays, format } from 'date-fns';
import { IMAGES } from './images';
import { hashString, mulberry32 } from '../lib/prng';

export const HOTELS = [
  {
    slug: 'hogis-luxury',
    name: 'Hogis Luxury Suites',
    tagline: 'Serene stays, elevated living',
    phone: '0813 957 7321',
    heroImage: IMAGES.luxuryBuilding,
    description:
      "Hogis Luxury Suites is our tranquil flagship retreat — built for guests who want a hotel that feels like an escape. Unwind by the pool, work out in the gym, or slip into the Voltage Lounge for a quieter evening.",
    features: ['Rooms', 'Restaurant', 'Swimming Pool', 'Business & VIP Lounge', 'Fitness (Gym)', 'Voltage Lounge', 'Café', 'Barbershop', 'Hall'],
    amenities: [
      { name: 'Swimming Pool', icon: 'Waves', image: IMAGES.pool },
      { name: 'Restaurant', icon: 'UtensilsCrossed', image: IMAGES.restaurant },
      { name: 'Business & VIP Lounge', icon: 'Briefcase', image: IMAGES.vipLounge },
      { name: 'Fitness (Gym)', icon: 'Dumbbell', image: IMAGES.gym },
      { name: 'Voltage Lounge', icon: 'Zap', image: IMAGES.lounge },
      { name: 'Café', icon: 'Coffee', image: IMAGES.cafe },
      { name: 'Barbershop', icon: 'Scissors', image: IMAGES.barbershop },
      { name: 'Hall', icon: 'Building2', image: IMAGES.banquetHall },
    ],
    rooms: [
      {
        id: 'lux-standard',
        name: 'Standard Room',
        pricePerNight: 45000,
        capacity: 2,
        size: '28 sqm',
        image: IMAGES.roomStandard,
        description: 'A calm, well-appointed room with a queen bed and garden view — ideal for a comfortable short stay.',
        perks: ['Queen bed', 'Free Wi-Fi', 'Garden view', 'Air conditioning'],
      },
      {
        id: 'lux-deluxe',
        name: 'Deluxe Room',
        pricePerNight: 68000,
        capacity: 2,
        size: '36 sqm',
        image: IMAGES.roomDeluxe,
        description: 'More space, a king bed, and a private balcony overlooking the pool.',
        perks: ['King bed', 'Pool-view balcony', 'Free Wi-Fi', 'Minibar'],
      },
      {
        id: 'lux-executive-suite',
        name: 'Executive Suite',
        pricePerNight: 110000,
        capacity: 3,
        size: '58 sqm',
        image: IMAGES.roomSuite,
        description: 'A separate living area, premium finishes, and VIP lounge access included.',
        perks: ['King bed + living area', 'VIP lounge access', 'Complimentary breakfast', 'Bathtub'],
      },
    ],
  },
  {
    slug: 'hogis-royale',
    name: 'Hogis Royale and Apartments',
    tagline: 'Where every night is an event',
    phone: '0707 353 6464',
    heroImage: IMAGES.royaleBuilding,
    description:
      "Hogis Royale and Apartments is the group's entertainment flagship — home to Hogis Cinema, Club Voltage, a games arcade, and a grill lounge for the city's biggest nights out. Stay for the rooms, come alive for everything else.",
    features: ['Rooms', 'Restaurant', 'Hall', 'Club Voltage', 'Games Arcade', 'Cinema', 'Grill Lounge (Indoor/Outdoor)'],
    amenities: [
      { name: 'Cinema', icon: 'Clapperboard', image: IMAGES.cinemaHall },
      { name: 'Club Voltage', icon: 'PartyPopper', image: IMAGES.clubLounge },
      { name: 'Games Arcade', icon: 'Gamepad2', image: IMAGES.gamesArcade },
      { name: 'Restaurant', icon: 'UtensilsCrossed', image: IMAGES.restaurantDining },
      { name: 'Grill Lounge (Indoor/Outdoor)', icon: 'Flame', image: IMAGES.restaurantAlt },
      { name: 'Hall', icon: 'Building2', image: IMAGES.banquetHall },
    ],
    rooms: [
      {
        id: 'roy-standard',
        name: 'Standard Room',
        pricePerNight: 52000,
        capacity: 2,
        size: '30 sqm',
        image: IMAGES.roomAlt,
        description: 'Modern comfort, moments from the cinema and club floors.',
        perks: ['Queen bed', 'Free Wi-Fi', 'City view', 'Air conditioning'],
      },
      {
        id: 'roy-deluxe',
        name: 'Deluxe Room',
        pricePerNight: 79000,
        capacity: 2,
        size: '38 sqm',
        image: IMAGES.roomBed,
        description: 'A king bed and a lounge nook, with priority access to cinema bookings.',
        perks: ['King bed', 'Priority cinema access', 'Minibar', 'Free Wi-Fi'],
      },
      {
        id: 'roy-executive-suite',
        name: 'Executive Suite',
        pricePerNight: 135000,
        capacity: 4,
        size: '64 sqm',
        image: IMAGES.roomLuxury,
        description: 'Our most spacious suite, with a private lounge area and banquet-hall view.',
        perks: ['King bed + lounge', 'Banquet hall view', 'Complimentary breakfast', 'Butler service'],
      },
    ],
  },
  {
    slug: 'hogis-kings-court',
    name: 'Hogis Kings Court',
    tagline: 'Understated comfort, done right',
    phone: '0810 951 6906',
    heroImage: IMAGES.exterior,
    description:
      "Hogis Kings Court keeps things simple: comfortable rooms, a relaxed restaurant/lounge, and a rooftop worth staying in for. A quieter option for guests who want Hogis hospitality without the crowd.",
    features: ['Rooms', 'Restaurant/Lounge', 'Rooftop'],
    amenities: [
      { name: 'Restaurant/Lounge', icon: 'UtensilsCrossed', image: IMAGES.restaurantAlt },
      { name: 'Rooftop', icon: 'Sunset', image: IMAGES.rooftop },
    ],
    rooms: [
      {
        id: 'kc-standard',
        name: 'Standard Room',
        pricePerNight: 32000,
        capacity: 2,
        size: '26 sqm',
        image: IMAGES.roomBathroom,
        description: 'Simple, comfortable, and quiet — everything you need for a restful stay.',
        perks: ['Double bed', 'Free Wi-Fi', 'Air conditioning'],
      },
      {
        id: 'kc-deluxe',
        name: 'Deluxe Room',
        pricePerNight: 47000,
        capacity: 3,
        size: '33 sqm',
        image: IMAGES.roomExecutive,
        description: 'A larger room with a seating area, popular with families.',
        perks: ['Queen bed + sofa', 'Free Wi-Fi', 'Minibar'],
      },
    ],
  },
];

export const getHotelBySlug = (slug) => HOTELS.find((h) => h.slug === slug);
export const getRoomById = (hotel, roomId) => hotel?.rooms.find((r) => r.id === roomId);

// A handful of deterministic "already booked" dates over the next 60 days, per room.
export function getUnavailableDates(roomId) {
  const rand = mulberry32(hashString(roomId));
  const dates = new Set();
  for (let attempts = 0; dates.size < 6 && attempts < 100; attempts++) {
    dates.add(format(addDays(new Date(), 2 + Math.floor(rand() * 55)), 'yyyy-MM-dd'));
  }
  return [...dates];
}
