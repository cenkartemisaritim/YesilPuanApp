import { View, Text, Pressable, TextInput, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

import { colors } from '../../src/constants/colors';
import { useAuthStore } from '../../src/stores/authStore';

export default function RegisterScreen() {
  const router = useRouter();
  const { register, isLoading } = useAuthStore();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const handleRegister = async () => {
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      Alert.alert('Hata', 'Lütfen tüm alanları doldurun');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Hata', 'Şifreler eşleşmiyor');
      return;
    }
    if (!acceptedTerms) {
      Alert.alert('Hata', 'Lütfen kullanım şartlarını kabul edin');
      return;
    }

    try {
      await register(email, password, firstName, lastName);
      router.push({
        pathname: '/(auth)/verify-otp',
        params: { email, type: 'register' },
      });
    } catch (error) {
      Alert.alert('Hata', 'Kayıt işlemi başarısız oldu');
    }
  };

  const handleSkip = () => {
    router.replace('/(tabs)');
  };

  return (
    <View className="flex-1 bg-background">
      <SafeAreaView className="flex-1">
        {/* Header */}
        <View className="flex-row items-center justify-between px-5 py-3">
          <Pressable onPress={() => router.back()} className="w-10 h-10 items-center justify-center">
            <Ionicons name="arrow-back" size={24} color={colors.text.primary} />
          </Pressable>
          <Text className="text-primary font-bold text-lg tracking-wider">YEŞİL PUAN</Text>
          <Pressable className="w-10 h-10 items-center justify-center">
            <Ionicons name="help-circle-outline" size={24} color={colors.text.primary} />
          </Pressable>
        </View>

        <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
          {/* Logo - Green Leaf Icon */}
          <View className="items-center mt-4 mb-4">
            <View
              className="w-24 h-24 rounded-3xl items-center justify-center"
              style={{ backgroundColor: colors.primary[500] }}
            >
              <Ionicons name="leaf" size={48} color={colors.dark[900]} />
            </View>
          </View>

          {/* Title */}
          <View className="items-center mb-6">
            <Text className="text-2xl font-bold text-text-primary mb-2">Kayıt Ol</Text>
            <Text className="text-sm text-text-secondary text-center">
              Yeşil puanlar kazanmaya hemen başla!
            </Text>
          </View>

          {/* Tab Buttons - Kayıt Ol Active (Filled Green) */}
          <View
            className="flex-row rounded-xl p-1 mb-5"
            style={{ backgroundColor: colors.dark[700] }}
          >
            <Pressable
              onPress={() => router.back()}
              className="flex-1 py-3 rounded-lg items-center justify-center"
            >
              <Text className="text-text-secondary font-semibold text-base">Giriş Yap</Text>
            </Pressable>

            <Pressable
              className="flex-1 py-3 rounded-lg items-center justify-center"
              style={{ backgroundColor: colors.primary[500] }}
            >
              <Text className="text-dark-900 font-semibold text-base">Kayıt Ol</Text>
            </Pressable>
          </View>

          {/* Register Form */}
          <View className="mb-4">
            {/* Name Row */}
            <View className="flex-row gap-3 mb-4">
              <View className="flex-1">
                <Text className="text-text-secondary text-sm mb-2">Ad</Text>
                <View
                  className="flex-row items-center rounded-xl px-4 py-3.5"
                  style={{ backgroundColor: colors.dark[700] }}
                >
                  <Ionicons name="person-outline" size={18} color={colors.text.tertiary} />
                  <TextInput
                    className="ml-2 flex-1 text-text-primary text-base"
                    placeholder="Adınız"
                    placeholderTextColor={colors.text.tertiary}
                    value={firstName}
                    onChangeText={setFirstName}
                    autoCapitalize="words"
                  />
                </View>
              </View>
              <View className="flex-1">
                <Text className="text-text-secondary text-sm mb-2">Soyad</Text>
                <View
                  className="flex-row items-center rounded-xl px-4 py-3.5"
                  style={{ backgroundColor: colors.dark[700] }}
                >
                  <TextInput
                    className="flex-1 text-text-primary text-base"
                    placeholder="Soyadınız"
                    placeholderTextColor={colors.text.tertiary}
                    value={lastName}
                    onChangeText={setLastName}
                    autoCapitalize="words"
                  />
                </View>
              </View>
            </View>

            {/* Email Input */}
            <Text className="text-text-secondary text-sm mb-2">E-posta Adresi</Text>
            <View
              className="flex-row items-center rounded-xl px-4 py-3.5 mb-4"
              style={{ backgroundColor: colors.dark[700] }}
            >
              <Ionicons name="mail-outline" size={18} color={colors.text.tertiary} />
              <TextInput
                className="ml-2 flex-1 text-text-primary text-base"
                placeholder="ornek@email.com"
                placeholderTextColor={colors.text.tertiary}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            {/* Password Input */}
            <Text className="text-text-secondary text-sm mb-2">Şifre</Text>
            <View
              className="flex-row items-center rounded-xl px-4 py-3.5 mb-4"
              style={{ backgroundColor: colors.dark[700] }}
            >
              <Ionicons name="lock-closed-outline" size={18} color={colors.text.tertiary} />
              <TextInput
                className="ml-2 flex-1 text-text-primary text-base"
                placeholder="••••••••"
                placeholderTextColor={colors.text.tertiary}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />
              <Pressable onPress={() => setShowPassword(!showPassword)}>
                <Ionicons name={showPassword ? "eye-outline" : "eye-off-outline"} size={18} color={colors.text.tertiary} />
              </Pressable>
            </View>

            {/* Confirm Password Input */}
            <Text className="text-text-secondary text-sm mb-2">Şifre Tekrar</Text>
            <View
              className="flex-row items-center rounded-xl px-4 py-3.5 mb-4"
              style={{ backgroundColor: colors.dark[700] }}
            >
              <Ionicons name="lock-closed-outline" size={18} color={colors.text.tertiary} />
              <TextInput
                className="ml-2 flex-1 text-text-primary text-base"
                placeholder="••••••••"
                placeholderTextColor={colors.text.tertiary}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!showConfirmPassword}
              />
              <Pressable onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                <Ionicons name={showConfirmPassword ? "eye-outline" : "eye-off-outline"} size={18} color={colors.text.tertiary} />
              </Pressable>
            </View>

            {/* Terms Checkbox */}
            <Pressable
              onPress={() => setAcceptedTerms(!acceptedTerms)}
              className="flex-row items-start mb-5"
            >
              <View
                className="w-5 h-5 rounded mr-3 items-center justify-center mt-0.5"
                style={{
                  backgroundColor: acceptedTerms ? colors.primary[500] : 'transparent',
                  borderWidth: acceptedTerms ? 0 : 1.5,
                  borderColor: colors.text.tertiary,
                }}
              >
                {acceptedTerms && (
                  <Ionicons name="checkmark" size={14} color={colors.dark[900]} />
                )}
              </View>
              <Text className="flex-1 text-sm text-text-secondary">
                <Text className="text-primary">Kullanım Şartları</Text> ve{' '}
                <Text className="text-primary">Gizlilik Politikası</Text>'nı kabul ediyorum.
              </Text>
            </Pressable>

            {/* Register Button */}
            <Pressable
              onPress={handleRegister}
              disabled={isLoading}
              className="rounded-xl py-4 flex-row items-center justify-center"
              style={{ backgroundColor: colors.primary[500], opacity: isLoading ? 0.7 : 1 }}
            >
              <Text className="text-dark-900 font-bold text-base mr-2">
                {isLoading ? 'Kayıt Yapılıyor...' : 'Kayıt Ol'}
              </Text>
              {!isLoading && <Ionicons name="arrow-forward" size={20} color={colors.dark[900]} />}
            </Pressable>
          </View>

          {/* Divider */}
          <View className="flex-row items-center my-5">
            <View className="flex-1 h-px" style={{ backgroundColor: colors.dark[500] }} />
            <Text className="mx-4 text-text-tertiary text-xs">VEYA ŞUNUNLA DEVAM ET</Text>
            <View className="flex-1 h-px" style={{ backgroundColor: colors.dark[500] }} />
          </View>

          {/* Social Login */}
          <View className="flex-row justify-center gap-4 mb-5">
            <Pressable
              className="flex-1 h-14 rounded-xl items-center justify-center"
              style={{ backgroundColor: colors.dark[700] }}
            >
              <Ionicons name="logo-apple" size={24} color={colors.text.primary} />
            </Pressable>
            <Pressable
              className="flex-1 h-14 rounded-xl items-center justify-center"
              style={{ backgroundColor: colors.dark[700] }}
            >
              <Ionicons name="logo-google" size={22} color={colors.text.primary} />
            </Pressable>
          </View>

          {/* Login Link */}
          <View className="flex-row justify-center mb-3">
            <Text className="text-text-secondary">Zaten hesabın var mı? </Text>
            <Pressable onPress={() => router.back()}>
              <Text className="text-primary font-semibold">Giriş Yap</Text>
            </Pressable>
          </View>

          {/* Skip for now */}
          <Pressable onPress={handleSkip} className="items-center mb-8 py-3">
            <Text className="text-text-tertiary text-sm">Şimdilik Atla →</Text>
          </Pressable>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
