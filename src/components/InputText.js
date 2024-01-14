/**
 * @author Sangeeth Shehan
 */
import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    PixelRatio
} from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { TextInput } from "react-native-paper";
import ComponentStyles from "../../constants/Component.styles";
import { useFocusEffect } from '@react-navigation/native'; // This line will not be used in the class component


export default class InputText extends Component {
    constructor(props) {
        super(props);
        this.state = {
            textsecre: this.props.secureTextEntry,
            isActive: false
        };
    }



    render() {
        return (

            <TextInput
                style={[{
                    marginVertical: PixelRatio.getPixelSizeForLayoutSize(3), textAlign: this.props.textAlign == "center" ? 'center' : '',
                    backgroundColor: this.props.backgroundColor ? this.props.backgroundColor : ComponentStyles.COLORS.ORANGE,
                    width: this.props.width ? this.props.width : '100%', height: this.props.height
                }, this.props.borderStyle]}
                label={this.props.placeholder}
                secureTextEntry={this.state.textsecre}
                activeUnderlineColor={ComponentStyles.COLORS.GRAY}
                editable={this.props.editable}
                disabled={this.props.disabled}
                activeOutlineColor={ComponentStyles.COLORS.GRAY}
                keyboardType={this.props.keyType}
                mode="flat"
                ref={this.props.refInner}
                value={this.props.stateValue}
                placeholderTextColor={ComponentStyles.COLORS.RED}
                returnKeyType={this.props.returnKeyType}
                textAlign={'center'}
                autoFocus={this.props.onFocus}
                textColor={ComponentStyles.COLORS.BLACK}
                maxLength={this.props.maxLength}
                underlineColor={ComponentStyles.COLORS.LIGHT_GRAY}
                showSoftInputOnFocus={this.props.keydisable}
                multiline={this.props.multiline}
                onFocus={() => this.setState({ isActive: true, })}
                onBlur={() => this.setState({ isActive: false, })}
                numberOfLines={this.props.numberOfLines}
                onChangeText={this.props.setState}
                onSubmitEditing={this.props.onSubmitEditing}
                left={this.props.inputIcon ? <TextInput.Icon icon={this.props.inputIconName} iconColor={this.state.isActive ? ComponentStyles.COLORS.DARK_BLUE : ComponentStyles.COLORS.LIGHT_GRAY} /> : ""}
                right={this.props.secureTextEntry ? <TextInput.Icon icon={this.state.textsecre ? "eye-off-outline" : "eye-outline"} onPress={() => this.setState({ textsecre: !this.state.textsecre })} iconColor={ComponentStyles.COLORS.LIGHT_GRAY} /> : ""}
                defaultValue={this.props.defaultValue}
            />
        );
    }
}


const styles = StyleSheet.create({
    item: {
        marginVertical: PixelRatio.getPixelSizeForLayoutSize(2),
        backgroundColor: ComponentStyles.COLORS.WHITE,
        borderColor: ComponentStyles.COLORS.WHITE,
        elevation: 5
    },
    SectionStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: .5,
        borderColor: ComponentStyles.COLORS.PRIMARY_COLOR,
        // height: 100,
        marginVertical: PixelRatio.getPixelSizeForLayoutSize(2),
    },
    SearchSectionStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: ComponentStyles.COLORS.LIGHT_GRAY,
        height: 50,
        marginVertical: PixelRatio.getPixelSizeForLayoutSize(2),
    },

});