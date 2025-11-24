import { Text, StyleSheet } from "react-native";
import { Card } from "react-native-paper";
import { View } from "react-native";
import { IndexedPokemon } from "../services/pokeAPI.types";
import { useRouter } from "expo-router";

export const formatName = (name: string) => name.charAt(0).toUpperCase() + name.slice(1);

export default function PokemonCard({ pokemon } : { pokemon: IndexedPokemon}) {
    const { name, id, url } = pokemon;
    const router = useRouter();

    const styles = StyleSheet.create({
        card: {
            padding: 10,
            backgroundColor: '#fff',
            alignItems: 'flex-start',
            justifyContent: 'center',
        }, 
        textContainer: {
            display: 'flex',
            flexDirection: 'row',
        }, 
        idLabel: {
            flexBasis: 50,
        }
    })

    return (
        <Card style={styles.card} onPress={() => 
            router.navigate({ 
                pathname: '/[id]', 
                params: { id, url, name },
            })}>
            <View style={styles.textContainer}> 
                <Text style={styles.idLabel}>{id}</Text>
                <Text>{formatName(name)}</Text>
            </View>
        </Card>
    )
}

