import { View, Text, ScrollView, RefreshControl, Pressable, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState, useCallback } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Svg, { Path, Defs, LinearGradient as SvgLinearGradient, Stop } from 'react-native-svg';

import { colors } from '../../src/constants/colors';
import { useAuthStore } from '../../src/stores/authStore';

// Mock data - Otel konaklaması odaklı
const mockData = {
  user: {
    firstName: 'Cenk',
    lastName: 'Yavuz',
    avatar: null,
  },
  walletBalance: 2450,
  percentageChange: '+15%',
  percentageLabel: 'bu hafta',
  savingsValue: '≈ 120 TL Tasarruf Değeri',
  quickActions: [
    { icon: 'qr-code', label: 'QR Tara', isActive: true },
    { icon: 'bed-outline', label: 'Odalar', isActive: false },
    { icon: 'business-outline', label: 'Oteller', isActive: false },
    { icon: 'gift-outline', label: 'Ödüller', isActive: false },
  ],
  // Aktif konaklama bilgisi
  activeStay: {
    hotelName: 'Green Park Hotel',
    roomNumber: '412',
    checkIn: '15 Haz',
    checkOut: '18 Haz',
    daysLeft: 2,
  },
  // Günlük tasarruf hedefleri - Otel odası bazlı
  dailyGoals: [
    {
      id: 1,
      title: 'Su Tasarrufu',
      subtitle: 'Günlük hedef: 80L altı',
      progress: 65,
      progressText: '52L / 80L',
      percentText: '65%',
      points: '+30 GP',
      icon: 'water-outline',
      iconBg: '#3B82F6',
    },
    {
      id: 2,
      title: 'Elektrik Tasarrufu',
      subtitle: 'Günlük hedef: 5kWh altı',
      progress: 45,
      progressText: '2.3kWh / 5kWh',
      percentText: '45%',
      points: '+25 GP',
      icon: 'flash-outline',
      iconBg: '#F59E0B',
    },
    {
      id: 3,
      title: 'Karbon Ayak İzi',
      subtitle: 'Günlük hedef: 3kg CO₂ altı',
      progress: 80,
      progressText: '2.4kg / 3kg',
      percentText: '80%',
      points: '+40 GP',
      icon: 'leaf-outline',
      iconBg: colors.primary[500],
    },
  ],
  weeklyRank: {
    rank: 4,
    pointsAway: 150,
  },
  // Misafir aktiviteleri - Otel bazlı
  guestActivities: [
    {
      id: 1,
      name: 'Ahmet Y.',
      hotel: 'Green Park Hotel',
      activity: "3 günlük konaklamada %40 su tasarrufu sağladı 💧",
      hasImage: false,
      likes: 12,
      time: '2s önce',
      hasComment: true,
    },
    {
      id: 2,
      name: 'Zeynep K.',
      hotel: 'Eco Resort',
      activity: 'Haftalık karbon hedefini tutturdu! 🌱',
      hasImage: false,
      likes: 24,
      time: '5s önce',
      hasComment: false,
    },
  ],
};

// Simple chart line component
function ChartLine() {
  return (
    <Svg width="100%" height={60} viewBox="0 0 300 60">
      <Defs>
        <SvgLinearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0%" stopColor={colors.primary[500]} stopOpacity={0.3} />
          <Stop offset="100%" stopColor={colors.primary[500]} stopOpacity={0} />
        </SvgLinearGradient>
      </Defs>
      {/* Area fill */}
      <Path
        d="M0,50 Q30,45 60,40 T120,35 T180,25 T240,30 T300,20 L300,60 L0,60 Z"
        fill="url(#gradient)"
      />
      {/* Line */}
      <Path
        d="M0,50 Q30,45 60,40 T120,35 T180,25 T240,30 T300,20"
        stroke={colors.primary[500]}
        strokeWidth={2}
        fill="none"
      />
    </Svg>
  );
}

export default function HomeScreen() {
  const router = useRouter();
  const { user } = useAuthStore();
  const [refreshing, setRefreshing] = useState(false);

  const displayName = user?.firstName || mockData.user.firstName;

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setRefreshing(false);
  }, []);

  return (
    <View className="flex-1 bg-background">
      <SafeAreaView className="flex-1" edges={['top']}>
        <ScrollView
          className="flex-1"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={colors.primary[500]}
            />
          }
        >
          {/* Header */}
          <View className="flex-row items-center justify-between px-5 py-4">
            <View className="flex-row items-center">
              <View
                className="w-12 h-12 rounded-full items-center justify-center mr-3 overflow-hidden"
                style={{ backgroundColor: colors.dark[600] }}
              >
                {mockData.user.avatar ? (
                  <Image source={{ uri: mockData.user.avatar }} className="w-full h-full" />
                ) : (
                  <Ionicons name="person" size={24} color={colors.text.tertiary} />
                )}
              </View>
              <View>
                <Text className="text-text-tertiary text-sm">Hoş geldin,</Text>
                <Text className="text-text-primary font-bold text-lg">{displayName} {mockData.user.lastName}</Text>
              </View>
            </View>
            <Pressable
              className="w-11 h-11 rounded-full items-center justify-center"
              style={{ backgroundColor: colors.dark[700] }}
            >
              <Ionicons name="notifications-outline" size={22} color={colors.text.primary} />
            </Pressable>
          </View>

          {/* Wallet Card */}
          <View className="px-5 mb-5">
            <View
              className="rounded-2xl p-5 overflow-hidden"
              style={{ backgroundColor: colors.dark[700] }}
            >
              {/* Header row */}
              <View className="flex-row items-center justify-between mb-1">
                <View className="flex-row items-center">
                  <View
                    className="w-5 h-5 rounded-full items-center justify-center mr-2"
                    style={{ backgroundColor: colors.primary[500] }}
                  >
                    <Ionicons name="checkmark" size={12} color={colors.dark[900]} />
                  </View>
                  <Text className="text-text-secondary text-sm">Yeşil Cüzdan Bakiyesi</Text>
                </View>
                <View
                  className="px-2.5 py-1.5 rounded-lg"
                  style={{ backgroundColor: colors.primary[500] + '20' }}
                >
                  <Text className="text-primary text-xs font-semibold">{mockData.percentageChange}</Text>
                  <Text className="text-primary text-xs">{mockData.percentageLabel}</Text>
                </View>
              </View>

              {/* Balance */}
              <View className="flex-row items-baseline mb-2">
                <Text className="text-5xl font-bold text-text-primary">{mockData.walletBalance.toLocaleString()}</Text>
                <Text className="text-primary font-bold ml-2 text-xl">GP</Text>
              </View>

              {/* Chart */}
              <View className="h-16 mb-2">
                <ChartLine />
              </View>

              {/* Footer */}
              <View className="flex-row items-center justify-between">
                <Text className="text-text-tertiary text-sm">{mockData.savingsValue}</Text>
                <Pressable>
                  <Text className="text-text-primary text-sm font-medium underline">Geçmişi Gör</Text>
                </Pressable>
              </View>
            </View>
          </View>

          {/* Quick Actions */}
          <View className="flex-row justify-between px-5 mb-6">
            {mockData.quickActions.map((action, index) => (
              <Pressable key={index} className="items-center">
                <View
                  className="w-16 h-16 rounded-2xl items-center justify-center mb-2"
                  style={{
                    backgroundColor: action.isActive ? colors.primary[500] : colors.dark[700],
                  }}
                >
                  <Ionicons
                    name={action.icon as any}
                    size={26}
                    color={action.isActive ? colors.dark[900] : colors.text.tertiary}
                  />
                </View>
                <Text className="text-text-secondary text-xs">{action.label}</Text>
              </Pressable>
            ))}
          </View>

          {/* Active Stay Card */}
          <View className="px-5 mb-5">
            <Pressable
              className="rounded-2xl p-4 flex-row items-center"
              style={{ backgroundColor: colors.dark[700], borderWidth: 1, borderColor: colors.primary[500] }}
            >
              <View
                className="w-12 h-12 rounded-xl items-center justify-center mr-4"
                style={{ backgroundColor: colors.primary[500] + '20' }}
              >
                <Ionicons name="bed" size={24} color={colors.primary[500]} />
              </View>
              <View className="flex-1">
                <Text className="text-text-primary font-semibold">{mockData.activeStay.hotelName}</Text>
                <Text className="text-text-tertiary text-sm">
                  Oda {mockData.activeStay.roomNumber} • {mockData.activeStay.checkIn} - {mockData.activeStay.checkOut}
                </Text>
              </View>
              <View className="items-end">
                <Text className="text-primary font-bold text-lg">{mockData.activeStay.daysLeft}</Text>
                <Text className="text-text-tertiary text-xs">gün kaldı</Text>
              </View>
            </Pressable>
          </View>

          {/* Daily Goals Section - Su, Elektrik, Karbon */}
          <View className="px-5 mb-5">
            <View className="flex-row items-center justify-between mb-3">
              <Text className="text-text-primary font-semibold text-base">Günlük Tasarruf Hedefleri</Text>
              <Pressable>
                <Text className="text-text-tertiary text-sm">Detaylar</Text>
              </Pressable>
            </View>

            <ScrollView horizontal showsHorizontalScrollIndicator={false} className="-mx-1">
              {mockData.dailyGoals.map((goal) => (
                <View
                  key={goal.id}
                  className="rounded-2xl p-4 mr-3"
                  style={{ backgroundColor: colors.dark[700], width: 170 }}
                >
                  {/* Icon and Points row */}
                  <View className="flex-row items-start justify-between mb-3">
                    <View
                      className="w-10 h-10 rounded-xl items-center justify-center"
                      style={{ backgroundColor: goal.iconBg }}
                    >
                      <Ionicons name={goal.icon as any} size={22} color={colors.dark[900]} />
                    </View>
                    {goal.points && (
                      <View
                        className="px-2 py-1 rounded-lg"
                        style={{ backgroundColor: colors.primary[500] + '20' }}
                      >
                        <Text className="text-primary text-xs font-semibold">{goal.points}</Text>
                      </View>
                    )}
                  </View>

                  <Text className="text-text-primary font-semibold text-sm mb-1">{goal.title}</Text>
                  <Text className="text-text-tertiary text-xs mb-3">{goal.subtitle}</Text>

                  {/* Progress bar */}
                  <View className="h-2 rounded-full overflow-hidden mb-2" style={{ backgroundColor: colors.dark[500] }}>
                    <View
                      className="h-full rounded-full"
                      style={{
                        backgroundColor: goal.iconBg,
                        width: `${goal.progress}%`
                      }}
                    />
                  </View>

                  {/* Progress text */}
                  <View className="flex-row items-center justify-between">
                    <Text className="text-text-tertiary text-xs">{goal.progressText}</Text>
                    {goal.percentText && (
                      <Text className="text-text-tertiary text-xs">{goal.percentText}</Text>
                    )}
                  </View>
                </View>
              ))}
            </ScrollView>
          </View>

          {/* Weekly Ranking Card */}
          <View className="px-5 mb-5">
            <Pressable
              className="rounded-2xl p-4 flex-row items-center"
              style={{ backgroundColor: colors.dark[700] }}
            >
              <View
                className="rounded-xl items-center justify-center mr-4 px-3 py-2"
                style={{ backgroundColor: colors.primary[500] + '20' }}
              >
                <Text className="text-primary text-xs font-medium">Sıra</Text>
                <Text className="text-primary font-bold text-2xl">#{mockData.weeklyRank.rank}</Text>
              </View>
              <View className="flex-1">
                <Text className="text-text-primary font-semibold text-base">Haftalık Sıralama</Text>
                <Text className="text-text-tertiary text-sm">Liderden sadece {mockData.weeklyRank.pointsAway} puan uzaktasın!</Text>
              </View>
              <View
                className="w-10 h-10 rounded-full items-center justify-center"
                style={{ backgroundColor: colors.dark[600] }}
              >
                <Ionicons name="chevron-forward" size={20} color={colors.text.primary} />
              </View>
            </Pressable>
          </View>

          {/* Guest Activities */}
          <View className="px-5 mb-6">
            <Text className="text-text-primary font-semibold text-base mb-3">Misafir Aktiviteleri</Text>

            {mockData.guestActivities.map((activity) => (
              <View
                key={activity.id}
                className="rounded-2xl p-4 mb-3"
                style={{ backgroundColor: colors.dark[700] }}
              >
                {/* User info row */}
                <View className="flex-row items-center mb-3">
                  <View className="relative">
                    <View
                      className="w-11 h-11 rounded-full items-center justify-center"
                      style={{ backgroundColor: colors.dark[600] }}
                    >
                      <Ionicons name="person" size={20} color={colors.text.tertiary} />
                    </View>
                    {/* Green verification badge */}
                    <View
                      className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full items-center justify-center"
                      style={{ backgroundColor: colors.primary[500] }}
                    >
                      <Ionicons name="checkmark" size={10} color={colors.dark[900]} />
                    </View>
                  </View>
                  <View className="flex-1 ml-3">
                    <View className="flex-row items-center">
                      <Text className="text-text-primary font-semibold">{activity.name}</Text>
                      <Text className="text-text-tertiary text-xs ml-2">• {activity.hotel}</Text>
                    </View>
                    <Text className="text-text-tertiary text-sm">{activity.activity}</Text>
                  </View>
                  <Text className="text-text-tertiary text-xs">{activity.time}</Text>
                </View>

                {/* Actions row */}
                <View className="flex-row items-center">
                  <Pressable className="flex-row items-center mr-5">
                    <Ionicons name="heart" size={18} color={colors.primary[500]} />
                    <Text className="text-text-secondary text-sm ml-1.5">{activity.likes} Beğeni</Text>
                  </Pressable>
                  {activity.hasComment && (
                    <Pressable className="flex-row items-center">
                      <Ionicons name="chatbubble-outline" size={16} color={colors.text.tertiary} />
                      <Text className="text-text-tertiary text-sm ml-1.5">Yorum Yap</Text>
                    </Pressable>
                  )}
                </View>
              </View>
            ))}
          </View>

        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
