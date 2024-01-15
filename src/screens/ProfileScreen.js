/**
 * @author Sangeeth Sehan
 */
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { useState, useRef, useEffect } from 'react'
import ComponentStyles from '../../constants/Component.styles'
import React from 'react'
import InputText from '../components/InputText'
import { useDispatch, useSelector } from 'react-redux'
import Header from '../components/Header'
import { selectUser } from '../../redux/selectors'
import ActionButton from '../components/ActionButton'
import { useIsFocused } from '@react-navigation/native'

export default function ProfileScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [maillingAddress, setMaillingAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const user = useSelector(selectUser);
    const isFocused = useIsFocused();



    useEffect(() => {
        console.log(user)
        setFirstName(user.firstName)
        setLastName(user.lastName)
        setEmail(user.email)
        setPhoneNumber(user.phoneNumber)
        setMaillingAddress(user.maillingAddress)
    }, [isFocused])




    return (
        <View style={ComponentStyles.CONTAINER}>
            <Header profile={true} title={'Profile'} image={user.photo} loading={false} />
            <View style={styles.subContainer}>
                <View style={{ flex: 8 }}>
                    <View style={{ alignItems: 'center', margin: 10 }}>
                        <TouchableOpacity>
                            <Image source={{ uri: user.photo }} style={styles.image}></Image>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <InputText
                            icon_name={'md-lock-closed'}
                            placeholder={"First Name"}
                            stateValue={firstName}
                            editable={false}
                            setState={(value) => setFirstName(value)}
                        />
                        <InputText
                            icon_name={'md-lock-closed'}
                            placeholder={"Last Name"}
                            stateValue={lastName}
                            editable={false}
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
                            editable={false}
                            setState={(value) => setPhoneNumber(value)}
                        />
                        <InputText
                            placeholder='Mailling Address'
                            placeholderColor='black'
                            stateValue={maillingAddress}
                            editable={false}
                            setState={(value) => setMaillingAddress(value)}
                        />
                    </View>
                </View>
                <View style={styles.secondSubContainer}>
                    <ActionButton
                        customBtnStyle={{ backgroundColor: ComponentStyles.COLORS.PRIMARY_COLOR }}
                        customTextStyle={{ fontSize: 15 }}
                        title='Edit'
                        onPress={() => { navigation.navigate('EditProfileScreen')}} />
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
    image: {
        width: 100, height: 100, borderRadius: 100, margin: 20
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
    secondSubContainer: {
        justifyContent: 'center',
        flex: 1
    },
    resetContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 10
    },
  
});