import { View, Text, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

import { colors } from '../../src/constants/colors';

type Category = 'all' | 'water' | 'electricity' | 'carbon';

// Mock data - Otel odası tasarruf görevleri
const mockData = {
  dailyGoal: {
    progress: 72,
    completed: 4,
    total: 6,
    pointsEarned: 185,
  },
  categories: [
    { key: 'all', label: 'Tümü' },
    { key: 'water', label: 'Su' },
    { key: 'electricity', label: 'Elektrik' },
    { key: 'carbon', label: 'Karbon' },
  ],
  activeMissions: [
    {
      id: 1,
      title: 'Duş Süresi Hedefi',
      description: 'Duşunuzu 5 dakikanın altında tutun ve su tasarrufu sağlayın.',
      points: 25,
      icon: '🚿',
      status: 'active',
    },
    {
      id: 2,
      title: 'Klima Optimizasyonu',
      description: 'Oda sıcaklığını 24°C\'de tutarak enerji tasarrufu yapın.',
      points: 30,
      icon: '❄️',
      status: 'in_progress',
    },
  ],
  completedMissions: [
    {
      id: 3,
      title: 'Havlu Yeniden Kullanımı',
      description: 'Bugün 10:30',
      points: 20,
      pointsEarned: true,
    },
    {
      id: 4,
      title: 'Tebrikler!',
      description: 'Işıkları kapatma görevini tamamladın.',
      action: 'Kapat',
    },
  ],
  featuredOffers: [
    { id: 1, brand: 'Green Park Hotel', offer: 'Spa & Wellness merkezinde %20 indirim', points: 500, icon: '🏨' },
    { id: 2, brand: 'Eco Resort', offer: 'Restoranda ücretsiz tatlı ikramı', points: 300, icon: '🍰' },
  ],
  partners: [
    { id: 1, name: 'Otel Spa', offer: 'Masaj hizmetlerinde %15 indirim', points: 200, icon: '💆' },
    { id: 2, name: 'Otel Restoranı', offer: 'Akşam yemeğinde bir içecek ikramı', points: 100, icon: '🍽️' },
    { id: 3, name: 'Mini Bar', offer: 'Seçili ürünlerde %25 indirim', points: 75, icon: '🥤' },
  ],
};

export default function AchievementsScreen() {
  const { t } = useTranslation();
  const [category, setCategory] = useState<Category>('all');

  return (
    <View className="flex-1 bg-background">
      <SafeAreaView className="flex-1" edges={['top']}>
        {/* Header */}
        <View className="flex-row items-center justify-between px-5 py-4">
          <Pressable className="w-10 h-10 items-center justify-center">
            <Ionicons name="arrow-back" size={24} color={colors.text.primary} />
          </Pressable>
          <Text className="text-text-primary font-semibold text-lg">Görevler</Text>
          <View className="flex-row items-center px-3 py-1 rounded-full" style={{ backgroundColor: colors.primary[500] + '20' }}>
            <Ionicons name="leaf" size={14} color={colors.primary[500]} />
            <Text className="text-primary text-sm font-semibold ml-1">1,250 YP</Text>
          </View>
        </View>

        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          {/* Daily Goal Section */}
          <View className="px-5 mb-6">
            <View className="rounded-2xl p-5" style={{ backgroundColor: colors.dark[700] }}>
              <View className="flex-row items-start justify-between mb-4">
                <View className="flex-1">
                  <Text className="text-text-primary font-semibold text-lg mb-1">Günlük Hedefim</Text>
                  <Text className="text-text-tertiary text-sm">Yeşil bir gelecek için adımlar.</Text>
                  <Text className="text-text-secondary text-xs mt-2">{mockData.dailyGoal.completed}/{mockData.dailyGoal.total} Görev Tamamlandı</Text>
                </View>
                <View className="items-end">
                  <Text className="text-primary text-3xl font-bold">{mockData.dailyGoal.progress}%</Text>
                  <Text className="text-text-tertiary text-xs">+{mockData.dailyGoal.pointsEarned} Puan Kazanıldı</Text>
                </View>
              </View>

              {/* Progress Bar */}
              <View className="h-2 rounded-full overflow-hidden mb-4" style={{ backgroundColor: colors.dark[500] }}>
                <View
                  className="h-full rounded-full"
                  style={{ backgroundColor: colors.primary[500], width: `${mockData.dailyGoal.progress}%` }}
                />
              </View>

              {/* Category Tabs */}
              <ScrollView horizontal showsHorizontalScrollIndicator={false} className="-mx-1">
                {mockData.categories.map((cat) => (
                  <Pressable
                    key={cat.key}
                    onPress={() => setCategory(cat.key as Category)}
                    className="px-4 py-2 rounded-full mr-2"
                    style={{
                      backgroundColor: category === cat.key ? colors.primary[500] : colors.dark[600],
                    }}
                  >
                    <Text
                      className="text-sm font-medium"
                      style={{ color: category === cat.key ? colors.dark[900] : colors.text.secondary }}
                    >
                      {cat.label}
                    </Text>
                  </Pressable>
                ))}
              </ScrollView>
            </View>
          </View>

          {/* Active Missions */}
          <View className="px-5 mb-6">
            <Text className="text-text-primary font-semibold text-base mb-3">Aktif Görevler</Text>

            {mockData.activeMissions.map((mission) => (
              <View
                key={mission.id}
                className="rounded-2xl p-4 mb-3"
                style={{ backgroundColor: colors.dark[700] }}
              >
                <View className="flex-row items-start">
                  <View className="w-10 h-10 rounded-full items-center justify-center mr-3" style={{ backgroundColor: colors.dark[600] }}>
                    <Text className="text-xl">{mission.icon}</Text>
                  </View>
                  <View className="flex-1">
                    <Text className="text-text-primary font-semibold">{mission.title}</Text>
                    <Text className="text-text-tertiary text-sm mt-1">{mission.description}</Text>
                    <Text className="text-primary text-sm font-semibold mt-2">{mission.points} Puan</Text>
                  </View>
                </View>
                <Pressable
                  className="rounded-xl py-3 mt-4 items-center"
                  style={{
                    backgroundColor: mission.status === 'in_progress' ? colors.primary[500] + '20' : colors.primary[500],
                    borderWidth: mission.status === 'in_progress' ? 1 : 0,
                    borderColor: colors.primary[500],
                  }}
                >
                  <Text
                    className="font-semibold"
                    style={{ color: mission.status === 'in_progress' ? colors.primary[500] : colors.dark[900] }}
                  >
                    {mission.status === 'in_progress' ? 'DEVAM EDİYOR' : 'Görevi Başlat'}
                  </Text>
                </Pressable>
              </View>
            ))}

            <Pressable
              className="rounded-xl py-3 items-center"
              style={{ backgroundColor: colors.primary[500] }}
            >
              <Text className="text-dark-900 font-semibold">Tamamla & Puan Kazan</Text>
            </Pressable>
          </View>

          {/* Completed Missions */}
          <View className="px-5 mb-6">
            <Text className="text-text-primary font-semibold text-base mb-3">Tamamlananlar</Text>

            {mockData.completedMissions.map((mission) => (
              <View
                key={mission.id}
                className="rounded-2xl p-4 mb-3"
                style={{ backgroundColor: colors.dark[700] }}
              >
                <View className="flex-row items-center">
                  <View className="w-10 h-10 rounded-full items-center justify-center mr-3" style={{ backgroundColor: colors.primary[500] + '20' }}>
                    <Ionicons name="checkmark" size={20} color={colors.primary[500]} />
                  </View>
                  <View className="flex-1">
                    <Text className="text-text-primary font-semibold">{mission.title}</Text>
                    <Text className="text-text-tertiary text-sm">{mission.description}</Text>
                  </View>
                  {mission.points && (
                    <Text className="text-primary font-bold">+{mission.points} Puan Kazandın!</Text>
                  )}
                  {mission.action && (
                    <Pressable>
                      <Text className="text-primary font-semibold">{mission.action}</Text>
                    </Pressable>
                  )}
                </View>
              </View>
            ))}
          </View>

          {/* Featured Offers */}
          <View className="px-5 mb-6">
            <View className="flex-row items-center justify-between mb-3">
              <Text className="text-text-primary font-semibold text-base">Öne Çıkan Fırsatlar</Text>
              <Pressable>
                <Text className="text-text-tertiary text-sm">Tümünü Gör</Text>
              </Pressable>
            </View>

            <ScrollView horizontal showsHorizontalScrollIndicator={false} className="-mx-1">
              {mockData.featuredOffers.map((offer) => (
                <View
                  key={offer.id}
                  className="rounded-2xl p-4 mr-3 w-64"
                  style={{ backgroundColor: colors.dark[700] }}
                >
                  <View className="flex-row items-center justify-between mb-2">
                    <Text className="text-xl">{offer.icon}</Text>
                    {offer.points && (
                      <View className="px-2 py-1 rounded-full" style={{ backgroundColor: colors.primary[500] + '20' }}>
                        <Text className="text-primary text-xs font-semibold">{offer.points} YP</Text>
                      </View>
                    )}
                  </View>
                  <Text className="text-text-primary font-semibold mb-1">{offer.brand}</Text>
                  <Text className="text-text-tertiary text-sm">{offer.offer}</Text>
                  <Pressable className="mt-3">
                    <Text className="text-primary text-sm">Fırsatı Yakala →</Text>
                  </Pressable>
                </View>
              ))}
            </ScrollView>
          </View>

          {/* Partner Offers */}
          <View className="px-5 mb-8">
            <Text className="text-text-primary font-semibold text-base mb-3">Anlaşmalı Firmalar</Text>

            {mockData.partners.map((partner) => (
              <View
                key={partner.id}
                className="flex-row items-center rounded-2xl p-4 mb-3"
                style={{ backgroundColor: colors.dark[700] }}
              >
                <View className="w-12 h-12 rounded-xl items-center justify-center mr-4" style={{ backgroundColor: colors.dark[600] }}>
                  <Text className="text-2xl">{partner.icon}</Text>
                </View>
                <View className="flex-1">
                  <Text className="text-text-primary font-semibold">{partner.name}</Text>
                  <Text className="text-text-tertiary text-sm">{partner.offer}</Text>
                </View>
                <View className="px-3 py-1 rounded-full" style={{ backgroundColor: colors.primary[500] + '20' }}>
                  <Text className="text-primary text-sm font-semibold">{partner.points} YP</Text>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
