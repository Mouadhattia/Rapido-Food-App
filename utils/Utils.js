import {useEffect, useState} from 'react';
import NetInfo from '@react-native-community/netinfo';

export const checkInternetConnection = async () => {
  const state = await NetInfo.fetch();
  if (state.isConnected) {
    return true;
  } else {
    return false;
  }
};
//useDebounce
export function useDebounce(value, delay) {
  // State and setters for debounced value
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(
    () => {
      // Update debounced value after delay
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);
      // Cancel the timeout if value changes (also on delay change or unmount)
      // This is how we prevent debounced value from updating if value is changed ...
      // .. within the delay period. Timeout gets cleared and restarted.
      return () => {
        clearTimeout(handler);
      };
    },
    [value, delay], // Only re-call effect if value or delay changes
  );
  return debouncedValue;
}
function isValidEmail(value) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(value).toLowerCase());
}
//adresse
export async function getAddressFromCoordinates(lat, lng) {
  let response = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyD5wTrfIPnt4o6tSp42YFPLs1CeHuMA-gk`,
  );

  let result = await response.json();
  let address = result.results[0].formatted_address;

  return address;
}
export const API_URL = 'https://rapido-delivery.tn';
export function formatArray(arr) {
  let newObj = {};
  arr.forEach(item => {
    newObj[item.name] = {
      price: item.price,
      checked: false,
    };
  });
  return newObj;
}
export function getCheckedItems(obj) {
  let checkedItems = [];
  let totalPrice = 0;
  Object.keys(obj).forEach(name => {
    if (obj[name].checked) {
      checkedItems.push({name: name, price: obj[name].price});
      totalPrice += parseFloat(obj[name].price);
    }
  });
  return {checkedItems, totalPrice};
}
export function calculateCost(distance) {
  const initialCost = 2.5;
  const additionalCostPer2km = 0.5;
  let totalCost = initialCost;

  if (distance > 2) {
    const additionalKm = Math.ceil(distance - 2) / 2;
    totalCost += Math.ceil(additionalKm) * additionalCostPer2km;
  }

  return totalCost;
}

export const EARTH_RADIUS = 6371; // radius of the earth in kilometers

export function toRadians(degrees) {
  return degrees * (Math.PI / 180);
}

export function distanceInKm(lat1, lon1, lat2, lon2) {
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);
  lat1 = toRadians(lat1);
  lat2 = toRadians(lat2);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return (EARTH_RADIUS * c).toFixed(2);
}

function validateEmail(value, setEmailError) {
  if (value == '') {
    setEmailError('Invalid Nom');
  } else {
    setEmailError('');
  }
}

function validatePhone(value, setPhoneError) {
  const regex = /^\d{8}$/;
  if (value == '') {
    setPhoneError('téléphone invalide');
  } else if (!regex.test(value)) {
    setPhoneError('téléphone invalide');
  } else {
    setPhoneError('');
  }
}

function validatePassword(value, setPasswordError) {
  if (value.length < 8) {
    setPasswordError('Le mot de passe doit comporter 8 caractères');
  } else {
    setPasswordError('');
  }
}

function validateInput(value, minLength, setError) {
  if (value.length < minLength) {
    setError('Invalid Input');
  } else {
    setError('');
  }
}

function calculateAngle(coordinates) {
  let startLat = coordinates[0]['latitude'];
  let startLng = coordinates[0]['longitude'];
  let endLat = coordinates[1]['latitude'];
  let endLng = coordinates[1]['longitude'];
  let dx = endLat - startLat;
  let dy = endLng - startLng;

  return (Math.atan2(dy, dx) * 180) / Math.PI;
}

const utils = {
  isValidEmail,
  validateEmail,
  validatePassword,
  validateInput,
  calculateAngle,
  validatePhone,
};
export function groupOrdersByDate(orders) {
  const groupedOrders = orders.reduce((acc, curr) => {
    const date = new Date(curr.createdAt).toDateString();
    if (!acc[date]) {
      acc[date] = {
        id: Math.floor(100000000 + Math.random() * 900000000),
        title: date,
        data: [curr],
      };
    } else {
      acc[date].data.push(curr);
    }
    return acc;
  }, {});
  return Object.values(groupedOrders);
}
export default utils;
