import { getApp } from "@react-native-firebase/app";
import { getFirestore, doc, getDoc } from "@react-native-firebase/firestore";
import DeviceInfo from "react-native-device-info";

export const checkAppUpdate = async (navigation) => {
  try {
    const app = getApp();
    const db = getFirestore(app);

    const ref = doc(db, "app_config", "update");
    const snap = await getDoc(ref);

    if (!snap.exists()) return false;

    const data = snap.data();
    if (!data?.latestVersion || !data?.updateUrl) return false;

    const CURRENT_VERSION = DeviceInfo.getVersion();

    if (CURRENT_VERSION === data.latestVersion.trim()) {
      return false;
    }

    navigation.replace("Update", { updateData: data });
    return true;
  } catch (e) {
    console.log("UPDATE CHECK ERROR ❌", e);
    return false;
  }
};
