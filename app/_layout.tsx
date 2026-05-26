import { ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

import { getNavigationTheme } from "@/constants/theme";
import { AppThemeProvider, useAppTheme } from "@/hooks/use-app-theme";

function RootLayoutContent() {
  const { colorScheme } = useAppTheme();
  const navigationTheme = getNavigationTheme(colorScheme);

  return (
    <ThemeProvider value={navigationTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
      </Stack>
      <StatusBar
        style={colorScheme === "dark" ? "light" : "dark"}
        translucent
        backgroundColor="transparent"
      />
    </ThemeProvider>
  );
}

export default function RootLayout() {
  return (
    <AppThemeProvider>
      <RootLayoutContent />
    </AppThemeProvider>
  );
}
