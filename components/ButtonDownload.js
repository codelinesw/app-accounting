import React from 'react';
import { StyleSheet, Dimensions, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { WebView } from 'react-native-webview';
//import { Constants } from 'expo';
 
export default class ButtonDownload extends React.Component {
    render() { 
        return(
            <TouchableOpacity style={{right:10,padding:10,zIndex:10,}} onPress={() => this.props.navigation.navigate('DownloadFile')}>
               <Ionicons name="md-download" color="#a4a6ac" size={22} />
           </TouchableOpacity>
        );
  }
}
