import React, { useState } from 'react';
import { StyleSheet, ActivityIndicator, View, Alert } from 'react-native';
import { Input } from 'react-native-elements';
import auth from '@react-native-firebase/auth';
import { Container,  Content, Picker, Form, Button, Text, Icon } from "native-base";
import { db } from './configFirebase';


export default function Register({ navigation }) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showLoading, setShowLoading] = useState(false);

    const register = async() => {
        setShowLoading(true);
        try {
            // var actionCodeSettings = {
            //   url: "http://localhost:3000",
            //   handleCodeInApp: true
            // };
            // await auth().sendSignInLinkToEmail(email, actionCodeSettings);
            const doRegister = await auth().createUserWithEmailAndPassword(email, password);
            setShowLoading(false);
            if(doRegister.user) {
                
                navigation.navigate('personinfo', {mail: email});
            }
        } catch (e) {
            setShowLoading(false);
            console.log(e);
            Alert.alert(
                "此帳號已被使用！"
            );
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.formContainer}>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Icon style = {{fontSize: 50, color: '#884A06'}} type="FontAwesome" name="user-circle"/>
                    <Text style={{ fontSize: 20, height: 50, color: '#A37F23' }}>註冊</Text>
                </View>
                <View style={styles.subContainer}>
                    <Input
                        style={styles.textInput}
                        placeholder=' 電子信箱'
                        leftIcon={ <Icon style={{ marginRight:10, fontSize: 19, color: '#884A06' }} type="FontAwesome" name="envelope"/> }
                        value={email}
                        onChangeText={setEmail}
                    />
                </View>
                <View style={styles.subContainer}>
                    <Input
                        style={styles.textInput}
                        placeholder=' 密碼'
                        leftIcon={ <Icon style={{marginRight:10, color: '#884A06'}} type="FontAwesome" name="lock" /> }
                        secureTextEntry={true}
                        value={password}
                        onChangeText={setPassword}
                    />
                </View>
                <View style={styles.subContainer2}>
                    <Button block warning style={styles.textInput} onPress={() => register()} >
                        <Text style={{ fontSize: 20 }}>下一步</Text>
                    </Button>
                </View>
                
                {showLoading &&
                    <View style={styles.activity}>
                        <ActivityIndicator size="large" color="#0000ff" />
                    </View>
                }
            </View>
        </View>
    );
}

Register.navigationOptions = ({ navigation }) => ({
    title: 'register',
    headerShown: false,
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FAEBCD',
        justifyContent: 'center',
        alignItems: 'center',
    },
    formContainer: {
        height: 300,
        width: 250,
        padding: 1
    },
    subContainer: {
        marginBottom: 2,
        padding: 2,
    },
    subContainer2: {
        marginBottom: 2,
        padding: 10,
    },
    activity: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textInput: {
        margin: 5,
        backgroundColor: "#D19D62",
    },
})