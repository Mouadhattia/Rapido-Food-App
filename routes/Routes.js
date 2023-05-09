import React, { useEffect } from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';

import CustomDrawer from '../navigation/CustomDrawer';
const Stack = createStackNavigator();

import {
  OnBoarding,
  SignIn,
  SignUp,
  ForgotPassword,
  Otp,
  FoodDetail,
  MyCart,
  Checkout,
  Success,
  MyCard,
  AddCard,
  DeliveryStatus,
  Map,
  Order,
  Review,
  Coupon,
  MyAccount,
  MyAccountEdit,
  Settings,
  ChangePassword,
  NotificationSetting,
} from '../screens';

import ResturantDetails from '../screens/Resturant/ResturantDetails';
import {useSelector} from 'react-redux';
import Pharmacy from '../screens/Pharmacy/Pharmacy';
import Service from '../screens/Service/Service';
import SuccessService from '../screens/Cart/SuccessService';
import Internet from '../screens/Internet/Internet';

const Routes = () => {
  const {token} = useSelector(state => state.authReducer);

 
  React.useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName={token ? 'Home' : 'OnBoarding'}>
        <Stack.Screen name="OnBoarding" component={OnBoarding} />
        <Stack.Screen name="Pharmacy" component={Pharmacy} />
        <Stack.Screen name="Service" component={Service} />
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="Internet" component={Internet} />
        <Stack.Screen name="SignUp" component={SignUp} />

        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />

        <Stack.Screen name="Otp" component={Otp} />

        <Stack.Screen name="Home" component={CustomDrawer} />

        <Stack.Screen name="FoodDetail" component={FoodDetail} />

        <Stack.Screen name="MyCart" component={MyCart} />

        <Stack.Screen name="MyCard" component={MyCard} />

        <Stack.Screen name="AddCard" component={AddCard} />

        <Stack.Screen name="Checkout" component={Checkout} />
        <Stack.Screen name="ResturantDetails" component={ResturantDetails} />

        <Stack.Screen
          name="Success"
          component={Success}
          options={{gestureEnabled: false}}
        />
        <Stack.Screen
          name="SuccessService"
          component={SuccessService}
          options={{gestureEnabled: false}}
        />

        <Stack.Screen
          name="DeliveryStatus"
          component={DeliveryStatus}
          options={{gestureEnabled: false}}
        />

        <Stack.Screen name="Map" component={Map} />

        <Stack.Screen name="Order" component={Order} />

        <Stack.Screen name="Review" component={Review} />

        <Stack.Screen name="Coupon" component={Coupon} />

        <Stack.Screen name="MyAccount" component={MyAccount} />

        <Stack.Screen name="MyAccountEdit" component={MyAccountEdit} />

        <Stack.Screen name="Settings" component={Settings} />

        <Stack.Screen name="ChangePassword" component={ChangePassword} />

        <Stack.Screen
          name="NotificationSetting"
          component={NotificationSetting}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
