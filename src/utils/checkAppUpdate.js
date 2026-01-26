import { getApp } from "@react-native-firebase/app";
import { getFirestore, doc, getDoc } from "@react-native-firebase/firestore";

export const checkAppUpdate = async (navigation) => {
  try {
    // ✅ Explicit app (v22 safe)
    const app = getApp();
    const db = getFirestore(app);

    const ref = doc(db, "app_config", "update");
    const snap = await getDoc(ref);

    if (!snap.exists()) {
      console.log("UPDATE DOC NOT FOUND ❌");
      return false;
    }

    const data = snap.data();
    console.log("UPDATE DATA 👉", data);

    if (!data?.latestVersion || !data?.updateUrl) {
      console.log("INVALID UPDATE DATA ❌");
      return false;
    }

    const CURRENT_VERSION = "1.0.3";

    if (CURRENT_VERSION === data.latestVersion.trim()) {
      console.log("NO UPDATE (SAME VERSION) ✅");
      return false;
    }

    console.log("UPDATE AVAILABLE ✅");
    navigation.replace("Update", { updateData: data });
    return true;
  } catch (error) {
    console.log("CHECK UPDATE ERROR ❌", error);
    return false;
  }
};
