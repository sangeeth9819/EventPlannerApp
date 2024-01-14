/**
 * @author Sangeeth Sehan
 */
import { View, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import ComponentStyles from '../../constants/Component.styles'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AsyncStorageConstants } from '../../constants/Constants';
import { ADD_USER } from '../../redux';
import { useDispatch } from 'react-redux';

export default function SplashScreen({ navigation }) {
    const dispatch = useDispatch();


    /**
     * This is to get the user unique Id fom async storage
     * after the component is rendered.
     */
    useEffect(() => {
        async function getUserData() {
            try {
                const value = await AsyncStorage.getItem(AsyncStorageConstants.ASYNC_USER);
                var data = []
                data = JSON.parse(value)
                if (value !== null) {
                    await AsyncStorage.setItem(AsyncStorageConstants.ASYNC_USER, JSON.stringify(data), () => {
                        dispatch({ type: ADD_USER, payload: { email: value.email, userid: value.uid } })
                        navigation.replace('MainTabs')
                    })

                } else {
                    navigation.replace('LoginScreen')
                }

            } catch (error) {
                console.log(error);

            }
        }
        getUserData()
    }, [])


    return (
        <View style={ComponentStyles.CONTAINER}></View>
    )
}



const styles = StyleSheet.create({

});