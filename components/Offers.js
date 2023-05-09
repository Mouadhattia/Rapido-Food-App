import React from 'react';
import {TouchableOpacity, Image, Text} from 'react-native';
import {SIZES} from '../constants';

const Offers = ({containerStyle, imageStyle, item, onPress}) => {
 
  return (
    <TouchableOpacity
      style={{
        flexDirection: 'row',

        ...containerStyle,
      }}
      onPress={onPress}>
      {/* Image */}
      <RestaurantImage image={{uri: item?.imgPromo}} />
    </TouchableOpacity>
  );
};
const RestaurantImage = props => (
  <>
    <Image
      source={props?.image}
      style={{
        width: '100%',
        height: 170,
        borderRadius: SIZES.radius,
      }}
    />
  </>
);
export default Offers;
