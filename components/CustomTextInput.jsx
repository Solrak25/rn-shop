import { Ionicons } from '@expo/vector-icons';
import {
  View,
  StyleSheet,
  TextInput,
} from 'react-native';
import { useThemeColor } from '@/lib/hooks/useThemeColor';
import { useRef, useState } from 'react';


const CustomTextInput = ({ icon, style, ...rest }) => {
  const { primary, text, border, placeholder, card } = useThemeColor();

  const [isActive, setIsActive] = useState(false);
  const inputRef = useRef(null);

  return (
    <View
      style={[
        {
          ...styles.container,
          backgroundColor: card,
          borderColor: isActive ? primary : border,
        },
        style,
      ]}
      onTouchStart={() => inputRef.current?.focus()}
    >
      {icon && (
        <Ionicons
          name={icon}
          size={20}
          color={isActive ? primary : placeholder}
          style={{ marginRight: 12 }}
        />
      )}

      <TextInput
        ref={inputRef}
        placeholderTextColor={placeholder}
        onFocus={() => setIsActive(true)}
        onBlur={() => setIsActive(false)}
        style={{
          color: text,
          fontSize: 16,
          flex: 1,
        }}
        {...rest}
      />
    </View>
  );
};
export default CustomTextInput;







const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

