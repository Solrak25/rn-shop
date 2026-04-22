import { View } from 'react-native';
import { useThemeColor } from '@/lib/hooks/useThemeColor';


export function CustomView({ style, ...otherProps }) {
  const { background } = useThemeColor();

  return <View style={[{ backgroundColor: background }, style]} {...otherProps} />;
}

