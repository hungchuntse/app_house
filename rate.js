import React, { Component } from 'react';
import { Container, Header, Content, Form, Item, Input, Label, Picker, Icon, Text, Button, Left, Body, Right, Title} from 'native-base';
import { TextInput, StyleSheet, View, ImageBackground, Dimensions} from 'react-native';

const monthmoney = (a,b) => (a / b).toFixed(5) ; 
const monthinterest = (a,b) => (a * b).toFixed(5);
const total = (a,b) => a + b;


export default class StackedLabelExample extends Component {
  static navigationOptions = {
          header:null,
  };
  constructor(props) {
    super(props);
    this.state = {
      percent: 0.8,
      interest: 1.19,
      year: 360,
    };
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
            <Title>貸款式算</Title>
          </Body>
          <Right>

          </Right>
        </Header>
      <ImageBackground style={styles.background}>
        <View style={{ height:120, flex:0, alignItems: 'center', justifyContent: 'center',}}>
          <Icon style={{ fontSize: 60, color: "#BC8A51" }} type="FontAwesome" name="calculator"/>
        </View>
        <Content style={styles.content}>
          <Form>
            <Item floatingLabel> 
              <Label style={styles.text}>貸款比例(成)</Label>
              <Input onChangeText = {(newpercent) => this.setState({ percent: newpercent / 10})} />
            </Item>
            <Item floatingLabel last> 
              <Label style={styles.text}>年利率(%)</Label>
              <Input onChangeText = {(newinterest) => this.setState({ interest: newinterest})} />
            </Item>
            <Item floatingLabel last>
              <Label style={styles.text}>貸款總年數(年)</Label>
              <Input onChangeText = {(newyear) => this.setState({ year: newyear * 12 })} />
            </Item>    
          </Form>
        </Content>
        <Content contentContainerStyle = {styles.mainView}>
          <View >
            <Button block warning style={styles.button} onPress={() => this.props.navigation.navigate('rate')} >
                <Text style={styles.text2}>清除</Text>
            </Button>
          </View>
          <View style={styles.view1}>
            <Button block warning style={styles.button} onPress={() => this.props.navigation.navigate('Housedetail',{ 'percent':this.state.percent,'interest':this.state.interest,'year':this.state.year })} >
                <Text style={styles.text2}>試算</Text>
            </Button>
          </View>
          
        </Content>
        </ImageBackground>
      </Container>
    );
  } 
}
  

const styles = StyleSheet.create({
  mainView:{
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    top:30,
  },
  background:{
    backgroundColor: '#FAEBCD',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  },
  header:{
    backgroundColor:'#BC8A51', 
  },
  header_body:{
    position: 'absolute',
  },
  text:{
    fontSize:18,
    fontWeight:'bold',
  },
  house:{
    width:120,
    backgroundColor:'#F6874B',
    flexDirection: 'row',
  },
  content:{
    flex:1,
  },
  input:{
    borderBottomColor: '#90918E',
  },
  text2:{
    fontSize:18
  },
  button:{
    width:80,
    backgroundColor:'#BC8A51',
    flexDirection: 'row',
  },
});
