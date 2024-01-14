/**
 * @author Sangeeth Shehan
 */
import React, { Component } from "react";
import {
    View,
    TouchableOpacity,
} from "react-native";
import ComponentStyles from "../../constants/Component.styles";
import { CommonActions } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

class SubHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    back() {
        this.props.navigation.goBack()
    }

    naviateToHome() {
        this.props.navigation.dispatch(
            CommonActions.reset({
                index: 1,
                routes: [
                    { name: 'Home' },
                ],
            })
        );
    }

    render() {
        return (
            <View style={{ width: '100%', height: 60,backgroundColor:'blue' }}>
                
            </View>
        );
    }
}


// Wrap and export
export default function (props) {
    const navigation = useNavigation();
    return <SubHeader {...props} navigation={navigation} />;
}