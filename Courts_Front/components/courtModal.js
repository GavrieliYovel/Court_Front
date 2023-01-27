import React, {useEffect, useState} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Modal,
    Image,
    FlatList,
    Button,
    Dimensions,
    ScrollView
} from 'react-native';
import * as Location from "expo-location";
import {Marker} from "react-native-maps";
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
import moment from "moment";
import { ThemedButton } from 'react-native-really-awesome-button';

const playerID = '63c6f00322c07481efcd1960';
export const CourtModal = ({ modalVisible, markerData, onClose }) => {
    const [inTeam, setInTeam] = useState([]);
    const [inDate, setInDate] = useState(Date(Date.now()));


    const getInTeam =  (playerID) => {
        fetch(`https://courts.onrender.com/teams/${playerID}`)
            .then(response => response.json())
            .then(data => {
                setInTeam(data);
            })
            .catch(err => console.error(err));
    }
    const JoinTeam =  (teamID) => {
        console.log(teamID);
         fetch(`https://courts.onrender.com/teams/player/${teamID}/${playerID}`, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
        })
            .then(data => {
                console.log('added')
                getInTeam(playerID);
            })
            .catch(err => console.error(err));
    }

    const LeaveTeam =  (teamID) => {
        console.log(teamID);
         fetch(`https://courts.onrender.com/teams/player/${teamID}/${playerID}`, {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
        })
            .then(data => {
                console.log('Deleted');
                getInTeam(playerID);
            })
            .catch(err => console.error(err));
    }

    useEffect(() => {
        getInTeam(playerID);
    }, []);
    //const checkInTeam
    const Item = ({scope, gameDate, endDate, teamID, inGame }) => {
        const start = moment(gameDate).format("HH:mm A");
        const end = moment(endDate).format("HH:mm A");
        const date = moment(gameDate).format("DD-MM-YYYY");

        // console.log(teamID);
        if(date == moment(inDate).format("DD-MM-YYYY")) {
            return(
                <View style={styles.item}>
                    <Text>{date}</Text>
                    <Text>{scope}</Text>
                    <Text>{start}-{end}</Text>
                    { inTeam.find(team => team._id == teamID)?
                        <ThemedButton
                            onPress={ () => { LeaveTeam(teamID)}}
                            name="bruce"
                            type="secondary"
                        >Leave Team</ThemedButton>:
                        <ThemedButton
                            name="bruce"
                            onPress={ () => {JoinTeam(teamID)}}
                            type="primary"
                        >Join Team</ThemedButton>}

                </View>
            );
        }

    }

    return (
        <Modal
            animationType="slide"
            transparent={false}
            visible={modalVisible}
        >
        <View style={styles.modalContainer}>
            <Text style={styles.title}>{markerData?.name}</Text>
            <Text>{markerData?.city}</Text>
            <Text>{markerData?.scope?.join(", ")}</Text>
            <Text>Games: </Text>
            <View style={styles.selector}>
                <Button title={"<"} onPress={ () => setInDate(moment(inDate).subtract(1, 'day'))}/>
                <Text>{moment(inDate).format("DD-MM-YYYY")}</Text>
                <Button title={">"} onPress={ () => setInDate(moment(inDate).add(1, 'day'))} />
            </View>

            <FlatList
                data={markerData.games}
                renderItem={({item}) => <Item
                    scope={item.scope}
                    gameDate={item.gameDate}
                    endDate={item.endDate}
                    teamID={item.team}
                    inGame={false}
                                                />}
                keyExtractor={item => item._id}
            />
            {/*<TouchableOpacity onPress={onClose}>*/}
            {/*    <Text>Close</Text>*/}
            {/*</TouchableOpacity>*/}
            <ThemedButton style={styles.rightButton} onPress={onClose} name="bruce" type="primary" size="small">Close</ThemedButton>
            <ThemedButton style={styles.leftButton} name="bruce" type="primary">Create Game</ThemedButton>
        </View>
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
        // backgroundColor: 'steelblue',
        // padding: 20,
        width: screenWidth * 0.75,
        // marginVertical: 8,
        // marginHorizontal: 16,
        // height: '100%',
        // width: '100%',
        flex:1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#FFF",
        borderRadius: 10,
        margin: 10,
        padding: 20
    },
    title: {
        fontWeight: 'bold'
    },
    buttonStyle: {
        marginTop: 10,
        borderRadius: 20
    },
    selector: {
        display: "flex"
    },
    leftButton: {
        position: 'absolute',
        bottom:10,
        right:-10,
    },
    rightButton: {
        position: 'absolute',
        bottom:10,
        left: 50,
    }

});

