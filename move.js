import React, { Component } from 'react';
import { StyleSheet, View, Dimensions, Image } from 'react-native';

export default class move extends Component {
  static navigationOptions = {
    header: null
  }
  componentDidMount() {
    setTimeout(() => {
      this.props.navigation.navigate('Home');
    }, 2000)
  }

  render(){
    return (
      <View style = {style.mainView}>      
        <Image source = {require("./logo_move.png")} style = {style.logo} />
        <Image source = {require("./move_title2.png")} style = {style.title} />
      </View>
    );
  }
}
const style = StyleSheet.create({
  mainView:{
    flex:1,
    flexDirection:'column',
    backgroundColor: "#D69830",
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo:{
    alignItems: 'center',
    width: 300,
    height: 225,
  },
  title:{
    alignItems: 'center',
    width: 300,
    height: 50,
    
  }
})
