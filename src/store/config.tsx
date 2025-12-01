import { Platform } from "react-native";

// FOR EMULATOR OR SIMULATOR DEVICE
export const BASE_URL =
  Platform.OS === "android"
    ? "http://10.0.2.2:3000"
    : "http://localhost:3000";

// FOR PHYSICAL DEVICE (uncomment when needed)
// export const BASE_URL = 'http://192.168.1.35:3000';
