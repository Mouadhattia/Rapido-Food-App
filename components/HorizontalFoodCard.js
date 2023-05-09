import React from 'react';
import {TouchableOpacity, View, Text, Image} from 'react-native';
import {COLORS, FONTS, icons, SIZES} from '../constants';

const HorizontalFoodCard = ({containerStyle, imageStyle, item, onPress}) => {
  return (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.lightGray2,
        ...containerStyle,
      }}
      onPress={onPress}>
      {/* Image */}
      <Image
        source={{uri: item.img}}
        style={{
          ...imageStyle,
        }}
      />

      {/* Info */}
      <View
        style={{
          flex: 1,
          //marginTop: SIZES.padding
        }}>
        {/* Name */}
        <Text style={{...FONTS.h3, fontSize: 17,color: COLORS.darkGray}}>{item.name}</Text>
        {/* Description */}
        <Text style={{color: COLORS.darkGray2, ...FONTS.body4,}}>
          {item.desc}
        </Text>
        {/* Price */}
        <Text style={{marginTop: SIZES.base, ...FONTS.h2,color: COLORS.darkGray}}>
          {item.price} TND
        </Text>
      </View>

      {/* Calories */}
      <View
        style={{
          flexDirection: 'row',
          position: 'absolute',
          top: 5,
          right: SIZES.radius,
        }}>
        {/* <Image
          source={icons.calories}
          style={{
            width: 30,
            height: 30,
          }}
        />
        <Text style={{...FONTS.body5, color: COLORS.darkGray2}}>
          30 Calories
        </Text> */}
      </View>
    </TouchableOpacity>
  );
};

export default HorizontalFoodCard;
