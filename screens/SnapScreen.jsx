import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { Camera, CameraType, FlashMode } from 'expo-camera';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useDispatch } from 'react-redux';
import { addPic } from '../reducers/snap';

export default function SnapScreen() {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  const [hasPermission, setHasPermission] = useState(false);
  const [type, setType] = useState(CameraType.back);
  const [flashMode, setFlashMode] = useState(FlashMode.off);

  let cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const takePicture = async () => {
    const photo = await cameraRef.takePictureAsync({ quality: 0.3 });
    //console.log(photo);
    dispatch(addPic(photo.uri));
  };

  if (!hasPermission || !isFocused) {
    return <View />;
  }

  return (
    <Camera
      ref={(ref) => (cameraRef = ref)}
      style={styles.container}
      type={type}
      flashMode={flashMode}
    >
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            setType(
              type === CameraType.back ? CameraType.front : CameraType.back
            )
          }
        >
          <FontAwesome name="rotate-right" size={30} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            setFlashMode(
              flashMode === FlashMode.off ? FlashMode.on : FlashMode.off
            )
          }
        >
          <FontAwesome
            name="flash"
            size={30}
            color={flashMode === FlashMode.on ? '#e8be4b' : '#fff'}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.snapContainer}>
        <TouchableOpacity onPress={() => takePicture()}>
          <FontAwesome name="circle-thin" size={90} color="#fff" />
        </TouchableOpacity>
      </View>
    </Camera>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonsContainer: {
    flex: 0.1,
    paddingTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    alignItems: 'flex-end',
  },
  snapContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 30,
  },
  button: {
    width: 45,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(250,0,0,0.2)',
    borderRadius: 50,
  },
});
