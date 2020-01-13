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
import ViewClient from '../screens/ViewClient';
import Balances from '../screens/Balances';
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
        backgroundColor: '#f7f7f7',
        overflow:'hidden',
        shadowOpacity: 0,
        elevation:0,  
      },
      labelStyle: {
        textAlign: 'center',
        fontFamily:'Poppins',
      },
      indicatorStyle: {
        marginLeft:30,
        marginRight:30,
        width:60,
        borderBottomColor: '#7EE393',
        borderBottomWidth: 2,
      },
      tabStyle: {
         //width:500,
         
      }
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

      tabStyle: {
         
      }
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
            ),
          headerTitleStyle: {
            fontFamily: "Poppins",
          }
        })
    },

    Clients: {
      screen:TabClients,
      navigationOptions: ({navigation}) => ({
        title:'Clients',
        headerLeft: (
          <ButtonMenu navigation={navigation}/>
        ),
        headerTitleStyle: {
            fontFamily: "Poppins",
        }
      })
    },
    
    ViewClient: {
      screen:ViewClient,
      navigationOptions: ({navigation}) => ({
        title:'Saldos del cliente',
        headerLeft: (
          <ButtonMenu navigation={navigation}/>
        ),
        headerTitleStyle: {
          fontFamily: "Poppins",
        }
      })
    },
    Balances: {
      screen:Balances,
      navigationOptions: ({navigation}) => ({
        title:'Saldos pendientes',
        headerLeft: (
          <ButtonMenu navigation={navigation}/>
        ),
        headerTitleStyle: {
          fontFamily: "Poppins",
        }
      })
    },
   Accounting: {
     screen:TabAccounting,
      navigationOptions: ({navigation}) => ({
        title:'Contabilidad',
        headerLeft: (
          <ButtonMenu navigation={navigation}/>
        ),
        headerTitleStyle: {
          fontFamily: "Poppins",
        }
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
    Clients: {
       screen:Clients,
    },
    ViewClient: {
      screen: ViewClient,
    },
    Balances: {
      screen:Balances,
    },

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
