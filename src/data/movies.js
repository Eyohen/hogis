export const MOVIES = [
  {
    id: 'ember-and-ash',
    title: 'Ember and Ash',
    genre: 'Action',
    duration: 128,
    rating: '16+',
    ticketPrice: 4500,
    synopsis:
      "A retired courier is pulled back into the underworld she escaped when her old crew resurfaces with one final job — and no way out.",
    poster: { icon: 'Flame', from: 'from-rose-600', to: 'to-orange-500' },
  },
  {
    id: 'the-last-tide',
    title: 'The Last Tide',
    genre: 'Drama',
    duration: 116,
    rating: 'PG-13',
    ticketPrice: 4000,
    synopsis:
      "Three siblings return to their childhood coastal home to settle their father's estate, and everything they never said to each other.",
    poster: { icon: 'Waves', from: 'from-sky-700', to: 'to-cyan-500' },
  },
  {
    id: 'midnight-frequency',
    title: 'Midnight Frequency',
    genre: 'Sci-Fi',
    duration: 134,
    rating: '16+',
    ticketPrice: 4800,
    synopsis:
      'A late-night radio host starts receiving signals from a version of her own show that hasn\'t aired yet.',
    poster: { icon: 'Radio', from: 'from-indigo-700', to: 'to-purple-500' },
  },
  {
    id: 'laugh-track',
    title: 'Laugh Track',
    genre: 'Comedy',
    duration: 98,
    rating: 'PG',
    ticketPrice: 3500,
    synopsis:
      "A washed-up sitcom writer is hired to punch up jokes for the wedding of his ex — who has no idea he still isn't over her.",
    poster: { icon: 'Laugh', from: 'from-amber-500', to: 'to-yellow-400' },
  },
  {
    id: 'the-quiet-house',
    title: 'The Quiet House',
    genre: 'Horror',
    duration: 104,
    rating: '18+',
    ticketPrice: 4200,
    synopsis:
      "A family moves into a house with one rule from the previous owner: never speak after sundown. They break it on the first night.",
    poster: { icon: 'Ghost', from: 'from-slate-800', to: 'to-slate-600' },
  },
  {
    id: 'crown-of-thistle',
    title: 'Crown of Thistle',
    genre: 'Fantasy',
    duration: 142,
    rating: '13+',
    ticketPrice: 5000,
    synopsis:
      'A blacksmith\'s daughter discovers she is the last heir to a throne that fell a generation ago — and the kingdom is not ready to be saved.',
    poster: { icon: 'Sword', from: 'from-emerald-800', to: 'to-emerald-500' },
  },
];

export const getMovieById = (id) => MOVIES.find((m) => m.id === id);
