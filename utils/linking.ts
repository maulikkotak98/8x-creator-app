import { Alert, Linking } from "react-native";

/**
 * Safely opens a URL in the device browser or relevant app.
 * Falls back to a user-friendly alert instead of silently failing.
 */
export async function openUrl(url: string): Promise<void> {
  try {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert(
        "Cannot open link",
        "This URL cannot be opened on your device.",
      );
    }
  } catch {
    Alert.alert("Error", "Something went wrong while opening this link.");
  }
}

/**
 * Returns true if the URL looks like a valid TikTok or Instagram video link.
 * Used to validate creator-submitted video URLs before accepting them.
 */
export function isValidVideoUrl(url: string): boolean {
  const trimmed = url.trim();
  return (
    trimmed.startsWith("https://www.tiktok.com/") ||
    trimmed.startsWith("https://www.instagram.com/")
  );
}
