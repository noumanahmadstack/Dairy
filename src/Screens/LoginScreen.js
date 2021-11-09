import React, { useState,  } from 'react';
import {  View, Text, ToastAndroid, ImageBackground, ScrollView, StatusBar, SafeAreaView } from 'react-native';
import { FormInput } from '../../utilis/Text_input';
import { Btn } from '../../utilis/Btn';
import { loginValidation } from '../../utilis/validation';
import Theme from '../Theme/Theme';
import Loader from "../../utilis/Loader";
import { Login } from "../../utilis/Api/Api_controller";
import { save_data } from "../../utilis/AsyncStorage/Controller";
import content from "../component/urduContent";
const RegisterScreen = ({ navigation }) => {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');
  const [secure, setSecure] = useState(true)
  const submit = async () => {
    let validate = loginValidation(userEmail, userPassword)
    if (validate.valid == false) {
      setErrortext(validate.errors);
    } else {
      setErrortext('');
      setLoading(true)
      let body = {
        UserName: userEmail,
        Password: userPassword
      }
      let resp = await Login(body)
      if (resp !== 'Error') {
        if (resp.data.success == true) {
          await save_data("USER", resp.data)
          setLoading(false)
          ToastAndroid.show("سائن ان کامیاب", ToastAndroid.SHORT)
          navigation.replace('Calender')
        } else {
          ToastAndroid.show("کچھ غلط ہے", ToastAndroid.SHORT)
          setLoading(false)
        }

      } else {
        ToastAndroid.show("کچھ غلط ہے", ToastAndroid.SHORT)
        setLoading(false)
      }
    }

  }
  return (
    <SafeAreaView style={Theme.container}>
      <Loader animating={loading} />
      <StatusBar backgroundColor="#000" />
      <ImageBackground source={require('../../assets/milkbg.jpg')} style={Theme.loginBackground}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View>
            <Text style={Theme.heading}>{content.WelCome}</Text>
          </View>
          <View style={Theme.container}>
            <FormInput
              text_input_container={[Theme.textinput, { marginLeft: 0 }]}
              containerStyle={{ marginLeft: Theme.textinput.marginLeft }}
              style={{ flex: 1, color: 'black' }}
              onChangeText={(userEmail) => { setErrortext(''), setUserEmail(userEmail) }}
              underlineColorAndroid="#0000"
              placeholder={content.EnterUserName}
              selectionColor="#469238"
              placeholderTextColor="#469238"
              keyboardType="email-address"
              blurOnSubmit={false}
              value={userEmail}
              error={errortext === "Please Enter UserName" ? "براہ کرم یوزر نیم درج کریں۔" : null }
            />
            <FormInput
              text_input_container={[Theme.textinput, { marginLeft: 0 }]}
              containerStyle={{ marginLeft: Theme.textinput.marginLeft }}
              style={{ flex: 1, color: 'black' }}
              onChangeText={(UserPassword) => { setErrortext(''), setUserPassword(UserPassword) }}
              underlineColorAndroid="#0000"
              placeholder={content.EnterPassword}
              selectionColor="#469238"
              placeholderTextColor="#469238"
              onPress_icon={() => { setSecure(!secure) }}
              secureTextEntry={secure}
              iconName={secure == false ? "eye" : "eye-with-line"}
              value={userPassword}
              error={errortext === "Please Enter Your Password" ? "برائے مہربانی اپنا پاس ورڈ داخل کریں" : null || errortext === "Password must should contain 6 digits" ? "Password must should contain 6 digits" : null}
            />
          </View>
        </ScrollView>
        <Btn onPress={() => submit()} text={content.SignIn} containerStyle={Theme.btnStyle} textStyle={Theme.btnTextstyle} />
      </ImageBackground>
    </SafeAreaView>

  );
};
export default RegisterScreen;
