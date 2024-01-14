/**
 * @author Sangeeth Shehan
 */
import { Dimensions } from "react-native";
const { width, height } = Dimensions.get('window');
import { getStatusBarHeight } from 'react-native-status-bar-height';

export default ({
    WIDTH: width,
    HEIGHT: height,
    COLORS: {
        PRIMARY_COLOR:'#DA5E42',
        LIGHT_BLUE: '#5F6AF8',
        DARK_BLUE: '#214B6C',
        MIDDLE_BL: '#12478F',
        LIGHT: "#F1E6E3",
        MORE_LIGHT_GARAY_C: '#C4D3E7',
        YELLOW: "#F8D483",
        LIGHT_YELLOW: '#FCC74F',
        MORE_LIGHT: '#ffe6b3',
        THEME_BROWN: '#2D1700',
        WHITE: '#FFFFFF',
        RGBA_WHITE: "rgba(255, 255, 255,0.1)",
        RGBA_BLACK: "rgba(0, 0, 0,0.1)",
        SHADE_WHITE: '#F2F2F2',
        BLACK: '#000000',
        GREEN: '#35C758',
        LOW_GREEN: "#AEDD94",
        LIGHT_GREEN: '#E9F8D6',
        RED: '#F85F6A',
        GRAY: '#757779',
        LIGHT_GRAY: 'gray',
        DARKER_GRAY: '#272e38',
        ORANGE: '#DA5E4214'
    },
    FONT_FAMILY: {
        BOLD: 'Inter-Bold',
        SEMI_BOLD: 'Inter-SemiBold',
        REGULAR: 'NotoSans-Regular',
    },

    CONTAINER: {
        flex: 1,
        backgroundColor: 'white',
    },

    IMAGE_CONTAINER: {
        flex: 1,
        resizeMode: 'stretch',
        paddingTop: getStatusBarHeight(true),
    },

    MAIN_CONTAINER: {
        flex: 1,
        paddingTop: getStatusBarHeight(true),
        backgroundColor: '#E9F8D6',
    },
    CONTENT: {
        margin: 25,
        marginTop: 0,
        marginBottom: 0,
        paddingTop: 13,
        flex: 1,
    },
    SEPARATE_LINE: {
        backgroundColor: '#D0CFCF',
        width: '100%',
        height: 0.9,
        marginTop: 15,
        marginBottom: 15,
    },
    TOP_RIGHT_MENU: {
        position: 'absolute',
        right: 5,
        top: 5
    }
})