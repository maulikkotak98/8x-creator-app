import { Image } from "expo-image";
import { useLocalSearchParams, useRouter } from "expo-router";
import { type ReactNode, useMemo } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { BackButton } from "@/components/back-button";
import { AppColors } from "@/constants/colors";
import { Radius, Spacing } from "@/constants/layout";
import { useCreatorFlow } from "@/context/creator-flow-context";
import { openUrl } from "@/utils/linking";

export default function CampaignDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { campaigns } = useCreatorFlow();

  const campaign = useMemo(
    () => campaigns.find((c) => c.id === id),
    [campaigns, id],
  );

  if (!campaign) {
    return (
      <View style={styles.emptyState}>
        <Text style={styles.emptyText}>Campaign not found.</Text>
        <Pressable onPress={() => router.back()} style={styles.emptyBackBtn}>
          <Text style={styles.emptyBackLabel}>Go back</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      {/* Stays under the status bar / notch; only body scrolls */}
      <View
        style={[
          styles.stickyHeader,
          {
            paddingTop: insets.top + Spacing.sm,
            paddingBottom: Spacing.md,
          },
        ]}
      >
        <BackButton onPress={() => router.back()} />
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: Spacing.screenBottom + insets.bottom },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.brand}>{campaign.brand}</Text>
        <Text style={styles.title}>{campaign.title}</Text>

        <Image
          source={{ uri: campaign.coverImage }}
          style={styles.coverImage}
          contentFit="cover"
        />

        <View style={styles.metaRow}>
          <Text style={styles.payout}>${campaign.payout}</Text>
          <Text style={styles.pill}>{campaign.daysLeft}d remaining</Text>
        </View>

        <SectionTitle>BRIEF</SectionTitle>
        <Text style={styles.paragraph}>{campaign.brief}</Text>

        <SectionTitle>DO&apos;S</SectionTitle>
        {campaign.dos.map((item) => (
          <Text key={item} style={styles.doItem}>
            ✓ {item}
          </Text>
        ))}

        <SectionTitle>DON&apos;TS</SectionTitle>
        {campaign.donts.map((item) => (
          <Text key={item} style={styles.dontItem}>
            ✕ {item}
          </Text>
        ))}

        <SectionTitle>EXAMPLE VIDEOS</SectionTitle>
        {campaign.examples.map((example) => (
          <Pressable
            key={example.url}
            onPress={() => openUrl(example.url)}
            style={styles.exampleCard}
          >
            <Image
              source={{ uri: example.thumbnail }}
              style={styles.exampleThumb}
              contentFit="cover"
            />
            <View style={styles.exampleTextWrap}>
              <Text style={styles.exampleTitle}>{example.title}</Text>
              <Text style={styles.link}>Watch</Text>
            </View>
          </Pressable>
        ))}
      </ScrollView>

      <View
        style={[
          styles.submitPanel,
          { paddingBottom: Spacing.lg + 2 + insets.bottom },
        ]}
      >
        <Pressable
          onPress={() => router.push(`/campaign/${campaign.id}/submit`)}
          style={styles.submitButton}
        >
          <Text style={styles.submitButtonLabel}>Submit Your Video</Text>
        </Pressable>
      </View>
    </View>
  );
}

function SectionTitle({ children }: { children: ReactNode }) {
  return <Text style={sectionStyles.title}>{children}</Text>;
}

const sectionStyles = StyleSheet.create({
  title: {
    marginTop: Spacing.xl,
    marginBottom: Spacing.sm,
    color: AppColors.textSectionTitle,
    letterSpacing: 1,
    fontWeight: "700",
    fontSize: 12,
  },
});

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: AppColors.screenBg,
  },
  stickyHeader: {
    paddingHorizontal: Spacing.lg,
    backgroundColor: AppColors.screenBg,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: AppColors.cardBorder,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
  },
  brand: {
    color: AppColors.textSecondary,
  },
  title: {
    color: AppColors.textPrimary,
    fontWeight: "700",
    fontSize: 28,
    marginTop: Spacing.xs,
  },
  coverImage: {
    width: "100%",
    height: 180,
    borderRadius: Radius.lg,
    marginTop: Spacing.md,
  },
  metaRow: {
    marginTop: Spacing.md,
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.md,
  },
  payout: {
    color: AppColors.green,
    fontWeight: "700",
    fontSize: 26,
  },
  pill: {
    color: AppColors.yellow,
    backgroundColor: AppColors.yellowBg,
    paddingHorizontal: Spacing.sm + 2,
    paddingVertical: Spacing.sm - 2,
    borderRadius: Radius.full,
    overflow: "hidden",
    fontSize: 13,
    fontWeight: "600",
  },
  paragraph: {
    color: AppColors.textParagraph,
    lineHeight: 21,
  },
  doItem: {
    color: AppColors.greenLight,
    marginBottom: Spacing.sm - 2,
  },
  dontItem: {
    color: AppColors.red,
    marginBottom: Spacing.sm - 2,
  },
  exampleCard: {
    backgroundColor: AppColors.cardBg,
    borderWidth: 1,
    borderColor: AppColors.cardBorder,
    borderRadius: Radius.md,
    padding: Spacing.sm + 2,
    marginBottom: Spacing.sm + 2,
    flexDirection: "row",
    gap: Spacing.sm + 2,
    alignItems: "center",
  },
  exampleThumb: {
    width: 100,
    height: 60,
    borderRadius: Radius.sm,
  },
  exampleTextWrap: {
    flex: 1,
  },
  exampleTitle: {
    color: AppColors.textPrimary,
    fontWeight: "600",
    marginBottom: 2,
  },
  link: {
    color: AppColors.blue,
    fontWeight: "600",
  },
  submitPanel: {
    backgroundColor: AppColors.panelBg,
    borderTopWidth: 1,
    borderTopColor: AppColors.cardBorder,
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
  },
  submitButton: {
    backgroundColor: AppColors.green,
    borderRadius: Radius.md,
    paddingVertical: 14,
    alignItems: "center",
  },
  submitButtonLabel: {
    color: "#0b130f",
    fontWeight: "700",
    fontSize: 16,
  },
  emptyState: {
    flex: 1,
    backgroundColor: AppColors.screenBg,
    justifyContent: "center",
    alignItems: "center",
    padding: Spacing.lg,
  },
  emptyText: {
    color: AppColors.textPrimary,
    fontSize: 18,
    fontWeight: "700",
  },
  emptyBackBtn: {
    marginTop: Spacing.lg,
    backgroundColor: AppColors.cardBg,
    borderRadius: Radius.md,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm + 2,
  },
  emptyBackLabel: {
    color: AppColors.textPrimary,
    fontWeight: "600",
  },
});
