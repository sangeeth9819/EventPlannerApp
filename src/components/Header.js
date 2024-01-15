import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import ComponentStyles from "../../constants/Component.styles";
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { ProgressBar } from "react-native-paper";

const Header = (props) => {
    const navigation = useNavigation();

    const back = () => {
        navigation.goBack();
    };

    return (
        <View style={styles.btn}>
            <View style={{ margin: 15 }}>
                <View style={styles.container}>
                    {props.back &&
                        <TouchableOpacity onPress={() => props.status === "In progress" ? props.onPress() : back()}>
                            <Icon name='chevron-back' size={30} color={ComponentStyles.COLORS.LIGHT_GRAY} />
                        </TouchableOpacity>
                    }
                    {props.profile &&
                        <TouchableOpacity onPress={() => navigation.openDrawer()}>
                            <View style={{ justifyContent: 'center' }}>
                                <Image source={{ uri: props.image }} style={styles.image}></Image>
                            </View>
                        </TouchableOpacity>
                    }
                    <View style={{ width: props.profile ? '80%' : '90%', justifyContent: 'center' }}>
                        <View style={{ alignItems: 'center' }}>
                            <Text style={styles.headerText}>{props.title}</Text>
                        </View>
                    </View>
                </View>
                <ProgressBar indeterminate={true} style={{ height: 2, top: 10 }} visible={props.loading} color={ComponentStyles.COLORS.MORE_DARK_BL} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    btn: {
        width: '100%', height: 60,
        backgroundColor: ComponentStyles.COLORS.WHITE,
        elevation: 2, shadowOffset: { width: 5, height: 5 },
        shadowColor: 'black',
        shadowOpacity: 0.1,
        marginTop: 30
    },
    headerText: {
        fontFamily: ComponentStyles.FONT_FAMILY.BOLD,
        color: ComponentStyles.COLORS.BLACK, fontSize: 17,
    },
    container: {
        flexDirection: 'row'
    },
    image: {
        width: 44, height: 44, borderRadius: 100,
    },

});

export default Header;
