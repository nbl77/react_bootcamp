import React from 'react';
import {Icon} from 'react-native-eva-icons';
import {
	TopNavigationAction
} from '@ui-kitten/components';
const IconAdd = ( navigation ) => (
  <TopNavigationAction icon={props=>(<Icon {...props} name="plus-outline" fill="#fff" />)} onPress = {
    () => navigation.navigate( 'Detail', {
    type: "Tambah"
    })} />
)
export default IconAdd;
