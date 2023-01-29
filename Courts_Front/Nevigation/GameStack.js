import {Map} from "../views/map";
import {GameForm} from "../Components/GameForm";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
const Stack = createNativeStackNavigator();
export const GameStack = () => {
    return (
        <Stack.Navigator   screenOptions={{headerShown: false}}
                           initialRouteName={"Map"}>
            <Stack.Screen name={"Map"} component={Map} />
            <Stack.Screen name={"GameForm"} component={GameForm}/>
                {props => <GameForm {...props}/>}
        </Stack.Navigator>)
}
