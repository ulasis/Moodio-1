import React from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import Camera from 'react-native-camera';
import RNFetchBlob from 'react-native-fetch-blob';

const azureFaceAPI = 'https://westeurope.api.cognitive.microsoft.com/face/v1.0/detect?returnFaceId=true&returnFaceLandmarks=false&returnFaceAttributes=age,gender,smile,emotion,hair';

class CameraScreen extends React.Component {

  constructor(props) {
    super(props);
  }

  takePicture() {
    this.camera.capture().then((data) => {

      console.log(data);

      RNFetchBlob.fetch('POST', azureFaceAPI, {
        'Content-Type': 'application/octet-stream',
        'Ocp-Apim-Subscription-Key': '6163804f762148a3b9f67b09a6b95e8e',
        // Change BASE64 encoded data to a file path with prefix `RNFetchBlob-file://`.
        // Or simply wrap the file path with RNFetchBlob.wrap().
      }, RNFetchBlob.wrap(data.path)).then((res) => {
        console.log(res.json());
        this.props.navigation.navigate('MoodDetectScreen',
            {data: {img: data.path, mood: res.json()}});
      }).catch((err) => {
        // error handling ..
        console.log(err);
      });

    }).catch(err => console.error(err));
  }

  render() {
    return (
        <Camera ref={cam => { this.camera = cam; }} style={styles.preview}
                aspect={Camera.constants.Aspect.fill} type='front'
                captureTarget={Camera.constants.CaptureTarget.temp}
                fixOrientation={true}>
          <View style={styles.circle}/>
          <Text style={styles.capture}
                onPress={this.takePicture.bind(this)}> [CAPTURE]
          </Text>
        </Camera>
    );
  }

}

const styles = StyleSheet.create({
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    margin: 40,
  },
  circle: {
    width: (Dimensions.get('window').width - 100),
    height: (Dimensions.get('window').height / 2),
    borderRadius: (Dimensions.get('window').width - 100) / 2,
    borderWidth: 1,
    borderColor: 'black',
  },
});

export default CameraScreen;