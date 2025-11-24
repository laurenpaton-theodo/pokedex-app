import { createNativeStackNavigator, NativeStackScreenProps } from "@react-navigation/native-stack";
import Pokedex from "../screens/Pokedex";
import { createStaticNavigation } from "@react-navigation/native";
import PokemonDetails from "../screens/PokemonDetails";
import { IndexedPokemon } from "../services/pokeAPI.types";

const Stack = createNativeStackNavigator({
    screens: {
        Home: {
            screen: Pokedex, 
            options: { title: 'Pokedex' }
        }, 
        PokemonDetails: {
            screen: PokemonDetails, 
            options(props) {
                const { route } = props;
                const { pokemon } = route.params as { pokemon: IndexedPokemon };
                return {
                    title: pokemon.name.toUpperCase(),
                    headerBackVisible: false
                }
            },
            
        }
    }
});

export type ScreenList = {
  Home: undefined;
  PokemonDetails: { pokemon: IndexedPokemon };
};

export type Nav = NativeStackScreenProps<ScreenList>;

const Navigator = createStaticNavigation(Stack);
export default Navigator 