import { View, Text, ScrollView, Pressable, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

import { colors } from '../../src/constants/colors';
import { useAuthStore } from '../../src/stores/authStore';

// Mock data - Otel konaklaması odaklı
const mockUser = {
  firstName: 'Cenk',
  lastName: 'Yavuz',
  username: '@cnkyvz',
  avatar: null,
  badge: 'EKO MİSAFİR',
  stats: {
    greenPoints: 2340,
    stays: 23,          // Toplam konaklama sayısı
    savings: '150kg',   // Karbon tasarrufu
  },
  thisMonth: {
    points: '+1.250 Puan',
    activities: [
      {
        id: 1,
        title: 'Green Park Hotel',
        subtitle: '3 Gece Konaklama • 12-15 Haz',
        points: '+320',
        icon: 'bed',
        iconBg: colors.primary[500],
        isNegative: false,
      },
      {
        id: 2,
        title: 'Su Tasarrufu Ödülü',
        subtitle: '%45 tasarruf • Green Park Hotel',
        points: '+150',
        icon: 'water',
        iconBg: '#3B82F6',
        isNegative: false,
      },
      {
        id: 3,
        title: 'Elektrik Tasarrufu',
        subtitle: 'Günlük hedef aşıldı • 10 Haz',
        points: '+80',
        icon: 'flash',
        iconBg: '#F59E0B',
        isNegative: false,
      },
      {
        id: 4,
        title: 'Ödül Kullanımı',
        subtitle: 'Spa İndirimi • Eco Resort',
        points: '-500',
        icon: 'gift',
        iconBg: '#EF4444',
        isNegative: true,
      },
    ],
  },
  lastMonth: {
    points: '+850 Puan',
    activities: [
      {
        id: 5,
        title: 'Eco Resort Hotel',
        subtitle: '5 Gece Konaklama • 20-25 May',
        points: '+480',
        icon: 'bed',
        iconBg: colors.primary[500],
        isNegative: false,
      },
      {
        id: 6,
        title: 'Karbon Ayak İzi',
        subtitle: 'Aylık hedef tamamlandı',
        points: '+200',
        icon: 'leaf',
        iconBg: colors.primary[500],
        isNegative: false,
      },
    ],
  },
};

type TabType = 'history' | 'stays' | 'settings';

export default function ProfileScreen() {
  const router = useRouter();
  const { logout } = useAuthStore();
  const [activeTab, setActiveTab] = useState<TabType>('history');

  const handleLogout = async () => {
    await logout();
    router.replace('/(auth)/welcome');
  };

  const tabs: { key: TabType; label: string }[] = [
    { key: 'history', label: 'Geçmiş' },
    { key: 'stays', label: 'Konaklamalar' },
    { key: 'settings', label: 'Ayarlar' },
  ];

  return (
    <View className="flex-1 bg-background">
      <SafeAreaView className="flex-1" edges={['top']}>
        <ScrollView
          className="flex-1"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
        >
          {/* Header */}
          <View className="flex-row items-center justify-between px-5 py-4">
            <Pressable className="w-10 h-10 items-center justify-center">
              <Ionicons name="arrow-back" size={24} color={colors.text.primary} />
            </Pressable>
            <Text className="text-text-primary font-semibold text-lg">Profilim</Text>
            <Pressable className="w-10 h-10 items-center justify-center">
              <Ionicons name="settings-outline" size={24} color={colors.text.primary} />
            </Pressable>
          </View>

          {/* Profile Avatar & Name */}
          <View className="items-center px-5 pb-5">
            {/* Avatar with green border */}
            <View className="relative mb-4">
              <View
                className="w-28 h-28 rounded-full items-center justify-center p-1"
                style={{ borderWidth: 3, borderColor: colors.primary[500] }}
              >
                <View
                  className="w-full h-full rounded-full items-center justify-center overflow-hidden"
                  style={{ backgroundColor: colors.dark[600] }}
                >
                  {mockUser.avatar ? (
                    <Image source={{ uri: mockUser.avatar }} className="w-full h-full" />
                  ) : (
                    <Ionicons name="person" size={50} color={colors.text.tertiary} />
                  )}
                </View>
              </View>
              {/* Verified badge */}
              <View
                className="absolute bottom-1 right-1 w-7 h-7 rounded-full items-center justify-center"
                style={{ backgroundColor: colors.primary[500] }}
              >
                <Ionicons name="checkmark" size={16} color={colors.dark[900]} />
              </View>
            </View>

            {/* Name */}
            <Text className="text-2xl font-bold text-text-primary mb-1">
              {mockUser.firstName} {mockUser.lastName}
            </Text>

            {/* Username and Badge */}
            <View className="flex-row items-center mb-4">
              <Text className="text-text-secondary text-sm">{mockUser.username}</Text>
              <Text className="text-text-tertiary mx-2">•</Text>
              <View
                className="px-2.5 py-1 rounded-full"
                style={{ backgroundColor: colors.primary[500] }}
              >
                <Text className="text-dark-900 text-xs font-bold">{mockUser.badge}</Text>
              </View>
            </View>
          </View>

          {/* Stats Cards */}
          <View className="flex-row px-5 mb-5">
            {/* Yeşil Puan */}
            <View
              className="flex-1 rounded-2xl p-4 mr-2 items-center"
              style={{ backgroundColor: colors.dark[700] }}
            >
              <View
                className="w-10 h-10 rounded-full items-center justify-center mb-2"
                style={{ backgroundColor: colors.primary[500] + '20' }}
              >
                <Ionicons name="leaf" size={20} color={colors.primary[500]} />
              </View>
              <Text className="text-xl font-bold text-text-primary">
                {mockUser.stats.greenPoints.toLocaleString()}
              </Text>
              <Text className="text-xs text-text-tertiary">Yeşil Puan</Text>
            </View>

            {/* Konaklamalar */}
            <View
              className="flex-1 rounded-2xl p-4 mx-1 items-center"
              style={{ backgroundColor: colors.dark[700] }}
            >
              <View
                className="w-10 h-10 rounded-full items-center justify-center mb-2"
                style={{ backgroundColor: colors.primary[500] + '20' }}
              >
                <Ionicons name="bed" size={20} color={colors.primary[500]} />
              </View>
              <Text className="text-xl font-bold text-text-primary">{mockUser.stats.stays}</Text>
              <Text className="text-xs text-text-tertiary">Konaklama</Text>
            </View>

            {/* Karbon Tasarrufu */}
            <View
              className="flex-1 rounded-2xl p-4 ml-2 items-center"
              style={{ backgroundColor: colors.dark[700] }}
            >
              <View
                className="w-10 h-10 rounded-full items-center justify-center mb-2"
                style={{ backgroundColor: colors.primary[500] + '20' }}
              >
                <Text className="text-primary text-xs font-bold">CO₂</Text>
              </View>
              <Text className="text-xl font-bold text-text-primary">{mockUser.stats.savings}</Text>
              <Text className="text-xs text-text-tertiary">Tasarruf</Text>
            </View>
          </View>

          {/* Spend Points Button */}
          <View className="px-5 mb-4">
            <Pressable
              className="rounded-xl py-4 flex-row items-center justify-center"
              style={{ backgroundColor: colors.primary[500] }}
            >
              <Ionicons name="gift" size={20} color={colors.dark[900]} />
              <Text className="text-dark-900 font-bold text-base ml-2">Puanları Harca</Text>
            </Pressable>
          </View>

          {/* Private & Secure Area Label */}
          <View className="flex-row items-center justify-center mb-4">
            <Ionicons name="lock-closed" size={14} color={colors.text.tertiary} />
            <Text className="text-text-tertiary text-xs ml-1.5">ÖZEL & GÜVENLİ ALAN</Text>
          </View>

          {/* Tab Selector */}
          <View className="px-5 mb-5">
            <View
              className="flex-row rounded-xl p-1"
              style={{ backgroundColor: colors.dark[700] }}
            >
              {tabs.map((tab) => (
                <Pressable
                  key={tab.key}
                  onPress={() => setActiveTab(tab.key)}
                  className="flex-1 py-3 rounded-lg items-center justify-center"
                  style={{
                    backgroundColor: activeTab === tab.key ? colors.dark[600] : 'transparent',
                  }}
                >
                  <Text
                    className="text-sm font-medium"
                    style={{
                      color: activeTab === tab.key ? colors.text.primary : colors.text.tertiary,
                    }}
                  >
                    {tab.label}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>

          {/* This Month Activity */}
          <View className="px-5 mb-4">
            <View className="flex-row items-center justify-between mb-3">
              <Text className="text-text-secondary text-sm font-medium">BU AY</Text>
              <Text className="text-primary text-sm font-medium">{mockUser.thisMonth.points}</Text>
            </View>

            {mockUser.thisMonth.activities.map((activity) => (
              <View
                key={activity.id}
                className="flex-row items-center rounded-2xl p-4 mb-3"
                style={{ backgroundColor: colors.dark[700] }}
              >
                <View
                  className="w-12 h-12 rounded-xl items-center justify-center mr-4"
                  style={{ backgroundColor: activity.iconBg + '20' }}
                >
                  <Ionicons
                    name={activity.icon as any}
                    size={24}
                    color={activity.iconBg}
                  />
                </View>
                <View className="flex-1">
                  <Text className="text-text-primary font-semibold">{activity.title}</Text>
                  <Text className="text-text-tertiary text-sm">{activity.subtitle}</Text>
                </View>
                <Text
                  className="font-bold text-lg"
                  style={{ color: activity.isNegative ? colors.text.secondary : colors.primary[500] }}
                >
                  {activity.points}
                </Text>
              </View>
            ))}
          </View>

          {/* Last Month Activity */}
          <View className="px-5 mb-6">
            <View className="flex-row items-center justify-between mb-3">
              <Text className="text-text-secondary text-sm font-medium">GEÇEN AY</Text>
              <Text className="text-primary text-sm font-medium">{mockUser.lastMonth.points}</Text>
            </View>

            {mockUser.lastMonth.activities.map((activity) => (
              <View
                key={activity.id}
                className="flex-row items-center rounded-2xl p-4 mb-3"
                style={{ backgroundColor: colors.dark[700] }}
              >
                <View
                  className="w-12 h-12 rounded-xl items-center justify-center mr-4"
                  style={{ backgroundColor: activity.iconBg + '20' }}
                >
                  <Ionicons
                    name={activity.icon as any}
                    size={24}
                    color={activity.iconBg}
                  />
                </View>
                <View className="flex-1">
                  <Text className="text-text-primary font-semibold">{activity.title}</Text>
                  <Text className="text-text-tertiary text-sm">{activity.subtitle}</Text>
                </View>
                <Text
                  className="font-bold text-lg"
                  style={{ color: activity.isNegative ? colors.text.secondary : colors.primary[500] }}
                >
                  {activity.points}
                </Text>
              </View>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
