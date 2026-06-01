import Ionicons from "@expo/vector-icons/Ionicons";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { useThemeColor } from "@/hooks/use-theme-color";

export default function pdfScreen()  {
    const { name, file } = useLocalSearchParams<{ name?: string; file?: string }>();
    const backgroundColor = useThemeColor({}, "background");
    const textColor = useThemeColor({}, "text");
    const blueTest = useThemeColor({}, "drawerHeader");
    const surfaceColor = useThemeColor({}, "surface");
    const insets = useSafeAreaInsets();
    return(
        <SafeAreaView
        edges={["left", "right", "bottom"]}
        style={[styles.screen, { backgroundColor }]}
        >
            <View style={[styles.topRow, {backgroundColor: surfaceColor, paddingTop: insets.top + 14,}]}>
                <Pressable hitSlop={10} onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={28} color={blueTest} />
                </Pressable>
                <Text 
                numberOfLines={1}
                style={[styles.headerTitle, { color: textColor }]}
                >
                {name}
                </Text>
            </View>
            <View>
                {/* TODO: Dont forget Implemeting the pdf viewer display */}
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    screen: {
    flex: 1,
    },
    topRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
    
    paddingHorizontal: 24,
    paddingBottom: 18,
  },
    headerTitle: {
    flex: 1,
    fontSize: 22,
    fontWeight: "800",
    marginHorizontal: 10,
  },
})