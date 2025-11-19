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