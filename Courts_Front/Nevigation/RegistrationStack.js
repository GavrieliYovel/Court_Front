import {RegisterScreen} from "../views/registerPage";
import {LoginScreen} from "../views/loginPage";

import {createNativeStackNavigator} from "@react-navigation/native-stack";


const Stack = createNativeStackNavigator();
export const RegisterStack = () => {
    return (
        <Stack.Navigator   screenOptions={{headerShown: false}}
                           initialRouteName={"LoginScreen"}>
            <Stack.Screen name={"LoginScreen"} component={LoginScreen} />
            <Stack.Screen name={"RegisterScreen"} component={RegisterScreen}/>
        </Stack.Navigator>)
}


