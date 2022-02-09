import { createStackNavigator } from '@react-navigation/stack';
import SettingsScreen from '../screens/SettingsScreen';

const Stack = createStackNavigator();

export default function SettingsStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={SettingsScreen} />
    </Stack.Navigator>
  );
}
