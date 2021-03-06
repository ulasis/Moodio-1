import React from 'react';
import {View} from 'react-native';
import {createAppContainer, createBottomTabNavigator} from 'react-navigation';
import {Icon} from 'react-native-elements';
import CameraScreen from './screens/CameraScreen';
import AudioScreen from './screens/AudioScreen';
import HomeScreen from './screens/HomeScreen';

class TabButtonComponent extends React.Component {
  render() {
    const {name, badgeCount, color, size} = this.props;
    return (
        <View style={{width: 100, height: 24, margin: 5}}>
          <Icon style={{
            // /If you're using react-native < 0.57 overflow outside of the parent
            // will not work on Android, see https://git.io/fhLJ8
            position: 'absolute',
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
                name={name} type='font-awesome' size={size}
                color={color}>{name}</Icon>
        </View>
    );
  }
}

const getTabBarIcon = (navigation, focused, tintColor) => {
  const {routeName} = navigation.state;
  let IconComponent = TabButtonComponent;
  let iconName;
  if (routeName === 'HomeScreen') {
    iconName = 'home';
  } else if (routeName === 'CameraScreen') {
    iconName = 'camera';
  } else if (routeName === 'AudioScreen') {
    iconName = 'microphone';
  }

  return <IconComponent name={iconName} size={25} color={tintColor}/>;
};

const BottomTab = createAppContainer(
    createBottomTabNavigator(
        {
          HomeScreen: HomeScreen,
          CameraScreen: CameraScreen,
          AudioScreen: AudioScreen,
        },
        {
          defaultNavigationOptions: ({navigation}) => ({
            tabBarIcon: ({focused, tintColor}) =>
                getTabBarIcon(navigation, focused, tintColor),
          }),
          tabBarOptions: {
            activeTintColor: '#24115A',
            inactiveTintColor: '#8B709A',
          },
        },
    ),
);

export default BottomTab;
