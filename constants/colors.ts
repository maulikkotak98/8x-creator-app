/**
 * Single source of truth for all app colour tokens.
 * Reference these in StyleSheet.create() calls — never use raw hex strings in screens.
 */
export const AppColors = {
  // ── Backgrounds ───────────────────────────────────────────────────────────
  screenBg: '#070910',
  cardBg: '#111422',
  cardBorder: '#1b2132',
  panelBg: '#0b0f1b',
  feedbackBg: '#1b2233',
  avatarBg: '#141927',

  // ── Text ──────────────────────────────────────────────────────────────────
  textPrimary: '#f6f7fb',
  textSecondary: '#8e93a5',
  textTertiary: '#97a0b8',
  textSectionTitle: '#9ca4b9',
  textParagraph: '#c8cedd',
  textFeedback: '#b8bfce',
  textPlaceholder: '#677089',

  // ── Accent – Green (payout, approved, active) ─────────────────────────────
  green: '#5ae17e',
  greenLight: '#67e68a',
  greenBg: '#1f3c2a',

  // ── Accent – Yellow (deadline, pending) ───────────────────────────────────
  yellow: '#f5da6f',
  yellowMuted: '#eac56f',
  yellowBg: '#2a2616',
  pendingBg: '#3a3217',

  // ── Accent – Red (rejected, error) ────────────────────────────────────────
  red: '#f58a99',
  redBg: '#3f1f25',

  // ── Accent – Blue (links, back navigation) ────────────────────────────────
  blue: '#70c9ff',

  // ── Tab bar ───────────────────────────────────────────────────────────────
  tabBarBg: '#070910',
  tabBarBorder: '#171b29',
  tabBarInactive: '#6f7482',
  tabBarActive: '#5ae17e',
} as const;
