/**
 * @author Sangeeth Shehan
 */
import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
} from "react-native";
import ComponentStyles from "../../constants/Component.styles";
import JSONData from "../../constants/JSONData";

const CardList = (props) => {


    return (
        <View style={[styles.container, { width: props.horizontal ? 250 : "" }]}>
            <Image
                style={styles.image}
                source={{ uri: props.item.url }}
            />
            <View style={{ margin: 10 }}>
                <Text style={styles.cardTitleText}>{props.item.title}</Text>
                <Text style={styles.cardSubTitleText}>{JSONData.photoDetails[0].data}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    cardTitleText: {
        fontFamily: ComponentStyles.FONT_FAMILY.BOLD,
        color: ComponentStyles.COLORS.BLACK, fontSize: 16
    },
    cardSubTitleText: {
        fontFamily: ComponentStyles.FONT_FAMILY.REGULAR,
        color: ComponentStyles.COLORS.GRAY, fontSize: 14, marginTop: 10
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
    image: {
        width: '100%', height: 120
    }
});

export default CardList;
