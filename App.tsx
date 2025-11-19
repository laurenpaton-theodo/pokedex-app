import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { listPokemons } from './services/pokeAPI';
import { IndexedPokemon } from './services/pokeAPI.types';
import { FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

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
    <SafeAreaView>
      <View style={styles.container}>
        <FlatList data={pokemons}
          keyExtractor={(item: IndexedPokemon) => item.id.toString()}
          renderItem={({ item } : {item: IndexedPokemon} ) => <Text>{`${item.id} ${item.name}`}</Text>}
        />
      </View>
    </SafeAreaView>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
