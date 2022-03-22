import * as React from 'react';
import {Text, View, Image, StyleSheet} from "react-native";
import CustomButton from "./CustomButton";
import ShowMoreText from "./ShowMoreText";

const ItemFullDetails = () => {
    return (
        <View style={styles.container}>
            <View>
                <Image
                    source={'https://media.istockphoto.com/photos/headphones-in-trippy-colors-picture-id1309150577?b=1&k=20&m=1309150577&s=170667a&w=0&h=K7HnYslGB5TYMbSvlImWfdLxGIA_m90VEafx3BQL0X8='}
                    style={styles.image}
                />
            </View>
            <View style={styles.details}>
                <View style={styles.header}>
                    <View style={{flex: 2}}>
                        <Text style={styles.title}>Title</Text>
                    </View>
                    <View style={{flex: 1}}>
                        <CustomButton contained>Claim</CustomButton>
                    </View>
                </View>
                <View style={styles.listItem}>
                    <Text style={styles.subTitle}>Brand Name : </Text>
                    <Text>Apple</Text>
                </View>
                <View style={styles.listItem}>
                    <Text style={styles.subTitle}>Color : </Text>
                    <Text>White</Text>
                </View>
                <View style={styles.listItem}>
                    <Text style={styles.subTitle}>Place : </Text>
                    <Text style={styles.placeItem}>Library</Text>
                </View>
                <View style={styles.listItem}>
                    <Text style={styles.subTitle}>Category : </Text>
                    <Text style={styles.placeItem}>Eletronics</Text>
                    <Text style={styles.placeItem}>Headphone</Text>
                    <Text style={styles.placeItem}>Iphone</Text>
                    <Text style={styles.placeItem}>Library</Text>
                </View>
                <View style={styles.listItem}>
                    <Text style={styles.subTitle}>Date : </Text>
                    <Text>2nd Feb 2022</Text>
                </View>
                <View style={styles.detailsView}>
                    <Text style={styles.subTitle}>Description</Text>
                    <Text style={{color: "black", paddingTop: 5, flexShrink: 1}}>
                        Description of the image Description of the image of the image
                    </Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#eee",
        width: "100%",
        overflow: "hidden",
    },
    image: {
        height: 400
    },
    title: {
        fontSize: 18,
        fontWeight: "bold"
    },
    subTitle: {
        // marginTop: 10,
        fontSize: 14,
        fontWeight: "bold"
    },
    details: {
        padding: 20
    },
    header: {
        flex: 1,
        width: "100%",
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    detailsView: {
        width: "100%",
        alignItems: 'flex-start',
    },
    listItem: {
        flex: 1,
        width: "100%",
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    placeItem: {
        height: 25,
        borderRadius: 10,
        fontWeight: "bold",
        backgroundColor: "grey",
        color: 'white',
        padding: 5,
        fontSize: 10
    }
});

export default ItemFullDetails;