import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const Profilescherm = () => {
  const navigation = useNavigation();
  return (
    <View>
      <Text>Profilescherm</Text>
    </View>
  );
};

export default Profilescherm;