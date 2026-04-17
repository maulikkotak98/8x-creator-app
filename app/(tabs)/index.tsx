import { Image } from "expo-image";
import { Link } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { StickyScreenHeader } from "@/components/sticky-screen-header";
import { AppColors } from "@/constants/colors";
import { Radius, Spacing } from "@/constants/layout";
import { useCreatorFlow } from "@/context/creator-flow-context";

export default function CampaignsScreen() {
  const { campaigns } = useCreatorFlow();

  return (
    <View style={styles.root}>
      <StickyScreenHeader
        title="Campaigns"
        subtitle={`${campaigns.length} active opportunities`}
      />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {campaigns.map((campaign) => (
          <Link key={campaign.id} href={`/campaign/${campaign.id}`} asChild>
            <Pressable style={styles.card}>
              <Image
                source={{ uri: campaign.coverImage }}
                style={styles.coverImage}
                contentFit="cover"
              />
              <View style={styles.cardHeader}>
                <Text style={styles.brand}>{campaign.brand}</Text>
                <Text
                  style={[
                    styles.badge,
                    campaign.daysLeft <= 10 && styles.badgeUrgent,
                  ]}
                >
                  {campaign.daysLeft <= 10 ? "Closing Soon" : "Active"}
                </Text>
              </View>
              <Text style={styles.campaignTitle}>{campaign.title}</Text>
              <View style={styles.metaRow}>
                <Text style={styles.payout}>${campaign.payout}</Text>
                <Text style={styles.metaText}>{campaign.daysLeft}d left</Text>
              </View>
            </Pressable>
          </Link>
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
  coverImage: {
    width: "100%",
    height: 140,
    borderRadius: Radius.md,
    marginBottom: Spacing.md,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  brand: {
    color: AppColors.textPrimary,
    fontWeight: "700",
    fontSize: 16,
  },
  badge: {
    color: AppColors.yellow,
    backgroundColor: AppColors.yellowBg,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: Radius.full,
    overflow: "hidden",
    fontSize: 12,
    fontWeight: "600",
  },
  badgeUrgent: {
    color: AppColors.red,
    backgroundColor: AppColors.redBg,
  },
  campaignTitle: {
    color: AppColors.textTertiary,
    marginTop: 3,
  },
  metaRow: {
    flexDirection: "row",
    gap: Spacing.md,
    marginTop: Spacing.sm + 2,
  },
  payout: {
    color: AppColors.green,
    fontWeight: "700",
    fontSize: 16,
  },
  metaText: {
    color: AppColors.textSecondary,
    fontSize: 14,
  },
});
