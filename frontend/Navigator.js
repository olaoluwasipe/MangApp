import { StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import React from 'react'
import { AntDesign, Ionicons } from '@expo/vector-icons';


// Screens Import 
import Home from './screens/Home';
import Search from './screens/Search';
import Library from './screens/Library';

const Tabs = createBottomTabNavigator();
const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        background: '#F5F5F5',
    }
}

const Navigator = () => {
  return (
    <Tabs.Navigator
        initialRouteName='Home'
        screenOptions={({route}) => ({
            headerShown: false,
            tabBarHideOnKeyboard: true,
            tabBarStyle: {
                borderColor: '#39FF14',
                borderWidth: 0.5,
                paddingVertical: 10,
                paddingHorizontal: 20,
                marginHorizontal: 20,
                marginBottom: 10,
                height: 80,
                borderRadius: 10,
                backgroundColor: '#131419'
            },
            tabBarLabelStyle: {
                color: 'white',
                fontSize: 14,
                marginBottom: 20,
                textTransform: 'capitalize',
            },
            tabBarLabel: ({focused, color, size}) => {
                let iconName;
                let rn = route.name;
                
                if (rn == 'Home'){
                    iconName = focused ? <Text style={{color: '#39FF14', marginBottom: 20}} >Home</Text> : <Text style={{color: 'white', marginBottom: 20}} >Home</Text> 
                }else if (rn == 'Search'){
                    iconName = focused ? <Text style={{color: '#39FF14', marginBottom: 20}} >Search</Text> : <Text style={{color: 'white', marginBottom: 20}} >Search</Text> 
                }else if (rn == 'Library'){
                    iconName = focused ? <Text style={{color: '#39FF14', marginBottom: 20}} >Library</Text> : <Text style={{color: 'white', marginBottom: 20}} >Library</Text> 
                }

                return iconName;
            },
            tabBarIcon: ({focused, color, size}) => {
                let iconName;
                let rn = route.name;
                
                if (rn == 'Home'){
                    iconName = focused ? <Ionicons name='home' size={24} color='#39FF14' /> : <Ionicons name='home-outline' size={24} color='white' />
                }else if (rn == 'Search'){
                    iconName = focused ? <Ionicons name='search' size={24} color='#39FF14' /> : <Ionicons name='search-outline' size={24} color='white' />
                }else if (rn == 'Library'){
                    iconName = focused ? <Ionicons name='albums' size={24} color='#39FF14' /> : <Ionicons name='albums-outline' size={24} color='white' />
                }

                return iconName;
            }
        })}
    >

        <Tabs.Screen name='Home' component={Home}/>
        <Tabs.Screen name='Search' component={Search} />
        <Tabs.Screen name='Library' component={Library} />

    </Tabs.Navigator>
  )
}

export default Navigator;