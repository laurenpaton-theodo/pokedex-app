import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { listPokemons } from './services/pokeAPI';
import { IndexedPokemon } from './services/pokeAPI.types';
import { FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import PokemonCard from './components/PokemonCard';

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

export default function App() {
  const pokemons = usePokemons()

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <FlatList data={pokemons}
          keyExtractor={(item: IndexedPokemon) => item.id.toString()}
          renderItem={({ item } : { item: IndexedPokemon } ) => <PokemonCard name={item.name} id={item.id}/>}
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
