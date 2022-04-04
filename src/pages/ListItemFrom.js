import React, {useState} from "react";
import {SafeAreaView, StyleSheet, ScrollView, Picker, Text, View} from "react-native";
import TextField from "../components/TextField";

export default ({}) => {
    const [selectedValue, setSelectedValue] = useState("java");
    const campusList = [
        "Administration - Humanities Building",
        "Campion College",
        "Centre for Kinesiology," +
        " Health and Sport",
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
        "Parking",
        "Other"
    ]
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.itemContainer}>
                <View style={styles.box}>
                    <Text style={styles.subTitle}>Title : </Text>
                    <TextField style={styles.inputStyle}/>
                </View>
                <View style={styles.box}>
                    <Text style={styles.subTitle}>Place : </Text>
                    <Picker
                        selectedValue={selectedValue}
                        style={{height: 50, borderColor: "white", borderRadius: 10}}
                        onValueChange={(itemValue) => setSelectedValue(itemValue)}
                    >
                        {campusList.map((item, key) => <Picker.Item key={key} label={item} value={item}/>)}
                    </Picker>
                </View>
                <View style={styles.box}>
                    <Text style={styles.subTitle}>Description : </Text>
                    <TextField multiline={true} numberOfLines={5} style={styles.textAreaStyle}/>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        width: "100%", flex: 1, alignItems: 'center', justifyContent: 'center',
    },
    box: {
        marginVertical: 10
    },
    inputStyle: {
        width: "100%",
        backgroundColor: "#ffffff",
        fontWeight: 'bold',
        borderRadius: 5,
        height: 50,
        marginBottom: 20,
        justifyContent: "center",
        padding: 20
    },
    textAreaStyle: {
        width: "100%",
        backgroundColor: "#ffffff",
        fontWeight: 'bold',
        borderRadius: 5,
        height: 100,
        marginBottom: 20,
        justifyContent: "center",
        padding: 20
    },
    itemContainer: {
        padding: 10,
        width: "100%",
    },
    subTitle: {
        marginBottom: 10,
        fontSize: 14,
        fontWeight: "bold"
    },
    input: {
        width: "100%",
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
        color: "#fb5b5a", marginBottom: 40, fontSize: 50, fontWeight: "bold"
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
