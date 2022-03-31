import React from "react";
import {SafeAreaView, StyleSheet, View,ScrollView} from "react-native";
import ItemFullDetails from "../components/ItemFullDetails";


export default () => {

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.itemContainer}>
            <View style={styles.itemContainer}>
                <ItemFullDetails/>
            </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        width: "100%", flex: 1, alignItems: 'center', justifyContent: 'center',
    },
    itemContainer: {
        padding: 10,
        width: "100%",
    },

});

const campusList = ["Administration - Humanities Building", "Campion College", "Centre for Kinesiology, Health and Sport", "Classroom Building", "College West Building", "Day Care", "Dr. John Archer Library", "Dr. William Riddell Centre", "Education Auditorium", "Education Building", "First Nations University of Canada", "Greenhouse Gas Technology Centre", "Heating Plant", "Kīšik Towers", "Laboratory Building", "La Cité", "Luther College", "Paskwāw Tower", "Research and Innovation Centre", "Wakpá Tower",]
