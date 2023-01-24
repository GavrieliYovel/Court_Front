import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import TestScreen1 from '../Screens/testScreen1'
import testScreen2 from '../Screens/testScreen2'

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

import DrawerItems from "./DrawerItems";


const Drawer = createDrawerNavigator();

export default function Navbar() {
    return (
        <NavigationContainer>
            <Drawer.Navigator
                drawerType="front"
                initialRouteName="Profile"
                screenOptionsw={{
                    activeTintColor: '#e91e63',
                    itemStyle: { marginVertical: 10 },
                }}

            >
                {
                    DrawerItems.map(drawer=> <Drawer.Screen
                        key={drawer.name} name={drawer.name} component={TestScreen1}
                    />)
                }
            </Drawer.Navigator>
        </NavigationContainer>
    );
}
