import * as React from 'react';
import {YellowBox, ImageBackground} from 'react-native';
import { Layout, Text, Input, Button} from '@ui-kitten/components';
import { View, TouchableOpacity, StyleSheet, TouchableWithoutFeedback, Dimensions } from 'react-native';
import { Icon } from 'react-native-eva-icons';
import style from './../Assets/style';
import AuthContext from './../context/AuthContext';
import { RNCamera } from 'react-native-camera';
import { useCamera } from 'react-native-camera-hooks';
const initialState = {
  flash: 'off',
  zoom: 0,
  autoFocus: 'on',
  autoFocusPoint: {
    normalized: { x: 0.5, y: 0.5 }, // normalized values required for autoFocusPointOfInterest
    drawRectPosition: {
      x: Dimensions.get('window').width * 0.5 - 32,
      y: Dimensions.get('window').height * 0.5 - 32,
    },
  },
  focusDepth: 0,
  type: 'back',
  whiteBalance: 'auto',
  ratio: '16:9',

  isRecording: false,
  canDetectFaces: false,
  canDetectText: false,
  canDetectBarcode: false,
  faces: [],
  textBlocks: [],
  barcodes: [],
};

function Detail(props) {
  YellowBox.ignoreWarnings([
    'Non-serializable values were found in the navigation state',
  ]);
  const [name, setName] = React.useState();
  const [id, setId] = React.useState();
  const [device, setDevice] = React.useState();
  const [profile,setProfile] = React.useState();
  const [email, setEmail] = React.useState();
  const [password, setPassword] = React.useState();

  const {typeData,dataItem} = props.route.params;
  const {data, addData, editData} = React.useContext(AuthContext);
  const [
    { cameraRef, type, ratio, autoFocus, autoFocusPoint, isRecording },
    {
      toggleFacing,
      touchToFocus,
      textRecognized,
      facesDetected,
      recordVideo,
      setIsRecording,
    },
  ] = useCamera(initialState);

  React.useEffect(()=>{
    if (typeData === "Edit") {
      setName(dataItem.name);
      setDevice(dataItem.device);
      setId(dataItem.id)
      setProfile(dataItem.profile);
      setEmail(dataItem.email)
      setPassword(dataItem.password)
    }
  },[data])
  const submitBtn = _ =>{
    if (typeData === "Edit") {
      const newData = {id,name,device,profile,email,password};
      editData(newData)
      return props.navigation.goBack()
    }else {
      const newData = {name,device,profile,email,password};
      addData(newData);
      alert("Success");
      return props.navigation.goBack()
    }
  }
  return(
    <Layout style={{flex: 1}}>
      <Layout style={{flexDirection: 'row',alignItems: 'center'}}>
        <Icon {...props} name="close-outline" fill="#888" style={{width: 25,height: 25,margin: 15,flex: 1}} onPress={_=>props.navigation.goBack()} />
        <Text style={{flex: 2,textAlign: 'center',fontSize: 20,fontWeight: 'bold',marginRight: 20}}>{typeData} Data</Text>
      </Layout>
      <Layout style={{marginTop: 20,marginHorizontal: 20}}>
      <Input
        placeholder='Insert Name'
        style={style.formInput}
        value={name}
        onChangeText={val=>setName(val)}
      />
      <Input
        placeholder='Insert email'
        style={style.formInput}
        value={email}
        onChangeText={val=>setEmail(val)}
      />
      <Input
        placeholder='Insert Password'
        style={style.formInput}
        value={password}
        secureTextEntry={true}
        onChangeText={val=>setPassword(val)}
      />
      <Input
        placeholder='Insert Device'
        style={style.formInput}
        value={device}
        onChangeText={val=>setDevice(val)}
      />
    {profile ? (
      <View style={{width: 400,height: 400}}>
        <ImageBackground style={{flex: 1,width: "100%"}} source={{uri:profile}} />
      </View>
    ):null}
      <Button size="small" style={{marginBottom: 20,borderColor: "#777",marginTop: 20}} appearance='ghost'
          accessoryLeft={(props)=><Icon name="camera-outline" fill="#333" {...props} />}
          onPress={()=>props.navigation.navigate('TakePicture',{
            state:[profile,setProfile]
          })}
         >
        <Text style={{color: "#333"}}>Take a picture</Text>
      </Button>
      <Button size="small" style={{backgroundColor: "#ff8e6e",borderColor: "#ff8e6e"}} onPress={submitBtn} >{typeData}</Button>
      </Layout>
    </Layout>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
});
export default Detail;
