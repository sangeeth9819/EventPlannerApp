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

const Post = (props) => {


    return (
        <View style={[styles.container, { width: props.horizontal ? 250 : "" }]}>
            {props.post &&
                <View style={styles.subContainer}>
                    <View style={{ flexDirection: 'row', }}>
                        <View style={{ justifyContent: 'center' }}>
                            <Image borderRadius={30} source={JSONData.organizers[0].image} style={{ width: 35, height: 35 }}></Image>
                        </View>
                        <View style={{ justifyContent: 'center' }}>
                            <Text style={styles.nameUserText}>{JSONData.organizers[0].name}</Text>
                            <Text style={styles.dateText}>{Moment(new Date()).format('hh:mm a')}</Text>
                        </View>
                    </View>
                    <View style={{ justifyContent: 'center' }}>

                    </View>
                </View>
            }
            <View style={{ margin: 10 }}>
                <Text style={styles.cardTitleText}>{props.item.title}</Text>
            </View>
            <Image
                style={styles.image}
                source={{ uri: props.item.url }}
            />
            <View style={{ flexDirection: 'row', margin: 10 }}>
                <Text style={styles.cardSubTitleText}>Like</Text>
                <TouchableOpacity onPress={() => { props.onPressComment() }}>
                    <Text style={styles.commentText}>Comment</Text>
                </TouchableOpacity>
                <View style={{ alignItems: 'flex-end', flex: 1 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.cardSubTitleText}>Share</Text>
                        <Text style={styles.valueText}>12</Text>
                    </View>
                </View>
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
        color: ComponentStyles.COLORS.GRAY, fontSize: 14, marginTop: 10, marginLeft: 10
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
        margin: 5,
        backgroundColor: 'white',
        elevation: 5,
        shadowOffset: { width: 5, height: 5 },
        shadowColor: 'black',
        width: 250,
        shadowOpacity: 0.1,
    },
    subContainer: {
        flexDirection: 'row', justifyContent: 'space-between', margin: 10,
    },
    image: {
        width: '100%', height: 120
    }
});

export default Post;
