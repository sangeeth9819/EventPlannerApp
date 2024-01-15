/**
 * @author Sangeeth Sehan
 */
import { View, Text, StyleSheet } from 'react-native'
import { useState, useRef, useEffect } from 'react'
import ComponentStyles from '../../constants/Component.styles'
import React from 'react'
import ActionButton from '../components/ActionButton'
import database from '@react-native-firebase/database';
import Strings from '../../constants/Strings'
import Message from '../components/Message'
import InputText from '../components/InputText'
import { useDispatch, useSelector } from 'react-redux'
import { selectUser } from '../../redux/selectors'
import { ADD_USER } from '../../redux'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { AsyncStorageConstants } from '../../constants/Constants'

export default function PersonalDetailsScreen({ navigation, route }) {
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [maillingAddress, setMaillingAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [id, setId] = useState(null);
    const [spinner, setSpinner] = useState(false);
    const user = useSelector(selectUser);
    const dispatch = useDispatch();


    /**
     * This is to Initialize the google sinIn configuration.
     */
    useEffect(() => {
        setId(route.params.id)
        setEmail(user.email)
        console.log(user)
    }, [id])


    /**
     * This is validation for update details. 
     */
    const updateRequest = () => {
        const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (email !== "" && (!String(email).match(mailformat))) {
            Message.messageName(Strings.WARNING, Strings.EMAIL_REQUIRED, Strings.TYPE[0], Strings.ICON[0]);
        } else if (phoneNumber !== "" && phoneNumber.length !== 10) {
            Message.messageName(Strings.WARNING, Strings.PHONE_NUMBER_INCORRECT, Strings.TYPE[0], Strings.ICON[0]);
        } else {
            if (firstName == "" && lastName == "" && (user.email == email) && phoneNumber == "" && maillingAddress == "") {
               navigation.replace('MainTabs')
            } else {
                update()
            }
        }
    }

    /**
    * This is to update user details in databse
    */
    const update = () => {
        setSpinner(true)
        var request = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            phoneNumber: phoneNumber,
            maillingAddress: maillingAddress
        }
        console.log(request)
        database().ref('users/' + id).update(request).then(async () => {
            Message.messageName(Strings.WARNING, Strings.UPDATE_SUCCESS, Strings.TYPE[1], Strings.ICON[1]);
            dispatch({
                type: ADD_USER, payload: {
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    phoneNumber: phoneNumber,
                    maillingAddress: maillingAddress
                }
            })
            AsyncStorage.setItem(AsyncStorageConstants.ASYNC_USER, JSON.stringify(user), () => {
                navigation.replace('MainTabs')
            })
            console.log('INSERTED');
        }).catch((error) => {
            console.log(error);
        });

    }




    return (
        <View style={ComponentStyles.CONTAINER}>
            <View style={{ flex: 1 }}>
                <View style={styles.subContainer}>
                    <View style={styles.headerContainer}>
                        <Text style={styles.headerText}>Personal info</Text>
                        <Text style={styles.subText}>You can add your personal data now or do it later.</Text>
                    </View>
                    <View>
                        <InputText
                            icon_name={'md-lock-closed'}
                            placeholder={"First Name"}
                            stateValue={firstName}
                            setState={(value) => setFirstName(value)}
                        />
                        <InputText
                            icon_name={'md-lock-closed'}
                            placeholder={"Last Name"}
                            stateValue={lastName}
                            setState={(value) => setLastName(value)}
                        />
                        <InputText
                            icon_name={'md-lock-closed'}
                            placeholder={"Email"}
                            editable={false}
                            stateValue={email}
                            setState={(value) => setEmail(value)}
                        />
                        <InputText
                            placeholder='Phone Number'
                            placeholderColor='black'
                            keyType={"number-pad"}
                            stateValue={phoneNumber}
                            setState={(value) => setPhoneNumber(value)}
                        />
                        <InputText
                            placeholder='Mailling Address'
                            placeholderColor='black'
                            stateValue={maillingAddress}
                            setState={(value) => setMaillingAddress(value)}
                        />
                    </View>
                </View>
            </View>
            <View style={styles.subContainer}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ width: '48%' }}>
                        <ActionButton
                            customBtnStyle={{ backgroundColor: ComponentStyles.COLORS.PRIMARY_COLOR }}
                            customTextStyle={{ fontSize: 15 }}
                            showIcon={true}
                            back={true}
                            title='Back'
                            onPress={() => { navigation.goBack() }} />
                    </View>
                    <View style={{ width: '48%' }}>
                        <ActionButton
                            disabled={spinner}
                            customBtnStyle={{ backgroundColor: ComponentStyles.COLORS.PRIMARY_COLOR }}
                            customTextStyle={{ fontSize: 15 }}
                            showIcon={true}
                            title='Login'
                            onPress={() => { updateRequest() }} />
                    </View>
                </View>
            </View>
        </View>
    )
}



const styles = StyleSheet.create({

    headerText: {
        fontFamily: ComponentStyles.FONT_FAMILY.BOLD,
        color: ComponentStyles.COLORS.BLACK, fontSize: 19,
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
        height: 80
    },
    subContainer: {
        margin: 20,
        justifyContent: 'center',

    },
    resetContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 10
    },
});