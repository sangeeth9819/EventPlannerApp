/**
 * @author Sangeeth Shehan
 */
import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
} from "react-native";
import ComponentStyles from "../../constants/Component.styles";
import Moment from 'moment';
import JSONData from "../../constants/JSONData";

const Comment = (props) => {


    return (
        <View style={[styles.container, { width: props.horizontal ? 250 : "" }]}>
            <View style={{ flexDirection: 'row', margin: 10 }}>
                <View style={{ justifyContent: 'center' }}>
                    <Image borderRadius={30} source={JSONData.organizers[0].image} style={{ width: 35, height: 35 }}></Image>
                </View>
                <View style={{ justifyContent: 'center' }}>
                    <Text style={styles.nameUserText}>{props.item.email}</Text>
                    <Text style={styles.dateText}>{Moment(new Date()).format('hh:mm a')}</Text>
                </View>
            </View>

            <View style={{}}>
                <View style={{ flexDirection: 'row', }}>
                    <View style={{ width: 55 }} />
                    <Text style={styles.commentText}>{props.item.body}</Text>
                </View>
            </View>

            <View style={{ flexDirection: 'row', }}>
                <View style={{ width: 55 }} />
                <Text style={styles.liketText}>Like</Text>
                <TouchableOpacity onPress={() => { }}>
                    <Text style={styles.commentListText}>Reply</Text>
                </TouchableOpacity>
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    cardTitleText: {
        fontFamily: ComponentStyles.FONT_FAMILY.REGULAR,
        color: ComponentStyles.COLORS.BLACK, fontSize: 14
    },
    cardSubTitleText: {
        fontFamily: ComponentStyles.FONT_FAMILY.REGULAR,
        color: ComponentStyles.COLORS.GRAY, fontSize: 14, marginTop: 10
    },
    commentText: {
        fontFamily: ComponentStyles.FONT_FAMILY.REGULAR,
        color: ComponentStyles.COLORS.BLACK, fontSize: 14,
        width: '75%'
    },
    commentListText: {
        fontFamily: ComponentStyles.FONT_FAMILY.REGULAR,
        color: ComponentStyles.COLORS.DARK_BLUE, fontSize: 14, marginTop: 10, marginLeft: 10
    },
    liketText: {
        fontFamily: ComponentStyles.FONT_FAMILY.REGULAR,
        color: ComponentStyles.COLORS.DARK_BLUE, fontSize: 14, marginTop: 10
    },
    nameUserText: {
        fontFamily: ComponentStyles.FONT_FAMILY.REGULAR,
        color: ComponentStyles.COLORS.BLACK, fontSize: 14, left: 10
    },
    valueText: {
        fontFamily: ComponentStyles.FONT_FAMILY.REGULAR,
        color: ComponentStyles.COLORS.BLACK, fontSize: 14, marginTop: 10, marginLeft: 5
    },
    dateText: {
        fontFamily: ComponentStyles.FONT_FAMILY.REGULAR,
        color: ComponentStyles.COLORS.LIGHT_GRAY, fontSize: 14, left: 10
    },
    container: {
        margin: 10,
        backgroundColor: 'white',
        shadowOffset: { width: 5, height: 5 },
        shadowColor: 'black',
        width: 250,
        shadowOpacity: 0.1,
    },
    image: {
        width: '100%', height: 120
    }
});

export default Comment;
