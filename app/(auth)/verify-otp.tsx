import { View, Text, Pressable, TextInput, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useState, useRef, useEffect } from 'react';

import { Button } from '../../src/components/ui';
import { colors } from '../../src/constants/colors';

const OTP_LENGTH = 6;

export default function VerifyOTPScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const { email, type } = useLocalSearchParams<{ email: string; type: 'register' | 'reset' }>();

  const [otp, setOtp] = useState<string[]>(new Array(OTP_LENGTH).fill(''));
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);

  const inputRefs = useRef<TextInput[]>([]);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [countdown]);

  const handleOtpChange = (value: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-submit when all digits entered
    if (newOtp.every((digit) => digit) && newOtp.join('').length === OTP_LENGTH) {
      handleVerify(newOtp.join(''));
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async (code?: string) => {
    const otpCode = code || otp.join('');
    if (otpCode.length !== OTP_LENGTH) {
      Alert.alert(t('errors.error'), t('auth.enterFullCode'));
      return;
    }

    setIsLoading(true);
    try {
      // TODO: Implement API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      if (type === 'register') {
        Alert.alert(t('common.success'), t('auth.accountVerified'), [
          { text: 'OK', onPress: () => router.replace('/(tabs)') },
        ]);
      } else {
        router.push({
          pathname: '/(auth)/reset-password' as any,
          params: { email, token: otpCode },
        });
      }
    } catch (error) {
      Alert.alert(t('errors.error'), t('auth.invalidCode'));
      setOtp(new Array(OTP_LENGTH).fill(''));
      inputRefs.current[0]?.focus();
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    if (!canResend) return;

    setIsLoading(true);
    try {
      // TODO: Implement API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setCountdown(60);
      setCanResend(false);
      Alert.alert(t('common.success'), t('auth.otpResent'));
    } catch (error) {
      Alert.alert(t('errors.error'), t('errors.somethingWentWrong'));
    } finally {
      setIsLoading(false);
    }
  };

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
            {t('auth.verifyEmail')}
          </Text>
          <Text className="text-text-secondary">
            {t('auth.otpSentTo')} <Text className="font-semibold">{email}</Text>
          </Text>
        </View>

        {/* OTP Input */}
        <View className="flex-row justify-between mb-8">
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={(ref) => { if (ref) inputRefs.current[index] = ref; }}
              className={`w-12 h-14 border-2 rounded-xl text-center text-xl font-bold ${
                digit
                  ? 'border-primary bg-primary-50'
                  : 'border-border bg-surface'
              }`}
              style={{ color: colors.text.primary }}
              value={digit}
              onChangeText={(value) => handleOtpChange(value.slice(-1), index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
              keyboardType="number-pad"
              maxLength={1}
              selectTextOnFocus
            />
          ))}
        </View>

        {/* Verify Button */}
        <Button onPress={() => handleVerify()} loading={isLoading} className="mb-6">
          {t('auth.verify')}
        </Button>

        {/* Resend Code */}
        <View className="items-center">
          <Text className="text-text-secondary mb-2">
            {t('auth.didntReceiveCode')}
          </Text>
          {canResend ? (
            <Pressable onPress={handleResend} disabled={isLoading}>
              <Text className="text-primary font-semibold">
                {t('auth.resendCode')}
              </Text>
            </Pressable>
          ) : (
            <Text className="text-text-tertiary">
              {t('auth.resendIn', { seconds: countdown })}
            </Text>
          )}
        </View>

        {/* Change Email */}
        <Pressable onPress={() => router.back()} className="mt-8">
          <Text className="text-center text-text-secondary">
            {t('auth.wrongEmail')}{' '}
            <Text className="text-primary font-medium">{t('auth.changeEmail')}</Text>
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
