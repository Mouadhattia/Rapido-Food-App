import React from 'react';
import {View, Text, Platform} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useDispatch} from 'react-redux';

import {TextButton, LineDivider} from '../components';
import {FONTS, SIZES, COLORS, icons, images, dummyData} from '../constants';
import {deleteCart} from '../stores/cart/cartActions';

const FooterTotal = ({subTotal, shippingFee, total, onPress, shop}) => {
  const dispatch = useDispatch();
  return (
    <View>
      {/* Shadow */}
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 0, y: 1}}
        colors={[COLORS.transparent, COLORS.lightGray1]}
        style={{
          position: 'absolute',
          top: -15,
          left: 0,
          right: 0,
          height: Platform.OS === 'ios' ? 200 : 50,
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
        }}
      />

      {/* Order Details */}
      <View
        style={{
          padding: SIZES.padding,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          backgroundColor: COLORS.white,
        }}>
        {/* Subtotal */}
        <View
          style={{
            flexDirection: 'row',
          }}>
          <Text style={{flex: 1, ...FONTS.body3, color: COLORS.darkGray2}}>
            Prix
          </Text>
          <Text style={{...FONTS.h3, color: COLORS.darkGray2}}>
            {subTotal.toFixed(2)}TND
          </Text>
        </View>

        {/* Shipping Fee */}
        <View
          style={{
            flexDirection: 'row',
            marginTop: SIZES.base,
            marginBottom: SIZES.padding,
          }}>
          <Text style={{flex: 1, ...FONTS.body3, color: COLORS.darkGray2}}>
            Frais laivrison
          </Text>
          <Text style={{...FONTS.h3, color: COLORS.darkGray2}}>
            {shippingFee.toFixed(2)}TND
          </Text>
        </View>

        <LineDivider />

        {/* Subtotal */}
        <View
          style={{
            flexDirection: 'row',
            marginTop: SIZES.padding,
          }}>
          <Text style={{flex: 1, ...FONTS.h2, color: COLORS.darkGray2}}>
            Totale:
          </Text>
          <Text style={{...FONTS.h2, color: COLORS.darkGray2}}>
            {total.toFixed(2)}TND
          </Text>
        </View>

        {/* Order */}
        <TextButton
          buttonContainerStyle={{
            height: 60,
            marginTop: SIZES.padding,
            borderRadius: SIZES.radius,
            backgroundColor: subTotal !== 0 ? COLORS.primary : COLORS.gray2,
          }}
          label="Passer votre commande"
          onPress={onPress}
        />
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          {/* <TextButton
            buttonContainerStyle={{
              height: 60,
              marginTop: SIZES.padding,
              borderRadius: SIZES.radius,
              backgroundColor: COLORS.red2,
              width: '100%',
            }}
            label="Supprimer"
            onPress={() => dispatch(deleteCart())}
          /> */}
        </View>
      </View>
    </View>
  );
};

export default FooterTotal;
