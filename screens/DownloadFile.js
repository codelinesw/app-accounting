import  React from 'react';
import { WebView } from 'react-native-webview';

export default class DownloadFile extends React.Component {
  render() {
    return <WebView source={{ uri: 'https://999adb88.ngrok.io/app-accounting/sales_/download_file/' }} style={{ marginTop: 20 }} />;
  }
}