import React, { useState, Component } from 'react';
import { StyleSheet, ActivityIndicator, View, Alert, Dimensions, Image } from 'react-native';
import { Input } from 'react-native-elements';
import auth from '@react-native-firebase/auth';
import { Container,  Content, Icon, Picker, Form, Button, Text } from "native-base";


export default function Login({ navigation }) {


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showLoading, setShowLoading] = useState(false);


    const login = async() => {
        setShowLoading(true);
        try {
            const doLogin = await auth().signInWithEmailAndPassword(email, password);
            setShowLoading(false);
            if(doLogin.user) {
                navigation.navigate('Search');
            }
        } catch (e) {
            setShowLoading(false);
            Alert.alert(
                "帳號或密碼有誤！"
            );
        }
    };
    return (
        <View style={styles.container}>
            <View style={styles.formContainer}>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginBottom: 40,}}>
                    <Image source = {require("./logo_login.png")} style = {styles.logo} />
                </View>
                <View style={styles.subContainer}>
                    <Input
                        style={styles.textInput}
                        placeholder=' 電子郵件'
                        leftIcon={ <Icon style={{ fontSize: 19, marginRight:10, color: '#884A06'}} type="FontAwesome" name="envelope"/> }
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
                    <Button block warning style={styles.textInput} onPress={() => login()} >
                        <Text style={{ fontSize: 20 }}>登入</Text>
                    </Button>
                </View>
                
                <View style={styles.canNot}>
                    <Text style={{ color: '#A37F23' }} onPress={() => { navigation.navigate('Reset'); }}>忘記密碼?</Text>
                    <Text style={{ color: '#A37F23' }} onPress={() => { navigation.navigate('Register'); }}>註冊</Text>
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

Login.navigationOptions = ({ navigation }) => ({
    title: 'Login',
    headerShown: false,
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgb(250,235,205)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    formContainer: {
        height: 350,
        width: 250,
        padding: 1
    },
    subContainer: {
        marginBottom: 20,
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
    canNot: {
        width: Dimensions.get('window').width -1650,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    logo:{
        bottom: 10,
        alignItems: 'center',
        width: 180,
        height: 180,
    },
})