import * as React from 'react';
import {Text, View, Image, StyleSheet, TouchableOpacity} from "react-native";
import CustomButton from "./CustomButton";
import ShowMoreText from "./ShowMoreText";
import ImageSlider from "react-native-image-slider";

const ItemCard = ({onPress}) => {
    const images =
        [
            'http://placeimg.com/640/480/any',
            'http://placeimg.com/640/480/any',
            'http://placeimg.com/640/480/any'
        ]

    return (
        <TouchableOpacity onPress={onPress} style={styles.container}>
            <View>
                <ImageSlider
                    loopBothSides
                    customSlide={({index, item, style, width}) => (
                        // It's important to put style here because it's got offset inside
                        <View key={index} style={[style, styles.customSlide]}>
                            <Image source={{uri: item}} style={styles.customImage}/>
                        </View>
                    )}
                    images={images}
                />
            </View>
            <View style={styles.details}>
                <View style={{flex: 2}}>
                    <Text style={styles.title}>Title</Text>
                    <Text style={{color: "black", paddingTop: 5, flexShrink: 1}}>
                        <ShowMoreText>
                            Description of the image Description of the image of the image
                        </ShowMoreText>
                    </Text>
                </View>
                <View style={{flex: 1}}>
                    <CustomButton contained>Claim</CustomButton>
                </View>
            </View>
        </TouchableOpacity>
    );
}

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