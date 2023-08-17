const { test } = require('../../../commands/fun/randomChamp.js');
const fetch = require('node-fetch');
jest.mock('node-fetch');

describe('Random Champ tests', function () {
  it('Should return an array of champs names', async function () {

    fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue({ data: { NotAChamp: { name: 'NotAChamp' } } })
    });

    const champs = await test.getLatestChamps();

    expect(champs).toEqual(['NotAChamp']);
  })

  it('Should return a random champs from the set', async function () {

    fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue({
        data: {
          NotAChamp: { name: 'NotAChamp' }, NotAChamp2: { name: 'NotAChamp2' }, NotAChamp3: { name: 'NotAChamp3' }
        }
      })
    });

    const champ = await test.randomizeChamp();

    expect(['NotAChamp', 'NotAChamp2', 'NotAChamp3']).toContain(champ);
  })
})