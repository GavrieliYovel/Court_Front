import React, {useEffect, useState} from 'react';
import {View, Text, TextInput} from 'react-native';
import {Input, Button} from 'react-native-elements';
import {StyleSheet} from "react-native";
import {MultipleSelectList} from "react-native-dropdown-select-list/index";
import {ThemedButton} from "react-native-really-awesome-button";
import ConfirmChangesModal from "./ConfirmChngesModal";
import {StackActions} from '@react-navigation/native';

const playerId = '63c6f3353dbfc677bcb2e871';

const teamDefault = {
    _id: null,
    name: "Team Name",
    players: [],
    details: "Team Details"
}

const labelStyle = StyleSheet.create({
    fontWeight: "bold",
    color: "black"
})

const TeamForm = ({navigation, route}) => {
    let isNewTeam = false;
    const setNewTeam = () => {
        isNewTeam = true;
        return teamDefault
    }
    const team = route.params.team || setNewTeam();

    const [modalVisible, setModalVisible] = useState(false);
    const [name, setName] = useState(team.name);
    const [details, setDetails] = useState(team.details);
    const [players, setPlayers] = useState([]);

    const [selectedPlayers, setSelectedPlayers] = useState(() =>
        team.players.map((player) => {
                return ({
                    key: player._id,
                    value: player.name
                })
            }
        )
    );


    const handleSubmit = () => {
        console.log("here");
        setModalVisible(true);
    };

    return (
        <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <ConfirmChangesModal visible={modalVisible} onConfirm={() => console.log("Confirm")}
                                 onCancel={() => navigation.dispatch(StackActions.pop(1))}/>
            <Input label={"Team name:"} labelStyle={labelStyle} placeholder={`${name}`}
                   onChange={newName => setName(newName)}/>
            <Input label={"Details:"} labelStyle={labelStyle} placeholder={`${details}`}
                   onChange={details => setDetails(details)}/>

            {isNewTeam &&
                <Text style={labelStyle}>Add Players</Text>
                && <MultipleSelectList setSelected={(player) => setSelectedPlayers(player)} data={players}/>}
            <ThemedButton style={{marginHorizontal: 70, marginVertical: 10}} stretch={false} name={"bruce"}
                          type="primary" size={"large"} onPress={handleSubmit}>Submit</ThemedButton>
        </View>
    );
};

export default TeamForm;
