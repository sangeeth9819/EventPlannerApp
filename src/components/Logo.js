/**
 * @author Sangeeth Shehan
 */
import React, { Component } from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import ComponentStyles from '../../constants/Component.styles';

class Logo extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <View style={{ alignContent: 'center', alignItems: 'flex-start' }}>
                <Text style={styles.text}>The </Text>
                <Text style={styles.text}>Smile</Text>
                <Text style={styles.text}>Game</Text>
            </View>

        );
    }
}

const styles = StyleSheet.create({

    text: {
        fontFamily: ComponentStyles.FONT_FAMILY.REGULAR,
        color: ComponentStyles.COLORS.WHITE, fontSize: 40, textAlign: 'left'
    },

});

export default Logo;
