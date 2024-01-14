/**
 * @author Sangeeth Shehan
 */
import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
} from "react-native";
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import ComponentStyles from "../../constants/Component.styles";
import JSONData from "../../constants/JSONData";

const ItemList = (props) => {


    return (
        <TouchableOpacity
            activeOpacity={0.9}
            style={styles.container}
            onPress={() => { props.onPress() }}
        >
            <View style={{ justifyContent: 'center',margin:15 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Image borderRadius={30} source={JSONData.organizers[0].image} style={{ width: 50, height: 50,left:-10 }}></Image>
                    <View style={{ flex: 1, left: 10 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View>
                                <Text style={styles.nameText}>{props.data.name}</Text>
                                <Text style={styles.emailText}>{props.data.email}</Text>
                            </View>
                            <View style={{ justifyContent: 'center' }}>
                                <MIcon name='message-minus-outline' size={20} color={ComponentStyles.COLORS.BLACK} />
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    nameText: {
        fontFamily: ComponentStyles.FONT_FAMILY.REGULAR,
        color: ComponentStyles.COLORS.BLACK, fontSize: 16,
    },
    emailText: {
        fontFamily: ComponentStyles.FONT_FAMILY.REGULAR,
        color: ComponentStyles.COLORS.BLACK, fontSize: 14,
    },
    container:{
        borderBottomWidth: 1,
        borderBottomColor: ComponentStyles.COLORS.LIGHT
    }
});

export default ItemList;
