import React, { Component } from 'react'
import { Text, View } from 'react-native'
import PropTypes from 'prop-types';
import CheckBox from "@react-native-community/checkbox";

export default class CheckBoxes extends Component {
    static propTypes = {
        text: PropTypes.string,
        value: PropTypes.any,
        onPress: PropTypes.func,
        style : PropTypes.any
    }
    render() {
        return (
            <View style={[{ flexDirection: 'row', alignItems: 'center' }, this.props.style]}>
                <CheckBox
                    value={this.props.value}
                    onValueChange={this.props.onPress}
                    tintColors={{ true: "#E1951E", false: "white" }}
                />
                <Text style={{ color: 'white', flex:1 }}> {this.props.text}</Text>
            </View>

        )
    }
}