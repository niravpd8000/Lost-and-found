/**
 *  file: ItemFullView.js
 *  author: Nirav Pravinbhai Dhameliya <ndj585@uregina.ca>
 *  version: 0.1
 *  date-created: March-22-2022
 *  last-modified: April-08-2022
 */

import React from "react";
import {SafeAreaView, StyleSheet, View, ScrollView} from "react-native";
import ItemFullDetails from "../components/ItemFullDetails";

/**
 * ItemFullView screen
 * @param route
 * @returns {JSX.Element}
 * @constructor
 */
const ItemFullView = ({route}) => {
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

/**
 * @type {{
 * container: {alignItems: string, flex: number, width: string, justifyContent: string},
 * itemContainer: {padding: number, width: string}
 * }}
 */
const styles = StyleSheet.create({
    container: {
        width: "100%", flex: 1, alignItems: 'center', justifyContent: 'center',
    },
    itemContainer: {
        padding: 10,
        width: "100%",
    },

});

export default ItemFullView;