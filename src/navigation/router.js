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
    const Stack = createStackNavigator();


    const initialState = {
        accessToken: "",
        isLoading: false,
        userDetails: {}
    }
    useEffect(() => {
        const setLocalStorage = async () => {
            try {
                const accessToken = await AsyncStorage.getItem("accessToken");
                let userDetails = await AsyncStorage.getItem("userDetails");
                userDetails = JSON.parse(userDetails);
                dispatch({type: "LOGIN", userDetails, accessToken})
            } catch (e) {
                console.log(e)
            }
        }
        setLocalStorage();
    }, [])
    const loginReducer = (prevState, action) => {
        switch (action.type) {
            case 'LOGIN':
                return {...prevState, accessToken: action.accessToken, userDetails: action.userDetails};
            case 'LOGOUT':
                return {...prevState, accessToken: null, userDetails: null};
            case 'PREV_STATE':
                return {...prevState, accessToken: action.accessToken, userDetails: action.userDetails};
        }
    }

    const [loginState, dispatch] = React.useReducer(loginReducer, initialState);
    const authContext = React.useMemo(() => ({
        login: async (userDetails, accessToken) => {
            try {
                await AsyncStorage.setItem("accessToken", accessToken);
                await AsyncStorage.setItem("userDetails", JSON.stringify(userDetails));
            } catch (e) {
                console.log(e)
            }
            dispatch({type: "LOGIN", userDetails: userDetails, accessToken})
        },
        loginState,
        logout: async () => {
            try {
                await AsyncStorage.clear();
            } catch (e) {
                console.log(e)
            }
            dispatch({type: "LOGOUT"})
        },
    }))

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
