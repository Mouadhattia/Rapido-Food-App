import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';

import {AuthLayout} from '../';
import {FONTS, SIZES, COLORS, icons, images} from '../../constants';
import {FormInput, TextButton, TextIconButton} from '../../components';
import {utils} from '../../utils';
import {useDispatch, useSelector} from 'react-redux';
import {signUp} from '../../stores/auth/authActions';

const SignUp = ({navigation}) => {
  const dispatch = useDispatch();
  const {loading} = useSelector(state => state.authReducer);
  const [email, setEmail] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [showPass, setShowPass] = React.useState(false);

  const [emailError, setEmailError] = React.useState('');
  const [phoneError, setPhoneError] = React.useState('');
  const [usernameError, setUsernameError] = React.useState('');
  const [passwordError, setPasswordError] = React.useState('');

  function isEnableSignUp() {
    return (
      email != '' &&
      username != '' &&
      password != '' &&
      emailError == '' &&
      passwordError == ''
    );
  }
  const handleSignUp = () => {
    dispatch(signUp({data: {phone:username, password, userName: email}}))
      .then(() => navigation.navigate('Home'))
      .catch(err => console.log(err));
  };
  return (
    loading?(
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center',backgroundColor:"white",width:SIZES.width }}>
        <Text style={{color:COLORS.darkGray,...FONTS.body2}}>Patienter un peu...</Text>
        <Image 
        
        source={images.loadingImg}
        style={{
          width:"60%",
          height:'30%',
          
        
        }}
        />
      </View>
    ):
    (
      <AuthLayout
      title="Commencer"
      subtitle="Créez un compte pour continuer !"
      titleContainerStyle={{
        marginTop: SIZES.height > 800 ? SIZES.radius : 0,
      }}>
      <View
        style={{
          flex: 1,
          marginTop: SIZES.height > 800 ? SIZES.padding : SIZES.radius,
        }}>
        <FormInput
          label="Votre Nom"
          keyboardType="text"
          autoCompleteType="text"
          value={email}
          onChange={value => {
            utils.validateEmail(value, setEmailError);
            setEmail(value);
          }}
          errorMsg={emailError}
          appendComponent={
            <View
              style={{
                justifyContent: 'center',
              }}>
              <Image
                source={
                  email == '' || (email != '' && emailError == '')
                    ? icons.correct
                    : icons.cancel
                }
                style={{
                  height: 20,
                  width: 20,
                  tintColor:
                    email == ''
                      ? COLORS.gray
                      : email != '' && emailError == ''
                      ? COLORS.green
                      : COLORS.red,
                }}
              />
            </View>
          }
        />

        <FormInput
          label="Numéro de téléphone"
          containerStyle={{
            marginTop: SIZES.radius,
          }}
          value={username}
          onChange={value => {
            utils.validatePhone(value, setPhoneError);
            setUsername(value);
          }}
          errorMsg={phoneError}
          appendComponent={
            <View
              style={{
                justifyContent: 'center',
              }}>
              <Image
                source={
                  username == '' || (username != '' && phoneError == '')
                    ? icons.correct
                    : icons.cancel
                }
                style={{
                  height: 20,
                  width: 20,
                  tintColor:
                    username == ''
                      ? COLORS.gray
                      : username != '' && usernameError == ''
                      ? COLORS.green
                      : COLORS.red,
                }}
              />
            </View>
          }
        />

        <FormInput
          label="Mot de passe"
          secureTextEntry={!showPass}
          autoCompleteType="password"
          containerStyle={{
            marginTop: SIZES.radius,
          }}
          value={password}
          onChange={value => {
            utils.validatePassword(value, setPasswordError);
            setPassword(value);
          }}
          errorMsg={passwordError}
          appendComponent={
            <TouchableOpacity
              style={{
                width: 40,
                alignItems: 'flex-end',
                justifyContent: 'center',
              }}
              onPress={() => setShowPass(!showPass)}>
              <Image
                source={showPass ? icons.eye_close : icons.eye}
                style={{
                  height: 20,
                  width: 20,
                  tintColor: COLORS.gray,
                }}
              />
            </TouchableOpacity>
          }
        />

        {/* Sign Up & Sign In */}
        <TextButton
          label="Register"
          disabled={isEnableSignUp() ? false : true}
          buttonContainerStyle={{
            height: 55,
            alignItems: 'center',
            marginTop: SIZES.padding,
            borderRadius: SIZES.radius,
            backgroundColor: isEnableSignUp()
              ? COLORS.primary
              : COLORS.transparentPrimary,
          }}
          onPress={() => handleSignUp()}
        />

        <View
          style={{
            flexDirection: 'row',
            marginTop: SIZES.radius,
            justifyContent: 'center',
          }}>
          <Text style={{color: COLORS.darkGray, ...FONTS.body3}}>
            Vous avez déjà un compte ?{' '}
          </Text>
          <TextButton
            label="Connecter"
            buttonContainerStyle={{
              backgroundColor: null,
            }}
            labelStyle={{
              color: COLORS.primary,
              ...FONTS.h3,
            }}
            onPress={() => navigation.goBack()}
          />
        </View>
      </View>

      {/* Footer */}
      {/* <View>
        <TextIconButton
          containerStyle={{
            height: 50,
            alignItems: 'center',
            borderRadius: SIZES.radius,
            backgroundColor: COLORS.blue,
          }}
          icon={icons.fb}
          iconPosition="LEFT"
          iconStyle={{
            tintColor: COLORS.white,
          }}
          label="Continue avec Facebook"
          labelStyle={{
            marginLeft: SIZES.radius,
            color: COLORS.white,
          }}
          onPress={() => navigation.replace('Home')}
        />

        <TextIconButton
          containerStyle={{
            height: 50,
            alignItems: 'center',
            marginTop: SIZES.radius,
            borderRadius: SIZES.radius,
            backgroundColor: COLORS.lightGray2,
          }}
          icon={icons.google}
          iconPosition="LEFT"
          iconStyle={{
            tintColor: null,
          }}
          label="Continue avec Google"
          labelStyle={{
            marginLeft: SIZES.radius,
          }}
          onPress={() => navigation.replace('Home')}
        />
      </View> */}
    </AuthLayout>
    )
   
  );
};

export default SignUp;
