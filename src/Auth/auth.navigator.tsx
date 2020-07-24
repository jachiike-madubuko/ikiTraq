import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './LoginScreen';
import React, { useState } from 'react';

const AuthNavigator = () => {
    const AuthStack = createStackNavigator();

    return (
        <AuthStack.Navigator headerMode="none">
            <AuthStack.Screen
                name="A"
                component={LoginScreen}

            />
        </AuthStack.Navigator>
    );
}


export default AuthNavigator;