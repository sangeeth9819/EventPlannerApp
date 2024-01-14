/**
 * @author Sangeeth Shehan
 */
import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet, TouchableOpacity, Image
} from "react-native";
import ComponentStyles from "../../constants/Component.styles";
import Icon from 'react-native-vector-icons/FontAwesome5';
import storage from '@react-native-firebase/storage';

class HomeGrid extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imageUrl: ""
        };
    }

    /**
     * This is to call related metod after the component is rendered.
     */
    componentDidMount() {
        this.getImage()
    }

    /**
    * This is to get user image from firebase storaeg
    * related to the user Id
    */
    getImage = () => {
        const image = this.props.image
        if (image.substring(0, 8) == 'https://') {
            this.setState({ imageUrl: image })
        } else {
            storage()
                .ref(image)
                .getDownloadURL()
                .then((url) => {
                    this.setState({ imageUrl: url })
                    console.log(url)

                })
                .catch((e) => console.log('Errors while downloading => ', e));
        }
    }

    render() {
        return (
            <TouchableOpacity>
                <View style={[styles.container, { backgroundColor: this.props.index % 2 == 0 ? "#f2f2f2" : "#FFFFFF" }]}>
                    <View style={{ flexDirection: 'row', padding: 10, justifyContent: 'space-between' }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: 100 }}>
                            <View style={{ width: 50, height: 50, backgroundColor: ComponentStyles.COLORS.YELLOW, borderRadius: 20 }}>
                                <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                                    {this.props.index + 1 == 1 ?
                                        <Icon name='crown' size={20} color={ComponentStyles.COLORS.DARK_BLUE} style={{}} /> :
                                        <Text style={styles.position}>{this.props.index + 1}</Text>}
                                </View>
                            </View>
                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <Image source={{ uri: this.state.imageUrl }} style={{ width: 40, height: 40, borderRadius: 100 }}></Image>
                            </View>
                        </View>
                        <View style={{ top: 5, width: 200, left: -5 }}>
                            <Text style={styles.name}>{this.props.displayName}</Text>
                            <Text style={styles.points}>{this.props.points + " Points"}</Text>
                        </View>
                        <View style={{ justifyContent: 'flex-end' }}>
                            <Text style={styles.level}>{"Level " + this.props.level}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}


const styles = StyleSheet.create({

    container: {
        backgroundColor: ComponentStyles.COLORS.LIGHT_GRAY,
        height: 70,
        justifyContent: 'center'
    },
    position: { fontFamily: ComponentStyles.FONT_FAMILY.BOLD, fontSize: 18, color: ComponentStyles.COLORS.DARK_BLUE },
    name: { fontFamily: ComponentStyles.FONT_FAMILY.BOLD, fontSize: 15, color: ComponentStyles.COLORS.DARK_BLUE },
    points: { fontFamily: ComponentStyles.FONT_FAMILY.REGULAR, fontSize: 15, color: ComponentStyles.COLORS.DARK_BLUE },
    level: { fontFamily: ComponentStyles.FONT_FAMILY.REGULAR, fontSize: 15, color: ComponentStyles.COLORS.LIGHT_GRAY },

});

export default HomeGrid;
