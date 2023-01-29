import React, {useState, useEffect} from 'react';
import {View, FlatList, ActivityIndicator} from 'react-native';
import styled from 'styled-components/native';
import {CardTeamsToJoin} from "./Card";
import ConfirmChangesModal from "./ConfirmChangesModal";
import {useSelector} from "react-redux";
import {selectUser} from "../features/userSlice";
import {useIsFocused} from "@react-navigation/native";
import PlayersInTeam from "./PlayersInTeam";
import joinTeam from "../Fetches/joinTeam";

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
    const [modalShow, setModalShow] = useState(false);
    const [teamJoin, setTeamJoin] = useState({})
    const [loadModal, setLoadModal] =useState(false);
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



    const confirmJoin = () =>{
        setLoadModal(true);
        joinTeam(teamJoin._id, user.userID);
        navigation.goBack();
    }

    const cancelJoin = () =>{
        setModalShow(false);
    }
    const joinTeamHandler = (team) => {
        setModalShow(true);
        setTeamJoin(team);
    }

    const renderItem = ({item}) => {
        return (
            <View>
                <CardTeamsToJoin onJoin={joinTeamHandler} team={item} children={<PlayersInTeam team={item}/>} />
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
            {modalShow && <ConfirmChangesModal loading={loadModal} message={`Join ${teamJoin.name}?`} onConfirm={confirmJoin} onCancel={cancelJoin}/>}
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
