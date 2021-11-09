import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
const { width, height } = Dimensions.get('screen');
const colors = ['#6cd2ff', '#4ec0ed', '#32b7e8'];
export default function CircleBackground() {
    return (
        <View style={styles.container}>
            {colors.map((x, i) => (
                <View style={[styles.bgCircle1, {
                    backgroundColor: x,
                    transform: [
                        { translateX: -(width / 2) + (i * width / colors.length) },
                        { translateY: -(width * 0.75) - (i / 0.75 * width / colors.length) }
                    ]
                }]} key={i.toString()} />
            ))}
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        // flex: 1,
    },
    bgCircle1: {
        position: 'absolute',
        height: width * 2.2,
        width: width * 2,
        borderRadius: width,
        left: 0,
        top: 0
    },
})
