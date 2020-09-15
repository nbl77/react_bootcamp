import * as React from 'react';
import { Layout, Text, Input, Button} from '@ui-kitten/components';
import { Icon } from 'react-native-eva-icons';
import style from './../Assets/style';
import AuthContext from './../context/AuthContext';

function Detail(props) {
  const [name, setName] = React.useState();
  const [id, setId] = React.useState();
  const [device, setDevice] = React.useState();
  const [profile, setProfile] = React.useState();

  const {type,dataItem} = props.route.params;
  const {data, addData, editData} = React.useContext(AuthContext);

  React.useEffect(()=>{
    if (type === "Edit") {
      setName(dataItem.name);
      setDevice(dataItem.device);
      setProfile(dataItem.profile);
      setId(dataItem.id)
    }
  },[data])
  const submitBtn = _ =>{
    if (type === "Edit") {
      const newData = {id,name,device,profile};
      const newState = data.map(item=>{
        if (item.id === id) {
          return newData;
        }
        return item
      })
      editData(newState)
      return props.navigation.goBack()
    }else {
      const newData = {id:data.length+1,name,device,profile};
      addData(newData);
      alert("Success");
      return props.navigation.goBack()
    }
  }
  return(
    <Layout style={{flex: 1}}>
      <Layout style={{flexDirection: 'row',alignItems: 'center'}}>
        <Icon {...props} name="close-outline" fill="#888" style={{width: 25,height: 25,margin: 15,flex: 1}} onPress={_=>props.navigation.goBack()} />
        <Text style={{flex: 2,textAlign: 'center',fontSize: 20,fontWeight: 'bold',marginRight: 20}}>{type} Data</Text>
      </Layout>
      <Layout style={{marginTop: 20,marginHorizontal: 20}}>
      <Input
        placeholder='Insert Name'
        style={style.formInput}
        value={name}
        onChangeText={val=>setName(val)}
      />
      <Input
        placeholder='Insert Device'
        style={style.formInput}
        value={device}
        onChangeText={val=>setDevice(val)}
      />
      <Input
        placeholder='Insert Profile Picture'
        style={style.formInput}
        value={profile}
        onChangeText={val=>setProfile(val)}
      />
      <Button size="small" style={{backgroundColor: "#ff8e6e",borderColor: "#ff8e6e"}} onPress={submitBtn} >{type}</Button>
      </Layout>
    </Layout>
  )
}
export default Detail;
