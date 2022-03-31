import React from 'react';
import {AnimatedTabBarNavigator} from 'react-native-animated-nav-tab-bar';
import {HomeStack} from './Stacks';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {colors} from '../constants/colors';
import Profile from "../pages/Profile";
const Tabs = AnimatedTabBarNavigator();

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
        name="Home"
        component={HomeStack}
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <Ionicons
              name="home"
              size={size ? size : 24}
              color={focused ? color : '#222222'}
              focused={focused}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Search"
        component={HomeStack}
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <Ionicons
              name="search"
              size={size ? size : 24}
              color={focused ? color : '#222222'}
              focused={focused}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <Ionicons
              name="person"
              size={size ? size : 24}
              color={focused ? color : '#222222'}
              focused={focused}
              color={color}
            />
          ),
        }}
      />
    </Tabs.Navigator>
  );
};

export default MainStack;
