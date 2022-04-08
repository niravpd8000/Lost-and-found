/**
 *  file: SignUp.js
 *  author: Nirav Pravinbhai Dhameliya <ndj585@uregina.ca>
 *  version: 0.1
 *  date-created: March-17-2022
 *  last-modified: April-08-2022
 */
import React from "react";
import {SafeAreaView, StyleSheet, View} from "react-native";
import {Text} from "react-native-web";
import TextField from "../components/TextField";
import CustomButton from "../components/CustomButton";
import {postRequest} from "../API/axios";
import {API} from "../API/apis";
import ToastMessage from "../components/ToastMessage";


export default ({navigation}) => {
    const [state, setState] = React.useState({
        fullName: "",
        userName: "",
        email: "",
        role: "user",
        password: "",
        confirmPassword: ""
    });
    const [error, setError] = React.useState(false);
    const [errorApi, setErrorApi] = React.useState("");
    const [errorMsg, setErrorMsg] = React.useState("");
    const validateEmail = (email) => {
        return email.toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    }
    const inputList = [
        {name: "fullName", placeholder: "Full Name", value: state.fullName, type: "text"},
        {name: "userName", placeholder: "Username", value: state.userName, type: "text"},
        {
            name: "email",
            placeholder: "Email",
            value: state.email,
            type: "email",
            error: (email) => validateEmail(email)
        },
        {name: "password", placeholder: "Password", value: state.password, type: "password"},
        {name: "confirmPassword", placeholder: "Confirm Password", value: state.confirmPassword, type: "password"},
    ]
    const handleChange = (name, value) => {
        setState({...state, [name]: value})
        if (errorMsg)
            setErrorMsg("");
        if (error)
            setError(false)
    }
    const onCreateAccount = async () => {
        const {fullName, userName, email, role, password, confirmPassword} = state;
        if (fullName && userName && validateEmail(email) && password && (password === confirmPassword)) {
            if (errorApi)
                setErrorApi("");
            const data = {fullName, username: userName, email, role, password};
            const getResponse = () => {
                navigation.navigate('Login', {successMessage: "Sign Up successful!!!"})
            }
            const getErrorMessage = (error) => {
                setErrorApi(error)

            }
            await postRequest(API.SIGN_UP, data, getResponse, getErrorMessage)
        } else {
            setError(true);
            let message = password !== confirmPassword ? "Passwords dont matches" : !validateEmail(email) ? "Please enter valid email" : "Please fill all details...";
            setErrorMsg(message);
        }
    }
    return (
        <SafeAreaView style={styles.container}>
            {error ? <ToastMessage type={'error'} message={errorMsg}/> : null}
            {errorApi ? <ToastMessage type={'error'} message={errorApi}/> : null}
            <Text style={styles.label}>Lost & Found</Text>
            <View style={styles.inputContainer}>
                {inputList.map((item, key) =>
                    <TextField
                        error={item?.error ? error && !item?.error(item.value) : error && !item.value}
                        key={key}
                        name={item.name}
                        secureTextEntry={item.type === "password"}
                        onChangeText={(value) => handleChange(item.name, value)}
                        value={item.value}
                        placeholder={item.placeholder}
                    />
                )}
                <CustomButton onClick={onCreateAccount} contained>SIGNUP</CustomButton>
                <CustomButton onClick={() =>
                    navigation.navigate('Login')
                }>Login</CustomButton>
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
        backgroundColor: '#013249'
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
