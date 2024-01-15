
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import StackNavigator from './StackNavigator';
import DrawerContent from "../src/components/DrawerContent";

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <Drawer.Navigator
      drawerContent={props => <DrawerContent {...props} />}
    >
      <Drawer.Screen name="Home" component={StackNavigator} options={{ headerShown: false, swipeEdgeWidth: 100 }} />
    </Drawer.Navigator>
  )
}