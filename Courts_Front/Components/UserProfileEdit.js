import {Image, SafeAreaView, StyleSheet, TextInput, View} from "react-native";
import {Caption, Text, Title, TouchableRipple} from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {useSelector} from "react-redux";
import {editUser, selectUser} from "../features/userSlice";
import {useState} from 'react';
import {store} from "../store";


export const UserProfileEdit = ({navigation}) => {
    const user = useSelector(selectUser);

    const [name, onChangeName] = useState(`${user.name}`);
    const [email, onChangeEmail] = useState(`${user.email}`);
    const handleEdit = (name, email) => {
        store.dispatch(editUser({ name, email }));
    }
    const editProfile = () => {
        fetch(`https://courts.onrender.com/users/edit`, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userID: user.userID,
                newUserData: {
                    email: email.toLowerCase(),
                    name: name
                }
            })
        })
            .then(response => response.json())
            .then(data => {
                handleEdit(data.name, data.email);
            })
            .then(navigation.goBack())
            .catch(err => console.error(err));
    }
    return (
        <SafeAreaView style={styles.container}>
            <Text style={{fontSize: 24, fontWeight:"bold", marginBottom:10}}> Edit Profile </Text>
            <View style={styles.userInfoSection}>
                <View style={{flexDirection: 'row', marginTop: 15}}>
                    <Image
                        source={require('../assets/userIcn.png')}
                        style={{width:80, height:80}}
                    />
                    <View style={{marginLeft: 20}}>
                        <TextInput style={[styles.title, {
                            marginTop:15,
                            marginBottom: 5,
                            borderWidth: 1,
                            padding: 3
                        }]}
                            value= {name}
                            onChangeText={onChangeName}
                        >
                        </TextInput>
                        <Caption style={styles.caption}>@{name}</Caption>
                    </View>
                </View>
            </View>
            <View style={styles.userInfoSection}>

                <View style={[styles.row,{
                    display: "flex",
                    alignItems: "center"
            }]}>
                    <Icon name="email" color="#777777" size={20}/>
                    <TextInput style={{
                        color:"#777777",
                        marginLeft: 20,
                        borderWidth: 1,
                        padding: 3
                    }}
                               value= {email}
                               onChangeText={onChangeEmail}
                    >
                    </TextInput>
                </View>
            </View>
            <View style={styles.menuWrapper}>
                <TouchableRipple onPress={editProfile}>
                    <View style={styles.menuItem}>
                        <Icon name="account-check-outline" color="#FF6347" size={25}/>
                        <Text style={styles.menuItemText}>Confirm</Text>
                    </View>
                </TouchableRipple>
            </View>

        </SafeAreaView>
    );
}

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


