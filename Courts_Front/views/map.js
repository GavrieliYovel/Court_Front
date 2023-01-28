import { StatusBar } from 'expo-status-bar';
import {useState, useEffect} from "react";
import {Image, StyleSheet, Text, View, Modal, TouchableOpacity, Dimensions, Card, Button} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import * as Location from 'expo-location';
import {Marker} from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
import {CourtModal} from '../Components/courtModal';
import {useIsFocused} from "@react-navigation/native";

export const Map = ({navigation}) => {
    const [courts, setCourts] = useState([]);
    const [location, setLocation] = useState({});
    const [modalVisible, setModalVisible] = useState(false);
    const [markerData, setMarkerData] = useState({});
    const [selectedLocation, setSelectedLocation] = useState({});
    const isFocused = useIsFocused();

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
                latitude: location.coords ? location.coords.latitude : 32.08897,
                longitude: location.coords ? location.coords.longitude : 34.81254,
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
                        navigation={navigation}
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

// <Modal
//     animationType="slide"
//     transparent={false}
//     visible={modalVisible}
//     onRequestClose={() => setModalVisible(false)}
// >
//     <View style={styles?.modalContainer}>
//         <Text>Court Name: {markerData?.name}</Text>
//         <Text>City: {markerData?.city}</Text>
//         <Text>Scope: {markerData?.scope?.join(" ")}</Text>
//         <TouchableOpacity onPress={() => setModalVisible(false)}>
//             <Text>Close</Text>
//         </TouchableOpacity>
//     </View>
// </Modal>


