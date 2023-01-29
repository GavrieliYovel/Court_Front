import {useEffect, useState} from 'react';
import {View, SafeAreaView, StyleSheet, Image} from 'react-native';
import {
    Avatar,
    Title,
    Caption,
    Text,
    TouchableRipple,
} from 'react-native-paper';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector} from "react-redux";
import {selectUser} from "../features/userSlice";
import {useIsFocused} from "@react-navigation/native";



export const UserProfile = ({navigation}) => {
    const user = useSelector(selectUser);
    const [games, setGames] = useState(0);
    const [teams, setTeams] = useState(0);
    const isFocused = useIsFocused();
    const getGames = () => {
        fetch(`https://courts.onrender.com/games/${user.userID}`)
            .then(response => response.json())
            .then(data => {
                setGames(data.length);
            })
            .catch(err => console.error(err));
    }
    const getTeams = () => {
        fetch(`https://courts.onrender.com/teams/${user.userID}`)
            .then(response => response.json())
            .then(data => {
                setTeams(data.length);
            })
            .catch(err => console.error(err));
    }

    useEffect( () => {
         getTeams();
         getGames();
    }, [isFocused]);

    return (
        <SafeAreaView style={styles.container}>

            <View style={styles.userInfoSection}>
                <View style={{flexDirection: 'row', marginTop: 15}}>
                    <Image
                        source={require('../assets/userIcn.png')}
                        style={{width:80, height:80}}
                    />
                    <View style={{marginLeft: 20}}>
                        <Title style={[styles.title, {
                            marginTop:15,
                            marginBottom: 5,
                        }]}>{user.name}</Title>
                        <Caption style={styles.caption}>@{user.name}</Caption>
                    </View>
                </View>
            </View>
            <View style={styles.userInfoSection}>
                <View style={styles.row}>
                    <Icon name="email" color="#777777" size={20}/>
                    <Text style={{color:"#777777", marginLeft: 20}}>{user.email}</Text>
                </View>
            </View>
            <View style={styles.infoBoxWrapper}>
                <View style={[styles.infoBox, {
                    borderRightColor: '#dddddd',
                    borderRightWidth: 1
                }]}>
                    <Title>{games}</Title>
                    <Caption>Games</Caption>
                </View>
                <View style={styles.infoBox}>
                    <Title>{teams}</Title>
                    <Caption>Teams</Caption>
                </View>
            </View>
            <View style={styles.menuWrapper}>
                <TouchableRipple onPress={() => navigation.navigate('UserProfileEdit')}>
                    <View style={styles.menuItem}>
                        <Icon name="account-edit-outline" color="#FF6347" size={25}/>
                        <Text style={styles.menuItemText}>Edit Profile</Text>
                    </View>
                </TouchableRipple>
            </View>

        </SafeAreaView>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    userInfoSection: {
        paddingHorizontal: 30,
        marginBottom: 25,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
        fontWeight: '500',
    },
    row: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    infoBoxWrapper: {
        borderBottomColor: '#dddddd',
        borderBottomWidth: 1,
        borderTopColor: '#dddddd',
        borderTopWidth: 1,
        flexDirection: 'row',
        height: 100,
    },
    infoBox: {
        width: '50%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    menuWrapper: {
        marginTop: 10,
    },
    menuItem: {
        flexDirection: 'row',
        paddingVertical: 15,
        paddingHorizontal: 30,
    },
    menuItemText: {
        color: '#777777',
        marginLeft: 20,
        fontWeight: '600',
        fontSize: 16,
        lineHeight: 26,
    },
});
