import {StatusBar} from 'expo-status-bar';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import Navbar from "./Components/Navbar";
import {NavigationContainer} from '@react-navigation/native';
import {useState} from "react";
import { LoginScreen } from "./views/loginPage"
import { RegisterScreen } from "./views/registerPage"
import { Provider, useDispatch, useSelector } from 'react-redux'
import { store } from './store'
import {selectUser} from "./features/userSlice";


function App() {
    const user = useSelector(selectUser);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    return (
            <NavigationContainer>

                {user.userID &&  <Navbar/>}
                {!user.userID &&  <RegisterScreen/>}

            </NavigationContainer>
    );
}

export default function Main() {
    return (
        <Provider store={store}>
            <App />
        </Provider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

// import React from "react";
// import {NativeBaseProvider, Box} from "native-base";
// import Example from "./Components/Navbar";
//
// export default function App() {
//     return (
//         <Example/>
//     );
// }
