import { View, Text, Pressable, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

import { Button, Input, Card } from '../../src/components/ui';

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const { t } = useTranslation();

  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validateEmail = (): boolean => {
    if (!email) {
      setError(t('validation.required'));
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError(t('validation.invalidEmail'));
      return false;
    }
    setError('');
    return true;
  };

  const handleSubmit = async () => {
    if (!validateEmail()) return;

    setIsLoading(true);
    try {
      // TODO: Implement API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setIsSuccess(true);
    } catch (err) {
      Alert.alert(t('errors.error'), t('errors.somethingWentWrong'));
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      Alert.alert(t('common.success'), t('auth.otpResent'));
    } catch (err) {
      Alert.alert(t('errors.error'), t('errors.somethingWentWrong'));
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <SafeAreaView className="flex-1 bg-background">
        <View className="flex-1 px-6 py-4">
          {/* Header */}
          <Pressable onPress={() => router.back()} className="mb-6">
            <Text className="text-2xl">←</Text>
          </Pressable>

          {/* Success State */}
          <View className="flex-1 items-center justify-center">
            <View className="w-24 h-24 bg-primary-50 rounded-full items-center justify-center mb-6">
              <Text className="text-5xl">📧</Text>
            </View>
            <Text className="text-2xl font-bold text-text-primary text-center mb-2">
              {t('auth.checkEmail')}
            </Text>
            <Text className="text-text-secondary text-center mb-8 px-4">
              {t('auth.resetEmailSent', { email })}
            </Text>

            <Button
              onPress={() =>
                router.push({
                  pathname: '/(auth)/verify-otp',
                  params: { email, type: 'reset' },
                })
              }
              className="w-full mb-3"
            >
              {t('auth.enterCode')}
            </Button>

            <Button
              variant="ghost"
              onPress={handleResend}
              loading={isLoading}
            >
              {t('auth.resendEmail')}
            </Button>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-1 px-6 py-4">
        {/* Header */}
        <Pressable onPress={() => router.back()} className="mb-6">
          <Text className="text-2xl">←</Text>
        </Pressable>

        {/* Title */}
        <View className="mb-8">
          <Text className="text-3xl font-bold text-text-primary mb-2">
            {t('auth.forgotPassword')}
          </Text>
          <Text className="text-text-secondary">
            {t('auth.forgotPasswordDesc')}
          </Text>
        </View>

        {/* Form */}
        <View className="mb-6">
          <Input
            label={t('auth.email')}
            placeholder={t('auth.emailPlaceholder')}
            value={email}
            onChangeText={(v) => {
              setEmail(v);
              if (error) setError('');
            }}
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
            error={error}
          />
        </View>

        {/* Submit Button */}
        <Button onPress={handleSubmit} loading={isLoading}>
          {t('auth.sendResetLink')}
        </Button>

        {/* Back to Login */}
        <Pressable
          onPress={() => router.push('/(auth)/login')}
          className="mt-6"
        >
          <Text className="text-center text-text-secondary">
            ← {t('auth.backToLogin')}
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
