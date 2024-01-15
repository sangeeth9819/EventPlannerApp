/**
 * @author Sangeeth Sehan
 */
import { View,  StyleSheet, TouchableOpacity, ScrollView, ImageBackground, Platform } from 'react-native'
import { useState, useRef, useEffect } from 'react'
import ComponentStyles from '../../constants/Component.styles'
import React from 'react'
import InputText from '../components/InputText'
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import { useDispatch, useSelector } from 'react-redux'
import * as ImagePicker from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import database from '@react-native-firebase/database';
import Header from '../components/Header'
import { selectUser } from '../../redux/selectors'
import ActionButton from '../components/ActionButton'
import { ADD_USER } from '../../redux'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { AsyncStorageConstants } from '../../constants/Constants'
import Message from '../components/Message'
import Strings from '../../constants/Strings'
import { CommonActions } from '@react-navigation/native'

export default function EditProfileScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [photo, setPhoto] = useState(null);
    const [currentPhoto, setCurrentPhoto] = useState(null);
    const [spinner, setSpinner] = useState(false);
    const [maillingAddress, setMaillingAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const user = useSelector(selectUser);
    const dispatch = useDispatch();


    useEffect(() => {
        console.log(user)
        setFirstName(user.firstName)
        setLastName(user.lastName)
        setEmail(user.email)
        setPhoto(user.photo)
        setCurrentPhoto(user.photo)
        setPhoneNumber(user.phoneNumber)
        setMaillingAddress(user.maillingAddress)
    }, [])


    /**
       *  Chooseing image from gallery.
       */
    const handleChoosePhoto = () => {
        const options = {
            noData: true,
        };
        ImagePicker.launchImageLibrary(options, response => {
            console.log('upload succes', response);
            if (response.assets) {
                setPhoto(response.assets[0])
                console.log(response.assets[0])
                console.log(photo);
                dispatch({ type: ADD_USER, payload: { photo: response.assets[0].uri } })
            }
        });
    };

    /**
    * This is to get user image from firebase storaeg
    * related to the user Id.
    */
    const getImage = (image) => {
        storage()
            .ref(image)
            .getDownloadURL()
            .then((url) => {
                dispatch({ type: ADD_USER, payload: { photo: url } })
                update(url)
                console.log(url)
            })
            .catch((e) => console.log('Errors while downloading => ', e));
    }

    /**
    * This is to upload image to the fierbase storage.
    */
    const uploadImage = async () => {
        const filename = photo.uri.substring(photo.uri.lastIndexOf('/') + 1);
        const uploadUri = Platform.OS === 'ios' ? photo.uri.replace('file://', '') : photo.uri;
        setSpinner(true)
        const task = storage()
            .ref(filename)
            .putFile(uploadUri)
            .then((snapshot) => {
                getImage(filename)
                console.log(snapshot)
                console.log(`${filename} has been successfully uploaded.`);
            })
        try {
            await task;
        } catch (e) {
            console.error(e);
        }
    };

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

            } else {
                if (user.photo == currentPhoto) {
                    update(currentPhoto)
                } else {
                    uploadImage()
                }
            }
        }
    }

    /**
    * This is to update user details in databse
    */
    const update = (url) => {
        setSpinner(true)
        var request = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            phoneNumber: phoneNumber,
            photo: url,
            maillingAddress: maillingAddress
        }
        console.log(request)
        console.log(user)
        database().ref('users/' + user.userId).update(request).then(async () => {
            Message.messageName(Strings.SUCCESS, Strings.UPDATE_SUCCESS, Strings.TYPE[1], Strings.ICON[1]);
            dispatch({
                type: ADD_USER, payload: {
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    phoneNumber: phoneNumber,
                    maillingAddress: maillingAddress,
                    photo: url
                }
            })
            setSpinner(false)
            AsyncStorage.setItem(AsyncStorageConstants.ASYNC_USER, JSON.stringify(user), () => {
                navigation.dispatch(CommonActions.goBack());
               
            })
            console.log('INSERTED');
        }).catch((error) => {
            console.log(error);
        });

    }

    return (
        <View style={ComponentStyles.CONTAINER}>
            <Header back={true} title={'Edit Profile'} image={user.photo} loading={false} />
            <View style={styles.subContainer}>
                <ScrollView>
                    <View style={{ flex: 8 }}>
                        <View style={{ alignItems: 'center', margin: 20 }}>
                            <TouchableOpacity onPress={handleChoosePhoto}>
                                <ImageBackground source={{ uri: user.photo }} borderRadius={100} style={{ width: 100, height: 100 }}>
                                    <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                                        <Icon name={"camera"} size={25} color={ComponentStyles.COLORS.WHITE} />
                                    </View>
                                </ImageBackground>
                            </TouchableOpacity>
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
                                stateValue={email}
                                editable={false}
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
                </ScrollView>
                <View style={styles.secondSubContainer}>
                    <ActionButton
                        disabled={spinner}
                        customBtnStyle={{ backgroundColor: ComponentStyles.COLORS.PRIMARY_COLOR }}
                        customTextStyle={{ fontSize: 15 }}
                        title='Save'
                        onPress={() => { updateRequest() }} />
                </View>
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
    secondSubContainer: {
        justifyContent: 'center',
        // flex: 1
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

});