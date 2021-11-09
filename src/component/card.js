import React from 'react';
import { StyleSheet,View } from 'react-native';

export default function Card(props){
    return (
        <View style={styles.card}>
            <View style={styles.cardContent}>
                {props.children}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    card:{
        width:"90%",
        borderRadius: 15,
        elevation:3,
        flex: 1, 
        backgroundColor:'#fff',
        shadowOffset:{width: 1, height: 1},
        shadowColor:'#333',
        shadowOpacity:0.3,
        shadowRadius: 3, 
        marginVertical:10,
        // justifyContent:'center',
        // position: absolute,
        //  left: -600,
    
    
    
       // marginHorizontal:5
    },
    cardContent :{
        marginHorizontal: 10,
        marginVertical: 10,
        
    }
})