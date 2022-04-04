import React, {useState} from "react";
import {Alert, Modal, StyleSheet, Text, Pressable, View, Image} from "react-native";
import TextField from "./TextField";
import ImageSlider from "react-native-image-slider";

const ClaimModal = ({modalVisible, onClose, itemData}) => {
    return (
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
                        customSlide={({index, item, style, width}) => (
                            // It's important to put style here because it's got offset inside
                            <View key={index} style={[style, styles.customSlide]}>
                                <Image source={{uri: item}} style={styles.customImage}/>
                            </View>
                        )}
                        images={itemData?.images || []}
                    />
                    <Text style={styles.modalText}>Write a message</Text>
                    <TextField
                        multiline={true}
                        numberOfLines={5}
                        style={styles.textArea}/>
                    <Pressable
                        style={[styles.button, styles.buttonClose]}
                    >
                        <Text style={styles.textStyle}>Claim</Text>
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
        marginTop: 22
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

export default ClaimModal;