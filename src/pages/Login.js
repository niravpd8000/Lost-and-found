import React, {useState} from "react";
import {SafeAreaView, StyleSheet, TextInput} from "react-native";
import {Text, TouchableOpacity} from "react-native-web";


export default () => {
    const [state, setState] = useState({userName: "", password: ""});
    const inputList = [
        {name: "userName", placeholder: "Username", value: state.userName, type: "text"},
        {name: "password", placeholder: "Password", value: state.password, type: "password"},
    ]
    const handleChange = (e) => {
        console.log(e.target.name==="userName")
    }
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.label}>Lost & Found</Text>
            {inputList.map((item, key) =>
                <TextInput
                    key={key}
                    style={styles.input}
                    name={item.name}
                    secureTextEntry={item.type === "password"}
                    placeholderTextColor="#013249"
                    onChange={handleChange}
                    // value={item.value}
                    placeholder={item.placeholder}
                />
            )}
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>LOGIN</Text>
            </TouchableOpacity>
            <TouchableOpacity>
                <Text style={styles.buttonText}>Signup</Text>
            </TouchableOpacity>
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
    input: {
        width: "80%",
        backgroundColor: "#465881",
        color: 'white',
        fontWeight: 'bold',
        borderRadius: 25,
        height: 50,
        marginBottom: 20,
        justifyContent: "center",
        padding: 20
    },
    label: {
        color: "#fb5b5a",
        marginBottom: 40,
        fontSize: 50,
        fontWeight: "bold"
    },
    button: {
        width: "80%",
        backgroundColor: "#fb5b5a",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        marginBottom: 10
    },
    buttonText: {
        color: '#ede8e8',
        fontWeight: "500"
    }
});
