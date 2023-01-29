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
    Button, Platform
} from 'react-native';
import DatePicker from 'react-native-datepicker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ConfirmChangesModal from "./ConfirmChngesModal";
import {StackActions} from "@react-navigation/native";
import {Input} from "react-native-elements";
import {MultipleSelectList} from "react-native-dropdown-select-list/index";
import {ThemedButton} from "react-native-really-awesome-button";
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from "moment";
import {useSelector} from "react-redux";
import {selectUser} from "../features/userSlice";
import { useNavigation } from '@react-navigation/native';



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

export const GameForm = ({navigation, route}) => {
    const courtID = route.params.courtID;
    const scope = route.params.scope;
    console.log(scope);
    console.log(courtID);
    const user = useSelector(selectUser);
    const [gameScope, onChangeGameScope] = React.useState('');
    const [gameDuration, onChangeGameDuration] = React.useState('15');
    // const [date, setDate] = React.useState(new Date());
    const [selectedTeam, onChangeTeams] = React.useState('');

    //datetimepicker
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [text, setText] = useState('Date');
    const [error, setError] = useState(false);
    const [errorText, setErrorText] = useState('');

    const onChange= (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);

        let tempDate = new Date(currentDate);
        let fDate = moment(tempDate).format("DD-MM-YYYY");
        let fTime = moment(tempDate).format("HH:mm A")
        setText(fDate + ' ' + fTime);
        console.log(fDate);
    }
    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    }


    const OnPressSave = () => {
        console.log('clicked');
        console.log(user.userID);
        console.log(gameScope);
        console.log(date);
        console.log(moment(date).add(parseInt(gameDuration), 'minutes').toDate());
        console.log(selectedTeam);
        if(gameScope === '') {
            setErrorText('Choose Scope');
            setError(true);
            return;
        }
        if(selectedTeam === '') {
            setErrorText('Choose Team');
            setError(true);
            return;
        }
        if(text === 'Date') {
            setErrorText('Choose Date');
            setError(true);
            return;
        }

        fetch('https://courts.onrender.com/games/new', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                creator: user.userID,
                court: courtID,
                scope: gameScope,
                gameDate: date,
                endDate: moment(date).add(parseInt(gameDuration), 'minutes'),
                team: selectedTeam
            })
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                navigation.goBack()
            })
            .catch(e => {
                setErrorText('There is already a game at this time!');
                setError(true);
            })
    }
    const [teams, setTeams] = React.useState([]);
    useEffect(()=>{
        fetch(`https://courts.onrender.com/teams/${user.userID}`)
            .then(response => response.json())
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
            <View style={{display:'flex', flexDirection:'row', width:'100%', alignItems:"center"}}>
                <View style={{width:'85%'}}>
                    <Text style={{fontWeight: 'bold', marginTop:10}}>{item.name} </Text>
                    <Text style={{marginTop:10}}>Team's players: {names+ ' '}</Text>
                </View>
                <RadioButton
                    style={{width:20}}
                    value={item._id}
                    status={ selectedTeam === item._id ? 'checked' : 'unchecked' }
                    onPress={() => onChangeTeams(item._id)}
                />
            </View>
        );
    }

    return (
            <View style={{
                display:"flex",
                flex: 1,
                marginHorizontal: 10
            }}>
                <View style={{
                    marginVertical: 10,
                    flexDirection: "row",
                    justifyContent:"space-between",
                    alignItems: "center"
                }}>
                    <Text
                        style={{
                            fontSize: 28,
                            fontWeight: '500',
                            color: '#333',
                        }}>
                        Let's create a game!
                    </Text>
                    <ThemedButton raiseLevel={1} height={30} width={45}  onPress={navigation.goBack} name="bruce" type="primary" size="small">X</ThemedButton>
                </View>
                <View>
                    <Text style={labelStyle} marginBottom={5}>Select game's scope:</Text>
                    <View style={{display: 'flex',flexDirection: 'row'}}>
                        <Text style={{color: "black", marginTop:10, width:100}}>Football</Text>
                        {scope.includes("Football") ?
                        <RadioButton
                            style={{width: 10}}
                            value="Football"
                            status={ gameScope === 'Football' ? 'checked' : 'unchecked' }
                            onPress={() => onChangeGameScope('Football')}
                        /> :
                            <RadioButton
                                style={{width: 10, color: "gray"}}
                                value="Football"
                                status={ gameScope === 'Football' ? 'checked' : 'unchecked' }
                                onPress={() => onChangeGameScope('Football')}
                                disabled={"disable"}
                            />
                        }
                    </View>
                    <View style={{display: 'flex',flexDirection: 'row'}}>
                        <Text style={{color: "black", marginTop:10, width:100}}>Basketball</Text>
                        {scope.includes("Basketball") ?
                        <RadioButton
                            style={{ width: 10}}
                            value="Basketball"
                            status={ gameScope === 'Basketball' ? 'checked' : 'unchecked' }
                            onPress={() => onChangeGameScope('Basketball')}
                        />:
                        <RadioButton
                            style={{ width: 10, color: "gray"}}
                            value="Basketball"
                            status={ gameScope === 'Basketball' ? 'checked' : 'unchecked' }
                            onPress={() => onChangeGameScope('Basketball')}
                            disabled={"disable"}
                        />
                        }
                    </View>
                </View>
                <View style={{display: 'flex',flexDirection: 'row', marginTop:10, alignItems: "center"}}>
                    <Text style={labelStyle} width={100}marginRight={10} marginLeft={11}>Select game's date:</Text>
                    <Text> {text}</Text>
                </View>
                <View style={{display: 'flex',flexDirection: 'row', marginTop:10, alignItems: "center"}}>
                    <TouchableOpacity style={{borderRadius: 10, borderWidth:1, marginRight:5}} onPress={() => showMode('date')}>
                        <Text style={{padding:5}}>
                            Select Date
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{borderRadius: 10, borderWidth:1}} onPress={() => showMode('time')}>
                        <Text style={{padding:5}}>
                            Select Time
                        </Text>
                    </TouchableOpacity>
                </View>
                {show && (
                    <DateTimePicker
                        testID='dateTimePicker'
                        value={date}
                        mode={mode}
                        is24Hour={true}
                        display='default'
                        onChange={onChange}
                    />
                )}
                <View style={{display: 'flex',flexDirection: 'row', width:'100%',marginTop:10, marginBottom:10, alignItems: "center"}}>
                    <Text style={labelStyle} marginBottom={5} marginRight={10}>Select game's duration: (in minutes)</Text>
                    <Picker
                        selectedValue={gameDuration}
                        onValueChange={(itemValue) => onChangeGameDuration(itemValue)}
                        style={{width:100}}
                        itemStyle={{ width:50, fontSize:10}}
                    >
                        <Picker.Item key="15" label="15" value="15" />
                        <Picker.Item key="30" label="30" value="30" />
                        <Picker.Item key="45" label="45" value="45" />
                        <Picker.Item key="60" label="60" value="60" />
                        <Picker.Item key="75" label="75" value="75" />
                        <Picker.Item key="90" label="90" value="90" />
                        <Picker.Item key="105" label="105" value="105" />
                        <Picker.Item key="120" label="120" value="120" />
                    </Picker>
                </View>
                <View style={{width:'100%'}}>
                    <Text style={labelStyle} marginRight={10}>Select game's team:</Text>
                    <FlatList
                        style={{marginLeft:10, width:'100%'}}
                        data={teams}
                        renderItem={renderItem}
                        keyExtractor={item => item._id?.toString()}
                    />
                </View>
                <ThemedButton style={{marginHorizontal: 70, marginVertical: 10}} stretch={false} name={"bruce"}
                              type="primary" size={"large"} onPress={OnPressSave}>Submit</ThemedButton>

                {error && <Text style={{color: "red", fontWeight: "bold", fontSize: 15}}>{errorText}</Text>}

            </View>

    )
};

