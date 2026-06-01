import React, { useEffect, useMemo, useState } from "react";
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from "react-native";
import { Asset } from "expo-asset";
import Markdown from "react-native-markdown-display";

import { useThemeColor } from "@/hooks/use-theme-color";

interface MarkdownViewerProps {
  assetModule: any;
}

export default function MarkdownViewer({ assetModule }: MarkdownViewerProps) {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const textColor = useThemeColor({}, "text");
  const mutedTextColor = useThemeColor({}, "mutedText");
  const surfaceColor = useThemeColor({}, "surface");
  const borderColor = useThemeColor({}, "border");
  const accentColor = useThemeColor({}, "drawerHeader");
  const codeBackground = useThemeColor(
    { light: "#eef3f6", dark: "#101923" },
    "surface",
  );

  useEffect(() => {
    async function loadAsset() {
      try {
        setLoading(true);
        setError(false);
        const asset = Asset.fromModule(assetModule);
        await asset.downloadAsync();
        const response = await fetch(asset.localUri || asset.uri);
        const text = await response.text();
        setContent(text);
      } catch (err) {
        console.error("MarkdownViewer Error:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    if (assetModule) {
      loadAsset();
    }
  }, [assetModule]);

  const markdownStyles = useMemo(
    () => ({
      body: {
        color: textColor,
        fontSize: 16,
        lineHeight: 26,
        paddingHorizontal: 18,
        paddingBottom: 32,
      },
      paragraph: {
        marginTop: 0,
        marginBottom: 14,
      },
      heading1: {
        color: textColor,
        fontSize: 24,
        fontWeight: "800" as const,
        lineHeight: 32,
        marginTop: 8,
        marginBottom: 14,
      },
      heading2: {
        color: textColor,
        fontSize: 20,
        fontWeight: "800" as const,
        lineHeight: 28,
        marginTop: 22,
        marginBottom: 10,
      },
      heading3: {
        color: textColor,
        fontSize: 18,
        fontWeight: "700" as const,
        lineHeight: 26,
        marginTop: 18,
        marginBottom: 8,
      },
      heading4: {
        color: textColor,
        fontSize: 16,
        fontWeight: "700" as const,
        lineHeight: 24,
        marginTop: 14,
        marginBottom: 6,
      },
      strong: {
        color: textColor,
        fontWeight: "800" as const,
      },
      em: {
        color: mutedTextColor,
        fontStyle: "italic" as const,
      },
      link: {
        color: accentColor,
        fontWeight: "700" as const,
        textDecorationLine: "none" as const,
      },
      bullet_list: {
        marginBottom: 12,
      },
      ordered_list: {
        marginBottom: 12,
      },
      list_item: {
        marginBottom: 8,
      },
      bullet_list_icon: {
        color: accentColor,
        marginRight: 8,
      },
      ordered_list_icon: {
        color: accentColor,
        fontWeight: "700" as const,
        marginRight: 8,
      },
      blockquote: {
        backgroundColor: surfaceColor,
        borderLeftColor: accentColor,
        borderLeftWidth: 4,
        borderRadius: 8,
        marginVertical: 14,
        paddingHorizontal: 14,
        paddingVertical: 12,
      },
      code_inline: {
        backgroundColor: codeBackground,
        borderColor,
        borderRadius: 5,
        borderWidth: 1,
        color: textColor,
        fontSize: 14,
        paddingHorizontal: 6,
        paddingVertical: 2,
      },
      fence: {
        backgroundColor: codeBackground,
        borderColor,
        borderRadius: 8,
        borderWidth: 1,
        color: textColor,
        fontSize: 14,
        lineHeight: 22,
        marginVertical: 14,
        padding: 14,
      },
      hr: {
        backgroundColor: borderColor,
        height: 1,
        marginVertical: 24,
      },
      tableScroll: {
        marginVertical: 14,
        width: "100%" as const,
      },
      tableContainer: {
        backgroundColor: surfaceColor,
        borderColor,
        borderRadius: 8,
        borderWidth: 1,
        overflow: "hidden" as const,
      },
      thead: {
        backgroundColor: accentColor,
      },
      tr: {
        borderBottomColor: borderColor,
        borderBottomWidth: 1,
        flexDirection: "row" as const,
      },
      th: {
        justifyContent: "center" as const,
        padding: 12,
        width: 160,
      },
      td: {
        justifyContent: "center" as const,
        padding: 12,
        width: 160,
      },
      tableText: {
        color: textColor,
        flexShrink: 1,
        flexWrap: "wrap" as const,
        fontSize: 14,
        lineHeight: 20,
      },
    }),
    [
      accentColor,
      borderColor,
      codeBackground,
      mutedTextColor,
      surfaceColor,
      textColor,
    ],
  );

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="small" color={textColor} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={[styles.errorText, { color: "#ef4444" }]}>
          Error loading document.
        </Text>
      </View>
    );
  }

  const markdownRules = {
    table: (node: any, children: any, parent: any, renderStyles: any) => (
      <ScrollView
        key={node.key}
        horizontal
        showsHorizontalScrollIndicator
        style={renderStyles.tableScroll}
      >
        <View style={renderStyles.tableContainer}>{children}</View>
      </ScrollView>
    ),

    th: (node: any, children: any, parent: any, renderStyles: any) => (
      <View key={node.key} style={renderStyles.th}>
        <Text style={renderStyles.tableText}>{children}</Text>
      </View>
    ),

    td: (node: any, children: any, parent: any, renderStyles: any) => (
      <View key={node.key} style={renderStyles.td}>
        <Text style={renderStyles.tableText}>{children}</Text>
      </View>
    ),
  };

  return (
    <Markdown style={markdownStyles} rules={markdownRules}>
      {content}
    </Markdown>
  );
}

const styles = StyleSheet.create({
  center: {
    padding: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: 14,
    fontWeight: "600",
  },
});

