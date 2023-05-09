import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {View, Image} from 'react-native';

import {TextButton} from '../../components';
import { SIZES, COLORS, images} from '../../constants';

const Internet = () => {
  const navigation = useNavigation();


  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: SIZES.padding,
        backgroundColor: COLORS.white,
        height:"100%"
      }}>
      <Image
      source={images.cnx}
      style={{
        marginTop: 5,
        height: 350,
        width: 350,
      }}
      />

      <TextButton
        label="essayer à nouveau"
        buttonContainerStyle={{
          height: 55,
          marginBottom: SIZES.padding,
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.primary,
          marginTop:100
        }}
        onPress={() => navigation.navigate('Home')}
      />
    </View>
  );
};

export default Internet;
