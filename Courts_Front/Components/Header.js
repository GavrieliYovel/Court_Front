import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import {Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import {useSelector} from "react-redux";
import {getUser, selectUser} from "../features/userSlice";
import {store} from "../store";

const User = ({ username }) => {
    const user = useSelector(selectUser);
    return (
        <View style={styles.headerContainer}>
            <Image source={require('../assets/userIcn.png')} style={styles.profilePicture} />
            <Text style={styles.name}>{user.name}</Text>
        </View>
    );
};

const CourtsLogo = () =>{
    return (
            <Image source={require('../assets/icon.jpeg')} style= {iconStyle.image} />
    )

}
const HeaderButtons = ({navigation}) => {
    return (
        <View style={{flex :1, flexDirection:"row", alignItems: "flex-end"}} >
            <TouchableOpacity
                style={{ borderRadius:5, paddingVertical:10, paddingHorizontal:2, flexDirection: 'row', backgroundColor: 'transparent' }}
                 onPress={() => navigation.navigation.navigate("UserSettings")}
            >
                <Ionicons name="settings-sharp" size={24} color="black" />
            </TouchableOpacity>
             <TouchableOpacity
                style={{ borderRadius:5, paddingVertical:10, paddingHorizontal:2, flexDirection: 'row', backgroundColor: 'transparent' }}
                onPress={() =>  store.dispatch(getUser({ userID: null,name: null }))}
            >
                 <MaterialCommunityIcons name="logout" size={24} color="black" />
            </TouchableOpacity>
        </View>
    )
}

const iconStyle = StyleSheet.create({
    image:{
        flex: 1,
        alignSelf: "center",
        width: 100,
        height: 100,
        resizeMode: 'contain',
        marginLeft: 37
    }
})


const styles = {
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        backgroundColor: 'none',
        height: 100,
        width: 100,
    },
    profilePicture: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 15,
    },
    logo: {
        alignSelf: 'center',
        marginLeft: 50,
        width: 20,
        height: 20,
        marginRight: 15,
    },
    name: {
        fontWeight: 'bold',
        fontSize: 18,
    },
};

export { User,CourtsLogo, HeaderButtons}

