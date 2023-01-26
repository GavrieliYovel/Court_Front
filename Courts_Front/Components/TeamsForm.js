import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { Input, Button } from 'react-native-elements';

const teamDefault = {
    _id: null,
    name : "Team Name",
    players: [],
    details: "Team Details"
}

const TeamForm = (team = {teamDefault}) => {

    const [name, setName] = useState(team.name);
    const [details, setDetails] = useState(team.details);

    const handleSubmit = () => {
        console.log(`Name: ${name}, Email: ${email}, Password: ${password}`);
    };

    return (
        <View>

            <Input label={"Name:"} onChangeText={setName} value={`${name}`} />
            <Input label={"Details:"} aonChangeText={setDetails} value={`${details}`} />
            <Button title="Submit" onPress={handleSubmit} />
        </View>
    );
};

export default TeamForm;
