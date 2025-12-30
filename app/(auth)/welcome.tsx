import { View, Text, Pressable, TextInput, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

import { colors } from '../../src/constants/colors';
import { useAuthStore } from '../../src/stores/authStore';

export default function WelcomeScreen() {
  const router = useRouter();
  const { login } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      await login(email, password);
      router.replace('/(tabs)');
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
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
          <Pressable className="w-10 h-10 items-center justify-center">
            <Ionicons name="arrow-back" size={24} color={colors.text.primary} />
          </Pressable>
          <Text className="text-primary font-bold text-lg tracking-wider">YEŞİL PUAN</Text>
          <Pressable className="w-10 h-10 items-center justify-center">
            <Ionicons name="help-circle-outline" size={24} color={colors.text.primary} />
          </Pressable>
        </View>

        <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
          {/* Logo - Green Leaf Icon */}
          <View className="items-center mt-6 mb-6">
            <View
              className="w-28 h-28 rounded-3xl items-center justify-center"
              style={{ backgroundColor: colors.primary[500] }}
            >
              <Ionicons name="leaf" size={56} color={colors.dark[900]} />
            </View>
          </View>

          {/* Title */}
          <View className="items-center mb-8">
            <Text className="text-3xl font-bold text-text-primary mb-2">Hoş Geldiniz</Text>
            <Text className="text-base text-text-secondary text-center px-4">
              Gelecek için kazanmaya ve dünyayı{'\n'}değiştirmeye hazır mısın?
            </Text>
          </View>

          {/* Tab Buttons - Giriş Yap Active (Filled Green) */}
          <View
            className="flex-row rounded-xl p-1 mb-6"
            style={{ backgroundColor: colors.dark[700] }}
          >
            <Pressable
              className="flex-1 py-3.5 rounded-lg items-center justify-center"
              style={{ backgroundColor: colors.primary[500] }}
            >
              <Text className="text-dark-900 font-semibold text-base">Giriş Yap</Text>
            </Pressable>

            <Pressable
              onPress={() => router.push('/(auth)/register')}
              className="flex-1 py-3.5 rounded-lg items-center justify-center"
            >
              <Text className="text-text-secondary font-semibold text-base">Kayıt Ol</Text>
            </Pressable>
          </View>

          {/* Login Form */}
          <View className="mb-4">
            {/* Email Input */}
            <Text className="text-text-secondary text-sm mb-2">E-posta Adresi</Text>
            <View
              className="flex-row items-center rounded-xl px-4 py-4 mb-4"
              style={{ backgroundColor: colors.dark[700] }}
            >
              <Ionicons name="mail-outline" size={20} color={colors.text.tertiary} />
              <TextInput
                className="ml-3 flex-1 text-text-primary text-base"
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
              className="flex-row items-center rounded-xl px-4 py-4 mb-2"
              style={{ backgroundColor: colors.dark[700] }}
            >
              <Ionicons name="lock-closed-outline" size={20} color={colors.text.tertiary} />
              <TextInput
                className="ml-3 flex-1 text-text-primary text-base"
                placeholder="••••••••"
                placeholderTextColor={colors.text.tertiary}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />
              <Pressable onPress={() => setShowPassword(!showPassword)}>
                <Ionicons name={showPassword ? "eye-outline" : "eye-off-outline"} size={20} color={colors.text.tertiary} />
              </Pressable>
            </View>

            {/* Forgot Password */}
            <Pressable onPress={() => router.push('/(auth)/forgot-password')} className="self-end mb-5">
              <Text className="text-text-secondary text-sm">Şifremi Unuttum?</Text>
            </Pressable>

            {/* Login Button */}
            <Pressable
              onPress={handleLogin}
              disabled={isLoading}
              className="rounded-xl py-4 flex-row items-center justify-center"
              style={{ backgroundColor: colors.primary[500], opacity: isLoading ? 0.7 : 1 }}
            >
              <Text className="text-dark-900 font-bold text-base mr-2">
                {isLoading ? 'Giriş Yapılıyor...' : 'Giriş Yap'}
              </Text>
              {!isLoading && <Ionicons name="arrow-forward" size={20} color={colors.dark[900]} />}
            </Pressable>
          </View>

          {/* Divider */}
          <View className="flex-row items-center my-6">
            <View className="flex-1 h-px" style={{ backgroundColor: colors.dark[500] }} />
            <Text className="mx-4 text-text-tertiary text-xs">VEYA ŞUNUNLA DEVAM ET</Text>
            <View className="flex-1 h-px" style={{ backgroundColor: colors.dark[500] }} />
          </View>

          {/* Social Login - Only Apple and Google */}
          <View className="flex-row justify-center gap-4 mb-6">
            <Pressable
              className="flex-1 h-14 rounded-xl items-center justify-center flex-row"
              style={{ backgroundColor: colors.dark[700] }}
            >
              <Ionicons name="logo-apple" size={24} color={colors.text.primary} />
            </Pressable>
            <Pressable
              className="flex-1 h-14 rounded-xl items-center justify-center flex-row"
              style={{ backgroundColor: colors.dark[700] }}
            >
              <Ionicons name="logo-google" size={22} color={colors.text.primary} />
            </Pressable>
          </View>

          {/* Face ID */}
          <Pressable className="flex-row items-center justify-center mb-6">
            <View
              className="w-8 h-8 rounded-full items-center justify-center mr-2"
              style={{ backgroundColor: colors.primary[500] + '20' }}
            >
              <Ionicons name="happy-outline" size={18} color={colors.primary[500]} />
            </View>
            <Text className="text-primary">Face ID ile Giriş</Text>
          </Pressable>

          {/* Register Link */}
          <View className="flex-row justify-center mb-4">
            <Text className="text-text-secondary">Hesabın yok mu? </Text>
            <Pressable onPress={() => router.push('/(auth)/register')}>
              <Text className="text-primary font-semibold">Kayıt Ol</Text>
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
