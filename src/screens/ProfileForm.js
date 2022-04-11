/**
 *  file: ProfileForm.js
 *  author: Nirav Pravinbhai Dhameliya <ndj585@uregina.ca>
 *  version: 0.1
 *  date-created: April-04-2022
 *  last-modified: April-08-2022
 */
import React, {useState} from "react";
import {SafeAreaView, StyleSheet, ScrollView, Picker, Text, View} from "react-native";
import TextField from "../components/TextField";
import CustomButton from "../components/CustomButton";
import ImageUpload from "../components/ImageUpload";

/**
 * ProfileForm screen component
 * @returns {JSX.Element}
 * @constructor
 */
const ProfileForm = ({}) => {
    /** initialising states */

    const [state, setState] = useState({
        title: "",
        place: "",
        color: "",
        category: "",
        subCategory: "",
        description: ""
    })

    /**
     * handleChange
     * Purpose: This function used for handling form
     * Parameter(s):
     * Object {name,value}: object with name and value
     * Precondition(s):
     * N/A
     *
     * Returns: N/A
     *
     * Side effect:
     * <1> This function will call when user fill the details
     */
    const handleChange = ({name, value}) => {
        setState({...state, [name]: value})
    }
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.itemContainer}>
                <View style={styles.box}>
                    <ImageUpload/>
                </View>
                <View style={styles.box}>
                    <Text style={styles.subTitle}>Title : </Text>
                    <TextField
                        onChangeText={(value) => handleChange({name: "title", value})}
                        style={styles.inputStyle}/>
                </View>
                <View style={styles.box}>
                    <Text style={styles.subTitle}>Place : </Text>
                    <Picker
                        selectedValue={state.place}
                        style={{height: 50, borderColor: "white", borderRadius: 10}}
                        onValueChange={(value) => handleChange({name: "place", value})}
                    >
                    </Picker>
                </View>
                <View style={styles.box}>
                    <Text style={styles.subTitle}>Description : </Text>
                    <TextField
                        onChangeText={(value) => handleChange({name: "description", value})}
                        multiline={true}
                        numberOfLines={5}
                        style={styles.textAreaStyle}/>
                </View>
                <View style={{alignItems: "center"}}>
                    <View style={{width: 200}}>
                        <CustomButton contained>Publish</CustomButton>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

/**
 * styles
 * @type {{
 * container: {alignItems: string, flex: number, width: string, justifyContent: string},
 * button: {backgroundColor: string, borderRadius: number, alignItems: string, width: string, marginBottom: number, justifyContent: string, marginTop: number, height: number},
 * itemContainer: {padding: number, width: string},
 * input: {padding: number, backgroundColor: string, color: string, borderRadius: number, width: string, marginBottom: number, fontWeight: string, justifyContent: string, height: number},
 * buttonText: {color: string, fontWeight: string},
 * subTitle: {marginBottom: number, fontSize: number, fontWeight: string},
 * inputStyle: {padding: number, backgroundColor: string, borderRadius: number, width: string, marginBottom: number, fontWeight: string, justifyContent: string, height: number},
 * box: {marginVertical: number},
 * label: {color: string, marginBottom: number, fontSize: number, fontWeight: string},
 * textAreaStyle: {padding: number, backgroundColor: string, borderRadius: number, width: string, marginBottom: number, fontWeight: string, justifyContent: string, height: number}}}
 */
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
        padding: 10
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

export default ProfileForm;