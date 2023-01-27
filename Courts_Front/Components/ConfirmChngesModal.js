import React, {useState} from 'react';
import {View, Text, Modal, Button} from 'react-native';

const ConfirmChangesModal = ({style, visible, onConfirm, onCancel}) => {
    const [isVisible, setIsVisible] = useState(visible);

    return (
        <Modal
            style={style}
            animationType="slide"
            transparent={false}
            visible={isVisible}
            onRequestClose={() => {
                setIsVisible(!isVisible);
            }}
        >
            <View>
                <Text>Are you sure you want to save the changes?</Text>
                <View>
                    <Button title="Confirm" onPress={() => onConfirm()}/>
                    <Button title="Cancel" onPress={() => onCancel()}/>
                </View>
            </View>
        </Modal>
    );
};

export default ConfirmChangesModal;
