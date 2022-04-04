import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SignUp from '../pages/SignUp';
import Login from '../pages/Login';
import Home from '../pages/Home';
import Profile from "../pages/Profile";
import ItemFullView from "../pages/ItemFullView";
import {Button} from "react-native";
import ListItemFrom from "../pages/ListItemFrom";
import Ionicons from "react-native-vector-icons/Ionicons";

const Stack = createStackNavigator();

export const AuthStack = () => {
    return (
        <Stack.Navigator
            initialRouteName="Login"
            screenOptions={{headerShown: false}}>
            <Stack.Screen name="Login" component={Login}/>
            <Stack.Screen name="SignUp" component={SignUp}/>
        </Stack.Navigator>
    );
};

export const HomeStack = ({navigation}) => {
    return (
        <Stack.Navigator initialRouteName="ListItemFrom">
            <Stack.Screen name="Home" component={Home} options={{
                headerRight: ({}) => (
                    <Ionicons
                        onPress={() => navigation.navigate('ListItemFrom')}
                        style={{marginRight: 10}}
                        name="add"
                        size={30}
                        color={'#fb5b5a'}
                    />
                ),
            }}/>
            <Stack.Screen name="Profile" component={Profile}/>
            <Stack.Screen name="Details" component={ItemFullView}/>
            <Stack.Screen name="ListItemFrom" component={ListItemFrom}/>
        </Stack.Navigator>
    );
};
