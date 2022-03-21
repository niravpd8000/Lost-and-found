import {StyleSheet} from "react-native";
import {Text, TouchableOpacity} from "react-native-web";
import React from "react";

const CustomButton = ({children, contained,onClick}) => {
    return (
        <TouchableOpacity onPress={onClick} style={contained && styles.button}>
            <Text style={styles.buttonText}>{children}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        width: "100%",
        backgroundColor: "#fb5b5a",
        borderRadius: 25,
        height: 50,
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