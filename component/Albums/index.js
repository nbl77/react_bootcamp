import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Albums from './Albums';
import Photos from './Photos';

const AlbumStack = createStackNavigator();

function AlbumsNav() {
	return(
		<AlbumStack.Navigator>
			<AlbumStack.Screen name="Albums" options={{headerShown:false}} component={Albums} />
			<AlbumStack.Screen name="Photos" component={Photos} />
		</AlbumStack.Navigator>
	)
}

export default AlbumsNav;
