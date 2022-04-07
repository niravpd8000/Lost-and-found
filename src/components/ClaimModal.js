import React, {useEffect, useState} from "react";
import {Modal, StyleSheet, Text, Pressable, View, Image} from "react-native";
import TextField from "./TextField";
import ImageSlider from "react-native-image-slider";
import {postRequest} from "../API/axios";
import {API} from "../API/apis";
import {AuthContext} from "./Context";
import ToastMessage from "./ToastMessage";

const ClaimModal = ({modalVisible, onClose, itemData}) => {
    const {logout, loginState} = React.useContext(AuthContext);
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(false);
    const [state, setState] = useState({
        message: "",
        id: itemData?._id
    })

    useEffect(() => {
        setState({...state, id: itemData?._id})
    }, [itemData]);
    const claimItem = async () => {
        const getResponse = () => {
            setMessage("Claimed successful!!!")
            onClose(true)
        }
        const getError = (error) => {
            console.log("error.response.errorCode", error.response.status)
            if (error.response.status === 401) {
                logout()
            }
        }
        try {
            if (state.message)
                await postRequest(API.CLAIM_ITEM, state, getResponse, getError, loginState.accessToken)
            else
                setError(true)
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <>
            {message && <ToastMessage message={message} type={"success"}/>}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={onClose}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <ImageSlider
                            loopBothSides
                            customSlide={({index, item, style}) => (
                                <View key={index} style={[style, styles.customSlide]}>
                                    <Image source={{uri: item}} style={styles.customImage}/>
                                </View>
                            )}
                            images={itemData?.images || []}
                        />
                        <Text style={styles.modalText}>Write a message</Text>
                        <TextField
                            multiline={true}
                            placeholder={"Please share your contact details and a message"}
                            placeholderTextColor={!error ? "#bdbbbb" : "#989797"}
                            numberOfLines={5}
                            onChangeText={(value) => setState({...state, message: value})}
                            style={error ? styles.textAreaError : styles.textArea}/>
                        {error && <Text style={{color: "red"}}>Please enter valid message</Text>}
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={claimItem}
                        >
                            <Text style={styles.textStyle}>Claim</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </>
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
        marginVertical: 15,
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

export default ClaimModal;