import React, {useEffect} from 'react';
import {View, Text, Image} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useDispatch, useSelector} from 'react-redux';

import {
  Header,
  IconButton,
  FormInput,
  CardItem,
  FooterTotal,
} from '../../components';
import RestaurantItems from '../../components/ResturantItems';
import {FONTS, SIZES, COLORS, icons, dummyData} from '../../constants';
import {deleteCart} from '../../stores/cart/cartActions';
import {createOrder} from '../../stores/order/orderActions';
import {
  calculateCost,
  distanceInKm,
  getAddressFromCoordinates,
} from '../../utils/Utils';

const Checkout = ({navigation, route}) => {
  const cart = useSelector(state => state.cartReducer.cart);
  const restaurant = useSelector(state => state.cartReducer.selectedRes);
  const {location} = useSelector(state => state.mapReducer);
  const prices = cart.map(item => item.qty * item.product.price);
  const price = prices.reduce((a, b) => a + b, 0);
  const {current} = useSelector(state => state.authReducer);
  const distance = distanceInKm(
    location.coords.latitude,
    location.coords.longitude,
    restaurant?.location?.lat,
    restaurant?.location?.long,
  );

  // location
  const getCurrentPosition = async () => {
    Geolocation.getCurrentPosition(
      position => {
        dispatch(getLocation(position));
      },
      error => {
        console.log(error);
      },
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );
  };

  useEffect(() => {
    if (!location.coords) {
      getCurrentPosition();
      getAddressFromCoordinates();
    }
  }, [location]);
  const [ad, setAD] = React.useState('Votre adresse');
  const adresse = async () => {
    let x =
      (await getAddressFromCoordinates(
        location?.coords?.latitude,
        location?.coords?.longitude,
      )) || '';
    setAD(x);
  };
  useEffect(() => {
    adresse();
  }, [location]);

  const fee = Number(calculateCost(distance));
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [couponCode, setCouponCode] = React.useState('');
  const dispatch = useDispatch();
  const handleCreateOrder = () => {
    let newOrder = {
      userName: current.userName,
      items: cart,
      resName: restaurant.name,

      price: price,
      fee: Number(fee),
      totalPrice: price + fee,
      path: {
        form: {
          lat: restaurant.location.lat,
          long: restaurant.location.long,
        },
        to: {
          lat: location.coords.latitude,
          long: location.coords.longitude,
        },
      },
    };
    try {
      dispatch(createOrder({order: newOrder})).then(() => {
        navigation.replace('Success');
        dispatch(deleteCart());
      });
    } catch (error) {
      console.log(error);
    }
  };
  React.useEffect(() => {
    let {selectedCard} = route.params;

    setSelectedCard(selectedCard);
  }, []);

  // Handler

  function selectCardHandler(item) {
    console.log(item);
    setSelectedCard(item);
  }

  // Render

  function renderHeader() {
    return (
      <Header
        title="CHECKOUT"
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
        rightComponent={
          <View
            style={{
              width: 40,
            }}
          />
        }
      />
    );
  }

  function renderDeliveryAddr() {
    return (
      <View
        style={{
          marginTop: SIZES.padding,
        }}>
        <Text style={{...FONTS.h3, color: COLORS.darkGray2}}>
          Delivery Address
        </Text>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: SIZES.radius,
            paddingVertical: SIZES.radius,
            paddingHorizontal: SIZES.padding,
            borderWidth: 2,
            borderRadius: SIZES.radius,
            borderColor: COLORS.lightGray2,
          }}>
          <Image
            source={icons.location1}
            style={{
              width: 40,
              height: 40,
            }}
          />

          <Text
            style={{
              marginLeft: SIZES.radius,
              width: '85%',
              ...FONTS.body3,
              color: COLORS.darkGray2,
            }}>
            {ad}
          </Text>
        </View>
      </View>
    );
  }

  function renderCoupon() {
    return (
      <View
        style={{
          marginTop: SIZES.padding,
        }}>
        <Text style={{...FONTS.h3}}>Add Coupon</Text>

        <FormInput
          inputContainerStyle={{
            marginTop: 0,
            paddingLeft: SIZES.padding,
            paddingRight: 0,
            borderWidth: 2,
            borderColor: COLORS.lightGray2,
            backgroundColor: COLORS.white,
            overflow: 'hidden',
          }}
          placeholder="Coupon Code"
          value={couponCode}
          onChange={value => {
            setCouponCode(value);
          }}
          appendComponent={
            <View
              style={{
                width: 60,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: COLORS.primary,
              }}>
              <Image
                source={icons.discount}
                style={{
                  width: 40,
                  height: 40,
                }}
              />
            </View>
          }
        />
      </View>
    );
  }

  function renderFooter() {
    return (
      <FooterTotal
        subTotal={price}
        shippingFee={fee}
        total={price + fee}
        onPress={() => handleCreateOrder()}
      />
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

      {/* Cards */}
      <KeyboardAwareScrollView
        keyboardDismissMode="on-drag"
        extraScrollHeight={-200}
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: SIZES.padding,
          paddingBottom: 20,
        }}>
        {/* Delivery Address */}
        {renderDeliveryAddr()}

        {/* Coupon */}
        {/* {renderCoupon()} */}
      </KeyboardAwareScrollView>

      {/* Footer */}
      {renderFooter()}
    </View>
  );
};

export default Checkout;
