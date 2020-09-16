import * as React from 'react';
import {Image, ScrollView} from 'react-native';
import { Layout, Text, Input, Button} from '@ui-kitten/components';
import { Icon } from 'react-native-eva-icons';
import style from './../Assets/style';

function Photos(props) {
  const route = props.route;
  const [albumId, setAlbumId] = React.useState(route.params.albumId)
  const [photo,setPhoto] = React.useState([]);
  React.useEffect(()=>{
    fetch("https://jsonplaceholder.typicode.com/photos")
    .then(res=>res.json())
    .then(data=>setPhoto(data.filter(item=>parseInt(albumId) === parseInt(item.albumId))))
  },[albumId])
  return(
    <ScrollView>
      <Layout style={{flex: 1}}>
        <Layout style={{marginTop: 20,marginHorizontal: 20}}>
        {photo.length > 0 ? photo.map((item,id)=>(
          <Image key={id} source={{uri:item.url}} style={{ width: "100%", height: 250,marginBottom: 20, borderRadius: 10}}/>
        )):null}
        </Layout>
      </Layout>
    </ScrollView>
  )
}
export default Photos;
