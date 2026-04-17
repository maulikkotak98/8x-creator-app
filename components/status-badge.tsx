import { StyleSheet, Text } from 'react-native';

import { AppColors } from '@/constants/colors';
import type { SubmissionStatus } from '@/types';

type Props = {
  status: SubmissionStatus;
};

type BadgeConfig = {
  label: string;
  bg: string;
  fg: string;
};

const BADGE_CONFIG: Record<SubmissionStatus, BadgeConfig> = {
  approved: { label: 'Approved', bg: AppColors.greenBg, fg: AppColors.greenLight },
  pending:  { label: 'Pending',  bg: AppColors.pendingBg, fg: AppColors.yellowMuted },
  rejected: { label: 'Rejected', bg: AppColors.redBg, fg: AppColors.red },
};

export function StatusBadge({ status }: Props) {
  const { label, bg, fg } = BADGE_CONFIG[status];
  return (
    <Text style={[styles.badge, { backgroundColor: bg, color: fg }]}>{label}</Text>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
    overflow: 'hidden',
    fontSize: 12,
    fontWeight: '600',
  },
});
