// Penggunaan Stack harus berada didalam komponen NavigationContainer
import * as React from 'react';
import {Text} from '@ui-kitten/components';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Dashboard from './Dashboard';
import AuthContext from './context/AuthContext';
import {Login, Signup} from './Auth';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

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

function App() {
	const {token,signOut} = React.useContext(AuthContext)
	return (
		<NavigationContainer>
		{token === null ? ( //Jika belum login
			<>
				<Stack.Navigator>
					<Stack.Screen name="login" component={Login} options={({ route }) => (customHeader("Sign In"))} />
					<Stack.Screen name= "register" component = {Signup} options = {({route}) => ( customHeader( "Sign Up" ) ) } />
				</Stack.Navigator >
			</>
		) : ( //Jika sudah login
			<>
				<Drawer.Navigator initialRouteName="Home" drawerContent={props => <CustomDrawerContent {...props} />}>
						<Drawer.Screen name="home" component={Dashboard} options={({ route }) => (customHeader("Dashboard"))} />
	      </Drawer.Navigator>
			</>
		)}
	</NavigationContainer>

	)
}

const customHeader = title => {
	return {
		title: title,
		headerStyle: {
			backgroundColor: '#ff8e6e',
		},
		headerTintColor: '#fff',
		headerTitleStyle: {
			fontWeight: 'bold',
		},
		headerShown: false
	}
}

export default App;
