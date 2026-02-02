import { FindingsMap } from '../../shared/types/game';


const getRandomTemplate = (templates: string[]) => {
  return templates[Math.floor(Math.random() * templates.length)] ?? '';
};

export const generatePirateComment = (
  score: number,
  isWin: boolean,
  wasBombed: boolean,
  moves: number,
  findings: FindingsMap
): string => {
  const lootList: string[] = [];
  if (findings.chest > 0) lootList.push(`${findings.chest}x 📦 Chests`);
  if (findings.gold > 0) lootList.push(`${findings.gold}x 💰 Gold`);
  if (findings.fish > 0) lootList.push(`${findings.fish}x 🐟 Fish`);

  const lootString = lootList.length > 0 ? lootList.join(', ') : 'Seaweed and salt';

  let commentText = '';

  if (isWin) {
    const templates = [
      `**Yo Ho Ho!** 🏴‍☠️\n\nI looted the entire island!\n💰 **Gold:** ${score}\n🍺 **Rum left:** ${moves}\n💎 **Booty:** ${lootString}\n\nBeat that, ye landlubbers!`,

      `**Who's The Captain Now?** 🦜\n\nAll loot is mine!\n💰 **Gold:** ${score}\n🍺 **Rum saved:** ${moves}\n💎 **Haul:** ${lootString}\n\nTop that, Scallywags!`,

      `**We're Gonna Need A Bigger Boat!** 🛥️\n\nWhat a haul! The crew is singing tonight!\n💰 **Score:** ${score}\n🍺 **Rum left:** ${moves}\n💎 **Loot:** ${lootString}\n\nCan ye do better?`
    ];
    commentText = getRandomTemplate(templates);

  } else if (wasBombed) {
    const templates = [
      `**Shiver Me Timbers!** 🧨\n\nSo that wasn't a coconut...\n☠️ **Gold** ${score}\n🎒 **Booty:** ${lootString}\n\nSend help (and rum)!`,

      `**Smoking Boots!** 💣\n\nFound a bomb instead of gold. Bad trade.\n☠️ **Gold:** ${score}\n🎒 **Pockets:** ${lootString}\n\nDon't make my mistake, mates!`,

      `**Blow Me Down!!** 🥾\n\nI found the secret gunpowder stash... the hard way.\n☠️ **Gold:** ${score}\n🎒 **Loot:** ${lootString}\n\nAnyone seen me wooden leg?`
    ];
    commentText = getRandomTemplate(templates);

  } else {
    const templates = [
      `**Licking The Barrel!** 🦴\n\nThe cask is empty...\n📉 **Score:** ${score}\n🎒 **Booty:** ${lootString}\n\nWill work for Grog.`,

      `**Marooned!** ⚔️\n\nRan out of rum and the crew walked off.\n📉 **Gold:** ${score}\n🎒 **Loot:** ${lootString}\n\nNever sail sober, mates.`,

      `**Why Is The Rum Gone?!** 🦜\n\nThe crew is desperate for a drop, but the wood is dry.\n📉 **Gold:** ${score}\n🎒 **Pockets:** ${lootString}\n\nBetter luck next tide.`
    ];
    commentText = getRandomTemplate(templates);
  }

  return commentText;
};
