import Ionicons from "@expo/vector-icons/Ionicons";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useAppDrawer } from "@/hooks/use-app-drawer";
import { useAppTheme } from "@/hooks/use-app-theme";
import { useThemeColor } from "@/hooks/use-theme-color";

type AppHeaderProps = {
  title?: string;
};

export function AppHeader({ title = "SWE - HND" }: AppHeaderProps) {
  const insets = useSafeAreaInsets();
  const { openDrawer } = useAppDrawer();
  const { isDark, toggleTheme } = useAppTheme();
  const surfaceColor = useThemeColor({}, "surface");
  const textColor = useThemeColor({}, "text");
  const blueTest = useThemeColor({}, "drawerHeader");

  return (
    <View
      style={[
        styles.header,
        {
          backgroundColor: surfaceColor,
          paddingTop: insets.top + 14,
        },
      ]}
    >
      <Pressable hitSlop={10} onPress={openDrawer}>
        <Ionicons name="menu" size={28} color={blueTest} />
      </Pressable>
      <Text style={[styles.headerTitle, { color: textColor }]}>{title}</Text>
      <Pressable hitSlop={10} onPress={toggleTheme}>
        <Ionicons
          name={isDark ? "sunny-outline" : "moon-outline"}
          size={24}
          color={blueTest}
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingBottom: 18,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    letterSpacing: 0.3,
  },
});
