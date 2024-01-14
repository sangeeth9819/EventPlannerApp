/**
 * @author Sangeeth Sehan
 */
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { useState, useRef, useEffect } from 'react'
import ComponentStyles from '../../constants/Component.styles'
import React from 'react'
import ActionButton from '../components/ActionButton'
import Strings from '../../constants/Strings'
import storage from '@react-native-firebase/storage';
import database from '@react-native-firebase/database';
import Message from '../components/Message'
import Icon from 'react-native-vector-icons/Feather';
import { selectUser, selectUserName } from '../../redux/selectors';
import * as ImagePicker from 'react-native-image-picker';
import { useDispatch, useSelector } from 'react-redux'
import { ADD_USER } from '../../redux'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { AsyncStorageConstants } from '../../constants/Constants'

export default function ImageUploadScreen({ navigation, route }) {
    const [spinner, setSpinner] = useState(false);
    const [id, setId] = useState(null);
    const [photo, setPhoto] = useState(null);
    const user = useSelector(selectUser);
    const dispatch = useDispatch();



    useEffect(() => {
        setId(route.params.id)
        console.log(user)
    }, [id])


    /**
     * This is to update user details in databse
     */
    const update = (fileName) => {
        setSpinner(true)
        var request = {
            photo: fileName
        }
        console.log(request)
        database().ref('users/' + id).update(request).then(() => {
            AsyncStorage.setItem(AsyncStorageConstants.ASYNC_USER, JSON.stringify(user), () => {
                navigation.navigate('PersonalDetailsScreen', { id: id })
            })
            setSpinner(false)
            console.log('INSERTED');
        }).catch((error) => {
            console.log(error);
        });

    }


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

            }
        });
    };


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

    return (
        <View style={ComponentStyles.CONTAINER}>
            <View style={{ flex: 8 }}>
                <View style={styles.subContainer}>
                    <View style={styles.headerContainer}>
                        <Text style={styles.headerText}>Welcome</Text>
                        <Text style={styles.subText}>You are Logged in for the first time and can upload a profile photo</Text>
                    </View>
                    <View style={{ alignItems: 'center', margin: 10 }}>
                        <TouchableOpacity onPress={handleChoosePhoto}>
                            <View style={{ height: 116, width: 116, borderRadius: 100, backgroundColor: ComponentStyles.COLORS.LIGHT }}>

                                <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                                    {photo == null ?
                                        <Icon name={"camera"} size={25} color={ComponentStyles.COLORS.PRIMARY_COLOR} /> :
                                        <Image source={{ uri: photo.uri }} style={{ width: 100, height: 100, borderRadius: 100 }}></Image>}
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View style={styles.subContainer}>
                <ActionButton
                    disabled={spinner}
                    customBtnStyle={{ backgroundColor: ComponentStyles.COLORS.PRIMARY_COLOR }}
                    customTextStyle={{ fontSize: 15 }}
                    showIcon={true}
                    title='Next'
                    onPress={() => { photo == null ? navigation.navigate('PersonalDetailsScreen', { id: id }) : uploadImage() }} />
            </View>
        </View>
    )
}



const styles = StyleSheet.create({

    headerText: {
        fontFamily: ComponentStyles.FONT_FAMILY.BOLD,
        color: ComponentStyles.COLORS.BLACK, fontSize: 32,
        height: 60
    },
    subText: {
        fontSize: 13,
        fontFamily: ComponentStyles.FONT_FAMILY.REGULAR,
        color: ComponentStyles.COLORS.GRAY,
        textAlign: 'center',
        width: '80%'
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
        flex: 1
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