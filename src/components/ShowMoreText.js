import {StyleSheet, Text, View} from "react-native";
import {useState} from "react";
import {TouchableOpacity} from "react-native-web";

const ShowMoreText = ({description}) => {
    const [show, setShow] = useState(false);

    return (
        <View>
            <Text>
                {show || description.length < 60 ? description : `${description.slice(0, 60)}...`}
                {description.length > 60 ?
                    <TouchableOpacity onPress={() => setShow(!show)}>
                        <Text style={styles.label}>{show ? " less" : " more"}</Text>
                    </TouchableOpacity>
                    :
                    null
                }
            </Text>
        </View>
    );
}
const styles = StyleSheet.create({
    label: {
        color: "#fb5b5a",
        fontWeight: "bold"
    },
});

export default ShowMoreText;