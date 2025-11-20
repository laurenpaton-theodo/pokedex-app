import { View, Text } from "react-native";

export default function PokemonDetails({ route }: any) {
    const { pokemon } = route.params

    return (
        <View>
            <Text>{pokemon.name}</Text>
            <Text>{pokemon.id}</Text>
        </View>
    )
}