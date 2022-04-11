/**
 *  file: Loading.js
 *  author: Nirav Pravinbhai Dhameliya <ndj585@uregina.ca>
 *  version: 0.1
 *  date-created: April-11-2022
 *  last-modified: April-11-2022
 */
import React, {useEffect, useState} from "react";
import {Modal, StyleSheet, Text, Pressable, View, Image, TouchableOpacity, ActivityIndicator} from "react-native";
import TextField from "./TextField";
import ImageSlider from "react-native-image-slider";
import {postRequest} from "../API/axios";
import {API} from "../API/apis";
import {AuthContext} from "./Context";
import ToastMessage from "./ToastMessage";

/**
 * Loading component
 * @returns {JSX.Element}
 * @constructor
 */
const Loading = () => {
    /** initialising states and variables */
    return (
        <View style={styles.container}>
            <ActivityIndicator color={"#fb5b5a"}/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: "100%",
        width: "100%",
        flex: 1,
        alignItems: 'center',
        justifyContent: "center",
        position:'absolute'
    }
});

export default Loading;