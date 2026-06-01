import { ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { getNavigationTheme } from "@/constants/theme";
import { AppThemeProvider, useAppTheme } from "@/hooks/use-app-theme";
import { BottomSheetProvider } from "@/hooks/use-app-bottom-sheet"

function RootLayoutContent() {
  const { colorScheme } = useAppTheme();
  const navigationTheme = getNavigationTheme(colorScheme);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
    <ThemeProvider value={navigationTheme}>
      <BottomSheetProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
      </Stack>
      <StatusBar
        style={colorScheme === "dark" ? "light" : "dark"}
        translucent
        backgroundColor="transparent"
      />
      </BottomSheetProvider>
    </ThemeProvider>
    </GestureHandlerRootView>
  );
}

export default function RootLayout() {
  return (
    <AppThemeProvider>
      <RootLayoutContent />
    </AppThemeProvider>
  );
}
