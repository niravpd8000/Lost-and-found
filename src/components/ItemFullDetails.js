import * as React from 'react';
import {Text, View, Image, StyleSheet} from "react-native";
import CustomButton from "./CustomButton";
import ImageSlider from "react-native-image-slider";
import moment from "moment";
import {AuthContext} from "./Context";
import ClaimModal from "./ClaimModal";
import ReplyModal from "./ReplyModal";

const ItemFullDetails = ({data}) => {
    const {loginState} = React.useContext(AuthContext);
    const [openClaimModal, setOpenClaimModal] = React.useState(false);
    const [selectedMessage, setSelectedMessage] = React.useState(null);

    const images =
        [
            'http://placeimg.com/640/480/any',
            'http://placeimg.com/640/480/any',
            'http://placeimg.com/640/480/any'
        ]
    return (
        <View style={styles.container}>
            <ReplyModal itemData={data} messageData={selectedMessage} modalVisible={!!selectedMessage} onClose={() => {
                setSelectedMessage(null)
            }}/>
            <ClaimModal itemData={data} modalVisible={openClaimModal} onClose={() => {
                setOpenClaimModal(false)
            }}/>
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
                    <View style={{flex: 3}}>
                        <Text style={styles.title}>{data.title}</Text>
                    </View>
                    <View style={{flex: 1, textAlign: "right"}}>
                        {data?.claims.find(i => i.senderId === loginState?.userDetails?.id) ?
                            <Text style={{fontWeight: 'bold', color: 'green'}}>Claimed</Text> :
                            loginState?.userDetails?.id !== data?.userId ?
                                <CustomButton height={40} onClick={() => setOpenClaimModal(true)}
                                              contained>Claim</CustomButton> :
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
                    <View style={{flex: 1}}>
                        <Text style={styles.subTitle}>Place : </Text>
                    </View>
                    <View style={[styles.listItem, {flex: 2, justifyContent: "space-evenly"}]}>
                        <Text style={styles.placeItem}>{data.place}</Text>
                    </View>
                </View>
                <View style={styles.listItem}>
                    <View style={{flex: 1}}>
                        <Text style={styles.subTitle}>Category : </Text>
                    </View>
                    <View style={[styles.listItem, {flex: 2, justifyContent: "space-evenly"}]}>
                        {data.category ? <Text style={styles.placeItem}>{data.category}</Text> : null}
                        {data.subCategory ? <Text style={styles.placeItem}>{data.subCategory}</Text> : null}
                    </View>
                </View>
                <View style={styles.listItem}>
                    <Text style={styles.subTitle}>Date : </Text>
                    <Text>{moment(data.createdAt).format("DD MMM YY")}</Text>
                </View>
                <View style={styles.detailsView}>
                    <Text style={styles.subTitle}>Description</Text>
                    <View style={styles.description}>
                        <Text style={{color: "black", flexShrink: 1}}>
                            {data.description}
                        </Text>
                    </View>
                </View>
                {loginState?.userDetails?.id !== data?.userId && data.claims.length ? <View style={styles.detailsView}>
                    <Text style={styles.subTitle}>Claimed Message by you</Text>
                    <View style={styles.description}>
                        <Text style={{color: "black", flexShrink: 1}}>
                            {data.claims[0].message}
                        </Text>
                    </View>
                </View> : null
                }
                {loginState?.userDetails?.id === data?.userId ?
                    <View style={{marginTop: 10}}>
                        <Text style={styles.subTitle}>Claim Status ({data.claims.length})</Text>
                        <View
                            style={{
                                borderBottomColor: 'black',
                                borderBottomWidth: 1,
                                marginVertical: 5
                            }}
                        />
                        {data.claims.map((item, key) => <View key={key}
                                                              style={[styles.listItem, {
                                                                  backgroundColor: "#c2c2c2",
                                                                  padding: 10,
                                                                  marginBottom: 5
                                                              }]}>
                            <View style={{width: "100%"}}>
                                <Text style={styles.subTitle}>Anonymous {key + 1}</Text>
                                <View style={styles.listItem}>
                                    <View style={{flex: 1}}>
                                        <Text style={styles.subTitle}>Message : </Text>
                                    </View>
                                    <View style={[styles.listItem, {flex: 3, justifyContent: "flex-start"}]}>
                                        <Text>{item?.message}</Text>
                                    </View>
                                </View>
                                {item?.reply ?
                                    <View style={[styles.listItem,{justifyContent: "flex-start"}]}>
                                        <View>
                                            <Text style={styles.subTitle}>Reply by you : </Text>
                                        </View>
                                        <View style={[{ justifyContent: "flex-start"}]}>
                                            <Text>{item?.reply}</Text>
                                        </View>
                                    </View> :
                                    null
                                }
                                <View style={[styles.listItem]}>
                                    <View style={{flex: 1}}>
                                        {!item?.reply ?
                                            <CustomButton height={30} onClick={() => setSelectedMessage(item)}
                                                          contained>Reply</CustomButton>
                                            : null}
                                    </View>
                                    <View style={{flex: 1}}>
                                        <CustomButton height={30} contained>Mark as found</CustomButton>
                                    </View>
                                </View>
                            </View>
                        </View>)}
                    </View>
                    : null

                }
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
    },
    description: {
        backgroundColor: "#c2c2c2",
        width: "100%",
        padding: 10,
        borderRadius: 10,
        minHeight: 40,
        marginVertical: 10,
    }
});

export default ItemFullDetails;