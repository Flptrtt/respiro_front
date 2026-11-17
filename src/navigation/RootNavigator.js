import { ActivityIndicator, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '../context/AuthContext';
import Tabs from './Tabs';
import LoginScreen from '../screens/LoginScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
import CriarDesafioScreen from '../screens/CriarDesafioScreen';
import SessaoSetupScreen from '../screens/SessaoSetupScreen';
import SessaoTimerScreen from '../screens/SessaoTimerScreen';
import SessaoConcluidaScreen from '../screens/SessaoConcluidaScreen';
import SessaoResultadoScreen from '../screens/SessaoResultadoScreen';
import { colors } from '../theme/theme';

const Stack = createNativeStackNavigator();
const semGesto = { gestureEnabled: false };

export default function RootNavigator() {
  const { token, usuario, carregando } = useAuth();

  if (carregando) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', backgroundColor: colors.bg }}>
        <ActivityIndicator color={colors.sage} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.bg } }}>
        {!token ? (
          <Stack.Screen name="Login" component={LoginScreen} />
        ) : !usuario?.onboardingOk ? (
          <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        ) : (
          <>
            <Stack.Screen name="Tabs" component={Tabs} />
            <Stack.Screen name="CriarDesafio" component={CriarDesafioScreen} />
            <Stack.Screen name="SessaoSetup" component={SessaoSetupScreen} />
            <Stack.Screen name="SessaoTimer" component={SessaoTimerScreen} options={semGesto} />
            <Stack.Screen name="SessaoConcluida" component={SessaoConcluidaScreen} options={semGesto} />
            <Stack.Screen name="SessaoResultado" component={SessaoResultadoScreen} options={semGesto} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
