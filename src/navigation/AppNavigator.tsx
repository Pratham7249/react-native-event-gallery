import React from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { HomeScreen } from '../screens/HomeScreen';
import { EventDetailScreen } from '../screens/EventDetailScreen';
import { GalleryScreen } from '../screens/GalleryScreen';
import { useTheme } from '../utils/ThemeContext';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator = () => {
    const theme = useTheme();

    const navigationTheme = theme.dark ? DarkTheme : DefaultTheme;

    return (
        <NavigationContainer theme={navigationTheme}>
            <Stack.Navigator
                screenOptions={{
                    headerTintColor: theme.colors.primary,
                    headerTitleStyle: {
                        color: theme.colors.text,
                    },
                    headerStyle: {
                        backgroundColor: theme.colors.card,
                    },
                    headerBackTitle: '',
                    contentStyle: { backgroundColor: theme.colors.background },
                }}
            >
                <Stack.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="EventDetail"
                    component={EventDetailScreen}
                    options={{ title: 'Event Details', headerShown: false }}
                />
                <Stack.Screen
                    name="Gallery"
                    component={GalleryScreen}
                    options={{ title: 'Gallery' }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};
