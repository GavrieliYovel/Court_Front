import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator} from 'react-native';
import styled from 'styled-components/native';
import {CardTeamListPlayer} from "./Card";
import {teamsData} from "../StatitcDatatForTest/teamsData"
import {ThemedButton,} from 'react-native-really-awesome-button';

const randomColor = Math.floor(Math.random() * 16777215).toString(16);
const StyledViewForPlayers = styled(View)`
  background-color: black;
  color: white;
  border-radius: 7px;
  margin: 5px 3px 5px 3px;
`;
const TeamsByPlayerList = ({playerId}) => {

    const [teams, setTeams] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        fetch(`https://courts.onrender.com/teams/${playerId}`)
            .then(response => response.json())
            .then(data => {
                setTeams(data)
                setLoading(false);
            })
            .catch(error => console.error('Error:', error));
    }, []);

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
        console.log(item)
        return (
            <CardTeamListPlayer title={item.name} children={<PlayersInTeam team={item}/>} details={item.details}/>

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

    const FooterButtons = () => {
        return (
            <View>
                {!loading &&
                    <ThemedButton style={{marginHorizontal: 70, marginVertical: 10}} stretch={false} name={"bruce"}
                                  type="secondary" size={"large"}>New Team</ThemedButton>}
                {!loading && <ThemedButton style={{marginHorizontal: 70, marginBottom: 20}} stretch={false} name={"bruce"} type="primary"
                                           size={"large"}>Join Team</ThemedButton>}
            </View>)
    }
    console.log(teams);
    return (
        <View>
            <ActivityIndicator animating={loading} style={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: 300,
                bottom: 0,
            }} size={150} color="black"/>

            {!loading && <FlatList
                data={teams}
                renderItem={renderItem}
                keyExtractor={item => item._id?.toString()}
                ItemSeparatorComponent={renderSeparatorView}
                refreshing={!loading}
                ListFooterComponent={FooterButtons}
            />}


        </View>
    );
};

export default TeamsByPlayerList;
