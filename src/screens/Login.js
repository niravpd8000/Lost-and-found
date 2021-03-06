/**
 *  file: Login.js
 *  author: Nirav Pravinbhai Dhameliya <ndj585@uregina.ca>
 *  version: 0.1
 *  date-created: March-22-2022
 *  last-modified: April-08-2022
 */
import React, {useState} from "react";
import {SafeAreaView, StyleSheet, View, Text} from "react-native";
import TextField from "../components/TextField";
import CustomButton from "../components/CustomButton";
import ToastMessage from "../components/ToastMessage";
import {postRequest} from "../API/axios";
import {API} from "../API/apis";
import {AuthContext} from "../components/Context";

const Login = ({navigation, route}) => {
    /** initialising states and variables */
    const [state, setState] = useState({userName: "", password: ""});
    const inputList = [
        {name: "userName", placeholder: "Username", value: state.userName, type: "text"},
        {name: "password", placeholder: "Password", value: state.password, type: "password"},
    ]
    const [error, setError] = React.useState(false);
    const [errorApi, setErrorApi] = React.useState("");
    const [errorMsg, setErrorMsg] = React.useState("");

    /** fetching states from context*/
    const {login} = React.useContext(AuthContext);

    /**
     * handleChange
     * Purpose: This function used for handling login form
     * Parameter(s):
     * Object {name,value}: object with name and value
     * Precondition(s):
     * N/A
     *
     * Returns: N/A
     *
     * Side effect:
     * <1> This function will call when user fill username and password
     */
    const handleChange = (name, value) => {
        setState({...state, [name]: value})
    }

    /**
     * onClickLogin
     * Purpose: This function used for calling api(API.SIGN_IN) for verifying username and password
     * Parameter(s):
     * N/A
     * Precondition(s):
     * Username and password shouldn't be null
     *
     * Returns: N/A
     *
     * Side effect:
     * <1> This function will call when user clicks on login button
     */
    const onClickLogin = async () => {
        const {userName, password} = state;
        if (userName && password) {
            if (errorApi)
                setErrorApi("");
            const data = {username: userName, password};
            const getResponse = (response) => {
                const token = response?.data?.accessToken;
                response.data.accessToken = null;
                response.data.roles = null;
                login(response.data, token);
                navigation.navigate('MainStack', {successMessage: "Logged in successful!!!"})
            }
            const getErrorMessage = (error) => {
                setErrorApi(error)}
            await postRequest(API.SIGN_IN, data, getResponse, getErrorMessage)
        } else {
            setError(true);
            setErrorMsg("Please fill all details...");
        }
    }
    return (
        <SafeAreaView style={styles.container}>
            {error ? <ToastMessage type={'error'} message={errorMsg}/> : null}
            {errorApi ? <ToastMessage type={'error'} message={errorApi}/> : null}
            {route.params?.successMessage ?
                <ToastMessage type={'success'} message={route.params?.successMessage}/> : null}
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
                <CustomButton onClick={onClickLogin} contained>LOGIN</CustomButton>
                <CustomButton onClick={() =>
                    navigation.navigate('SignUp')
                }>Signup</CustomButton>
            </View>
        </SafeAreaView>
    );

};

/**
 * styles
 * @type {{
 * container: {backgroundColor: string, alignItems: string, flex: number, width: string, justifyContent: string},
 * inputContainer: {alignItems: string, width: string, justifyContent: string},
 * label: {color: string, marginBottom: number, fontSize: number, fontWeight: string}
 * }}
 */
const styles = StyleSheet.create({
    container: {
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

export default Login;