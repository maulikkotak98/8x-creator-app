import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { StatusBadge } from "@/components/status-badge";
import { StickyScreenHeader } from "@/components/sticky-screen-header";
import { AppColors } from "@/constants/colors";
import { Radius, Spacing } from "@/constants/layout";
import { useCreatorFlow } from "@/context/creator-flow-context";
import { openUrl } from "@/utils/linking";

export default function SubmissionsScreen() {
  const { submissions } = useCreatorFlow();

  return (
    <View style={styles.root}>
      <StickyScreenHeader
        title="My Submissions"
        subtitle={`${submissions.length} total`}
      />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {submissions.map((submission) => (
          <View key={submission.id} style={styles.card}>
            <View style={styles.rowBetween}>
              <Text style={styles.brand}>{submission.brand}</Text>
              <StatusBadge status={submission.status} />
            </View>

            <Text style={styles.campaignTitle}>{submission.campaignTitle}</Text>
            <Text style={styles.meta}>
              {submission.platform} · {submission.submittedAt}
            </Text>

            {submission.feedback ? (
              <Text style={styles.feedback}>{submission.feedback}</Text>
            ) : null}

            <View style={styles.rowBetween}>
              <Pressable onPress={() => openUrl(submission.videoUrl)}>
                <Text style={styles.viewLink}>View video</Text>
              </Pressable>
              <Text style={styles.payout}>${submission.payout}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
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
    paddingTop: Spacing.sm,
    paddingBottom: Spacing.screenBottom,
  },
  card: {
    backgroundColor: AppColors.cardBg,
    borderWidth: 1,
    borderColor: AppColors.cardBorder,
    borderRadius: Radius.xl,
    padding: Spacing.md + 2,
    marginBottom: Spacing.md,
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  brand: {
    color: AppColors.textPrimary,
    fontWeight: "700",
    fontSize: 16,
  },
  campaignTitle: {
    color: AppColors.textTertiary,
    marginTop: 2,
  },
  meta: {
    color: AppColors.textSecondary,
    marginTop: Spacing.sm - 2,
  },
  feedback: {
    marginTop: Spacing.sm + 2,
    color: AppColors.textFeedback,
    backgroundColor: AppColors.feedbackBg,
    borderRadius: Radius.md - 2,
    padding: Spacing.sm + 2,
  },
  viewLink: {
    marginTop: Spacing.md,
    color: AppColors.blue,
    fontWeight: "600",
  },
  payout: {
    marginTop: Spacing.md,
    color: AppColors.green,
    fontWeight: "700",
    fontSize: 18,
  },
});
