# Hogis Group Platform Redesign — Design Spec

## Context

`hogis/` currently contains an unrelated project: "theythattestify," a
testimony-sharing platform (auth, admin dashboard, testimony CRUD). None of
its content, pages, or business logic relate to Hogis. This spec covers a
full rebuild of `src/` into a new hotel-and-cinema marketing + booking-demo
site for the Hogis Group, reusing only the existing build tooling (Vite,
React 18, Tailwind, React Router, Framer Motion, lucide-react).

`hogisserver/` (the backend) is out of scope entirely — this build has no
real backend. All booking flows are frontend-only simulations over static
mock data, built to demonstrate the UX beautifully, not to process real
payments or persist real reservations.

## Business model

Hogis Group operates three physical hotels:

- **Hogis Luxury** — swimming pool, lounge, VIP lounge, small restaurant
- **Hogis Royale** — club, cinema, games arcade, restaurant, banquet hall,
  lounge (the cinema lives here and nowhere else)
- **Hogis Kings Court** — lounge, restaurant

Each hotel has its own amenities and its own room inventory (2–3 realistic
room types each, e.g. Standard / Deluxe / Executive Suite, with price,
capacity, and photos). Amenities other than rooms and cinema (club, games
arcade, banquet hall, VIP lounge, swimming pool, restaurants) are shown as
informational/showcase content — no booking flow for those.

## Information architecture

- **Home** — group hero, showcase of all 3 properties, quick links to
  "Book a Room" and "Book Cinema Tickets"
- **Hotels** (nav, dropdown or listing page) → 3 hotel detail pages
  (`/hotels/:slug`), each with amenities + room grid + "Book Now" per room
- **Cinema** (standalone top-level nav item, since it's the standout
  feature) → now-showing grid (`/cinema`) → movie detail + showtimes
  (`/cinema/movie/:id`) → booking wizard (`/cinema/book`)
- **About**, **Contact**

## Visual design system

- **Palette**:
  - `emerald-900` `#0b3d2e` — primary brand color, headers, primary buttons
  - `charcoal-950` `#12130f` — dark section backgrounds (cinema band, footer)
  - `gold-500` `#c9a227` — accent: CTAs, active states, highlights
  - `cream-50` `#faf7f0` — light section backgrounds
  - `stone-700` `#44433d` — body text on light backgrounds
- **Type**: Fraunces for display/headings, Inter for body text (both via
  Google Fonts).
- **Mood**: modern luxury resort — full-bleed photography, generous
  whitespace, subtle fade/slide-in motion via Framer Motion on scroll.
  Cinema-related sections may lean slightly darker/moodier (dark band with
  gold marquee accents) while staying inside the same overall palette so
  the two halves of the brand feel like one system.
- Tokens defined in `tailwind.config.js` (colors, font families) and
  `index.css` (CSS custom properties, base styles).

## Pages & components

### Pages
- `Home.jsx`
- `Hotels.jsx` (grid of 3 property cards)
- `HotelDetail.jsx` (`/hotels/:slug` — amenities list + room grid)
- `Cinema.jsx` (now-showing movie grid)
- `MovieDetail.jsx` (`/cinema/movie/:id` — synopsis + showtime list)
- `About.jsx`
- `Contact.jsx`
- `HotelBooking.jsx` (`/hotels/:slug/book` — wizard)
- `CinemaBooking.jsx` (`/cinema/book` — wizard)
- `NotFound.jsx`

### Shared components
- `Navbar` (Hotels dropdown + Cinema link + About/Contact, mobile menu)
- `Footer`
- `Layout` (wraps pages with Navbar/Footer)
- Primitives: `Button`, `Card`, `Badge`, `Modal`, `StepIndicator`
- Booking-specific: `RangeCalendar` (month-grid, range select, used by hotel
  wizard), `DateStrip` (horizontal scrollable day picker, used by cinema
  wizard), `SeatMap`, `MockPaymentCard`, `BookingConfirmation`

### Mock data (`src/data/`)
- `hotels.js` — 3 hotels: name, slug, description, amenities[], images[],
  rooms[] (id, name, price/night, capacity, images[], description)
- `movies.js` — ~6 movies: title, poster, synopsis, duration, rating
- `showtimes.js` — showtimes per movie per date (next 14 days), each with
  time, screen, ticket price, and a small set of pre-taken seat IDs

## Booking flow detail

### Hotel wizard (`/hotels/:slug/book`, entered from a room's "Book Now")
1. **Dates** — custom `RangeCalendar`: two months side-by-side on desktop,
   one on mobile; check-in/check-out range selection with hover-preview;
   disabled past dates; a handful of dates styled as "unavailable" (mock);
   adults/children/room-quantity steppers; live nights × rate subtotal.
2. **Guest details** — name, email, phone, special requests textarea
   (client-side validated).
3. **Payment (mocked)** — animated credit-card visual that updates live as
   the user types (number/expiry/name via `MockPaymentCard`); "Pay Now"
   triggers a simulated ~1.5s loading state. No real payment processing.
4. **Confirmation** — success check animation, generated booking
   reference, full summary card (hotel, room, dates, nights, total, guest
   name).

### Cinema wizard (`/cinema/book`, entered from a movie's showtime)
1. **Showtime** — `DateStrip` (next 14 days) + showtime chips for the
   selected date, scoped to the movie chosen on its detail page.
2. **Seats** — `SeatMap`: curved "screen" indicator, rows A–J, click to
   toggle, some seats pre-taken (from mock data), max-seats limit, live
   price = seat count × ticket price.
3. **Guest details** — name, email, phone.
4. **Payment (mocked)** — same `MockPaymentCard` component.
5. **Confirmation** — e-ticket-style card (movie thumbnail, seats,
   showtime, reference) via the shared `BookingConfirmation` shell.

Both wizards share `StepIndicator`, `MockPaymentCard`, and
`BookingConfirmation`, feeding them flow-specific summary data. Each wizard
owns its own state via React Context + `useReducer`
(`HotelBookingContext`, `CinemaBookingContext`) scoped to that route; state
is in-memory only and resets on navigation away.

## Out of scope
- Real backend integration (`hogisserver/` untouched)
- Real payment processing
- Accounts/auth/login
- Booking flows for club, games arcade, banquet hall, VIP lounge, swimming
  pool (showcase-only)
- Admin dashboard

## Cleanup as part of this work
- Delete `src/pages/*`, `src/pages/admin/*`, `src/context/*`,
  `src/components/*` (old Navbar/Footer/DashboardLayout/ProductCard),
  unrelated assets (stadium/coach/testimony images) from the old app.
- Remove unused dependencies from `package.json`: `coinley-checkout`,
  `coinley-sdk`, `web3`, `react-paystack`, `qrcode.react`, `recharts`,
  `lodash`, `axios`, `react-icons`, `dotenv`. Add `date-fns`.
- Keep: `package.json`/tooling configs (`vite.config.js`,
  `tailwind.config.js`, `postcss.config.js`, `eslint.config.js`),
  `index.html`, `public/` (favicon may be replaced with a Hogis mark if one
  isn't available — placeholder acceptable for now).

## Testing / verification approach
No backend, so no integration tests against real services. Verification is
manual-in-browser plus basic component sanity:
- `npm run lint` clean
- `npm run build` succeeds
- Manual walkthrough in dev server of both booking wizards end-to-end
  (dates/showtime → details → mock payment → confirmation), checking
  responsive behavior at mobile and desktop widths, and that calendar
  range/disabled-date logic and seat-map selection behave correctly.
