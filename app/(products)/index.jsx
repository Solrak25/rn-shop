import { ActivityIndicator, StyleSheet, View, TouchableOpacity, ScrollView } from 'react-native';
import { useProducts } from '@/lib/hooks/useProducts';
import { FAB } from '@/components/FAB';
import { router } from 'expo-router';
import ProductList from '@/components/products/ProductList';
import { useThemeColor } from '@/lib/hooks/useThemeColor';
import { CustomText } from '@/components/CustomText';
import { useAuthStore } from '@/lib/stores/useAuthStore';
import { Ionicons } from '@expo/vector-icons';


const HomeScreen = () => {
  const { productsQuery, loadNextPage, gender, setGender } = useProducts();
  const { background, card, primary, text, tint } = useThemeColor();
  const { user, logout } = useAuthStore();

  const genders = [
    { id: 'all', label: 'Todos', icon: 'apps-outline' },
    { id: 'men', label: 'Hombres', icon: 'man-outline' },
    { id: 'women', label: 'Mujeres', icon: 'woman-outline' },
    { id: 'kid', label: 'Niños', icon: 'happy-outline' },
  ];

  if (productsQuery.isLoading && !productsQuery.isFetchingNextPage) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: background }}>
        <ActivityIndicator size="large" color={primary} />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: background }}>
      <View style={[styles.header, { backgroundColor: card }]}>
        <View>
          <CustomText style={{ opacity: 0.6 }}>Hola,</CustomText>
          <CustomText type="subtitle">{user?.fullName || 'Usuario'}</CustomText>
        </View>
        <TouchableOpacity 
          onPress={logout}
          style={[styles.profileButton, { borderColor: background }]}
        >
          <Ionicons name="log-out-outline" size={24} color={primary} />
        </TouchableOpacity>
      </View>

      <View style={{ paddingVertical: 10 }}>

        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 15 }}
        >
          {genders.map((item) => (
            <TouchableOpacity
              key={item.id}
              onPress={() => setGender(item.id)}
              style={[
                styles.categoryChip,
                { 
                  backgroundColor: gender === item.id ? primary : card,
                  borderColor: gender === item.id ? primary : 'transparent'
                }
              ]}
            >
              <Ionicons 
                name={item.icon} 
                size={18} 
                color={gender === item.id ? '#fff' : text} 
                style={{ marginRight: 6 }}
              />
              <CustomText style={{ 
                color: gender === item.id ? '#fff' : text,
                fontWeight: gender === item.id ? '700' : '400'
              }}>
                {item.label}
              </CustomText>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={{ flex: 1, paddingHorizontal: 8 }}>
        <ProductList
          products={productsQuery.data?.pages.flatMap((page) => page) ?? []}
          loadNextPage={loadNextPage}
        />
      </View>

      <FAB
        iconName="add-outline"
        onPress={() => router.push('/(products)/product/new')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingTop: 45,
    paddingHorizontal: 20,
    paddingBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },

  profileButton: {
    width: 45,
    height: 45,
    borderRadius: 12,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    marginRight: 10,
    borderWidth: 1,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  }
});

export default HomeScreen;


