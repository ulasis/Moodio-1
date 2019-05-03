import React, { Component } from 'react'
import { Image, Text, View, StyleSheet, Linking, Button } from 'react-native'
import InnerWeb from './InnerWeb';
import { Buffer } from 'buffer'
import logo from './logo.png';

console.log(logo);

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#EFEFEF',
    },
    logoContainer: {
          flex: 0,
          height: undefined,
          width: undefined,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#EFEFEF',
        },
    text: {
        justifyContent: 'center',
        alignItems: 'center',
        color: '#431540',
        marginTop: '10%',
        fontSize: 25
    },
    loginText: {
            justifyContent: 'center',
            alignItems: 'center',
            color: '#431540',
            marginTop: '25%',
            fontSize: 15
        },
      button:{
        padding: 5,
        height: 50,
        width: 50,  //The Width must be the same as the height
        borderRadius:100, //Then Make the Border Radius twice the size of width or Height
        backgroundColor:'rgb(195, 125, 198)',

      }
  });

class Login extends React.Component{

    constructor(props)
    {
        super(props);
        this.state = {loginClick:false, error:''};
        this.handleLogin = this.handleLogin.bind(this);
        this.onNavigationChange = this.onNavigationChange.bind(this);
    }

    handleLogin(event) {

        this.setState({loginClick:'true'});
        
        event.preventDefault();
    }

    onNavigationChange(webViewState) {
        //Check if the process is successfully redirected
        if (webViewState.url.substring(0,28) === 'https://example.com/callback'){
            if (webViewState.url.substring(29,34) === 'error'){
                this.setState({loginClick:false, error:webViewState.url.substring(35)});
            }
            else{
                const usercode = webViewState.url.substring(34, webViewState.url.length - 17)
                //Get tokens for user
                fetch('https://accounts.spotify.com/api/token?grant_type=authorization_code&code=' + usercode 
                + '&redirect_uri=https://example.com/callback', {
                    method: 'POST',
                    headers: {
                      'Accept':'application/json',
                      'Content-Type': 'application/x-www-form-urlencoded',
                      'Authorization': 'Basic ' + Buffer.from("c4ed4e112a58428b9e4bab08f4fefd8c" + ':' + "7865065897654383bac631a451d42900").toString('base64')
                    }
                })
                .then((response) => response.json())
                .then((responseJson) => {
                    this.setState({loginClick:false, error:''});
                    this.props.navigation.navigate('Tabs', { data: { usercode: usercode, response: responseJson} });

                })
                .catch((error) =>{
                    this.setState({loginClick:false, error:error});
                    console.error(error);
                });
            }
        }
    }

    render()
    {
        if (!this.state.loginClick){
            return (
                <View style={styles.container}>
                    <Image style={{ width: 300, height: 70 }}
                              resizeMode="cover"
                               source={require('./logo.png')}
                              //source={{ uri: './logo.png' }}
                            />
                    <Text style = {styles.text}>LISTEN TO YOUR MOOD</Text>
                    <Text style = {styles.loginText}>Login with your Spotify account</Text>
                    <Text></Text>
                    <Button onPress={this.handleLogin} title="Login" color="#431540" ></Button>
                </View>
            );
        }
        else{
            return (
                <View style={styles.container}>
                    <InnerWeb parentReference = {this.onNavigationChange}>
                    </InnerWeb>
                </View>
            ); 
        }
    }
    
}

export default Login;