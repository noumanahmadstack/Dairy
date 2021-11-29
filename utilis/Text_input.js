import React, { Component } from 'react'
import { View, Text, TouchableOpacity, TextInput } from 'react-native'
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import PropTypes from 'prop-types';
import { AppText } from "./AppText";

// import DatePicker from "react-native-datepicker";

// class FormInput extends Component {
const FormInput = (props) => {

    // static propTypes = {
    //     error: PropTypes.any,
    //     iconName: PropTypes.string,
    //     containerStyle: PropTypes.any,
    //     icon_color: PropTypes.string,
    //     onPress_icon: PropTypes.func,
    //     ForgetPassword: PropTypes.func,
    //     forget: PropTypes.bool,
    //     iconName_s: PropTypes.string,
    //     text_input_container: PropTypes.any,
    // }

    // render() {
    return (
        <View style={[props.containerStyle]} >
            <View style={props.text_input_container}>
                {props.iconName_s !== undefined ?
                    <AntDesign color={props.icon_color} size={18} name={props.iconName_s} />
                    : null}
                <TextInput
                    {...props}
                    autoCapitalize="none"
                    error={false}
                    ref={props.abcRef}
                />

                {props.iconName !== undefined ?
                    <Entypo color={props.icon_color} onPress={props.onPress_icon} size={18} name={props.iconName} />
                    : null}
            </View>
            {props.forget &&
                <TouchableOpacity style={{ margin: 5 }} onPress={props.ForgetPassword}>
                    <Text style={{ textAlign: 'right', marginTop: 10, color: 'grey' }}>Forget password?</Text>
                </TouchableOpacity>
            }
            {props.error && <AppText style={{ color: "red", textAlign: 'center' }} >{props.error}</AppText>}
        </View>
    );
    // }
}


export { FormInput }