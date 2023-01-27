import TeamsJoinScreen from "../Components/TeamsJoinScreen";
import TeamsListScreen from "../Components/TeamsListScreen";
import TeamForm from "../Components/TeamsForm";
import {createNativeStackNavigator} from "@react-navigation/native-stack";

const headerOptions = (title) => {
    return {
        title: `${title || "No title"}`,
        headerTintColor: "white",
        headerStyle: {
            backgroundColor: 'black',
        },
        headerTitleStyle: {

            color: 'white'
        },
        headerTitleAlign: "center",
    }
}

const Stack = createNativeStackNavigator();
const TeamStack = () => {
    return (
        <Stack.Navigator initialRouteName={"PlayerTeams"}>
            <Stack.Screen name={"PlayerTeams"} component={TeamsListScreen} options={headerOptions("My Teams")}/>
            {/*    {(props) => <TeamsListScreen {...props} />}*/}
            {/*</Stack.Screen>*/}
            <Stack.Screen name={"OtherTeams"} component={TeamsJoinScreen}/>
            <Stack.Screen name={"TeamForm"} options={({route}) =>headerOptions(route.params.title)}>
                {(props) => <TeamForm {...props} />}
            </Stack.Screen>
        </Stack.Navigator>)
}

export default TeamStack;
