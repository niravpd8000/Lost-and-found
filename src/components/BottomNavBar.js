import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";

const Tab = createBottomTabNavigator();
const MyTabs= ( ) => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Home" component={Login} />
            <Tab.Screen name="Settings" component={SignUp} />
        </Tab.Navigator>
    );
}

export default MyTabs;