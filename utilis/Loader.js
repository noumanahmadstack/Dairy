import React from "react";
import { ActivityIndicator, Modal } from "react-native";
import PropTypes from 'prop-types';


export default class Loader extends React.Component {
    static propTypes = {
        animating: PropTypes.bool
    }
    render() {
        return (
            <Modal visible={this.props.animating} transparent={true}>
                <ActivityIndicator style={{ flex: 1 }} size="large" color="green" animating={this.props.animating} />
            </Modal>
        )
    }
}