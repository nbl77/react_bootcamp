import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './HomeScreen'
import Detail from './Detail'
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import AuthContext from './../context/AuthContext';
const Drawer = createDrawerNavigator();
const HomeStack = createStackNavigator();

function CustomDrawerContent(props) {
	const {signOut} = React.useContext(AuthContext)
  return (
    <DrawerContentScrollView>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Logout"
				onPress={signOut}
      />
    </DrawerContentScrollView>
  );
}
function Home() {
	return(
		<Drawer.Navigator initialRouteName="Home" drawerContent={props => <CustomDrawerContent {...props} />}>
			<Drawer.Screen name="Home" component={HomeScreen} />
		</Drawer.Navigator>
	)
}
export default Home;
