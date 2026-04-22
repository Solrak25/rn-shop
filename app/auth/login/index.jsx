import { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  useWindowDimensions,
  View,
  TouchableOpacity,
  Platform,
} from 'react-native';

import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import CustomButton from '@/components/CustomButton';
import { CustomText } from '@/components/CustomText';
import CustomTextInput from '@/components/CustomTextInput';
import { useAuthStore } from '@/lib/stores/useAuthStore';
import { useThemeStore } from '@/lib/stores/useThemeStore';
import { useThemeColor } from '@/lib/hooks/useThemeColor';
import { Link } from 'expo-router';


const LoginScreen = () => {
  const { login } = useAuthStore();
  const { theme, toggleTheme } = useThemeStore();
  const { background, tint, placeholder } = useThemeColor();

  const { height } = useWindowDimensions();

  const [isPosting, setIsPosting] = useState(false);
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const onLogin = async () => {
    const { email, password } = form;

    if (email.length === 0 || password.length === 0) {
      Alert.alert('Campos requeridos', 'Por favor ingrese su correo y contraseña');
      return;
    }

    setIsPosting(true);
    const wasSuccessful = await login(email, password);
    setIsPosting(false);

    if (wasSuccessful) {
      router.replace('/');
      return;
    }

    Alert.alert('Error', 'Usuario o contraseña no son correctos');
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
      style={{ flex: 1, backgroundColor: background }}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ paddingHorizontal: 32, paddingBottom: 40 }}>
          <View style={{ 
            flexDirection: 'row', 
            justifyContent: 'flex-end', 
            marginTop: 40 
          }}>
            <TouchableOpacity 
              onPress={toggleTheme}
              style={{
                padding: 10,
                borderRadius: 50,
                backgroundColor: theme === 'light' ? '#eee' : '#333'
              }}
            >
              <Ionicons 
                name={theme === 'light' ? 'moon' : 'sunny'} 
                size={24} 
                color={tint} 
              />
            </TouchableOpacity>
          </View>

          <View style={{ marginTop: height * 0.1 }}>
            <CustomText type="title" style={{ fontSize: 40, marginBottom: 8 }}>Bienvenido</CustomText>
            <CustomText style={{ color: placeholder, fontSize: 18 }}>
              Ingresa para continuar con tus compras
            </CustomText>
          </View>

          <View style={{ marginTop: 40 }}>
            <CustomTextInput
              placeholder="Correo electrónico"
              keyboardType="email-address"
              autoCapitalize="none"
              icon="mail-outline"
              value={form.email}
              onChangeText={(value) => setForm({ ...form, email: value })}
            />

            <CustomTextInput
              placeholder="Contraseña"
              secureTextEntry
              autoCapitalize="none"
              icon="lock-closed-outline"
              value={form.password}
              onChangeText={(value) => setForm({ ...form, password: value })}
            />
          </View>

          <CustomButton
            icon="arrow-forward-outline"
            onPress={onLogin}
            isLoading={isPosting}
          >
            Ingresar
          </CustomButton>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 'auto',
              paddingTop: 40
            }}
          >
            <CustomText>¿No tienes cuenta? </CustomText>
            <Link href="/auth/register" style={{ color: tint, fontWeight: 'bold' }}>
              Regístrate aquí
            </Link>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;


