import React, {useState} from 'react';
import {View, Text, Modal, StyleSheet, ActivityIndicator} from 'react-native';
import {Fontisto, Foundation} from "@expo/vector-icons";
import ThemedButton from "react-native-really-awesome-button/src/themed/ThemedButton";

const ConfirmChangesModal = ({message, visible, onConfirm, onCancel, loading =false}) => {
    const [isVisible, setIsVisible] = useState(visible);

    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={isVisible}
                onRequestClose={() => {
                    setIsVisible(!isVisible);
                }}
            >
                <View style={styles.modalView}>
                    {!loading &&
                        <View style={styles.container}>
                            <Text style={styles.textStyle}>{message}</Text>
                            <View style={styles.buttonContainer}>
                                <ThemedButton onPress={() => onConfirm()} style={{marginLeft: 20}} raiseLevel={2}
                                              borderRadius={30} activityColor={"darkgreen"} borderColor={"darkgreen"}
                                              backgroundColor={"darkseagreen"} width={60} stretch={false} name={"bruce"}
                                              type="primary" size={"small"}>
                                    <Fontisto name="check" size={20} color="white"/>
                                </ThemedButton>
                                <ThemedButton onPress={() => onCancel()} style={{marginLeft: 20}} raiseLevel={2}
                                              borderRadius={30} activityColor={"darkgreen"} borderColor={"darkgreen"}
                                              backgroundColor={"tomato"} width={60} stretch={false} name={"bruce"}
                                              type="primary" size={"small"}>
                                    <Foundation name="x" size={24} color="white"/>
                                </ThemedButton>
                            </View>
                        </View>}

                    {
                        loading && <ActivityIndicator animating={loading} style={{
                           alignSelf: 'center'
                        }} size={50} color="black"/>
                    }
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        position: "absolute",
        top: 500,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 100,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        height: 200,
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    container: {
      flex: 1,
      alignContent: "center",
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'black',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
    buttonContainer: {
        flex: 1,
        flexDirection: "row",
        marginTop: 50,
        alignContent:'center',
        alignItems: 'center',
        justifyContent: 'space-evenly'
        // marginLeft: 45,
    }
});
export default ConfirmChangesModal;
