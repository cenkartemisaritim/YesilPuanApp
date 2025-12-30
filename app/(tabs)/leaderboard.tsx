import { View, Text, ScrollView, Pressable, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

import { colors } from '../../src/constants/colors';

type Scope = 'global' | 'country' | 'city' | 'region';

// Mock data
const mockLeaderboard = [
  { rank: 1, name: 'Ahmet Y.', avatar: null, points: 12450, badge: '#1' },
  { rank: 2, name: 'Jane D.', avatar: null, points: 11200, badge: '#2' },
  { rank: 3, name: 'Mike R.', avatar: null, points: 10800, badge: '#3' },
  { rank: 4, name: 'Elif Yılmaz', avatar: null, points: 9500, change: '+2 Sıra' },
  { rank: 5, name: 'Can Demir', avatar: null, points: 9240, change: '-1 Sıra' },
  { rank: 6, name: 'Zeynep K.', avatar: null, points: 8900, change: null },
  { rank: 7, name: 'Mehmet Ö.', avatar: null, points: 8450, change: null },
];

const mockUserRank = {
  rank: 125,
  points: 2340,
  change: '+450 YP',
};

export default function LeaderboardScreen() {
  const { t } = useTranslation();
  const [scope, setScope] = useState<Scope>('global');

  const scopes: { key: Scope; label: string }[] = [
    { key: 'global', label: 'Küresel' },
    { key: 'country', label: 'Ülke' },
    { key: 'city', label: 'Şehir' },
    { key: 'region', label: 'Bölge' },
  ];

  return (
    <View className="flex-1 bg-background">
      <SafeAreaView className="flex-1" edges={['top']}>
        {/* Header */}
        <View className="flex-row items-center justify-between px-5 py-4">
          <Pressable className="w-10 h-10 items-center justify-center">
            <Ionicons name="arrow-back" size={24} color={colors.text.primary} />
          </Pressable>
          <Text className="text-text-primary font-semibold text-lg">Liderlik Tablosu</Text>
          <Pressable className="w-10 h-10 items-center justify-center">
            <Ionicons name="calendar-outline" size={24} color={colors.text.primary} />
          </Pressable>
        </View>

        {/* Scope Tabs */}
        <View className="flex-row px-5 mb-6">
          {scopes.map((s) => (
            <Pressable
              key={s.key}
              onPress={() => setScope(s.key)}
              className="flex-1 py-3 rounded-xl mx-1"
              style={{
                backgroundColor: scope === s.key ? colors.primary[500] : colors.dark[700],
              }}
            >
              <Text
                className="text-center text-sm font-medium"
                style={{ color: scope === s.key ? colors.dark[900] : colors.text.secondary }}
              >
                {s.label}
              </Text>
            </Pressable>
          ))}
        </View>

        <ScrollView className="flex-1" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
          {/* Top 3 Podium */}
          <View className="flex-row justify-center items-end px-5 mb-8 mt-12">
            {/* Second Place */}
            <View className="items-center flex-1">
              <View className="w-16 h-16 rounded-full items-center justify-center mb-2" style={{ backgroundColor: colors.dark[600] }}>
                <Text className="text-text-primary font-bold text-lg">{mockLeaderboard[1].name.charAt(0)}</Text>
              </View>
              <View className="w-8 h-8 rounded-full items-center justify-center -mt-4 mb-2" style={{ backgroundColor: colors.text.tertiary }}>
                <Text className="text-dark-900 font-bold text-xs">{mockLeaderboard[1].badge}</Text>
              </View>
              <Text className="text-sm font-semibold text-text-primary">{mockLeaderboard[1].name}</Text>
              <Text className="text-xs text-text-tertiary">{mockLeaderboard[1].points.toLocaleString()} YP</Text>
            </View>

            {/* First Place */}
            <View className="items-center flex-1 -mt-8">
              <View className="w-20 h-20 rounded-full items-center justify-center mb-2" style={{ backgroundColor: colors.primary[500] }}>
                <Text className="text-dark-900 font-bold text-xl">{mockLeaderboard[0].name.charAt(0)}</Text>
              </View>
              <View className="w-10 h-10 rounded-full items-center justify-center -mt-5 mb-2" style={{ backgroundColor: colors.accent[500] }}>
                <Text className="text-dark-900 font-bold text-sm">{mockLeaderboard[0].badge}</Text>
              </View>
              <Text className="text-base font-bold text-text-primary">{mockLeaderboard[0].name}</Text>
              <Text className="text-sm text-primary font-semibold">{mockLeaderboard[0].points.toLocaleString()} YP</Text>
            </View>

            {/* Third Place */}
            <View className="items-center flex-1">
              <View className="w-16 h-16 rounded-full items-center justify-center mb-2" style={{ backgroundColor: colors.dark[600] }}>
                <Text className="text-text-primary font-bold text-lg">{mockLeaderboard[2].name.charAt(0)}</Text>
              </View>
              <View className="w-8 h-8 rounded-full items-center justify-center -mt-4 mb-2" style={{ backgroundColor: '#CD7F32' }}>
                <Text className="text-dark-900 font-bold text-xs">{mockLeaderboard[2].badge}</Text>
              </View>
              <Text className="text-sm font-semibold text-text-primary">{mockLeaderboard[2].name}</Text>
              <Text className="text-xs text-text-tertiary">{mockLeaderboard[2].points.toLocaleString()} YP</Text>
            </View>
          </View>

          {/* Leaderboard List Header */}
          <View className="flex-row items-center justify-between px-5 mb-3">
            <Text className="text-text-secondary text-sm">SIRALAMA</Text>
            <Text className="text-text-secondary text-sm">PUAN</Text>
          </View>

          {/* Leaderboard List */}
          <View className="px-5">
            {mockLeaderboard.slice(3).map((item) => (
              <View
                key={item.rank}
                className="flex-row items-center rounded-2xl p-4 mb-3"
                style={{ backgroundColor: colors.dark[700] }}
              >
                <Text className="w-8 text-center font-semibold text-text-secondary">{item.rank}</Text>
                <View className="w-10 h-10 rounded-full items-center justify-center mx-3" style={{ backgroundColor: colors.dark[500] }}>
                  <Text className="text-text-primary font-bold">{item.name.charAt(0)}</Text>
                </View>
                <View className="flex-1">
                  <Text className="font-medium text-text-primary">{item.name}</Text>
                  {item.change && (
                    <Text className={`text-xs ${item.change.includes('+') ? 'text-primary' : 'text-error'}`}>
                      {item.change}
                    </Text>
                  )}
                </View>
                <View className="items-end">
                  <Text className="font-bold text-text-primary">{item.points.toLocaleString()}</Text>
                  <Text className="text-xs text-text-tertiary">YP</Text>
                </View>
              </View>
            ))}
          </View>

          {/* User Rank Card */}
          <View className="px-5 py-6">
            <View
              className="flex-row items-center rounded-2xl p-4"
              style={{ backgroundColor: colors.dark[700], borderWidth: 2, borderColor: colors.primary[500] }}
            >
              <View className="w-12 h-12 rounded-xl items-center justify-center mr-3" style={{ backgroundColor: colors.primary[500] + '20' }}>
                <Text className="text-primary font-bold">#{mockUserRank.rank}</Text>
              </View>
              <View className="w-10 h-10 rounded-full items-center justify-center mr-3" style={{ backgroundColor: colors.primary[500] }}>
                <Text className="text-dark-900 font-bold">S</Text>
              </View>
              <View className="flex-1">
                <Text className="font-semibold text-text-primary">Sen</Text>
                <Text className="text-xs text-primary">{mockUserRank.change}</Text>
              </View>
              <View className="items-end">
                <Text className="text-2xl font-bold text-primary">{mockUserRank.points.toLocaleString()}</Text>
                <Text className="text-xs text-text-tertiary">YEŞİL PUAN</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
