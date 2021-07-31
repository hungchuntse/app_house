import React, { Component, useState, useEffect } from 'react';
import {View, StyleSheet, TextInput, TouchableHighlight, Alert} from 'react-native';
import { Input } from 'react-native-elements';
import { Container, Content, Picker, Form, Button, Text, Icon,Table } from "native-base";
import { db } from './configFirebase';
import ModalDropdown from 'react-native-modal-dropdown';

  const KEY_TODOS = 'people';

  const writeUserData = (mail, name, num, money, age, work) => {
    db.ref(`${KEY_TODOS}/`).push().set({
      mail,
      name,
      num,
      age,
      money,
      work,
    });
  }

  const properties = {
    '1': '100萬以下',
    '2': '100-200萬',
    '3': '200-300萬',
    '4': '400萬以上',
  };


export default class AddItem extends Component {
  static navigationOptions = {
      header:null,
  };

  componentDidMount(){
    console.log(this.props.navigation.state.params.mail)
  }

  constructor(props) {
      super(props);
      this.state = {
        mail: this.props.navigation.state.params.mail,
        name:'',
        num:'',
        age:'',
        money:'',
        work: '',
      }
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  handleSubmit() {
    var data =this.state.name;
    if(data==""){
      alert("請填寫!"); //這裡不能傳空值
    }
    writeUserData(this.state.mail, this.state.name, this.state.num, this.state.age, this.state.money, this.state.work);
    Alert.alert('Item saved successfully');
    this.props.navigation.navigate('Login');
  }

   _renderCountryCodeRow(rowData, rowID, highlighted) {
    return (
      <TouchableHighlight underlayColor='#36baa'>
        <View >
          <Text style={styles.textDropdown} numberOfLines={1} ellipsizeMode={'tail'}>
            {rowData}
          </Text>
        </View>
      </TouchableHighlight>
    )
  }

   onValueChange(value: string) {
    this.setState({
      selected: value
    });
  }
  
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.formContainer}>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 28, height: 70, color: '#A37F23' }}>個人資料</Text>
          </View>
          <Form style={{ height: 275}}>
            <Input
              style={styles.textInput}
              placeholder='  姓名'
              leftIcon={ <Icon style={{ fontSize: 25 }} type="FontAwesome" name="user"/> }
              onChangeText={(name) => this.setState({name: name})}
              value={this.state.name}
            />
            <Input
              style={styles.textInput}
              placeholder='  電話號碼'
              leftIcon={ <Icon style={{ fontSize: 25 }} type="FontAwesome" name="phone"/> }
              onChangeText={(num) => this.setState({num: num})}
              value={this.state.num}
            />
            <Input
              style={styles.textInput}
              placeholder='  年齡'
              leftIcon={ <Icon style={{ fontSize: 22 }} type="FontAwesome" name='briefcase'/> }
              onChangeText={(age) => this.setState({age: age})}
              value={this.state.age}
            />
            <View style={styles.ModalDropdown}> 
              <ModalDropdown 
                style={styles.dropdown}
                textStyle={styles.dropdown_text}
                dropdownStyle={styles.dropdown_dropdown}
                width={160}
                Icon={<Icon style={{ fontSize: 25 }} type="FontAwesome" name="user"/>}
                defaultValue="年薪資"
                options={properties}
                onSelect = {(index, money) => { 
                  this.setState({money: money})}
                }
                renderRow={this._renderCountryCodeRow.bind(this)}
              />
            </View>
            <View style={styles.picker}>
              <Picker
                mode="dropdown"
                style={styles.picker2}
                selectedValue={this.state.work}
                onValueChange={(work) => this.setState({work: work})}>
                <Picker.Item style={styles.buttonText} label="  職業" value='' color='#AB9979' />
                <Picker.Item label="學生" value="學生" />
                <Picker.Item label="農牧業" value="農牧業" />
                <Picker.Item label="漁業" value="漁業" />
                <Picker.Item label="軍人" value="軍人" />
                <Picker.Item label="服務業" value="服務業" />
              </Picker>
            </View>
          </Form>
          <View>
            <TouchableHighlight
                style = {styles.button}
                underlayColor= "#BC6C25"
                onPress = {this.handleSubmit}
              >
              <Text style={styles.buttonText}>確認</Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#F5E0B7',
    alignItems: 'center',
  },
  formContainer: {
    height: 400,
    width: 275,
    padding: 1,
  },
  ModalDropdown:{ 
    height:47,
    justifyContent: 'center', 
    alignItems: 'center', 
    borderBottomWidth: 1.5,
    borderBottomColor: '#90918E',
    alignSelf: 'center',
    width: 250,
    // backgroundColor: 'red',
  },
  picker:{
    // backgroundColor: 'white',
    alignSelf: 'center',
    width: 250,
    borderBottomWidth: 1.5,
    borderBottomColor: '#90918E',
  },
  picker2:{
    alignSelf: 'center',
    alignItems: 'center',
    textAlign: 'center', 
    textAlignVertical: "center"  ,
    alignItems: 'flex-end', 
    width: 190
  },
  title: {
    marginBottom: 20,
    fontSize: 25,
    textAlign: 'center'
  },
  textInput: {
    margin: 5,
    color: 'white'
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    alignSelf: 'center'
  },
  button: {
    height: 45,
    flexDirection: 'row',
    backgroundColor:'#D19D62',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  dropdown: {
    margin: 8,
    fontSize:50,
    textAlign: 'center',
    alignItems: 'center', 
  },
  dropdown_text: {
    marginHorizontal: 6,
    fontSize: 18,
    color: '#AB9979',
    textAlignVertical: 'center',
    alignItems: 'center', 
    // textAlign: 'center'
  },
  dropdown_dropdown: {
    width: 100,
    height: 150,
    borderWidth: 2,
    borderRadius: 3,
    alignItems: 'center', 
    // justifyContent: 'center'
  },
});