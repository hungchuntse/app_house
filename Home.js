import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import auth from '@react-native-firebase/auth';

export default function Home({ navigation }) {

    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();

    function onAuthStateChanged(user) {
        setUser(user);
        if (initializing) setInitializing(false);
    }

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);

    if (initializing) return null;

    if (!user) {
        return navigation.navigate('Login');
    }

    return navigation.navigate('Login')
}

Home.navigationOptions = ({ navigation }) => ({
    title: 'Home',
    headerShown: false,
});