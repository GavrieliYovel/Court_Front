import React, { useState } from 'react';
import { View, Text, Modal, Button } from 'react-native';

const ConfirmChangesModal = (visible = true, onConfirm, onCancel ) => {
    const [isVisible, setIsVisible] = useState(visible);

    return (
        <Modal animationType="slide"
               transparent={false}
               visible={isVisible}
               onRequestClose={() => {
                   setIsVisible(!isVisible);}}
        style={{
                margin: 20,
                backgroundColor: 'white',
                borderRadius: 20,
                padding: 35,
                alignItems: 'center',
                shadowColor: '#000',
                shadowOffset: {
                    width: 0,
                    height: 2,
                }}}>
            <View>
                <Text>Are you sure you want to save the changes?</Text>
                <View>
                    <Button title="Confirm" onPress={() => onConfirm()} />
                    <Button title="Cancel" onPress={() => onCancel()} />
                </View>
            </View>
        </Modal>
    );
};

export default ConfirmChangesModal;
