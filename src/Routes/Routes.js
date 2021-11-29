import React, { useEffect, useState, useRef } from 'react';

import { TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from "../Screens/LoginScreen";
import CustomerList from "../Screens/CustomerList";
import CustomerScreen from "../Screens/CustomerScreen";
import RegisterationScreen from "../Screens/RegisterationScreen";
import DatePicker from '../Screens/DatePicker';
import ActionBarImage from '../component/actionBarImage';
import content from "../component/urduContent"
import splashScreen from "../Screens/splash";
import { Logout } from "../../utilis/AsyncStorage/Controller";
import MyTabs from "../component/tabs";
import PackageList from "../Screens/PackgingList";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const Stack = createNativeStackNavigator();



export default class Routes extends React.Component {

    render() {
        return (



            <NavigationContainer>

                <Stack.Navigator initialRouteName="splashScreen" >
                    <Stack.Screen name="MyTabs" options={{ headerShown: false }} component={MyTabs} />

                    <Stack.Screen options={{ headerShown: false }} name="splashScreen" component={splashScreen} />
                    <Stack.Screen options={{ headerTitleAlign: "center", title: content.PackgingList, animation: 'slide_from_right' }} name="PackageList" component={PackageList} />
                    <Stack.Screen options={{ headerShown: false, animation: 'slide_from_right' }} name="Login" component={Login} />
                    <Stack.Screen name="Calender" options={{ headerTitleAlign: "center", title: content.DeliveryDate, animation: 'slide_from_right', headerBackVisible: false }} component={DatePicker} />

                </Stack.Navigator>
            </NavigationContainer>

        )
    }
}

