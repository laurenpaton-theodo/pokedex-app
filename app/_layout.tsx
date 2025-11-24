import { Stack } from "expo-router";

export default function Layout() {
    return (
        <Stack screenOptions={(props) => ({
            title: "Pokemon Details", 
            headerBackVisible: false
        })}>
            <Stack.Screen 
                name="index" 
                options={{ title: "Pokedex" }} 
            />
        </Stack>
    );
}