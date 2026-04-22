import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { useThemeColor } from '@/lib/hooks/useThemeColor';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});


export default function RootLayout() {
  const { background } = useThemeColor();

  const [loaded] = useFonts({
    KanitRegular: require('@/assets/fonts/Kanit-Regular.ttf'),
    KanitBold: require('@/assets/fonts/Kanit-Bold.ttf'),
    KanitThin: require('@/assets/fonts/Kanit-Thin.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ backgroundColor: background, flex: 1 }} >

      <QueryClientProvider client={queryClient}>

        <Stack screenOptions={{ headerShown: false }} />

      </QueryClientProvider>

    </GestureHandlerRootView>
  );
}

