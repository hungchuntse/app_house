import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Login from './Login.js';
import Register from './Register.js';
import Home from './Home.js';
import Reset from './Reset.js';
import search from'./page2.js';
import housedata from'./housedata.js';
import housedetail from './housedetail.js';
import rate from './rate.js';
import move from './move.js';
import personinfo from './personinfo.js';
import sellhousedata from './sellhousedata.js'
import { dataSchema } from './schemaRealm';


const Realm = require('realm');

const RootStack = createStackNavigator(
  {
    Login: Login,
    Register: Register,
    Home: Home,
    Reset: Reset,
    Search: search,
    Housedata: housedata,
    Housedetail: housedetail,
    rate: rate,
    move: move,
    personinfo: personinfo,
    sellhousedata: sellhousedata,
  },
  {
    initialRouteName: 'move',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#D19D62',
      },
      headerTintColor: '#fff',

      headerTitleStyle: {
        fontWeight: '#FCD9A4',
        textAlign:"center",
        flex:1

      },
    },
  },
);

const RootContainer = createAppContainer(RootStack);

var SQLite = require('react-native-sqlite-storage')

export default function App() {
  return (
    <RootContainer />
  )
}
