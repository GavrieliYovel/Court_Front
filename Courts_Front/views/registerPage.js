import React, {useState} from 'react';
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
import DatePicker from 'react-native-datepicker';

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

export const RegisterScreen = () => {
    const [email, onChangeEmail] = React.useState('');
    const [password, onChangePassword] = React.useState('');
    const [confirmPassword, onChangeConfirmPassword] = React.useState('');
    const [date, setDate] = useState(new Date());
    const [open, setOpen] = useState(false);
    const [dobLabel, setDobLabel] = useState('Date of Birth');
    const [phone, onChangePhone] = useState('');
    const [address, onChangeAddress] = useState('');
    const [name, onChangeName] = useState('');

    const handleRegister = (userID, name) => {
        store.dispatch(getUser({ userID, name }));
    }
    const onPressRegister = () => {
        console.log('clicked');
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
                handleRegister(data._id, data.name);
                console.log(user);
            } )
            .catch(e => console.log('login fail'))

    }
    return (
        <SafeAreaView style={{flex: 1, justifyContent: 'center'}}>
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
                    <TouchableOpacity onPress={() => setOpen(true)}>
                        <Text style={{color: '#666', marginLeft: 5, marginTop: 5}}>
                            {dobLabel}
                        </Text>
                    </TouchableOpacity>
                </View>
                <DatePicker
                    style={{width: 200}}
                    date={date}
                    mode="date"
                    placeholder="select date"
                    format="YYYY-MM-DD"
                    minDate="2016-05-01"
                    maxDate="2016-06-01"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    customStyles={{
                        dateIcon: {
                            position: 'absolute',
                            left: 0,
                            top: 4,
                            marginLeft: 0
                        },
                        dateInput: {
                            marginLeft: 36
                        }
                        // ... You can check the source to find the other keys.
                    }}
                    onDateChange={(date) => setDate(date)}
                />
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
                    <Text>New to the app?</Text>
                    <TouchableOpacity>
                        <Text style={{color: 'steelblue', fontWeight: '700'}}> Register</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};
