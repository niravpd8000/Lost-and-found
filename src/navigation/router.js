import React, {useEffect, useState} from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {AuthStack} from './Stacks';
import {colors} from '../constants/colors';
import MainStack from './MainStack';
import {AuthContext} from "../components/Context";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Main = () => {
    const [loading, setLoading] = useState(false);
    const Stack = createStackNavigator();


    const initialState = {
        accessToken: "",
        isLoading: false,
        username: ""
    }
    useEffect(() => {
        const setLocalStorage = async () => {
            try {
                const token = await AsyncStorage.getItem("accessToken");
                dispatch({type: "LOGIN", username: "Nirav", accessToken: token})
            } catch (e) {
                console.log(e)
            }
        }
        setLocalStorage();
    }, [])
    const loginReducer = (prevState, action) => {
        switch (action.type) {
            case 'LOGIN':
                return {...prevState, accessToken: action.accessToken, username: action.username};
            case 'LOGOUT':
                return {...prevState, accessToken: null, username: null};
            case 'PREV_STATE':
                return {...prevState, accessToken: action.accessToken, username: action.username};
        }
    }

    const [loginState, dispatch] = React.useReducer(loginReducer, initialState);
    const authContext = React.useMemo(() => ({
        login: async (username, accessToken) => {
            try {
                await AsyncStorage.setItem("accessToken", accessToken);
            } catch (e) {
                console.log(e)
            }
            dispatch({type: "LOGIN", username, accessToken})
        },
        loginState,
    }))
    console.log("loginState.accessToken", loginState.accessToken)
    return (
        <AuthContext.Provider value={authContext}>
            <NavigationContainer>
                <StatusBar
                    translucent
                    backgroundColor={colors.transperent}
                    barStyle={'dark-content'}
                />
                <Stack.Navigator initialRouteName={loginState.accessToken ? "MainStack" : "Auth"}
                                 screenOptions={{headerShown: false}}>
                    {loginState.accessToken ?
                        <Stack.Screen name="MainStack" component={MainStack}/>
                        :
                        <Stack.Screen name="Auth" component={AuthStack}/>
                    }
                </Stack.Navigator>
            </NavigationContainer>
        </AuthContext.Provider>
    );
};

export default Main;
