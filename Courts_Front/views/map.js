import { StatusBar } from 'expo-status-bar';
import {useState, useEffect} from "react";
import {Image, StyleSheet, Text, View} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import * as Location from 'expo-location';
import {Marker} from "react-native-maps";


export const Map = () => {
    const [courts, setCourts] = useState([]);
    const [location, setLocation] = useState({});
    const getCourtPins = () => {
        fetch("https://courts.onrender.com/courts")
            .then(response => response.json())
            .then(data => {
                setCourts(data);
                console.log(courts);
            })
            .catch(err => console.error(err));
    }

    useEffect(() => {
        (async () => {
            try {
                let { status } = await Location.requestForegroundPermissionsAsync();
                if (status !== 'granted') {
                    console.log('Permission to access location was denied');
                }

                let position = await Location.getCurrentPositionAsync({});
                setLocation(position);
                console.log("found")
            } catch (error) {
                console.log(error);
            }
        })();
        getCourtPins()
    }, []);

    return (
        <MapView
            style={styles.container}
            provider={PROVIDER_GOOGLE}
            region={{
                latitude: location.coords ? location.coords.latitude : 32.08897,
                longitude: location.coords ? location.coords.longitude : 34.81254,
                latitudeDelta: 0.005,
                longitudeDelta: 0.0005
            }}
            showsUserLocation={true}>
            {  courts ? courts.map((courts, index) => (
                <Marker
                    coordinate={{
                        latitude: courts.location.LAT,
                        longitude: courts.location.LON
                    }}
                    title={courts.name}
                    description={courts.scope.join(' ')}
                    // onPress={onPinPress}
                >
                    <Image
                        style={styles.imageSize}
                        source={require('../assets/court.png')}
                    />
                </Marker>
            )):[]}
        </MapView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    imageSize: {
        width:35,
        height:35

    }
});




