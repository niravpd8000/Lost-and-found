/**
 *  file: ListItemForm.js
 *  author: Nirav Pravinbhai Dhameliya <ndj585@uregina.ca>
 *  version: 0.1
 *  date-created: March-30-2022
 *  last-modified: April-08-2022
 */
import React, {useEffect, useState} from "react";
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    Picker,
    Text,
    View,
} from "react-native";
import TextField from "../components/TextField";
import CustomButton from "../components/CustomButton";
import ImageUpload from "../components/ImageUpload";
import {postRequest} from "../API/axios";
import {API} from "../API/apis";
import {AuthContext} from "../components/Context";
import ToastMessage from "../components/ToastMessage";
import Loading from "../components/Loading";

/**
 * ListItemForm Screen component
 * @returns {JSX.Element}
 * @constructor
 */
const ListItemForm = ({navigation}) => {
    console.log(ListItemForm)
    const [state, setState] = useState({
        title: "Apple airpods lost",
        itemTypeFound: true,
        images: [
            'https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg?20200913095930',
        ],
        place: "",
        color: "",
        brand: "",
        category: "",
        subCategory: "",
        description: "",
        userId: loginState?.userDetails?.id,
        shareContact: true,
    });
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    /** fetching states from context*/
    const {logout, loginState} = React.useContext(AuthContext);


    useEffect(() => {
        if (errorMessage) {
            setTimeout(() => {
                setErrorMessage("")
            }, 2000)
        }
    }, [errorMessage])

    /**
     * handleChange
     * Purpose: This function used for handling form
     * Parameter(s):
     * Object {name,value}: object with name and value
     * Precondition(s):
     * N/A
     *
     * Returns: N/A
     *
     * Side effect:
     * <1> This function will call when user fill the details
     */
    const handleChange = ({name, value}) => {
        setState({...state, [name]: value});
    };

    /**
     * createItem
     * Purpose: This function used for calling api(API.CREATE_ITEM) for creating an item
     * Parameter(s):
     * N/A
     * Precondition(s):
     * N/A
     *
     * Returns: N/A
     *
     * Side effect:
     * <1> This function will call when user clicks on publish button
     */
    const createItem = async () => {
        const getResponse = () => {
            // setList(response?.data?.data);
            navigation.navigate("Home")
        };
        const getError = (error) => {
            setErrorMessage(error.response.message);
            if (error.response.status === 401) {
                logout();
            }
        };
        try {
            const {title, place, color, brand, category, subCategory, description} = state;
            if (title && place && color && brand && category && subCategory && description) {
                setLoading(true)
                await postRequest(
                    API.CREATE_ITEM,
                    state,
                    getResponse,
                    getError,
                    loginState.accessToken
                );
                setLoading(false)
            } else {
                if (!title)
                    alert("Please fill title")
                else if (!place)
                    alert("Please select place")
                else if (!color)
                    alert("Please select color")
                else if (!brand)
                    alert("Please fill brand")
                else if (!category)
                    alert("Please select category")
                else if (!subCategory)
                    alert("Please select subCategory")
                else if (!description)
                    alert("Please fill description")
                // setErrorMessage("Please fill all required fields")
            }
        } catch (e) {
            console.log(e);
        }
    };
    return (
        <SafeAreaView style={styles.container}>
            {errorMessage ? <ToastMessage message={errorMessage} type={"error"}/> : null}
            {loading ? <Loading/> :
                <ScrollView style={styles.itemContainer}>
                    <View style={styles.box}>
                        {/*<ImageUpload/>*/}
                    </View>
                    <View style={styles.box}>
                        <Text style={styles.subTitle}>Title : </Text>
                        <TextField
                            onChangeText={(value) => handleChange({name: "title", value})}
                            style={styles.inputStyle}
                        />
                    </View>
                    <View style={styles.box}>
                        <Text style={styles.subTitle}>Type : </Text>
                        <Picker
                            selectedValue={state.type}
                            style={{height: 50, borderColor: "white", borderRadius: 10}}
                            onValueChange={(value) => handleChange({name: "itemTypeFound", value})}
                        >
                            <Picker.Item label={"Found"} value={true}/>
                            <Picker.Item label={"Lost"} value={false}/>
                        </Picker>
                    </View>
                    <View style={styles.box}>
                        <Text style={styles.subTitle}>Brand : </Text>
                        <TextField
                            onChangeText={(value) => handleChange({name: "brand", value})}
                            style={styles.inputStyle}
                        />
                    </View>
                    <View style={styles.box}>
                        <Text style={styles.subTitle}>Place : </Text>
                        <Picker
                            selectedValue={state.place}
                            style={{height: 50, borderColor: "white", borderRadius: 10}}
                            onValueChange={(value) => handleChange({name: "place", value})}
                        >
                            <Picker.Item label={"Select Place"} value={""}/>
                            {campusList.map((item, key) => (
                                <Picker.Item key={key} label={item} value={item}/>
                            ))}
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
                            {colors.map((item, key) => (
                                <Picker.Item
                                    color={item.toLowerCase()}
                                    key={key}
                                    label={item}
                                    value={item}
                                />
                            ))}
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
                            {Object.keys(categories).length ?
                                Object.keys(categories).map((item, key) => (
                                    <Picker.Item
                                        color={item.toLowerCase()}
                                        key={key}
                                        label={item}
                                        value={item}
                                    />
                                )) : null}
                        </Picker>
                    </View>
                    <View style={styles.box}>
                        <Text style={styles.subTitle}>Sub Category : </Text>
                        <Picker
                            selectedValue={state.subCategory}
                            style={{height: 50, borderColor: "white", borderRadius: 10}}
                            onValueChange={(value) =>
                                handleChange({name: "subCategory", value})
                            }
                            itemStyle={{backgroundColor: "black"}}
                            disabled={!state.category}
                        >
                            <Picker.Item label={"Select Sub Category"} value={""}/>
                            {state.category &&
                            categories[state.category].length ?
                                categories[state.category].map((item, key) => (
                                    <Picker.Item
                                        color={item.toLowerCase()}
                                        key={key}
                                        label={item}
                                        value={item}
                                    />
                                )) : null}
                        </Picker>
                    </View>
                    <View style={styles.box}>
                        <Text style={styles.subTitle}>Description : </Text>
                        <TextField
                            onChangeText={(value) =>
                                handleChange({name: "description", value})
                            }
                            multiline={true}
                            numberOfLines={5}
                            style={styles.textAreaStyle}
                        />
                    </View>
                    <View style={{alignItems: "center"}}>
                        <View style={{width: 200}}>
                            <CustomButton onClick={createItem} contained>
                                Publish
                            </CustomButton>
                        </View>
                    </View>
                </ScrollView>}
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
 * subTitle: {flex: number, marginBottom: number, fontSize: number, fontWeight: string},
 * inputStyle: {padding: number, backgroundColor: string, borderRadius: number, width: string, marginBottom: number, fontWeight: string, justifyContent: string, height: number},
 * box: {marginVertical: number},
 * label: {color: string, marginBottom: number, fontSize: number, fontWeight: string},
 * textAreaStyle: {padding: number, backgroundColor: string, borderRadius: number, width: string, marginBottom: number, fontWeight: string, justifyContent: string, height: number}
 * }}
 */
const styles = StyleSheet.create({
    container: {
        width: "100%",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    box: {
        marginVertical: 10,
    },
    inputStyle: {
        width: "100%",
        backgroundColor: "#ffffff",
        fontWeight: "bold",
        borderRadius: 5,
        height: 50,
        marginBottom: 20,
        justifyContent: "center",
        padding: 10,
    },
    textAreaStyle: {
        width: "100%",
        backgroundColor: "#ffffff",
        fontWeight: "bold",
        borderRadius: 5,
        height: 100,
        marginBottom: 20,
        justifyContent: "center",
        padding: 20,
    },
    itemContainer: {
        padding: 10,
        width: "100%",
    },
    subTitle: {
        marginBottom: 10,
        fontSize: 14,
        fontWeight: "bold",
        flex: 1,
    },
    input: {
        width: "100%",
        backgroundColor: "#465881",
        color: "white",
        fontWeight: "bold",
        borderRadius: 25,
        height: 50,
        marginBottom: 20,
        justifyContent: "center",
        padding: 20,
    },
    label: {
        color: "#fb5b5a",
        marginBottom: 40,
        fontSize: 50,
        fontWeight: "bold",
    },
    button: {
        width: "100%",
        backgroundColor: "#fb5b5a",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        marginBottom: 10,
    },
    buttonText: {
        color: "#ede8e8",
        fontWeight: "500",
    },
});

export default ListItemForm;

/**
 * colors
 * @type {string[]}
 */
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
    "Charcoal",
];

/**
 * campusList
 * @type {string[]}
 */
const campusList = [
    "Administration - Humanities Building",
    "Campion College",
    "Centre for Kinesiology," + " Health and Sport",
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
    "Other",
];

const categories = {
    "Animals & Pet Supplies": ["Live Animals","Other"],
    "Apparel & Accessories": [
        "Clothing",
        "Clothing Accessories",
        "Costumes & Accessories",
        "Handbag & Wallet Accessories",
        "Jewelry",
        "Shoe Accessories",
        "Shoes","Other"
    ],
    "Cameras & Optics": ["Cameras", "Optics", "Photography","Other"],
    Electronics: [
        "Arcade Equipment",
        "Circuit Boards & Components",
        "Components",
        "Computers",
        "Electronics Accessories",
        "Smartphone & Accessories","Other"
    ],
    Furniture: [
        "Baby & Toddler Furniture",
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
        "Tables","Other"
    ],
    "Home & Garden": [
        "Bathroom Accessories",
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
        "Wood Stoves","Other"
    ],
    "Luggage & Bags": [
        "Backpacks",
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
        "Train Cases","Other"
    ],
    Media: [
        "Books",
        "DVDs",
        "Magazines & Newspapers",
        "Music & Sound Recordings",
        "Product Manuals","Other"
    ],
    "Office Supplies": [
        "Book Accessories",
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
        "Shipping Supplies","Other"
    ],
    "Sporting Goods": [
        "Athletics",
        "Exercise & Fitness",
        "Indoor Games",
        "Outdoor Recreation","Other"
    ],
    "Toys & Games": ["Games", "Outdoor Play Equipment", "Puzzles", "Toys","Other"],
    "Vehicles & Parts": ["Vehicle Parts", "Accessories","Other"],
    "Other": ["Other"]
};
