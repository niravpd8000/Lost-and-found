import {StyleSheet, Text, View} from 'react-native';
import Login from "./src/pages/Login";
import SignUp from "./src/pages/SignUp";
import Home from "./src/pages/Home";
import ItemFullDetails from "./src/components/ItemFullDetails";
import Profile from "./src/pages/Profile";

export default function App() {
    return (
        <View style={styles.container}>
            {/*<Login/>*/}
            {/*<SignUp/>*/}
            {/*<Home/>*/}
            {/*<ItemFullDetails/>*/}
            <Profile/>
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