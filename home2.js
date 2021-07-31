import React, {Component} from 'react';
import {
   View,
   Text,
   TextInput,
   TouchableOpacity
} from 'react-native';
import * as firebase from 'firebase';

const config = {

apiKey: "AIzaSyB2jkHCDhwpxktmEvDGd6NsHzvAQSO08BU",
authDomain: "house-84a08.firebaseapp.com",
databaseURL: "https://house-84a08.firebaseio.com",
storageBucket: "house-84a08.appspot.com",

}

firebase.initializeApp(config);



export default class Signup extends Component {
  constructor(props) {
    super(props);
      this.state = {
         email: '',
         password: ''
      };

}
  signup() {
    firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then(() => {
      alert('註冊完成 系統將為你導入')
    }).catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      alert(this.state.email + '註冊失敗' + errorMessage)
    })
  }
  render() {
    return(
      <View>
       <Text>sign</Text>
       <View>
        <TextInput

          onChangeText={(text) => this.setState({email: text})}
          value={this.state.email}
          placeholder={"email"}
        />
        <TextInput

          onChangeText={(text) => this.setState({password: text})}
          value={this.state.password}
          secureTextEntry={true}
          placeholder={"password"}
        />
        <TouchableOpacity onPress={this.signup.bind(this)}>
         <Text>Enter</Text>
        </TouchableOpacity>
       </View>
      </View>
    )
  };
}