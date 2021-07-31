import React, { Component } from 'react';
import { Image ,Dimensions,StyleSheet} from 'react-native';
import { Container, Button,  Text} from 'native-base';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import search from'./page2.js';
import housedata from'./housedata.js';
import housedetail from './housedetail.js';
import rate from './rate.js';
import move from './move.js';




class HomeScreen extends React.Component {
  static navigationOptions = {
        header:null,
  };
  render() {
    return (
      <Container style={styles.background}>
          <Image source={require('./logo.png')} style={styles.logo}/>
          <Button large block warning style={styles.button}
            onPress={() => this.props.navigation.navigate('login')}>
            <Text style={styles.text}>開始找房子</Text>
          </Button>
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  logo: {
    width: 180,
    height:145,
    left:115,
    top:150
  },
  button:{
    width:140,
    height:60,
    left:135,
    top:170
  },
  text:{
    fontSize: 20
  },
  background:{
    backgroundColor: "#FCD9A4" 
  }
})

const Navigation =createStackNavigator({
  Home:HomeScreen,
  Search:search,
  Housedata:housedata,
  Housedetail:housedetail,
  Rate:rate,
  move:move,

},
{
initialRouteName: 'move',
defaultNavigationOptions: {
headerStyle: {
backgroundColor: '#BC6C25',

},
headerTintColor: '#fff',
headerTitleStyle: {
fontWeight: '#FCD9A4',
textAlign:"left",
flex:1

},
},
}
);

const AppContainer = createAppContainer(Navigation);

export default class A extends React.Component {
  render() {
    return <AppContainer />;
  }
}
