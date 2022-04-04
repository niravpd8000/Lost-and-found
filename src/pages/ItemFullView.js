import React from "react";
import {SafeAreaView, StyleSheet, View, ScrollView} from "react-native";
import ItemFullDetails from "../components/ItemFullDetails";


export default ({route}) => {
    const {data} = route.params;
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.itemContainer}>
                <View style={styles.itemContainer}>
                    <ItemFullDetails data={data}/>
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