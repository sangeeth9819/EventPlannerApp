/**
 * @author Sangeeth Sehan
 */
import { View, Text, StyleSheet } from 'react-native'
import { useState, useRef, useEffect } from 'react'
import ComponentStyles from '../../constants/Component.styles'
import React from 'react'
import ActionButton from '../components/ActionButton'
import Strings from '../../constants/Strings'
import Message from '../components/Message'
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import InputText from '../components/InputText'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { AsyncStorageConstants } from '../../constants/Constants'
import { useDispatch } from 'react-redux'
import { ADD_USER } from '../../redux'

export default function SignUpScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [spinner, setSpinner] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState('');
    const dispatch = useDispatch();



    /**
     * This is to signUp via email and password. 
     */
    const onEmailSignUp = async () => {
        setSpinner(true)
        auth()
            .createUserWithEmailAndPassword(email, confirmPassword)
            .then(async (res) => {
                checkingUserAvailability(res.user)
            })
            .catch(error => {
                setSpinner(false)
                if (error.code === 'auth/email-already-in-use') {
                    Message.messageName(Strings.WARNING, Strings.EMAIL_ALREDAY_IN_USE, Strings.TYPE[0], Strings.ICON[0]);
                }
                if (error.code === 'auth/weak-password') {
                    Message.messageName(Strings.WARNING, Strings.PASSWORD_MINIMUM, Strings.TYPE[0], Strings.ICON[0]);
                }

                if (error.code === 'auth/invalid-email') {
                    Message.messageName(Strings.WARNING, Strings.INVALID_EMAIL, Strings.TYPE[0], Strings.ICON[0]);
                }

                console.error(error);
            });
    }

    /**
     * This is to check the user availability
     * and GET and SET user details to the databse under user collection. 
     */
    const checkingUserAvailability = (value) => {
        var request = {
            uid: value.uid,
            email: value.email,
        }
        database().ref('users/' + value.uid).set(request).then(async () => {
            Message.messageName(Strings.SUCCESS, Strings.LOGIN_SUCCESS, Strings.TYPE[1], Strings.ICON[1]);
            await AsyncStorage.setItem(AsyncStorageConstants.ASYNC_USER, JSON.stringify(request), () => {
                dispatch({ type: ADD_USER, payload: { email: value.email, userid: value.uid } })
                navigation.replace('ImageUploadScreen', { id: value.uid })
            })
            setSpinner(false)
            console.log('INSERTED');
        }).catch((error) => {
            setSpinner(false)
            console.log(error);
        });
    }

    /**
     * This is validation for signUp details. 
     */
    const sinUpRequest = () => {
        const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (email == "") {
            Message.messageName(Strings.WARNING, Strings.EMAIL_REQUIRED, Strings.TYPE[0], Strings.ICON[0]);
        } else if (!String(email).match(mailformat)) {
            Message.messageName(Strings.WARNING, Strings.EMAIL_FORMAT_INVALID, Strings.TYPE[0], Strings.ICON[0]);
        } else if (password == "") {
            Message.messageName(Strings.WARNING, Strings.PASSWORD_REQUIRED, Strings.TYPE[0], Strings.ICON[0]);
        } else if (password !== confirmPassword) {
            Message.messageName(Strings.WARNING, Strings.PASSWORD_NOT_MATCH, Strings.TYPE[0], Strings.ICON[0]);
        } else {
            onEmailSignUp()

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
                        <InputText
                            icon_name={'md-lock-closed'}
                            placeholder={"Confirm Password"}
                            secureTextEntry={true}
                            stateValue={confirmPassword}
                            inputIcon={true}
                            inputIconName={"lock-outline"}
                            setState={(value) => setConfirmPassword(value)}
                        />
                    </View>
                </View>
            </View>
            <View style={styles.subContainer}>
                <ActionButton
                    disabled={spinner}
                    customBtnStyle={{ backgroundColor: ComponentStyles.COLORS.PRIMARY_COLOR }}
                    customTextStyle={{ fontSize: 15 }}
                    showIcon={true}
                    title='Sign Up'
                    onPress={() => { sinUpRequest() }} />
                <ActionButton
                    customBtnStyle={{ backgroundColor: ComponentStyles.COLORS.PRIMARY_COLOR }}
                    customTextStyle={{ fontSize: 15 }}
                    showIcon={true}
                    title='Login'
                    onPress={() => { navigation.navigate('LoginScreen') }} />

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