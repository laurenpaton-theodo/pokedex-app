import { Text } from "react-native";
import { Card } from "react-native-paper";
import { StyleSheet } from "react-native"
import { View } from "react-native";
import { IndexedPokemon } from "../services/pokeAPI.types";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
    Home: undefined;
    PokemonDetails: { pokemon: IndexedPokemon };
}

export default function PokemonCard({ pokemon } : { pokemon: IndexedPokemon}) {
    const { name, id } = pokemon;
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'Home'>>();

    const styles = StyleSheet.create({
        card: {
            padding: 10,
            backgroundColor: '#fff',
            alignItems: 'center',
            justifyContent: 'center',
        }, 
        textContainer: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
        }}
    )

    return (
        <Card style={styles.card} onPress={() => navigation.navigate('PokemonDetails', { pokemon })}>
            <View style={styles.textContainer}> 
                <Text style={{ paddingHorizontal: 5 }}>{id}</Text>
                <Text>{name}</Text>
            </View>
        </Card>
    )
}

