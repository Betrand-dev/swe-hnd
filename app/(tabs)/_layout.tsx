import Ionicons from "@expo/vector-icons/Ionicons";
import { Tabs } from "expo-router";
import { View } from "react-native";

import { AppDrawer } from "@/components/app-drawer";
import { useThemeColor } from "@/hooks/use-theme-color";
import { AppDrawerProvider, useAppDrawer } from "@/hooks/use-app-drawer";

function TabsNavigator() {
  const backgroundColor = useThemeColor({}, "background");
  const surfaceColor = useThemeColor({}, "surface");
  const tintColor = useThemeColor({}, "tint");
  const blueTest = useThemeColor({}, "drawerHeader");
  const inactiveColor = useThemeColor({}, "tabInactive");
  const borderColor = useThemeColor({}, "border");
  const { isOpen, closeDrawer } = useAppDrawer();

  return (
    <View style={{ flex: 1 }}>
      <Tabs
        screenOptions={{
          headerShown: false,
          sceneStyle: {
            backgroundColor,
          },
          tabBarActiveTintColor: blueTest,
          tabBarInactiveTintColor: inactiveColor,
          tabBarShowLabel: true,
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: "600",
            marginTop: 4,
          },
          tabBarStyle: {
            backgroundColor: surfaceColor,
            borderTopColor: borderColor,
            borderTopWidth: 1,
            height: 88,
            paddingTop: 10,
            paddingBottom: 14,
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Papers",
            tabBarIcon: ({ color, size, focused }) => (
              <Ionicons
                name={focused ? "folder" : "folder-outline"}
                color={color}
                size={size + 2}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="resources"
          options={{
            title: "Resources",
            tabBarIcon: ({ color, size, focused }) => (
              <Ionicons
                name={focused ? "bookmark" : "bookmark-outline"}
                color={color}
                size={size}
              />
            ),
          }}
        />
      </Tabs>
      <AppDrawer open={isOpen} onClose={closeDrawer} />
    </View>
  );
}

export default function TabsLayout() {
  return (
    <AppDrawerProvider>
      <TabsNavigator />
    </AppDrawerProvider>
  );
}
