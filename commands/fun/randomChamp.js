const { SlashCommandBuilder } = require('discord.js');
const fetch = require('node-fetch');

const champions = [];

async function getLatestChamps() {
  if (Object.keys(champions).length > 0) return champions;

  // Fetching newest patch
  const versions = await fetch('https://ddragon.leagueoflegends.com/api/versions.json');
  const latest = await versions.json();

  // Fetching champs in that patch
  const ddragon = await fetch(`https://ddragon.leagueoflegends.com/cdn/${latest[0]}/data/en_US/champion.json`);
  const response = await ddragon.json();

  for (let champ in response.data) {
    const c = response.data[champ];
    champions.push({ name: c.name, typeOfChamp: c.tags });
  }

  return champions;
}

function randomizeChamp(results, typeOfChamp) {
  const search = results.filter(e => e.typeOfChamp.includes(typeOfChamp));
  const random = Math.floor(Math.random() * search.length);
  return search[random];
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName('random-champ')
    .setDescription("Give's you a random league of legend's champ to play! Just for fun :)")
    .addStringOption(option =>
      option.setName('class')
        .setDescription('Class of champ you want to play')
        .setAutocomplete(true)),
  async execute(interaction) {
    const typeOfChamp = interaction.options.getString('class') ?? 'Mage';
    const results = await getLatestChamps();
    const champ = randomizeChamp(results, typeOfChamp);

    await interaction.reply(`Feeling lucky? Why dont you try ${champ.name}`);
  },
  async autocomplete(interaction) {
    const focusedValue = interaction.options.getFocused();
    const choices = ['Fighter', 'Tank', 'Mage', 'Assassin', 'Marksman', 'Support']
    const filtered = choices.filter(choice => choice.startsWith(focusedValue));
    await interaction.respond(
      filtered.map(choice => ({ name: choice, value: choice })),
    );
  },
  test: {
    getLatestChamps,
    randomizeChamp
  }
};
