import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { listPokemons } from './services/pokeAPI';

export default function App() {
  const [pokemons, setPokemons] = useState<string[]>([])

  useEffect(() => {
    const fetchPokemons = async () => {
      const response = await listPokemons()
      if (!response || !response.results) return
      const items = response.results.map(item => item.name)
      setPokemons(items)
    }
    fetchPokemons()
  }, [])

  return (
    <View style={styles.container}>
      {pokemons.map((name) => (
        <Text key={name}>{name}</Text>
      ))}
    </View>
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
