import React, { Component,PropTypes } from 'react';
import { StyleSheet, Dimensions, View, ImageBackground, FlatList, TouchableOpacity, Alert } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import greenMapStyles from './MapStyles/greenMapStyles.json';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import axios from 'axios';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text , List, ListItem, } from 'native-base';
import { dataSchema } from './schemaRealm';

const Realm = require('realm');
class housedata extends Component {  
  static navigationOptions = {
        header:null,
  };
   constructor(props){
    super(props);
    this.state = {
        dataku: [],
        region: {
          latitude: 24.970168,
          longitude: 121.2652727,
          latitudeDelta: 0.004,
          longitudeDelta: 0.004,
        },
        icon:"staro",
        tabNum: 0,
    };
  }
  componentDidMount(){ 
    var url = this.props.navigation.state.params.url;
    axios.get(url)
    .then((houseData) => {
      this.setState({
        dataku:houseData.data,
        region: {
          latitude:  houseData.data[0].latitude,
          longitude:  houseData.data[0].longitude,
          latitudeDelta: 0.004,
          longitudeDelta: 0.004,
        },
      })

      Realm.open({schema: [dataSchema]}).then(realm => {
        realm.write(() => { 
          let all = realm.objects('data');
          let allName = '';
          const box =[]
          for(let x of all){
            allName = allName + x.name + ',';
            box.push(JSON.stringify(x.name).split("\"")[1])
          }
          console.log(box[0])
          for (var i = 0; i < all.length; i++){
            if (box[i] == this.state.dataku[i].name){
              this.setState({ icon: 'star'}) 
            } 
          }
        });
      })
    })

  };

  changeActive = (x) =>{
    Realm.open({schema: [dataSchema]}).then(realm => {
      realm.write(() => { 
        let all = realm.objects('data');
        let allName = '';
        const box =[]
        for(let x of all){
          allName = allName + x.name + ',';
          box.push(JSON.stringify(x.name).split("\"")[1])
        }
        console.log(box[0]) 
        for (var i = 0; i < all.length; i++){
          for (var j = 0; j < this.state.dataku.length; j++){
            if (box[i] == this.state.dataku[j].name){
              this.setState({ icon: 'star'}) 
            } 
          }
        }
      });
    })
  }


  renderItem = ({ item, index }) => {
    return (
        <View style={styles.list}>
            <Left >
              <Icon active={this.state.change} style = {styles.icon} type="AntDesign" name={this.state.icon}
                onPress={ () => 
                  Realm.open({schema: [dataSchema]}).then(realm => {
                    realm.write(() => {
                      let check = realm.objects('data').filtered('name == "' + item.name + '"');
                      if (Object.keys(check).length == 0){
                        const house = realm.create('data', {
                          name: JSON.stringify(item.name).split("\"")[1],
                          address: JSON.stringify(item.address),
                          latitude: JSON.stringify(item.latitude),
                          longitude: JSON.stringify(item.longitude),
                          price: JSON.stringify(item.price),
                          pings: JSON.stringify(item.pings),
                          floor: JSON.stringify(item.floor),
                          year: JSON.stringify(item.year),
                          _type: JSON.stringify(item._type),
                          presentSituation: JSON.stringify(item.presentSituation),
                        });
                        this.changeActive(index)
                        Alert.alert( '新增我的最愛','已加入我的最愛 ！', [{text: '確定'}]);
                      } else {
                        Alert.alert('新增我的最愛','已加入過囉 ！', [{text: '確定'}]);
                      } 
                    });
                  }).catch(error => {console.log(error); })
                }
              />
            </Left>
            <Body style={styles.body}>
              <Text style = {styles.info} 
                    onPress={ () => {this.setState({
                      region: {
                        latitude: item.latitude,
                        longitude:  item.longitude,
                        latitudeDelta: 0.004,
                        longitudeDelta: 0.004,
                        },
                      })
                    }}
              >
                <Text>名稱 ：</Text><Text>{item.name} </Text>{"\n"}
                <Text>地址 ：</Text><Text>{item.address}</Text>{"\n"}
                <Text>總價 ：</Text><Text>{item.price} 萬</Text>{"\n"}
                <Text>坪數 ：</Text><Text>{item.pings} 坪</Text>{"\n"}
                <Text>{item.icon}</Text>
              </Text>
            </Body>
            <Right>
              <Button transparent onPress={() => this.props.navigation.navigate('Housedetail',{'name':item.name,'college':this.props.navigation.state.params.area,'price':item.price,"floor":item.floor,'pings':item.pings, 'address':item.address, 'year':item.year, 'type':item._type, 'presentSituation':item.presentSituation, 'picture':item.picture })}>
                <Icon type="AntDesign" name="infocirlceo" style = {styles.icon}/>
              </Button>
            </Right>
        </View>
    )
  }

  render() {
    const cities = [
        {city: "元智大學", lat: 24.970168, lon:121.2652727},
        {city: "中原大學", lat: 24.9575418, lon:121.2388328},
        {city: "中央大學", lat: 24.9679966, lon:121.1922029}
      ];
    const { params } = this.props.navigation.state;
    const college = params.area    

    return (
      <Container>
        <ImageBackground style={styles.background} >
          <View style={styles.mapsize}>
            <MapView
               provider={PROVIDER_GOOGLE} // remove if not using Google Maps
               style={styles.map}
               customMapStyle={ greenMapStyles }
               region={this.state.region}
               >
               <MapView.Marker 
                coordinate={ this.state.region }
                image={require('./loca.png')}
              />
              {this.state.dataku.map(marker => (
                  <Marker
                    coordinate = {{latitude: marker.latitude,
                    longitude: marker.longitude}}
                    title = {marker.name}
                    image={require('./loca.png')}
                  />
                ))
              }
            </MapView>
          </View>
          <View block warning style={styles.house} >
            <Left style={styles.left}>
              <Button transparent>
                <Icon name='menu' style = {{color:'#FAEBCD'}}
                  onPress={ () =>
                    Realm.open({schema: [dataSchema]}).then(realm => {
                      realm.write(() => {
                        let all = realm.objects('data');
                        let allName = '';
                        for(let x of all){
                          allName = allName + x.name + '\n';
                        }
                        if (allName.length != 0){
                          Alert.alert('我的最愛',allName, [{text: '確定'},]);  
                        } else {
                          Alert.alert('我的最愛','尚未加入房屋 ！', [{text: '確定', onPress: () => console.log('点击了确认按钮')},]);                            
                        }
                      });
                    })
                  }
                />
              </Button>
            </Left>
            <Body style = {{width: 500, flex:3}}>
              <Text>
                <Text style={styles.search} >尋找</Text>
                <Text style={styles.search2} >   {college}   </Text>
                <Text style={styles.search} > 附近的房屋  </Text>
                
              </Text>
            </Body>
            <Right>
              <Button transparent>
                <Icon type="FontAwesome" name='trash' style = {{color:'#FAEBCD'}}
                  onPress={ () =>
                    Realm.open({schema: [dataSchema]}).then(realm => {
                      realm.write(() => {
                        realm.delete(realm.objects('data'));
                        Alert.alert('刪除我的最愛','已全部刪除 ！',[{text: '確定', onPress: () => console.log('点击了确认按钮')},])  
                      });
                    })
                  }
                />
              </Button>
            </Right>
          </View>
          <Content>
            <View>
              <FlatList
                  data={this.state.dataku}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={this.renderItem}
                  extraData={this.state}
                  ref={(ref) => {this.flatListRet = ref}}
              />
            </View>
          </Content>
        </ImageBackground>
      </Container>
    );
  }



}
const styles = StyleSheet.create({
  background: {
    backgroundColor: '#FAEBCD',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height - 25,
  },
  map: {
    height:200,
  },
  re:{
   top:5,
    fontSize:20,
    fontWeight: 'bold'
  },
  left:{
    flex:1,
    alignItems: 'flex-start',
    flexDirection: 'row',
    flexShrink: 0.2
  },
  list:{
    height:120,
    backgroundColor: "#FFF9F2",
    marginHorizontal: 15,
    marginTop: 10,
    borderRadius: 15, 
    paddingLeft: 15,
    opacity: 0.7,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  house:{
    height:50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#D19D62'
  },
  search:{
    fontSize:16,
    color: '#FFF9F2',
  },
  search2:{
    fontSize:19,
    fontWeight: 'bold',
    color: '#20A39E'
  },
  search3:{
    fontSize:14,
    color: '#FEFDFC',
  },
  body:{
    left: 5,
    top: 10,
    width:450,
    flex: 6,
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  info:{
    color:'#351E0A',
    left:-5,
  },
  icon:{
    justifyContent: 'center',
    alignItems: 'center', 
    fontSize: 22,
    width:22,
    color:'#351E0A',
  },
  footer:{
    top:-15,
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
export default housedata;

// <Text>
//   {textaddress[0]}{address[1]}{"\n"}
//   {textprice[0]}{price[1]}{dollar[0]}{"\n"}
//   {textfloor[0]}{floor[1]}{"\n"}
//   {textsize[0]}{size[1]}{"\n"}
//   {money[0]}
// </Text>