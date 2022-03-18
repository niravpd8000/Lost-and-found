import {StyleSheet, TextInput} from "react-native";

const TextField = (props) => {
    return (
        <TextInput
            style={styles.input}
            placeholderTextColor="#013249"
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
});

export default TextField;