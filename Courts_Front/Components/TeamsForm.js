import React, {useEffect, useState} from 'react';
import {View, Text, ScrollView} from 'react-native';
import {Input} from 'react-native-elements';
import {StyleSheet} from "react-native";
import {ThemedButton} from "react-native-really-awesome-button";
import ConfirmChangesModal from "./ConfirmChangesModal";
import updateTeam from "../Fetches/updateTeam";
import getAllUsers from "../Fetches/getAllUsers";
import DropDownPicker from 'react-native-dropdown-picker';
import {useSelector} from "react-redux";
import {selectUser} from "../features/userSlice";
import createTeam from "../Fetches/createTeam";

const teamDefault = (playerId) => {
    return Object({
        _id: null,
        name: null,
        players: [{_id: playerId}],
        details: null
    })
}

const labelStyle = StyleSheet.create({
    fontWeight: "bold",
    color: "black"
})

const TeamForm = ({navigation, route}) => {
    const user = useSelector(selectUser);
    const team = route.params.team || teamDefault(user.userID);
    const [newTeam, setNewTeam] = useState(!route.params.team)
    const [modalVisible, setModalVisible] = useState(false);
    const [loadingUpdating, setLoadingUpdate] = useState(false);
    const [allUsers, setAllUsers] = useState([]);
    const [name, setName] = useState(team.name);
    const [details, setDetails] = useState(team.details);
    const [open, setOpen] = useState(false);
    const [values, setValues] = useState(team.players.map((player) => player._id));
    const [players, setPlayers] = useState([]);


    DropDownPicker.setMode("BADGE");

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

    const confirmSave = async () => {
        setLoadingUpdate(true);
        const newTeam = new Object({
            name: name,
            details: details,
            players: values
        })
        createTeam(newTeam).then(navigation.goBack());

    }
    const confirmUpdate = async () => {
        setLoadingUpdate(true);
        const updatedTeam = new Object({
            name: name,
            details: details,
            players: values
        });

        await updateTeam(team._id, updatedTeam)
            .then(setLoadingUpdate(false));
        if (navigation.canGoBack()) {
            navigation.goBack();
        }
        // navigation.dispatch(StackActions.popToTop())

    }
    return (
        <ScrollView style={{
            flex: 1,
            flexDirection: "column",
            marginTop: 20,
        }}>
            {modalVisible && <ConfirmChangesModal loading={loadingUpdating}
                                                  style={styles.modal} visible={true}
                                                  message={"Are you sure you want to keep changes?"}
                                                  onConfirm={newTeam ?
                                                      async () =>{
                                                       await confirmSave()
                                                          setModalVisible(false)
                                                      } :
                                                      async () => {
                                                          await confirmUpdate();
                                                          setModalVisible(false)
                                                      }
                                                  }
                                                  onCancel={() => setModalVisible(false)}
            />}
            <View>
                <Input value={name} label={"Team name:"} labelStyle={labelStyle} placeholder={`${name ? name : "New team name"}`}
                       onChangeText={newName => setName(newName)}/>
                <Input value={details} label={"Details:"} labelStyle={labelStyle} placeholder={`${details ? details : "New team details"}`}
                       onChangeText={newDetails => setDetails(newDetails)}/>
            </View>

            <View>
                <Text style={styles.label}>Add Players:</Text>
            </View>

            <DropDownPicker placeholder={'Choose player'} multiple={true} value={values} setValue={setValues}
                            items={players} open={open}
                            setOpen={setOpen} extendableBadgeContainer={true}
                            badgeDotColors={["red", "orange", "yellow", "green", "blue", "purple"]}/>

            <View  style={styles.buttonContainer} >
                <ThemedButton style={{marginHorizontal: 70, marginVertical: 10}} stretch={false}
                              name={"bruce"}
                              type="primary" size={"large"} onPress={handleSubmit}>Submit</ThemedButton>
            </View>
        </ScrollView>
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
    },
    buttonContainer: {
        marginTop: 100
    }
})

export default TeamForm;
