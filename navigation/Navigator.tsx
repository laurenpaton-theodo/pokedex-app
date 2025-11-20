import { createNativeStackNavigator, NativeStackScreenProps } from "@react-navigation/native-stack";
import Pokedex from "../screens/Pokedex";
import { createStaticNavigation } from "@react-navigation/native";
import PokemonDetails from "../screens/PokemonDetails";
import { IndexedPokemon } from "../services/pokeAPI.types";

const Stack = createNativeStackNavigator({
    screens: {
        Home: Pokedex,
        PokemonDetails: PokemonDetails
    }
});

export type ScreenList = {
  Home: undefined;
  PokemonDetails: { pokemon: IndexedPokemon };
};

export type Nav = NativeStackScreenProps<ScreenList>;

const Navigator = createStaticNavigation(Stack);
export default Navigator 