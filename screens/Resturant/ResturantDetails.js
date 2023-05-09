import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  ImageBackground,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {HorizontalFoodCard, IconButton} from '../../components';
import {FONTS, SIZES, COLORS, icons, dummyData, images} from '../../constants';

import {useDispatch, useSelector} from 'react-redux';
import {fetchMenu, selectMenu} from '../../stores/menu/menuActions';
import {fetchProduct} from '../../stores/product/productActions';
import {selectRes} from '../../stores/cart/cartActions';
import {createFav, deleteFav, fetchFav} from '../../stores/fav/favActions';

const RestoImage = ({title, img, desc, onPress}) => {
  return (
    <View>
      <ImageBackground
        source={{
          uri: img,
        }}
        style={{height: 250, width: '100%', justifyContent: 'space-between'}}>
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
            margin: 6,
          }}
          iconStyle={{
            width: 20,
            height: 20,
            tintColor: COLORS.gray2,
          }}
          onPress={onPress}
        />
        <View
          style={{
            color: COLORS.black,
            ...FONTS.h2,
            backgroundColor: COLORS.white,
            padding: 12,
            textAlign: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            bordertRadius: 50,
            borderTopRightRadius: 25,
            borderTopLeftRadius: 25,
            backgroundColor: COLORS.lightGray2,
            width: SIZES.width,
          }}>
          <Text style={{color: 'black'}}>{title}</Text>
        </View>
      </ImageBackground>
    </View>
  );
};

const ResturantDetails = props => {
  const dispatch = useDispatch();
  const {favories} = useSelector(state => state.favReducer);
  const {current} = useSelector(state => state.authReducer);
  const {loading} = useSelector(state => state.productReducer);
  const [resItem, setResItem] = useState({});
  const [menuList, setMenuList] = React.useState([]);
  const menu = useSelector(state => state.menuReducer.menu);
  const menuName = useSelector(state => state.menuReducer.selectedMenuName);
  const product = useSelector(state => state.productReducer.product);
  const navigation = useNavigation();

  // location

  React.useEffect(() => {
    dispatch(selectMenu({menuName: null}));
  }, []);

  React.useEffect(() => {
    if (resItem.name) {
      dispatch(fetchMenu({resname: resItem.id}));
    }
  }, [resItem]);
  React.useEffect(() => {
    dispatch(fetchProduct({menuname: menuName}));
  }, [menuName]);

  // Render

  function renderFoodCategories() {
    return (
      <FlatList
        data={menu}
        keyExtractor={item => `${item.id}`}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({item, index}) => (
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              height: 55,
              marginTop: SIZES.padding,
              marginLeft: index == 0 ? SIZES.padding : SIZES.radius,
              marginRight:
                index == dummyData.categories.length - 1 ? SIZES.padding : 0,
              paddingHorizontal: 8,
              borderRadius: SIZES.radius,

              backgroundColor:
                menuName == item.id ? COLORS.primary : COLORS.lightGray2,
            }}
            onPress={() => {
              dispatch(selectMenu({menuName: item.id}));
            }}>
            <Image
              source={{uri: item.img}}
              style={{
                marginTop: 5,
                height: 50,
                width: 50,
              }}
            />

            <Text
              style={{
                alignSelf: 'center',
                marginRight: SIZES.base,
                color: menuName == item.id ? COLORS.white : COLORS.darkGray,
                ...FONTS.h3,
              }}>
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
      />
    );
  }

  React.useEffect(() => {
    let {resItem} = props.route.params;
    setResItem(resItem);
  }, []);
  function fav(id) {
    return favories.some(item => item.id === id);
  }
  const handleAddFav = id => {
    if (fav(id)) {
      let selectedFav = favories.filter(fav => (fav.id = id))[0];

      dispatch(deleteFav({id: selectedFav.favId}));
    } else {
      const data = {
        resId: id,
        userId: current.id,
      };
      dispatch(createFav({data})).then(() =>
        dispatch(fetchFav({data: {id: current.id}})).catch(err =>
          console.log(err),
        ),
      );
    }
  };
  return loading ? (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        width: SIZES.width,
      }}>
      <Text style={{color: COLORS.darkGray, ...FONTS.body2}}>
        Patienter un peu...
      </Text>
      <Image
        source={images.loadingImg}
        style={{
          width: '60%',
          height: '30%',
        }}
      />
    </View>
  ) : (
    <View
      style={{
        flex: 1,
      }}>
      <FlatList
        data={menuList}
        keyExtractor={item => `${item.id}`}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View>
            <RestoImage
              img={resItem.img}
              title={resItem.name}
              onPress={() => navigation.goBack()}
            />
            <TouchableOpacity
              style={{position: 'absolute', right: 10, top: 10}}
              onPress={() => handleAddFav(resItem.id)}>
              <Image
                source={icons.love}
                style={{
                  height: 30,
                  width: 30,
                  tintColor: fav(resItem.id) ? COLORS.primary : COLORS.gray3,
                }}
              />
            </TouchableOpacity>

            {renderFoodCategories()}

            {typeof menuName === 'number' ? (
              <FlatList
                style={{marginTop: SIZES.body1}}
                data={product}
                keyExtractor={item => `${item.id}`}
                showsVerticalScrollIndicator={false}
                renderItem={({item, index}) => {
                  return (
                    <HorizontalFoodCard
                      containerStyle={{
                        height: 130,
                        alignItems: 'center',
                        marginHorizontal: SIZES.padding,
                        marginBottom: SIZES.radius,
                      }}
                      imageStyle={{
                        marginTop: 20,
                        height: 110,
                        width: 110,
                      }}
                      item={item}
                      onPress={() => {
                        navigation.navigate('FoodDetail', {foodItem: item});
                        dispatch(selectRes({restaurant: resItem}));
                      }}
                    />
                  );
                }}
              />
            ) : (
              <Text
                style={{
                  padding: SIZES.padding,

                  textAlign: 'center',
                  ...FONTS.body2,
                  margin: SIZES.padding,
                  color: COLORS.darkGray,
                }}>
                Sélectionner le menu
              </Text>
            )}
          </View>
        }
        ListFooterComponent={<View style={{height: 200}} />}
      />
    </View>
  );
};

export default ResturantDetails;
