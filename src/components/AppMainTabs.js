import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import ProfileScreen from '../screens/ProfileScreen';
import ActivityScreen from '../screens/ActivityScreen';
import HomeScreen from '../screens/HomeScreen';
import DiscoverScreen from '../screens/DiscoverScreen';
import BookmarksScreen from '../screens/BookmarksScreen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import StringConstants from '../constants/StringConstants';
import Colors from '../constants/Colors';

import Some from 'react-native-vector-icons/FontAwesome';

/**
 * This class is responsible for creating the App Main Tab Navigator.
 * TabBar styling will also be here.
 * 
 * by Gaurav Mittal
 */
const Tab = createBottomTabNavigator();
function AppTabs() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                // Hide the screen header
                headerShown: false,
                tabBarStyle: {
                    // settting design specific color
                    backgroundColor: Colors.BACKGROUND_SCREEN_DARK
                },
                tabBarIcon: ({ focused, color, size }) => {
                    // Choose the icon per tab.
                    // Its best to provide tab icons here, instead of every screen.
                    // That way it'll be easy make any customisations.
                    let iconName;
                    if (route.name === ScreenNames.HOME) {
                        iconName = 'home-variant'
                    } else if (route.name === ScreenNames.DISCOVERY) {
                        iconName = 'compass'
                    } else if (route.name === ScreenNames.ACTIVITY) {
                        iconName = 'timer'
                    } else if (route.name === ScreenNames.BOOKMARKS) {
                        iconName = 'bookmark'
                    } else if (route.name === ScreenNames.PROFILE) {
                        iconName = 'account-circle'
                    }

                    return <MaterialCommunityIcons
                        name={iconName}
                        color={color}
                        size={size} 
                        />;
                },
                tabBarActiveTintColor: Colors.PRIMARY,
                tabBarInactiveTintColor: Colors.PRIMARY_INACTIVE,
            })}
        >
            <Tab.Screen name={ScreenNames.HOME} component={HomeScreen} />
            <Tab.Screen name={ScreenNames.DISCOVERY} component={DiscoverScreen} />
            <Tab.Screen name={ScreenNames.ACTIVITY} component={ActivityScreen} />
            <Tab.Screen name={ScreenNames.BOOKMARKS} component={BookmarksScreen} />
            <Tab.Screen name={ScreenNames.PROFILE} component={ProfileScreen} />
        </Tab.Navigator>
    );
}

// Screen names, can also be used as unique identifiers.
const ScreenNames = {
    HOME: StringConstants.HOME,
    DISCOVERY: StringConstants.DISCOVERY,
    ACTIVITY: StringConstants.ACTIVITY,
    BOOKMARKS: StringConstants.BOOKMARKS,
    PROFILE: StringConstants.PROFILE,
}

export default AppTabs