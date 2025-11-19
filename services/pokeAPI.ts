import { fetch } from 'expo/fetch';
import { NamedAPIResourceList } from './pokeAPI.type';

export async function listPokemons() { 
    const response = await fetch('https://pokeapi.co/api/v2/pokemon')
        .then(res => res.json()) as NamedAPIResourceList
    return response
}