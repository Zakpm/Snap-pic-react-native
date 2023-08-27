import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removePic } from '../reducers/snap';

export default function GalleryScreen() {
  const dispatch = useDispatch();
  const snap = useSelector((state) => state.snap.value);
  //console.log(snap);

  const pics = snap.pics.map((data, i) => {
    return (
      <View style={styles.picContainer} key={i}>
        <TouchableOpacity onPress={() => dispatch(removePic(data))}>
          <FontAwesome name="times" size={20} />
        </TouchableOpacity>
        <Image source={{ uri: data }} style={styles.image} />
      </View>
    );
  });

  return (
    <SafeAreaView style={styles.container}>
      <Text>GalleryScreen</Text>
      <Text>Logged as : {snap.email}</Text>

      <ScrollView contentContainerStyle={styles.galleryContainer}>
        {pics}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  galleryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 60,
  },
  picContainer: {
    alignItems: 'flex-end',
  },
  image: {
    width: 150,
    height: 150,
    margin: 10,
  },
});
