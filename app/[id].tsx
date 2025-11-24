import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
import { usePokemonInfo } from '../screens/PokemonDetails';
import { formatName } from '../components/PokemonCard';
import { Button } from 'react-native-paper';

export default function Route() {
    const { id, name, url } = useLocalSearchParams();

    const pokemonId = Array.isArray(id) ? id[0] : id;
    const pokemonUrl = Array.isArray(url) ? url[0] : url;
    const pokemonName = Array.isArray(name) ? name[0] : name;

    const pokemonDetails = usePokemonInfo(pokemonUrl);
    const router = useRouter()
    
    return (
        <>
            <Stack.Screen options={{ title: formatName(pokemonName) }}/>
            <View style={styles.headerContainer}>
                <Button style={styles.button} onPress={() => router.back()} mode="contained">Back</Button> 
            </View>
            <View >
                <Image 
                    source={{ uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png` }} 
                    style={{ width: 200, height: 200, alignSelf: 'center' }}
                />
                <View style={styles.detailContainer}> 
                    <Text style={styles.detailHeading}>
                        Types
                    </Text>
                    <Text style={styles.detailText}>
                        {pokemonDetails?.types?.map((typeObj: any) => formatName(typeObj.type?.name)).join(', ')}
                    </Text>
                </View>
                <View style={styles.detailContainer}> 
                    <Text style={styles.detailHeading}>
                        Abilities
                    </Text>
                    <Text style={styles.detailText}>
                        {pokemonDetails?.abilities?.map((abilityObj: any) => formatName(abilityObj.ability.name)).join(', ')}
                    </Text>
                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    headerContainer: {
        display: 'flex',
        flexDirection: 'row',
        textAlign: 'center',
        padding: 10
    }, 
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        margin: 20,
    },
    detailContainer: {
        padding: 10,
        display: 'flex',
        flexDirection: 'row'
    }, 
    detailHeading: {
        flex: 1, 
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
    }, 
    detailText: {
        flex: 1,
        fontSize: 18,
        paddingTop: 4,
    }, 
    button: {
        backgroundColor: '#007AFF', 
        color: 'fff', 
        textAlign: 'center', 
        width: 100,
        height: 40
    }
})