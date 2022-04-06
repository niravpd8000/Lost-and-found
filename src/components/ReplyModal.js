import React, {useEffect, useState} from "react";
import {Alert, Modal, StyleSheet, Text, Pressable, View, Image} from "react-native";
import TextField from "./TextField";
import ImageSlider from "react-native-image-slider";
import {postRequest} from "../API/axios";
import {API} from "../API/apis";
import {AuthContext} from "./Context";

const ReplyModal = ({modalVisible, onClose, messageData, itemData}) => {
    const {logout, loginState} = React.useContext(AuthContext);
    const [state, setState] = useState({
        reply: "",
        messageId: messageData?._id,
        itemId: itemData?._id
    })
    console.log(state)
    useEffect(() => {
        setState({
            ...state,
            messageId: messageData?._id,
            itemId: itemData?._id
        })
    }, [messageData, itemData]);
    const claimItem = async () => {
        const getResponse = (response) => {
            // setList(response?.data?.data);
        }
        const getError = (error) => {
            console.log("error.response.errorCode", error.response.status)
            if (error.response.status === 401) {
                logout()
            }
        }
        try {
            await postRequest(API.CLAIM_ITEM_RESPONSE, state, getResponse, getError, loginState.accessToken)
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={onClose}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>Reply</Text>
                    <TextField
                        multiline={true}
                        numberOfLines={5}
                        onChangeText={(value) => setState({...state, reply: value})}
                        style={styles.textArea}/>
                    <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={claimItem}
                    >
                        <Text style={styles.textStyle}>Reply</Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor:"#EAE5E57E"
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 25,
        width: "80%",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        marginTop: 10
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#fb5b5a",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    textArea: {
        padding: 10,
        width: "100%",
        borderColor: "#c7c7c7",
        borderWidth: 1,
        borderStyle: 'solid',
        borderRadius: 10,
        backgroundColor: "#fbfbfb"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    customSlide: {
        height: 150,
        width: 100
    },
    customImage: {
        height: 150,
        width: 100
    }
});

export default ReplyModal;