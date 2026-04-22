import { Ionicons } from '@expo/vector-icons';
import { Text, Pressable, StyleSheet, ActivityIndicator } from 'react-native';
import { useThemeColor } from '@/lib/hooks/useThemeColor';


const CustomButton = ({ children, icon, isLoading, style, ...rest }) => {
  const { primary } = useThemeColor();

  return (
    <Pressable
      disabled={isLoading}
      style={({ pressed }) => [
        styles.button,
        {
          backgroundColor: primary,
          opacity: pressed || isLoading ? 0.9 : 1,
          transform: [{ scale: pressed ? 0.98 : 1 }],
          elevation: pressed ? 2 : 4,
          shadowOpacity: pressed ? 0.1 : 0.2,
        },
        style,
      ]}
      {...rest}
    >
      {isLoading ? (
        <ActivityIndicator color="white" />
      ) : (
        <>
          <Text style={styles.text}>{children}</Text>

          {icon && (
            <Ionicons
              name={icon}
              size={20}
              color="white"
              style={{ marginLeft: 8 }}
            />
          )}
        </>
      )}
    </Pressable>
  );
};
export default CustomButton;

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  text: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.5,
  }
});


