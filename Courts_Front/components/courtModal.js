import React, {useEffect, useState} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Modal,
    FlatList,
    Dimensions,
    SafeAreaView
} from 'react-native';

const screenWidth = Dimensions.get('window').width;
import moment from "moment";
import {ThemedButton} from 'react-native-really-awesome-button';
import {useSelector} from "react-redux";
import {selectUser} from "../features/userSlice";
import {useIsFocused} from "@react-navigation/native";


export const CourtModal = ({navigation, modalVisible, markerData, onClose, onNavigation, nav}) => {
    const user = useSelector(selectUser);
    const [inTeam, setInTeam] = useState([]);
    const [inDate, setInDate] = useState(Date(Date.now()));
    const isFocused = useIsFocused();


    const getInTeam = (playerID) => {
        fetch(`https://courts.onrender.com/teams/${playerID}`)
            .then(response => response.json())
            .then(data => {
                setInTeam(data);
            })
            .catch(err => console.error(err));
    }
    const JoinTeam = (teamID) => {
        fetch(`https://courts.onrender.com/teams/player/${teamID}/${user.userID}`, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
        })
            .then(data => {
                getInTeam(user.userID);
            })
            .catch(err => console.error(err));
    }

    const LeaveTeam = (teamID) => {
        fetch(`https://courts.onrender.com/teams/player/${teamID}/${user.userID}`, {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
        })
            .then(data => {
                console.log('Deleted');
                getInTeam(user.userID);
            })
            .catch(err => console.error(err));
    }

    useEffect(() => {
        getInTeam(user.userID);
    }, [isFocused]);
    const Item = ({scope, gameDate, endDate, teamID, teamName}) => {
        const start = moment(gameDate).format("HH:mm A");
        const end = moment(endDate).format("HH:mm A");
        const date = moment(gameDate).format("DD-MM-YYYY");

        if (date == moment(inDate).format("DD-MM-YYYY")) {
            return (
                <View style={styles.item}>
                    <Text>{date}</Text>
                    <Text>Team: {teamName}</Text>
                    <Text>Playing: {scope}</Text>
                    <Text style={{marginBottom: 5}}>{start}-{end}</Text>
                    {inTeam.find(team => team._id == teamID) ?
                        <ThemedButton
                            onPress={() => {
                                LeaveTeam(teamID)
                            }}
                            name="bruce"
                            type="secondary"
                        >Leave Team</ThemedButton> :
                        <ThemedButton
                            name="bruce"
                            onPress={() => {
                                JoinTeam(teamID)
                            }}
                            type="primary"
                        >Join Team</ThemedButton>}

                </View>
            );
        }
    }

    return (
        <Modal
            transparent={false}
            visible={modalVisible}
        >
            <SafeAreaView style={styles.modalContainer}>
                <View style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignSelf: "flex-start",
                    width: "100%"
                }}>
                    <View>
                        <Text style={styles.title}>{markerData?.name}</Text>
                        <Text>{markerData?.city}</Text>
                        <Text>{markerData?.scope?.join(", ")}</Text>
                    </View>
                    <ThemedButton raiseLevel={1} height={30} width={45} onPress={onClose} name="bruce" type="primary"
                                  size="small">X</ThemedButton>
                </View>
                <Text style={{fontWeight: "bold", fontSize: 20, marginTop: 7}}>Games: </Text>
                <View style={styles.selector}>
                    <ThemedButton raiseLevel={1} height={30} width={45} name="bruce" type="primary" size={"small"}
                                  onPress={() => setInDate(moment(inDate).subtract(1, 'day'))}>{"<"}</ThemedButton>
                    <Text style={styles.datePicker}>{moment(inDate).format("DD-MM-YYYY")}</Text>
                    <ThemedButton raiseLevel={1} height={30} width={45} name="bruce" type="primary" size="small"
                                  onPress={() => setInDate(moment(inDate).add(1, 'day'))}>{">"}</ThemedButton>
                </View>

                <FlatList
                    data={markerData.games}
                    renderItem={({item}) => <Item
                        scope={item.scope}
                        gameDate={item.gameDate}
                        endDate={item.endDate}
                        teamID={item.team._id}
                        teamName={item.team.name}
                        inGame={false}
                    />}
                    keyExtractor={item => item._id}
                />
                <View style={{display: "flex", flexDirection: "row"}}>
                    <ThemedButton style={{marginRight: 10}} name="bruce" type="primary" size="small" onPress={() => {
                        onClose();
                        navigation.navigate('GameForm', {courtID: markerData._id, scope: markerData.scope});
                    }
                    }>Create Game</ThemedButton>


                    {nav && <ThemedButton name="bruce" type="primary" size="small" onPress={() => {
                        onClose();
                        onNavigation(null, null);
                    }
                    }>Cancel Navigation</ThemedButton>}
                    {!nav &&
                        <ThemedButton name="bruce" type="primary" size="small" onPress={() => {
                            onClose();
                            onNavigation(markerData.location.LAT, markerData.location.LON);
                        }
                        }>Navigate</ThemedButton>}
                </View>
            </SafeAreaView>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'gainsboro',
        padding: 20,
        borderRadius: 10,
        elevation: 5,
    },
    item: {
        width: screenWidth * 0.75,
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#FFF",
        borderRadius: 10,
        margin: 10,
        padding: 20
    },
    title: {
        fontWeight: 'bold',
        fontSize: 24,

    },
    buttonStyle: {
        marginTop: 10,
        borderRadius: 20
    },
    selector: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    datePicker: {
        fontWeight: "bold",
        marginHorizontal: 5
    },
    datePickerButton: {
        backgroundColor: "#3A3A3A",
        height: 30,
        width: 45,
    }

});

