import React from 'react';
import {
	ScrollView,
	Alert,
	SafeAreaView,
	ListView,
	FlatList,
	View,
	RefreshControl
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
import style from './../Assets/style';
import AsyncStorage from '@react-native-community/async-storage';
import Swipeable from 'react-native-gesture-handler/Swipeable'

function Albums( props ) {
	const [ albums, setAlbums ] = React.useState( [] );
	const [ DataAlbums, setDataAlbums ] = React.useState( [] );
	const [refresh, setRefresh] = React.useState(false);
	const [statusSwipe, setStatusSwipe] = React.useState(false);
	const [ limit, setLimit ] = React.useState( {
		start: 0
	} );
	const totalPage = Math.ceil( DataAlbums.length / 10 );
	React.useEffect( () => {
		const fetchAlbums =  async ()=>{
			try {
				const dataAlbums = await AsyncStorage.getItem("albums");
				if (dataAlbums === null) {
					console.log("masuk");
					const fetchRes = await fetch("https://jsonplaceholder.typicode.com/albums")
					const data = await fetchRes.json()
					await AsyncStorage.setItem("albums",JSON.stringify(data))
					setDataAlbums(data)
				}else {
					setDataAlbums(JSON.parse(dataAlbums));
				}
			} catch (e) {
				console.log(e);
			}
		}
		if (DataAlbums.length < 1) {
			fetchAlbums();
		}
	},[DataAlbums] )
	React.useEffect(()=>{
		if (DataAlbums.length > 1) {
			console.log("limit change");
			const page = DataAlbums.slice(limit.start,limit.start+totalPage);
			setAlbums([...albums, ...page])
		}
	},[limit,DataAlbums])
	const SwipeOpen = (props) =>{
		return (
			<View style={{backgroundColor: '#ff8e6e',flex: 1,flexDirection: 'row', alignItems: 'center',paddingLeft: 20}}>
				<Icon name="book-open-outline" style={{"height": 24, "tintColor": "#222B45", "width": 24}} size={50} fill="#fff"/>
				<Text style={{color: "#fff",paddingLeft: 10,fontSize: 18,fontWeight: 'bold'}}>Open Albums</Text>
			</View>
		)
	}
	const renderItem = ( data ) => {
		return (
			<Swipeable renderLeftActions={SwipeOpen}
			onSwipeableLeftOpen={params => {
				props.navigation.navigate( 'Photos', {	albumId: data.item.id } );
			}}
			>
				 <ListItem
				 title={`Number Albums ${data.item.id}`}
				 description={data.item.title}
				 accessoryLeft={()=>(<Avatar source={{uri:"https://cdn.idntimes.com/content-images/community/2019/11/pjq1cp9-b535648f0a940c15c61adeebab34c338.jpg"}} /> )}
				 style = {
					 {
						 borderBottomColor: "#eee",
						 backgroundColor:'#fff',
						 borderBottomWidth: 1
					 }
				 }
				 onPress = { () => props.navigation.navigate( 'Photos', {	albumId: data.item.id } )}

				 />
		 </Swipeable>
				)
	}
	const reRenderItem = prpps =>{
		console.log("onEndReached");
		setLimit({
			start:limit.start + 10
		})
	}
	const onRefresh = () =>{
		setRefresh(true)
		new Promise(function(resolve, reject) {
			setAlbums([]);
			setLimit({
				start:0
			})
			if (DataAlbums.length > 1) {
				resolve(true)
			}
		}).then(_=>setRefresh(false))
	}
return (
	<SafeAreaView>
		<Layout>
		<TopNavigation
		title={_=><Text style={{color: "#fff",fontWeight: 'bold',fontSize: 20}}>Albums</Text>}
		style={{backgroundColor:"#ff8e6e"}}
		/>
		</Layout>
		{DataAlbums.length < 1 ? (<Text>Loading</Text>) : null}
		<FlatList
		data={albums}
		renderItem={renderItem}
		keyExtractor={item=>String(item.id)}
		onEndReached={reRenderItem}
		onEndReachedThreshold="0.4"
		style={{marginBottom: 50}}
		refreshControl={<RefreshControl refreshing={refresh} onRefresh={onRefresh} />}
		/>
	</SafeAreaView>
)
}
export default Albums;
