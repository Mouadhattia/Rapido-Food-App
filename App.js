import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';

import CustomDrawer from './navigation/CustomDrawer';

import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
// import rootReducer from './stores/rootReducer';

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
} from './screens';
import ResturantDetails from './screens/Resturant/ResturantDetails';
import {persistStore} from 'redux-persist';
import {PersistGate} from 'redux-persist/lib/integration/react';
import persistedReducer from './stores/rootReducer';
import Routes from './routes/Routes';

const Stack = createStackNavigator();
const store = createStore(persistedReducer, applyMiddleware(thunk));
const persistor = persistStore(store);

// const store = createStore(rootReducer, applyMiddleware(thunk));

const App = () => {

  
  React.useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
     <Routes/>
      </PersistGate>
    </Provider>
  );
};

export default App;
