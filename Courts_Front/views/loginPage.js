import React from 'react';
import {
    SafeAreaView,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    StyleSheet,
    Button
} from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {getUser, selectUser} from '../features/userSlice';
import {store} from "../store";
import {useSelector} from "react-redux";


const styles = StyleSheet.create({
    tinyLogo: {
        width: 300,
        height: 130,
    },
    labelStyle: {
        flexDirection: 'row',
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        paddingBottom: 8,
        marginBottom: 25,
    }
});

export const LoginScreen = ({navigation}) => {
    const [email, onChangeEmail] = React.useState('yovel@gmail.com');
    const [password, onChangePassword] = React.useState('123456');
    const user = useSelector(selectUser);
    const handleLogin = (userID, name, email) => {
        store.dispatch(getUser({ userID, name, email }));
    }
    const onPressLogin = () => {
        fetch('https://courts.onrender.com/users/login', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email.toLowerCase(),
                password: password
            })
        })
            .then(response => response.json())
            .then(data => {
                handleLogin(data._id, data.name, data.email);
            } )
            .catch(e => console.log('login fail'))
    }
    return (
        <SafeAreaView style={{flex: 1, justifyContent: 'center',backgroundColor:"white"}}>
            <View style={{paddingHorizontal: 25}}>
                <View style={{alignItems: 'center'}}>
                    <Image
                        style={styles.tinyLogo}
                        source={require('../assets/icon.jpeg')}
                    />
                </View>

                <Text
                    style={{
                        fontSize: 28,
                        fontWeight: '500',
                        color: '#333',
                        marginBottom: 30,
                        marginTop: 30,
                    }}>
                    Login
                </Text>

                <View style={styles.labelStyle}>
                    <MaterialIcons
                        name="alternate-email"
                        size={20}
                        color="#666"
                        style={{marginRight: 5}}
                    />
                    <TextInput
                        value= {email}
                        placeholder="Email"
                        onChangeText={onChangeEmail}
                    >
                    </TextInput>
                </View>
                <View style={styles.labelStyle}>
                    <Ionicons
                        name="ios-lock-closed-outline"
                        size={20}
                        color="#666"
                        style={{marginRight: 5}}
                    />
                    <TextInput
                        value={password}
                        placeholder= "Password"
                        onChangeText={onChangePassword}
                        style={{flex: 1, paddingVertical: 0}}
                        secureTextEntry={true}
                    >

                    </TextInput>
                </View>

                <Button
                    onPress={onPressLogin}
                    title="Login"
                    color="steelblue"
                    accessibilityLabel="Login"
                />

                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        marginTop: 30,
                    }}>
                    <Text>New to the app?</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('RegisterScreen')}>
                        <Text style={{color: 'steelblue', fontWeight: '700'}}> Register</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};


