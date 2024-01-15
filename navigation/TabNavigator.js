import React from 'react';
import 'react-native-gesture-handler';
import IconMat from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/AntDesign';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../src/screens/HomeScreen'
import Profile from '../src/screens/ProfileScreen'
import ComponentStyles from '../constants/Component.styles'

const Tab = createBottomTabNavigator();

export default function App() {

    return (
        <Tab.Navigator
            backBehavior="initialRoute"
            initialRouteName='Home'
            screenOptions={{
                tabBarLabelStyle: { fontWeight: '500' },
                tabBarActiveTintColor: ComponentStyles.COLORS.WHITE,
                tabBarStyle: {
                    backgroundColor: ComponentStyles.COLORS.BLACK,
                },
                headerShown: false,
            }}
        >

            <Tab.Screen name={"Home"} component={Home} options={{
                tabBarIcon: ({ focused }) => (
                    focused
                        ? <IconMat name="home" size={27} color={ComponentStyles.COLORS.WHITE} />
                        : <IconMat name="home-outline" size={27} color={focused ? ComponentStyles.COLORS.WHITE:ComponentStyles.COLORS.LIGHT_GRAY} />

                )
            }}></Tab.Screen>

            <Tab.Screen name={"Profile"} component={Profile} options={{
                tabBarIcon: ({ focused }) => (
                    focused
                        ? <Icon name="appstore1" size={27} color={ComponentStyles.COLORS.WHITE} />
                        : <Icon name="appstore-o" size={27} color={ focused ? ComponentStyles.COLORS.WHITE:ComponentStyles.COLORS.LIGHT_GRAY} />

                )
            }}></Tab.Screen>
        </Tab.Navigator>
    );
}
