import React from 'react';
import { View, Text, Image } from 'react-native';

const Header = ({ user }) => {
    return (
        <View style={styles.headerContainer}>
            <Image source={require('../assets/userIcn.png')} style={styles.profilePicture} />
            <Text style={styles.name}>{`Pe'er`}</Text>
        </View>
    );
};

const styles = {
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        backgroundColor: '#f8f8f8',
    },
    profilePicture: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 15,
    },
    name: {
        fontWeight: 'bold',
        fontSize: 18,
    },
};

export default Header;
