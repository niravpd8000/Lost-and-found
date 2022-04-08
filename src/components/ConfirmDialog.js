/**
 *  file: ConfirmDialog.js
 *  author: Nirav Pravinbhai Dhameliya <ndj585@uregina.ca>
 *  version: 0.1
 *  date-created: April-08-2022
 *  last-modified: April-08-2022
 */
import React from "react";
import {StyleSheet, View, Text, Modal, TouchableOpacity} from "react-native";
import CustomButton from "./CustomButton";

/**
 * ConfirmDialog component
 * @param modalVisible
 * @param onClose
 * @param message
 * @param onConfirm
 * @returns {JSX.Element}
 * @constructor
 */
const ConfirmDialog = ({modalVisible, onClose, message, onConfirm}) => {
    /**
     * A modal components for confirm the actions
     */
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={onClose}
        >
            <TouchableOpacity onPress={onClose} style={styles.centeredView}>
                <TouchableOpacity activeOpacity={1} style={styles.modalView}>
                    <View style={{width: "100%"}}>
                        <Text style={{color: "#2a2a2a", fontWeight: "bold", fontSize: 18}}>Confirm</Text>
                        <View
                            style={{
                                borderBottomColor: 'black',
                                borderBottomWidth: 1,
                                marginVertical: 5
                            }}
                        />
                        <Text style={{color: "#8c8989", marginVertical: 20}}>{message}</Text>
                        <View
                            style={{
                                borderBottomColor: 'black',
                                borderBottomWidth: 1,
                                marginVertical: 5
                            }}
                        />
                        <View style={{
                            flexDirection: "row",
                            alignItems: "center",
                            height: 30,
                            justifyContent: "flex-end"
                        }}>
                            <CustomButton fontColor={"#000"} buttonStyle={{marginRight: 20}}
                                          onClick={onClose}>Cancel</CustomButton>
                            <CustomButton buttonStyle={{maxWidth: 100}} contained height={30}
                                          onClick={onConfirm}>Confirm</CustomButton>
                        </View>
                    </View>
                </TouchableOpacity>
            </TouchableOpacity>
        </Modal>
    );
};

/**
 *
 * @type {{centeredView: {backgroundColor: string, alignItems: string, flex: number, justifyContent: string}, modalView: {elevation: number, padding: number, margin: number, backgroundColor: string, shadowRadius: number, borderRadius: number, alignItems: string, width: string, shadowOffset: {width: number, height: number}, shadowOpacity: number, shadowColor: string}}}
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
});

export default ConfirmDialog;