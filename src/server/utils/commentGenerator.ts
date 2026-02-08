import { FindingsMap } from '../../shared/types/game';

const CTA_TEXT = '_Join the raid in the Pirate Chest Daily Challenge!_';

const WIN_HEADERS = [
  'Yo Ho Ho! 🏴‍☠️',
  `Who's The Captain Now? 👑`,
  'Drink Up, Me Hearties! 🍺',
  `Can't Beat The Old Salt! 🌊`,
  'Good Plunder, Aye! 🦜',
];

const WIN_BODIES = [
  'I cleaned the island dry!',
  'Magnificent haul!',
  'All loot is mine!',
  "I'm gonna need a bigger boat!",
];

const WIN_FOOTERS = [
  'Beat that, ye landlubbers!',
  'Can ye top this?',
  'Drinks on me!',
  'Top that, ye scallywags!',
];

const BOMB_HEADERS = [
  'Shiver Me Timbers! 💥',
  'Dead Men Tell No Tales ☠️',
  'Sink Me! ☠️',
  'Blow Me Down! 💣',
];

const BOMB_BODIES = [
  'I found the secret gunpowder stash... the hard way.',
  "So that wasn't a coconut... ouch.",
  'What scallywag put the bomb there?',
  'Found a bomb instead of gold. Bad trade.',
];

const BOMB_FOOTERS = [
  'Send help (and rum)!',
  'Anyone seen me wooden leg?',
  "Don't make me mistake, mates!",
  'Aaaarrrrgggghhhh!',
];

const LOSE_HEADERS = [
  'Why Is The Rum Gone?! 🍹',
  'Marooned! 🏝️',
  'Dry as a Bone 🦴',
  'Walk the Plank! ⚔️',
];

const LOSE_BODIES = [
  'Ran out of rum and the crew walked off',
  'Licking the barrel!',
  'Wandered in circles until the sun went down.',
  'Returned to the ship with nothing but sand in my boots.',
  'No prey, no pay.',
];

const LOSE_FOOTERS = ['Better fortune next tide.', 'Will work for grog.', 'I swear I was near.'];

const getRandomElement = (arr: string[]): string => {
  return arr[Math.floor(Math.random() * arr.length)] ?? '';
};

export const generatePirateComment = (
  username: string,
  score: number,
  isWin: boolean,
  wasBombed: boolean,
  moves: number,
  findings: FindingsMap
): string => {
  const parts: string[] = [];

  let headers: string[];
  let bodies: string[];
  let footers: string[];

  if (isWin) {
    headers = WIN_HEADERS;
    bodies = WIN_BODIES;
    footers = WIN_FOOTERS;
  } else if (wasBombed) {
    headers = BOMB_HEADERS;
    bodies = BOMB_BODIES;
    footers = BOMB_FOOTERS;
  } else {
    headers = LOSE_HEADERS;
    bodies = LOSE_BODIES;
    footers = LOSE_FOOTERS;
  }

  parts.push(getRandomElement(headers));
  parts.push(getRandomElement(bodies));

  const lootDetails: string[] = [];
  if (findings.chest > 0) lootDetails.push(`${findings.chest}x 📦`);
  if (findings.gold > 0) lootDetails.push(`${findings.gold}x 💰`);
  if (findings.coconut > 0) lootDetails.push(`${findings.coconut}x 🥥`);
  if (moves > 0) lootDetails.push(`${moves} 🍹`);

  const lootString = lootDetails.length > 0 ? lootDetails.join(' | ') : '';
  const statsString = `**Total Loot**: ${score}\n${lootString}`;

  parts.push(statsString);
  parts.push(getRandomElement(footers));

  parts.push(`⚓ **Captain:** u/${username}`);

  parts.push(CTA_TEXT);

  return parts.join('\n\n');
};
