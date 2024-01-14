/**
 * @author Sangeeth Shehan
 */
import FlashMessage, { showMessage, hideMessage, color, } from "react-native-flash-message";

export default {

    messageName(message, description, type, icon,backgroundColor) {
        showMessage({
            message: message,
            description: description,
            type: type,
            icon: icon,
            color: color,
            backgroundColor: backgroundColor,
            style:{marginTop:40}
        });
    },

}
