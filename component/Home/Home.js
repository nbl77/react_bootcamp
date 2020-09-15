import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './HomeScreen'
import Detail from './Detail'

const HomeStack = createStackNavigator();

function Home() {
	return(
		<HomeStack.Navigator>
			<HomeStack.Screen name="HomeScreen" options={{headerShown:false}} component={HomeScreen} />
			<HomeStack.Screen name="Detail" options={{headerShown:false}} component={Detail} />
		</HomeStack.Navigator>
	)
}

export default Home;
