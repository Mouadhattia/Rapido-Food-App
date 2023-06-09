import React from 'react';
import {View, Image, Text, StyleSheet, TextInput} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  Header,
  IconButton,
  TextButton,
  Rate,
  OrderStatus,
} from '../../components';
import {
  COLORS,
  SIZES,
  FONTS,
  icons,
 
} from '../../constants';
import logo from '../../assets/images/hot_delivery.png';
import {useDispatch} from 'react-redux';
import {addComment} from '../../stores/comment/commentActions';

const Review = ({navigation}) => {
  const dispatch = useDispatch();
  const [rating, setRating] = React.useState(0);
  //   const [tips, setTips] = React.useState(0);
  const [comment, setComment] = React.useState('');
  const handleAdComment = () => {
    dispatch(addComment({data: {comment: comment, rate: rating}}))
      .then(() => navigation.goBack())
      .catch(err => console.log(err));
  };
  function renderHeader() {
    return (
      <Header
        title="VOTRE AVIS"
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
        rightComponent={<View style={{width: 40}} />}
      />
    );
  }

  function renderRiderInfo() {
    return (
      <View
        style={{
          marginTop: SIZES.radius,
          alignItems: 'center',
        }}>
        <Image
          source={logo}
          style={{
            width: 100,
            height: 110,
          }}
        />
        {/* <Text style={{marginTop: SIZES.radius, ...FONTS.h2}}>
          {dummyData.deliveryMan.name}
        </Text> */}
        <Text style={{...FONTS.body3}}>Rapido</Text>

        <OrderStatus status="delivered" />
      </View>
    );
  }

  function renderRatingForm() {
    return (
      <View
        style={{
          flex: 1,
          marginTop: SIZES.padding,
          marginHorizontal: SIZES.padding,
        }}>
        {/* Rating */}
        <View
          style={{
            alignItems: 'center',
          }}>
          <Text style={{...FONTS.body3}}>
            Veuillez évaluer le service de livraison
          </Text>
          <Rate
            containerStyle={{
              marginTop: SIZES.base,
            }}
            rating={rating}
            onChange={rating => setRating(rating)}
          />
        </View>

        {/* Tips */}
        {/* <View
          style={{
            marginTop: SIZES.padding,
          }}>
          <Text style={{...FONTS.h3}}>Add Tips</Text>
          <View
            style={{
              flexDirection: 'row',
              marginTop: SIZES.base,
              justifyContent: 'space-between',
            }}>
            {constants.tips.map((item, index) => {
              return (
                <TextButton
                  key={`Tips-${index}`}
                  buttonContainerStyle={
                    tips === item.value
                      ? {...styles.selectedBtnStyle}
                      : {...styles.unselectedBtnStyle}
                  }
                  label={item.label}
                  labelStyle={
                    tips === item.value
                      ? {...styles.selectedLabelStyle}
                      : {...styles.unselectedLabelStyle}
                  }
                  onPress={() => setTips(item.value)}
                />
              );
            })}
          </View>
        </View> */}

        {/* Comments */}
        <View
          style={{
            flex: 1,
            marginTop: SIZES.padding,
            paddingHorizontal: SIZES.padding,
            paddingVertical: SIZES.radius,
            borderRadius: SIZES.radius,
            backgroundColor: COLORS.lightGray2,
          }}>
          <TextInput
            style={{
              flex: 1,
              ...FONTS.body3,
            }}
            rows={5}
            multiline={true}
            placeholder="Add a comment"
            onChangeText={e => setComment(e)}
          />
        </View>
      </View>
    );
  }

  function renderFooter() {
    return (
      <View
        style={{
          marginBottom: SIZES.padding,
          paddingHorizontal: SIZES.padding,
        }}>
        <TextButton
          buttonContainerStyle={{
            height: 60,
            ...styles.selectedBtnStyle,
          }}
          label="Submit Review"
          labelStyle={{
            color: COLORS.white,
            ...FONTS.h3,
          }}
          onPress={() => handleAdComment()}
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
      {renderHeader()}

      <KeyboardAwareScrollView
        keyboardDismissMode="on-drag"
        contentContainerStyle={{
          flex: 1,
          paddingBottom: SIZES.padding,
        }}>
        {renderRiderInfo()}
        {renderRatingForm()}
      </KeyboardAwareScrollView>

      {renderFooter()}
    </View>
  );
};

const styles = StyleSheet.create({
  selectedBtnStyle: {
    backgroundColor: COLORS.primary,
    padding: SIZES.radius,
    borderRadius: 10,
  },
  unselectedBtnStyle: {
    borderColor: COLORS.gray2,
    borderWidth: 1,
    padding: SIZES.radius,
    backgroundColor: COLORS.white,
    borderRadius: 10,
  },
  selectedLabelStyle: {
    ...FONTS.body3,
    color: COLORS.white,
  },
  unselectedLabelStyle: {
    ...FONTS.body3,
    color: COLORS.gray2,
  },
});

export default Review;
