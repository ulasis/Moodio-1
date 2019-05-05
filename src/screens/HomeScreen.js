import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import CookieManager from 'react-native-cookies';
import Spotify from 'rn-spotify-sdk';

class HomeScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {accessToken: Spotify.getSession().accessToken};
    this.handleLogout = this.handleLogout.bind(this);
    this.openCameraScreen = this.openCameraScreen.bind(this);
    this.openAudioScreen = this.openAudioScreen.bind(this);
  }

  componentDidMount() {
    this.setState(
        {accessToken: Spotify.getSession().accessToken});
    console.log(this.state.accessToken);
    fetch('https://api.spotify.com/v1/me', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + this.state.accessToken,
      },
    }).then((response) => response.json()).then((responseJson) => {
      this.setState(responseJson);
    }).catch((error) => {
      console.error(error);
    });

    fetch('https://api.spotify.com/v1/recommendations?' +
        'seed_genres=sad', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + this.state.accessToken,
      },
    }).then((response) => response.json()).then((responseJson) => {
      this.setState({playlist: responseJson.tracks.map(track => track.name)});
    }).catch((error) => {
      console.error(error);
    });

  }

  handleLogout(event) {

    this.props.navigation.navigate('LoginScreen');
    CookieManager.clearAll();

    event.preventDefault();
  }

  openCameraScreen(event) {
    this.props.navigation.navigate('CameraScreen');

    event.preventDefault();
  }

  openAudioScreen(event) {
    this.props.navigation.navigate('AudioScreen');

    event.preventDefault();
  }

  render() {
    return (
        <View style={{top: 10}}>

          <TouchableOpacity onPress={this.handleLogout} style={{
            position: 'absolute',
            backgroundColor: '#431540',
            alignItems: 'center',
            justifyContent: 'center',
            height: 50,
            width: 50,
            borderRadius: 100,
            right: 25,
            top: 25,
          }}>
            <Text style={{color: '#EFEFEF'}}>Logout</Text>
          </TouchableOpacity>

          <Text style={styles.text}>Welcome XXXXX!</Text>
          <Text style={styles.text}>Here is a playlist just for you!</Text>
          <Text style={styles.text}>{JSON.stringify(this.state.playlist)}</Text>

        </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#431540',
  },
  text: {
    justifyContent: 'center',
    alignItems: 'center',
    color: '#431540',
    marginTop: '10%',
  },
});

export default HomeScreen;

//<Button style={styles.button} onPress={this.handleLogout} title="Logout"></Button>

//<Button style={styles.button} onPress={this.openCameraScreen} title="Take Photo"></Button>
//<Button style={styles.button} onPress={this.openAudioScreen} title="Record Voice"></Button>

/*
                        <TouchableOpacity onPress = {() => {}>
                                        <View style = {{backgroundColor: 'red', alignItems: 'center',
                                                        justifyContent: 'center', borderRadius: 15}}
                                               >
                                            <Text style = {{color: 'white'}}>Button</Text>
                                        </View>
                                    </TouchableOpacity>
*/
