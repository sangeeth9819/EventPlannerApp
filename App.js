/**
 * @author Sangeeth Shehan
 */
import React, { useState, useEffect } from "react";
import { PermissionsAndroid, Platform, StatusBar, View } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import FlashMessage from "react-native-flash-message";
import { Provider as PaperProvider } from 'react-native-paper';
import { getStatusBarHeight } from "react-native-status-bar-height";
import 'react-native-gesture-handler';
import { Provider as StoreProvider } from 'react-redux';
import configureStore from './redux/store/configureStore';
import ComponentStyles from "./constants/Component.styles";
import {
  getFcmToken,
  requestUserPermission,
  notificationListener,
  createChanel
} from './src/notification/Index';

// Main screen
import DrawerNavigator from "./navigation/DrawerNavigator";


const MyTheme = {
  dark: true,
  colors: {
    primary: ComponentStyles.COLORS.WHITE,
    background: ComponentStyles.COLORS.WHITE,
    card: ComponentStyles.COLORS.WHITE,
    text: ComponentStyles.COLORS.LIGHT_GRAY,
    border: ComponentStyles.COLORS.LIGHT_YELLOW,
    notification: ComponentStyles.COLORS.LIGHT_YELLOW,
  },
};

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: ComponentStyles.COLORS.LIGHT_GRAY,
    secondary: ComponentStyles.COLORS.LIGHT_GRAY,
    onSurfaceVariant: ComponentStyles.COLORS.BLACK
  },
};

const App = () => {
  const [generatedToken, setGeneratedToken] = useState();

  /**
   *  This method to check android permision is allow or not in android 13
   */
  const checkApplicationPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
        );
      } catch (error) {
      }
    }
  };

  /**
   *  Getting FCM token related to the app and adding notification listerner
   * for both backgroud and foreground as well as create a chanel for notification using notifi
   */
  useEffect(() => {
    const fetchToken = async () => {
      const token = await getFcmToken();
      if (token) {
        setGeneratedToken(token);
      }
    };
    checkApplicationPermission();
    void fetchToken();
    void requestUserPermission();
    void notificationListener();
    void createChanel()

  }, []);

  return (
    <StoreProvider store={configureStore}>
      <PaperProvider theme={theme}>
        <NavigationContainer independent={true} theme={MyTheme}>
          <StatusBar barStyle={"dark-content"} hidden={false} backgroundColor={ComponentStyles.COLORS.WHITE} />
          <View style={{ paddingTop: getStatusBarHeight(true) }} />
          <DrawerNavigator />
          <FlashMessage position="top" />
        </NavigationContainer>
      </PaperProvider>
    </StoreProvider>
  );
}

export default App;
