import React, {useState} from 'react';
import {
    SafeAreaView,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    StyleSheet,
    Button, Platform
} from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {getUser} from '../features/userSlice';
import {store} from "../store";
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from "moment";

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

export const RegisterScreen = ({navigation}) => {
    const [email, onChangeEmail] = React.useState('');
    const [password, onChangePassword] = React.useState('');
    const [confirmPassword, onChangeConfirmPassword] = React.useState('');
    const [error, setError] = useState(false);
    const [errorText, setErrorText] = useState('');
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [text, setText] = useState('Date of Birth');
    const [name, onChangeName] = useState('');


    const onChange= (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);

        let tempDate = new Date(currentDate);
        let fDate = moment(tempDate).format("DD-MM-YYYY");
        let fTime = moment(tempDate).format("HH:mm A")
        setText(fDate);

    }
    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    }

    const handleRegister = (userID, name, email) => {
        store.dispatch(getUser({ userID, name, email }));
    }
    const onPressRegister = () => {
        if(name === '') {
            setErrorText("Enter Full Name");
            setError(true);
            return;
        }
        if(email === '') {
            setErrorText("Enter Email");
            setError(true);
            return;
        }
        if(password !== confirmPassword) {
            setErrorText("The Password doesn't match");
            setError(true);
            return;
        }
        if(password === '') {
            setErrorText("Enter Password");
            setError(true);
            return;
        }
        if(text === 'Date of Birth') {
            setErrorText("Enter Date of Birth");
            setError(true);
            return;
        }


        fetch('https://courts.onrender.com/users/new', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                email: email.toLowerCase(),
                password: password,
                birthday: date,
                type: 'player'
            })
        })
            .then(response => response.json())
            .then(data => {
                handleRegister(data._id, data.name, data.email);
                console.log(user);
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
                    Register
                </Text>
                <View style={styles.labelStyle}>
                    <Ionicons
                        name="person-outline"
                        size={20}
                        color="#666"
                        style={{marginRight: 5}}
                    />
                    <TextInput
                        value= {name}
                        placeholder="Full Name"
                        onChangeText={onChangeName}
                    >
                    </TextInput>
                </View>
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
                <View style={styles.labelStyle}>
                    <Ionicons
                        name="ios-lock-closed-outline"
                        size={20}
                        color="#666"
                        style={{marginRight: 5}}
                    />
                    <TextInput
                        value={confirmPassword}
                        placeholder= "Confirm Password"
                        onChangeText={onChangeConfirmPassword}
                        style={{flex: 1, paddingVertical: 0}}
                        secureTextEntry={true}
                    >

                    </TextInput>
                </View>
                <View
                    style={{
                        flexDirection: 'row',
                        borderBottomColor: '#ccc',
                        borderBottomWidth: 1,
                        paddingBottom: 8,
                        marginBottom: 30,
                    }}>
                    <Ionicons
                        name="calendar-outline"
                        size={20}
                        color="#666"
                        style={{marginRight: 5}}
                    />
                    <TouchableOpacity onPress={() => showMode('date')}>
                        <Text style={{color: '#666', marginLeft: 5, marginTop: 5}}>
                            {text}
                        </Text>
                    </TouchableOpacity>
                </View>
                {show &&
                    <DateTimePicker
                        testID='dateTimePicker'
                        value={date}
                        mode={mode}
                        is24Hour={true}
                        display='default'
                        onChange={onChange}
                    />}
                <Button
                    onPress={onPressRegister}
                    title="Register"
                    color="steelblue"
                    accessibilityLabel="Login"
                />

                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        marginTop: 30,
                    }}>
                    <Text>Already registered?</Text>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Text style={{color: '#AD40AF', fontWeight: '700'}}> Login</Text>
                    </TouchableOpacity>
                </View>
                {error && <Text style={{marginTop:10, color: "red", fontWeight: "bold", fontSize: 15}}>{errorText}</Text>}
            </View>
        </SafeAreaView>
    );
};
