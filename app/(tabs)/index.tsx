import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { AppHeader } from "@/components/app-header";
import { useThemeColor } from "@/hooks/use-theme-color";

const courses = [
  { paper: "Practice of Computer", credit: "8", pastQuestions: "practice_of_computer" },
  { paper: "Case Study", credit: "14" , pastQuestions: "case_study" },
  { paper: "Digital Literacy", credit: "1", pastQuestions: "digital_literacy" },
  { paper: "French", credit: "1", pastQuestions: "french" },
  { paper: "English", credit: "1", pastQuestions: "english" },
  { paper: "Enterprise Creation and Entrepreneurship", credit: "1", pastQuestions: "enterprise_creation" },
  { paper: "Law and Citizenship Education", credit: "6", pastQuestions: "law_and_citizenship" },
  { paper: "Computer Technology", credit: "4", pastQuestions: "computer_technology" },
  { paper: "Discrete Mathematics", credit: "6", pastQuestions: "discrete_mathematics" },
  { paper: "Information Systems", credit: "7", pastQuestions: "information_systems" },
  { paper: "Digital Electronics", credit: "7",pastQuestions: "digital_electronic" },
  { paper: "System Analysis and Design", credit: "7", pastQuestions: "system_analysis_and_design" },
];

function PaperRow({ title, credit, pastQuestions }: { title: string; credit: string; pastQuestions: string }) {
  const iconColor = useThemeColor({}, "tint");
  const surfaceColor = useThemeColor({}, "surface");
  const mutedTextColor = useThemeColor({}, "mutedText");
  const textColor = useThemeColor({}, "text");
  const blueTest = useThemeColor({}, "drawerHeader");

  return (
    <Pressable
      onPress={() => router.push({ pathname: "/paper/[title]", params: { title, pastQuestions } })}
      style={styles.paperRow}
    >
      <View style={styles.paperIconWrap}>
        <Ionicons name="book" size={42} color={iconColor} />
      </View>
      <View style={styles.paperTextWrap}>
        <Text style={[styles.paperTitle, { color: textColor }]}>{title}</Text>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 3  }}>
          <Text style={[styles.paperSubtitle, { color: mutedTextColor }]}>{`${credit} credit`}</Text>
          
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
        {courses.map((item) => (
          <View key={item.paper} style={styles.paperSlot}>
            <PaperRow title={item.paper} credit={item.credit} pastQuestions={item.pastQuestions} />
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
