import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ImageBackground,
  TextInput,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {IconButton, TextButton} from '../../components';
import {FONTS, SIZES, COLORS, icons, dummyData} from '../../constants';
import {constants} from '../../constants';
import {useDispatch, useSelector} from 'react-redux';
import {fetchMenu} from '../../stores/menu/menuActions';
import {fetchProduct} from '../../stores/product/productActions';
import {ScrollView} from 'react-native-gesture-handler';
import {
  addPharmacy,
  clearPharmacy,
  deletePharmacy,
} from '../../stores/pharmacy/pharmacyActions';
import {useEffect} from 'react';
import {createServices} from '../../stores/services/servicesActions';

const RestoImage = ({img, onPress}) => {
  return (
    <View>
      <ImageBackground
        source={constants.service[0].img}
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
          <Text style={{color: 'black'}}>Pharmacie</Text>
        </View>
      </ImageBackground>
    </View>
  );
};
const PharmacyItems = (pharmacy, handleCreateService) => {
  const dispatch = useDispatch();
  const [phara, setPhara] = React.useState(null);
  useEffect(() => {
    setPhara(null);
  }, [pharmacy]);
  const handleaddPharmacy = () => {
    let id = Math.floor(100000000 + Math.random() * 900000000)
      .toString()
      .substr(0, 8);
    if (phara) {
      dispatch(addPharmacy({name: phara, id: id}));
    }
  };
  return (
    <ScrollView
      style={{
        flex: 1,
        padding: SIZES.padding,
        backgroundColor: COLORS.lightGray2,
      }}>
      {pharmacy.map(item => (
        <View
          key={item.id}
          style={{
            padding: 10,
            borderRadius: 8,
            backgroundColor: 'white',
            marginVertical: 3,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text style={{color: 'black', width: '90%'}}>{item?.name}</Text>
          <IconButton
            icon={icons.cancel}
            containerStyle={{
              width: 30,
              height: 30,
              justifyContent: 'center',
              alignItems: 'center',
              margin: 6,
            }}
            iconStyle={{
              width: 20,
              height: 20,
              tintColor: COLORS.primary,
            }}
            onPress={() => dispatch(deletePharmacy(item.id))}
          />
        </View>
      ))}

      <TextInput
        style={{
          flex: 1,
          borderColor: COLORS.primary,
          borderWidth: 2,
          borderRadius: 8,
          backgroundColor: 'white',
          marginVertical: 3,
          padding: 15,
          color: 'black',
        }}
        value={phara}
        placeholder="..Ajouter médicament"
        placeholderTextColor={COLORS.gray}
        onChangeText={text => setPhara(text)}
      />
      <IconButton
        icon={icons.plus}
        containerStyle={{
          width: 30,
          height: 30,
          justifyContent: 'center',
          alignItems: 'center',
          borderWidth: 1,
          borderRadius: 6,
          borderColor: COLORS.primary,
          margin: 6,
        }}
        iconStyle={{
          width: 20,
          height: 20,
          tintColor: COLORS.primary,
        }}
        onPress={handleaddPharmacy}
      />
      <TextButton
        onPress={()=> {
          if(pharmacy.length !==0 ){
            handleCreateService()
          }
          
        }}
        buttonContainerStyle={{
          height: 60,
          marginTop: SIZES.padding,
          borderRadius: SIZES.radius,
          backgroundColor:pharmacy.length !==0 ? COLORS.primary:COLORS.darkGray2,
        }}
        label="Passer votre commande"
      />
    </ScrollView>
  );
};
const Pharmacy = props => {
  const dispatch = useDispatch();
  const {favories} = useSelector(state => state.favReducer);
  const {current} = useSelector(state => state.authReducer);
  const {pharmacy} = useSelector(state => state.pharmacyReducer);
  const [resItem, setResItem] = useState({});
  const [selectedCategoryId, setSelectedCategoryId] = React.useState(1);
  const [selectedMenuType, setSelectedMenuType] = React.useState(1);
  const [popular, setPopular] = React.useState([]);
  const [recommends, setRecommends] = React.useState([]);
  const [menuList, setMenuList] = React.useState([]);
  const menu = useSelector(state => state.menuReducer.menu);
  const menuName = useSelector(state => state.menuReducer.selectedMenuName);
  const product = useSelector(state => state.productReducer.product);
  const [showFilterModal, setShowFilterModal] = React.useState(false);

  const navigation = useNavigation();

  const handleCreateService = () => {
    let newService = {
      userId: current.id,
      items: pharmacy,
      type: 'pharmacy',
    };

    try {
      dispatch(createServices({services: newService})).then(() => {
        navigation.replace('SuccessService');
        dispatch(clearPharmacy());
      });
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    handleChangeCategory(selectedCategoryId, selectedMenuType);
  }, []);

  React.useEffect(() => {
    if (resItem.name) {
      dispatch(fetchMenu({resname: resItem.id}));
    }
  }, [resItem]);
  React.useEffect(() => {
    dispatch(fetchProduct({menuname: menuName}));
  }, [menuName]);
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

  return (
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
              onPress={() => handleAddFav(resItem.id)}></TouchableOpacity>

            {/* Delivery To */}
            {/* {renderDeliveryTo()} */}
            {/* Sliders */}
            {/* {renderRecommendedSection()} */}
            {/* Food Categories */}
            {/* {renderFoodCategories()} */}

            {/* Services */}
            {/* {renderPopularSection()} */}

            {/* Menu Type */}
            {/* {renderMenuTypes()} */}
            {/* resturants */}
            {/* <FlatList
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
            /> */}
            {PharmacyItems(pharmacy, handleCreateService)}
          </View>
        }
        ListFooterComponent={<View style={{height: 200}} />}
      />
    </View>
  );
};

export default Pharmacy;
