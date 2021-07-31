import React, { Component } from "react";
import { Container,  Content, Icon, Picker, Form, Button, Text, View } from "native-base";
import {StyleSheet, Dimensions, ImageBackground} from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import LightMapStyles from './MapStyles/greenMapStyles.json';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import next from'./housedata.js';
import Data from './data.json';

const pinColor = '#fff';
export default class area extends Component {
  static navigationOptions = {
        header:null,
  };
  constructor(props) {
    super(props);
    this.state = {
      selected: '元智大學', 
      currentLatitude: null,
      currentLongitude: null,
      region: {
        latitude: 24.970168,
        longitude: 121.2652727,
        latitudeDelta: 0.009,
        longitudeDelta: 0.009,
      },
      url: "http://10.0.2.2:3210/yzu",
    };
  }

  render() {
    const a = Data.yzudata;
    const b = Data.cycdata;
    const c = Data.ncudata;
    const cities = [
      {city: "元智大學", lat: 24.970168, lon:121.2652727 , url: "http://10.0.2.2:3210/yzu" },
      {city: "中原大學", lat: 24.9575418, lon:121.2388328, url: "http://10.0.2.2:3410/cyc"},
      {city: "中央大學", lat: 24.9679966, lon:121.1922029, url: "http://10.0.2.2:3310/ncu"}
    ];
    if(this.state.selected == "元智大學"){  
      return (
          <View style={styles.background} >
            <View style={styles.Container}>
              <Text style={styles.school}>請選擇地區</Text>
              <View style={styles.subContainer}>
                <Form> 
                  <Picker
                    mode="dropdown"
                    style={styles.picker}
                    selectedValue={this.state.selected}
                    onValueChange = { (itemValue, itemIndex) => {
                        this.setState({
                          selected: itemValue,
                          region: {
                            latitude: cities[itemIndex].lat,
                            longitude: cities[itemIndex].lon,
                            latitudeDelta: 0.009,
                            longitudeDelta: 0.009,

                          }
                        });
                      }
                    }>
                    <Picker.Item  label="桃園市" value="TY" />
                    <Picker.Item  label="台北市" value="TP" />
                    <Picker.Item  label="新北市" value="NTP" />
                  </Picker>
                </Form>
              </View>
              <View style={styles.subContainer}>
                <Form>
                  <Picker
                    mode="dropdown"
                    style={styles.picker2}
                    selectedValue={this.state.selected}
                    onValueChange = { (itemValue, itemIndex) => {
                        this.setState({
                          selected: itemValue,
                          region: {
                            latitude: cities[itemIndex].lat,
                            longitude: cities[itemIndex].lon,
                            latitudeDelta: 0.009,
                            longitudeDelta: 0.009,
                          },
                          url: cities[itemIndex].url,
                        });
                      }
                    }>
                    <Picker.Item  label="元智大學" value="元智大學" />
                    <Picker.Item  label="中原大學" value="中原大學" />
                    <Picker.Item  label="中央大學" value="中央大學" />
                  </Picker>
                </Form>
              </View>
              <View>
                <Button block warning style = {styles.button} onPress = {() => this.props.navigation.navigate('Housedata',{'region':this.state.region,'area':this.state.selected, 'url':this.state.url})}>
                  <Text>
                    <Text style={styles.text}>搜  尋  </Text>
                    <Icon style={{ color: '#FEFDFC', fontSize: 22}} type="FontAwesome" name="search" />
                  </Text>
                </Button>
              </View>
            </View>
            <View style={styles.background2}>  
                  
              <MapView 
                provider = {PROVIDER_GOOGLE} // remove if not using Google Maps
                style = {styles.map}
                customMapStyle={ LightMapStyles }
                region = {this.state.region}
              >
                <MapView.Marker 
                  coordinate={ this.state.region }
                  image={require('./marker.png')}
                />

                <MapView.Circle
                  key = { (this.state.currentLongitude + this.state.currentLongitude).toString() }
                  center = { this.state.region }
                  radius = { 500 }
                  strokeWidth = { 1 }
                  strokeColor = { '#1a66ff' }
                  fillColor = { 'rgba(230,238,255,0.5)' }
                />

                {a.map(marker => (
                      <Marker
                        coordinate = {{latitude: marker.latitude,
                        longitude: marker.longitude}}
                        title = {marker.title}
                        image={require('./loca.png')}
                      />
                    ))
                  }

              </MapView>

            </View>
            <Text style={styles.word}>註:「當個包租公」是協助想投資房地產的消費者計算出最符合自身經濟狀的APP</Text> 
          </View>
      );
    }else if(this.state.selected == "中原大學"){  
      return (
          <View style={styles.background} >
            <View style={styles.Container}>
              <Text style={styles.school}>請選擇地區</Text>
              <View style={styles.subContainer}>
                <Form> 
                  <Picker
                    mode="dropdown"
                    style={styles.picker}
                    selectedValue={this.state.selected}
                    onValueChange = { (itemValue, itemIndex) => {
                        this.setState({
                          selected: itemValue,
                          region: {
                            latitude: cities[itemIndex].lat,
                            longitude: cities[itemIndex].lon,
                            latitudeDelta: 0.009,
                            longitudeDelta: 0.009,

                          }
                        });
                      }
                    }>
                    <Picker.Item  label="桃園市" value="TY" />
                    <Picker.Item  label="台北市" value="TP" />
                    <Picker.Item  label="新北市" value="NTP" />
                  </Picker>
                </Form>
              </View>
              <View style={styles.subContainer}>
                <Form>
                  <Picker
                    mode="dropdown"
                    style={styles.picker2}
                    selectedValue={this.state.selected}
                    onValueChange = { (itemValue, itemIndex) => {
                        this.setState({
                          selected: itemValue,
                          region: {
                            latitude: cities[itemIndex].lat,
                            longitude: cities[itemIndex].lon,
                            latitudeDelta: 0.009,
                            longitudeDelta: 0.009,
                          },
                          url: cities[itemIndex].url,
                        });
                      }
                    }>
                    <Picker.Item  label="元智大學" value="元智大學" />
                    <Picker.Item  label="中原大學" value="中原大學" />
                    <Picker.Item  label="中央大學" value="中央大學" />
                  </Picker>
                </Form>
              </View>
              <View>
                <Button block warning style = {styles.button} onPress = {() => this.props.navigation.navigate('Housedata',{'region':this.state.region,'area':this.state.selected, 'url':this.state.url})}>
                  <Text>
                    <Text style={styles.text}>搜  尋  </Text>
                    <Icon style={{ color: '#FEFDFC', fontSize: 22}} type="FontAwesome" name="search" />
                  </Text>
                </Button>
              </View>
            </View>
            <View style={styles.background2}>  
              
              <MapView 
                provider = {PROVIDER_GOOGLE} // remove if not using Google Maps
                style = {styles.map}
                customMapStyle={ LightMapStyles }
                region = {this.state.region}
              >
                <MapView.Marker 
                  coordinate={ this.state.region }
                  image={require('./marker.png')}
                /> 

                <MapView.Circle
                  key = { (this.state.currentLongitude + this.state.currentLongitude).toString() }
                  center = { this.state.region }
                  radius = { 500 }
                  strokeWidth = { 1 }
                  strokeColor = { '#1a66ff' }
                  fillColor = { 'rgba(230,238,255,0.5)' }
                />

                {b.map(marker => (
                    <Marker
                      coordinate = {{latitude: marker.latitude,
                      longitude: marker.longitude}}
                      title = {marker.title}
                      image={require('./loca.png')}
                    />
                  ))
                }

              </MapView>            
            </View>
            <Text style={styles.word}>註:「當個包租公」是協助想投資房地產的消費者計算出最符合自身經濟狀的APP</Text> 
          </View>
      );
    }else{  
      return (
          <View style={styles.background} >
            <View style={styles.Container}>
              <Text style={styles.school}>請選擇地區</Text>
              <View style={styles.subContainer}>
                <Form> 
                  <Picker
                    mode="dropdown"
                    style={styles.picker}
                    selectedValue={this.state.selected}
                    onValueChange = { (itemValue, itemIndex) => {
                        this.setState({
                          selected: itemValue,
                          region: {
                            latitude: cities[itemIndex].lat,
                            longitude: cities[itemIndex].lon,
                            latitudeDelta: 0.009,
                            longitudeDelta: 0.009,

                          }
                        });
                      }
                    }>
                    <Picker.Item  label="桃園市" value="TY" />
                    <Picker.Item  label="台北市" value="TP" />
                    <Picker.Item  label="新北市" value="NTP" />
                  </Picker>
                </Form>
              </View>
              <View style={styles.subContainer}>
                <Form>
                  <Picker
                    mode="dropdown"
                    style={styles.picker2}
                    selectedValue={this.state.selected}
                    onValueChange = { (itemValue, itemIndex) => {
                        this.setState({
                          selected: itemValue,
                          region: {
                            latitude: cities[itemIndex].lat,
                            longitude: cities[itemIndex].lon,
                            latitudeDelta: 0.009,
                            longitudeDelta: 0.009,
                          },
                          url: cities[itemIndex].url,
                        });
                      }
                    }>
                    <Picker.Item  label="元智大學" value="元智大學" />
                    <Picker.Item  label="中原大學" value="中原大學" />
                    <Picker.Item  label="中央大學" value="中央大學" />
                  </Picker>
                </Form>
              </View>
              <View>
                <Button block warning style = {styles.button} onPress = {() => this.props.navigation.navigate('Housedata',{'region':this.state.region,'area':this.state.selected, 'url':this.state.url})}>
                  <Text>
                    <Text style={styles.text}>搜  尋  </Text>
                    <Icon style={{ color: '#FEFDFC', fontSize: 22}} type="FontAwesome" name="search" />
                  </Text>
                </Button>
              </View>
            </View>
            <View style={styles.background2}>  
                 
              <MapView 
                provider = {PROVIDER_GOOGLE} // remove if not using Google Maps
                style = {styles.map}
                customMapStyle={ LightMapStyles }
                region = {this.state.region}
              >
                <MapView.Marker 
                  coordinate={ this.state.region }
                  image={require('./marker.png')}
                />
                <MapView.Circle
                  key = { (this.state.currentLongitude + this.state.currentLongitude).toString() }
                  center = { this.state.region }
                  radius = { 500 }
                  strokeWidth = { 1 }
                  strokeColor = { '#1a66ff' }
                  fillColor = { 'rgba(230,238,255,0.5)' }
                />
                {c.map(marker => (
                    <Marker
                      coordinate = {{latitude: marker.latitude,
                      longitude: marker.longitude}}
                      title = {marker.title}
                      image={require('./loca.png')}
                    />
                  ))
                }

              </MapView>            
            </View>
            <Text style={styles.word}>註:「當個包租公」是協助想投資房地產的消費者計算出最符合自身經濟狀的APP</Text> 
          </View>
      );
    }
  }
}
const styles = StyleSheet.create({
  background: {
    backgroundColor: "#FAEBCD",
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  },
  Container: {
    flex:1
  },
  subContainer: {
    marginBottom: 5,
    padding: 5,
  },
  background2: {
    flex:0.8,
    backgroundColor: "#FAEBCD",
    flexDirection: 'column',
    justifyContent: 'center',
  },
  picker:{
    width:300,
    top:40,
    left:58,
    backgroundColor: "#FFE5BA" ,
  },
  picker2:{
    width:300,
    padding: 2,
    top:40,
    left:58,
    backgroundColor: "#FFE5BA" ,
  },
  button:{
    backgroundColor: "#D19D62",
    width: 120,
    top:80,
    left:148,
  },
  map: {  
    position: "absolute",
    width: Dimensions.get('window').width,
    height: 250,
    
  },
  school:{
    fontSize:18,
    left:160,
    top:35
  },
  text:{
    fontSize:20,
    color: '#FEFDFC'
  },
  word:{
    flex:0.25,
    fontSize:15,
    color: '#D1944D',
  }
});

