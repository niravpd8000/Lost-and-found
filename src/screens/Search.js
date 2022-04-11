/**
 *  file: Search.js
 *  author: Nirav Pravinbhai Dhameliya <ndj585@uregina.ca>
 *  version: 0.1
 *  date-created: April-08-2022
 *  last-modified: April-08-2022
 */
import React, {useEffect, useState} from "react";
import {StyleSheet, ScrollView, Text, View, TouchableOpacity, StatusBar} from "react-native";
import TextField from "../components/TextField";
import {postRequest} from "../API/axios";
import {API} from "../API/apis";
import {AuthContext} from "../components/Context";
import Ionicons from "react-native-vector-icons/Ionicons";
import ClaimModal from "../components/ClaimModal";
import ItemCard from "../components/ItemCard";
import {useIsFocused} from "@react-navigation/native";
import {SafeAreaView} from 'react-native-safe-area-context';
import ItemCardSkeleton from "../components/ItemCardSkeleton";

/**
 * Search screen component
 * @param navigation
 * @returns {JSX.Element}
 * @constructor
 */
const Search = ({navigation}) => {
    /** initialising states and variables */
    const isFocused = useIsFocused();
    const [state, setState] = useState("")
    const [itemList, setItemList] = useState([])
    const [selectedClaimItem, setSelectedClaimItem] = React.useState(null);
    const [loading, setLoading] = useState(false)

    /** fetching states from context*/
    const {logout, loginState} = React.useContext(AuthContext);

    /** useEffect will call when component will first time rendering and also for provided dependency */
    useEffect(() => {
        if (state)
            onClickSearch()
    }, [isFocused, state])

    useEffect(() => {
        // navigation.setOptions({
        //
        //     header: () => (
        //         <View style={styles.searchHeader}>
        //             <TextField
        //                 placeholder={"Search..."}
        //                 placeholderTextColor={"#989797"}
        //                 style={styles.inputStyle} onChangeText={setState}/>
        //             <TouchableOpacity onPress={onClickSearch}>
        //                 <Ionicons
        //                     name="search"
        //                     size={24}
        //                     color={'#222222'}
        //                 />
        //             </TouchableOpacity>
        //         </View>
        //     ),
        // })
    }, [])
    /**
     * onClickSearch
     * Purpose: This function used for calling api(API.SEARCH_ITEM) for searching items
     * Parameter(s):
     * N/A
     * Precondition(s):
     * search keyword state shouldn't be null
     *
     * Returns: N/A
     *
     * Side effect:
     * <1> This function will call user types keyword
     */
    const onClickSearch = async () => {
        setLoading(true)
        const getResponse = (response) => {
            setItemList(response?.data?.data);
            setLoading(false)
        }
        const getError = (error) => {
            setLoading(false)
            if (error.response.status === 401) {
                logout()
            }
        }
        try {
            if (state)
                await postRequest(API.SEARCH_ITEM, {searchKey: state}, getResponse, getError, loginState.accessToken)
            else {
                setItemList([])
                setLoading(false)
            }
        } catch (e) {
            setLoading(false)
            console.log(e)
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.searchHeader}>
                <TextField
                    placeholder={"Search..."}
                    placeholderTextColor={"#989797"}
                    style={styles.inputStyle} onChangeText={setState}/>
                <TouchableOpacity onPress={onClickSearch}>
                    <Ionicons
                        name="search"
                        size={24}
                        color={'#222222'}
                    />
                </TouchableOpacity>
            </View>
            <ScrollView style={styles.itemContainer}>
                {loading ?
                    <View>
                        <ItemCardSkeleton/>
                        <ItemCardSkeleton/>
                        <ItemCardSkeleton/>
                    </View> : null
                }
                {!itemList.length && !state ?
                    <View style={{justifyContent: "center", alignItems: "center", paddingTop: "30%"}}>
                        <Ionicons
                            name="search"
                            size={100}
                            color={'#cfcfcf'}
                        />
                        <Text style={{color: "#cfcfcf"}}>Search the thing you have lost... </Text>
                    </View> : null}
                {!itemList.length && state ?
                    <View style={{justifyContent: "center", alignItems: "center", paddingTop: "30%"}}>
                        <Ionicons
                            name="post"
                            size={100}
                            color={'#cfcfcf'}
                        />
                        <Text style={{color: "#cfcfcf"}}>Result not available</Text>
                        <Text style={{color: "#cfcfcf"}}>Please search with new keyword</Text>
                    </View> : null}
                <ClaimModal itemData={selectedClaimItem} modalVisible={!!selectedClaimItem} onClose={(refresh) => {
                    setSelectedClaimItem(null)
                    if (refresh)
                        onClickSearch()
                }}/>
                {itemList.map((item, key) => <ItemCard
                        key={key}
                        data={item}
                        hideClaimButton={loginState?.userDetails?.id === item?.userId || item.claims.find(i => i.senderId === loginState?.userDetails?.id)}
                        claimed={item.claims.find(i => i.senderId === loginState?.userDetails?.id)}
                        onPressClaimButton={() => {
                            setSelectedClaimItem(item)
                        }}
                        onPress={() => navigation.navigate('Details', {data: item})}
                    />
                )}
            </ScrollView>
        </SafeAreaView>
    );
};

/**
 * Styles
 * @type {{container: {alignItems: string, flex: number, width: string, justifyContent: string}, button: {backgroundColor: string, borderRadius: number, alignItems: string, width: string, marginBottom: number, justifyContent: string, marginTop: number, height: number}, itemContainer: {padding: number, width: string, position: string}, input: {padding: number, backgroundColor: string, color: string, borderRadius: number, width: string, marginBottom: number, fontWeight: string, justifyContent: string, height: number}, buttonText: {color: string, fontWeight: string}, subTitle: {flex: number, marginBottom: number, fontSize: number, fontWeight: string}, inputStyle: {marginRight: number, padding: number, backgroundColor: string, borderRadius: number, width: string, fontWeight: string, justifyContent: string, height: number}, label: {color: string, marginBottom: number, fontSize: number, fontWeight: string}, searchHeader: {paddingVertical: number, backgroundColor: string, alignItems: string, flexDirection: string, width: string, paddingHorizontal: number, fontWeight: string, justifyContent: string, height: number}}}
 */
const styles = StyleSheet.create({
    container: {
        width: "100%", flex: 1,
        // alignItems: 'center',
        // justifyContent: 'center',
        // marginTop: StatusBar.currentHeight
    },
    inputStyle: {
        width: "100%",
        backgroundColor: "#ede9e9",
        fontWeight: 'bold',
        borderRadius: 15,
        height: 40,
        marginRight: 15,
        justifyContent: "center",
        padding: 5,
        marginHorizontal: 5
    },
    searchHeader: {
        flexDirection: 'row',
        alignItems: "center",
        width: "100%",
        backgroundColor: "#ffffff",
        fontWeight: 'bold',
        // height: 64,
        justifyContent: "center",
        paddingVertical: 12,
        // marginTop: 20,
        paddingHorizontal: 40,
    },
    itemContainer: {
        width: "100%",
        position: "relative",
        padding: 20
    },
    subTitle: {
        marginBottom: 10,
        fontSize: 14,
        fontWeight: "bold",
        flex: 1
    },
    input: {
        width: "100%",
        backgroundColor: "#465881",
        color: 'white',
        fontWeight: 'bold',
        borderRadius: 25,
        height: 50,
        marginBottom: 20,
        justifyContent: "center",
        padding: 20
    },
    label: {
        color: "#fb5b5a", marginBottom: 40, fontSize: 50, fontWeight: "bold"
    },
    button: {
        width: "100%",
        backgroundColor: "#fb5b5a",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        marginBottom: 10
    },
    buttonText: {
        color: '#ede8e8', fontWeight: "500"
    }
});

export default Search;