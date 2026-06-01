import { ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { AppLoadingSplash } from "@/components/app-loading-splash";
import { getNavigationTheme } from "@/constants/theme";
import { AppThemeProvider, useAppTheme } from "@/hooks/use-app-theme";
import { BottomSheetProvider } from "@/hooks/use-app-bottom-sheet";

void SplashScreen.preventAutoHideAsync();

const MIN_SPLASH_TIME = 3000;

function RootLayoutContent() {
  const { colorScheme } = useAppTheme();
  const [showLoadingSplash, setShowLoadingSplash] = useState(true);
  const navigationTheme = getNavigationTheme(colorScheme);

  useEffect(() => {
    void SplashScreen.hideAsync();

    const timer = setTimeout(() => {
      setShowLoadingSplash(false);
    }, MIN_SPLASH_TIME);

    return () => clearTimeout(timer);
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider value={navigationTheme}>
        <BottomSheetProvider>
          <View style={{ flex: 1 }}>
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name="(tabs)" />
            </Stack>
            <AppLoadingSplash visible={showLoadingSplash} />
          </View>
          <StatusBar
            style={showLoadingSplash || colorScheme === "dark" ? "light" : "dark"}
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
