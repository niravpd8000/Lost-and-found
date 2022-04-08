import React, {useState} from "react";
import {SafeAreaView, StyleSheet, ScrollView, Picker, Text, View} from "react-native";
import TextField from "../components/TextField";
import CustomButton from "../components/CustomButton";
import ImageUpload from "../components/ImageUpload";

export default ({}) => {
    const [state, setState] = useState({
        title: "",
        place: "",
        color: "",
        category: "",
        subCategory: "",
        description: ""
    })
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