/**
 *  file: Profile.js
 *  author: Nirav Pravinbhai Dhameliya <ndj585@uregina.ca>
 *  version: 0.1
 *  date-created: March-18-2022
 *  last-modified: April-08-2022
 */
import React from "react";
import {SafeAreaView, StyleSheet, Text, View, Image} from "react-native";
import CustomButton from "../components/CustomButton";
import {AuthContext} from "../components/Context";

/**
 * Profile screen component
 * @param navigation
 * @returns {JSX.Element}
 * @constructor
 */
const Profile = ({navigation}) => {
    /** fetching states from context*/
    const {loginState, logout} = React.useContext(AuthContext);
    return (
        <SafeAreaView style={styles.container}>
            <Image
                source={{uri:'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png'}}
                style={styles.image}
            />
            <View style={{width: "100%", padding: 20}}>
                <Text
                    style={styles.label}>{loginState?.userDetails?.fullName ? loginState?.userDetails?.fullName : "User"}</Text>
                <Text style={styles.subLabel}>{loginState?.userDetails?.email}</Text>
                <View style={styles.card}>
                    <CustomButton onClick={() => navigation.navigate("My Listing")} buttonColor="#765050" contained>My
                        Listing</CustomButton>
                    <CustomButton onClick={() => navigation.navigate("Claimed Item")} buttonColor="#765050"
                                  contained>Claimed</CustomButton>
                    {/*<CustomButton onClick={() => navigation.navigate("Edit Profile")}*/}
                    {/*              buttonColor="#765050" contained>Profile</CustomButton>*/}
                    <CustomButton onClick={logout} buttonColor="#765050" contained>Logout</CustomButton>
                </View>
            </View>
        </SafeAreaView>
    );
};

/**
 * styles
 * @type {{
 * container: {backgroundColor: string, alignItems: string, flex: number, width: string, borderTopRightRadius: number, position: string, marginTop: number, borderTopLeftRadius: number},
 * button: {backgroundColor: string, borderRadius: number, alignItems: string, width: string, marginBottom: number, justifyContent: string, marginTop: number, height: number},
 * image: {borderColor: string, top: number, borderRadius: number, borderWidth: number, width: number, position: string, borderStyle: string, height: number},
 * buttonText: {color: string, fontWeight: string},
 * subLabel: {color: string, textAlign: string, fontSize: number, fontWeight: string},
 * label: {color: string, textAlign: string, fontSize: number, marginTop: number, fontWeight: string},
 * card: {padding: number, borderRadius: number, width: string, marginTop: number, height: number}
 * }}
 */
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
        borderColor: "#765050",
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

export default Profile;