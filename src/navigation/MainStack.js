/**
 *  file: MainStack.js
 *  author: Nirav Pravinbhai Dhameliya <ndj585@uregina.ca>
 *  version: 0.1
 *  date-created: March-22-2022
 *  last-modified: April-08-2022
 */
import React from 'react';
import {AnimatedTabBarNavigator} from 'react-native-animated-nav-tab-bar';
import {HomeStack, ProfileStack, SearchStack} from './Stacks';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {colors} from '../constants/colors';

const Tabs = AnimatedTabBarNavigator();

/**
 * MainStack Tab Navigation
 * @returns {JSX.Element}
 * @constructor
 */
const MainStack = () => {
    return (
        <Tabs.Navigator
            tabBarOptions={{
                activeTintColor: colors.white,
                inactiveTintColor: colors.black,
                tabStyle: {backgroundColor: colors.white},
            }}
            appearance={{
                activeTabBackgrounds: [
                    colors.primary,
                    colors.primary,
                    colors.primary,
                    colors.primary,
                ],
            }}>
            <Tabs.Screen
                name="HomeStack"
                component={HomeStack}
                options={{
                    title:'Home',
                    tabBarIcon: ({focused, color, size}) => (
                        <Ionicons
                            name="home"
                            size={size ? size : 24}
                            color={focused ? color : '#222222'}
                            focused={focused}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="SearchStack"
                component={SearchStack}
                options={{
                    title:'Search',
                    tabBarIcon: ({focused, color, size}) => (
                        <Ionicons
                            name="search"
                            size={size ? size : 24}
                            color={focused ? color : '#222222'}
                            focused={focused}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="ProfileStack"
                component={ProfileStack}
                options={{
                    title:'Profile',
                    tabBarIcon: ({focused, color, size}) => (
                        <Ionicons
                            name="person"
                            size={size ? size : 24}
                            color={focused ? color : '#222222'}
                            focused={focused}
                        />
                    ),
                }}
            />
        </Tabs.Navigator>
    );
};

export default MainStack;
