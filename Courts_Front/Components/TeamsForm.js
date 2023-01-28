import React, {useEffect, useState} from 'react';
import {View, Text, TextInput} from 'react-native';
import {Input, Button} from 'react-native-elements';
import {StyleSheet} from "react-native";
import {ThemedButton} from "react-native-really-awesome-button";
import ConfirmChangesModal from "./ConfirmChngesModal";
import updateTeam from "../Fetches/updateTeam";
import getAllUsers from "../Fetches/getAllUsers";
import DropDownPicker from 'react-native-dropdown-picker';
import users from "../StatitcDatatForTest/users";
import {useSelector} from "react-redux";
import {selectUser} from "../features/userSlice";

// const playerId = '63c6f3353dbfc677bcb2e871';
const teamDefault = {
    _id: null,
    name: "Team Name",
    players: [],
    details: "Team Details"
}

const labelStyle = StyleSheet.create({
    fontWeight: "bold",
    color: "black"
})

const TeamForm = ({navigation, route}) => {
    const user = useSelector(selectUser);
    let isNewTeam = false;
    const setNewTeam = () => {
        isNewTeam = true;
        return teamDefault
    }
    const team = route.params.team || setNewTeam();

    const [modalVisible, setModalVisible] = useState(false);
    const [loadingUpdating, seLoadingUpdate] = useState(false);
    const [allUsers, setAllUsers] = useState([]);
    const [loadingAllUsers, setLoadingUsers] = useState(true)
    const [name, setName] = useState(team.name);
    const [details, setDetails] = useState(team.details);
    const [open, setOpen] = useState(false);
    const [values, setValues] = useState(team.players.map((player) => player._id));
    const [players, setPlayers] = useState([]);


    useEffect(() => {
        getAllUsers().then(allUsers =>
            setAllUsers(allUsers));
    }, [])

    useEffect(() => {
        setPlayers(allUsers.map((User) => {
            const isDisabled = user.userID === User._id;
            return Object({
                label: User.name,
                value: User._id,
                disabled: isDisabled
            })
        }))
    }, [allUsers])


    const handleSubmit = () => {
        setModalVisible(true);
    }

    const confirmUpdate = async () => {
        seLoadingUpdate(true);
        const updatedTeam = new Object({
            name: name,
            details: details,
            players: values
        });
        console.log(updatedTeam);

        await updateTeam(team._id, updatedTeam)
            .then(seLoadingUpdate(false));
        if (navigation.canGoBack()) {
            navigation.goBack();
        }
        // navigation.dispatch(StackActions.popToTop())

    }
    return (
        <View style={{
            flex: 1,
            flexDirection: "column",
            marginTop: 20,
        }}>
            {modalVisible && <ConfirmChangesModal loading={loadingUpdating}
                                                  style={styles.modal} visible={true}
                                                  message={"Are you sure you want to keep changes?"}
                                                  onConfirm={async () => {
                                                      await confirmUpdate();
                                                      setModalVisible(false)
                                                  }
                                                  }
                                                  onCancel={() => setModalVisible(false)}
            />}
            <View>
                <Input value={name} label={"Team name:"} labelStyle={labelStyle} placeholder={`${name}`}
                       onChangeText={newName => setName(newName)}/>
                <Input value={details} label={"Details:"} labelStyle={labelStyle} placeholder={`${details}`}
                       onChangeText={newDetails => setDetails(newDetails)}/>
            </View>

            <View>
                <Text style={styles.label}>Add Players:</Text>
            </View>

            <DropDownPicker multiple={true} value={values} setValue={setValues} items={players} open={open}
                            setOpen={setOpen}/>

            <View style={{alignSelf: 'flex-end'}}>
                <ThemedButton style={{marginHorizontal: 70, marginVertical: 10}} stretch={false}
                              name={"bruce"}
                              type="primary" size={"large"} onPress={handleSubmit}>Submit</ThemedButton>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    modal: {
        margin: 20,
        backgroundColor: 'white',
        height: 50,
        width: 50,
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        }
    },
    label: {
        fontWeight: "bold",
        color: 'black',
        marginLeft: 8,
        marginBottom: 10,
    }
})

export default TeamForm;
