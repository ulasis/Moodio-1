import React from 'react';
import {Image, ScrollView, StyleSheet, Text} from 'react-native';

class MoodDetect extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      mood: this.props.navigation.state.params.data.mood,
      img: this.props.navigation.state.params.data.img,
    };
  }

  componentDidMount() {
    this.setState({
      mood: this.props.navigation.state.params.data.mood,
      img: this.props.navigation.state.params.data.img,
    });
  }

  render() {
    return (
        <ScrollView>
          <Image style={{width: 150, height: 150, resizeMode: 'contain'}}
            source={{
              uri: this.state.img,
            }}/>
          <Text>Result: {JSON.stringify(this.state.mood[0].faceAttributes.emotion)}</Text>
        </ScrollView>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flex: 1,
  },
});

export default MoodDetect;