import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createContext,
  type PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { useColorScheme as useDeviceColorScheme } from "@/hooks/use-color-scheme";

type AppThemeContextValue = {
  colorScheme: "light" | "dark";
  isDark: boolean;
  toggleTheme: () => void;
};

type ThemePreference = "light" | "dark";

const THEME_STORAGE_KEY = "swe-hnd-theme";
const AppThemeContext = createContext<AppThemeContextValue | null>(null);

export function AppThemeProvider({ children }: PropsWithChildren) {
  const deviceColorScheme = useDeviceColorScheme();
  const [themeOverride, setThemeOverride] = useState<ThemePreference | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadStoredTheme() {
      try {
        const storedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);

        if (
          isMounted &&
          (storedTheme === "light" || storedTheme === "dark")
        ) {
          setThemeOverride(storedTheme);
        }
      } catch {
        // Fall back to the device theme if saved preferences cannot be read.
      }
    }

    void loadStoredTheme();

    return () => {
      isMounted = false;
    };
  }, []);

  const colorScheme =
    themeOverride ?? (deviceColorScheme === "dark" ? "dark" : "light");

  const value = useMemo(
    () => ({
      colorScheme,
      isDark: colorScheme === "dark",
      toggleTheme: () => {
        const nextTheme = colorScheme === "dark" ? "light" : "dark";

        setThemeOverride(nextTheme);
        void AsyncStorage.setItem(THEME_STORAGE_KEY, nextTheme).catch(() => {
          // The in-memory theme still updates even if persistence fails.
        });
      },
    }),
    [colorScheme],
  );

  return <AppThemeContext.Provider value={value}>{children}</AppThemeContext.Provider>;
}

export function useAppTheme() {
  const context = useContext(AppThemeContext);

  if (!context) {
    throw new Error("useAppTheme must be used within an AppThemeProvider.");
  }

  return context;
}
