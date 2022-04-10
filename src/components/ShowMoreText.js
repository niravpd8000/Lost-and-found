/**
 *  file: ShowMoreText.js
 *  author: Nirav Pravinbhai Dhameliya <ndj585@uregina.ca>
 *  version: 0.1
 *  date-created: March-18-2022
 *  last-modified: April-08-2022
 */
import {StyleSheet, Text, View} from "react-native";
import {useState} from "react";
import {TouchableOpacity} from "react-native";

/**
 * ShowMoreText component
 * @param children
 * @returns {JSX.Element}
 * @constructor
 */
const ShowMoreText = ({children}) => {
    /** initialising state */
    const [show, setShow] = useState(false);

    /**
     * Reusable ShowMoreText Component for hiding long description with show more/lees button
     */
    return (
        <View>
            <Text>
                {show || children.length < 60 ? children : `${children.slice(0, 60)}...`}
                {children.length > 60 ?
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

/**
 * @type {{label: {color: string, fontWeight: string}}}
 */
const styles = StyleSheet.create({
    label: {
        color: "#fb5b5a",
        fontWeight: "bold"
    },
});

export default ShowMoreText;