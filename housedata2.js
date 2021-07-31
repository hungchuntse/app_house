import React, { Component,PropTypes } from 'react';
import {StyleSheet,Dimensions,View,ImageBackground,FlatList} from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
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
        latitudeDelta: 0.04,
        longitudeDelta: 0.04,
              }

    };
}
  componentDidMount(){
    var url = 'http://10.0.2.2:3210/yzu';
    axios.get(url)
    .then((houseData) => {
      console.log(houseData.data);
      this.setState({
        dataku:houseData.data,
      }) 
    })
  };

  render() {
   
    const cities = [
        {city: "元智大學", lat: 24.970168, lon:121.2652727},
        {city: "中原大學", lat: 24.9575418, lon:121.2388328},
        {city: "中央大學", lat: 24.9679966, lon:121.1922029}
      ];
    const { params } = this.props.navigation.state;
    const college = params.area
      
    const address = this.state.dataku.map((item, index,array)=>{ return [item.門牌] ;})
    const price = this.state.dataku.map((item, index,array)=>{   return [item.總價,] ;})
    const floor = this.state.dataku.map((item, index,array)=>{   return [item.樓層,] ;})
    const size = this.state.dataku.map((item, index,array)=>{    return [item.總坪數] ;})
   // const textaddress = this.state.dataku.map((item, index,array)=>{    return [item.門牌]='地址:';})
   // const textprice = this.state.dataku.map((item, index,array)=>{    return [item.門牌]='總價:';})
   // const textfloor = this.state.dataku.map((item, index,array)=>{    return [item.門牌]='樓層:';})
   // const textsize = this.state.dataku.map((item, index,array)=>{    return [item.門牌]='坪數:';})
   // const dollar = this.state.dataku.map((item, index,array)=>{    return [item.門牌]='萬';})
   // const money = this.state.dataku.map((item, index,array)=>{    return [item.門牌]='每月可賺:2000元!';})
    return (
      <Container>
        <ImageBackground style={styles.background} >
          <View style={styles.mapsize}>
            <MapView
               provider={PROVIDER_GOOGLE} // remove if not using Google Maps
               style={styles.map}
               customMapStyle={ greenMapStyles }
               region={params.region}
               >
               <MapView.Marker 
                  coordinate={ this.state.region }
                  image={require('./loca.png')}
                />
            </MapView>
            </View>
            <View block warning style={styles.house} >
              <Left style={styles.left}>
                <Button transparent>
                  <Icon name='menu' style = {{color:'skyblue'}}
                    onPress={ () =>
                      Realm.open({schema: [dataSchema]}).then(realm => {
                        realm.write(() => {
                          let all = realm.objects('data');
                          let allName = '';
                          for(let x of all){
                            allName = allName + x.address + '\n';
                          }
                          alert(allName);  
                        });
                      })
                    }
                  />
                </Button>
              </Left>
              <Body style = {{width: 500, flex:3}}>
                <Text>
                  <Text style={styles.search} >尋找</Text>
                  <Text style={styles.search2} >   {college}  </Text>
                  <Text style={styles.search} > 附近的房屋  </Text>
                  
                </Text>
              </Body>
              <Right>
                <Button transparent>
                  <Icon type="FontAwesome" name='trash' style = {{color:'pink'}}
                    onPress={ () =>
                      Realm.open({schema: [dataSchema]}).then(realm => {
                        realm.write(() => {
                          realm.delete(realm.objects('data'));
                          alert('已全部刪除!')  
                        });
                      })
                    }
                  />
                </Button>
              </Right>
            </View>
          <Content>
            <List>
              <ListItem thumbnail style={styles.list}>
                <Left>
                  <Icon style = {styles.icon} type="AntDesign" name="staro" color='red'
                    onPress={ () =>
                      Realm.open({schema: [dataSchema]}).then(realm => {
                        realm.write(() => {
                          let check = realm.objects('data').filtered('address == "' + address[0] + '"');
                          // alert(Object.values(address[0]));
                          if (Object.keys(check).length == 0){
                            const house = realm.create('data', {
                              address: JSON.stringify(address[0]).split("\"")[1],
                              price: JSON.stringify(price[0]),
                              floor: JSON.stringify(floor[0]).split("\"")[1],
                              size: JSON.stringify(size[0]),
                            });
                            alert("已加入我的最愛!");
                          } else {
                            alert("已加入過囉!");
                          } 
                        });
                      }).catch(error => {console.log(error); })
                    }
                  />
                </Left>
                <Text style = {styles.info}>
                  地址：{address[0]}{"\n"}
                  總價：{price[0]}{"\n"}
                  樓層：{floor[0]}{"\n"}
                  總坪數：{size[0]}
                </Text>                
                <Right >
                  <Button transparent onPress={() => this.props.navigation.navigate('Housedetail',{'address':address,'college':college,'price':price,"floor":floor,'size':size,'index':0})}>
                    <Icon type="AntDesign" name="infocirlceo" style = {{color:'#351E0A'}}/>
                  </Button>
                </Right>
              </ListItem>
              <ListItem thumbnail style={styles.list}>
                <Left >
                  <Icon style = {styles.icon} type="AntDesign" name="staro" color='red'
                    onPress={ () =>
                      Realm.open({schema: [dataSchema]}).then(realm => {
                        realm.write(() => {
                          let check = realm.objects('data').filtered('address == "' + address[1] + '"');
                          alert(address[0]);
                          if (Object.keys(check).length == 0){
                            const house = realm.create('data', {
                              address: JSON.stringify(address[1]).split("\"")[1],
                              price: JSON.stringify(price[1]),
                              floor: JSON.stringify(floor[1]).split("\"")[1],
                              size: JSON.stringify(size[1]),
                            });
                            alert("已加入我的最愛!");
                          } else {
                            alert("已加入過囉!");
                          } 
                        });
                      }).catch(error => {console.log(error); })
                    }
                  />
                </Left>
                <Text style = {styles.info}>
                  地址：{address[1]}{"\n"}
                  總價：{price[1]}{"\n"}
                  樓層：{floor[1]}{"\n"}
                  總坪數：{size[1]}
                </Text>                
                <Right >
                  <Button transparent onPress={() => this.props.navigation.navigate('Housedetail',{'address':address,'college':college,'price':price,"floor":floor,'size':size,'index':0})}>
                    <Icon type="AntDesign" name="infocirlceo" style = {{color:'#351E0A'}}/>
                  </Button>
                </Right>
              </ListItem>
              <ListItem thumbnail style={styles.list}>
                <Left >
                  <Icon style = {styles.icon} type="AntDesign" name="staro" color='red'
                    onPress={ () =>
                      Realm.open({schema: [dataSchema]}).then(realm => {
                        realm.write(() => {
                          let check = realm.objects('data').filtered('address == "' + address[2] + '"');
                          alert(address[0]);
                          if (Object.keys(check).length == 0){
                            const house = realm.create('data', {
                              address: JSON.stringify(address[2]).split("\"")[1],
                              price: JSON.stringify(price[2]),
                              floor: JSON.stringify(floor[2]).split("\"")[1],
                              size: JSON.stringify(size[2]),
                            });
                            alert("已加入我的最愛!");
                          } else {
                            alert("已加入過囉!");
                          } 
                        });
                      }).catch(error => {console.log(error); })
                    }
                  />
                </Left>
                <Text style = {styles.info}>
                  地址：{address[2]}{"\n"}
                  總價：{price[2]}{"\n"}
                  樓層：{floor[2]}{"\n"}
                  總坪數：{size[2]}
                </Text>                
                <Right >
                  <Button transparent onPress={() => this.props.navigation.navigate('Housedetail',{'address':address,'college':college,'price':price,"floor":floor,'size':size,'index':0})}>
                    <Icon type="AntDesign" name="infocirlceo" style = {{color:'#351E0A'}}/>
                  </Button>
                </Right>
              </ListItem>
            </List>
          </Content>
        </ImageBackground>
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  background: {
    backgroundColor: '#FCD9A4',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  map: {
    height:200,
    width:Dimensions.get('window').height,
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
    height:125,
    backgroundColor: "#FEFAE0",
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
    backgroundColor: '#BC8A51'
  },
  search:{
    fontSize:16,
    color: '#FEFDFC',
  },
  search2:{
   fontSize:19,
  fontWeight: 'bold',
   color: '#FFD6B2'
  },
  info:{
    flex:2,
    textAlign:'left',
    color:'#351E0A',
    left:20,
  },
  icon:{
    justifyContent: 'center',
    alignItems: 'center', 
    fontSize: 23,
    left:5,
    width:25,
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