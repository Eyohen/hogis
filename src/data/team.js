import ikeHenryPhoto from '../assets/Ike-Henry-headshot.jpg';

export const TEAM = [
  {
    tier: 'Leadership',
    name: 'Dr. Ikechukwu Henry Ukweh',
    role: 'Group Managing Director',
    credentials: 'MBBCH, MBA, FMCPH, PHD, KSC',
    photo: ikeHenryPhoto,
  },
  {
    tier: 'Leadership',
    name: 'Dr. Ofonime Ukweh',
    role: 'Deputy Managing Director',
    credentials: 'MBBCH, FWACS, FICS, MSc IR',
  },
  {
    tier: 'Management',
    name: 'Mr Christopher C. Obi',
    role: 'Internal Control Manager',
  },
  {
    tier: 'Management',
    name: 'Mr Zion Aboh',
    role: 'Business Development Manager',
  },
  {
    tier: 'Management',
    name: 'Mrs Veronica',
    role: 'Human Resource Manager',
  },
  {
    tier: 'Management',
    name: 'Mr Wisdom Ukam Ogbor',
    role: 'Media and Publicity',
  },
];

export const initials = (name) =>
  name
    .replace(/^(Dr\.|Mr|Mrs|Ms)\s+/i, '')
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0])
    .join('')
    .toUpperCase();
