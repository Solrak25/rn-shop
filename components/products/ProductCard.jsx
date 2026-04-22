import { router } from 'expo-router';
import { Pressable, Image, StyleSheet, View } from 'react-native';

import { CustomText } from '@/components/CustomText';
import { useThemeColor } from '@/lib/hooks/useThemeColor';


const API_HOST = process.env.EXPO_PUBLIC_API_HOST;
const IMAGES_PATH = process.env.EXPO_PUBLIC_IMAGES_PATH;


export const ProductCard = ({ product }) => {
  const { card, text, placeholder, primary } = useThemeColor();

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: card }
      ]}
    >
      <Pressable
        style={({ pressed }) => ({
          opacity: pressed ? 0.8 : 1,
          flex: 1,
        })}
        onPress={() => router.push(`/(products)/product/${product.id}`)}
      >
        <View style={styles.imageContainer}>
          {product.images.length === 0 ? (
            <Image
              source={require('@/assets/images/no-product-image.png')}
              style={styles.image}
              resizeMode="contain"
            />
          ) : (
            <Image
              source={{ uri: API_HOST + IMAGES_PATH + product.images[0] }}
              style={styles.image}
              resizeMode="cover"
            />
          )}
        </View>

        <View style={styles.info}>
          <CustomText
            numberOfLines={2}
            style={[styles.title, { color: text }]}
          >
            {product.title}
          </CustomText>
          
          <View style={styles.footer}>
             <CustomText style={[styles.price, { color: primary }]}>
               ${product.price}
             </CustomText>
             <CustomText style={{ color: placeholder, fontSize: 12 }}>
               {product.stock} disp.
             </CustomText>
          </View>
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 8,
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  imageContainer: {
    width: '100%',
    height: 180,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  info: {
    padding: 12,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    height: 40,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
  }
});


