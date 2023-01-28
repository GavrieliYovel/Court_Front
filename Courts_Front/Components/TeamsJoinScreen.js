import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator} from 'react-native';
import styled from 'styled-components/native';
import {CardTeamsToJoin} from "./Card";
import {allTeamsData} from "../StatitcDatatForTest/allTeamsData"
import {ThemedButton} from 'react-native-really-awesome-button';
import {useSelector} from "react-redux";
import {selectUser} from "../features/userSlice";
import {useIsFocused} from "@react-navigation/native";

const StyledViewForPlayers = styled(View)`
  background-color: black;
  color: white;
  border-radius: 7px;
  margin: 5px 3px 5px 3px;
`;
const TeamsJoinScreen = ({ navigation, playerId}) => {
    const user = useSelector(selectUser);
    const [teams, setTeams] = useState([]);
    const [loading, setLoading] = useState(false);
    const isFocused = useIsFocused();

    useEffect(() => {
        setLoading(true);
        fetch(`https://courts.onrender.com/teams/noplayer/${user.userID}`)
            .then(response => response.json())
            .then(data => {
                setTeams(data);
                setLoading(false);
            })
            .catch(error => console.error('Error:', error));
    }, [isFocused]);

    // useEffect(()=>{
    //     setTeams(allTeamsData);
    // },[]);


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
      border-radius: 10px;
      margin: 10px;
      padding: 50px;
    `;


    const renderItem = ({item}) => {
        return (
            <View>
                <CardTeamsToJoin navigation ={navigation} title={item.name} children={<PlayersInTeam team={item}/>} details={item.details}/>
            </View>
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
            />}


        </View>
    );
};

export default TeamsJoinScreen;
