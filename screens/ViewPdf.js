import React from 'react';
import { StyleSheet, Dimensions, View } from 'react-native';
 
import PDFReader from 'rn-pdf-reader-js';
//import { Constants } from 'expo';
 
export default class ViewPdf extends React.Component {
    render() { 
        return(
            <View style={{
    flex: 1,
    paddingTop: 10,
    backgroundColor: '#ecf0f1',
  }}>
              <PDFReader
                source={{ uri: "https://999adb88.ngrok.io/app-accounting/sales_/view_pdf/" }}
              />
           </View>
        )
  }
}
