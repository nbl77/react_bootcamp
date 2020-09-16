// Penggunaan Stack harus berada didalam komponen NavigationContainer
import * as React from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {Text} from '@ui-kitten/components';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Dashboard from './Dashboard';
import Photos from './Albums/Photos';
import Detail from './Home/Detail';
import AuthContext from './context/AuthContext';
import {
	Icon
} from 'react-native-eva-icons';
import {Login, Signup} from './Auth';
const Stack = createStackNavigator();

function App() {
	const {token,restore} = React.useContext(AuthContext)
  React.useEffect(()=>{
		const getToken = async ()=>{
			try {
				const token = await AsyncStorage.getItem("token")
				if (token != null) {
					restore(token)
				}
			} catch (e) {
				console.log(e);
			}
		}
		getToken();
  },[])
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
				<Stack.Navigator>
					<Stack.Screen name="home" component={Dashboard} options={({ route }) => (customHeader("Dashboard"))} />
					<Stack.Screen name= "Photos" component = {Photos} options = {({route}) => ( subHeader() ) } />
					<Stack.Screen name="Detail" options = {({route}) => ( customHeader( "Detail" ) ) } component={Detail} />
				</Stack.Navigator >
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
const subHeader = () =>({
			headerStyle:{
				elevation: 0, // remove shadow on Android
				shadowOpacity: 0, // remove shadow on iOS
			},
			headerLeft: (props) => (
				<Icon {...props} name="close-outline" fill="#888" style={{width: 25,height: 25,margin: 15,flex: 1}} />
			)
		})

export default App;
