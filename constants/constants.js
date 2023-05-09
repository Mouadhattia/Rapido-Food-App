const onboarding_screens = [
  {
    id: 1,
    backgroundImage: require('../assets/images/background_01.png'),
    bannerImage: require('../assets/images/favourite_food.png'),
    title: 'رابيدو تدللكم وتودكم',
    description: 'ربيدوا اسرع خدمة توصيل في ڨابس 🛵🛵',
  },
  {
    id: 2,
    backgroundImage: require('../assets/images/background_02.png'),
    bannerImage: require('../assets/images/hot_delivery.png'),
    title: 'Rapido إسم و خدمات',
    description: 'وين ما انت  و في وقت قصير .. ⏰',
  },
  {
    id: 3,
    backgroundImage: require('../assets/images/background_01.png'),
    bannerImage: require('../assets/images/great_food.png'),
    title: 'في CLICk قضيتك تجيك',
    description: 'آربح راحتك و وقتك مع رابيدوو و كمندي من توا ',
  },
];

const screens = {
  main_layout: 'Rapido',
  home: 'Accueil',
  search: 'Recherche',
  cart: 'Panier',
  favourite: 'Favori',
  notification: 'Notification',
  my_wallet: 'Mon portefeuille',
};

const bottom_tabs = [
  {
    id: 0,
    label: screens.home,
  },
  {
    id: 1,
    label: screens.search,
  },
  {
    id: 2,
    label: screens.cart,
  },
  {
    id: 3,
    label: screens.favourite,
  },
  {
    id: 4,
    label: screens.notification,
  },
];

const delivery_time = [
  {
    id: 1,
    label: '10 Mins',
  },
  {
    id: 2,
    label: '20 Mins',
  },
  {
    id: 3,
    label: '30 Mins',
  },
];

const ratings = [
  {
    id: 1,
    label: 1,
  },
  {
    id: 2,
    label: 2,
  },
  {
    id: 3,
    label: 3,
  },
  {
    id: 4,
    label: 4,
  },
  {
    id: 5,
    label: 5,
  },
];

const tags = [
  {
    id: 1,
    label: 'Malwi',
  },
  {
    id: 2,
    label: 'Baguette',
  },
  {
    id: 3,
    label: 'Pizza',
  },
  {
    id: 4,
    label: 'Makloub',
  },
  {
    id: 5,
    label: 'Dessert',
  },
  {
    id: 6,
    label: 'Petite Dej ',
  },
  {
    id: 7,
    label: 'Boisson',
  },
  {
    id: 8,
    label: 'Taccos',
  },
];

const track_order_status = [
  {
    id: 1,
    title: 'Commande confirmée',
    sub_title: 'votre commande a été reçue',
  },

  {
    id: 4,
    title: 'Livré',
    sub_title: 'Bon appétit!',
  },
  {
    id: 5,
    title: 'Évaluez nous',
    sub_title: 'Aidez-nous à améliorer notre service',
  },
];

const tips = [
  {
    id: 1,
    label: 'No Tips',
    value: 0,
  },
  {
    id: 2,
    label: '$5',
    value: 5,
  },
  {
    id: 3,
    label: '$10',
    value: 10,
  },
  {
    id: 4,
    label: '$15',
    value: 15,
  },
  {
    id: 5,
    label: '$20',
    value: 20,
  },
];

const gender = [
  {
    id: 0,
    label: 'Male',
    value: 'Male',
  },
  {
    id: 1,
    label: 'Female',
    value: 'Female',
  },
];

const state = [
  {
    id: 0,
    label: 'Sarawak',
    value: 'Sarawak',
  },
  {
    id: 1,
    label: 'Sabah',
    value: 'Sabah',
  },
  {
    id: 2,
    label: 'Johor',
    value: 'Johor',
  },
  {
    id: 3,
    label: 'Kedah',
    value: 'Kedah',
  },
  {
    id: 4,
    label: 'Kelantan',
    value: 'Kelantan',
  },
  {
    id: 5,
    label: 'Penang',
    value: 'Penang',
  },
];
const promo = [
  {img: require('../assets/images/offre1.jpg'), id: 1},
  {img: require('../assets/images/offre2.jpg'), id: 2},
  {img: require('../assets/images/offre3.jpg'), id: 3},
];
const services = [
  {img: require('../assets/images/service1.png'), id: 1},
  {img: require('../assets/images/service2.png'), id: 2},
  {img: require('../assets/images/service3.png'), id: 3},
];
const service = [
  {img: require('../assets/images/phara.jpg'), id: 1},
  {img: require('../assets/images/service.jpg'), id: 2},
  {img: require('../assets/images/service3.png'), id: 3},
];
const GOOGLE_MAP_API_KEY = 'AIzaSyD5wTrfIPnt4o6tSp42YFPLs1CeHuMA-gk';

export default {
  onboarding_screens,
  screens,
  bottom_tabs,
  delivery_time,
  ratings,
  tags,
  track_order_status,
  tips,
  gender,
  state,
  GOOGLE_MAP_API_KEY,
  promo,
  services,
  service
};
