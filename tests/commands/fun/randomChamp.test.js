const { test } = require('../../../commands/fun/randomChamp.js');
const fetch = require('node-fetch');
jest.mock('node-fetch');

describe('Random Champ tests', function () {
  it('Should return an array of champs', async function () {

    fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue({ data: { NotAChamp: { name: 'NotAChamp', tags: ['Mage', 'Support'] } } })
    });

    const champs = await test.getLatestChamps();

    expect(champs).toEqual([{ name: 'NotAChamp', typeOfChamp: ['Mage', 'Support'] }]);
  })

  it('Should return a mage champs from the set', async function () {

    const champs = [{ name: 'NotAChamp', typeOfChamp: ['Mage'] }, { name: 'NotAChamp2', typeOfChamp: ['Support'] }, { name: 'NotAChamp3', typeOfChamp: ['Assasin'] }]

    const champ = await test.randomizeChamp(champs, 'Mage');

    expect(champ).toEqual({ name: 'NotAChamp', typeOfChamp: ['Mage'] });
  })

  it('Should return an assasin champs from the set', async function () {

    const champs = [{ name: 'NotAChamp', typeOfChamp: ['Mage'] }, { name: 'NotAChamp2', typeOfChamp: ['Support'] }, { name: 'NotAChamp3', typeOfChamp: ['Assasin'] }]

    const champ = await test.randomizeChamp(champs, 'Assasin');

    expect(champ).toEqual({ name: 'NotAChamp3', typeOfChamp: ['Assasin'] });
  })
})