import { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { Redirect, Stack } from 'expo-router';
import { useAuthStore } from '@/lib/stores/useAuthStore';
import { useThemeColor } from '@/lib/hooks/useThemeColor';

const CheckAuthenticationLayout = () => {
  const { status, checkStatus } = useAuthStore();
  const { background, card, primary } = useThemeColor();

  useEffect(() => {
    checkStatus();
  }, []);

  if (status === 'checking') {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: background
        }}
      >
        <ActivityIndicator color={primary} size="large" />
      </View>
    );
  }

  if (status === 'unauthenticated') {
    return <Redirect href="/auth/login" />;
  }

  return (
    <Stack
      screenOptions={{
        headerShadowVisible: false,
        headerStyle: {
          backgroundColor: card,
        },
        headerTintColor: primary,
        contentStyle: {
          backgroundColor: background,
        },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="product/[id]"
        options={{
          title: 'Producto',
        }}
      />
    </Stack>
  );
};
export default CheckAuthenticationLayout;

