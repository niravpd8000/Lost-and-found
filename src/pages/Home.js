import React, {useEffect} from "react";
import {SafeAreaView, StyleSheet, ScrollView, RefreshControl, View, Text, TouchableOpacity} from "react-native";
import ItemCard from "../components/ItemCard";
import {getRequest} from "../API/axios";
import {API} from "../API/apis";
import {AuthContext} from "../components/Context";
import ClaimModal from "../components/ClaimModal";
import {useIsFocused} from "@react-navigation/native";
import ToastMessage from "../components/ToastMessage";

export default ({navigation, route}) => {
    const isFocused = useIsFocused();
    const [list, setList] = React.useState([]);
    const [filteredList, setFilteredList] = React.useState([]);
    const [refreshing, setRefreshing] = React.useState(false);
    const [selectedTab, setSelectedTab] = React.useState("All");
    const [selectedClaimItem, setSelectedClaimItem] = React.useState(null);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false));
    }, []);

    const {logout, loginState} = React.useContext(AuthContext);
    useEffect(() => {
        getItemList();
    }, [isFocused])
    const getItemList = async () => {
        const getResponse = (response) => {
            setList(response?.data?.data);
            setFilteredList(response?.data?.data)
        }
        const getError = (error) => {
            console.log("error.response.errorCode", error.response.status)
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
    const onClickTab = (type) => {
        if (type === "All")
            setFilteredList(list)
        else
            setFilteredList(list.filter(item => (type === "Lost") === item.itemTypeFound))
        setSelectedTab(type)
    }
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.itemContainer} refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                />
            }>
                {route.params?.successMessage ?
                    <ToastMessage type={'success'} message={route.params?.successMessage}/> : null}
                <View style={{
                    flexDirection: 'row',
                    width: "100%",
                    height: 30,
                    marginBottom: 10
                }}>
                    <TouchableOpacity onPress={() => onClickTab("All")}
                                      style={selectedTab === "All" ? styles.selectedTab : styles.tab}><Text>All</Text></TouchableOpacity>
                    <TouchableOpacity onPress={() => onClickTab("Lost")}
                                      style={selectedTab === "Lost" ? styles.selectedTab : styles.tab}><Text>Lost</Text></TouchableOpacity>
                    <TouchableOpacity onPress={() => onClickTab("Found")}
                                      style={selectedTab === "Found" ? styles.selectedTab : styles.tab}><Text>Found</Text></TouchableOpacity>
                </View>
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
