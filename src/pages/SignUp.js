import React, {useState} from "react";
import {SafeAreaView, StyleSheet, View} from "react-native";
import {Text} from "react-native-web";
import TextField from "../components/TextField";
import CustomButton from "../components/CustomButton";


export default () => {
    const [state, setState] = useState({fullName: "", userName: "", password: "", confirmPassword: ""});
    const inputList = [
        {name: "fullName", placeholder: "Full Name", value: state.fullName, type: "text"},
        {name: "userName", placeholder: "Username", value: state.userName, type: "text"},
        {name: "password", placeholder: "Password", value: state.password, type: "password"},
        {name: "confirmPassword", placeholder: "Confirm Password", value: state.password, type: "password"},
    ]
    const handleChange = (e) => {
        console.log(e)
    }
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.label}>Lost & Found</Text>
            <View style={styles.inputContainer}>
                {inputList.map((item, key) =>
                    <TextField
                        key={key}
                        name={item.name}
                        secureTextEntry={item.type === "password"}
                        onChange={handleChange}
                        // value={item.value}
                        placeholder={item.placeholder}
                    />
                )}
                <CustomButton contained>SIGNUP</CustomButton>
                <CustomButton>Login</CustomButton>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        maxWidth: 375,
        width: "100%",
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputContainer: {
        width: "80%",
        alignItems: 'center',
        justifyContent: 'center',
    },
    label: {
        color: "#fb5b5a",
        marginBottom: 40,
        fontSize: 50,
        fontWeight: "bold"
    },
});
