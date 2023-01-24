import {createDrawerNavigator} from "@react-navigation/drawer";
import { createAppContainer, createStackNavigator } from 'react-navigation'
import TestScreen1 from "../Screens/testScreen1";
import TestScreen2 from "../Screens/testScreen2";


const RootDrawerNavigator = createDrawerNavigator({
    Test1:{
        screen: TestScreen1,
    },
    Test2:{
        screen: TestScreen2,
    }

});

export default createAppContainer(RootDrawerNavigator);

