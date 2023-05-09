import React, {useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {FilterModal} from '../';
import {getLocation} from '../../stores/map/mapActions';
import Geolocation from '@react-native-community/geolocation';
import {FONTS, SIZES, COLORS, icons, dummyData, images} from '../../constants';
import RestaurantItems from '../../components/ResturantItems';
import Offers from '../../components/Offers';
import {useDispatch, useSelector} from 'react-redux';
import {
  fetcAllhRes,
  fetchMarket,
  fetchRes,
} from '../../stores/restaurant/resActions';
import {fetchPromo} from '../../stores/promo/promoActions';
import {fetchCat} from '../../stores/category/catActions';
import {fetchService} from '../../stores/service/serviceActions';
import {setAuthToken} from '../../stores/auth/authActions';
import {fetchFav} from '../../stores/fav/favActions';
import {fetchOrder} from '../../stores/order/orderActions';
import {useState} from 'react';
import {
  checkInternetConnection,
  getAddressFromCoordinates,
} from '../../utils/Utils';
import {selectRes} from '../../stores/cart/cartActions';

const Section = ({title, onPress, children}) => {
  return (
    <View>
      {/* Header */}
      <View
        style={{
          flexDirection: 'row',
          marginHorizontal: SIZES.padding,
          marginTop: 30,
          marginBottom: 20,
        }}>
        <Text style={{flex: 1, ...FONTS.h3, color: COLORS.darkGray}}>
          {title}
        </Text>

        <TouchableOpacity onPress={onPress}>
          {/* <Text style={{color: COLORS.primary, ...FONTS.body3}}>Voir Tout</Text> */}
        </TouchableOpacity>
      </View>

      {/* Content */}
      {children}
    </View>
  );
};

const Home = () => {
  const dispatch = useDispatch();
  const restaurants = useSelector(state => state.resReducer.restaurant);

  const promo = useSelector(state => state.promoReducer.promo);
  const category = useSelector(state => state.catReducer.category);
  const service = useSelector(state => state.serviceReducer.service);
  const {token} = useSelector(state => state.authReducer);
  const {current} = useSelector(state => state.authReducer);
  const [catId, setCatId] = useState(null);
  const [ping, setPing] = useState(false);

  // location
  const {location} = useSelector(state => state.mapReducer);
  const getCurrentPosition = async () => {
    Geolocation.getCurrentPosition(
      position => {
        dispatch(getLocation(position));
      },
      error => {
        console.warn(error);
      },
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );
  };

  //adresse
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

  useEffect(() => {
    if (!location.coords) {
      getCurrentPosition();
    }
  }, [location]);

  useEffect(() => {
    if (token) {
      dispatch(setAuthToken({token}));
      dispatch(fetchFav({data: {id: current.id}}));
     
    }

    if (!token) {
      navigation.navigate('SignIn');
    }
  }, [token, current]);
  useEffect(() => {
    if (token) {
      dispatch(fetchRes({catId: catId}));

      dispatch(fetcAllhRes({search: ''}));
      dispatch(fetchPromo());
      dispatch(fetchCat());
      dispatch(fetchService());
      dispatch(fetchMarket());
    }
  }, [token, catId, ping]);

  const [selectedCategoryId, setSelectedCategoryId] = React.useState(1);
  const [selectedMenuType, setSelectedMenuType] = React.useState(1);
  const [popular, setPopular] = React.useState([]);
  const [recommends, setRecommends] = React.useState([]);
  const [menuList, setMenuList] = React.useState([]);

  const [showFilterModal, setShowFilterModal] = React.useState(false);

  const navigation = useNavigation();

  React.useEffect(() => {
    handleChangeCategory(selectedCategoryId, selectedMenuType);
  }, []);

  // Handler

  function handleChangeCategory(categoryId, menuTypeId) {
    // Retrieve the popular menu
    let selectedPopular = dummyData.menu.find(a => a.name == 'Popular');

    // Retrieve the recommended menu
    let selectedRecommend = dummyData.menu.find(a => a.name == 'Recommended');

    // Find the menu based on the menuTypeId
    let selectedMenu = dummyData.menu.find(a => a.id == menuTypeId);

    // Set the popular menu based on the categoryId
    setPopular(
      selectedPopular?.list.filter(a => a.categories.includes(categoryId)),
    );

    // Set the recommended menu based on the categoryId
    setRecommends(
      selectedRecommend?.list.filter(a => a.categories.includes(categoryId)),
    );

    // Set the menu based on the categoryId
    setMenuList(
      selectedMenu?.list.filter(a => a.categories.includes(categoryId)),
    );
  }

  // Render

  function renderSearch() {
    return (
      <View
        style={{
          flexDirection: 'row',
          height: 40,
          alignItems: 'center',
          marginHorizontal: SIZES.padding,
          marginVertical: SIZES.base,
          paddingHorizontal: SIZES.radius,
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.lightGray2,
        }}>
        {/* Icon */}
        <Image
          source={icons.search}
          style={{
            height: 20,
            width: 20,
            tintColor: COLORS.black,
          }}
        />

        {/* Text Input */}
        <TextInput
          style={{
            flex: 1,
            marginLeft: SIZES.radius,
            ...FONTS.body3,
            color: COLORS.darkGray,
          }}
          placeholder="Recherche..."
          placeholderTextColor={COLORS.darkGray2}
        />

        {/* Filter Button */}
        <TouchableOpacity onPress={() => setShowFilterModal(true)}>
          <Image
            source={icons.filter}
            style={{
              height: 20,
              width: 20,
              tintColor: COLORS.black,
            }}
          />
        </TouchableOpacity>
      </View>
    );
  }

  function renderMenuTypes() {
    return (
      <Section
        title="Restaurants"
        onPress={() => console.log('Show all recommended')}>
        {/* <FlatList
        horizontal
        data={dummyData.menu}
        keyExtractor={item => `${item.id}`}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          marginTop: 30,
          marginBottom: 20,
        }}
       
        renderItem={({item, index}) => (
        <TouchableOpacity
          style={{
            marginLeft: SIZES.padding,
            marginRight:
              index == dummyData.menu.length - 1 ? SIZES.padding : 0,
          }}
          onPress={() => {
            setSelectedMenuType(item.id);
            handleChangeCategory(selectedCategoryId, item.id);
          }}>
          <Text
            style={{
              color:
                selectedMenuType == item.id ? COLORS.primary : COLORS.black,
              ...FONTS.h3,
            }}>
            {item.name}
          </Text>
        </TouchableOpacity>
        )}
      /> */}
      </Section>
    );
  }

  function renderRecommendedSection() {
    const {market} = useSelector(state => state.resReducer);
    return (
      <Section
        title="Promotions"
        onPress={() => console.log('Show all recommended')}>
        <FlatList
          data={promo}
          keyExtractor={item => `${item.id}`}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({item, index}) => (
            <Offers
              containerStyle={{
                height: 170,
                width: 170,
                marginLeft: index == 0 ? SIZES.padding : 8,
                marginRight: index == recommends.length - 1 ? SIZES.padding : 0,
                paddingRight: SIZES.radius,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              imageStyle={{
                width: '50%',
                paddingRight: SIZES.radius,
                height: 200,
                borderRadius: SIZES.radius,
              }}
              item={item}
              onPress={() => {
                checkInternetConnection().then(res => {
                  console.log(res);
                  if (res) {
                    getCurrentPosition().then(() =>
                      navigation.navigate('FoodDetail', {foodItem: item}),
                    );

                    dispatch(selectRes({restaurant: market}));
                  } else {
                    navigation.navigate('Internet');
                  }
                });
              }}
            />
          )}
        />
      </Section>
    );
  }

  function renderServecieSection() {
    const {market} = useSelector(state => state.resReducer);
    return (
      <Section
        title="Services"
        // onPress={() =>  navigation.navigate('Pharmacy')}
      >
        <FlatList
          data={service}
          keyExtractor={item => `${item.id}`}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({item, index}) => (
            <Offers
              containerStyle={{
                height: 170,
                width: SIZES.width * 0.85,
                marginLeft: index == 0 ? SIZES.padding : 8,
                marginRight: index == recommends.length - 1 ? SIZES.padding : 0,
                paddingRight: SIZES.radius,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: COLORS.lightGray2,
                borderRadius: SIZES.radius,
              }}
              imageStyle={{
                width: '50%',
                paddingRight: SIZES.radius,
                height: 200,
                borderRadius: SIZES.radius,
              }}
              item={item}
              onPress={() => {
                checkInternetConnection().then(res => {
                  if (res) {
                    if (item.id === 2) {
                      getCurrentPosition().then(() =>
                        navigation.navigate('Pharmacy'),
                      );
                    } else if (item.id === 3) {
                      getCurrentPosition().then(() =>
                        navigation.navigate('Service'),
                      );
                    } else if (item.id === 1) {
                      getCurrentPosition().then(() =>
                        navigation.navigate('ResturantDetails', {
                          resItem: market,
                        }),
                      );
                      navigation.navigate('ResturantDetails', {
                        resItem: market,
                      });
                    }
                  } else {
                    navigation.navigate('Internet');
                  }
                });
              }}
            />
          )}
        />
      </Section>
    );
  }

  function renderFoodCategories() {
    return (
      <FlatList
        data={category}
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
                selectedCategoryId == item.id
                  ? COLORS.primary
                  : COLORS.lightGray2,
            }}
            onPress={() => {
              setSelectedCategoryId(item.id);
              handleChangeCategory(item.id, selectedMenuType);
              setCatId(item.name);
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
                color:
                  selectedCategoryId == item.id
                    ? COLORS.white
                    : COLORS.darkGray,
                ...FONTS.h3,
              }}>
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
      />
    );
  }

  function renderDeliveryTo() {
    return (
      <View
        style={{
          marginTop: SIZES.padding,
          marginHorizontal: SIZES.padding,
        }}>
        <Text
          style={{
            color: COLORS.primary,
            ...FONTS.body3,
          }}>
          Localisation :
        </Text>

        <TouchableOpacity
          onPress={getCurrentPosition}
          style={{
            flexDirection: 'row',
            marginTop: SIZES.base,
            alignItems: 'center',
          }}>
          <Text style={{...FONTS.h3, color: COLORS.darkGray}}>{ad}</Text>
          <Image
            source={icons.down_arrow}
            style={{
              marginLeft: SIZES.base,
              height: 20,
              width: 20,
            }}
          />
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
      }}>
      {/* Search */}
      {renderSearch()}

      {/* Filter */}
      {showFilterModal && (
        <FilterModal
          isVisible={showFilterModal}
          onClose={() => setShowFilterModal(false)}
        />
      )}

      {/* List */}
      <FlatList
        data={menuList}
        keyExtractor={item => `${item.id}`}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View>
            {/* Delivery To */}
            {renderDeliveryTo()}
            {/* Sliders */}
            {renderRecommendedSection()}
            {/* Food Categories */}
            {renderFoodCategories()}

            {/* Services */}
            {/* {renderPopularSection()} */}
            {renderServecieSection()}
            {/* Menu Type */}
            {renderMenuTypes()}
            {/* resturants */}
            <RestaurantItems
              restaurants={restaurants}
              getCurrentPosition={getCurrentPosition}
            />
          </View>
        }
        // renderItem={({item, index}) => {
        //   return (
        //     <HorizontalFoodCard
        //       containerStyle={{
        //         height: 130,
        //         alignItems: 'center',
        //         marginHorizontal: SIZES.padding,
        //         marginBottom: SIZES.radius,
        //       }}
        //       imageStyle={{
        //         marginTop: 20,
        //         height: 110,
        //         width: 110,
        //       }}
        //       item={item}
        //       onPress={() =>
        //         navigation.navigate('FoodDetail', {foodItem: item})
        //       }
        //     />
        //   );
        // }}
        ListFooterComponent={<View style={{height: 200}} />}
      />
    </View>
  );
};

export default Home;
