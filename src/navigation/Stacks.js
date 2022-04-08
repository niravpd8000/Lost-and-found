import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SignUp from '../pages/SignUp';
import Login from '../pages/Login';
import Home from '../pages/Home';
import Profile from "../pages/Profile";
import ItemFullView from "../pages/ItemFullView";
import {Text, View} from "react-native";
import ListItemFrom from "../pages/ListItemFrom";
import Ionicons from "react-native-vector-icons/Ionicons";
import MyListing from "../pages/MyListing";
import ClaimedItem from "../pages/ClaimedItem";
import ProfileFrom from "../pages/ProfileFrom";
import Search from "../pages/Search";

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
        <Stack.Navigator initialRouteName="Home">

            <Stack.Screen name="Home" component={Home} options={{
                headerTitle: () => <Text
                    style={{color: '#fb5b5a', fontWeight: 'bold', fontSize: 20}}>Lost &
                    Found</Text>,
                headerRight: ({}) => (
                    <Ionicons
                        onPress={() => navigation.navigate('Report found or lost')}
                        style={{marginRight: 10}}
                        name="add"
                        size={30}
                        color={'#fb5b5a'}
                    />
                ),
            }}/>
            <Stack.Screen name="My Listing" component={MyListing}/>
            <Stack.Screen name="Claimed Item" component={ClaimedItem}/>
            <Stack.Screen name="Details" component={ItemFullView}/>
            <Stack.Screen name="Report found or lost" component={ListItemFrom}/>
            <Stack.Screen name="Profile" component={Profile} options={{headerShown: false}}/>
        </Stack.Navigator>
    );
};


export const SearchStack = ({navigation}) => {
    return (
        <Stack.Navigator initialRouteName="Search">
            <Stack.Screen name="Search" component={Search} options={{headerShown: false}}/>
            <Stack.Screen name="Details" component={ItemFullView}/>
        </Stack.Navigator>
    );
};

export const ProfileStack = ({navigation}) => {
    return (
        <Stack.Navigator initialRouteName="Profile">

            <Stack.Screen name="Profile" component={Profile} options={{headerShown: false}}/>
            <Stack.Screen name="Edit Profile" component={ProfileFrom}/>
        </Stack.Navigator>
    );
};