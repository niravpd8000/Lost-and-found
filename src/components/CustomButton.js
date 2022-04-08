import {StyleSheet} from "react-native";
import {Text, TouchableOpacity} from "react-native-web";
import React from "react";

const CustomButton = ({children, contained, fontColor, buttonColor, onClick, buttonStyle, height, disabled}) => {
    const style = styles({color: buttonColor, height, fontColor});
    return (
        <TouchableOpacity onPress={onClick} style={contained ? [style.button, buttonStyle || {}] : buttonStyle || {}}
                          disabled={disabled}>
            {!!children && <Text style={style.buttonText}>{children}</Text>}
        </TouchableOpacity>
    );
}

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