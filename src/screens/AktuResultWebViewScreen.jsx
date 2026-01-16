import React from "react";
import { View, StyleSheet } from "react-native";
import { WebView } from "react-native-webview";
import TopNavbarBack from "../components/navigation/TopNavBarBack";

export default function AktuResultWebViewScreen() {
  return (
    <View style={styles.container}>
      <TopNavbarBack title="AKTU Result" />

      <WebView
        source={{
          uri: "https://erp.aktu.ac.in/webpages/oneview/oneview.aspx?AspxAutoDetectCookieSupport=1",
        }}
        javaScriptEnabled
        domStorageEnabled
        mixedContentMode="always"
        style={{ flex: 1 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#07070a",
  },
});
