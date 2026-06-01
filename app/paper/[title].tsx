import Ionicons from "@expo/vector-icons/Ionicons";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Image, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

import { PastPapers } from "@/data";

import { useThemeColor } from "@/hooks/use-theme-color";

const pdfThumbnail = require("@/assets/images/pdf.png");



export default function PaperDetailScreen() {
  const { title, pastQuestions } = useLocalSearchParams<{ title?: string; pastQuestions?: string }>();
  const pastPaperItems = PastPapers[pastQuestions ?? ""] || [];
  const pastPaperItemsFiles = pastPaperItems.files;
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState<"overview" | "past-papers">("overview");
  const backgroundColor = useThemeColor({}, "background");
  const textColor = useThemeColor({}, "text");
  const mutedTextColor = useThemeColor({}, "mutedText");
  const headerColor = useThemeColor({}, "drawerHeader");
  const rowBackground = useThemeColor(
    { light: "#eceef0", dark: "#18242e" },
    "surface",
  );
  const borderColor = useThemeColor(
    { light: "#0f1114", dark: "#2d3e49" },
    "border",
  );

  const displayTitle = Array.isArray(title) ? title[0] : title ?? "Paper";
  const rowText =
    activeTab === "overview" ? "download overview" : "download 2023 paper";

  return (
    <SafeAreaView
      edges={["left", "right", "bottom"]}
      style={[styles.screen, { backgroundColor }]}
    >
      <View
        style={[
          styles.headerBlock,
          {
            backgroundColor: headerColor,
            paddingTop: insets.top + 18,
          },
        ]}
      >
        <View style={styles.topRow}>
          <Pressable hitSlop={10} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={28} color="#ffffff" />
          </Pressable>
          <Text
            numberOfLines={1}
            style={[styles.headerTitle, { color: "#ffffff" }]}
          >
            {displayTitle}
          </Text>
          <View style={styles.topSpacer} />
        </View>

        <View style={styles.switchRow}>
          <Pressable onPress={() => setActiveTab("overview")} style={styles.switchButton}>
            <Text
              style={[
                styles.switchLabel,
                activeTab === "overview" ? styles.switchLabelActive : styles.switchLabelIdle,
              ]}
            >
              overview
            </Text>
          </Pressable>
          <Pressable
            onPress={() => setActiveTab("past-papers")}
            style={styles.switchButton}
          >
            <Text
              style={[
                styles.switchLabel,
                activeTab === "past-papers"
                  ? styles.switchLabelActive
                  : styles.switchLabelIdle,
              ]}
            >
              past papers
            </Text>
          </Pressable>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {activeTab === "overview" ? (
          <View
            style={[
              styles.downloadRow,
              {
                backgroundColor: rowBackground,
                borderTopColor: borderColor,
              },
            ]}
          >
            <Ionicons name="document-text" size={30} color={textColor} />
            <Text style={[styles.downloadText, { color: textColor }]}>{rowText}</Text>
            <Ionicons name="download" size={30} color={textColor} />
          </View>
        ) : (
          <>
            {pastPaperItemsFiles.map((item) => (
              <TouchableOpacity
              onPress= {() => router.push({pathname: "../viewer/[pdfScreen]", params: {name: item.name, file: item.file}})}
                key={item.id}
                style={styles.paperResourceRow}
              >
                <Image source={pdfThumbnail} style={styles.thumbnail} />
                <View style={styles.paperResourceTextWrap}>
                  <Text
                    numberOfLines={2}
                    style={[styles.paperResourceTitle, { color: textColor }]}
                  >
                    {item.name}
                  </Text>
                  <Text
                    numberOfLines={1}
                    style={[styles.paperResourceCredit, { color: mutedTextColor }]}
                  >
                    {"PDF file"}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  headerBlock: {
    paddingHorizontal: 22,
    paddingBottom: 22,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 38,
  },
  topSpacer: {
    width: 38,
  },
  headerTitle: {
    flex: 1,
    fontSize: 22,
    fontWeight: "800",
    textAlign: "center",
    marginHorizontal: 12,
  },
  switchRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  switchButton: {
    minWidth: 128,
    alignItems: "center",
  },
  switchLabel: {
    fontSize: 18,
    fontWeight: "800",
    textTransform: "lowercase",
  },
  switchLabelActive: {
    color: "#ffffff",
  },
  switchLabelIdle: {
    color: "rgba(255, 255, 255, 0.72)",
  },
  content: {
    paddingBottom: 32,
  },
  downloadRow: {
    flexDirection: "row",
    alignItems: "center",
    borderTopWidth: 2,
    paddingHorizontal: 22,
    paddingVertical: 18,
    gap: 16,
  },
  downloadText: {
    flex: 1,
    fontSize: 17,
    fontWeight: "700",
    textTransform: "lowercase",
  },
  paperResourceRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingHorizontal: 22,
    paddingTop: 22,
  },
  thumbnail: {
    width: 72,
    height: 72,
    borderRadius: 8,
    resizeMode: "cover",
  },
  paperResourceTextWrap: {
    flex: 1,
    marginLeft: 18,
    paddingTop: 4,
  },
  paperResourceTitle: {
    fontSize: 17,
    fontWeight: "700",
    marginBottom: 4,
  },
  paperResourceCredit: {
    fontSize: 13,
    fontWeight: "500",
  },
});
