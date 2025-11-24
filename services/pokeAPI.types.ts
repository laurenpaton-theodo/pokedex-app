export type NamedAPIResourceList = { 
    count: number
    next: string | null
    previous: string | null
    results: IndexedPokemon[]
}

export type NamedAPIResource = { 
    name: string
    url: string
}

export type IndexedPokemon = NamedAPIResource & { 
    id: number
}

export type RootStackParamList = {
    Home: undefined;
    PokemonDetails: { pokemon: IndexedPokemon };
}

export type PokemonInfo = { 
    abilities: { ability: { name: string } }[];
    cries: string[];
    types: string[];
    species: string;
}