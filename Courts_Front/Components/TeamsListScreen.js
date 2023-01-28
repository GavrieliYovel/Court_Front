import React, {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, Text, View} from 'react-native';
import {CardTeamListPlayer} from "./Card";
import {ThemedButton,} from 'react-native-really-awesome-button';
import {useIsFocused} from "@react-navigation/native";
import {useSelector} from "react-redux";
import {selectUser} from "../features/userSlice";
import PlayersInTeam from "./PlayersInTeam";
import leaveTeam from "../Fetches/leaveTeam";
import ConfirmChangesModal from "./ConfirmChangesModal";


// const playerId = '63c6f3353dbfc677bcb2e871'

const TeamsByPlayerList = ({navigation}) => {
    const user = useSelector(selectUser);
    const [teams, setTeams] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [exitTeam, setExitTeam] = useState({})
    const [loadModal, setLoadModal] =useState(false);
    const [render, setRender] = useState(false)

    const isFocused = useIsFocused();

    useEffect(() => {
        setLoading(true);
        fetch(`https://courts.onrender.com/teams/${user.userID}`)
            .then(response => response.json())
            .then(data => {
                setTeams(data)
                setLoading(false);
            })
            .catch(error => console.error('Error:', error));
    }, [isFocused, render]);

    const exitTeamHandler = (team) => {
        setLoadModal(true);
        leaveTeam(exitTeam._id, user.userID).then((response) => {
            setLoadModal(false)
            setShowModal(false);
            setRender(!render);
        });
    }


    const renderItem = ({item}) => {
        return (
            <CardTeamListPlayer onExit={(team) => {
                setExitTeam(team)
                setShowModal(true)
            }
            } navigation={navigation} team={item} children={<PlayersInTeam team={item}/>} details={item.details}/>
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
                                  onPress={() =>{navigation.navigate("TeamForm", {title: "New Team"})}}
                                  type="secondary" size={"large"}>New Team</ThemedButton>}
                {!loading &&
                    <ThemedButton style={{marginHorizontal: 70, marginBottom: 20}} stretch={false} name={"bruce"}
                                  type="primary"
                                  onPress={() => {
                                      navigation.navigate("OtherTeams", {playerId: user.userID})
                                  }} size={"large"}>Join Team</ThemedButton>}
            </View>)
    }

    return (
        <View>
            {showModal && <ConfirmChangesModal onConfirm={exitTeamHandler} message={`Leave ${exitTeam.name}?`} onCancel={() => setShowModal(false)} loading={loadModal}/>}
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
