import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { CreatorFlowProvider } from "@/context/creator-flow-context";
import { useColorScheme } from "@/hooks/use-color-scheme";

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <SafeAreaProvider>
      <CreatorFlowProvider>
        <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="campaign/[id]" options={{ headerShown: false }} />
            <Stack.Screen
              name="campaign/[id]/submit"
              options={{ headerShown: false }}
            />
          </Stack>
          <StatusBar style="light" />
        </ThemeProvider>
      </CreatorFlowProvider>
    </SafeAreaProvider>
  );
}
