import React, { useState } from 'react';
import { StyleSheet, ActivityIndicator, View, Alert } from 'react-native';
import { Input } from 'react-native-elements';
import auth from '@react-native-firebase/auth';
import { Container,  Content, Picker, Form, Button, Text, Icon } from "native-base";

export default function Reset({ navigation }) {

    const [email, setEmail] = useState('');
    const [showLoading, setShowLoading] = useState(false);

    const reset = async() => {
        setShowLoading(true);
        try {
            await auth().sendPasswordResetEmail(email)
            console.log("更改密碼Email已發送");
            setShowLoading(false);
        } catch (e) {
            setShowLoading(false);
            Alert.alert("更改密碼",error);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.formContainer}>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <Icon style = {{fontSize: 50, color: '#884A06'}} type="FontAwesome" name="cog"/>
                    <Text style={{ fontSize: 20, height: 50, color: '#A37F23' }}>忘記密碼</Text>
                </View>
                <View style={styles.subContainer}>
                    <Input
                        style={styles.textInput}
                        placeholder=' 電子信箱'
                        leftIcon={ <Icon style={{ fontSize: 19, marginRight:10, color: '#884A06'}} type="FontAwesome" name="envelope"/> }
                        value={email}
                        onChangeText={setEmail}
                    />
                </View>
                <View style={styles.subContainer2}>
                    <Button block warning style={styles.textInput} onPress={() => reset()} >
                        <Text style={{ fontSize: 20 }}>重新設定</Text>
                    </Button>
                </View>
                <View style={styles.subContainer2}>
                    <Button block warning style={styles.textInput} onPress={() => {
                            navigation.navigate('Login');}} >
                        <Text style={{ fontSize: 20 }}>返回登入</Text>
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

Reset.navigationOptions = ({ navigation }) => ({
    title: 'reset',
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
        marginBottom: 15,
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
        marginLeft:10,
        margin: 5,
        backgroundColor: "#D19D62",
    },
})