import React from 'react';
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
import style from './style';

function Albums( props ) {
	const [ albums, setAlbums ] = React.useState( [] );
	const [ limit, setLimit ] = React.useState( {
		start: 0,
		end: 10
	} );
	const totalPage = Math.ceil( albums.length / 10 );
	React.useEffect( () => {
		if ( albums.length < 1 ) {
			fetch( "https://jsonplaceholder.typicode.com/albums" )
				.then( res => res.json() )
				.then( data => setAlbums( data ) )
				.catch( err => console.error( err ) )
		}
	} )
	const changePage = num => {
		console.log( num );
		setLimit( {
			start: ( num * 10 ),
			end: ( num * 10 ) - 10
		} )
	}
	const elPagination = () => {
		let i = 1;
		let el = [];
		while ( i <= totalPage ) {
			el.push( <Text key={i} onPress={_=>console.log(i)}>{i}</Text> )
			i++;
		}
		console.log( el );
		return el;
	}
	return (
		<ScrollView style={{backgroundColor: "#fff"}}>
			<Layout>
			<TopNavigation
				title={_=><Text style={{color: "#fff",fontWeight: 'bold',fontSize: 20}}>Albums</Text>}
				style={{backgroundColor:"#ff8e6e"}}
			/>
			</Layout>
      {albums.filter((item,index)=>{
        if (index >= limit.start) {
          if (index < limit.end) {
            return true
          }
        }
        return false
      }).map((item,index)=>(
        <ListItem
        key={index}
        title={`Number Albums ${item.id}`}
        description={item.title}
        accessoryLeft={()=>(<Avatar source={{uri:"https://cdn.idntimes.com/content-images/community/2019/11/pjq1cp9-b535648f0a940c15c61adeebab34c338.jpg"}} />)}
        style={{borderBottomColor: "#eee",borderBottomWidth: 1}}
				onPress={_=>props.navigation.navigate('photos',{albumId:item.id})}
        />
      ))}
			<Layout style={{flexDirection: 'row', justifyContent: 'space-between',marginTop: 10, marginBottom: 20,padding: 10}}>
				{limit.start - 10 < 0 ? <Text></Text> : (
					<Button onPress={_=>setLimit({start:limit.start-10,end:limit.end-10})} size="small" style={style.bgMain}>Prev</Button>
				)}
				{limit.end + 10 > albums.length ? <Text></Text> : (
					<Button onPress={_=>setLimit({start:limit.start+10,end:limit.end+10})} size="small" style={style.bgMain}>Next</Button>
				)}
			</Layout>
		</ScrollView>
	)
}
export default Albums;
