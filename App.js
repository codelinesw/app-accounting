import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Font from 'expo-font';
import AppContainer from "./navigation/DrawerNavigator";

export default class App extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      fontsLoaded: false,
      poppins:'',
      poppinsBold:'',
    };
    this._count_ = 0;
  }
  componentDidMount() {
    Font.loadAsync({
      'Poppins': require('./assets/fonts/Poppins/Poppins-Light.ttf'),
      'Poppins-Bold': require('./assets/fonts/Poppins/Poppins-Bold.ttf'),
    }).then( () => this.setState( { fontsLoaded: true, poppins:'Poppins', poppinsBold:'Poppins-Bold' } ) );
  }
  render(){
    if(this.state.fontsLoaded){
      return <AppContainer/>
    }else{
      return <Text>Loading</Text>
    }

  }

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
