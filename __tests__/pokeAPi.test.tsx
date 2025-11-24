import { injectPokemonIds, getPokemonId } from "../services/pokeAPI";
import { IndexedPokemon } from "../services/pokeAPI.types";

const testPokemon = [
    { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
    { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' },
    { name: 'venusaur', url: 'https://pokeapi.co/api/v2/pokemon/3/' },
]

jest.mock('expo/fetch', () => ({
  fetch: jest.fn().mockResolvedValue({
    ok: true,
    json: async () => ({
        results: testPokemon
    }),
  }),
}));


describe('Helper functions ', () => {
  it('retrieves pokemon id from url', () => {
    const id = getPokemonId(testPokemon[0].url)
    expect(id).toBe(1)
  });
  
  it('injectPokemonIds add ids to pokemon results', () => {
    const result = injectPokemonIds(testPokemon as IndexedPokemon[])
    result.forEach((pokemon, index) => expect(pokemon.id).toBe(index + 1))
  });
});