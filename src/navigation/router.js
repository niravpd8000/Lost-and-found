import React, {useEffect, useState} from 'react';
import {ActivityIndicator, StatusBar, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {AuthStack, HomeStack} from './Stacks';
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
    // if (loading)
    //     return (
    //         <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
    //             <ActivityIndicator size="large" color="#fb5b5a"/>
    //         </View>
    //     )
    return (
        <AuthContext.Provider value={authContext}>
            <NavigationContainer>
                <StatusBar
                    translucent
                    backgroundColor={colors.transperent}
                    barStyle={'dark-content'}
                />
                <Stack.Navigator initialRouteName={"MainStack"} screenOptions={{headerShown: false}}>
                    {loginState.accessToken ?
                        <Stack.Screen name="Auth" component={HomeStack}/>
                        :
                        <Stack.Screen name="Auth" component={AuthStack}/>
                    }
                </Stack.Navigator>
            </NavigationContainer>
        </AuthContext.Provider>
    );
};

export default Main;
