import React from "react";
import {SafeAreaView, StyleSheet, View} from "react-native";
import {Text} from "react-native-web";
import TextField from "../components/TextField";
import CustomButton from "../components/CustomButton";
import {postRequest} from "../API/axios";
import {API} from "../API/apis";
import ToastMessage from "../components/ToastMessage";


export default () => {
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
    const inputList = [
        {name: "fullName", placeholder: "Full Name", value: state.fullName, type: "text"},
        {name: "userName", placeholder: "Username", value: state.userName, type: "text"},
        {name: "email", placeholder: "Email", value: state.email, type: "email"},
        {name: "password", placeholder: "Password", value: state.password, type: "password"},
        {name: "confirmPassword", placeholder: "Confirm Password", value: state.confirmPassword, type: "password"},
    ]
    const handleChange = (name, value) => {
        setState({...state, [name]: value})

    }
    const onCreateAccount = async () => {
        const {fullName, userName, email, role, password, confirmPassword} = state;
        if (fullName && userName && email && password && (password === confirmPassword)) {
            if (errorApi)
                setErrorApi("");
            const data = {fullName, username: userName, email, role, password};
            const getResponse = (response) => {
                console.log(response)
            }
            const getErrorMessage = (error) => {
                setErrorApi(error)

            }
            await postRequest(API.SIGN_UP, data, getResponse, getErrorMessage)
        } else {
            setError(true);
            setErrorMsg("Please fill all details...");
        }
    }
    console.log(errorMsg, error)
    return (
        <SafeAreaView style={styles.container}>
            {error && <ToastMessage type={'error'} message={errorMsg}/>}
            {errorApi && <ToastMessage type={'error'} message={errorApi}/>}
            <Text style={styles.label}>Lost & Found</Text>
            <View style={styles.inputContainer}>
                {inputList.map((item, key) =>
                    <TextField
                        error={error && !item.value}
                        key={key}
                        name={item.name}
                        secureTextEntry={item.type === "password"}
                        onChangeText={(value) => handleChange(item.name, value)}
                        value={item.value}
                        placeholder={item.placeholder}
                    />
                )}
                <CustomButton onClick={onCreateAccount} contained>SIGNUP</CustomButton>
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
