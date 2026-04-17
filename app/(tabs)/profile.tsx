import { Image } from "expo-image";
import { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import { StickyScreenHeader } from "@/components/sticky-screen-header";
import { AppColors } from "@/constants/colors";
import { Radius, Spacing } from "@/constants/layout";
import { useCreatorFlow } from "@/context/creator-flow-context";

const AVATAR_URI = "https://randomuser.me/api/portraits/men/32.jpg";

export default function ProfileScreen() {
  const { submissions } = useCreatorFlow();
  const [avatarFailed, setAvatarFailed] = useState(false);

  const approvedCount = submissions.filter(
    (s) => s.status === "approved",
  ).length;
  const totalEarned = submissions
    .filter((s) => s.status === "approved")
    .reduce((sum, s) => sum + s.payout, 0);

  return (
    <View style={styles.root}>
      <StickyScreenHeader title="Profile" />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.avatar}>
          {avatarFailed ? (
            <Text style={styles.avatarFallback}>C</Text>
          ) : (
            <Image
              source={{ uri: AVATAR_URI }}
              style={styles.avatarImage}
              contentFit="cover"
              onError={() => setAvatarFailed(true)}
            />
          )}
        </View>

        <Text style={styles.role}>Creator</Text>
        <Text style={styles.handle}>@yourcreatorhandle</Text>

        <View style={styles.statsRow}>
          <StatCard label="Submitted" value={String(submissions.length)} />
          <StatCard label="Approved" value={String(approvedCount)} highlight />
          <StatCard label="Earned" value={`$${totalEarned}`} highlight />
        </View>
      </ScrollView>
    </View>
  );
}

type StatCardProps = { label: string; value: string; highlight?: boolean };

function StatCard({ label, value, highlight = false }: StatCardProps) {
  return (
    <View style={statStyles.card}>
      <Text style={[statStyles.value, highlight && statStyles.valueHighlight]}>
        {value}
      </Text>
      <Text style={statStyles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: AppColors.screenBg,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.screenBottom,
  },
  avatar: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: AppColors.avatarBg,
    borderWidth: 1,
    borderColor: AppColors.cardBorder,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    overflow: "hidden",
  },
  avatarImage: {
    width: "100%",
    height: "100%",
  },
  avatarFallback: {
    color: AppColors.textPrimary,
    fontSize: 28,
    fontWeight: "700",
  },
  role: {
    marginTop: Spacing.lg,
    color: AppColors.textPrimary,
    alignSelf: "center",
    fontSize: 20,
    fontWeight: "700",
  },
  handle: {
    marginTop: Spacing.xs,
    color: AppColors.textSecondary,
    alignSelf: "center",
    marginBottom: Spacing.xxl - 2,
  },
  statsRow: {
    flexDirection: "row",
    gap: Spacing.sm + 2,
  },
});

const statStyles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: AppColors.cardBg,
    borderWidth: 1,
    borderColor: AppColors.cardBorder,
    borderRadius: Radius.lg,
    paddingVertical: 18,
    alignItems: "center",
  },
  value: {
    color: AppColors.textPrimary,
    fontSize: 24,
    fontWeight: "700",
  },
  valueHighlight: {
    color: AppColors.green,
  },
  label: {
    color: AppColors.textSecondary,
    marginTop: Spacing.xs,
  },
});
