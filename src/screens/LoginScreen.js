/**
 * @author Sangeeth Sehan
 */
import { View, Text, StyleSheet, Alert } from 'react-native'
import { useState, useRef } from 'react'
import ComponentStyles from '../../constants/Component.styles'
import React from 'react'
import ActionButton from '../components/ActionButton'
import Strings from '../../constants/Strings'
import Message from '../components/Message'
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import InputText from '../components/InputText'
import Icon from 'react-native-vector-icons/Feather';
import { useDispatch } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { AsyncStorageConstants } from '../../constants/Constants'
import { ADD_USER } from '../../redux'

export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [reEmail, setReEmail] = useState('');
    const [rePassword, setRePassword] = useState('');
    const [resetEmail, setResetEmail] = useState('');
    const [password, setPassword] = useState('');
    const [spinner, setSpinner] = useState(false);
    const resetmodal = useRef(null);
    const dispatch = useDispatch();


    /**
     * This is to signIn via email and password. 
     */
    const onEmailSignIn = async () => {
        setSpinner(true)
        auth()
            .signInWithEmailAndPassword(email, password)
            .then(async (res) => {
                console.log(res)
                checkingUserAvailability(res.user)

            })
            .catch(error => {
                setSpinner(false)
                if (error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found' ||
                    error.code === 'auth/invalid-credential') {
                    Message.messageName(Strings.WARNING, Strings.LOGIN_FAILED, Strings.TYPE[0], Strings.ICON[0]);
                }
                console.error(error);
            });
    }

    /**
     * This is to check the user availability
     * and GET and SET user details to the databse under user collection. 
     */
    const checkingUserAvailability = (value) => {
        database().ref(`users/` + value.uid).once("value", snapshot => {
            console.log(snapshot.exists())
            if (snapshot.exists()) {
                console.log("exists!");
                console.log(snapshot._snapshot.value)
                setSpinner(false)
                Message.messageName(Strings.SUCCESS, Strings.LOGIN_SUCCESS, Strings.TYPE[1], Strings.ICON[1]);
                dispatch({ type: ADD_USER, payload: snapshot._snapshot.value })
                AsyncStorage.setItem(AsyncStorageConstants.ASYNC_USER, JSON.stringify(snapshot._snapshot.value), () => {
                    navigation.replace('MainTabs')
                })
            }
        });
    }


    /**
     * This is validation for signIn details. 
     */
    const sinInRequest = () => {
        const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (email == "") {
            Message.messageName(Strings.WARNING, Strings.EMAIL_REQUIRED, Strings.TYPE[0], Strings.ICON[0]);
        } else if (!String(email).match(mailformat)) {
            Message.messageName(Strings.WARNING, Strings.EMAIL_FORMAT_INVALID, Strings.TYPE[0], Strings.ICON[0]);
        } else if (password == "") {
            Message.messageName(Strings.WARNING, Strings.PASSWORD_REQUIRED, Strings.TYPE[0], Strings.ICON[0]);
        } else {
            onEmailSignIn()
        }
    }



    return (
        <View style={ComponentStyles.CONTAINER}>
            <View style={{ flex: 8 }}>
                <View style={styles.subContainer}>
                    <View style={styles.headerContainer}>
                        <Text style={styles.headerText}>Welcome</Text>
                        <Text style={styles.subText}>Welcome to your Portal</Text>
                    </View>
                    <View>
                        <InputText
                            placeholder='Email'
                            placeholderColor='black'
                            inputIcon={true}
                            inputIconName={"email-outline"}
                            stateValue={email}
                            setState={(value) => setEmail(value)}
                        />
                        <InputText
                            icon_name={'md-lock-closed'}
                            placeholder={"Password"}
                            secureTextEntry={true}
                            stateValue={password}
                            inputIcon={true}
                            inputIconName={"lock-outline"}
                            setState={(value) => setPassword(value)}
                        />
                    </View>
                    <View style={styles.resetContainer}>
                        <Text style={styles.resetText}>Restore password </Text>
                        <Icon name={"arrow-up-right"} size={25} color={ComponentStyles.COLORS.PRIMARY_COLOR} />
                    </View>
                </View>
            </View>
            <View style={styles.subContainer}>
                <ActionButton
                    disabled={spinner}
                    customBtnStyle={{ backgroundColor: ComponentStyles.COLORS.PRIMARY_COLOR }}
                    customTextStyle={{ fontSize: 15 }}
                    showIcon={true}
                    title='Login'
                    onPress={() => { sinInRequest() }} />
                <ActionButton
                    customBtnStyle={{ backgroundColor: ComponentStyles.COLORS.PRIMARY_COLOR }}
                    customTextStyle={{ fontSize: 15 }}
                    showIcon={true}
                    title='Sign Up'
                    onPress={() => { navigation.navigate('SignUpScreen') }} />
            </View>
        </View>
    )
}



const styles = StyleSheet.create({

    headerText: {
        fontFamily: ComponentStyles.FONT_FAMILY.BOLD,
        color: ComponentStyles.COLORS.BLACK, fontSize: 32,
    },
    subText: {
        fontSize: 13,
        fontFamily: ComponentStyles.FONT_FAMILY.REGULAR, color: ComponentStyles.COLORS.GRAY,
    },
    resetText: {
        fontSize: 13,
        fontFamily: ComponentStyles.FONT_FAMILY.REGULAR, color: ComponentStyles.COLORS.PRIMARY_COLOR,
    },
    headerContainer: {
        alignItems: 'center',
        height: 120
    },
    subContainer: {
        margin: 20,
        justifyContent: 'center',
        flex: 3
    },
    resetContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 10
    },
    SignupText: {
        fontSize: 12,
        color: ComponentStyles.COLORS.LIGHT_YELLOW, fontFamily: ComponentStyles.FONT_FAMILY.REGULAR
    },
    bar: {
        height: 5, width: 100, backgroundColor: ComponentStyles.COLORS.LIGHT_GRAY, borderRadius: 20
    },
    imagebackground: {
        width: 100,
        height: 100,
        borderRadius: 100,
        backgroundColor: ComponentStyles.COLORS.WHITE,
        elevation: 5
    },
    regBox: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10
    },
    modal: {
        width: '100%',
        height: '70%',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        backgroundColor: ComponentStyles.COLORS.WHITE
    },
    resetmodal: {
        width: '100%',
        height: 'auto',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        backgroundColor: ComponentStyles.COLORS.WHITE
    },


});