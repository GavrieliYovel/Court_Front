import {useState, useEffect} from "react";
import {Image, StyleSheet} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import * as Location from 'expo-location';
import {Marker} from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import {CourtModal} from '../Components/courtModal';
import {useIsFocused} from "@react-navigation/native";


export const Map = ({navigation}) => {
    const [courts, setCourts] = useState([]);
    const [location, setLocation] = useState({});
    const [modalVisible, setModalVisible] = useState(false);
    const [markerData, setMarkerData] = useState({});
    const [selectedLocation, setSelectedLocation] = useState(null);
    const isFocused = useIsFocused();

    const getCourtPins = () => {
        fetch("https://courts.onrender.com/courts")
            .then(response => response.json())
            .then(data => {
                setCourts(data);
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
                console.log("found");
                await getCourtPins();
            } catch (error) {
                console.log(error);
            }
        })();

    }, [isFocused]);

    return (
        <MapView
            style={styles.container}
            provider={PROVIDER_GOOGLE}
            region={{
                latitude: location.coords ? location?.coords.latitude : 32.09,
                longitude: location.coords ? location?.coords.longitude : 34.8028,
                latitudeDelta: 0.005,
                longitudeDelta: 0.0005
            }}
            showsUserLocation={true}>
            {  courts ? courts.map((courts, index) => (
                <Marker
                    key={courts?._id}
                    coordinate={{
                        latitude: courts?.location.LAT,
                        longitude: courts?.location.LON
                    }}
                    title={courts.name}
                    description={courts?.scope.join(', ')}
                    onPress={() => {
                        setMarkerData(courts);
                        setModalVisible(true);
                    }}
                >
                    <Image
                        style={styles.imageSize}
                        source={require('../assets/court.png')}
                    />
                    <CourtModal
                        modalVisible={modalVisible}
                        markerData={markerData}
                        onClose={() => setModalVisible(false)}
                        onNavigation={(lat, long) => {
                            if(lat === null) {
                                setSelectedLocation(null)
                            } else {
                                setSelectedLocation( {
                                    latitude: lat,
                                    longitude: long,})}
                            }
                        }
                        nav={selectedLocation}
                        navigation={navigation}
                    />
                </Marker>
            )):[]}

                <MapViewDirections
                    origin={{
                        latitude: location.coords ? location?.coords.latitude : 32.08897,
                        longitude: location.coords ? location?.coords.longitude : 34.81254,
                    }}
                    destination={{
                        latitude: selectedLocation?.latitude,
                        longitude: selectedLocation?.longitude
                    }}
                    apikey={`1`}
                    strokeWidth={5}
                    strokeColor="black"
                />

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

    },
    modalContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        elevation: 5,
    }
});

