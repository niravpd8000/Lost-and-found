import React, {useEffect, useState} from "react";
import {SafeAreaView, StyleSheet, ScrollView, Picker, Text, View, Switch, TouchableOpacity} from "react-native";
import TextField from "../components/TextField";
import CustomButton from "../components/CustomButton";
import ImageUpload from "../components/ImageUpload";
import {postRequest} from "../API/axios";
import {API} from "../API/apis";
import {AuthContext} from "../components/Context";
import Ionicons from "react-native-vector-icons/Ionicons";
import ClaimModal from "../components/ClaimModal";
import ItemCard from "../components/ItemCard";
import {useIsFocused} from "@react-navigation/native";

export default ({navigation}) => {
    const isFocused = useIsFocused();
    const {logout, loginState} = React.useContext(AuthContext);
    const [state, setState] = useState("")
    const [itemList, setItemList] = useState([])
    const [selectedClaimItem, setSelectedClaimItem] = React.useState(null);

    useEffect(() => {
        if (state)
            onClickSearch()
    }, [isFocused, state])
    const onClickSearch = async () => {
        const getResponse = (response) => {
            setItemList(response?.data?.data);
        }
        const getError = (error) => {
            console.log("error.response.errorCode", error.response.status)
            if (error.response.status === 401) {
                logout()
            }
        }
        try {
            if (state)
                await postRequest(API.SEARCH_ITEM, {searchKey: state}, getResponse, getError, loginState.accessToken)
            else setItemList([])
        } catch (e) {
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
                {!itemList.length && !state &&
                    <View style={{justifyContent: "center", alignItems: "center", paddingTop: "30%"}}>
                        <Ionicons
                            name="search"
                            size={100}
                            color={'#cfcfcf'}
                        />
                        <Text style={{color: "#cfcfcf"}}>Search the thing you have lost... </Text>
                    </View>}
                {!itemList.length && state &&
                    <View style={{justifyContent: "center", alignItems: "center", paddingTop: "30%"}}>
                        <Ionicons
                            name="post"
                            size={100}
                            color={'#cfcfcf'}
                        />
                        <Text style={{color: "#cfcfcf"}}>Result not available</Text>
                        <Text style={{color: "#cfcfcf"}}>Please search with new keyword</Text>
                    </View>}
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

const styles = StyleSheet.create({
    container: {
        width: "100%", flex: 1, alignItems: 'center', justifyContent: 'center',
    },
    inputStyle: {
        width: "100%",
        backgroundColor: "#ede9e9",
        fontWeight: 'bold',
        borderRadius: 15,
        height: 40,
        marginRight: 15,
        justifyContent: "center",
        padding: 20
    },
    searchHeader: {
        flexDirection: 'row',
        alignItems: "center",
        width: "100%",
        backgroundColor: "#ffffff",
        fontWeight: 'bold',
        height: 64,
        justifyContent: "center",
        paddingVertical: 12,
        paddingHorizontal: 20,
    },
    itemContainer: {
        width: "100%",
        position: "relative",
        padding:20
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

const colors = [
    "White",
    "Yellow",
    "Blue",
    "Red",
    "Green",
    "Black",
    "Brown",
    "Teal",
    "Silver",
    "Purple",
    "Navy blue",
    "Pea green",
    "Gray",
    "Orange",
    "Maroon",
    "Charcoal"
]

const campusList = [
    "Administration - Humanities Building",
    "Campion College",
    "Centre for Kinesiology," +
    " Health and Sport",
    "Classroom Building",
    "College West Building",
    "Day Care",
    "Dr. John Archer Library",
    "Dr. William Riddell Centre",
    "Education Auditorium",
    "Education Building",
    "First Nations University of Canada",
    "Greenhouse Gas Technology Centre",
    "Heating Plant",
    "Kīšik Towers",
    "Laboratory Building",
    "La Cité",
    "Luther College",
    "Paskwāw Tower",
    "Research and Innovation Centre",
    "Wakpá Tower",
    "Parking",
    "Other"
]

const categories = {
    "Animals & Pet Supplies": ["Live Animals"],
    "Apparel & Accessories": ["Clothing",
        "Clothing Accessories",
        "Costumes & Accessories",
        "Handbag & Wallet Accessories",
        "Jewelry",
        "Shoe Accessories",
        "Shoes"],
    "Cameras & Optics": ["Cameras",
        "Optics",
        "Photography"],
    "Electronics": ["Arcade Equipment",
        "Circuit Boards & Components",
        "Components",
        "Computers",
        "Electronics Accessories",
        "Smartphone & Accessories",
    ],
    "Furniture": ["Baby & Toddler Furniture",
        "Beds & Accessories",
        "Benches",
        "Cabinets & Storage",
        "Carts & Islands",
        "Chair Accessories",
        "Chairs",
        "Entertainment Centers & TV Stands",
        "Furniture Sets",
        "Futon Frames",
        "Futon Pads",
        "Futons",
        "Office Furniture",
        "Ottomans",
        "Outdoor Furniture",
        "Outdoor Furniture Accessories",
        "Room Divider Accessories",
        "Room Dividers",
        "Shelving",
        "Shelving > Bookcases & Standing Shelves",
        "Shelving > Wall Shelves & Ledges",
        "Shelving Accessories",
        "Shelving Accessories > Replacement Shelves",
        "Sofa Accessories",
        "Sofas",
        "Table Accessories",
        "Tables",],
    "Home & Garden": ["Bathroom Accessories",
        "Business & Home Security",
        "Decor",
        "Emergency Preparedness",
        "Fireplace & Wood Stove Accessories",
        "Fireplaces",
        "Flood, Fire & Gas Safety",
        "Household Appliance Accessories",
        "Household Supplies",
        "Kitchen & Dining",
        "Lawn & Garden",
        "Lighting",
        "Linens & Bedding",
        "Parasols & Rain Umbrellas",
        "Plants",
        "Smoking Accessories",
        "Umbrella Sleeves & Cases",
        "Wood Stoves",],
    "Luggage & Bags": ["Backpacks",
        "Briefcases",
        "Cosmetic & Toiletry Bags",
        "Diaper Bags",
        "Dry Boxes",
        "Duffel Bags",
        "Fanny Packs",
        "Garment Bags",
        "Luggage Accessories",
        "Messenger Bags",
        "Shopping Totes",
        "Suitcases",
        "Train Cases",],
    "Media": ["Books",
        "DVDs",
        "Magazines & Newspapers",
        "Music & Sound Recordings",
        "Product Manuals",],
    "Office Supplies": ["Book Accessories",
        "Desk Pads & Blotters",
        "Filing & Organization",
        "General Office Supplies",
        "Impulse Sealers",
        "Lap Desks",
        "Name Plates",
        "Office & Chair Mats",
        "Office Carts",
        "Office Equipment",
        "Office Instruments",
        "Paper Handling",
        "Presentation Supplies",
        "Shipping Supplies",],
    "Sporting Goods": ["Athletics",
        "Exercise & Fitness",
        "Indoor Games",
        "Outdoor Recreation",],
    "Toys & Games": ["Games",
        "Outdoor Play Equipment",
        "Puzzles",
        "Toys",],
    "Vehicles & Parts": ["Vehicle Parts", "Accessories"]
}

