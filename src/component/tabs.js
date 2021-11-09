import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { View, Text, TouchableOpacity, Button } from 'react-native';
import CustomerList from "../Screens/CustomerList";
import PackageList from "../Screens/PackgingList";
import AddCustomer from '../Screens/CustomerScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import content from "../component/urduContent"
import ViewReport from "../Screens/ViewReport";
import AddPackging from '../Screens/AddPackging';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Logout } from "../../utilis/AsyncStorage/Controller";
import { useNavigation } from '@react-navigation/native';
const Tab = createBottomTabNavigator();
const MyTabs = ({ route, navigation }) => {
  const navigate = useNavigation();
  return (


    <Tab.Navigator>
      <Tab.Screen initialParams={route.params.date} options={{
        title: content.CustomersList,
        headerRight: () => <TouchableOpacity style={{ padding: 5 }} onPress={async () => { await Logout(navigation) }}><AntDesign name='logout' size={16} /></TouchableOpacity>,
        tabBarLabel: content.CustomersList,
        headerTitleAlign: "center",
        tabBarLabelStyle: { color: '#3489eb' },
        tabBarIcon: ({ color, size }) => (
          <Feather name="users" color={'#3489eb'} size={size} />
        ),
      }} name="CustomerList" component={CustomerList} />
      <Tab.Screen options={{
        headerRight: ({ route }) => <TouchableOpacity style={{ padding: 5 }} onPress={() => navigation.navigate('PackageList')}><AntDesign name='profile' size={24} /></TouchableOpacity>,
        headerTitleAlign: "center",
        title: content.Packging,
        tabBarLabel: content.AddPackagingsize,
        tabBarLabelStyle: { color: '#3489eb' },
        tabBarIcon: ({ color, size }) => (
          <Feather name="package" color={'#3489eb'} size={size} />
        ),
      }} name="AddPackging" component={AddPackging} />

      <Tab.Screen options={{
        headerTitleAlign: "center",
        title: content.AddCustomer,
        tabBarLabel: content.AddCustomer,
        tabBarLabelStyle: { color: '#3489eb' },
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="md-person-add-sharp" color={'#3489eb'} size={size} />
        ),
      }} name="CustomerScreen" component={AddCustomer} />

      <Tab.Screen options={{
        headerTitleAlign: "center",
        title: content.Report,
        tabBarLabel: content.ViewReport,
        tabBarLabelStyle: { color: '#3489eb' },
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="md-receipt" color={'#3489eb'} size={size} />
        ),
      }} name="ViewReport" component={ViewReport} />


    </Tab.Navigator>
  );
}
export default MyTabs;