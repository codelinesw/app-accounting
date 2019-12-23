import React from 'react';
import { StyleSheet, Platform , Dimensions} from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';


import ButtonBack from "../components/ButtonBack";
import SearchButton from "../components/SearchButton";
import ButtonMenu from "../components/ButtonMenu";
import Home from "../screens/Home";
import AddClient from "../screens/AddClient";
import Clients from '../screens/Clients';
import Accounting from '../screens/Accounting';
import Messages from '../screens/Messages';
import MenuOptions from "./MenuOptions";

const WIDTH = Dimensions.get('window').width;

const TabClients = createMaterialTopTabNavigator(
  {
    TODOS: { screen: Clients },
    RECIENTES: {screen: Accounting},
    ANTIGUOS: {screen: Accounting},
  },
  {
    tabBarPosition: 'top',
    swipeEnabled: true,
    animationEnabled: true,
    tabBarOptions: {
      activeTintColor: '#333',
      inactiveTintColor: '#d3d3d3',
      style: {
        backgroundColor: '#ffffff',
        overflow:'hidden',
      },
      labelStyle: {
        textAlign: 'center',
      },
      indicatorStyle: {
        borderBottomColor: '#7EE393',
        borderBottomWidth: 2,
      },
    },
  }
);


const TabAccounting = createMaterialTopTabNavigator(
  {
    INGRESOS: { screen: Accounting},
    GASTOS: {screen: Accounting},
  },
  {
    tabBarPosition: 'top',
    swipeEnabled: true,
    animationEnabled: true,
    tabBarOptions: {
      activeTintColor: '#333',
      inactiveTintColor: '#d3d3d3',
      style: {
        backgroundColor: '#ffffff',
        overflow:'hidden',
      },
      labelStyle: {
        textAlign: 'center',
      },
      indicatorStyle: {
        borderBottomColor: '#7EE393',
        borderBottomWidth: 2,
      },
    },
  }
);
const RootStack = createStackNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: ({navigation}) => ({
          title:'Inicio',
          headerLeft: (
            <ButtonMenu navigation={navigation}/>
            )
        })
    },
    Accounting: {
      screen: TabAccounting,
      navigationOptions: ({navigation}) => ({
          title:'Contabilidad',
          headerLeft: (
            <ButtonMenu navigation={navigation}/>
            )
        })
    },
    AddClient: {
      screen: AddClient,
      navigationOptions: ({navigation}) => ({
          title:'Clientes',
          headerLeft: (
            <ButtonBack navigation={navigation}/>
          ),
          headerStyle: {
            backgroundColor:'#ffbd3e',
          },
          headerTitleStyle: {
            color:'#ffffff',
          },
        })
    },
    Clients: {
      screen: TabClients,
      navigationOptions: ({navigation}) => ({
          title:'Clientes',
          headerLeft: (
            <ButtonMenu navigation={navigation}/>
            ),
          headerRight: (
            <SearchButton navigation={navigation} color='#838383'/>
          ),
        })
    },

    Messages: {
      screen: Messages,
      navigationOptions: ({navigation}) => ({
          title:'Bandeja de Entrada',
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
    AddClient:{
        screen:AddClient,
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

const styles = StyleSheet.create({
  avatar_red:{
    backgroundColor:'#F75C3B',
  },
  
  avatar_green: {
    backgroundColor:'#78e88d',
  },
})

//const AppContainer = createAppContainer(RootStack);
const AppContainer = createAppContainer(DrawerNavigator);
export default AppContainer;
