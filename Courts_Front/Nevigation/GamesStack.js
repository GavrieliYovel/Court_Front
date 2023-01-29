
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import GamesHome from "../views/Games";
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
const GamesStack = () => {
    return (
        <Stack.Navigator initialRouteName={"GamesHome"}>
            <Stack.Screen name={"GamesHome"} component={GamesHome} options={headerOptions("My Games")}/>
        </Stack.Navigator>)
}

export default GamesStack;
