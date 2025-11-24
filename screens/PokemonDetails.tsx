import { useState, useEffect } from "react";
import { View, Text, Button, Image } from "react-native";
import { StyleSheet } from "react-native"
import { getPokemonDetails } from "../services/pokeAPI";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { PokemonInfo, RootStackParamList } from "../services/pokeAPI.types";

export function usePokemonInfo(url: string){
  const [pokemon, setPokemon] = useState<PokemonInfo>();
  
  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await getPokemonDetails(url)
        if (!response) return
        setPokemon(response)
      } catch (error) {
        console.error('Error fetching pokemon:', error);
      }
    }
    fetchPokemon()
  }, [])

  return pokemon
}

export default function PokemonDetails({ route }: any) {
    const { pokemon } = route.params
    const { id, url } = pokemon
    const pokemonDetails = usePokemonInfo(url)

    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'Home'>>();

    const handleGoBack = () => {
        navigation.goBack();
    };

    const styles = StyleSheet.create({
        headerContainer: {
            padding: 20, 
            marginTop: 50,
            flex: 1, 
            alignItems: 'flex-start',
        }, 
        heading: {
            fontSize: 24,
            fontWeight: 'bold',
            textAlign: 'center',
        }, 
        backButton: { 
            
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
        }
    })

    return (
        <View style={styles.headerContainer}>
            <Button onPress={handleGoBack} title ={'Go Back'}/>
            <View >
                <Image 
                    source={{ uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png` }} 
                    style={{ width: 200, height: 200, alignSelf: 'center' }}
                    />
                <View style={styles.detailContainer}> 
                    <Text style={styles.detailHeading}>
                        Types
                    </Text>
                    <Text style={styles.detailText}>
                        {pokemonDetails?.types?.map((typeObj: any) => typeObj.type?.name).join(', ')}
                    </Text>
                </View>
                <View style={styles.detailContainer}> 
                    <Text style={styles.detailHeading}>
                        Abilities
                    </Text>
                    <Text style={styles.detailText}>
                        {pokemonDetails?.abilities?.map((abilityObj: any) => abilityObj.ability.name).join(', ')}
                    </Text>
                </View>
            </View>
        </View>
    )
}