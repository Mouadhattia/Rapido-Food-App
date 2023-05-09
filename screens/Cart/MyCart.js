import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {SwipeListView} from 'react-native-swipe-list-view';
import {useDispatch, useSelector} from 'react-redux';

import {
  Header,
  IconButton,
  CartQuantityButton,
  StepperInput,
  FooterTotal,
} from '../../components';
import {FONTS, SIZES, COLORS, icons, dummyData} from '../../constants';
import {deleteFromCart, updateCart} from '../../stores/cart/cartActions';
import {calculateCost, distanceInKm} from '../../utils/Utils';

const MyCart = ({navigation}) => {
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cartReducer.cart);
  const prices = cart.map(item => item.qty * item.product.price);
  const price = prices.reduce((a, b) => a + b, 0);

  const {location} = useSelector(state => state.mapReducer);
  const restaurant = useSelector(state => state.cartReducer.selectedRes);
  const distance = distanceInKm(
    location?.coords.latitude,
    location?.coords.longitude,
    restaurant?.location?.lat,
    restaurant?.location?.long,
  );
  const fee = calculateCost(distance);
  // Handler

  function updateQuantityHandler(newQty, id) {
    dispatch(updateCart({qty: newQty, id}));
  }

  function removeMyCartHandler(id) {
    dispatch(deleteFromCart({id}));
  }

  // Render

  function renderHeader() {
    return (
      <Header
        title="MY CART"
        containerStyle={{
          height: 50,
          marginHorizontal: SIZES.padding,
          marginTop: 40,
        }}
        leftComponent={
          <IconButton
            icon={icons.back}
            containerStyle={{
              width: 40,
              height: 40,
              justifyContent: 'center',
              alignItems: 'center',
              borderWidth: 1,
              borderRadius: SIZES.radius,
              borderColor: COLORS.gray2,
            }}
            iconStyle={{
              width: 20,
              height: 20,
              tintColor: COLORS.gray2,
            }}
            onPress={() => navigation.goBack()}
          />
        }
        rightComponent={<CartQuantityButton quantity={3} />}
      />
    );
  }

  function renderCartList() {
    return (
      <SwipeListView
        data={cart}
        keyExtractor={item => `${item.id}`}
        contentContainerStyle={{
          marginTop: SIZES.radius,
          paddingHorizontal: SIZES.padding,
          paddingBottom: SIZES.padding * 2,
        }}
        disableRightSwipe={true}
        rightOpenValue={-75}
        renderItem={(data, rowMap, key) => (
          <View
            key={key}
            style={{
              height: 100,
              backgroundColor: COLORS.lightGray2,
              ...styles.cartItemContainer,
            }}>
            {/* Food Image */}
            <View
              style={{
                width: 90,
                height: 100,
                marginLeft: -10,
              }}>
              <Image
                source={{uri: data?.item.product.img}}
                resizeMode="contain"
                style={{
                  width: '100%',
                  height: '100%',
                  position: 'absolute',
                  top: 10,
                }}
              />
            </View>

            {/* Food Info */}
            <View
              style={{
                flex: 1,
              }}>
              <Text style={{...FONTS.body3, color: COLORS.darkGray2}}>
                {data?.item.product.name}
              </Text>
              {data.item.product.supplment.map((supp, key) => (
                <Text
                  key={key}
                  style={{
                    ...FONTS.body3,
                    ...FONTS.h5,
                    color: COLORS.darkGray2,
                  }}>
                  +{supp.name} {supp.price} dt
                </Text>
              ))}
              <Text style={{color: COLORS.primary, ...FONTS.h3}}>
                {data?.item.product.price} TND
              </Text>
            </View>

            {/* Quantity */}
            <StepperInput
              containerStyle={{
                height: 50,
                width: 125,
                backgroundColor: COLORS.white,
              }}
              value={data.item.qty}
              onAdd={() => {
                updateQuantityHandler(data?.item.qty + 1, data?.item.id);
              }}
              onMinus={() => {
                if (data.item.qty > 1) {
                  updateQuantityHandler(data?.item.qty - 1, data?.item.id);
                }
              }}
            />
          </View>
        )}
        renderHiddenItem={(data, rowMap) => (
          <IconButton
            containerStyle={{
              flex: 1,
              justifyContent: 'flex-end',
              backgroundColor: COLORS.primary,
              ...styles.cartItemContainer,
            }}
            icon={icons.delete_icon}
            iconStyle={{
              marginRight: 10,
            }}
            onPress={() => removeMyCartHandler(data.item.id)}
          />
        )}
      />
    );
  }

  function renderFooter() {
    return (
      <FooterTotal
        subTotal={price}
        shippingFee={fee}
        total={price + fee}
        onPress={() => {
          if (price !== 0) {
            navigation.navigate('MyCard');
          }
        }}
        shop={() => navigation.navigate('Home')}
      />
    );
  }

  function renderCartVide() {
    return (
      <Text
        style={{
          padding: SIZES.padding,

          textAlign: 'center',
          ...FONTS.body2,
          margin: SIZES.padding,
          color: COLORS.darkGray,
        }}>
        Votre panier est vide
      </Text>
    );
  }
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
      }}>
      {/* Header */}
      {renderHeader()}
      {/* cart vide */}
      {cart.length === 0 && renderCartVide()}
      {/* Cart */}
      {renderCartList()}

      {/* Footer */}
      {renderFooter()}
    </View>
  );
};

const styles = StyleSheet.create({
  cartItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: SIZES.radius,
    paddingHorizontal: SIZES.radius,
    borderRadius: SIZES.radius,
  },
});

export default MyCart;
