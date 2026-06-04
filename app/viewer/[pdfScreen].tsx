import Ionicons from "@expo/vector-icons/Ionicons";
import { Asset } from "expo-asset";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

import { useThemeColor } from "@/hooks/use-theme-color";
import PdfViewer from "@/components/app-viewer";

export default function PdfScreen() {
  const { name, file } = useLocalSearchParams<{ name?: string; file?: string }>();
  const [pdfUri, setPdfUri] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const backgroundColor = useThemeColor({}, "background");
  const textColor = useThemeColor({}, "text");
  const blueTest = useThemeColor({}, "drawerHeader");
  const surfaceColor = useThemeColor({}, "surface");
  const mutedTextColor = useThemeColor({}, "mutedText");
  const insets = useSafeAreaInsets();

  useEffect(() => {
    let isActive = true;

    async function resolvePdf() {
      const fileParam = Array.isArray(file) ? file[0] : file;

      if (!fileParam) {
        setError("Missing PDF source.");
        setLoading(false);
        return;
      }

      const fileModuleId = Number(fileParam);

      if (!Number.isFinite(fileModuleId)) {
        setError("Invalid PDF source.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const asset = Asset.fromModule(fileModuleId);
        await asset.downloadAsync();

        if (isActive) {
          setPdfUri(asset.localUri ?? asset.uri);
        }
      } catch {
        if (isActive) {
          setError("Failed to load the PDF.");
        }
      } finally {
        if (isActive) {
          setLoading(false);
        }
      }
    }

    void resolvePdf();

    return () => {
      isActive = false;
    };
  }, [file]);

  return (
    <SafeAreaView
      edges={["left", "right", "bottom"]}
      style={[styles.screen, { backgroundColor }]}
    >
      <View
        style={[
          styles.topRow,
          { backgroundColor: surfaceColor, paddingTop: insets.top + 14 },
        ]}
      >
        <Pressable hitSlop={10} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={28} color={blueTest} />
        </Pressable>
        <Text numberOfLines={1} style={[styles.headerTitle, { color: textColor }]}>
          {name}
        </Text>
      </View>

      <View style={styles.viewer}>
        {loading ? (
          <View style={styles.center}>
            <ActivityIndicator size="small" color={mutedTextColor} />
            <Text style={[styles.statusText, { color: mutedTextColor }]}>
              Loading PDF...
            </Text>
          </View>
        ) : error ? (
          <View style={styles.center}>
            <Text style={[styles.errorText, { color: "#ef4444" }]}>{error}</Text>
          </View>
        ) : pdfUri ? (
          <PdfViewer pdfSource={pdfUri} />
        ) : null}
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
  viewer: {
    flex: 1,
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  statusText: {
    fontSize: 14,
    fontWeight: "600",
    marginTop: 12,
  },
  errorText: {
    fontSize: 14,
    fontWeight: "700",
  },
});
