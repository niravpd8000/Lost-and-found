/**
 *  file: Home.js
 *  author: Nirav Pravinbhai Dhameliya <ndj585@uregina.ca>
 *  version: 0.1
 *  date-created: March-17-2022
 *  last-modified: April-08-2022
 */
import React, {useEffect} from "react";
import {SafeAreaView, StyleSheet, ScrollView, RefreshControl, View, Text, TouchableOpacity} from "react-native";
import ItemCard from "../components/ItemCard";
import {getRequest} from "../API/axios";
import {API} from "../API/apis";
import {AuthContext} from "../components/Context";
import ClaimModal from "../components/ClaimModal";
import {useIsFocused} from "@react-navigation/native";
import ToastMessage from "../components/ToastMessage";

/**
 * Home screen component
 * @param navigation
 * @param route
 * @returns {JSX.Element}
 */
const Home = ({navigation, route}) => {
    /** initialising states and variables */
    const isFocused = useIsFocused();
    const [list, setList] = React.useState([]);
    const [filteredList, setFilteredList] = React.useState([]);
    const [refreshing, setRefreshing] = React.useState(false);
    const [selectedTab, setSelectedTab] = React.useState("All");
    const [selectedClaimItem, setSelectedClaimItem] = React.useState(null);

    /**
     * onRefresh for refreshing page
     * @type {(function(): void)|*}
     */
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        // wait(2000).then(() => setRefreshing(false));
    }, []);
    /** fetching states from context*/
    const {logout, loginState} = React.useContext(AuthContext);
    /** useEffect will call when component will first time rendering and also for provided dependency */
    useEffect(() => {
        getItemList();
    }, [isFocused])


    /**
     * getItemList
     * Purpose: This function used for calling api(API.GET_CLAIMED_ITEM_LISTING) for fetching items list
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
        const getResponse = (response) => {
            setList(response?.data?.data);
            setFilteredList(response?.data?.data)
        }
        const getError = (error) => {
            if (error.response.status === 401) {
                logout()
            }
        }
        try {
            await getRequest(API.GET_ITEM_LIST, getResponse, getError, loginState.accessToken)
        } catch (e) {
            console.log(e)
        }
    }

    /**
     * onClickTab
     * Purpose: This function is used for filtering items list by type All, lost or report
     * Parameter(s):
     * <1> type: type All, lost or report
     * Precondition(s):
     * N/A
     *
     * Returns: N/A
     *
     * Side effect:
     * <1> This function will call when user clicks on these tabs All, lost or report
     */
    const onClickTab = (type) => {
        if (type === "All")
            setFilteredList(list)
        else
            setFilteredList(list.filter(item => (type === "Lost") === item.itemTypeFound))
        setSelectedTab(type)
    }
    return (
        <SafeAreaView style={styles.container}>
            <View style={{
                flexDirection: 'row',
                width: "100%",
                height: 30,
                paddingHorizontal: 20,
                marginBottom: 10,
                marginTop:20
            }}>
                <TouchableOpacity onPress={() => onClickTab("All")}
                                  style={selectedTab === "All" ? styles.selectedTab : styles.tab}><Text
                    style={{fontWeight: "bold"}}>All</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => onClickTab("Lost")}
                                  style={selectedTab === "Lost" ? styles.selectedTab : styles.tab}><Text
                    style={{fontWeight: "bold"}}>Lost</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => onClickTab("Found")}
                                  style={selectedTab === "Found" ? styles.selectedTab : styles.tab}><Text
                    style={{fontWeight: "bold"}}>Found</Text></TouchableOpacity>
            </View>
            <ScrollView style={styles.itemContainer} refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                />
            }>
                {route.params?.successMessage ?
                    <ToastMessage type={'success'} message={route.params?.successMessage}/> : null}
                <ClaimModal itemData={selectedClaimItem} modalVisible={!!selectedClaimItem} onClose={(refresh) => {
                    setSelectedClaimItem(null)
                    if (refresh)
                        getItemList()
                }}/>
                {filteredList.map((item, key) => <ItemCard
                        key={key}
                        data={item}
                        hideClaimButton={loginState?.userDetails?.id === item?.userId || item.claims.find(i => i.senderId === loginState?.userDetails?.id)}
                        claimed={item.claims.find(i => i.senderId === loginState?.userDetails?.id)}
                        itemTypeFound={item?.itemTypeFound}
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
 *
 * @type {{
 * container: {alignItems: string, flex: number, width: string, justifyContent: string},
 * button: {backgroundColor: string, borderRadius: number, alignItems: string, width: string, marginBottom: number, justifyContent: string, marginTop: number, height: number},
 * itemContainer: {padding: number, width: string},
 * input: {padding: number, backgroundColor: string, color: string, borderRadius: number, width: string, marginBottom: number, fontWeight: string, justifyContent: string, height: number},
 * buttonText: {color: string, fontWeight: string},
 * tab: {backgroundColor: string, color: string, alignItems: string, borderRadius: number, flex: number, justifyContent: string},
 * label: {color: string, marginBottom: number, fontSize: number, fontWeight: string},
 * selectedTab: {backgroundColor: string, color: string, alignItems: string, borderRadius: number, flex: number, justifyContent: string}
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
    tab: {
        justifyContent: "center",
        flex: 1,
        color: "white",
        alignItems: 'center',
        backgroundColor: "#d5d2d2",
        borderRadius: 15
    },
    selectedTab: {
        justifyContent: "center",
        flex: 1,
        color: "white",
        alignItems: 'center',
        backgroundColor: "#fb5b5a",
        borderRadius: 15
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

export default Home;