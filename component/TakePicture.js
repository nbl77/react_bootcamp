import React from 'react';
import { View, TouchableOpacity, ImageBackground, TouchableWithoutFeedback, Dimensions, StyleSheet, Text } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { useCamera } from 'react-native-camera-hooks';
import RNFS from 'react-native-fs';

function TakePicture(props) {
  const [profile,setProfile] = props.route.params.state;
  const initialProps ={
  flash: 'on',
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
}
  const [
    { cameraRef, type, ratio, autoFocus, autoFocusPoint, isRecording },
    {
      toggleFacing,
      touchToFocus,
      textRecognized,
      facesDetected,
      recordVideo,
      setIsRecording,
      takePicture
    },
  ] = useCamera(initialProps);
  const [previewImg,setPreviewImg] = React.useState();

  const removeImg = async () =>{
    console.log("masuk sini");
    try {
      const cekFile = await await RNFS.exists(previewImg);
      if (cekFile) {
        const remove = await RNFS.unlink(previewImg)
        setPreviewImg();
      }
    } catch (e) {
      console.log(e);
    }
  }
  if (previewImg) {
    return (
      <View style={{flex: 1}}>
        <ImageBackground style={{flex: 1,width: "100%"}} source={{uri:previewImg}} />
        <View style={{position: 'absolute',justifyContent: 'space-between',flexDirection: 'row',width: "100%",bottom: 0}}>
          <TouchableOpacity
            style={{backgroundColor: "#fff",padding: 10,borderRadius: 20,margin: 30}}
            onPress={removeImg}>
            <Text>Ambil Lagi</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{backgroundColor: "#fff",padding: 10,borderRadius: 20,margin: 30}}
            onPress={() => {
              setProfile(previewImg)
              props.navigation.goBack();
            }}>
            <Text>Gunakan</Text>
          </TouchableOpacity>
        </View>

      </View>
    )
  }
  return(
    <View style={{ flex: 1 }}>
      {previewImg ? removeImg : null}
      <RNCamera
        ref={cameraRef}
        autoFocusPointOfInterest={autoFocusPoint.normalized}
        type={type}
        ratio={ratio}
        style={{ flex: 1,justifyContent: 'flex-end'}}
        autoFocus={autoFocus}
        onTextRecognized={textRecognized}
        onFacesDetected={facesDetected}
      >
      <TouchableOpacity
            style={{width: 50,height: 50,alignSelf: 'center',marginBottom: 40}}
            onPress={async () => {
              try {
                const data = await takePicture();
                setPreviewImg(data.uri)
              } catch (e) {
                console.warn(e);
              } finally {
                setIsRecording(false);
              }
            }}>
            <View style={{flex: 1,backgroundColor: "#fff",borderRadius: 100}}></View>
          </TouchableOpacity>
      </RNCamera>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 20 : 10,
    backgroundColor: '#000',
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
  flipButton: {
    flex: 0.3,
    height: 40,
    marginHorizontal: 2,
    marginBottom: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
    borderRadius: 8,
    borderColor: 'white',
    borderWidth: 1,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  autoFocusBox: {
    position: 'absolute',
    height: 64,
    width: 64,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'white',
    opacity: 0.4,
  },
  flipText: {
    color: 'white',
    fontSize: 15,
  },
  zoomText: {
    position: 'absolute',
    bottom: 70,
    zIndex: 2,
    left: 2,
  },
  picButton: {
    zIndex: 150,
    backgroundColor: 'darkseagreen',
  },
  facesContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    top: 0,
  },
  face: {
    padding: 10,
    borderWidth: 2,
    borderRadius: 2,
    position: 'absolute',
    borderColor: '#FFD700',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  landmark: {
    width: 2,
    height: 2,
    position: 'absolute',
    backgroundColor: 'red',
  },
  faceText: {
    color: '#FFD700',
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 10,
    backgroundColor: 'transparent',
  },
  text: {
    padding: 10,
    borderWidth: 2,
    borderRadius: 2,
    position: 'absolute',
    borderColor: '#F00',
    justifyContent: 'center',
  },
  textBlock: {
    color: '#F00',
    position: 'absolute',
    textAlign: 'center',
    backgroundColor: 'transparent',
  },
});

export default TakePicture;
