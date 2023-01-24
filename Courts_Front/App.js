import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Navbar from "./Components/Navbar";

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Hello Pe'er</Text>
      <StatusBar style="auto" />
    </View>
     // <Navbar/>


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
