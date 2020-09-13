import * as React from 'react';
import {
	StyleSheet,
	ScrollView,
	TouchableWithoutFeedback
} from 'react-native';
import {
	Layout,
	Text,
	ViewPager,
	Avatar,
	Input,
	Button,
	CheckBox,
	ListItem,
	TopNavigation,
	TopNavigationAction
} from '@ui-kitten/components';
import {
	Icon
} from 'react-native-eva-icons';
import {
	NavigationContainer
} from '@react-navigation/native';
import {
	createStackNavigator
} from '@react-navigation/stack';
import Home from './Home';
import Login from './Login';
import Detail from './Detail';
import Photos from './Photos';
const Stack = createStackNavigator();

function App() {
	const data = React.useState( [ {
			id: 1,
			name: "Nabil",
			device: "Android",
			profile: "https://cdn.idntimes.com/content-images/community/2019/11/pjq1cp9-b535648f0a940c15c61adeebab34c338.jpg"
	},
		{
			id: 2,
			name: "John",
			device: "IOS",
			profile: "https://cdn.idntimes.com/content-images/community/2019/12/5cbeb8f402a1f-56275801140a9f93af2e505b4348d03c_600x400.jpg"
	} ] );
	return (
		<NavigationContainer>
      <Stack.Navigator initialRouteName="login">
        <Stack.Screen name="home" options={({ route }) => (customHeader("Home"))} >
					{(props)=>(<Home data={data} />)}
				</Stack.Screen>
        <Stack.Screen name="login" component={Login} options={({ route }) => (customHeader("Sign In"))} />
				<Stack.Screen name="detail" options={{headerShown:false}} children={(props)=>(<Detail data={data} {...props} />)} />
        <Stack.Screen name="photos" options={{
						headerStyle:{
							elevation: 0, // remove shadow on Android
		          shadowOpacity: 0, // remove shadow on iOS
						},
						headerLeft: (props) => (
							<Icon {...props} name="close-outline" fill="#888" style={{width: 25,height: 25,margin: 15,flex: 1}} />
				    )
					}} children={(props)=>(<Photos {...props} />)} />
      </Stack.Navigator>
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
