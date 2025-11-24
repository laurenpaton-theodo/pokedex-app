import { QueryClientProvider } from "@tanstack/react-query";
import Pokedex from "../screens/Pokedex";
import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient();

export default function Route() {
  return (
    <QueryClientProvider client={queryClient}>
      <Pokedex />
    </QueryClientProvider>
  );
}