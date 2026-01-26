import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Platform,
} from "react-native";
import RNFS from "react-native-fs";
import { Linking } from "react-native";

const UpdateScreen = ({ route }) => {
  const { updateData } = route.params || {};
  const [downloading, setDownloading] = useState(false);
  const [progress, setProgress] = useState(0);

  const downloadAndInstall = async () => {
    if (!updateData?.updateUrl) {
      Alert.alert("Error", "Update URL not found");
      return;
    }

    try {
      setDownloading(true);
      setProgress(0);

      const apkPath = `${RNFS.DownloadDirectoryPath}/btechwala_${Date.now()}.apk`;

      const downloadOptions = {
        fromUrl: updateData.updateUrl,
        toFile: apkPath,
        progress: (res) => {
          if (res.contentLength > 0) {
            setProgress(Math.floor((res.bytesWritten / res.contentLength) * 100));
          }
        },
        progressDivider: 1,
      };

      const ret = RNFS.downloadFile(downloadOptions);
      const result = await ret.promise;

      if (result.statusCode === 200) {
        if (Platform.OS === "android") {
          // Open the APK file to trigger install prompt
          Linking.openURL(`file://${apkPath}`);
        } else {
          Alert.alert("Downloaded", "APK downloaded to: " + apkPath);
        }
      } else {
        throw new Error("Download failed with status " + result.statusCode);
      }
    } catch (e) {
      console.log("UPDATE ERROR ❌", e);
      Alert.alert(
        "Update Failed",
        "Unable to install update. Please try again."
      );
    } finally {
      setDownloading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Update Available</Text>

      <Text style={styles.desc}>
        A new version ({updateData?.latestVersion}) is
        available. Please update to continue using the app.
      </Text>

      {downloading && (
        <Text style={styles.progress}>
          Downloading… {progress}%
        </Text>
      )}

      <TouchableOpacity
        style={styles.button}
        onPress={downloadAndInstall}
        disabled={downloading}
      >
        <Text style={styles.buttonText}>
          {downloading ? "Updating…" : "Update Now"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default UpdateScreen;

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#07070a",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },

  title: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "800",
    marginBottom: 12,
  },

  desc: {
    color: "#9ca3af",
    fontSize: 14,
    textAlign: "center",
    marginBottom: 30,
    lineHeight: 20,
  },

  progress: {
    color: "#22c55e",
    marginBottom: 14,
    fontSize: 14,
  },

  button: {
    width: "100%",
    height: 52,
    backgroundColor: "#ffffff",
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },

  buttonText: {
    color: "#000",
    fontSize: 15,
    fontWeight: "600",
  },
});
