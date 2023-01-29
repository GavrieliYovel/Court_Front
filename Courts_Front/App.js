import {StatusBar} from 'expo-status-bar';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import Navbar from "./Components/Navbar";
import {NavigationContainer} from '@react-navigation/native';
import {useState} from "react";
import {LoginScreen} from "./views/loginPage"
import {RegisterScreen} from "./views/registerPage"
import {Provider, useDispatch, useSelector} from 'react-redux'
import {store} from './store'
import {selectUser} from "./features/userSlice";

import {GameForm} from './Components/GameForm'
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import GamesHome from "./views/Games";
import RegisterStack from "./Nevigation/RegistrationStack";
import GamesStack from "./Nevigation/GamesStack";

function App() {
    const user = useSelector(selectUser);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const RootStack = createNativeStackNavigator()
    return (
        <NavigationContainer>
            {!user.userID && <RegisterStack/>}
            {user.userID && < RootStack.Navigator screenOptions={{headerShown: false}}
                                                   initialRouteName={"Navbar"}>
                <RootStack.Screen name={"NavBar"} component={Navbar}/>
                <RootStack.Screen name={"Games"} component={GamesStack}/>
            </RootStack.Navigator>}
        </NavigationContainer>
    );
}

export default function Main() {
    return (
        <Provider store={store}>
            <App/>
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
