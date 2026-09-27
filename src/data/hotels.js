import { addDays, format } from 'date-fns';
import { IMAGES } from './images';

export const HOTELS = [
  {
    slug: 'hogis-luxury',
    name: 'Hogis Luxury',
    tagline: 'Serene stays, elevated living',
    heroImage: IMAGES.poolExterior,
    description:
      "Hogis Luxury is our tranquil flagship retreat — built for guests who want a hotel that feels like an escape. Unwind by the pool, catch up on work from the lounge, or slip into the VIP lounge for a quieter evening.",
    amenities: [
      { name: 'Swimming Pool', icon: 'Waves', image: IMAGES.pool },
      { name: 'Lounge', icon: 'Sofa', image: IMAGES.lounge },
      { name: 'VIP Lounge', icon: 'Sparkles', image: IMAGES.vipLounge },
      { name: 'Restaurant', icon: 'UtensilsCrossed', image: IMAGES.restaurant },
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
    name: 'Hogis Royale',
    tagline: 'Where every night is an event',
    heroImage: IMAGES.heroExteriorNight,
    description:
      "Hogis Royale is the group's entertainment flagship — home to the Hogis Cinema, a lively club, a games arcade, and a banquet hall for the city's biggest celebrations. Stay for the rooms, come alive for everything else.",
    amenities: [
      { name: 'Cinema', icon: 'Clapperboard', image: IMAGES.cinemaHall },
      { name: 'Club', icon: 'PartyPopper', image: IMAGES.lounge },
      { name: 'Games Arcade', icon: 'Gamepad2', image: IMAGES.gamesArcade },
      { name: 'Restaurant', icon: 'UtensilsCrossed', image: IMAGES.restaurantDining },
      { name: 'Banquet Hall', icon: 'PartyPopper', image: IMAGES.banquetHall },
      { name: 'Lounge', icon: 'Sofa', image: IMAGES.vipLounge },
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
    heroImage: IMAGES.exterior,
    description:
      "Hogis Kings Court keeps things simple: comfortable rooms, a relaxed lounge, and a restaurant worth staying in for. A quieter option for guests who want Hogis hospitality without the crowd.",
    amenities: [
      { name: 'Lounge', icon: 'Sofa', image: IMAGES.lounge },
      { name: 'Restaurant', icon: 'UtensilsCrossed', image: IMAGES.restaurantAlt },
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

function hashString(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

// A handful of deterministic "already booked" dates over the next 60 days, per room.
export function getUnavailableDates(roomId) {
  const seed = hashString(roomId);
  const dates = [];
  let cursor = seed;
  for (let i = 0; i < 6; i++) {
    cursor = (cursor * 1103515245 + 12345) & 0x7fffffff;
    dates.push(format(addDays(new Date(), 2 + (cursor % 55)), 'yyyy-MM-dd'));
  }
  return dates;
}
