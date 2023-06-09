import React from 'react';
import {View, Text, Image, BackHandler} from 'react-native';

import {TextButton} from '../../components';
import {FONTS, SIZES, COLORS, images} from '../../constants';

const SuccessService = ({navigation}) => {
  React.useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        return true;
      },
    );

    return () => backHandler.remove();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: SIZES.padding,
        backgroundColor: COLORS.white,
      }}>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image
          source={images.success}
          resizeMode="contain"
          style={{
            width: 150,
            height: 150,
          }}
        />

        <Text style={{marginTop: SIZES.padding, ...FONTS.h1}}>
          Félicitations!
        </Text>
        <Text
          style={{
            textAlign: 'center',
            marginTop: SIZES.base,
            color: COLORS.darkGray,
            ...FONTS.body3,
          }}>
          Votre commande a été place avec succès
        </Text>
      </View>

      <TextButton
        label="Done"
        buttonContainerStyle={{
          height: 55,
          marginBottom: SIZES.padding,
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.primary,
        }}
        onPress={() => navigation.navigate('Home')}
      />
    </View>
  );
};

export default SuccessService;
