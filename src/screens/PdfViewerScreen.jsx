import React from "react";
import { View, StyleSheet } from "react-native";
import { WebView } from "react-native-webview";
import TopNavbarBack from "../components/navigation/TopNavBarBack";

export default function PdfViewerScreen({ route }) {
  const { pdfUrl, title } = route.params;

  const viewerUri =
    "file:///android_asset/pdfjs/index.html?url=" +
    encodeURIComponent(pdfUrl);

  return (
    <View style={styles.container}>
      <TopNavbarBack title={title || "PDF"} />
      <WebView
        source={{ uri: viewerUri }}
        originWhitelist={["*"]}
        javaScriptEnabled
        allowFileAccess
        allowUniversalAccessFromFileURLs
        style={{ flex: 1 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },
});
