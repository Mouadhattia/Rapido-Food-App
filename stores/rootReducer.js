import {combineReducers} from 'redux';
import {persistReducer} from 'redux-persist';
import {AsyncStorage} from 'react-native';

import tabReducer from './tab/tabReducer';
import resReducer from './restaurant/resReducer';
import promoReducer from './promo/promoReducer';
import catReducer from './category/catReducer';
import serviceReducer from './service/serviceReducer';
import notiReducer from './notification/notiReducer';
import menuReducer from './menu/menuReducer';
import productReducer from './product/productReducer';
import cartReducer from './cart/cartReducer';
import mapReducer from './map/mapReducer';
import authReducer from './auth/authReducer';
import favReducer from './fav/favReducer';
import orderReducer from './order/orderReducer';
import suppReducer from './supp/suppReducer';
import pharmacyReducer from './pharmacy/pharmacyReducer';
import servicesReducer from './services/servicesReducer';

const rootReducer = combineReducers({
  tabReducer,
  resReducer,
  promoReducer,
  catReducer,
  serviceReducer,
  notiReducer,
  menuReducer,
  productReducer,
  cartReducer,
  mapReducer,
  authReducer,
  favReducer,
  orderReducer,
  suppReducer,
  pharmacyReducer,
  servicesReducer
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
