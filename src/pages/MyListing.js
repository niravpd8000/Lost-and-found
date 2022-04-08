/**
 *  file: MyListing.js
 *  author: Nirav Pravinbhai Dhameliya <ndj585@uregina.ca>
 *  version: 0.1
 *  date-created: April-04-2022
 *  last-modified: April-08-2022
 */
import React, {useEffect} from "react";
import {SafeAreaView, StyleSheet, ScrollView, RefreshControl, View, Text} from "react-native";
import ItemCard from "../components/ItemCard";
import {getRequest} from "../API/axios";
import {API} from "../API/apis";
import {AuthContext} from "../components/Context";
import Ionicons from "react-native-vector-icons/Ionicons";
import {useIsFocused} from "@react-navigation/native";

export default ({navigation}) => {
    const isFocused = useIsFocused();
    const [list, setList] = React.useState([]);
    const [refreshing, setRefreshing] = React.useState(false);
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
        }
        const getError = (error) => {
            console.log("error.response.errorCode", error.response.status)
            if (error.response.status === 401) {
                logout()
            }
        }
        try {
            await getRequest(API.GET_MY_ITEM_LISTING, getResponse, getError, loginState.accessToken)
        } catch (e) {
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
                {!list.length &&
                    <View style={{justifyContent: "center", alignItems: "center", paddingTop: "30%"}}>
                        <Ionicons
                            onPress={()=>navigation.navigate("Report found or lost")}
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
