/**
 *  file: ItemCard.js
 *  author: Nirav Pravinbhai Dhameliya <ndj585@uregina.ca>
 *  version: 0.1
 *  date-created: March-18-2022
 *  last-modified: April-08-2022
 */
import * as React from 'react';
import {Text, View, Image, StyleSheet, TouchableOpacity} from "react-native";
import CustomButton from "./CustomButton";
import ShowMoreText from "./ShowMoreText";
import ImageSlider from "react-native-image-slider";

/**
 * ItemCard component
 * @param data
 * @param onPress
 * @param itemTypeFound
 * @param onPressClaimButton
 * @param hideClaimButton
 * @param claimed
 * @returns {JSX.Element}
 * @constructor
 */
const ItemCard = ({data, onPress, itemTypeFound, onPressClaimButton, hideClaimButton, claimed}) => {
    /**
     * Reusable ItemCard Component with custom style
     */
    return (
        <TouchableOpacity onPress={onPress} style={styles.container}>
            <View>
                <ImageSlider
                    loopBothSides
                    customSlide={({index, item, style}) => (
                        <View key={index} style={[style, styles.customSlide]}>
                            <Image source={{uri: item}} style={styles.customImage}/>
                        </View>
                    )}
                    images={data.images || []}
                />
            </View>
            <View style={styles.details}>
                <View style={{flex: 2}}>
                    <Text style={styles.title}>{data.title}</Text>
                    <Text style={{color: "black", paddingTop: 5, flexShrink: 1}}>
                        <ShowMoreText>
                            {data.description}
                        </ShowMoreText>
                    </Text>
                </View>
                <View style={{flex: 1}}>
                    {!hideClaimButton ?
                        <CustomButton onClick={onPressClaimButton} height={40}
                                      contained>{itemTypeFound ? "Claim" : "Found"}</CustomButton> :
                        claimed ? <Text
                            style={{fontWeight: 'bold', textAlign: "right", color: '#240080'}}>Claimed</Text> : null
                    }
                </View>
            </View>
        </TouchableOpacity>
    );
}
/**
 *
 * @type {{
 * container: {elevation: number, backgroundColor: string, overflow: string, borderRadius: number, width: string, marginBottom: number,
 * shadowOffset: {width: number, height: number}, shadowOpacity: number, shadowColor: string},
 * image: {height: number},
 * customImage: {height: number},
 * details: {padding: number, alignItems: string, flex: number, flexDirection: string, width: string, justifyContent: string},
 * title: {fontSize: number, fontWeight: string}
 * }}
 */
const styles = StyleSheet.create({
    container: {
        backgroundColor: "#eee",
        borderRadius: 10,
        width: "100%",
        overflow: "hidden",
        marginBottom: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        elevation: 4,
    },
    image: {
        height: 200
    },
    title: {
        fontSize: 18,
        fontWeight: "bold"
    },
    details: {
        padding: 20,
        flex: 1,
        width: "100%",
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    customImage: {
        height: 200
    }
});

export default ItemCard;