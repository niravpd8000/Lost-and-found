/**
 *  file: CustomButton.js
 *  author: Nirav Pravinbhai Dhameliya <ndj585@uregina.ca>
 *  version: 0.1
 *  date-created: March-18-2022
 *  last-modified: April-08-2022
 */
import {StyleSheet} from "react-native";
import {Text, TouchableOpacity} from "react-native-web";
import React from "react";

/**
 * CustomButton component
 * @param children
 * @param contained
 * @param fontColor
 * @param buttonColor
 * @param onClick
 * @param buttonStyle
 * @param height
 * @param disabled
 * @returns {JSX.Element}
 * @constructor
 */
const CustomButton = ({children, contained, fontColor, buttonColor, onClick, buttonStyle, height, disabled}) => {
    const style = styles({color: buttonColor, height, fontColor});
    /**
     * Reusable CustomButton Component with custom style
     */
    return (
        <TouchableOpacity onPress={onClick} style={contained ? [style.button, buttonStyle || {}] : buttonStyle || {}}
                          disabled={disabled}>
            {!!children && <Text style={style.buttonText}>{children}</Text>}
        </TouchableOpacity>
    );
}


/**
 *
 * @param color
 * @param height
 * @param fontColor
 * @returns {{button: {backgroundColor: string, borderRadius: number, alignItems: string, width: string, marginBottom: number, justifyContent: string, marginTop: number, height: number}, buttonText: {color: string, fontWeight: string}}}
 */
const styles = ({color, height, fontColor}) => StyleSheet.create({
    button: {
        width: "100%",
        backgroundColor: color || "#fb5b5a",
        borderRadius: 25,
        height: height || 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 10,
        marginBottom: 10
    },
    buttonText: {
        color: fontColor || '#ede8e8',
        fontWeight: "500"
    }
});

export default CustomButton;