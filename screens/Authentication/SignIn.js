import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {FONTS, SIZES, COLORS, icons, images} from '../../constants';
import {AuthLayout} from '../';
import {
  CustomSwitch,
  FormInput,
  TextButton,
  TextIconButton,
} from '../../components';
import {utils} from '../../utils';
import {logIn} from '../../stores/auth/authActions';
import {useDispatch, useSelector} from 'react-redux';

const SignIn = ({navigation}) => {
  const dispatch = useDispatch();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [emailError, setEmailError] = React.useState('');
  const {loading} = useSelector(state => state.authReducer);
  const [showPass, setShowPass] = React.useState(false);
  const [saveMe, setSaveMe] = React.useState(false);

  function isEnableSignIn() {
    return email != '' && password != '' && emailError == '';
  }
  const handleLogin = () => {
    dispatch(logIn({data: {userName:email, password}}))
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
    ):(
<AuthLayout
      title="Connecter vous"
      subtitle="Bon retour, vous nous avez manqué!">
      <View
        style={{
          flex: 1,
          marginTop: SIZES.height > 800 ? SIZES.padding * 2 : SIZES.radius,
        }}>
        {/* Form Inputs */}
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
          label="Mot de passe"
          secureTextEntry={!showPass}
          autoCompleteType="password"
          containerStyle={{
            marginTop: SIZES.radius,
          }}
          value={password}
          onChange={value => setPassword(value)}
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

        {/* Save me & Forgot pass */}
        <View
          style={{
            flexDirection: 'row',
            marginTop: SIZES.radius,
            justifyContent: 'space-between',
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <CustomSwitch
              label="Rester connecté"
              value={saveMe}
              onChange={value => setSaveMe(value)}
            />
          </View>
          <TextButton
            label="Mot de passe oublié?"
            buttonContainerStyle={{
              backgroundColor: null,
            }}
            labelStyle={{
              color: COLORS.gray,
              ...FONTS.body4,
            }}
            onPress={() => navigation.navigate('ForgotPassword')}
          />
        </View>

        {/* Sign In & Sign Up */}
        <TextButton
          label="Connexion"
          disabled={isEnableSignIn() ? false : true}
          buttonContainerStyle={{
            height: 55,
            alignItems: 'center',
            marginTop: SIZES.padding,
            borderRadius: SIZES.radius,
            backgroundColor: isEnableSignIn()
              ? COLORS.primary
              : COLORS.transparentPrimary,
          }}
          onPress={() => handleLogin()}
        />

        {/* Sign Up */}
        <View
          style={{
            flexDirection: 'row',
            marginTop: SIZES.radius,
            justifyContent: 'center',
          }}>
          <Text style={{color: COLORS.darkGray, ...FONTS.body3}}>
            Vous n’avez pas un compte ?{' '}
          </Text>
          <TextButton
            label="Créer un compte"
            buttonContainerStyle={{
              backgroundColor: null,
            }}
            labelStyle={{
              color: COLORS.primary,
              ...FONTS.h3,
            }}
            onPress={() => navigation.navigate('SignUp')}
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

export default SignIn;
