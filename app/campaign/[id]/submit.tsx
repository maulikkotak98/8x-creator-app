import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useMemo, useRef, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BackButton } from '@/components/back-button';
import { AppColors } from '@/constants/colors';
import { Radius, Spacing } from '@/constants/layout';
import { useCreatorFlow } from '@/context/creator-flow-context';

export default function SubmitVideoScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { campaigns, submitVideo } = useCreatorFlow();

  const [videoUrl, setVideoUrl] = useState('');
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const campaign = useMemo(() => campaigns.find((c) => c.id === id), [campaigns, id]);

  const redirectTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    return () => {
      if (redirectTimerRef.current) {
        clearTimeout(redirectTimerRef.current);
      }
    };
  }, []);

  if (!campaign) {
    return (
      <View style={styles.emptyState}>
        <Text style={styles.notFoundTitle}>Campaign not found.</Text>
        <Pressable onPress={() => router.back()} style={styles.emptyBackButton}>
          <Text style={styles.emptyBackLabel}>Go back</Text>
        </Pressable>
      </View>
    );
  }

  const handleSubmit = () => {
    setError('');
    const result = submitVideo(campaign.id, videoUrl);

    if (!result.ok) {
      setError(result.error ?? '');
      return;
    }

    setSubmitted(true);
    setVideoUrl('');

    redirectTimerRef.current = setTimeout(() => {
      router.replace('/explore');
    }, 800);
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
      <KeyboardAvoidingView
        style={styles.keyboardWrap}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}>
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollInner}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="interactive"
          showsVerticalScrollIndicator={false}>
          <BackButton onPress={() => router.back()} />

          <Text style={styles.title}>Submit Video</Text>
          <Text style={styles.subtitle}>
            {campaign.brand} · {campaign.title}
          </Text>

          <Text style={styles.label}>VIDEO URL</Text>
          <View style={styles.inputWrap}>
            <TextInput
              value={videoUrl}
              onChangeText={setVideoUrl}
              placeholder="https://www.tiktok.com/@you/video/..."
              placeholderTextColor={AppColors.textPlaceholder}
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="url"
              returnKeyType="done"
              {...(Platform.OS === 'ios'
                ? ({ textContentType: 'URL', clearButtonMode: 'while-editing' } as const)
                : {})}
              onSubmitEditing={handleSubmit}
              style={styles.input}
              multiline={false}
              showSoftInputOnFocus
            />
          </View>

          {error ? <Text style={styles.error}>{error}</Text> : null}
          {submitted ? (
            <Text style={styles.success}>Submitted! Redirecting to My Submissions…</Text>
          ) : null}

          <Pressable onPress={handleSubmit} style={styles.submitButton}>
            <Text style={styles.submitButtonLabel}>Submit</Text>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: AppColors.screenBg,
  },
  keyboardWrap: {
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
  scrollInner: {
    flexGrow: 1,
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.sm,
    paddingBottom: Spacing.xxl,
  },
  title: {
    color: AppColors.textPrimary,
    fontWeight: '700',
    fontSize: 30,
    marginTop: Spacing.md,
  },
  subtitle: {
    color: AppColors.textSecondary,
    marginTop: Spacing.xs,
    marginBottom: Spacing.xl,
  },
  label: {
    color: AppColors.textSectionTitle,
    letterSpacing: 1,
    fontWeight: '700',
    fontSize: 12,
    marginBottom: Spacing.sm,
  },
  inputWrap: {
    minHeight: 52,
    borderRadius: Radius.md,
    backgroundColor: AppColors.cardBg,
    borderWidth: 1,
    borderColor: AppColors.cardBorder,
    justifyContent: 'center',
  },
  input: {
    color: AppColors.textPrimary,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    fontSize: 16,
    minHeight: 48,
  },
  error: {
    color: AppColors.red,
    marginTop: Spacing.sm,
  },
  success: {
    color: AppColors.greenLight,
    marginTop: Spacing.sm,
  },
  submitButton: {
    marginTop: Spacing.md + 2,
    backgroundColor: AppColors.green,
    borderRadius: Radius.md,
    paddingVertical: 14,
    alignItems: 'center',
  },
  submitButtonLabel: {
    color: '#0b130f',
    fontWeight: '700',
    fontSize: 16,
  },
  emptyState: {
    flex: 1,
    backgroundColor: AppColors.screenBg,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.lg,
  },
  notFoundTitle: {
    color: AppColors.textPrimary,
    fontWeight: '700',
    fontSize: 18,
  },
  emptyBackButton: {
    marginTop: Spacing.lg,
    backgroundColor: AppColors.cardBg,
    borderRadius: Radius.md,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm + 2,
  },
  emptyBackLabel: {
    color: AppColors.textPrimary,
    fontWeight: '600',
  },
});
