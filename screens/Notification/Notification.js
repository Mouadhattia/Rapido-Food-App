import React, {useEffect} from 'react';
import {View, Image, TouchableOpacity, SectionList, Text} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import {NotificationCard} from '../../components';
import {COLORS, SIZES, FONTS, icons, images, dummyData} from '../../constants';
import {fetchNoti} from '../../stores/notification/notiActions';

const Notification = () => {
  const notification = useSelector(state => state.notiReducer.notification);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchNoti());
  }, []);

  function renderNotifications() {
    return (
      <View
        style={{
          flex: 1,
        }}>
        <SectionList
          sections={notification}
          keyExtractor={item => item.id}
          stickySectionHeadersEnabled={false}
          showsVerticalScrollIndicator={false}
          style={{
            marginBottom: 200,
            paddingHorizontal: SIZES.padding,
          }}
          renderItem={({item}) => <NotificationCard notificationItem={item} />}
          renderSectionHeader={({section: {title}}) => (
            <View
              style={{
                marginTop: SIZES.radius,
                marginBottom: SIZES.base,
              }}>
              <Text
                style={{
                  ...FONTS.body3,
                }}>
                {title}
              </Text>
            </View>
          )}
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

        {notification.length ===1&&notification[0].data.length===0?
          <Text
          style={{
            padding: SIZES.padding,
  
            textAlign: 'center',
            ...FONTS.body2,
            margin: SIZES.padding,
            color: COLORS.darkGray,
          }}>
         Il n'y a pas des notifications
        </Text>:
         renderNotifications()

        }
     
    </View>
  );
};

export default Notification;
