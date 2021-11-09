import React, { Component } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import PropTypes from 'prop-types';


export default class CombineText extends Component {
    static propTypes = {
        text: PropTypes.string,
        containerStyle: PropTypes.any,
        onPress: PropTypes.func,
        text1: PropTypes.string,
        text_style: PropTypes.any,
        style: PropTypes.any
    }
    render() {
        return (
            <View style = {[this.props.style, {flexDirection: 'row', alignItems: 'center'}]}>
                <Text style = {{color: 'black'}}>{this.props.text} </Text>
                <TouchableOpacity style={this.props.containerStyle} onPress={this.props.onPress}>
                    <Text style={[{ color: 'black', textAlign: 'center', fontWeight: 'bold' }, this.props.text_style]}>{this.props.text1}</Text>
                </TouchableOpacity>
            </View>
        )
    }
}