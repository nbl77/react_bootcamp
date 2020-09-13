import * as React from 'react';
import {
	ScrollView,
	Alert
} from 'react-native';
import {
	Layout,
	Avatar,
	Text,
	ListItem,
	TopNavigation,
	TopNavigationAction,
	Button
} from '@ui-kitten/components';
import {
	Icon
} from 'react-native-eva-icons';
import style from './style';
import {
	createMaterialBottomTabNavigator
} from '@react-navigation/material-bottom-tabs';
import Albums from './Albums';
const Tab = createMaterialBottomTabNavigator();

const deleteAction = ( props, itemObj, dataArr ) => {
	Alert.alert(
		'Warning!',
		'Are you sure ?',
      [
			{
				text: 'NO',
				onPress: () => false,
				style: 'cancel'
			},
			{
				text: 'YES',
				onPress: () => {
					const [ data, setData ] = dataArr;
					const newData = data.filter( item => {
						if ( item.id === itemObj.id ) {
							alert( "Success Delete data" )
							return false;
						}
						return true
					} )
					setData( newData );
				}
			},
      ]
	);
}
const showAlert = _ => {
	return
}
const deleteBtn = ( props, item, data ) => {
	return (
		<Icon {...props} name="trash-2-outline" fill="#ec0101" onPress={_=>deleteAction(props,item,data)} />
	)
}
const ItemImage = ( props ) => (
	<Avatar
    source={{uri:props}}
  />
);

const iconAdd = ( navigation ) => (
	<TopNavigationAction
	icon={props=>{
		return <Icon {...props} name="plus-outline" fill="#fff" />
}
}
onPress = {
_ => navigation.navigate( 'detail', {
	type: "Tambah"
} )
}
/>
)

function HomeScreen( props ) {
	const [ data, setData ] = props.data;
	return (
		<ScrollView style={{backgroundColor: "#fff"}}>
			<Layout>
			<TopNavigation
				title={_=><Text style={{color: "#fff",fontWeight: 'bold',fontSize: 20}}>Home</Text>}
				accessoryRight={_=>iconAdd(props.navigation)}
				style={{backgroundColor:"#ff8e6e"}}
			/>
			</Layout>
			{data.map((item,index)=>(
				<ListItem
					key={index}
					title={item.name}
					description={`Users ${item.device}`}
					accessoryLeft={()=>ItemImage(item.profile)}
					accessoryRight={props=>deleteBtn(props,item,[data,setData])}
					onPress={_=>props.navigation.navigate('detail',{type:"Edit",dataItem:item})}
					style={{borderBottomColor: "#eee",borderBottomWidth: 1}}
					/>
			))}
		</ScrollView>
	)
}

function Home( props ) {

	return (
		<Tab.Navigator
			initialRouteName="Home"
		  activeColor="#f0edf6"
		  inactiveColor="#f9c3b3"
		  barStyle={{ backgroundColor: '#ff8e6e'}}
			>
			<Tab.Screen
				name="Home"
				children={_=>(<HomeScreen data={props.data} />)}
				options={{
					tabBarIcon:({color})=>(
						<Icon name="home-outline" style={{"height": 24, "tintColor": "#222B45", "width": 24}} size={50} fill={color}/>
					)
				}}
				 />
			<Tab.Screen
			name="Albums"
			component={Albums}
			options={{
				tabBarIcon:({color})=>(
					<Icon name="image-outline" style={{"height": 24, "tintColor": "#222B45", "width": 24}} size={50} fill={color}/>
				)
			}}
			/>
		</Tab.Navigator>
	)
}


export default Home;
