import { View, Text, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

import { colors } from '../../src/constants/colors';

type Tab = 'spend' | 'history';
type Category = 'all' | 'spa' | 'restaurant' | 'room';

// Mock data - Otel içi harcama fırsatları
const mockData = {
  balance: 2450,
  categories: [
    { key: 'all', label: 'Tümü', icon: 'apps-outline' },
    { key: 'spa', label: 'Spa & Wellness', icon: 'fitness-outline' },
    { key: 'restaurant', label: 'Restoran', icon: 'restaurant-outline' },
    { key: 'room', label: 'Oda Servisi', icon: 'bed-outline' },
  ],
  featuredOffers: [
    {
      id: 1,
      brand: 'Otel Spa Merkezi',
      description: 'Masaj ve hamam paketinde %30 indirim',
      points: 800,
      icon: '💆',
    },
    {
      id: 2,
      brand: 'Sky Restaurant',
      description: 'Akşam yemeğinde ikinci kişi %50 indirimli',
      points: 600,
      icon: '🍽️',
    },
  ],
  partners: [
    { id: 1, name: 'Otel Havuzu', offer: 'VIP kabana günlük kullanım', points: 400, icon: '🏊' },
    { id: 2, name: 'Mini Bar', offer: 'Premium içeceklerde %25 indirim', points: 150, icon: '🥤' },
    { id: 3, name: 'Oda Yükseltme', offer: 'Suit odaya geçiş fırsatı', points: 1000, icon: '🏨' },
  ],
};

export default function HistoryScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>('spend');
  const [category, setCategory] = useState<Category>('all');

  return (
    <View className="flex-1 bg-background">
      <SafeAreaView className="flex-1" edges={['top']}>
        {/* Header */}
        <View className="flex-row items-center justify-between px-5 py-4">
          <Pressable className="w-10 h-10 items-center justify-center">
            <Ionicons name="arrow-back" size={24} color={colors.text.primary} />
          </Pressable>
          <Text className="text-text-primary font-semibold text-lg">Puan Harcama</Text>
          <View className="flex-row items-center px-3 py-1 rounded-full" style={{ backgroundColor: colors.primary[500] + '20' }}>
            <Ionicons name="leaf" size={14} color={colors.primary[500]} />
            <Text className="text-primary text-sm font-semibold ml-1">1,250 YP</Text>
          </View>
        </View>

        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          {/* Balance Card */}
          <View className="px-5 mb-6">
            <View className="rounded-2xl p-5" style={{ backgroundColor: colors.dark[700] }}>
              <View className="flex-row items-center justify-between">
                <View>
                  <Text className="text-text-secondary text-sm mb-1">Mevcut Bakiyeniz</Text>
                  <View className="flex-row items-baseline">
                    <Text className="text-4xl font-bold text-primary">{mockData.balance.toLocaleString()}</Text>
                    <Text className="text-primary font-semibold ml-1 text-lg">YP</Text>
                  </View>
                </View>
                <View className="w-14 h-14 rounded-full items-center justify-center" style={{ backgroundColor: colors.primary[500] }}>
                  <Ionicons name="leaf" size={28} color={colors.dark[900]} />
                </View>
              </View>

              {/* Action Buttons */}
              <View className="flex-row gap-3 mt-5">
                <Pressable
                  className="flex-1 py-3 rounded-xl items-center"
                  style={{ backgroundColor: colors.primary[500] }}
                >
                  <Text className="text-dark-900 font-semibold">Harcama Yap</Text>
                </Pressable>
                <Pressable
                  className="flex-1 py-3 rounded-xl items-center flex-row justify-center"
                  style={{ backgroundColor: colors.dark[600] }}
                >
                  <Ionicons name="time-outline" size={18} color={colors.text.secondary} />
                  <Text className="text-text-secondary font-semibold ml-2">Geçmiş</Text>
                </Pressable>
              </View>
            </View>
          </View>

          {/* Category Filters */}
          <View className="px-5 mb-5">
            <Text className="text-text-primary font-semibold text-base mb-3">Kategoriler</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} className="-mx-1">
              {mockData.categories.map((cat) => (
                <Pressable
                  key={cat.key}
                  onPress={() => setCategory(cat.key as Category)}
                  className="px-4 py-3 rounded-xl mr-3 flex-row items-center"
                  style={{
                    backgroundColor: category === cat.key ? colors.primary[500] : colors.dark[700],
                  }}
                >
                  <Ionicons
                    name={cat.icon as any}
                    size={18}
                    color={category === cat.key ? colors.dark[900] : colors.text.secondary}
                  />
                  <Text
                    className="text-sm font-medium ml-2"
                    style={{ color: category === cat.key ? colors.dark[900] : colors.text.secondary }}
                  >
                    {cat.label}
                  </Text>
                </Pressable>
              ))}
            </ScrollView>
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
                  <View className="flex-row items-center justify-between mb-3">
                    <View className="w-12 h-12 rounded-xl items-center justify-center" style={{ backgroundColor: colors.dark[600] }}>
                      <Text className="text-2xl">{offer.icon}</Text>
                    </View>
                    <View className="px-3 py-1 rounded-full" style={{ backgroundColor: colors.primary[500] + '20' }}>
                      <Text className="text-primary text-sm font-bold">{offer.points} YP</Text>
                    </View>
                  </View>
                  <Text className="text-text-primary font-semibold mb-1">{offer.brand}</Text>
                  <Text className="text-text-tertiary text-sm">{offer.description}</Text>
                </View>
              ))}
            </ScrollView>
          </View>

          {/* Partner List */}
          <View className="px-5 mb-8">
            <Text className="text-text-primary font-semibold text-base mb-3">Anlaşmalı Firmalar</Text>

            {mockData.partners.map((partner) => (
              <Pressable
                key={partner.id}
                className="flex-row items-center rounded-2xl p-4 mb-3"
                style={{ backgroundColor: colors.dark[700] }}
              >
                <View className="w-14 h-14 rounded-xl items-center justify-center mr-4" style={{ backgroundColor: colors.dark[600] }}>
                  <Text className="text-2xl">{partner.icon}</Text>
                </View>
                <View className="flex-1">
                  <Text className="text-text-primary font-semibold">{partner.name}</Text>
                  <Text className="text-text-tertiary text-sm">{partner.offer}</Text>
                </View>
                <View className="items-end">
                  <View className="px-3 py-1 rounded-full mb-1" style={{ backgroundColor: colors.primary[500] + '20' }}>
                    <Text className="text-primary text-sm font-bold">{partner.points} YP</Text>
                  </View>
                  <Ionicons name="chevron-forward" size={18} color={colors.text.tertiary} />
                </View>
              </Pressable>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
