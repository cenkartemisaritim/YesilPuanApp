import { View, Text } from 'react-native';
import { Link, Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';

export default function NotFoundScreen() {
  const { t } = useTranslation();

  return (
    <>
      <Stack.Screen options={{ title: '404' }} />
      <View className="flex-1 items-center justify-center bg-background p-6">
        <Text className="text-6xl mb-4">🌿</Text>
        <Text className="text-2xl font-bold text-text-primary mb-2">
          {t('errors.notFound')}
        </Text>
        <Text className="text-text-secondary text-center mb-8">
          The page you're looking for doesn't exist.
        </Text>
        <Link href="/" className="bg-primary px-6 py-3 rounded-xl">
          <Text className="text-white font-semibold">Go Home</Text>
        </Link>
      </View>
    </>
  );
}
