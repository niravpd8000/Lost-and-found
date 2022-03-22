import {StatusBar, StyleSheet, Text, View} from 'react-native';
import Login from "./src/pages/Login";
import SignUp from "./src/pages/SignUp";
import Home from "./src/pages/Home";
import ItemFullDetails from "./src/components/ItemFullDetails";
import Profile from "./src/pages/Profile";
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Main from "./src/navigation/router";

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <Main/>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        flex: 1,
        backgroundColor: '#013249',
        alignItems: 'center',
        justifyContent: 'center',
    },
});