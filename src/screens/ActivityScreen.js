import React from 'react';
import { View, Text } from 'react-native'

/**
 * Activity Screen
 * Just a place holder for now. Not covered in scope.
 * 
 * by Gaurav Mittal
 */
function ActivityScreen() {
    return (
        <View style={{
            flex: 1,
            backgroundColor: 'powderblue',
            justifyContent: 'center',
            alignItems: 'center'
        }}>

            <Text style={{
                fontSize: 24,
                fontWeight: 'bold',
                color: '#000',
            }}>
                PLACEHOLDER
            </Text>

            <Text style={{
                fontSize: 24,
                fontWeight: 'bold',
                color: '#000',
            }}>
                Activity Screen is not in scope.
            </Text>
        </View>
    )
}

export default ActivityScreen