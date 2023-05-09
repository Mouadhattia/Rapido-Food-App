import React, { useEffect } from 'react';
import {View, Text, TouchableOpacity, Image, ScrollView} from 'react-native';
import Location from '../Location/Location';
import FilterModal from '../Home/FilterModal';
import RestaurantItems from '../../components/ResturantItems';
import {useDispatch, useSelector} from 'react-redux';
import {COLORS, FONTS, icons, SIZES} from '../../constants';
import { TextInput} from 'react-native-gesture-handler';
import { fetcAllhRes } from '../../stores/restaurant/resActions';
import { useDebounce } from '../../utils/Utils';

const Search = () => {
  const [showFilterModal, setShowFilterModal] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState("");
  const restaurants = useSelector(state => state.resReducer.allRestaurant);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const dispatch = useDispatch()
 
  useEffect(()=>{
    if(debouncedSearchTerm){
      dispatch(fetcAllhRes({search:debouncedSearchTerm}))
    }else{
      dispatch(fetcAllhRes({search:""}))
    }

 
  },[debouncedSearchTerm])
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
            color:COLORS.darkGray
          }}
          
          placeholder="Recherche..."
          placeholderTextColor={COLORS.darkGray}
          onChangeText={text => setSearchTerm(text)}
         
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
  return (
    <View
      style={{
        flex: 1,
      }}>
      {renderSearch()}
      {showFilterModal && (
        <FilterModal
          isVisible={showFilterModal}
          onClose={() => setShowFilterModal(false)}
        />
      )}
      <ScrollView style={{ flex: 1 ,marginBottom:180}}>
    <RestaurantItems restaurants={restaurants} />
  </ScrollView>
      {/* <Location /> */}
    </View>
  );
};

export default Search;
