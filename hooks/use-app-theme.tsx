import {
  createContext,
  type PropsWithChildren,
  useContext,
  useMemo,
  useState,
} from "react";

import { useColorScheme as useDeviceColorScheme } from "@/hooks/use-color-scheme";

type AppThemeContextValue = {
  colorScheme: "light" | "dark";
  isDark: boolean;
  toggleTheme: () => void;
};

const AppThemeContext = createContext<AppThemeContextValue | null>(null);

export function AppThemeProvider({ children }: PropsWithChildren) {
  const deviceColorScheme = useDeviceColorScheme();
  const [themeOverride, setThemeOverride] = useState<"light" | "dark" | null>(null);

  const colorScheme =
    themeOverride ?? (deviceColorScheme === "dark" ? "dark" : "light");

  const value = useMemo(
    () => ({
      colorScheme,
      isDark: colorScheme === "dark",
      toggleTheme: () =>
        setThemeOverride((current) => {
          const activeTheme =
            current ?? (deviceColorScheme === "dark" ? "dark" : "light");

          return activeTheme === "dark" ? "light" : "dark";
        }),
    }),
    [colorScheme, deviceColorScheme],
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
