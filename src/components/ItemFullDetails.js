import * as React from 'react';
import {Text, View, Image, StyleSheet} from "react-native";
import CustomButton from "./CustomButton";
import ImageSlider from "react-native-image-slider";
import moment from "moment";
import {AuthContext} from "./Context";

const ItemFullDetails = ({data}) => {
    const {loginState} = React.useContext(AuthContext);
    const images =
        [
            'http://placeimg.com/640/480/any',
            'http://placeimg.com/640/480/any',
            'http://placeimg.com/640/480/any'
        ]
    return (
        <View style={styles.container}>
            <View>
                <ImageSlider
                    loopBothSides
                    customSlide={({index, item, style, width}) => (
                        // It's important to put style here because it's got offset inside
                        <View key={index} style={[style, styles.customSlide]}>
                            <Image source={{uri: item}} style={styles.customImage}/>
                        </View>
                    )}
                    images={data.images}
                />
            </View>
            <View style={styles.details}>
                <View style={styles.header}>
                    <View style={{flex: 2}}>
                        <Text style={styles.title}>{data.title}</Text>
                    </View>
                    <View style={{flex: 1}}>
                        {data?.claims.find(i => i.senderId === loginState?.userDetails?.id) ?
                            <Text>Claimed</Text> :
                            loginState?.userDetails?.id !== data?.userId ?
                                <CustomButton height={40} contained>Claim</CustomButton> :
                                null
                        }
                    </View>
                </View>
                <View style={styles.listItem}>
                    <Text style={styles.subTitle}>Brand Name : </Text>
                    <Text>{data.brand}</Text>
                </View>
                <View style={styles.listItem}>
                    <Text style={styles.subTitle}>Color : </Text>
                    <Text>{data.color}</Text>
                </View>
                <View style={styles.listItem}>
                    <Text style={styles.subTitle}>Place : </Text>
                    <Text style={styles.placeItem}>{data.place}</Text>
                </View>
                <View style={styles.listItem}>
                    <Text style={styles.subTitle}>Category : </Text>
                    <Text style={styles.placeItem}>{data.category}</Text>
                    <Text style={styles.placeItem}>{data.subCategory}</Text>
                </View>
                <View style={styles.listItem}>
                    <Text style={styles.subTitle}>Date : </Text>
                    <Text>{moment(data.createdAt).format("DD MMM YY")}</Text>
                </View>
                <View style={styles.detailsView}>
                    <Text style={styles.subTitle}>Description</Text>
                    <Text style={{color: "black", paddingTop: 5, flexShrink: 1}}>
                        {data.description}
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
        justifyContent: 'space-between',
        marginBottom: 20
    },
    detailsView: {
        width: "100%",
        alignItems: 'flex-start',
    },
    listItem: {
        flex: 1,
        width: "100%",
        flexDirection: 'row',
        marginVertical: 5,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    placeItem: {
        borderRadius: 10,
        fontWeight: "bold",
        backgroundColor: "grey",
        color: 'white',
        padding: 5,
        fontSize: 10
    },
    customImage: {
        height: 200
    }
});

export default ItemFullDetails;