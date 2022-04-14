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
        <View style={styles.loading}>
            <ActivityIndicator color={"#fb5b5a"}/>
        </View>
    );
};

const styles = StyleSheet.create({
    loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default Loading;