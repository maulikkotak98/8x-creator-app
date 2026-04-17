import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppColors } from '@/constants/colors';
import { Spacing } from '@/constants/layout';

type Props = {
  title: string;
  subtitle?: string;
};

/**
 * Sticky title row below the notch / status bar. Keeps the heading fixed while list content scrolls.
 */
export function StickyScreenHeader({ title, subtitle }: Props) {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: insets.top + Spacing.sm,
        },
      ]}>
      <Text style={styles.title}>{title}</Text>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.md,
    backgroundColor: AppColors.screenBg,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: AppColors.cardBorder,
  },
  title: {
    color: AppColors.textPrimary,
    fontSize: 30,
    fontWeight: '700',
  },
  subtitle: {
    color: AppColors.textSecondary,
    marginTop: Spacing.xs,
  },
});
