import { Tabs } from 'expo-router';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { colors } from '../../src/constants/colors';

type TabIconProps = {
  focused: boolean;
  icon: keyof typeof Ionicons.glyphMap;
  iconFocused: keyof typeof Ionicons.glyphMap;
  label: string;
  isCenter?: boolean;
};

function TabIcon({ focused, icon, iconFocused, label, isCenter }: TabIconProps) {
  if (isCenter) {
    return (
      <View className="items-center justify-center -mt-8">
        <View
          className="w-16 h-16 rounded-full items-center justify-center"
          style={{
            backgroundColor: colors.primary[500],
            shadowColor: colors.primary[500],
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.4,
            shadowRadius: 12,
            elevation: 10,
          }}
        >
          <Ionicons name="qr-code" size={28} color={colors.dark[900]} />
        </View>
      </View>
    );
  }

  return (
    <View className="items-center justify-center pt-2" style={{ width: 65 }}>
      <Ionicons
        name={focused ? iconFocused : icon}
        size={24}
        color={focused ? colors.primary[500] : colors.text.tertiary}
      />
      <Text
        className="mt-1"
        numberOfLines={1}
        style={{
          color: focused ? colors.primary[500] : colors.text.tertiary,
          fontSize: 10,
        }}
      >
        {label}
      </Text>
    </View>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.dark[800],
          borderTopColor: colors.dark[700],
          borderTopWidth: 1,
          height: 85,
          paddingBottom: 20,
          paddingTop: 10,
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
        },
        tabBarShowLabel: false,
        tabBarActiveTintColor: colors.primary[500],
        tabBarInactiveTintColor: colors.text.tertiary,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Ana Sayfa',
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              icon="home-outline"
              iconFocused="home"
              label="Ana Sayfa"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: 'Harita',
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              icon="map-outline"
              iconFocused="map"
              label="Harita"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="achievements"
        options={{
          title: 'QR',
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              icon="qr-code"
              iconFocused="qr-code"
              label=""
              isCenter
            />
          ),
        }}
      />
      <Tabs.Screen
        name="leaderboard"
        options={{
          title: 'Liderlik',
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              icon="bar-chart-outline"
              iconFocused="bar-chart"
              label="Liderlik"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profil',
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              icon="person-outline"
              iconFocused="person"
              label="Profil"
            />
          ),
        }}
      />
    </Tabs>
  );
}
