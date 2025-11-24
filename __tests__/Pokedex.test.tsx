import { render } from '@testing-library/react-native';
import Pokedex from '../screens/Pokedex';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

jest.mock('expo/fetch', () => ({
  fetch: jest.fn().mockResolvedValue({
    ok: true,
    json: async () => ({
        results: [
          { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
          { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' },
          { name: 'venusaur', url: 'https://pokeapi.co/api/v2/pokemon/3/' }
    ]}),
  }),
}));

const queryClient = new QueryClient()

describe('Pokedex renders correctly', () => {
  it('renders initally', () => {
    const { getByText } = render(
      <QueryClientProvider client={queryClient}> 
        <Pokedex /> 
      </QueryClientProvider> 
    );
    const pokedexTitle = getByText('Pokemons');
    expect(pokedexTitle).toBeTruthy();
  });

  it('renders pokemon', () => {
    const { getByText } = render(
      <QueryClientProvider client={queryClient}> 
        <Pokedex /> 
      </QueryClientProvider> 
    );
    const pokemonName = getByText('Bulbasaur');
    expect(pokemonName).toBeTruthy();
  });
});