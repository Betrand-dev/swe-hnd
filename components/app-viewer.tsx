import React from "react";
import {
  StyleSheet,
  ViewStyle,
  StyleProp,
} from "react-native";
import { PdfView } from "@kishannareshpal/expo-pdf";

interface PdfViewerProps {
  pdfSource: any;
  horizontal?: boolean
  style?: StyleProp<ViewStyle>;
}

export default function PdfViewer({ pdfSource, horizontal=false, style }: PdfViewerProps) {
    return(
        <PdfView 
            uri={pdfSource}
            horizontal={horizontal}
            doubleTapToZoom={true}
            pageGap={3}
            style={[StyleSheet.absoluteFillObject,{flex: 1}, style]}
        />
    )
}


