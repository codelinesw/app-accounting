import React from 'react';
import { Platform , Dimensions} from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createStackNavigator } from 'react-navigation-stack';

import ButtonMenu from "../components/ButtonMenu";
import Home from "../screens/Home";
import Clients from '../screens/Clients';
import Accounting from '../screens/Accounting';
import Messages from '../screens/Messages';
import MenuOptions from "./MenuOptions";

const WIDTH = Dimensions.get('window').width;


const RootStack = createStackNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: ({navigation}) => ({
          title:'Home View',
          headerLeft: (
            <ButtonMenu navigation={navigation}/>
            )
        })
    },
    Accounting: {
      screen: Accounting,
      navigationOptions: ({navigation}) => ({
          title:'Accounting View',
          headerLeft: (
            <ButtonMenu navigation={navigation}/>
            )
        })
    },
    Clients: {
      screen: Clients,
      navigationOptions: ({navigation}) => ({
          title:'Clients View',
          headerLeft: (
            <ButtonMenu navigation={navigation}/>
            )
        })
    },
    Messages: {
      screen: Messages,
      navigationOptions: ({navigation}) => ({
          title:'Messages View',
          headerLeft: (
            <ButtonMenu navigation={navigation}/>
            )
        })
    },

  },

);



const DrawerConfig = {
  drawerWidth: WIDTH*0.83,
  contentComponent: ({ navigation }) => {
    return(<MenuOptions navigation={navigation}/>)
  }
}

const DrawerNavigator = createDrawerNavigator(
	{
		Home: {
      screen:RootStack,
    },
    Accounting:{
      screen:Accounting,
    },
    Clients:{
      screen:Clients,
    },
    Messages:{
      screen:Messages,
    }
		
	},

	DrawerConfig
);


//const AppContainer = createAppContainer(RootStack);
const AppContainer = createAppContainer(DrawerNavigator);
export default AppContainer;