/**
 * @author Sangeeth Shehan
 */
import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
} from "react-native";
import ComponentStyles from "../../constants/Component.styles";
import { ActivityIndicator } from "react-native-paper";

const Spinner = (props) => {


    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row' }}>
                <Text style={styles.loadingText}>{props.message}</Text>
                <View style={{ justifyContent: 'center' }}>
                    <ActivityIndicator size="small" color={ComponentStyles.COLORS.PRIMARY_COLOR} style={{ left: 10 }} />
                </View>
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    loadingText: {
        fontFamily: ComponentStyles.FONT_FAMILY.BOLD,
        color: ComponentStyles.COLORS.PRIMARY_COLOR, fontSize: 15
    },
    container: {
        flex: 1,
        alignItems:'center',
        justifyContent:'center'
    },
});

export default Spinner;
