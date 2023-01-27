import React, { Component } from 'react';
import { RadioButton } from 'react-native-paper';
import RNPickerSelect from 'react-native-picker-select';


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
import DatePicker from 'react-native-datepicker';
import Ionicons from 'react-native-vector-icons/Ionicons';
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
    }
});
export const GameForm = () => {
    const [gameScope, onChangeGameScope] = React.useState('Football');
    const [gameDuration, onChangeGameDuration] = React.useState('15');
    const [date, setDate] = React.useState(new Date());
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
    return (
        <SafeAreaView style={{flex: 1, justifyContent: 'center'}}>
            <View style={{paddingHorizontal: 25}}>
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

                <Text
                    style={{
                        fontSize: 12,
                        fontWeight: '350',
                        color: '#333',
                        marginBottom: 5,
                        marginTop: 5,
                    }}>
                    Football
                </Text>
                    <RadioButton
                        value="Football"
                        status={ gameScope === 'Football' ? 'checked' : 'unchecked' }
                        onPress={() => onChangeGameScope('Football')}
                    />
                <Text
                    style={{
                        fontSize: 12,
                        fontWeight: '500',
                        color: '#333',
                        marginBottom: 30,
                        marginTop: 30,
                    }}>
                    Basketball
                </Text>
                    <RadioButton
                        value="Basketball"
                        status={ gameScope === 'Basketball' ? 'checked' : 'unchecked' }
                        onPress={() => onChangeGameScope('Basketball')}
                    />

                <View>
                    <SafeAreaView style={styles.container}>
                    {/*<Ionicons*/}
                    {/*    name="ios-lock-closed-outline"*/}
                    {/*    size={20}*/}
                    {/*    // color="#666"*/}
                    {/*    style={{marginRight: 5}}*/}
                    {/*/>*/}
                        <Text
                            style={{
                                fontSize: 12,
                                fontWeight: '500',
                                color: '#333',
                                marginBottom: 30,
                                marginTop: 30,
                            }}>
                            Select a date
                        </Text>
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
                                    position: 'absolute',
                                    left: 0,
                                    top: 4,
                                    marginLeft: 0
                                },
                                dateInput: {
                                    marginLeft: 36
                                }
                            }}
                            onDateChange={(date) => {setDate(date)}}
                    />
                        <Text
                            style={{
                                fontSize: 16,
                                fontWeight: '500',
                                color: '#333',
                                marginBottom: 10,
                                marginTop: 30,
                            }}>
                            Duration of the game?
                        </Text>
                        <RNPickerSelect
                            placeholder={"Duration of the game"}
                            style={{fontSize: 16,
                                marginTop: 20,
                                paddingVertical: 12,
                                paddingHorizontal: 10,
                                borderWidth: 1,
                                borderColor: 'gray',
                                borderRadius: 4,
                                color: 'black',
                                paddingRight: 30}}
                            itemKey={gameDuration}
                            onValueChange={(value) => onChangeGameDuration(value)}
                            items={[
                                {label:'15', value:"key0"},
                                {label:"30", value:"key1"},
                                {label:"45", value:"key2"},
                                {label:"60", value:"key3"},
                                {label:"75",value: "key4"},
                                {label:"90", value:"key5"},
                                {label:"105", value:"key6"},
                                {label:"120", value:"key7"},
                            ]}
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
                            }}
                        />
                    </SafeAreaView>
                </View>
                <Button
                    style={{ position: 'absolute',
                        bottom: 0}}
                    // onPress={OnPressSave}
                    title="Save"
                    color="steelblue"
                    accessibilityLabel="Save"
                />
            </View>
        </SafeAreaView>
    )
};

