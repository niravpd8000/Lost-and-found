import React, {useState} from "react";
import {SafeAreaView, StyleSheet, TextInput} from "react-native";
import {Text, TouchableOpacity} from "react-native-web";


export default () => {

    return (
        <SafeAreaView style={styles.container}>

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        width: "100%",
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        width: "80%",
        backgroundColor: "#465881",
        color: 'white',
        fontWeight: 'bold',
        borderRadius: 25,
        height: 50,
        marginBottom: 20,
        justifyContent: "center",
        padding: 20
    },
    label: {
        color: "#fb5b5a",
        marginBottom: 40,
        fontSize: 50,
        fontWeight: "bold"
    },
    button: {
        width: "80%",
        backgroundColor: "#fb5b5a",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        marginBottom: 10
    },
    buttonText: {
        color: '#ede8e8',
        fontWeight: "500"
    }
});

const campusList=[
    "Administration - Humanities Building",
    "Campion College",
    "Centre for Kinesiology, Health and Sport",
    "Classroom Building",
    "College West Building",
    "Day Care",
    "Dr. John Archer Library",
    "Dr. William Riddell Centre",
    "Education Auditorium",
    "Education Building",
    "First Nations University of Canada",
    "Greenhouse Gas Technology Centre",
    "Heating Plant",
    "Kīšik Towers",
    "Laboratory Building",
    "La Cité",
    "Luther College",
    "Paskwāw Tower",
    "Research and Innovation Centre",
    "Wakpá Tower",
]
