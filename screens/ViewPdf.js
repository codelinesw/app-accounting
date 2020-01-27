import React from 'react';
import { StyleSheet, Dimensions, View } from 'react-native';
 import { WebView } from 'react-native-webview';
import PDFReader from 'rn-pdf-reader-js';
//import { Constants } from 'expo';
 
export default class ViewPdf extends React.Component {
    render() {
        const data = JSON.stringify(this.props.navigation.getParam('c_client_id')).replace(/\"/g,"")+'-'+JSON.stringify(this.props.navigation.getParam('s_sale_id')).replace(/\"/g,"");
        const url = 'https://45ddd3ae.ngrok.io/Back-app-accounting/sales_/view_pdf/'+data; 
        return(
            <View style={{
              flex: 1,
              paddingTop: 10,
              backgroundColor: '#ecf0f1',
            }}>
              <PDFReader
                source={{ uri: url }}
              />
             
           </View>
        )
  }
}
