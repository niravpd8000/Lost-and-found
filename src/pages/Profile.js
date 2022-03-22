import React from "react";
import {SafeAreaView, StyleSheet, Text, View, Image} from "react-native";

export default () => {

    return (
        <SafeAreaView style={styles.container}>
            <Image
                source={'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80'}
                style={styles.image}
            />
            <View style={{width: "100%", padding: "20px"}}>
                <Text style={styles.label}>Nirav Dhameliya</Text>
                <Text style={styles.subLabel}>niravpd@gmail.com</Text>
                <View style={styles.card}>
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

const campusList = ["Administration - Humanities Building", "Campion College", "Centre for Kinesiology, Health and Sport", "Classroom Building", "College West Building", "Day Care", "Dr. John Archer Library", "Dr. William Riddell Centre", "Education Auditorium", "Education Building", "First Nations University of Canada", "Greenhouse Gas Technology Centre", "Heating Plant", "Kīšik Towers", "Laboratory Building", "La Cité", "Luther College", "Paskwāw Tower", "Research and Innovation Centre", "Wakpá Tower",]
