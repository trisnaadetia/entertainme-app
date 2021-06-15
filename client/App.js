import React from 'react'
import { StatusBar } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { client } from './graphql/index'
import { ApolloProvider } from '@apollo/client'
import * as eva from '@eva-design/eva'
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components'
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import MainScreen from './src/screens/MainScreen'
import AddScreen from './src/screens/AddScreen'
import DetailMovieScreen from './src/screens/DetailMovieScreen'
import DetailTvSerieScreen from './src/screens/DetailTvSerieScreen'
import EditScreen from './src/screens/EditScreen'
import FavoriteScreen from './src/screens/FavoriteScreen'
const Stack = createStackNavigator()

export default function App() {
  return (
    <ApolloProvider client={client}>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.light}>
        <NavigationContainer>
          <StatusBar
            barStyle="dark-content"
          />
          <Stack.Navigator screenOptions={{
            headerShown: false
          }}>
            <Stack.Screen name="Main" component={MainScreen} />
            <Stack.Screen name="Add" component={AddScreen} />
            <Stack.Screen name="Edit" component={EditScreen} />
            <Stack.Screen name="DetailMovie" component={DetailMovieScreen} />
            <Stack.Screen name="DetailTvSerie" component={DetailTvSerieScreen} />
            <Stack.Screen name="Favorite" component={FavoriteScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </ApplicationProvider>
    </ApolloProvider>
  )
}


