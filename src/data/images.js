// Curated Unsplash photo IDs, wrapped with sizing/format params.
// Using stable direct CDN links (no attribution required for hotlinked demo use).
const img = (id, w = 1600) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

export const IMAGES = {
  heroExteriorNight: img('1445019980597-93fa8acb246c'),
  exterior: img('1568084680786-a84f91d1153c'),
  poolExterior: img('1582719508461-905c673771fd'),
  pool: img('1520250497591-112f2f40a3f4'),

  roomLuxury: img('1566073771259-6a8506099945'),
  roomBed: img('1551882547-ff40c63fe5fa'),
  roomSuite: img('1611892440504-42a792e24d32'),
  roomStandard: img('1590490360182-c33d57733427'),
  roomExecutive: img('1542314831-068cd1dbfeeb'),
  roomDeluxe: img('1470229722913-7c0e2dbbafd3'),
  roomBathroom: img('1584132967334-10e028bd69f7'),
  roomAlt: img('1591088398332-8a7791972843'),

  restaurant: img('1571003123894-1f0594d2b5d9'),
  restaurantDining: img('1517248135467-4c7edcad34c4'),
  restaurantAlt: img('1544161515-4ab6ce6db874'),

  lounge: img('1560347876-aeef00ee58a1'),
  vipLounge: img('1522708323590-d24dbb6b0267'),

  cinemaSeats: img('1543007630-9710e4a00a20'),
  cinemaScreen: img('1489599849927-2ee91cede3ba'),
  cinemaHall: img('1517604931442-7e0c8ed2963c'),

  banquetHall: img('1440404653325-ab127d49abc1'),
  gamesArcade: img('1550966871-3ed3cdb5ed0c'),
  gamesArcadeAlt: img('1519167758481-83f550bb49b3'),
};
