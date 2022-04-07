import * as React from 'react';
import {Text, View, Image, StyleSheet, TouchableOpacity} from "react-native";
import CustomButton from "./CustomButton";
import ShowMoreText from "./ShowMoreText";
import ImageSlider from "react-native-image-slider";

const ItemCard = ({data, onPress, onPressClaimButton, hideClaimButton, claimed}) => {

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
                        <CustomButton onClick={onPressClaimButton} height={40} contained>Claim</CustomButton>:
                        claimed ? <Text style={{fontWeight: 'bold',textAlign:"right", color: '#240080'}}>Claimed</Text> : null
                    }
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