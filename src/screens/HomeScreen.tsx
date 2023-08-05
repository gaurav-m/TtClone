import React, { useState, useEffect} from 'react';
import { View, Text, StyleSheet, ToastAndroid } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/FontAwesome';
import DeviceConfig from '../Config'
import Colors from '../constants/Colors';
import FlashcardScreen from './FlashcardScreen';
import McqScreen from './McqScreen';
import StringConstants from '../constants/StringConstants';
import { DimensionConstants } from '../constants/DimensionConstants';

const Tab = createMaterialTopTabNavigator();

function HomeScreen() {
    return (
        <View style={styles.containerParent}>
            <Tab.Navigator
                screenOptions={{
                    swipeEnabled: false,
                    animationEnabled: false,
                    tabBarActiveTintColor: Colors.PRIMARY,
                    // tabBarInctiveTintColor: Colors.PRIMARY_INACTIVE,
                    tabBarLabelStyle: styles.tabBarLabelStyle,
                    tabBarItemStyle: styles.tabBarItemStyle,
                    tabBarStyle: styles.tabBarStyle,
                    tabBarContentContainerStyle: styles.tabBarContentContainerStyle,
                    tabBarIndicatorStyle: styles.tabBarIndicatorStyle,
                    tabBarIndicatorContainerStyle: styles.tabBarIndicatorContainerStyle
                }} >
                <Tab.Screen name={StringConstants.FOLLOWING} component={FlashcardScreen} />
                <Tab.Screen name={StringConstants.FOR_YOU} component={McqScreen} />
            </Tab.Navigator >
            <TopBar />
        </View>
    );
}

const TopBar = () => {
    const [timerCount, setTimerCount] = useState(0);
    const [timerText, setTimerText] = useState(readableTimeCount(timerCount));

    useEffect(() => {

        //Implementing the setInterval method
        const interval = setInterval(() => {
            setTimerCount(timerCount + 1);
            setTimerText(readableTimeCount(timerCount))
        }, 1000);

        //Clearing the interval
        return () => clearInterval(interval);
    }, [timerCount]);


    return <View style={styles.containerTopBar}>
        <View style={styles.containerTimer}>
            <MaterialCommunityIcons
                name="timer"
                color={Colors.PRIMARY_INACTIVE}
                size={22}
            />
            <Text style={styles.textTimer}>
                {timerText}
            </Text>
        </View>
        <View style={styles.containerSearch}>
            <Icon
                name="search"
                color={Colors.PRIMARY}
                size={22}
                onPress={() => showToast('Search Pressed')}
            />
        </View>
    </View>
}

function readableTimeCount(timeCount: number) {
    if (timeCount >= 60)
        //return Math.trunc(timeCount / 60) + 'm' + (timeCount % 60) + 's';
        return Math.trunc(timeCount / 60) + 'm';
    else
        return timeCount + 's';
}

const TabWidth = 88
const TabIndicatorWidth = 32
const styles = StyleSheet.create({
    containerParent: {
        flex: 1,
    },
    containerTopBar: {
        position: 'absolute',
        width: '100%',
        marginTop: DimensionConstants.MARGIN_TOP_HOME_CONTENT,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingTop: 12,
        padding: 8,
    },
    containerTimer: {
        alignItems: 'center',
        flexDirection: 'row',
        padding: 4,
    },
    containerSearch: {
        padding: 4,
    },
    textTimer: {
        marginStart: 4,
        fontSize: 16,
        fontWeight: '400',
        color: Colors.PRIMARY_INACTIVE,
    },
    tabBarStyle: {
        position: 'absolute',
        marginTop: DimensionConstants.MARGIN_TOP_HOME_CONTENT,
        width: '100%',
        elevation: 0,
        backgroundColor: 'transparent'
    },
    tabBarItemStyle: {
        width: TabWidth,
        padding: 0,
        height: 42,
    },
    tabBarLabelStyle: {
        fontSize: 16,
        fontWeight: '600',
        textTransform: 'none'
    },
    tabBarIndicatorContainerStyle: {
        left: (DeviceConfig.deviceWidth / 2) - TabWidth,
    },
    tabBarIndicatorStyle: {
        width: TabIndicatorWidth,
        marginHorizontal: (TabWidth - TabIndicatorWidth) / 2,
        height: 5,
        borderRadius: 2,
        backgroundColor: Colors.PRIMARY,
    },
    tabBarContentContainerStyle: {
        justifyContent: 'center',
    }
});

const showToast = (toastMessage: string) => {
    ToastAndroid.show(toastMessage, ToastAndroid.SHORT);
}

export default HomeScreen