import AsyncStorage from "@react-native-community/async-storage";
import { Alert } from 'react-native';

const get_data = async (key) => {
    try {
        const userInfo = await AsyncStorage.getItem(key)
        const data = JSON.parse(userInfo)
        return data
    } catch (e) {
        console.log('Failed to fetch the data from storage');
    }
}


const save_data = async (key, data) => {
    try {
        await AsyncStorage.setItem(
            key, JSON.stringify(data)
        );
    } catch (error) {
        console.log(error)
    }
}

const Logout = async (navigation) => {
    Alert.alert(
        "Logout",
        "Are you sure you want to Logout?",
        [
            {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
            },
            {
                text: "OK", onPress: () => {
                    try {     
                        AsyncStorage.removeItem("USER").then(() => {
                            navigation.reset({
                                index: 0,
                                routes: [{ name: 'Login' }]
                           })   
                        })
                    } catch (error) {
                        console.log(error)
                    }
                }
            }
        ]
    );

}

export { save_data, get_data, Logout }


