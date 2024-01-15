/**
 * @author Sangeeth Sehan
 */
import { View, Text, ImageBackground, TextInput, StyleSheet, TouchableOpacity, Image, Alert, StatusBar, FlatList, ScrollView } from 'react-native'
import { useState, useRef, useEffect } from 'react'
import ComponentStyles from '../../constants/Component.styles'
import React from 'react'
import Strings from '../../constants/Strings'
import Message from '../components/Message'
import InputText from '../components/InputText'
import NetInfo from "@react-native-community/netinfo";
import Icon from 'react-native-vector-icons/Feather';
import { SliderBox } from "react-native-image-slider-box";
import { useDispatch, useSelector } from 'react-redux'
import { Avatar, Button, Card, Paragraph, Title } from 'react-native-paper';
import { selectUser } from '../../redux/selectors'
import Header from '../components/Header'
import Modal from 'react-native-modalbox';
import { GET_COMMENTS, GET_EVENTS, GET_SLIDER_IMAGES } from '../api/Sevices'
import { GET } from '../api/RequestHandler'
import Post from '../components/Post'
import Comment from '../components/Comment'
import Spinner from '../components/Spinner'

export default function PostListScreen({ navigation }) {
    const [sliderImages, setSliderImages] = useState([]);
    const [spinner, setSpinner] = useState(false);
    const [currentEvent, setCurrentEvent] = useState([]);
    const [users, setUsers] = useState([]);
    const [count, setCount] = useState(0);
    const [allImages, setAllImages] = useState([]);
    const [message, setMessage] = useState('')
    const [allComments, setAllComments] = useState([]);
    const modal = useRef(null);


    useEffect(() => {
        getImages()
    }, [])


    /**
    * This method to get posts from the server
     */
    const getImages = () => {
        setSpinner(true)
        NetInfo.fetch().then(state => {
            if (state.isConnected === true) {
                (async () => {
                    try {
                        let apiResponse = await GET(GET_SLIDER_IMAGES);
                        console.log(apiResponse);
                        setSpinner(false)
                        if (apiResponse[0] === 200) {
                            setAllImages(apiResponse[1].slice(0, 20));
                        } else {
                            setSpinner(false)
                            Message.messageName(Strings.FAILED, Strings.INTERNAL_ERROR, Strings.TYPE[2], Strings.ICON[2]);
                        }
                    } catch (e) {
                        setSpinner(false)
                        console.log(e.stack);
                    }
                })();
            } else {
                setSpinner(false)
                Alert.alert(
                    'Connection Error!',
                    'Please check your connection and try again',
                    [
                        {
                            text: 'Retry',
                            onPress: () => {
                                getOrders()
                            },
                        },
                    ],
                    { cancelable: true },
                );
            }
        });

    }


    /**
    * This method to get comment list from the server
     */
    const getComments = () => {
        setSpinner(true)
        NetInfo.fetch().then(state => {
            if (state.isConnected === true) {
                (async () => {
                    try {
                        let apiResponse = await GET(GET_COMMENTS);
                        console.log(apiResponse);
                        setSpinner(false)
                        if (apiResponse[0] === 200) {
                            setAllComments(apiResponse[1].slice(0, 10));
                            modal.current.open()
                        } else {
                            setSpinner(false)
                            Message.messageName(Strings.FAILED, Strings.INTERNAL_ERROR, Strings.TYPE[2], Strings.ICON[2]);
                        }
                    } catch (e) {
                        setSpinner(false)
                        console.log(e.stack);
                    }
                })();
            } else {
                setSpinner(false)
                Alert.alert(
                    'Connection Error!',
                    'Please check your connection and try again',
                    [
                        {
                            text: 'Retry',
                            onPress: () => {
                                getComments()
                            },
                        },
                    ],
                    { cancelable: true },
                );
            }
        });

    }




    return (
        <View style={ComponentStyles.CONTAINER}>
            <StatusBar barStyle="dark-content" hidden={false} backgroundColor={ComponentStyles.COLORS.WHITE} />
            <Header back={true} title={"All Posts"} loading={spinner} />
            <View style={styles.subContainer}>
                <FlatList
                    data={allImages}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item, index }) => {
                        return (
                            <Post item={item} horizontal={false} post={true} onPressComment={() => { getComments()  }} />
                        );
                    }}
                />
            </View>
            <Modal style={styles.modal} position={'bottom'} ref={modal} swipeToClose={false} >
                <View style={{ alignItems: 'center', margin: 10 }}>
                    <View style={styles.bar}></View>
                </View>
                <View style={{ flex: 1 }}>
                    {!spinner &&
                        <FlatList
                            data={allComments}
                            showsHorizontalScrollIndicator={false}
                            renderItem={({ item, index }) => {
                                return (
                                    <Comment item={item} horizontal={false} post={true} onPressComment={() => { }} />
                                );
                            }}
                        />
                    }
                    {spinner &&
                        <Spinner message={"Loading Comments .."} />
                    }
                </View>
                <View style={styles.container}>
                    <View style={{ width: '80%' }}>
                        <TextInput
                            value={message}
                            onChangeText={(text) => setMessage(text)}
                            placeholder="Type your comment here"
                            style={{ color: ComponentStyles.COLORS.BLACK }}
                            placeholderTextColor={ComponentStyles.COLORS.LIGHT_GRAY}
                            underlineColorAndroid="transparent"
                            returnKeyType="send"
                        />
                    </View>
                    <TouchableOpacity onPress={() => { }}>
                        <Icon name={'send'} size={30} color={ComponentStyles.COLORS.PRIMARY_COLOR} />
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    )
}



const styles = StyleSheet.create({

    headerText: {
        fontFamily: ComponentStyles.FONT_FAMILY.BOLD,
        color: ComponentStyles.COLORS.BLACK, fontSize: 25,
    },
    subText: {
        fontSize: 14,
        fontFamily: ComponentStyles.FONT_FAMILY.REGULAR, color: ComponentStyles.COLORS.GRAY,
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 8,
        backgroundColor: ComponentStyles.COLORS.SHADE_WHITE,
        borderRadius: 20,
        marginHorizontal: 16,
        marginVertical: 8,
    },
    organizerText: {
        fontFamily: ComponentStyles.FONT_FAMILY.BOLD,
        color: ComponentStyles.COLORS.BLACK, fontSize: 22, height: 50
    },
    photoText: {
        fontFamily: ComponentStyles.FONT_FAMILY.BOLD,
        color: ComponentStyles.COLORS.BLACK, fontSize: 22, height: 40
    },
    secondSubContainer: {
        flexDirection: 'row', justifyContent: 'space-between', marginTop: 20
    },
    allText: {
        fontFamily: ComponentStyles.FONT_FAMILY.BOLD,
        color: ComponentStyles.COLORS.PRIMARY_COLOR, fontSize: 14
    },
    postContainer: {
        width: '100%', elevation: 5, backgroundColor: ComponentStyles.COLORS.WHITE
    },
    countText: {
        fontFamily: ComponentStyles.FONT_FAMILY.BOLD,
        color: ComponentStyles.COLORS.PRIMARY_COLOR, fontSize: 19
    },
    postText: {
        fontFamily: ComponentStyles.FONT_FAMILY.REGULAR,
        color: ComponentStyles.COLORS.GRAY, fontSize: 14,
    },
    resetText: {
        fontSize: 13,
        fontFamily: ComponentStyles.FONT_FAMILY.REGULAR, color: ComponentStyles.COLORS.PRIMARY_COLOR,
    },
    headerContainer: {
        height: 80
    },
    subContainer: {
        margin: 10,
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