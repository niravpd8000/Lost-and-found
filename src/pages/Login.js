import React, {useState} from "react";
import {SafeAreaView, StyleSheet, View} from "react-native";
import {Text} from "react-native-web";
import TextField from "../components/TextField";
import CustomButton from "../components/CustomButton";
import ToastMessage from "../components/ToastMessage";
import {postRequest} from "../API/axios";
import {API} from "../API/apis";
import {AuthContext} from "../components/Context";

export default ({navigation}) => {
    const [state, setState] = useState({userName: "", password: ""});
    const inputList = [
        {name: "userName", placeholder: "Username", value: state.userName, type: "text"},
        {name: "password", placeholder: "Password", value: state.password, type: "password"},
    ]
    const {login} = React.useContext(AuthContext);
    const [error, setError] = React.useState(false);
    const [errorApi, setErrorApi] = React.useState("");
    const [errorMsg, setErrorMsg] = React.useState("");
    const handleChange = (name, value) => {
        setState({...state, [name]: value})
    }

    const onClickLogin = async () => {
        const {userName, password} = state;
        if (userName && password) {
            if (errorApi)
                setErrorApi("");
            const data = {username: userName, password};
            const getResponse = (response) => {
                const token=response?.data?.accessToken;
                response.data.accessToken=null;
                response.data.roles=null;
                login(response.data, token);
                navigation.navigate('MainStack')
            }
            const getErrorMessage = (error) => {
                setErrorApi(error)

            }
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
