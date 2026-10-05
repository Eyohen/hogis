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
  clubLounge: img('1543007630-9710e4a00a20'), // bar/lounge interior

  cinemaScreen: img('1489599849927-2ee91cede3ba'),
  cinemaHall: img('1517604931442-7e0c8ed2963c'),

  banquetHall: img('1440404653325-ab127d49abc1'),
  gamesArcade: img('1550966871-3ed3cdb5ed0c'),
  gamesArcadeAlt: img('1519167758481-83f550bb49b3'),

  gym: img('1540497077202-7c8a3999166f'),
  spa: img('1570172619644-dfd03ed5d881'),
  cafe: img('1495474472287-4d71bcdd2085'),
  barbershop: img('1585747860715-2ba37e788b70'),
  rooftop: img('1540541338287-41700207dee6'),

  // Movie poster photography (real photos, not fabricated posters — these
  // are original fictional titles, so we avoid implying any real film).
  posterAction: img('1516450360452-9312f5e86fc7', 900), // concert crowd, stage lights
  posterDrama: img('1533105079780-92b9be482077', 900), // coastal cliffside town
  posterSciFi: img('1500462918059-b1a0cb512f1d', 900), // neon corridor
  posterComedy: img('1513151233558-d860c5398176', 900), // confetti burst
  posterHorror: img('1508921912186-1d1a45ebb3c1', 900), // figure on misty forest road
  posterFantasy: img('1441974231531-c6227db76b6e', 900), // sunlit forest path
};
