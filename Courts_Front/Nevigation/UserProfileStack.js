import {UserProfileEdit} from "../Components/UserProfileEdit";
import {UserProfile} from "../Components/UserProfile";

import {createNativeStackNavigator} from "@react-navigation/native-stack";


const Stack = createNativeStackNavigator();
export const UserProfileStack = () => {
    return (
        <Stack.Navigator   screenOptions={{headerShown: false}}
                           initialRouteName={"HeaderButtons"}>
            <Stack.Screen name={"UserProfile"} component={UserProfile} />
            <Stack.Screen name={"UserProfileEdit"} component={UserProfileEdit}/>
        </Stack.Navigator>)
}
