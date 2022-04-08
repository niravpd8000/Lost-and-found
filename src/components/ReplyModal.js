import React, {useEffect, useState} from "react";
import {Modal, StyleSheet, Text, Pressable, View, TouchableOpacity} from "react-native";
import TextField from "./TextField";
import {postRequest} from "../API/axios";
import {API} from "../API/apis";
import {AuthContext} from "./Context";

const ReplyModal = ({modalVisible, onClose, messageData, itemData}) => {
    const {logout, loginState} = React.useContext(AuthContext);
    const [error, setError] = useState(false);
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
    const onClickReply = async () => {
        const getResponse = () => {
            onClose(true)
        }
        const getError = (error) => {
            console.log("error.response.errorCode", error.response.status)
            if (error.response.status === 401) {
                logout()
            }
        }
        try {
            if (state.reply)
                await postRequest(API.CLAIM_ITEM_RESPONSE, state, getResponse, getError, loginState.accessToken)
            else
                setError(true)
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
            <TouchableOpacity onPress={onClose} style={styles.centeredView}>
                <TouchableOpacity activeOpacity={1} style={styles.modalView}>
                    <Text style={styles.modalText}>Reply</Text>
                    <TextField
                        multiline={true}
                        placeholder={"Reply (you can share your contact details )"}
                        placeholderTextColor={!error ? "#bdbbbb" : "#989797"}
                        numberOfLines={5}
                        onChangeText={(value) => setState({...state, reply: value})}
                        style={error ? styles.textAreaError : styles.textArea}/>
                    {error && <Text style={{color: "red"}}>Please enter valid text</Text>}
                    <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={onClickReply}
                    >
                        <Text style={styles.textStyle}>Reply</Text>
                    </Pressable>
                </TouchableOpacity>
            </TouchableOpacity>
        </Modal>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#EAE5E57E"
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
    textAreaError: {
        padding: 10,
        width: "100%",
        borderColor: "#f14949",
        borderWidth: 1,
        borderStyle: 'solid',
        borderRadius: 10,
        backgroundColor: "#ffc2c2"
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