import React, { Component } from 'react';
import { Image, ImageBackground, StyleSheet, Dimensions, View, FlatList, ScrollView } from 'react-native';
import axios from 'axios';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, 
         Body, Right, Toast, Title, List, Footer, FooterTab} from 'native-base';
import DialogInput from 'react-native-dialog-input';
import Dialog from "react-native-dialog";

export default class CardImageExample extends Component {
  static navigationOptions = {
          header:null,
    };

  constructor() {
    super();
    this.state = {
        rent: [],
        max: 0,
        money: 0,
        percent: 0.8,
        interest: 1.19,
        year: 360,
        isDialogVisible: false,
    };
  }

  showDialog(isShow){
    this.setState({isDialogVisible: isShow});
  }
  sendInput(inputText){
    var text = inputText
    var pp = text.split(' ')[0]
    var ii = text.split(' ')[1]
    var yy = text.split(' ')[2] * 12

    this.setState({
      isDialogVisible: false, 
    })
    var money = (this.props.navigation.state.params.price * pp * ii * 10000 / yy).toFixed(0)
    
    this.setState({
      money: money,
      percent: pp,
      interest: ii,
      year: yy 
    })
  }

  componentDidMount(){
    console.log(this.props.navigation.state.params.price, this.state.year)
    const b = [], c = []
    var percent 
    var money = (this.props.navigation.state.params.price * this.state.percent * this.state.interest * 10000 / this.state.year).toFixed(0)
    var max = 0
    var i = 0, j = 0
    var url = 'http://10.0.2.2:3710/591';
    axios.get(url)
    .then((rentData) => {
      // console.log(rentData.data)
      for (i = 0; i < rentData.data.length; i++) {
          rentData.data.sort(function(a, b) {
              return a.pings > b.pings;
          })
            if (rentData.data[i].name == this.props.navigation.state.params.name) {
                b.push(rentData.data[i])          
            }
      }
      console.log(b)
      max = b[0].rent
      for (j = 1; j < b.length ; j++){
        if ( max < b[j].rent){
          max = b[j].rent
        }
      }
      console.log(b[0].pings, max)
      this.setState({
        rent:b,
        max: max,
        money: money,
      })
    })
  };

  renderItem = ({ item }) => {
    return (
        <View style={styles.list2}>
          <Text style = {styles.info} >
            ?????? ???{item.name}{"\n"}
            ?????? ???{item.floor}{"\n"}
            ?????? ???{item.pings} ???{"\n"}
            ?????? ???{item._type}{"\n"}
            ?????? ???{item.presentSituation}{"\n"}
            ?????? ???<Text style={{ fontWeight: 'bold' }}>$ {item.rent}</Text> 
          </Text>
          <Right >
            <Button style={styles.balance}  transparent 
              onPress={() => {this.setState({
                  max: item.rent
                })
              }}>
              <Icon type="FontAwesome" name="balance-scale" style = {{color:'#351E0A'}}/>

            </Button>
          </Right>
        </View>
    )
  }


  render() {
    const { params } = this.props.navigation.state;
    const college = params.address 
    return (
      <Container>
        <Header style={styles.header}>
          <Left>
            <Button style={styles.header} onPress={() => this.props.navigation.navigate('Housedata')}>
              <Icon type="FontAwesome" name='angle-left'/>
            </Button>
          </Left>
          <Body style={styles.header_body}>
            <Title>????????????</Title>
          </Body>
          <Right>

          </Right>
        </Header>
        <Content>
          <ImageBackground style={styles.background} >
            <Image style = {styles.pic} source= {{uri: this.props.navigation.state.params.picture}} />
            <List style={styles.list}>
              <Text style = {styles.info}>
                ?????? ???{this.props.navigation.state.params.name}{"\n"}
                ?????? ???{this.props.navigation.state.params.address}{"\n"}
                ?????? ???{this.props.navigation.state.params.price} ???{"\n"}
                ?????? ???{this.props.navigation.state.params.floor} ???{"\n"}
                ?????? ???{this.props.navigation.state.params.pings} ???{"\n"}
                ?????? ???{this.props.navigation.state.params.type} {"\n"}
                ?????? ???{this.props.navigation.state.params.presentSituation} 
              </Text>
            </List>

            <View block warning style={styles.house} >
              <Body style = {{width: 500, flex:3}}>
                <Text style = {styles.wword}>??? ??? ??? ??? ??? ???</Text>
              </Body>          
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'center',}}>
              <Text style = {styles.default} >???????????? ???</Text><Text>{this.state.percent} </Text>
              <Text style = {styles.default}> / ?????? ???</Text><Text>{this.state.interest}  </Text>
              <Text style = {styles.default}> % / ???????????? ???</Text><Text>{this.state.year}</Text>
            </View>
            <View>
              <FlatList
                  data={this.state.rent}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={this.renderItem}
                  extraData={this.state}
              />
            </View>
          </ImageBackground>
        </Content>
        <View style={styles.compare}>
            <View style={styles.compare_1}>
              <Text>??????????????????</Text>
              <Text>{this.state.max}</Text>
            </View>
            <View style={styles.compare_2}>
              <Text>??????????????????</Text>
              <Text>{this.state.money}</Text>
            </View>
        </View>
        <View style={styles.count}>
            <Text>?????????????????? ??? { this.state.money - this.state.max }</Text>
        </View>
        <Footer style={{backgroundColor: '#D19D62', justifyContent: 'space-evenly',}}>
          <FooterTab>
            <Button style={styles.view} onPress={() => this.props.navigation.navigate('sellhousedata',{'name':this.props.navigation.state.params.name })} >
                <Icon style = {styles.icon} type="FontAwesome" name="book"/>
                <Text style = {styles.word}>??? ??? ??? ??? ??? ???</Text>
            </Button>
            <Button style={styles.view} onPress={()=>{this.showDialog(true)}}>
                <Icon style = {styles.icon} type="FontAwesome" name="edit"/>
                <Text style = {styles.word}>??? ??? ??? ??? ??? ???</Text>
            </Button>
            <DialogInput 
              isDialogVisible={this.state.isDialogVisible}
              title = {"??????????????????"}
              message = {" ???????????? \ ?????? \ ???????????? "}
              hintInput = {"0.8  1.19  30 "}
              cancelText = {"??????"}
              submitText = {"??????"}
              submitInput = { (inputText) => {this.sendInput(inputText)} }
              closeDialog = { () => {this.showDialog(false)}}>
            </DialogInput>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  background: {
    backgroundColor: '#FAEBCD',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height +500
  },
  header:{
    backgroundColor:'#D19D62', 
  },
  header_body:{
    position: 'absolute',
  },
  house:{
    height:30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#D19D62',
    marginTop: 30,
    opacity:0.8
  },
  word:{
    color:'#FFF',
    fontSize:12
  },
  wword:{
    color:'#FFF',
    fontSize:20
  },
  list:{
    height:190,
    backgroundColor: "#FFF9F2",
    marginHorizontal: 15,
    marginTop: 30,
    borderRadius: 15, 
    paddingLeft: 15,
    opacity: 0.7,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  compare:{
    backgroundColor: "#FFF9F2",
    flexDirection: 'row',
  },
  compare_1:{
    height:65,
    alignItems: 'center',
    width: Dimensions.get('window').width /2,
    backgroundColor: "#FF9999",
    borderWidth: 10,
    borderBottomWidth: 5,
    borderRightWidth: 5,
    borderColor: '#FAEBCD',
  },
  compare_2:{
    height:65,
    alignItems: 'center',
    width: Dimensions.get('window').width /2,
    backgroundColor: "#6DE8AF",
    borderWidth: 10,
    borderLeftWidth: 5,
    borderBottomWidth: 5,
    borderColor: '#FAEBCD',
  },
  count:{
    height:50,
    backgroundColor: "#FFF9F2",
    alignItems:'center',
    padding: 7,
    justifyContent: 'center',
    flexDirection: 'column',
    borderWidth: 10,
    borderTopWidth: 5,
    borderColor: '#FAEBCD',
  },
  list2:{
    height:160,
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
  info:{
    color:'#351E0A',
    left:0,
  },
  pic:{
    flex: 0.5,
    justifyContent: 'center',
    resizeMode:'contain',
    alignItems: 'center',

  },
  view:{
    backgroundColor: '#D19D62'
  },
  icon:{
    color: "#fff",
  },
  balance:{
    right: 10,
  },
  default:{
    color: '#858585',
    opacity:0.7
  }
});
  // agoda:{
  //   width:50,
  //   height:25,
  //   left:20,
  //   top:12
  // },
  // airbnb:{
  //   width:80,
  //   height:25,
  //   left:30,
  //   top:12
  // },
  // logo:{
  //   flexDirection: 'row',
  // },

  // <Button style={styles.view}>
  //     <Icon style = {styles.icon} type="FontAwesome" name="calculator"/>
  //     <Text style = {styles.word}>??? ??? ??? ???</Text>
  // </Button>