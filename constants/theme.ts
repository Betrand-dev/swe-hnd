import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
  type Theme,
} from "@react-navigation/native";

export const Colors = {
  light: {
    background: "#f5f7fa",
    surface: "#ffffff",
    text: "#556872",
    mutedText: "#a6b2bb",
    tint: "#738b97",
    border: "#d7dfe5",
    tabInactive: "#b6c0c8",
    cardShadow: "rgba(85, 104, 114, 0.08)",
    drawerHeader: "#31c0d6",
    drawerOverlay: "rgba(20, 31, 42, 0.22)",
  },
  dark: {
    background: "#0f1720",
    surface: "#16212b",
    text: "#dbe7ee",
    mutedText: "#8b9aa5",
    tint: "#9fb7c3",
    border: "#22313d",
    tabInactive: "#6f808c",
    cardShadow: "rgba(0, 0, 0, 0.25)",
    drawerHeader: "#178ca0",
    drawerOverlay: "rgba(2, 6, 12, 0.5)",
  },
} as const;

export type ColorScheme = keyof typeof Colors;

export function getNavigationTheme(colorScheme: ColorScheme | null | undefined): Theme {
  const scheme = colorScheme === "dark" ? "dark" : "light";
  const palette = Colors[scheme];
  const baseTheme =
    scheme === "dark" ? NavigationDarkTheme : NavigationDefaultTheme;

  return {
    ...baseTheme,
    colors: {
      ...baseTheme.colors,
      background: palette.background,
      card: palette.surface,
      text: palette.text,
      primary: palette.tint,
      border: palette.border,
      notification: palette.tint,
    },
  };
}
