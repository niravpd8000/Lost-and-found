import React, {useState} from "react";
import {SafeAreaView, StyleSheet, ActivityIndicator, View} from "react-native";
import {Text, TouchableOpacity} from "react-native-web";
import TextField from "../components/TextField";
import CustomButton from "../components/CustomButton";


export default () => {
    const [state, setState] = useState({userName: "", password: ""});
    const inputList = [
        {name: "userName", placeholder: "Username", value: state.userName, type: "text"},
        {name: "password", placeholder: "Password", value: state.password, type: "password"},
    ]
    const handleChange = (e) => {
        console.log(e.target.name === "userName")
    }
    return (
        <SafeAreaView style={styles.container}>
            <ActivityIndicator size="large" color="#fb5b5a"/>
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
                <CustomButton contained>LOGIN</CustomButton>
                <CustomButton>Signup</CustomButton>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
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
