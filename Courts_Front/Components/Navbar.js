import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {Ionicons, FontAwesome5, FontAwesome, AntDesign } from "@expo/vector-icons";
import {View, Text} from "react-native";
import {User, CourtsLogo, HeaderButtons} from "./Header";
import TeamsListScreen from "./TeamsListScreen";
import TeamsJoinScreen from "./TeamsJoinScreen";

const HeaderOptions = {
    headerTitle : (props) => <CourtsLogo/>,
    headerLeft : (props) =>  <User/>,
    headerRight: (props) => <HeaderButtons/>,
    headerStyle:{ height: 100 },
    headerTitleStyle: { fontWeight: 'bold', alignSelf: 'center', textAlign: 'center', justifyContent: 'center' }
}
const iconMap = {
    Map: (focused, color)=>{
        return(
         <FontAwesome5 name="map-marker-alt" size={24} color={focused ? "black": "grey"} />
    )
    },
    Games: (focused, color)=>{
        return(
            <FontAwesome name="soccer-ball-o" size={24} color={focused ? "black": "grey"} />
        )
    },
    Teams: (focused, color)=>{
        return (
            <AntDesign name="team" size={24} color={focused ? "black": "grey"} />
    )
    },

}
const Tab = createBottomTabNavigator();
const MapScreen = () => {
    return (
        <View>
            <Text>Home Screen</Text>
        </View>
    )
}
const GamesScreen = () => {
    return (
        <View>
            <Text>Games Screen</Text>
        </View>
    )
}
const TeamsScreen = () => {
    return (
        <View>
            <Text>Teams Screen</Text>

        </View>
    )
}



export default function Navbar() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        return iconMap[route.name](focused, color);
                        //
                        // if (route.name === 'Map') {
                        //     iconName = focused
                        //         ? 'ios-information-circle'
                        //         : 'ios-information-circle-outline';
                        // } else if (route.name === 'Settings') {
                        //     iconName = focused ? 'ios-list' : 'ios-list-outline';
                        // }

                        // You can return any component that you like here!
                    },
                    tabBarActiveTintColor: 'black',
                    tabBarInactiveTintColor: 'grey',
                })}
            >
                <Tab.Screen name="Map" children={MapScreen} options={HeaderOptions}/>
                <Tab.Screen name="Games" children={()=><TeamsJoinScreen playerId={'63c6f3353dbfc677bcb2e871'}/>} options={HeaderOptions}/>
                <Tab.Screen name="Teams" children= {() => <TeamsListScreen playerId={'63c6f3353dbfc677bcb2e871'}/>} options={HeaderOptions}/>
            </Tab.Navigator>
        </NavigationContainer>
    );
}
