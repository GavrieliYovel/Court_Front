import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';


const styles = StyleSheet.create({
    title: {}
})
const TeamsByPlayerList = ({playerId}) => {

    const [teams, setTeams] = useState([]);

    useEffect(() => {
        fetch(`https://courts.onrender.com/teams/${playerId}`)
            .then(response => response.json())
            .then(data => setTeams(data))
            .catch(error => console.error('Error:', error));
    }, []);


    const renderItem = ({item}) => {
        console.log(item);
        return (
            <View style={{padding: 20}}>
                <Text>{item.name}</Text>
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
