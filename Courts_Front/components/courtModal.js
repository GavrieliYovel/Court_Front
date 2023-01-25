import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Modal, Image, FlatList, Button} from 'react-native';
import * as Location from "expo-location";
import {Marker} from "react-native-maps";
import moment from "moment";

export const CourtModal = ({ modalVisible, markerData, onClose }) => {
    const [inTeam, setInTeam] = useState(false);
    const JoinTeam = async (teamID) => {
        console.log(teamID);
        await fetch(`https://courts.onrender.com/teams/player/${teamID}/63c6f00322c07481efcd1960`, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
        })
            .then(data => {
                console.log('added')
            })
            .catch(err => console.error(err));
    }
    //const checkInTeam
    const Item = ({scope, gameDate, endDate, teamID, inGame }) => {
        const start = moment(gameDate).format("HH:mm A");
        const end = moment(endDate).format("HH:mm A");
        const date = moment(gameDate).format("DD-MM-YYYY");

        // console.log(teamID);
        // console.log(end);
        return(
            <View style={styles.item}>
                <Text>{date}</Text>
                <Text>{scope} {start}-{end}</Text>
                { inGame?
                    <Button
                    onPress={ () => { //JoinTeam(teamID)
                                        setInTeam(false)} }
                    title="Leave Team"
                    color="red"
                    />:
                    <Button
                        onPress={ () => {setInTeam(true)} }
                        title="Join Team"
                        color="blue"
                    />}

            </View>
        );
    }

    return (
        <Modal
            animationType="slide"
            transparent={false}
            visible={modalVisible}
        >
        <View style={styles?.modalContainer}>
            <Text>{markerData?.name}</Text>
            <Text>{markerData?.city}</Text>
            <Text>{markerData?.scope?.join(", ")}</Text>
            <Text>Games:</Text>
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
            {/*{  markerData.games ? markerData.games.map((games, index) => (*/}
            {/*    <View*/}
            {/*        key={games?._id}*/}
            {/*    >*/}
            {/*        <Text>Type: {games.scope}</Text>*/}
            {/*        <Text>Start: {games.gameDate}</Text>*/}
            {/*        <Text>End: {games.endDate}</Text>*/}
            {/*    </View>*/}
            {/*)):[]}*/}
            <TouchableOpacity onPress={onClose}>
                <Text>Close</Text>
            </TouchableOpacity>
        </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        elevation: 5,
    },
    item: {
        backgroundColor: 'steelblue',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    }
});

