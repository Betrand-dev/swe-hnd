import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { AppHeader } from "@/components/app-header";
import { useThemeColor } from "@/hooks/use-theme-color";

const papers = [
  "Practice of Computer",
  "Case Study",
  "Digital Literacy",
  "French",
  "English",
  "Enterprise Creation and Entrepreneurship",
  "Law and Citizenship Education",
  "Computer Technology",
  "Discrete Mathematics",
  "Information Systems",
  "Digital Electronics",
  "System Analysis and Design",
];

const credits = [
  "8",
  "14",
  "1",
  "1",
  "1",
  "1",
  "6",
  "4",
  "6",
  "7",
  "7",
];

function PaperRow({ title, credit }: { title: string; credit: string }) {
  const iconColor = useThemeColor({}, "tint");
  const surfaceColor = useThemeColor({}, "surface");
  const mutedTextColor = useThemeColor({}, "mutedText");
  const textColor = useThemeColor({}, "text");
  const blueTest = useThemeColor({}, "drawerHeader");

  return (
    <Pressable
      onPress={() => router.push({ pathname: "/paper/[title]", params: { title } })}
      style={styles.paperRow}
    >
      <View style={styles.paperIconWrap}>
        <Ionicons name="book" size={42} color={iconColor} />
      </View>
      <View style={styles.paperTextWrap}>
        <Text style={[styles.paperTitle, { color: textColor }]}>{title}</Text>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 3  }}>
          <Text style={[styles.paperSubtitle, { color: mutedTextColor }]}>{`credit ${credit}`}</Text>
          <Ionicons name="star" size={10} color={blueTest} />
        </View>
      </View>
      <View
        style={[
          styles.paperCardOverlay,
          {
            backgroundColor: surfaceColor,
          },
        ]}
      />
    </Pressable>
  );
}

export default function PapersScreen() {
  const backgroundColor = useThemeColor({}, "background");

  return (
    <SafeAreaView
      edges={["left", "right", "bottom"]}
      style={[styles.screen, { backgroundColor }]}
    >
      <AppHeader />
      <ScrollView>
        <View style={styles.listWrap}>
        {papers.map((paper, index) => (
          <View key={paper} style={styles.paperSlot}>
            <PaperRow title={paper} credit={credits[index % credits.length]} />
          </View>
        ))}
      </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  listWrap: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  paperSlot: {
    marginBottom: 24,
  },
  paperRow: {
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
    minHeight: 56,
  },
  paperIconWrap: {
    width: 48,
    alignItems: "flex-start",
    justifyContent: "center",
    zIndex: 1,
  },
  paperTextWrap: {
    flex: 1,
    marginLeft: 12,
    zIndex: 1,
    justifyContent: "center",
  },
  paperTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 4,
  },
  paperSubtitle: {
    fontSize: 13,
    fontWeight: "500",
  },
  paperCardOverlay: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 16,
    opacity: 0.01,
  },
});
