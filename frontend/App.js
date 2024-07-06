import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { ApiProvider } from './context/ApiContext';
import RegisterScreen from './components/RegisterScreen';
import AddTransfer from './components/AddTransfer';
import ConnexionScreen from './components/ConnexionScreen';
import CommandCheck from './components/CommandCheck';
import TestRoute from './components/TestRoute';

 
const Drawer = createDrawerNavigator();

export default function App() {
  return (
 
    <ApiProvider>
    <NavigationContainer>
      <Drawer.Navigator>  
      <Drawer.Screen name="login" component={ConnexionScreen} options={{ drawerLabel: "Connexion" }}/>
      <Drawer.Screen name="RegisterScreen" component={RegisterScreen} options={{ drawerLabel: "Création de compte" }}/>
      <Drawer.Screen name="AddTransfer" component={AddTransfer} options={{ drawerLabel: "Effectuer un virement" }}/>
      <Drawer.Screen name="CommandCheck" component={CommandCheck} options={{ drawerLabel: "Commander un chéquier" }}/>
      <Drawer.Screen name="TestRoute" component={TestRoute} options={{ drawerLabel: "Tester les routes de l'API" }}/>
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