import React, { useEffect, useState } from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const InstagramFollowPopup = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      checkPopup();
    }, 2000); // ⏱ HomeScreen ke 2 sec baad

    return () => clearTimeout(timer);
  }, []);

  const checkPopup = async () => {
    const shown = await AsyncStorage.getItem("insta_popup_done");
    if (!shown) {
      setVisible(true);
    }
  };

  const closePopup = async () => {
    await AsyncStorage.setItem("insta_popup_done", "yes");
    setVisible(false);
  };

  const openInstagram = () => {
    Linking.openURL("https://www.instagram.com/plcreationss/");
    closePopup();
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.card}>
          {/* Close */}
          <TouchableOpacity style={styles.close} onPress={closePopup}>
            <Text style={styles.closeText}>✕</Text>
          </TouchableOpacity>

          <Text style={styles.logo}>📸</Text>
          <Text style={styles.title}>Follow PL CREATION</Text>

          <Text style={styles.desc}>
            App ke saath-saath Instagram par follow karna{"\n"}
            **important hai**, kyunki 👇
          </Text>

          <View style={styles.reasons}>
            <Text style={styles.point}>• Daily Notes & PYQs updates</Text>
            <Text style={styles.point}>• Exam alerts & important topics</Text>
            <Text style={styles.point}>• Free study resources</Text>
            <Text style={styles.point}>• AKTU & BTech news</Text>
          </View>

          <TouchableOpacity style={styles.btn} onPress={openInstagram}>
            <Text style={styles.btnText}>Follow on Instagram</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={closePopup}>
            <Text style={styles.skip}>Skip for now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default InstagramFollowPopup;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.75)",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: "88%",
    backgroundColor: "#121212",
    borderRadius: 18,
    padding: 22,
    alignItems: "center",
  },
  close: {
    position: "absolute",
    right: 14,
    top: 10,
  },
  closeText: {
    color: "#aaa",
    fontSize: 18,
  },
  logo: {
    fontSize: 42,
    marginBottom: 6,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  desc: {
    fontSize: 14,
    color: "#ccc",
    textAlign: "center",
    marginVertical: 10,
  },
  reasons: {
    width: "100%",
    backgroundColor: "#1e1e1e",
    borderRadius: 12,
    padding: 12,
    marginBottom: 18,
  },
  point: {
    color: "#ddd",
    fontSize: 13.5,
    marginVertical: 3,
  },
  btn: {
    width: "100%",
    backgroundColor: "#E1306C",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
  },
  btnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
  },
  skip: {
    color: "#999",
    fontSize: 13,
  },
});