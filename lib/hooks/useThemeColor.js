import Colors from '@/lib/colors';
import { useThemeStore } from '@/lib/stores/useThemeStore';

export const useThemeColor = () => {
  const { theme } = useThemeStore();
  
  return Colors[theme];
};
