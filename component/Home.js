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
		// ?
		<Icon {...props} name="trash-2-outline" fill="#ec0101" onPress={_=>deleteAction(props,item,data)} />
	)
}
const ItemImage = ( props ) => (
	<Avatar
    source={{uri:props}}
  />
);

const iconAdd = ( navigation ) => (
<TopNavigationAction icon={props=><Icon {...props} name="plus-outline" fill="#fff" onPress={_=>navigation.navigate('detail',{type:"Tambah"})} />
}
/>
)

function Home( props ) {
	const [ data, setData ] = props.data;
	return (
		<ScrollView>
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
					/>
			))}
    </ScrollView>
	)
}
export default Home;
