
import {LogBox, StyleSheet} from 'react-native';
import Navbar from "./Components/Navbar";
import {NavigationContainer} from '@react-navigation/native';
import {useState} from "react";
import { Provider, useSelector } from 'react-redux'
import { store } from './store'
import {selectUser} from "./features/userSlice";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import RegisterStack from "./Nevigation/RegistrationStack";
import {UserProfileStack} from "./Nevigation/UserProfileStack";

LogBox.ignoreAllLogs();

function App() {
    const user = useSelector(selectUser);
    const RootStack = createNativeStackNavigator()
    return (
        <NavigationContainer>
            {!user.userID && <RegisterStack/>}
            {user.userID && < RootStack.Navigator screenOptions={{headerShown: false}}
                                                   initialRouteName={"Navbar"}>
                <RootStack.Screen name={"NavBar"} component={Navbar}/>
                <RootStack.Screen name={"UserSettings"} component={UserProfileStack}/>
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
