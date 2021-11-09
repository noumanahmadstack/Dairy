// 3 Ways to Add Image Icon Inside Navigation Bar in React Native
// https://aboutreact.com/react-native-image-icon-inside-navigation-bar/

import React from 'react';

import { View, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ActionBarImage = () => {
    const navigation = useNavigation()

  return (
    <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => navigation.navigate('CustomerRegister')}>
      <Image
        source={require('../../assets/add-user.png')}
        
        style={{
          width: 30,
          height: 30,
        //   borderRadius: 40 / 2,
          marginLeft: 15,
        }}
      />
    </TouchableOpacity>
  );
};

export default ActionBarImage;
