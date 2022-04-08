import React, {useEffect, useState} from "react";
import {SafeAreaView, StyleSheet, ScrollView, Picker, Text, View, Switch, TouchableOpacity} from "react-native";
import TextField from "../components/TextField";
import CustomButton from "../components/CustomButton";
import ImageUpload from "../components/ImageUpload";
import {postRequest} from "../API/axios";
import {API} from "../API/apis";
import {AuthContext} from "../components/Context";

export default ({navigation}) => {
    const {logout, loginState} = React.useContext(AuthContext);
    const [state, setState] = useState({
        title: "",
        type: true,
        images: ["https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-13-blue-select-2021?wid=470&hei=556&fmt=png-alpha&.v=1645572386470"],
        place: "",
        color: "",
        brand: "",
        category: "",
        subCategory: "",
        description: "",
        userId: loginState?.userDetails?.id,
        shareContact: true
    })

    const handleChange = ({name, value}) => {
        setState({...state, [name]: value})
    }
    const createItem = async () => {
        const getResponse = (response) => {
            // setList(response?.data?.data);
        }
        const getError = (error) => {
            console.log("error.response.errorCode", error.response.status)
            if (error.response.status === 401) {
                logout()
            }
        }
        try {
            await postRequest(API.CREATE_ITEM, state, getResponse, getError, loginState.accessToken)
        } catch (e) {
            console.log(e)
        }
    }
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.itemContainer}>
                <View style={styles.box}>
                    <ImageUpload/>
                </View>
                <View style={styles.box}>
                    <Text style={styles.subTitle}>Title : </Text>
                    <TextField
                        onChangeText={(value) => handleChange({name: "title", value})}
                        style={styles.inputStyle}/>
                </View>
                <View style={styles.box}>
                    <Text style={styles.subTitle}>Type : </Text>
                    <Picker
                        selectedValue={state.type}
                        style={{height: 50, borderColor: "white", borderRadius: 10}}
                        onValueChange={(value) => handleChange({name: "type", value})}
                    >
                        <Picker.Item label={"Found"} value={true}/>
                        <Picker.Item label={"Lost"} value={false}/>
                    </Picker>
                </View>
                <View style={styles.box}>
                    <Text style={styles.subTitle}>Brand : </Text>
                    <TextField
                        onChangeText={(value) => handleChange({name: "brand", value})}
                        style={styles.inputStyle}/>
                </View>
                <View style={styles.box}>
                    <Text style={styles.subTitle}>Place : </Text>
                    <Picker
                        selectedValue={state.place}
                        style={{height: 50, borderColor: "white", borderRadius: 10}}
                        onValueChange={(value) => handleChange({name: "place", value})}
                    >
                        <Picker.Item label={"Select Place"} value={""}/>
                        {campusList.map((item, key) => <Picker.Item key={key} label={item} value={item}/>)}
                    </Picker>
                </View>
                <View style={styles.box}>
                    <Text style={styles.subTitle}>Color : </Text>
                    <Picker
                        selectedValue={state.color}
                        style={{height: 50, borderColor: "white", borderRadius: 10}}
                        onValueChange={(value) => handleChange({name: "color", value})}
                        itemStyle={{backgroundColor: "black"}}

                    >
                        <Picker.Item label={"Select Color"} value={""}/>
                        {colors.map((item, key) => <Picker.Item color={item.toLowerCase()} key={key} label={item}
                                                                value={item}/>)}
                    </Picker>
                </View>
                <View style={styles.box}>
                    <Text style={styles.subTitle}>Category : </Text>
                    <Picker
                        selectedValue={state.category}
                        style={{height: 50, borderColor: "white", borderRadius: 10}}
                        onValueChange={(value) => handleChange({name: "category", value})}
                        itemStyle={{backgroundColor: "black"}}

                    >
                        <Picker.Item label={"Select Category"} value={""}/>
                        {Object.keys(categories).length && Object.keys(categories).map((item, key) => <Picker.Item
                            color={item.toLowerCase()} key={key}
                            label={item}
                            value={item}/>)}
                    </Picker>
                </View>
                <View style={styles.box}>
                    <Text style={styles.subTitle}>Sub Category : </Text>
                    <Picker
                        selectedValue={state.subCategory}
                        style={{height: 50, borderColor: "white", borderRadius: 10}}
                        onValueChange={(value) => handleChange({name: "subCategory", value})}
                        itemStyle={{backgroundColor: "black"}}
                        disabled={!state.category}
                    >
                        <Picker.Item label={"Select Sub Category"} value={""}/>
                        {state.category && categories[state.category].length && categories[state.category].map((item, key) =>
                            <Picker.Item
                                color={item.toLowerCase()} key={key} label={item}
                                value={item}/>)}
                    </Picker>
                </View>
                <View style={styles.box}>
                    <Text style={styles.subTitle}>Description : </Text>
                    <TextField
                        onChangeText={(value) => handleChange({name: "description", value})}
                        multiline={true}
                        numberOfLines={5}
                        style={styles.textAreaStyle}/>
                </View>
                <View style={{alignItems: "center"}}>
                    <View style={{width: 200}}>
                        <CustomButton onClick={createItem} contained>Publish</CustomButton>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        width: "100%", flex: 1, alignItems: 'center', justifyContent: 'center',
    },
    box: {
        marginVertical: 10
    },
    inputStyle: {
        width: "100%",
        backgroundColor: "#ffffff",
        fontWeight: 'bold',
        borderRadius: 5,
        height: 50,
        marginBottom: 20,
        justifyContent: "center",
        padding: 20
    },
    textAreaStyle: {
        width: "100%",
        backgroundColor: "#ffffff",
        fontWeight: 'bold',
        borderRadius: 5,
        height: 100,
        marginBottom: 20,
        justifyContent: "center",
        padding: 20
    },
    itemContainer: {
        padding: 10,
        width: "100%",
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

