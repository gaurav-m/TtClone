import React from 'react';
import { View, Text } from 'react-native'


/**
 * Profile Screen
 * Just a place holder for now. Not covered in scope.
 * 
 * by Gaurav Mittal
 */
function ProfileScreen() {
    return (
        <View style={{
            flex: 1,
            backgroundColor: 'steelblue',
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
                Profile Screen is not in scope.
            </Text>
        </View>
    )
}

export default ProfileScreen