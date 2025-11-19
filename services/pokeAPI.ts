import { fetch } from 'expo/fetch';
import { NamedAPIResourceList } from './pokeAPI.types';

function getPokemonId(url: string): number {
    const match = url.match(/\/pokemon\/(\d+)\//);
    return match ? parseInt(match[1], 10) : 0;
}

function injectPokemonIds(response: NamedAPIResourceList) {
    if (!response || !response.results) return response
    const resultsWithIds = response.results.map(pokemon => {
        return { ...pokemon, id: getPokemonId(pokemon.url)}
    })

    return { ...response, results: resultsWithIds };
}

export async function listPokemons() { 
    const response: NamedAPIResourceList = await fetch('https://pokeapi.co/api/v2/pokemon?limit=2000')
        .then(res => res.json()) 
    return injectPokemonIds(response);
}