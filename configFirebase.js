import * as firebase from 'firebase';
import firestore from 'firebase/firestore'


let config = {
	apiKey: "AIzaSyB2jkHCDhwpxktmEvDGd6NsHzvAQSO08BU",
    authDomain: "house-84a08.firebaseapp.com",
    databaseURL: "https://house-84a08.firebaseio.com",
    projectId: "house-84a08",
    storageBucket: "house-84a08.appspot.com",
    messagingSenderId: "82419972832",
};

let app = firebase.initializeApp(config);
export const db = app.database();
