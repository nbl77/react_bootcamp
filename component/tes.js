import React from 'react';
import { View, TouchableOpacity, TouchableWithoutFeedback, Dimensions } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { useCamera } from 'react-native-camera-hooks';

function FunctionalComponentExample() {
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
    },
  ] = useCamera(initialProps);

  return (
    <View style={{ flex: 1 }}>
      <RNCamera
        ref={cameraRef}
        autoFocusPointOfInterest={autoFocusPoint.normalized}
        type={type}
        ratio={ratio}
        style={{ flex: 1 }}
        autoFocus={autoFocus}
        onTextRecognized={textRecognized}
        onFacesDetected={facesDetected}
      />
    </View>
  );
};

export default FunctionalComponentExample
