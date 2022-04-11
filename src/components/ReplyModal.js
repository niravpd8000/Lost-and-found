/**
 *  file: ReplyModal.js
 *  author: Nirav Pravinbhai Dhameliya <ndj585@uregina.ca>
 *  version: 0.1
 *  date-created: April-05-2022
 *  last-modified: April-08-2022
 */
import React, {useEffect, useState} from "react";
import {Modal, StyleSheet, Text, Pressable, TouchableOpacity} from "react-native";
import TextField from "./TextField";
import {postRequest} from "../API/axios";
import {API} from "../API/apis";
import {AuthContext} from "./Context";

/**
 * ReplyModal component
 * @param modalVisible
 * @param onClose
 * @param messageData
 * @param itemData
 * @returns {JSX.Element}
 * @constructor
 */
const ReplyModal = ({modalVisible, onClose, messageData, itemData}) => {
    /** initialising states and variables */
    const [error, setError] = useState(false);
    const [state, setState] = useState({
        reply: "",
        messageId: messageData?._id,
        itemId: itemData?._id
    })

    /** fetching states from context*/
    const {logout, loginState} = React.useContext(AuthContext);

    /** useEffect will call when component will first time rendering and also for provided dependency */
    useEffect(() => {
        setState({
            ...state,
            messageId: messageData?._id,
            itemId: itemData?._id
        })
    }, [messageData, itemData]);

    /**
     * onClickReply
     * Purpose: This function used for calling api(API.CLAIM_ITEM_RESPONSE) for replying claimed message
     * Parameter(s):
     * N/A
     * Precondition(s):
     * reply state shouldn't be null
     *
     * Returns: N/A
     *
     * Side effect:
     * <1> This function will be called when user click on Reply button
     */
    const onClickReply = async () => {
        const getResponse = () => {
            onClose(true)
        }
        const getError = (error) => {
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

/**
 *
 * @type {{
 * button: {elevation: number, padding: number, borderRadius: number, marginTop: number},
 * buttonOpen: {backgroundColor: string},
 * customSlide: {width: number, height: number},
 * buttonClose: {backgroundColor: string},
 * centeredView: {backgroundColor: string, alignItems: string, flex: number, justifyContent: string},
 * modalView: {elevation: number, padding: number, margin: number, backgroundColor: string, shadowRadius: number, borderRadius: number, alignItems: string, width: string,
 * shadowOffset: {width: number, height: number}, shadowOpacity: number, shadowColor: string},
 * customImage: {width: number, height: number},
 * textStyle: {color: string, textAlign: string, fontWeight: string},
 * textAreaError: {padding: number, borderColor: string, backgroundColor: string, borderRadius: number, borderWidth: number, width: string, borderStyle: string},
 * modalText: {textAlign: string, marginBottom: number},
 * textArea: {padding: number, borderColor: string, backgroundColor: string, borderRadius: number, borderWidth: number, width: string, borderStyle: string}
 * }}
 */
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