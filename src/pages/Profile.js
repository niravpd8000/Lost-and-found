import React from "react";
import {SafeAreaView, StyleSheet, Text, View, Image} from "react-native";
import CustomButton from "../components/CustomButton";
import {AuthContext} from "../components/Context";

export default ({navigation}) => {
    const {loginState, logout} = React.useContext(AuthContext);
    return (
        <SafeAreaView style={styles.container}>
            <Image
                source={'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80'}
                style={styles.image}
            />
            <View style={{width: "100%", padding: "20px"}}>
                <Text
                    style={styles.label}>{loginState?.userDetails?.fullName ? loginState?.userDetails?.fullName : "User"}</Text>
                <Text style={styles.subLabel}>{loginState?.userDetails?.email}</Text>
                <View style={styles.card}>
                    <CustomButton onClick={() => navigation.navigate("My Listing")} buttonColor="#765050" contained>My
                        Listing</CustomButton>
                    <CustomButton onClick={() => navigation.navigate("Claimed Item")} buttonColor="#765050"
                                  contained>Claimed</CustomButton>
                    <CustomButton onClick={() => navigation.navigate("Edit Profile")}
                                  buttonColor="#765050" contained>Profile</CustomButton>
                    <CustomButton onClick={logout} buttonColor="#765050" contained>Logout</CustomButton>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        width: "100%",
        flex: 1,
        alignItems: 'center',
        // justifyContent: 'center',
        backgroundColor: 'white',
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        marginTop: 120,
        position: "relative"
    },
    image: {
        position: "absolute",
        top: -50,
        borderStyle: "solid",
        borderColor: "white",
        borderWidth: 5,
        height: 100,
        width: 100,
        borderRadius: 50
    },
    card: {
        marginTop: 20,
        width: "100%",
        padding: 10,
        height: 250,
        borderRadius: 15,
        // boxShadow: "0px 0px 19px -10px rgba(0,0,0,0.75)"
    },
    label: {
        textAlign: "center",
        color: "#013249", marginTop: 40, fontSize: 30, fontWeight: "bold"
    },
    subLabel: {
        textAlign: "center",
        color: "#013249", fontSize: 15, fontWeight: "bold"
    },
    button: {
        width: "100%",
        backgroundColor: "#fb5b5a",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        marginBottom: 10
    },
    buttonText: {
        color: '#ede8e8', fontWeight: "500"
    }
});