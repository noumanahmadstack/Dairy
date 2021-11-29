import React, { useState } from 'react';
import { StyleSheet, View, Text, ImageBackground } from 'react-native';
import { FormInput } from '../../utilis/Text_input';
import Theme from '../Theme/Theme';
import { Btn } from "../../utilis/Btn";
import { Signup_validation } from '../../utilis/validation';
import CombineText from "../../utilis/CombineText";
const RegisterScreen = ({ navigation }) => {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [confirmpassword, setconfirmpassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');



  const submit = () => {
    let validate = Signup_validation(userName, userEmail, userPassword, confirmpassword);
    if (validate.valid == false) {
      //this.setState({ errors: validate.errors })
      setErrortext(validate.errors);
    } else {
      setErrortext('');
      // ToastAndroid.show("User Sgnin Successfully", ToastAndroid.LONG)
      navigation.navigate('Login')
    }
  }

  return (

    <View style={Theme.registerationContainer}>
      <ImageBackground source={require('../../assets/milkbg.jpg')} style={Theme.loginBackground} >
        {/* <Loader loading={loading} /> */}

        <View style={Theme.container}>
          <Text style={Theme.heading}>REGISTER</Text>
        </View>


        <FormInput
          style={Theme.textinput}
          onChangeText={(userName) => { setUserName({ errors: '' }), setUserName(userName) }}
          underlineColorAndroid="#0000"
          placeholder="Enter Name"
          selectionColor="#469238"
          placeholderTextColor="#469238"
          autoCapitalize="sentences"
          error={errortext === "Please enter your name" ? "Please enter your name" : null || errortext === "Name must should contain 3 letters" ? "Name must should contain 3 letters" : null}
        />



        <FormInput
          style={Theme.textinput}
          onChangeText={(userEmail) => { setUserEmail({ errors: '' }), setUserEmail(userEmail) }}
          underlineColorAndroid="#0000"
          placeholder="Enter Email"
          selectionColor="#469238"
          placeholderTextColor="#469238"
          keyboardType="email-address"
          error={errortext === "Please Enter Your Email" ? "Please Enter Your Email" : null || errortext === "Email format is invalid" ? "Email format is invalid" : null}
        />


        <FormInput
          style={Theme.textinput}
          onChangeText={(userPassword) => { setUserPassword({ errors: '' }), setUserPassword(userPassword) }}
          underlineColorAndroid="#0000"
          placeholder="Enter Password"
          selectionColor="#469238"
          placeholderTextColor="#469238"
          secureTextEntry={true}
          error={errortext === "Please Enter Your Password" ? "Please Enter Your Password" : null || errortext === "Password must should contain 6 digits" ? "Password must should contain 6 digits" : null}
        />



        <FormInput
          style={Theme.textinput}
          onChangeText={(confirmpassword) => { setconfirmpassword({ errors: '' }), setconfirmpassword(confirmpassword) }}
          underlineColorAndroid="#0000"
          placeholder="Confirm Password"
          selectionColor="#469238"
          placeholderTextColor="#469238"
          secureTextEntry={true}
          error={errortext === "Please enter your confirm password" ? "Please enter your confirm password" : null || errortext === "Password doesn't match" ? "Password doesn't match" : null}
        />
        <Btn onPress={() => submit()} text="SignUp" containerStyle={Theme.btnStyle} textStyle={Theme.btnTextstyle} />
        <CombineText text="Already have an account?" text1="Login" onPress={() => { submit() }} />
        {/* <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
              <Text style={{ fontWeight: 'bold' }}>Already have an account?</Text>
              <TouchableOpacity
                onPress={() => { submit() }}
                activeOpacity={0.5}>
                <Text style={{ color: '#469238', fontWeight: 'bold', marginLeft: 5 }}>Login</Text>
              </TouchableOpacity>
            </View> */}


      </ImageBackground>
    </View>

  );
};
export default RegisterScreen;

const styles = StyleSheet.create({
  SectionStyle: {
    flexDirection: 'row',
    height: 50,
    marginTop: 20,
    marginLeft: 100,
    // marginRight: 35,
    margin: 10,
  },
  SectionStyle1: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 50,
    //borderBottomLeftRadius:60,
    backgroundColor: '#f76d78',
    height: 200,
    width: '100%',
    marginTop: 20,
  },
  buttonStyle: {
    backgroundColor: '#469238',
    // borderWidth: 2,
    color: '#fff',
    //borderColor: '#FE3C47',
    height: 50,
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: -35,
    marginRight: 55,

    marginTop: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 4
  },
  button: {
    borderColor: '#32c5d2',
    borderWidth: 2,

    height: 45,
    borderRadius: 50,
    marginLeft: -35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 1
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30
  },
  buttonTextStyle: {
    color: '#ffffff',
    //lineHeight:15,
    paddingVertical: 12,
    fontSize: 18,
    fontWeight: 'bold'
  },
  inputStyle: {
    backgroundColor: "#ffffff",
    flex: 1,
    color: '#000',
    marginRight: -35,
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 25,
    borderColor: '#dadae8',
    fontWeight: 'bold'
  },
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
  },
  successTextStyle: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    padding: 30,
  },
});