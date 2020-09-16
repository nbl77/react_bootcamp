import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Albums from './Albums';
import {
	Icon
} from 'react-native-eva-icons';
import Photos from './Photos';

const AlbumStack = createStackNavigator();

function AlbumsNav(props) {
	return(
		<AlbumStack.Navigator>
			<AlbumStack.Screen name="Albums" options={{headerShown:false}} component={Albums} />
		</AlbumStack.Navigator>
	)
}

export default AlbumsNav;
