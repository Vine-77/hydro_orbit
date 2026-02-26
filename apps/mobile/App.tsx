import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { View, Text, StyleSheet } from 'react-native';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function DashboardScreen() {
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Dashboard</Text>
      <Text style={styles.subtitle}>Welcome back!</Text>
    </View>
  );
}

function FarmScreen() {
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>My Farm</Text>
      <Text style={styles.subtitle}>Zone overview</Text>
    </View>
  );
}

function IrrigationScreen() {
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Irrigation</Text>
      <Text style={styles.subtitle}>Control your watering</Text>
    </View>
  );
}

function AlertsScreen() {
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Alerts</Text>
      <Text style={styles.subtitle}>Stay informed</Text>
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Settings</Text>
      <Text style={styles.subtitle}>Configure your app</Text>
    </View>
  );
}

function LoginScreen() {
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Hydro-Orbit</Text>
      <Text style={styles.subtitle}>Login to continue</Text>
    </View>
  );
}

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = 'home';
          
          if (route.name === 'Dashboard') iconName = focused ? 'home' : 'home-outline';
          else if (route.name === 'Farm') iconName = focused ? 'map' : 'map-outline';
          else if (route.name === 'Irrigation') iconName = focused ? 'water' : 'water-outline';
          else if (route.name === 'Alerts') iconName = focused ? 'notifications' : 'notifications-outline';
          else if (route.name === 'Settings') iconName = focused ? 'settings' : 'settings-outline';
          
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#059669',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="Farm" component={FarmScreen} />
      <Tab.Screen name="Irrigation" component={IrrigationScreen} />
      <Tab.Screen name="Alerts" component={AlertsScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  const isLoggedIn = false;
  
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!isLoggedIn ? (
          <Stack.Screen name="Login" component={LoginScreen} />
        ) : (
          <Stack.Screen name="Main" component={MainTabs} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#059669',
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
    marginTop: 8,
  },
});
