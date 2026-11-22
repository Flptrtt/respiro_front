import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';
import HomeScreen from '../screens/HomeScreen';
import DesafiosScreen from '../screens/DesafiosScreen';
import PerfilScreen from '../screens/PerfilScreen';
import { colors, fonts } from '../theme/theme';

const Tab = createBottomTabNavigator();
const ICONES = { Inicio: 'home', Desafios: 'target', Perfil: 'user' };

export default function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.sage,
        tabBarInactiveTintColor: colors.muted,
        tabBarStyle: { backgroundColor: '#fff', borderTopColor: colors.border },
        tabBarLabelStyle: { fontFamily: fonts.medio, fontSize: 11 },
        tabBarIcon: ({ color, size }) => <Feather name={ICONES[route.name]} size={size} color={color} />,
      })}
    >
      <Tab.Screen name="Inicio" component={HomeScreen} options={{ title: 'Início' }} />
      <Tab.Screen name="Desafios" component={DesafiosScreen} />
      <Tab.Screen name="Perfil" component={PerfilScreen} />
    </Tab.Navigator>
  );
}
