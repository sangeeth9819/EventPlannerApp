
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

//screens
import SplashScreen from "../src/screens/SplashScreen";
import LoginScreen from "../src/screens/LoginScreen"
import ImageUploadScreen from "../src/screens/ImageUploadScreen"
import SignUpScreen from "../src/screens/SignUpScreen"
import PersonalDetailsScreen from "../src/screens/PersonalDetailsScreen"
import EditProfileScreen from "../src/screens/EditProfileScreen"
import PostListScreen from "../src/screens/PostListScreen"
import MainTabs from "./TabNavigator"

const Stack = createStackNavigator();

export default function StackNavigator() {
    return (
        <Stack.Navigator initialRouteName="LoginScreen">
            <Stack.Screen name="SplashScreen" component={SplashScreen} options={{ "headerShown": false }} />
            <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ "headerShown": false }} />
            <Stack.Screen name="ImageUploadScreen" component={ImageUploadScreen} options={{ "headerShown": false }} />
            <Stack.Screen name="SignUpScreen" component={SignUpScreen} options={{ "headerShown": false }} />
            <Stack.Screen name="PersonalDetailsScreen" component={PersonalDetailsScreen} options={{ "headerShown": false }} />
            <Stack.Screen name="EditProfileScreen" component={EditProfileScreen} options={{ "headerShown": false }} />
            <Stack.Screen name="PostListScreen" component={PostListScreen} options={{ "headerShown": false }} />
            <Stack.Screen name="MainTabs" component={MainTabs} options={{ "headerShown": false }} />
        </Stack.Navigator>

    );
}