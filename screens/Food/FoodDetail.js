import React, {useEffect} from 'react';
import {View, Text, Image, ScrollView} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import CheckBox from '@react-native-community/checkbox';

import {
  Header,
  IconButton,
  CartQuantityButton,
  IconLabel,
  LineDivider,
  Rating,
  StepperInput,
  TextButton,
} from '../../components';
import Geolocation from '@react-native-community/geolocation';
import {FONTS, SIZES, COLORS, icons, images, dummyData} from '../../constants';
import {addCart} from '../../stores/cart/cartActions';
import {fetchSupp} from '../../stores/supp/suppActions';
import {distanceInKm, formatArray, getCheckedItems} from '../../utils/Utils';

const FoodDetail = ({navigation, route}) => {
  const [isSelected, setSelection] = React.useState({});
  const dispatch = useDispatch();
  const {supplment} = useSelector(state => state.suppReducer);
  const [selectedSize, setSelectedSize] = React.useState('');
  const [foodItem, setFoodItem] = React.useState([]);
  const [qty, setQty] = React.useState(1);
  function generateId() {
    return Math.floor(Math.random() * 100000000000);
  }
  useEffect(() => {
    setSelection(formatArray(supplment));
  }, [supplment]);
  // location
  const {location} = useSelector(state => state.mapReducer);
  const getCurrentPosition = async () => {
    Geolocation.getCurrentPosition(
      position => {
        console.log(position);
        dispatch(getLocation(position));
      },
      error => {
        console.warn(error);
      },
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );
  };
  useEffect(() => {
    if (!location.coords) {
      getCurrentPosition();
    }
  }, [location]);
  useEffect(() => {
    if (!location.coords) {
      getCurrentPosition();
    }
  }, [location]);
  const handleCheckboxChange = name => {
    // Create a new object with the updated `checked` value
    const updatedSelection = {
      ...isSelected,
      [name]: {
        ...isSelected[name],
        checked: !isSelected[name].checked,
      },
    };
    // Update the state with the new object
    setSelection(updatedSelection);
  };
  const {checkedItems, totalPrice} = getCheckedItems(isSelected);

  const handleAddToCart = qty => {
    let id = generateId();
    dispatch(
      addCart({
        item: {
          qty: qty,
          product: {
            ...foodItem,
            price: foodItem.price + totalPrice,
            supplment: checkedItems,
          },
          id: id,
        },
      }),
    );
  };
  React.useEffect(() => {
    let {foodItem} = route.params;
    setFoodItem(foodItem);
  }, []);
  //supplment

  useEffect(() => {
    if (foodItem.id) {
      dispatch(fetchSupp({data: {prodid: foodItem.id}}));
    }
  }, [foodItem.id]);

  // Render

  function renderHeader() {
    return (
      <Header
        title="DETAILS"
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

  function renderDetails() {
    return (
      <View
        style={{
          marginTop: SIZES.radius,
          marginBottom: SIZES.padding,
          paddingHorizontal: SIZES.padding,
        }}>
        {/* Food Card */}
        <View
          style={{
            height: 190,
            borderRadius: 15,
            backgroundColor: COLORS.lightGray2,
          }}>
          {/* Calories & Favourite */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: SIZES.base,
              paddingHorizontal: SIZES.radius,
            }}>
            {/* Calories */}
            <View style={{flexDirection: 'row'}}>
              {/* <Image
                source={icons.calories}
                style={{
                  height: 30,
                  width: 30,
                }}
              /> */}
              {/* <Text style={{color: COLORS.darkGray2, ...FONTS.body4}}>
                70 calories
              </Text> */}
            </View>

            {/* Favourite */}
            {/* <Image
              source={icons.love}
              style={{
                height: 20,
                width: 20,
                tintColor: foodItem?.isFavourite ? COLORS.primary : COLORS.gray,
              }}
            /> */}
          </View>

          {/* Food Image */}
          <Image
            source={{uri: foodItem?.img}}
            resizeMode="contain"
            style={{
              height: 170,
              width: '100%',
            }}
          />
        </View>

        {/* Food Info */}
        <View
          style={{
            marginTop: SIZES.padding,
          }}>
          {/* Name & Description */}
          <Text style={{...FONTS.h1, color: COLORS.darkGray}}>
            {foodItem?.name}
          </Text>

          <Text
            style={{
              marginTop: SIZES.base,
              color: COLORS.darkGray,
              textAlign: 'justify',
              ...FONTS.body3,
            }}>
            {foodItem.desc}
          </Text>

          {/* Ratings & Duration & Shipping */}
          <View
            style={{
              flexDirection: 'row',
              marginTop: SIZES.padding,
            }}>
            {/* Ratings */}
            <IconLabel
              containerStyle={{
                backgroundColor: COLORS.primary,
              }}
              icon={icons.star}
              label="4.5"
              labelStyle={{
                color: COLORS.white,
              }}
            />

            {/* Duration */}
            <IconLabel
              containerStyle={{
                marginLeft: SIZES.radius,
                paddingHorizontal: 0,
              }}
              icon={icons.clock}
              iconStyle={{
                tintColor: COLORS.black,
              }}
              label="30 Mins"
            />

            {/* Shipping */}
            {/* <IconLabel
              containerStyle={{
                marginLeft: SIZES.radius,
                paddingHorizontal: 0,
              }}
              icon={icons.vespa}
              label="Livraison gratuite"
            /> */}
          </View>

          {/* Sizes */}
          <View
            style={{
              flexDirection: 'row',
              marginTop: SIZES.padding,
              alignItems: 'center',
            }}>
            {supplment.length !== 0 && (
              <Text style={{...FONTS.h3, color: COLORS.darkGray}}>
                Supplement :
              </Text>
            )}
          </View>
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'space-around',
              padding: 6,
            }}>
            {supplment.map(supp => (
              <View
                key={supp.id}
                style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={{color: COLORS.darkGray}}>{supp.name} :</Text>

                <CheckBox
                  value={isSelected[supp.name]?.checked}
                  style={{marginLeft: 10}}
                  disabled={false}
                  onValueChange={() => handleCheckboxChange(supp.name)}
                  tintColors={{true: COLORS.primary, false: COLORS.darkGray}}
                />
                <Text style={{color: COLORS.darkGray}}>
                  {' '}
                  {'(' + supp.price + ' Dt) '}{' '}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    );
  }

  function renderRestaurant() {
    const {location} = useSelector(state => state.mapReducer);
    const restaurant = useSelector(state => state.cartReducer.selectedRes);
    const {current} = useSelector(state => state.authReducer);

    return (
      <View
        style={{
          flexDirection: 'row',
          marginVertical: SIZES.padding,
          paddingHorizontal: SIZES.padding,
          alignItems: 'center',
        }}>
        {/* Image */}
        <Image
          source={images.profile}
          style={{
            width: 50,
            height: 50,
            borderRadius: SIZES.radius,
          }}
        />

        {/* Info */}
        <View
          style={{
            flex: 1,
            marginLeft: SIZES.radius,
            justifyContent: 'center',
          }}>
          <Text style={{...FONTS.h3, color: COLORS.gray}}>
            {current.userName}
          </Text>
          <Text style={{color: COLORS.gray, ...FONTS.body4}}>
            {distanceInKm(
              location.coords.latitude,
              location.coords.longitude,
              restaurant?.location?.lat,
              restaurant?.location?.long,
            )}{' '}
            KM loin de vous
          </Text>
        </View>

        {/* Ratings */}
        <Rating
          rating={4}
          iconStyle={{
            marginLeft: 3,
          }}
        />
      </View>
    );
  }

  function renderFooter() {
    return (
      <View
        style={{
          flexDirection: 'row',
          height: 120,
          alignItems: 'center',
          paddingHorizontal: SIZES.padding,
          paddingBottom: SIZES.radius,
        }}>
        <StepperInput
          value={qty}
          onAdd={() => setQty(qty + 1)}
          onMinus={() => {
            if (qty > 1) {
              setQty(qty - 1);
            }
          }}
        />

        <TextButton
          buttonContainerStyle={{
            flex: 1,
            flexDirection: 'row',
            height: 60,
            marginLeft: SIZES.radius,
            paddingHorizontal: SIZES.radius,
            borderRadius: SIZES.radius,
            backgroundColor: COLORS.primary,
          }}
          label="Acheter"
          label2={`${foodItem.price + totalPrice} TND`}
          onPress={() => {
            navigation.navigate('MyCart');
            handleAddToCart(qty);
          }}
        />
      </View>
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

      <ScrollView>
        {/* Food Details */}
        {renderDetails()}

        <LineDivider />

        {/* Restaurant */}
        {renderRestaurant()}
      </ScrollView>

      {/* Footer */}
      <LineDivider />

      {renderFooter()}
    </View>
  );
};

export default FoodDetail;
