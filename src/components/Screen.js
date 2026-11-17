import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../theme/theme';

export default function Screen({ children, scroll = false, style, bg = colors.bg }) {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: bg }}>
      {scroll ? (
        <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={[{ padding: 24, paddingBottom: 40 }, style]}>
          {children}
        </ScrollView>
      ) : (
        <View style={[{ flex: 1, padding: 24 }, style]}>{children}</View>
      )}
    </SafeAreaView>
  );
}
