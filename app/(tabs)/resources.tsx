import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { AppHeader } from "@/components/app-header";
import { useThemeColor } from "@/hooks/use-theme-color";

const pdfThumbnail = require("@/assets/images/pdf.png");

const resourceItems = [
  { subject: "Operating Systems", credit: "PDF file" },
  { subject: "Network Security", credit: "PDF file" },
  { subject: "Mobile Computing", credit: "PDF file" },
  { subject: "Artificial Intelligence", credit: "PDF file" },
  { subject: "Compiler Design", credit: "PDF file" },
  { subject: "Computer Graphics", credit: "PDF file" },
];

export default function ResourcesScreen() {
  const backgroundColor = useThemeColor({}, "background");
  const textColor = useThemeColor({}, "text");
  const mutedTextColor = useThemeColor({}, "mutedText");

  return (
    <SafeAreaView
      edges={["left", "right", "bottom"]}
      style={[styles.screen, { backgroundColor }]}
    >
      <AppHeader />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {resourceItems.map((item) => (
          <View key={item.subject} style={styles.resourceRow}>
            <Image source={pdfThumbnail} style={styles.thumbnail} />
            <View style={styles.resourceTextWrap}>
              <Text numberOfLines={1} style={[styles.subjectText, { color: textColor }]}>
                {item.subject}
              </Text>
              <Text numberOfLines={1} style={[styles.creditText, { color: mutedTextColor }]}>
                {item.credit}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 26,
    paddingTop: 34,
    paddingBottom: 32,
  },
  resourceRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 30,
  },
  thumbnail: {
    width: 72,
    height: 72,
    borderRadius: 8,
    resizeMode: "cover",
  },
  resourceTextWrap: {
    flex: 1,
    marginLeft: 18,
    paddingTop: 4,
  },
  subjectText: {
    fontSize: 17,
    fontWeight: "700",
    marginBottom: 4,
  },
  creditText: {
    fontSize: 13,
    fontWeight: "500",
  },
});
