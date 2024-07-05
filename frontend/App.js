import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { ApiProvider } from './context/ApiContext';
import RegisterScreen from './components/RegisterScreen';
import ConnexionScreen from './components/ConnexionScreen';

 
const Drawer = createDrawerNavigator();

export default function App() {
  return (
 
    <ApiProvider>
    <NavigationContainer>
      <Drawer.Navigator>
      <Drawer.Screen name="RegisterScreen" component={RegisterScreen} options={{ drawerLabel: "Création de compte" }}/>
      <Drawer.Screen name="login" component={ConnexionScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
    </ApiProvider>
 
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});