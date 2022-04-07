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
                headerRight: ({}) => (
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}>
                        <Ionicons
                            onPress={() => navigation.navigate('ListItemFrom')}
                            style={{marginRight: 10}}
                            name="add"
                            size={30}
                            color={'#fb5b5a'}
                        />
                        <View style={{
                            position: "relative",
                            marginRight: 10
                        }}>
                            <Text style={{
                                fontSize: 10,
                                position: "absolute",
                                backgroundColor: "red",
                                color: 'white',
                                padding: 2,
                                height: 15,
                                width: 15,
                                textAlign: "center",
                                right: 0,
                                borderRadius: 10,
                            }}>1</Text>
                            <Text style={{fontSize: 20}}>🔔</Text>
                        </View>
                    </View>
                ),
            }}/>
            <Stack.Screen name="Profile" component={Profile}/>
            <Stack.Screen name="MyListing" component={MyListing}/>
            <Stack.Screen name="ClaimedItem" component={ClaimedItem}/>
            <Stack.Screen name="Details" component={ItemFullView}/>
            <Stack.Screen name="ListItemFrom" component={ListItemFrom}/>
        </Stack.Navigator>
    );
};
