const { SlashCommandBuilder } = require('discord.js');
const fetch = require('node-fetch');

let champions = [];

async function getLatestChamps() {
  if (Object.keys(champions).length > 0) return champions;

  // Fetching newest patch
  const versions = await fetch('https://ddragon.leagueoflegends.com/api/versions.json');
  const latest = await versions.json();

  // Fetching champs in that patch
  const ddragon = await fetch(`https://ddragon.leagueoflegends.com/cdn/${latest[0]}/data/en_US/champion.json`);
  const response = await ddragon.json();

  for (let champ in response.data) {
    champions.push(champ);
  }

  return champions;
}

function randomizeChamp() {
  const random = Math.floor(Math.random() * champions.length);
  return champions[random];
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName('random-champ')
    .setDescription("Give's you a random league of legend's champ to play! Just for fun :)"),
  async execute(interaction) {
    const champs = await getLatestChamps();
    const champ = randomizeChamp(champs);
    await interaction.reply(`Feeling lucky? Why dont you try ${champ}`);
  },
  test: {
    getLatestChamps,
    randomizeChamp
  }
};
