import { useState, useEffect } from "react"
import { StyleSheet, View, FlatList } from "react-native"
import PokemonCard from "../components/PokemonCard"
import { listPokemons } from "../services/pokeAPI"
import { IndexedPokemon } from "../services/pokeAPI.types"
import { SafeAreaView } from "react-native-safe-area-context"

function usePokemons(){
  const [pokemons, setPokemons] = useState<IndexedPokemon[]>([])
  
  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const response = await listPokemons()
        if (!response || !response.results) return
        setPokemons(response.results)
      } catch (error) {
        console.error('Error fetching pokemons:', error);
      }
    }
    fetchPokemons()
  }, [])

  return pokemons
}

export default function Pokedex() {
  const pokemons = usePokemons()

  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.container}>
            <FlatList 
              style={{ width: '100%', padding: 16 }}
              data={pokemons}
              keyExtractor={(item: IndexedPokemon) => item.id.toString()}
              renderItem={({ item } : { item: IndexedPokemon } ) => <PokemonCard pokemon={item}/>}
              ItemSeparatorComponent={() => <View style={{ height: 16 }} />} // 16px vertical space
            />
        </View>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
