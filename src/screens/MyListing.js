/**
 *  file: MyListing.js
 *  author: Nirav Pravinbhai Dhameliya <ndj585@uregina.ca>
 *  version: 0.1
 *  date-created: April-04-2022
 *  last-modified: April-08-2022
 */
import React, {useEffect, useState} from "react";
import {SafeAreaView, StyleSheet, ScrollView, RefreshControl, View, Text} from "react-native";
import ItemCard from "../components/ItemCard";
import {getRequest} from "../API/axios";
import {API} from "../API/apis";
import {AuthContext} from "../components/Context";
import Ionicons from "react-native-vector-icons/Ionicons";
import {useIsFocused} from "@react-navigation/native";
import ItemCardSkeleton from "../components/ItemCardSkeleton";

/**
 * MyListing screen component
 * @param navigation
 * @returns {JSX.Element}
 * @constructor
 */
const MyListing = ({navigation}) => {
    const isFocused = useIsFocused();
    const [list, setList] = React.useState([]);
    const [refreshing, setRefreshing] = React.useState(false);
    const [loading, setLoading] = useState(false)

    const onRefresh = React.useCallback(() => {
        setLoading(true);
        setRefreshing(true);
        getItemList();
    }, []);

    /** fetching states from context*/
    const {logout, loginState} = React.useContext(AuthContext);
    /** useEffect will call when component will first time rendering and also for provided dependency */
    useEffect(() => {
        getItemList();
    }, [isFocused])

    /**
     * getItemList
     * Purpose: This function used for calling api(API.GET_MY_ITEM_LISTING) for fetching user listed items
     * Parameter(s):
     * N/A
     * Precondition(s):
     * N/A
     *
     * Returns: N/A
     *
     * Side effect:
     * <1> This function will call first time when page will render and also when item claims
     */
    const getItemList = async () => {
        setLoading(true);
        const getResponse = (response) => {
            setList(response?.data?.data);
            setLoading(false);
            setRefreshing(false);
        }
        const getError = (error) => {
            setLoading(false);
            setRefreshing(false);
            if (error.response.status === 401) {
                logout()
            }
        }
        try {
            await getRequest(API.GET_MY_ITEM_LISTING, getResponse, getError, loginState.accessToken)
        } catch (e) {
            setLoading(false);
            setRefreshing(false);
            console.log(e)
        }
    }
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.itemContainer} refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                />
            }>
                {loading ?
                    <View>
                        <ItemCardSkeleton/>
                        <ItemCardSkeleton/>
                        <ItemCardSkeleton/>
                    </View> : null
                }
                {!list.length &&
                    <View style={{justifyContent: "center", alignItems: "center", paddingTop: "30%"}}>
                        <Ionicons
                            onPress={() => navigation.navigate("Report found or lost")}
                            name="add"
                            size={100}
                            color={'#fb5b5a'}
                        />
                        <Text style={{color: "#8c8989"}}>You haven't listed any items</Text>
                        <Text style={{color: "#8c8989"}}>Add new item by clicking on + button</Text>
                    </View>}
                {list.map((item, key) => <ItemCard key={key} data={item}
                                                   hideClaimButton={true}
                                                   onPress={() => navigation.navigate('Details', {data: item})}/>
                )}
            </ScrollView>
        </SafeAreaView>
    );
};

/**
 * styles
 * @type {{
 * container: {alignItems: string, flex: number, width: string, justifyContent: string},
 * button: {backgroundColor: string, borderRadius: number, alignItems: string, width: string, marginBottom: number, justifyContent: string, marginTop: number, height: number},
 * itemContainer: {padding: number, width: string},
 * input: {padding: number, backgroundColor: string, color: string, borderRadius: number, width: string, marginBottom: number, fontWeight: string, justifyContent: string, height: number},
 * buttonText: {color: string, fontWeight: string},
 * label: {color: string, marginBottom: number, fontSize: number, fontWeight: string}
 * }}
 */
const styles = StyleSheet.create({
    container: {
        width: "100%", flex: 1, alignItems: 'center', justifyContent: 'center',
    },
    itemContainer: {
        padding: 10,
        width: "100%",
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

export default MyListing;