import { Colors } from "@/constants/theme";
import { useAppTheme } from "@/hooks/use-app-theme";

type ThemeOverrides = {
  light?: string;
  dark?: string;
};

export function useThemeColor(
  overrides: ThemeOverrides,
  colorName: keyof (typeof Colors)["light"],
) {
  const { colorScheme } = useAppTheme();

  return overrides[colorScheme] ?? Colors[colorScheme][colorName];
}
