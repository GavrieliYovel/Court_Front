import {UserProfileEdit} from "../Components/UserProfileEdit";
import {UserProfile} from "../Components/UserProfile";

import {createNativeStackNavigator} from "@react-navigation/native-stack";


const Stack = createNativeStackNavigator();
export const UserProfileStack = () => {
    return (
        <Stack.Navigator   screenOptions={{headerShown: true}}
                           initialRouteName={"HeaderButtons"}>
            <Stack.Screen name={"UserProfile"} component={UserProfile} options={{headerTitle: "User Profile"}} />
            <Stack.Screen name={"UserProfileEdit"} component={UserProfileEdit} options={{headerTitle: "Edit User Profile"}}/>
        </Stack.Navigator>)
}
