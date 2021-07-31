import React, { Component } from 'react';
import { Image,ImageBackground,StyleSheet,Dimensions,View, FlatList} from 'react-native';
import axios from 'axios';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right, Toast, Title, List} from 'native-base';

export default class CardImageExample extends Component {
  static navigationOptions = {
          header:null,
    };
  constructor(props){
    super(props);
    this.state = {
        history: [],
    };
  }

  componentDidMount(){
    const a =[] 
    var i = 0
    var url = 'http://10.0.2.2:3610/sellhouse';
    axios.get(url)
    .then((sellhouseData) => {
      for (i = 0; i < sellhouseData.data.length; i++) {
          if (sellhouseData.data[i].name == this.props.navigation.state.params.name) {
              a.push(sellhouseData.data[i])
          }
      }
      this.setState({
        history:a,
      })
    })
  };

  renderItem = ({ item }) => {
    return (
        <View style={styles.list}>
            <Text style = {styles.info} >
              名稱：{item.name}{"\n"}
              交易年月：{item.time}{"\n"}
              樓層：{item.floor}
            </Text>
            <Text style = {styles.info} >
              總價：{item.price} 萬{"\n"}
              坪數：{item.pings} 坪{"\n"}
              成交單價：{item.per_price} 萬
            </Text>
        </View>
    )
  }

  render() {
    return (
      <Container>
        <Header style={styles.header}>
          <Left>
            <Button style={styles.header} onPress={() => this.props.navigation.navigate('Housedetail')}>
              <Icon type="FontAwesome" name='angle-left'/>
            </Button>
          </Left>
          <Body style={styles.header_body}>
            <Title>歷年成交紀錄</Title>
          </Body>
          <Right>

          </Right>
        </Header>
        <Content>
          <ImageBackground style={styles.background} >
            <View>
              <FlatList
                  data={this.state.history}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={this.renderItem}
                  extraData={this.state}
              />
            </View>
          </ImageBackground>
        </Content>
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  background: {
    backgroundColor: '#FAEBCD',
  },
  header:{
    backgroundColor:'#BC8A51', 
  },
  list:{
    height:90,
    backgroundColor: "#FFF9F2",
    marginHorizontal: 15,
    marginTop: 10,
    borderRadius: 15, 
    padding: 15,
    opacity: 0.7,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  info:{
    color:'#351E0A',
  },
});

                  // 地址:{params.address[params.index]}{"\n"}
                  // 總價:{params.price[params.index]}萬{"\n"}
                  // 樓層:{params.floor[params.index]}{"\n"}
                  // 坪數:{params.size[params.index]}{"\n"}
                  // 每月淨賺(扣除房貸): 2000元