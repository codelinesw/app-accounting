import React from 'react';
import {  Platform , Dimensions } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import styles from '../styles/styles_template';

import ButtonBack from "../components/ButtonBack";
import SearchButton from "../components/SearchButton";
import ButtonMenu from "../components/ButtonMenu";
import ButtonAdd from "../components/ButtonAdd";
import ButtonDelete from "../components/ButtonDelete";
import ButtonDownload from "../components/ButtonDownload";
import DownloadFile from "../screens/DownloadFile";
import Home from "../screens/Home";
import AddClient from "../screens/AddClient";
import AddSales from "../screens/AddSales";
import Clients from '../screens/Clients';
import Accounting from '../screens/Accounting';
import Messages from '../screens/Messages';
import ViewClient from '../screens/ViewClient';
import AddBalances from '../screens/AddBalances';
import Balances from '../screens/Balances';
import Balancedetails from '../screens/Balancedetails';
import ViewPdf from '../screens/ViewPdf';
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

    AddClient: {
      screen:AddClient,
      navigationOptions: ({ navigation }) => ({
        title:'Agrega un cliente',
      })
    },
    Clients: {
      screen:TabClients,
      navigationOptions: ({navigation}) => ({
          title:'Clientes',
          headerLeft: (
            <ButtonMenu navigation={navigation} />
          ),
          headerRight: (
            <ButtonAdd typeButton="addclients" navigation={navigation} />
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
        headerRight: (
          <ButtonAdd typeButton="addsales" navigation={navigation} />
        ),
        headerTitleStyle: {
          fontFamily: "Poppins",
        }
      })
    },
    AddBalances : {
      screen: AddBalances,
      navigationOptions: ({ navigation }) => ({
        title:'Agrega un nuevo Saldo',
      })
    },
    Balances: {
      screen:Balances,
      navigationOptions: ({navigation}) => ({
        title:'Saldos pendientes',
        headerLeft: (
          <ButtonMenu navigation={navigation}/>
        ),
        headerRight: (
          <ButtonAdd typeButton="AddBalances" navigation={navigation} />
        ),
        headerTitleStyle: {
          fontFamily: "Poppins",
        }
      })
    },

    Balancedetails: {
      screen:Balancedetails,
      navigationOptions: ({ navigation }) => ({
        title:'Volver',
        headerStyle: {
          shadowOpacity: 0,
          elevation:0,
          backgroundColor:"#59f090",
        },
        headerTitleStyle: {
            fontSize: 16,
            fontFamily:"Poppins",
            color:'#ffffff',
            right:20,
            top:2,
        },
        headerRight: (
         <ButtonDelete navigation={navigation} />
        ),
      }),
      
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

   AddSales: {
     screen:AddSales,
     navigationOptions: ({ navigation }) => ({
       title:'Agrega una nueva Venta',
     })
   },
   ViewPdf: {
     screen:ViewPdf,

     navigationOptions: ({ navigation }) => ({
       title:'Vista previa',
       headerTitleStyle: {
            fontSize: 16,
            fontFamily:"Poppins",
            top:2,
        },
       headerRight: (
         <ButtonDownload navigation={navigation} />
       )
     })
   },
   DownloadFile: {
     screen:DownloadFile,
   }

  },

);



const DrawerConfig = {
  drawerWidth: WIDTH*0.83,
  contentComponent: ({ navigation }) => {
    return(<MenuOptions navigation={navigation}/>)
  },
  contentOptions: {
    labelStyle:{
      fontFamily:'Poppins',
    }
  },
}

const DrawerNavigator = createDrawerNavigator(
  {
    Home: {
      screen:RootStack,
      navigationOptions: {
        drawerLabel: () => null,
      },
    },
    AddClient: {
      screen:AddClient,
      navigationOptions: {
        drawerLabel: () => null,
      },
    },
    Clients: {
       screen:Clients,
       navigationOptions: {
      drawerLabel: () => null,
      },
    },
    ViewClient: {
      screen: ViewClient,
      navigationOptions: {
      drawerLabel: () => null,
      },
    },
    Balances: {
      screen:Balances,
      navigationOptions: {
      drawerLabel: () => null,
      },
    },
    AddSales: {
      screen:AddSales,
      navigationOptions: {
      drawerLabel: () => null,
      },
    },
    Balancedetails: {
      screen: Balancedetails
    },
    ViewPdf: {
     screen:ViewPdf,
   },
   DownloadFile: {
     screen:DownloadFile,
   }

  },

  DrawerConfig
);


//const AppContainer = createAppContainer(RootStack);
const AppContainer = createAppContainer(DrawerNavigator);
export default AppContainer;
