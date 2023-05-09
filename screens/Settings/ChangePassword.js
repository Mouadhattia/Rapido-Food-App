import React from 'react';
import {View, TouchableOpacity, Image} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import { useDispatch, useSelector } from 'react-redux';

import {Header, IconButton, FormInput, TextButton} from '../../components';
import {COLORS, SIZES, icons} from '../../constants';
import { updateProfile } from '../../stores/auth/authActions';

const ChangePassword = ({navigation}) => {
  // const [currentPassword, setCurrentPassword] = React.useState('');
  // const [showCurrentPass, setShowCurrentPass] = React.useState(false);
  const [newPassword, setNewPassword] = React.useState('');
  const [showNewPass, setShowNewPass] = React.useState(false);
  const [retypeNewPassword, setRetypeNewPassword] = React.useState('');
  const [showRetypeNewPass, setShowRetypeNewPass] = React.useState(false);
  const {current} = useSelector(state => state.authReducer);
    const dispatch= useDispatch()
    const handleEditPassword =()=>{
      let data ={
        id:current.id,
        password:newPassword
      }
      if(newPassword===retypeNewPassword){
        dispatch(updateProfile({data})).then(()=>navigation.goBack())
        
      }
    }
  function renderHeader() {
  
    return (
      <Header
        title="CHANGER MOT DE PASSE"
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

  function renderForm() {
    return (
      <View
        style={{
          paddingVertical: SIZES.padding,
          paddingHorizontal: SIZES.radius,
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.lightGray2,
        }}>
        {/* Current Password */}
        {/* <FormInput
          label="Votre mot de passe"
          secureTextEntry={!showCurrentPass}
          autoCompleteType="password"
          inputContainerStyle={{
            backgroundColor: COLORS.white,
         
          }}
          value={currentPassword}
          onChange={value => setCurrentPassword(value)}
          appendComponent={
            <TouchableOpacity
              style={{
                width: 40,
                alignItems: 'flex-end',
                justifyContent: 'center',
              }}
              onPress={() => setShowCurrentPass(!showCurrentPass)}>
              <Image
                source={showCurrentPass ? icons.eye_close : icons.eye}
                style={{
                  height: 20,
                  width: 20,
                  tintColor: COLORS.gray,
                }}
              />
            </TouchableOpacity>
          }
        /> */}

        {/* New Password */}
        <FormInput
          label="Nouveau mot de passe"
          secureTextEntry={!showRetypeNewPass}
          autoCompleteType="password"
          containerStyle={{
            marginTop: SIZES.radius,
          }}
          inputContainerStyle={{
            backgroundColor: COLORS.white,
          }}
          value={retypeNewPassword}
          onChange={value => setRetypeNewPassword(value)}
          appendComponent={
            <TouchableOpacity
              style={{
                width: 40,
                alignItems: 'flex-end',
                justifyContent: 'center',
              }}
              onPress={() => setShowRetypeNewPass(!showRetypeNewPass)}>
              <Image
                source={showRetypeNewPass ? icons.eye_close : icons.eye}
                style={{
                  height: 20,
                  width: 20,
                  tintColor: COLORS.gray,
                }}
              />
            </TouchableOpacity>
          }
        />

        {/* Retype New Password */}
        <FormInput
          label="Re-taper le nouveau mot de passe"
          secureTextEntry={!showNewPass}
          autoCompleteType="password"
          containerStyle={{
            marginTop: SIZES.radius,
          }}
          inputContainerStyle={{
            backgroundColor: COLORS.white,
          }}
          value={newPassword}
          onChange={value => setNewPassword(value)}
          appendComponent={
            <TouchableOpacity
              style={{
                width: 40,
                alignItems: 'flex-end',
                justifyContent: 'center',
              }}
              onPress={() => setShowNewPass(!showNewPass)}>
              <Image
                source={showNewPass ? icons.eye_close : icons.eye}
                style={{
                  height: 20,
                  width: 20,
                  tintColor: COLORS.gray,
                }}
              />
            </TouchableOpacity>
          }
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
          marginTop: SIZES.radius,
          paddingHorizontal: SIZES.padding,
          paddingBottom: 40,
        }}>
        {renderForm()}
      </KeyboardAwareScrollView>

      {/* Footer */}
      <TextButton
        buttonContainerStyle={{
          height: 60,
          marginTop: SIZES.padding,
          marginHorizontal: SIZES.padding,
          marginBottom: SIZES.padding,
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.primary,
        }}
        label="Changer mot de passe"
        onPress={handleEditPassword}
      />
    </View>
  );
};

export default ChangePassword;
