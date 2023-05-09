import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Image,
} from 'react-native';
import {useSelector} from 'react-redux';
import {COLORS, FONTS, icons, SIZES} from '../../constants';
import {useNavigation} from '@react-navigation/native';
const Favourite = () => {
  const {favories} = useSelector(state => state.favReducer);
  const navigation = useNavigation();
  return (
    <View activeOpacity={1} style={{marginBottom: 30}}>
     { favories.length===0?
      <Text
      style={{
        padding: SIZES.padding,

        textAlign: 'center',
        ...FONTS.body2,
        margin: SIZES.padding,
        color: COLORS.darkGray,
      }}>
    List favoris est vide
    </Text>:
    favories?.map((restaurant, index) => (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('ResturantDetails', {resItem: restaurant})
        }
        key={index}
        style={{
          marginTop: 10,
          padding: 15,
          backgroundColor: 'white',
          borderRadius: SIZES.radius,
        }}>
        <ImageBackground
          source={{uri: restaurant.img}}
          style={{
            width: '100%',
            height: 160,
            borderRadius: SIZES.radius,
            justifyContent: 'flex-end',
          }}>
          <Image
            source={icons.love}
            style={{
              height: 25,
              width: 25,
              tintColor: COLORS.primary,
              position: 'absolute',
              right: 10,
              top: 10,
            }}
          />
          <Text
            style={{
              backgroundColor: COLORS.white,
              color: COLORS.black,
              padding: 6,
              borderRadius: 20,
              alignSelf: 'flex-end',
              margin: 6,
            }}>
            {' '}
            30-45 min
          </Text>
        </ImageBackground>
        <RestaurantInfo name={restaurant.name} rate={restaurant.rating} />
      </TouchableOpacity>
    ))
     }
    
    </View>
  );
};

const RestaurantInfo = props => (
  <View
    style={{
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 10,
    }}>
    <View>
      <Text style={{fontSize: 15, fontWeight: 'bold', color: COLORS.black}}>
        {' '}
        {props.name}
      </Text>
      <Text style={{fontSize: 12, color: COLORS.gray}}>
        ⭐ {props.rate} Trés bien (548)
      </Text>
      <Text style={{fontSize: 11, color: COLORS.gray}}>
      {props?.desc}
      </Text>
    </View>
  </View>
);

export default Favourite;
