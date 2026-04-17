import { Pressable, StyleSheet, Text } from "react-native";

import { AppColors } from "@/constants/colors";

type Props = {
  onPress: () => void;
  label?: string;
};

export function BackButton({ onPress, label = "Back" }: Props) {
  return (
    <Pressable onPress={onPress} hitSlop={12}>
      <Text style={styles.text}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  text: {
    color: AppColors.blue,
    fontSize: 16,
    fontWeight: "600",
  },
});
