/**
 * @author Sangeeth Sehan
 */
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity, Image, Alert, StatusBar, FlatList, ScrollView } from 'react-native'
import { useState, useRef, useEffect } from 'react'
import ComponentStyles from '../../constants/Component.styles'
import React from 'react'
import ItemList from '../components/ItemList'
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
import { GET_EVENTS, GET_SLIDER_IMAGES } from '../api/Sevices'
import { GET } from '../api/RequestHandler'
import JSONData from '../../constants/JSONData'
import CardList from '../components/CardList'

export default function Home({ navigation }) {
    const [sliderImages, setSliderImages] = useState([]);
    const [spinner, setSpinner] = useState(false);
    const [currentEvent, setCurrentEvent] = useState([]);
    const [users, setUsers] = useState([]);
    const [count, setCount] = useState(0);
    const [allImages, setAllImages] = useState([]);


    useEffect(() => {
        getImages()
        getCurrentEvent()
    }, [])


    /**
    * This method to get slider images from the server
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
                            const imageURLs = apiResponse[1].slice(0, 10).map((item) => item.url);
                            console.log(imageURLs)
                            setSliderImages(imageURLs)
                            setAllImages(apiResponse[1].slice(0, 10));
                            setCount(apiResponse[1].length)
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
   * This method to get current event from the server
    */
    const getCurrentEvent = () => {
        setSpinner(true)
        NetInfo.fetch().then(state => {
            if (state.isConnected === true) {
                (async () => {
                    try {
                        let apiResponse = await GET(GET_EVENTS);
                        console.log(apiResponse);
                        setSpinner(false)
                        if (apiResponse[0] === 200) {
                            console.log(apiResponse[1][0])
                            setCurrentEvent(apiResponse[1][0])
                            const slicedData = apiResponse[1].slice(0, 3);
                            setUsers(slicedData)
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
                                getCurrentEvent()
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
            <StatusBar translucent backgroundColor="transparent" />
            {spinner &&
                <View style={styles.loadingContainer}>
                    <Text style={styles.organizerText}>Loading Data...</Text>
                </View>
            }
            <ScrollView nestedScrollEnabled={true} showsVerticalScrollIndicator={false} >
                {!spinner &&
                    <SliderBox
                        images={sliderImages}
                        sliderBoxHeight={220}
                        onCurrentImagePressed={index => console.warn(`image ${index} pressed`)}
                        paginationBoxVerticalPadding={20}
                        autoplay
                        circleLoop
                    />
                }
                {!spinner &&
                    <View style={styles.subContainer}>
                        <View style={styles.headerContainer}>
                            <Text style={styles.headerText}>{currentEvent.length == 0 ? "" : currentEvent.name}</Text>
                            <Text style={styles.subText}>{currentEvent.length == 0 ? "" : (currentEvent.address.city + " " +
                                currentEvent.address.street + " " + currentEvent.address.suite)}</Text>
                        </View>
                        <Text style={styles.organizerText}>Organizers</Text>
                        <FlatList
                            data={users}
                            showsVerticalScrollIndicator={false}
                            renderItem={({ item, index }) => {
                                return (
                                    <ItemList
                                        data={item}
                                        index={index}
                                        onPress={() => { }}
                                    />

                                );
                            }}
                        />
                        <View style={styles.secondSubContainer}>
                            <Text style={styles.photoText}>Photos</Text>
                            <TouchableOpacity onPress={() => navigation.navigate('PostListScreen', { allPosts: allImages })}>
                                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                                    <Text style={styles.allText}>All Photos</Text>
                                    <Icon name={"arrow-right"} size={20} color={ComponentStyles.COLORS.PRIMARY_COLOR} />
                                </View>
                            </TouchableOpacity>
                        </View>
                        <FlatList
                            data={allImages}
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            renderItem={({ item, index }) => {
                                return (
                                    <CardList item={item} horizontal={true} />
                                );
                            }}
                        />

                        <TouchableOpacity style={styles.postContainer} onPress={() => navigation.navigate('PostListScreen', { allPosts: allImages })}>
                            <View style={{ alignItems: 'center', margin: 10 }}>
                                <Text style={styles.countText}>{count == 0 ? "Loading Data .." : count}</Text>
                                <Text style={styles.postText}>Posts</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                }
            </ScrollView>
        </View >
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

    },
    organizerText: {
        fontFamily: ComponentStyles.FONT_FAMILY.BOLD,
        color: ComponentStyles.COLORS.BLACK, fontSize: 22, height: 50
    },
    photoText: {
        fontFamily: ComponentStyles.FONT_FAMILY.BOLD,
        color: ComponentStyles.COLORS.BLACK, fontSize: 22, height: 40
    },
    loadingContainer: {
        justifyContent: 'center', alignItems: 'center', flex: 5, margin: 20
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
        justifyContent: 'center',

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