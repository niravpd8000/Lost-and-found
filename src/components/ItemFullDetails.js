import * as React from 'react';
import {Text, View, Image, StyleSheet} from "react-native";
import CustomButton from "./CustomButton";
import ImageSlider from "react-native-image-slider";
import moment from "moment";
import {AuthContext} from "./Context";
import ClaimModal from "./ClaimModal";
import ReplyModal from "./ReplyModal";
import {useEffect} from "react";
import {getRequest, postRequest} from "../API/axios";
import {API} from "../API/apis";

const ItemFullDetails = ({data}) => {
    const {logout, loginState} = React.useContext(AuthContext);
    const [openClaimModal, setOpenClaimModal] = React.useState(false);
    const [selectedMessage, setSelectedMessage] = React.useState(null);
    const [state, setState] = React.useState({});

    useEffect(() => {
        getItemById()
    }, [])

    const getItemById = async () => {
        const getResponse = (response) => {
            setState(response?.data?.data);
        }
        const getError = (error) => {
            console.log("error.response.errorCode", error.response.status)
            if (error.response.status === 401) {
                logout()
            }
        }
        try {
            await getRequest(`${API.GET_CLAIM_ITEM_BY_ID}/${data?._id}`, getResponse, getError, loginState.accessToken)
        } catch (e) {
            console.log(e)
        }
    }

    const claimItem = async (message) => {
        const getResponse = () => {
        }
        const getError = (error) => {
            console.log("error.response.errorCode", error.response.status)
            if (error.response.status === 401) {
                logout()
            }
        }
        try {
            await postRequest(API.CLAIM_ITEM_SUCCESS, {
                messageId: message._id,
                itemId: data?._id
            }, getResponse, getError, loginState.accessToken)
        } catch (e) {
            console.log(e)
        }
    }
    return (
        <View style={styles.container}>
            <ReplyModal itemData={state} messageData={selectedMessage} modalVisible={!!selectedMessage}
                        onClose={(refresh) => {
                            setSelectedMessage(null)
                            if (refresh)
                                getItemById()
                        }}/>
            <ClaimModal itemData={state} modalVisible={openClaimModal} onClose={(refresh) => {
                setOpenClaimModal(false)
                if (refresh)
                    getItemById()
            }}/>
            <View>
                <ImageSlider
                    loopBothSides
                    customSlide={({index, item, style}) => (
                        <View key={index} style={[style, styles.customSlide]}>
                            <Image source={{uri: item}} style={styles.customImage}/>
                        </View>
                    )}
                    images={state?.images || []}
                />
            </View>
            <View style={styles.details}>
                <View style={styles.header}>
                    <View style={{flex: 3}}>
                        <Text style={styles.title}>{state?.title}</Text>
                    </View>
                    <View style={{flex: 1, textAlign: "right"}}>
                        {state?.claims?.find(i => i.senderId === loginState?.userDetails?.id) ?
                            <Text style={{fontWeight: 'bold', color: '#240080'}}>Claimed</Text> :
                            loginState?.userDetails?.id !== state?.userId ?
                                <CustomButton height={40} onClick={() => setOpenClaimModal(true)}
                                              contained>Claim</CustomButton> :
                                null
                        }
                    </View>
                </View>
                <View style={styles.listItem}>
                    <Text style={styles.subTitle}>Brand Name : </Text>
                    <Text>{state?.brand}</Text>
                </View>
                <View style={styles.listItem}>
                    <Text style={styles.subTitle}>Color : </Text>
                    <Text>{state?.color}</Text>
                </View>
                <View style={styles.listItem}>
                    <View style={{flex: 1}}>
                        <Text style={styles.subTitle}>Place : </Text>
                    </View>
                    <View style={[styles.listItem, {flex: 2, justifyContent: "space-evenly"}]}>
                        <Text style={styles.placeItem}>{state?.place}</Text>
                    </View>
                </View>
                <View style={styles.listItem}>
                    <View style={{flex: 1}}>
                        <Text style={styles.subTitle}>Category : </Text>
                    </View>
                    <View style={[styles.listItem, {flex: 2, justifyContent: "space-evenly"}]}>
                        {state?.category ? <Text style={styles.placeItem}>{state?.category}</Text> : null}
                        {state?.subCategory ? <Text style={styles.placeItem}>{state?.subCategory}</Text> : null}
                    </View>
                </View>
                <View style={styles.listItem}>
                    <Text style={styles.subTitle}>Date : </Text>
                    <Text>{moment(state?.createdAt).format("DD MMM YY")}</Text>
                </View>
                <View style={styles.detailsView}>
                    <Text style={styles.subTitle}>Description</Text>
                    <View style={styles.description}>
                        <Text style={{color: "black", flexShrink: 1}}>
                            {state?.description}
                        </Text>
                    </View>
                </View>
                {loginState?.userDetails?.id !== state?.userId && state?.claims && state?.claims?.length ?
                    <View style={styles.detailsView}>
                        <Text style={styles.subTitle}>Claimed Message by you</Text>
                        <View style={styles.description}>
                            <Text style={{color: "black", flexShrink: 1}}>
                                {state?.claims[0].message}
                            </Text>
                        </View>
                    </View> : null
                }
                {loginState?.userDetails?.id === state?.userId ?
                    <View style={{marginTop: 10}}>
                        <Text style={styles.subTitle}>Claim Status ({state?.claims ? state?.claims?.length : 0})</Text>
                        <View
                            style={{
                                borderBottomColor: 'black',
                                borderBottomWidth: 1,
                                marginVertical: 5
                            }}
                        />
                        {state?.claims.map((message, key) => <View key={key}
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
                                        <Text>{message?.message}</Text>
                                    </View>
                                </View>
                                {message?.reply ?
                                    <View style={[styles.listItem, {justifyContent: "flex-start"}]}>
                                        <View>
                                            <Text style={styles.subTitle}>Reply by you : </Text>
                                        </View>
                                        <View style={[{justifyContent: "flex-start"}]}>
                                            <Text>{message?.reply}</Text>
                                        </View>
                                    </View> :
                                    null
                                }
                                {!state?.itemFound && <View style={[styles.listItem]}>
                                    <View style={{flex: 1}}>
                                        {!message?.reply ?
                                            <CustomButton height={30} onClick={() => setSelectedMessage(message)}
                                                          contained>Reply</CustomButton>
                                            : null}
                                    </View>
                                    <View style={{flex: 1}}>
                                        <CustomButton height={30} onClick={() => claimItem(message)} contained>Mark as
                                            found</CustomButton>
                                    </View>
                                </View>}
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