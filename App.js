import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/home';
import ListarJogadores from './src/screens/listarJogadores';
import AppLoading from 'expo-app-loading';
import { Container, Header } from 'native-base';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';

const Stack = createStackNavigator();

async function native_base() {
  await Font.loadAsync({
    Roboto: require("native-base/Fonts/Roboto.ttf"),
    Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
    ...Ionicons.font,
  });
}

function App() {

  [isReady, setReady] = React.useState(false);
  React.useEffect(() => {
    native_base().then(() => {
      setReady(true);
    });

  });
  const app = !isReady ? (
    <AppLoading />
  ) : (
      <Container>
        {/* <Header /> */}
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerStyle: {
                backgroundColor: '#62B1F6',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
            initialRouteName="Home">
            <Stack.Screen
              name="Home" component={HomeScreen} options={{ title: 'Cadastro de nomes' }} />
            <Stack.Screen name="Listar" component={ListarJogadores} options={{ title: 'Lista dos times' }} />
          </Stack.Navigator>
        </NavigationContainer>
      </Container>
    );
  return app;

}

export default App;