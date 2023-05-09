import React from 'react';
import {View, ScrollView} from 'react-native';
import { useSelector } from 'react-redux';

import {Header, IconButton, TextButton, InfoItem} from '../../components';
import {COLORS, SIZES, icons} from '../../constants';

const MyAccount = ({navigation}) => {

  const {current} = useSelector(state => state.authReducer);
  function renderHeader() {
    return (
      <Header
        title="MON COMPTE"
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
          <TextButton
            label="Modifier"
            labelStyle={{
              color: COLORS.primary,
            }}
            buttonContainerStyle={{
              backgroundColor: null,
            }}
            onPress={() => navigation.navigate('MyAccountEdit')}
          />
        }
      />
    );
  }

  function renderSectionOne() {
    return (
      <View
        style={{
          marginTop: SIZES.padding,
          borderRadius: SIZES.radius,
          paddingHorizontal: SIZES.radius,
          backgroundColor: COLORS.lightGray2,
        }}>
        <InfoItem label="Nom" value={current.userName}/>

        <InfoItem label="Numéro de téléphone" value={current.phone}/>

        <InfoItem label="ID de l'utilisateur" value={current.id} withDivider={false} />
      </View>
    );
  }

  function renderSectionTwo() {
    return (
      <View
        style={{
          marginTop: SIZES.padding,
          borderRadius: SIZES.radius,
          paddingHorizontal: SIZES.radius,
          backgroundColor: COLORS.lightGray2,
        }}>
        {/* <InfoItem label="ID Card" value="Not updated" /> */}

        <InfoItem label="Date de naissance" value={current.birthDay||"---"} />

        <InfoItem label="Genre" value={current.gender} />

        <InfoItem label="Joined" value={current.createdAt} />

        <InfoItem label="Email" value={current.email||"---"} />

        {/* <InfoItem
          label="Address"
          value="Jalan Padungan, 93100 Kuching, Sarawak, Malaysia"
          withDivider={false}
        /> */}
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

      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: SIZES.padding,
        }}>
        {renderSectionOne()}
        {renderSectionTwo()}
      </ScrollView>
    </View>
  );
};

export default MyAccount;
