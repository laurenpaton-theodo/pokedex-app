import { fetch } from 'expo/fetch';
import { IndexedPokemon, NamedAPIResourceList, PokemonInfo } from './pokeAPI.types';

export function getPokemonId(url: string): number {
    const match = url.match(/\/pokemon\/(\d+)\//);
    return match ? parseInt(match[1], 10) : 0;
}

export function injectPokemonIds(results: IndexedPokemon[], pageParam: number = 0) {
    return results.map(pokemon => {
        return { ...pokemon, id: getPokemonId(pokemon.url) + pageParam}
    })
}
 
export async function listPokemons(pageParam: number  = 0): Promise<NamedAPIResourceList> { 
    const response: NamedAPIResourceList = await fetch('https://pokeapi.co/api/v2/pokemon?cursor=' + pageParam)
        .then(res => res.json()) 
        .catch(() => {
            throw { error: 'Failed to fetch pokemons' }
    }) 
    if (!response || !response.results) return response
    return {...response, results: injectPokemonIds(response.results, pageParam) }
}

export async function getPokemonDetails(url: string): Promise<PokemonInfo> {
    return await fetch(url)
        .then(res => {
            return res.json()
        }) 
        .catch(() => {
            throw { error: 'Failed to fetch pokemon' }
    })
}