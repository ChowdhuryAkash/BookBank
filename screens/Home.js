import { StyleSheet, Text, View, StatusBar, Image, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import * as NavigationBar from 'expo-navigation-bar';
import Homescreen from './Homescreen'
import Cart from './Cart'
import Find from './Find'
import History from './History'


import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();

import { Feather } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
const Home = ({navigation}) => {
  NavigationBar.setBackgroundColorAsync('#ffffff00');
  return(
      <Tab.Navigator
        initialRouteName="Feed"
        screenOptions={({ route }) => ({
          headerStyle: { backgroundColor: '#42f44b' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
          tabBarActiveTintColor: 'black',
          tabBarInactiveTintColor: 'gray',
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Homescreen') {
              iconName = focused
                ? 'home-circle'
                : 'home-circle-outline';
            }else if (route.name === 'Cart') {
              iconName = focused
                ? 'cart'
                : 'cart-heart';
            }
            else if (route.name === 'History') {
              iconName = focused
                ? 'clipboard-text-clock'
                : 'clipboard-text-clock-outline';
            }
            return (
              <MaterialCommunityIcons
                name={iconName}
                size={size}
                color={color}
              />
            );
          }
        })}>
        <Tab.Screen
          name="Homescreen"
          component={Homescreen}
          options={{
            headerShown: false,
            unmountOnBlur: true
          }}  />
          <Tab.Screen
          name="Cart"
          component={Cart}
          options={{
            headerShown: false,
            unmountOnBlur: true
          }}  />
        <Tab.Screen
          name="History"
          component={History}
          options={{
            headerShown: false,            
            unmountOnBlur: true
          }} />
      </Tab.Navigator>
  )
}

export default Home

const styles = StyleSheet.create({
})