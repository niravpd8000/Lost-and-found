import {StyleSheet, Text, View} from 'react-native';
import Login from "./src/pages/Login";
import SignUp from "./src/pages/SignUp";
import Home from "./src/pages/Home";

export default function App() {
    return (
        <View style={styles.container}>
            {/*<Login/>*/}
            <SignUp/>
            {/*<Home/>*/}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#013249',
        alignItems: 'center',
        justifyContent: 'center',
    },
});