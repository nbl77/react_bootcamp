import React from 'react';
import {
	Icon
} from 'react-native-eva-icons';
import {
	createMaterialBottomTabNavigator
} from '@react-navigation/material-bottom-tabs';
import Albums from './Albums';
import Home from './Home/Home';

const Tab = createMaterialBottomTabNavigator();

function Dashboard( props ) {
	const homeIcon = ({color}) => <Icon name="home-outline" style={style} size={50} fill={color}/>;
	const imageIcon = ({color}) => <Icon name="image-outline" style={style} size={50} fill={color}/>
	return (
		<Tab.Navigator
			initialRouteName="Home"
		  activeColor="#f0edf6"
		  inactiveColor="#f9c3b3"
		  barStyle={{ backgroundColor: '#ff8e6e'}}
			>
				<Tab.Screen name="Home" component={Home} options={()=>optionsTab(homeIcon)} />
				<Tab.Screen	name="Albums" component={Albums} options={()=>optionsTab(imageIcon)} />
		</Tab.Navigator>
	)
}

function optionsTab(icon) {
	return {
		tabBarIcon:icon,
		headerShown: false
	}
}
const style = {
	"height": 24,
	"tintColor": "#222B45",
	"width": 24
}
export default Dashboard;
