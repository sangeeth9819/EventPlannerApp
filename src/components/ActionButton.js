/**
 * @author Sangeeth Sehan
 */
import React from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator
} from "react-native";
import ComponentStyles from "../../constants/Component.styles";
import Icon from 'react-native-vector-icons/Feather';

const ActionButton = (props) => {
    return (
        <View>
            <TouchableOpacity
                disabled={props.disabled}
                style={[styles.container, { backgroundColor: props.back ? ComponentStyles.COLORS.LIGHT : ComponentStyles.COLORS.PRIMARY_COLOR }]} onPress={() => props.onPress()}>
                <View style={styles.horizontal}>
                    {(props.disabled == false && props.showIcon && props.back) &&
                        <Icon name={"arrow-left"} size={22} color={ComponentStyles.COLORS.BLACK} style={{ right: 10 }} />
                    }
                    <Text style={[styles.text, props.customTextStyle, { color: props.back ? ComponentStyles.COLORS.BLACK : ComponentStyles.COLORS.WHITE }]}>{props.title}</Text>
                    {(props.disabled == false && props.showIcon && !props.back) &&
                        <Icon name={"arrow-right"} size={22} color={ComponentStyles.COLORS.WHITE} style={{ left: 10 }} />
                    }
                    {props.disabled &&
                        <ActivityIndicator size="small" color={ComponentStyles.COLORS.WHITE} style={{ left: 10 }} />
                    }
                </View>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
        backgroundColor: ComponentStyles.COLORS.RED,
        elevation: 6,
        height: 44,
        borderRadius: 2,
        alignItems: 'center',
        justifyContent: 'center',
        shadowOffset: { width: 5, height: 5 },
        shadowColor: 'black',
        shadowOpacity: 0.1,
    },
    horizontal: {
        flexDirection: "row",
        justifyContent: "space-around",
    },
    text: {
        fontSize: 18,
        color: ComponentStyles.COLORS.WHITE,
        fontFamily: ComponentStyles.FONT_FAMILY.REGULAR
    }
});

export default ActionButton;
