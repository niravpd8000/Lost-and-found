/**
 *  file: TextField.js
 *  author: Nirav Pravinbhai Dhameliya <ndj585@uregina.ca>
 *  version: 0.1
 *  date-created: March-18-2022
 *  last-modified: April-08-2022
 */
import {StyleSheet, TextInput} from "react-native";

const TextField = (props) => {
    const {error, multiline} = props;
    return (
        <TextInput
            style={props.style || error ? styles.error : styles.input}
            multiline={multiline}
            placeholderTextColor={error ? "#702121" : "#013249"}
            {...props}
        />
    );
}

const styles = StyleSheet.create({
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
    error: {
        backgroundColor: "#ffafaf",
        color: '#f34545',
        width: "100%",
        fontWeight: 'bold',
        borderRadius: 25,
        height: 50,
        marginBottom: 20,
        justifyContent: "center",
        padding: 20
    }
});

export default TextField;