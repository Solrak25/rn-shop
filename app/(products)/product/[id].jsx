import { useEffect } from 'react';
import {
  View,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  ActivityIndicator,
  Alert,
  StyleSheet,
} from 'react-native';
import {
  Redirect,
  router,
  useLocalSearchParams,
  useNavigation,
} from 'expo-router';
import { CustomView } from '@/components/CustomView';
import CustomTextInput from '@/components/CustomTextInput';
import { useProduct } from '@/lib/hooks/useProduct';
import ProductImages from '@/components/products/ProductImages';
import CustomButtonGroup from '@/components/CustomButtonGroup';
import CustomButton from '@/components/CustomButton';
import { Formik } from 'formik';
import CameraIconButton from '@/components/CameraIconButton';
import { useCameraStore } from '@/lib/stores/useCameraStore';
import { useThemeColor } from '@/lib/hooks/useThemeColor';
import { CustomText } from '@/components/CustomText';


const ProductScreen = () => {
  const { selectedImages, clearImages } = useCameraStore();
  const { background, primary, card, secondary } = useThemeColor();

  const { id } = useLocalSearchParams();
  const navigation = useNavigation();

  const { productQuery, productMutation, deleteMutation } = useProduct(`${id}`);


  useEffect(() => {
    clearImages();
  }, []);


  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: id === 'new' ? 'Nuevo Producto' : 'Detalles',
      headerStyle: { backgroundColor: card },
      headerTintColor: primary,
      headerRight: () => (
        <CameraIconButton
          onPress={() => router.push('/camera')}
          iconName="camera-outline"
        />
      ),
    });
  }, [id, card, primary]);


  useEffect(() => {
    if (productQuery.data && id !== 'new') {
      navigation.setOptions({
        title: productQuery.data.title,
      });
    }
  }, [productQuery.data, id]);


  const onDeleteProduct = () => {
    Alert.alert(
      'Eliminar producto',
      '¿Seguro que quieres borrarlo?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => {
            deleteMutation.mutate(id, {
              onSuccess: () => router.replace('/'),
            });
          },
        },
      ]
    );
  };


  if (productQuery.isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: background }}>
        <ActivityIndicator size="large" color={primary} />
      </View>
    );
  }


  if (!productQuery.data) {
    return <Redirect href="/" />;
  }

  const product = productQuery.data;


  return (
    <Formik
      initialValues={{
        ...product,
        images: [...product.images],
      }}
      onSubmit={(values) =>
        productMutation.mutate({
          ...values,
          images: [...values.images, ...selectedImages],
        })
      }
    >
      {({ values, handleSubmit, handleChange, setFieldValue }) => (
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={{ flex: 1, backgroundColor: background }}
        >
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{ backgroundColor: '#fff' }}>
               <ProductImages images={[...values.images, ...selectedImages]} />
            </View>

            <View style={styles.content}>
              <CustomText type="subtitle" style={{ marginBottom: 15 }}>Información General</CustomText>
              
              <CustomTextInput
                placeholder="Título del producto"
                icon="text-outline"
                value={values.title}
                onChangeText={handleChange('title')}
              />

              <CustomTextInput
                placeholder="Slug (identificador único)"
                icon="link-outline"
                value={values.slug}
                onChangeText={handleChange('slug')}
              />

              <CustomTextInput
                placeholder="Descripción detallada"
                multiline
                numberOfLines={4}
                icon="document-text-outline"
                style={{ height: 120, alignItems: 'flex-start' }}
                value={values.description}
                onChangeText={handleChange('description')}
              />

              <View style={{ flexDirection: 'row', gap: 15, marginTop: 10 }}>
                <View style={{ flex: 1 }}>
                  <CustomText style={styles.label}>Precio</CustomText>
                  <CustomTextInput
                    placeholder="0.00"
                    keyboardType="numeric"
                    icon="cash-outline"
                    value={values.price.toString()}
                    onChangeText={handleChange('price')}
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <CustomText style={styles.label}>Stock</CustomText>
                  <CustomTextInput
                    placeholder="0"
                    keyboardType="numeric"
                    icon="cube-outline"
                    value={values.stock.toString()}
                    onChangeText={handleChange('stock')}
                  />
                </View>
              </View>

              <CustomText style={[styles.label, { marginTop: 20 }]}>Tallas Disponibles</CustomText>
              <CustomButtonGroup
                options={['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL']}
                selectedOptions={values.sizes}
                onSelect={(selectedSize) => {
                  const newSizesValue = values.sizes.includes(selectedSize)
                    ? values.sizes.filter((s) => s !== selectedSize)
                    : [...values.sizes, selectedSize];
                  setFieldValue('sizes', newSizesValue);
                }}
              />

              <CustomText style={[styles.label, { marginTop: 20 }]}>Categoría</CustomText>
              <CustomButtonGroup
                options={['kid', 'men', 'women', 'unisex']}
                selectedOptions={[values.gender]}
                onSelect={(selectedOption) =>
                  setFieldValue('gender', selectedOption)
                }
              />

              <View style={{ marginTop: 40, gap: 15, marginBottom: 50 }}>
                <CustomButton
                  icon="save-outline"
                  onPress={() => handleSubmit()}
                  isLoading={productMutation.isPending}
                >
                  {id === 'new' ? 'Crear Producto' : 'Guardar Cambios'}
                </CustomButton>

                {id !== 'new' && (
                  <CustomButton
                    icon="trash-outline"
                    onPress={onDeleteProduct}
                    isLoading={deleteMutation.isPending}
                    style={{ backgroundColor: secondary }}
                  >
                    Eliminar Producto
                  </CustomButton>
                )}
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  content: {
    padding: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -30,
    backgroundColor: 'transparent',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    opacity: 0.7,
  },
});

export default ProductScreen;


