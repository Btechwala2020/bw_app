import React from "react";
import { View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "react-native";
import { WebView } from "react-native-webview";
import TopNavbarBack from "../components/navigation/TopNavBarBack";

export default function AktuResultWebViewScreen() {
  return (
    <SafeAreaView
        style={{ flex: 1, backgroundColor: "#07070a" }}
        edges={["top", "bottom"]}
      >
      <StatusBar
        barStyle="light-content"
        backgroundColor="#07070a"
        translucent={false}
      />
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#07070a",
  },
});
