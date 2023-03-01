import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Map} from '../views/map'
import {FontAwesome5, FontAwesome, AntDesign } from "@expo/vector-icons";
import {User, CourtsLogo, HeaderButtons} from "./Header";
import TeamStack from "../Nevigation/TeamStack";
import GamesStack from "../Nevigation/GamesStack";
import {GameStack} from "../Nevigation/GameStack";


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

export default function Navbar({navigation}) {

    const HeaderOptions =  {
        headerTitle: (props) => <CourtsLogo/>,
        headerLeft: (props) => <User/>,
        headerRight: (props) => <HeaderButtons navigation={{navigation}}/>,
        headerStyle: {height: 100},
        headerTitleStyle: {fontWeight: 'bold', alignSelf: 'center', textAlign: 'center', justifyContent: 'center'}
    }

    return (
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        return iconMap[route.name](focused, color);
                    },
                    tabBarActiveTintColor: 'black',
                    tabBarInactiveTintColor: 'grey',
                })}
            >
                <Tab.Screen name="Map" component={GameStack} options={HeaderOptions}/>
                <Tab.Screen name="Games" component={GamesStack} options={HeaderOptions}/>
                <Tab.Screen name="Teams" component={TeamStack} options={HeaderOptions}/>
            </Tab.Navigator>
    );
}
