import { StyleSheet, View, FlatList, Text, Image} from "react-native"
import PokemonCard from "../components/PokemonCard"
import { listPokemons } from "../services/pokeAPI"
import { IndexedPokemon } from "../services/pokeAPI.types"
import { SafeAreaView } from "react-native-safe-area-context"
import { useInfiniteQuery } from "@tanstack/react-query"
import { ActivityIndicator } from "react-native-paper"

function LoadingIndicator() {
  return (
    <View style={{ marginTop: 10, flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 }}>
      <ActivityIndicator size="large" color="#007AFF" />
    </View>
  );
}

export default function Pokedex() {
  const fetchPokemon = async ({ pageParam = 0 }) => listPokemons(pageParam)

  const {
    data,
    error,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['pokemon'],
    queryFn: fetchPokemon,
    getNextPageParam: (lastPage, pages) => lastPage.next ? pages.length * 20 : undefined,
    initialPageParam: 0,
  })

  const pokemon = data?.pages.flatMap(page => page.results) || []

  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.container}>
          <View style={styles.headingContainer}>
            <Image source={require('../assets/poke.webp')} style={styles.image}/>
            <Text style={styles.heading}>Pokemons</Text>
          </View>
            {error && <Text>{'Error loading pokemons :('}</Text>}
            <FlatList 
              style={{ width: '100%', padding: 16 }}
              data={pokemon}
              keyExtractor={(item: IndexedPokemon) => item.id.toString()}
              renderItem={({ item }: { item: IndexedPokemon } ) => <PokemonCard pokemon={item} key={item.name}/>}
              ItemSeparatorComponent={() => <View style={{ height: 16 }} />} // 16px vertical space
              onScroll={({ nativeEvent }) => {
                const { contentOffset, contentSize, layoutMeasurement} = nativeEvent
                if (contentOffset.y + layoutMeasurement.height >= contentSize.height - 20) fetchNextPage()
              }}
            />
            {isFetchingNextPage && <LoadingIndicator/>}
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
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
  }, 
  headingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  }, 
  image: {
    width: 200, 
    height: 80, 
    resizeMode: 'contain', 
    marginBottom: 10,
  }
});
