import React from "react";
import {
  View,
  StyleSheet,
  ViewStyle,
  StyleProp,
} from "react-native";
import { PdfView } from "@kishannareshpal/expo-pdf";

interface PdfViewerProps {
  pdfSource: string;
  horizontal?: boolean;
  style?: StyleProp<ViewStyle>;
}

export default function PdfViewer({ pdfSource, horizontal = false, style }: PdfViewerProps) {
  return (
    <View style={[styles.container, style]}>
      <PdfView
        uri={pdfSource}
        horizontal={horizontal}
        doubleTapToZoom
        pageGap={2}
        style={StyleSheet.absoluteFillObject}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

