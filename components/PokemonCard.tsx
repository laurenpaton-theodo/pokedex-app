import { Text } from "react-native";
import { Card } from "react-native-paper";
import { StyleSheet } from "react-native"
import { View } from "react-native";

export default function PokemonCard(props: { name: string; id: number }) {
    const { name, id } = props;

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
        }
})


    return (
        <Card style={styles.card}>
            <View style={styles.textContainer}> 
                <Text style={{paddingHorizontal: 5}}>{id}</Text>
                <Text>{name}</Text>
            </View>
        </Card>
    )
}

