import React, {useEffect} from "react";
import {SafeAreaView, StyleSheet, ScrollView, RefreshControl} from "react-native";
import ItemCard from "../components/ItemCard";
import {getRequest} from "../API/axios";
import {API} from "../API/apis";
import {AuthContext} from "../components/Context";
import ClaimModal from "../components/ClaimModal";

export default ({navigation}) => {
    const [list, setList] = React.useState([]);
    const [refreshing, setRefreshing] = React.useState(false);
    const [selectedClaimItem, setSelectedClaimItem] = React.useState(null);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false));
    }, []);

    const {logout, loginState} = React.useContext(AuthContext);
    useEffect(() => {
        getItemList();
    }, [])
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
            await getRequest(API.GET_ITEM_LIST, getResponse, getError, loginState.accessToken)
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
                <ClaimModal itemData={selectedClaimItem} modalVisible={!!selectedClaimItem} onClose={() => {
                    setSelectedClaimItem(null)
                }}/>
                {list.map((item, key) => <ItemCard
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
