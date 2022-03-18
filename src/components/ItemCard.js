import * as React from 'react';
import {Text, View, Image, StyleSheet} from "react-native";
import CustomButton from "./CustomButton";
import ShowMoreText from "./ShowMoreText";

const ItemCard = () => {
    return (
        <View style={styles.container}>
            <View>
                <Image
                    source={'https://media.istockphoto.com/photos/headphones-in-trippy-colors-picture-id1309150577?b=1&k=20&m=1309150577&s=170667a&w=0&h=K7HnYslGB5TYMbSvlImWfdLxGIA_m90VEafx3BQL0X8='}
                    style={styles.image}
                />
            </View>
            <View style={styles.details}>
                <View style={{flex: 2}}>
                    <Text style={styles.title}>Title</Text>
                    <Text style={{color: "black", paddingTop: 5, flexShrink: 1}}>
                        <ShowMoreText description={"Description of the image Description of the image of the image"}/>
                    </Text>
                </View>
                <View style={{flex: 1}}>
                    <CustomButton contained>Claim</CustomButton>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#eee",
        borderRadius: 10,
        width: "100%",
        overflow: "hidden",
        marginTop: 20
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
        justifyContent: 'between'
    }
});

export default ItemCard;