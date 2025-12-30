import { Redirect } from 'expo-router';

// Login sayfası artık welcome.tsx'de birleştirildi
// Bu dosya sadece eski linklerin çalışması için yönlendirme yapıyor
export default function LoginScreen() {
  return <Redirect href="/(auth)/welcome" />;
}
