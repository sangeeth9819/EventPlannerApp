/**
 * @author Sangeeth Shehan
 */
import React, { useState, useEffect } from 'react'
import {
    View,
    Text,
    StyleSheet,
    Alert,
    Image,
    Linking
} from "react-native";
import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';
import { CommonActions } from '@react-navigation/native';
import ComponentStyles from "../../constants/Component.styles";
import Icons from 'react-native-vector-icons/SimpleLineIcons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AsyncStorageConstants } from "../../constants/Constants";
import { selectUser } from '../../redux/selectors';
import { useSelector } from 'react-redux';

export default function DrawerContent({ navigation }) {
    const user = useSelector(selectUser);

    console.log(user.photo)

    return (
        <View style={styles.CONTAINER}>
            <DrawerContentScrollView>
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                        <View style={{ marginTop: 25 }}>
                            <View style={{ flexDirection: 'row', }}>
                                <View style={{ justifyContent: 'center' }}>
                                    <Image source={(user.photo == "" || user.photo == null)?
                                        require('../../assets/images/logo.jpg') : { uri: user.photo }} style={{ width: 44, height: 44, borderRadius: 100 }} />
                                </View>
                                <View style={{ left: 10 }}>
                                    <Text numberOfLines={1} style={styles.subText}>{user.firstName + " " + user.lastName}</Text>
                                    <Text numberOfLines={1} style={styles.name}>{user.email}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={styles.drawerSection}>


                </View>
                <View style={styles.bottomDrawerSection}>
                    <DrawerItem
                        icon={({ focused, color, size }) => (
                            <Icons
                                name="logout"
                                size={20}
                                color={focused ? ComponentStyles.COLORS.PRIMARY_COLOR : ComponentStyles.COLORS.PRIMARY_COLOR}
                            />
                        )}
                        label="Logout"
                        labelStyle={{
                            color: ComponentStyles.COLORS.PRIMARY_COLOR,
                            fontFamily: ComponentStyles.FONT_FAMILY.BOLD,
                            fontSize: 14,
                          }}
                        onPress={() => Alert.alert(
                            'Confirm',
                            'Are you sure you want to do this ?',
                            [
                                { text: 'No', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                                {
                                    text: 'Yes', onPress: () => {
                                        navigation.closeDrawer();
                                        AsyncStorage.removeItem(AsyncStorageConstants.ASYNC_USER);
                                        navigation.dispatch(
                                            CommonActions.reset({
                                                index: 1,
                                                routes: [
                                                    { name: 'LoginScreen', params: { bySignUp: false } },

                                                ],
                                            })
                                        );
                                    }
                                },
                            ],
                            { cancelable: true }
                        )}
                    />

                </View>
            </DrawerContentScrollView>
            <View style={{ alignItems: 'center' }}>
                <View style={{ position: 'absolute', left: 0, right: 0, bottom: 0, alignItems: 'center', marginBottom: 50 }}>
                    <Text style={{
                        color: ComponentStyles.COLORS.GRAY,
                        fontFamily: ComponentStyles.FONT_FAMILY.REGULAR,
                        fontSize: 12,
                        paddingLeft: 5,
                        top: 2,
                    }}>App version 0.0.1</Text></View>
            </View>
        </View>


    )
}
const styles = StyleSheet.create({
    CONTAINER: {
        flex: 1,
        backgroundColor: ComponentStyles.COLORS.WHITE

    },
    drawerContent: {
        flex: 1,
    },
    userInfoSection: {
        paddingLeft: 20,
    },
    name: {
        color: ComponentStyles.COLORS.GRAY,
        fontFamily: ComponentStyles.FONT_FAMILY.REGULAR,
        fontSize: 15,
        width: '100%'
    },
    subText: {
        color: ComponentStyles.COLORS.BLACK,
        fontFamily: ComponentStyles.FONT_FAMILY.BOLD,
        fontSize: 15,
        width: '100%'
    },
    title: {
        fontSize: 16,
        marginTop: 3,
        fontWeight: 'bold',
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
    },
    row: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
    },
    paragraph: {
        fontWeight: 'bold',
        marginRight: 3,
    },
    drawerSection: {
        marginTop: 15,
        borderTopColor: ComponentStyles.COLORS.LIGHT,
        borderTopWidth: 1
    },
    bottomDrawerSection: {
        marginBottom: 15,

    },
    preference: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
    title: {
        color: ComponentStyles.COLORS.WHITE,
        fontFamily: ComponentStyles.FONT_FAMILY.BOLD,
        fontSize: 18,
        paddingLeft: 5,
        top: 2,
    },
    subtitle: {
        color: ComponentStyles.COLORS.WHITE,
        fontFamily: ComponentStyles.FONT_FAMILY.REGULAR,
        fontSize: 18,
        paddingLeft: 5,
        top: 2,
    },

});

