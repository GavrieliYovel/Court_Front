import React, {Component, useEffect, useState} from 'react';
import { RadioButton } from 'react-native-paper';
import { Picker } from '@react-native-community/picker';
import allTeamsData from '../StatitcDatatForTest/allTeamsData';
import {
    SafeAreaView,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    StyleSheet,
    FlatList,
    Button
} from 'react-native';
import DatePicker from 'react-native-datepicker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ConfirmChangesModal from "./ConfirmChngesModal";
import {StackActions} from "@react-navigation/native";
import {Input} from "react-native-elements";
import {MultipleSelectList} from "react-native-dropdown-select-list/index";
import {ThemedButton} from "react-native-really-awesome-button";
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
    },
    container: {
        flex: 1,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor : '#A8E9CA'
    },
    title: {
        textAlign: 'left',
        fontSize: 20,
        fontWeight: 'bold',
    },
    datePickerStyle: {
        width: 230,
    },
    text: {
        textAlign: 'left',
        width: 230,
        fontSize: 16,
        color : "#000"
    },
    modal: {
        margin: 20,
        backgroundColor: 'white',
        height: 50,
        width: 50,
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        }
    }
});

const labelStyle = StyleSheet.create({
    fontWeight: "bold",
    color: "black"
})

export const GameForm = () => {
    const [gameScope, onChangeGameScope] = React.useState('Football');
    const [gameDuration, onChangeGameDuration] = React.useState('15');
    const [date, setDate] = React.useState(new Date());
    const [selectedTeam, onChangeTeams] = React.useState('');
    const OnPressSave = () => {
        fetch('https://courts.onrender.com/games/new', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                scope: gameScope,
                date: date,
                duration: gameDuration
            })
        })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(e => console.log('Could not save the game', e))
    }
    const playerId = '63c6f3353dbfc677bcb2e871';
    const [teams, setTeams] = React.useState([]);
    useEffect(()=>{
        fetch(`https://courts.onrender.com/teams/${playerId}`).then(response => response.json())
            .then(data => {
                setTeams(data)
            })
            .catch(error => console.error('Error:', error));
    },[])

    const renderItem = ({item}) => {
        let names=[];
        item.players.forEach( (player)=> {
            names.push(player.name);
        })
        return (
            <View style={{display:'flex', flexDirection:'row', width:'100%'}}>
                <View>
                    <Text style={{fontWeight: 'bold', marginTop:10}}>{item.name} </Text>
                    <Text style={{marginTop:10}}>Team's players: {names+ ' '}</Text>
                </View>
                <RadioButton
                    style={{width:20, height:'100%'}}
                    value={item._id}
                    status={ selectedTeam === item.name ? 'checked' : 'unchecked' }
                    onPress={() => onChangeTeams(item.name)}
                />
            </View>
        );
    }

    return (
        <SafeAreaView style={{flex: 1, justifyContent: 'center'}}>
            <View style={{
                flex: 1
            }}>
                <Text
                    style={{
                        fontSize: 28,
                        fontWeight: '500',
                        color: '#333',
                        marginBottom: 30,
                        marginTop: 30,
                        alignItems: 'center',
                    }}>
                    Let's create a game!
                </Text>

                <View>
                    <Text style={labelStyle} marginBottom={5}>Select game's scope:</Text>
                    <View style={{display: 'flex',flexDirection: 'row'}}>
                        <Text style={{color: "black", marginTop:10, width:65}}>Football</Text>
                        <RadioButton
                            style={{right:0, width: 10}}
                            value="Football"
                            status={ gameScope === 'Football' ? 'checked' : 'unchecked' }
                            onPress={() => onChangeGameScope('Football')}
                        />
                    </View>
                    <View style={{display: 'flex',flexDirection: 'row'}}>
                        <Text style={{color: "black", marginTop:10, width:65}}>Basketball</Text>
                        <RadioButton
                            style={{ right:0, width: 10}}
                            value="Basketball"
                            status={ gameScope === 'Basketball' ? 'checked' : 'unchecked' }
                            onPress={() => onChangeGameScope('Basketball')}
                        />
                    </View>
                </View>
                <View style={{display: 'flex',flexDirection: 'row', marginTop:30}}>
                    <Text style={labelStyle} width={100}marginRight={10} marginLeft={11}>Select game's date:</Text>
                    <DatePicker
                            style={{width: 200}}
                            date={date}
                            mode="datetime"
                            placeholder="Select date"
                            format="YYYY-MM-DD HH:mm"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            customStyles={{
                                dateIcon: {
                                    marginRight: 20
                                },
                                dateInput: {
                                    marginLeft: 36
                                }
                            }}
                            onDateChange={(date) => {setDate(date)}}
                    />
                </View>
                <View style={{display: 'flex',flexDirection: 'row', width:'100%',marginTop:30, marginBottom:50}}>
                    <Text style={labelStyle} marginBottom={5} marginRight={10}>Select game's duration: (in minutes)</Text>
                    <Picker
                        selectedValue={gameDuration}
                        onValueChange={(itemValue) => onChangeGameDuration(itemValue)}
                        style={{marginTop: -10,width:100, height: 50}}
                        prompt={true}
                        itemStyle={{height:50, fontSize:12}}
                    >
                        <Picker.Item label="15" value="15" />
                        <Picker.Item label="30" value="30" />
                        <Picker.Item label="45" value="45" />
                        <Picker.Item label="60" value="60" />
                        <Picker.Item label="75" value="75" />
                        <Picker.Item label="90" value="90" />
                        <Picker.Item label="105" value="105" />
                        <Picker.Item label="120" value="120" />
                    </Picker>
                </View>
                <View style={{width:'100%',marginTop:30, marginBottom:30}}>
                    <Text style={labelStyle} marginRight={10}>Select game's team:</Text>
                    <FlatList
                        style={{marginLeft:10, width:'100%'}}
                        data={teams}
                        renderItem={renderItem}
                        keyExtractor={item => item}
                    />
                </View>
                <ThemedButton style={{marginHorizontal: 70, marginVertical: 10}} stretch={false} name={"bruce"}
                              type="primary" size={"large"} onPress={OnPressSave}>Submit</ThemedButton>
            </View>
        </SafeAreaView>
    )
};

