import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import styled from 'styled-components/native';
import StylishCard from "./Card";
import {teamsData} from "../StatitcDatatForTest/teamsData"

const StyledViewForPlayers = styled(View)`
  background-color: black;
  color: white;
  border-radius: 7px;
  margin: 5px 3px 5px 3px;
`;
const TeamsByPlayerList = ({playerId}) => {

    const [teams, setTeams] = useState([]);

    // useEffect(() => {
    //     fetch(`https://courts.onrender.com/teams/${playerId}`)
    //         .then(response => response.json())
    //         .then(data => {
    //            data ? setTeams(data) : setTeams(teamsData)
    //         })
    //         .catch(error => console.error('Error:', error));
    // }, []);

    useEffect((() => {
        setTeams(teamsData)
    }), []);

    let PlayersInTeam = ({team}) => {
        return (
            team.players.map((player) => {
                return (<StyledViewForPlayers><Text
                    style={{color: 'white'}}>{player.name}</Text></StyledViewForPlayers>)
            })

        )
    }

    PlayersInTeam = styled(PlayersInTeam)`
    ;
      color: white;
      font-weight: bold;
      border-radius: 10;
      margin: 10px;
      padding: 20px;
    `;


    const renderItem = ({item}) => {
        return (
            <StylishCard title={item.name} children={<PlayersInTeam team={item} />} details={item.details}/>

        );
    }
    const renderSeparatorView = () => {
        return (
            <View style={{
                height: 1,
                width: "100%",
                backgroundColor: "#CEDCCE",
            }}
            />
        );
    };
    console.log(teams);
    return (
        <View>
            <FlatList
                data={teams}
                renderItem={renderItem}
                keyExtractor={item => item._id?.toString()}
                ItemSeparatorComponent={renderSeparatorView}
            />
        </View>
    );
};

export default TeamsByPlayerList;
