import {StyleSheet} from "react-native";
import {Text, TouchableOpacity} from "react-native-web";
import React from "react";

const CustomButton = ({children, contained, buttonColor, onClick, height,disabled}) => {
    const style= styles({color: buttonColor, height});
    return (
        <TouchableOpacity onPress={onClick} style={contained ? style.button : {}} disabled={disabled}>
            {!!children && <Text style={style.buttonText}>{children}</Text>}
        </TouchableOpacity>
    );
}

const styles = ({color, height}) => StyleSheet.create({
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
        color: '#ede8e8',
        fontWeight: "500"
    }
});

export default CustomButton;