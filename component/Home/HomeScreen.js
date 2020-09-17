import React from 'react';
import AuthContext from './../context/AuthContext';
import IconAdd from './../subComponent/AddBtn';
import {ScrollView} from 'react-native';
import {Icon} from 'react-native-eva-icons';
import {Alert} from 'react-native';
import {
	Layout,
	Avatar,
	Text,
	ListItem,
	TopNavigation
} from '@ui-kitten/components';

function HomeScreen( props ) {
	const {data, deleteData} = React.useContext( AuthContext );
	const ItemImage = uri => <Avatar source={{uri:uri}} />
	const DeleteAction = ( props, itemObj, dataArr ) => {
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
	          deleteData( itemObj );
	        }
	      },
	      ]
	  );
	}
	const deleteBtn = ( props, item, data ) => (
	  <Icon {...props} name="trash-2-outline" fill="#ec0101" onPress={_=>DeleteAction(props,item,data)} />
	)
	if (data[0] === 404) {
		return (
			<>
			<TopNavigation
				title={()=><Text style={{color: "#fff",fontWeight: 'bold',fontSize: 20}}>Home</Text>}
				accessoryRight={()=>IconAdd(props.navigation)}
				style={{backgroundColor:"#ff8e6e"}}
			/>
			<ListItem
				title="Tidak Ada data"
				description={`silahkan tambahkan beberapa data`}
				style={{borderBottomColor: "#eee",borderBottomWidth: 1}}
				/>
			</>
		)
	}

	return (
		<ScrollView style={{backgroundColor: "#fff"}}>
			<Layout>
			<TopNavigation
				title={()=><Text style={{color: "#fff",fontWeight: 'bold',fontSize: 20}}>Home</Text>}
				accessoryRight={()=>IconAdd(props.navigation)}
				style={{backgroundColor:"#ff8e6e"}}
			/>
			</Layout>
			{data.map((item,index)=>(
				<ListItem
					key={index}
					title={item.name}
					description={`Users ${item.device}`}
					accessoryLeft={()=>ItemImage(item.profile)}
					accessoryRight={props=>deleteBtn(props,item,data)}
					onPress={()=>props.navigation.navigate('Detail',{type:"Edit",dataItem:item})}
					style={{borderBottomColor: "#eee",borderBottomWidth: 1}}
					/>
			))}
		</ScrollView>
	)
}

export default HomeScreen;
