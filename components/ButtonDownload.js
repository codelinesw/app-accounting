import React from 'react';
import { StyleSheet, Dimensions, View, TouchableOpacity, ActivityIndicator, } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { WebView } from 'react-native-webview';
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';
import * as Permissions from 'expo-permissions';
 
export default class ButtonDownload extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			isLoading: false
		};
	}	
	downloadFile(){
		const data = JSON.stringify(this.props.navigation.getParam('c_client_id')).replace(/\"/g,"")+'-'+JSON.stringify(this.props.navigation.getParam('s_sale_id')).replace(/\"/g,"");
		const url = 'https://01998da7.ngrok.io/app-accounting/sales_/view_pdf/'+data;
		this.setState({isLoading: true});
	    const uri = url;
    	let fileUri = FileSystem.documentDirectory + "saldos-prueba.pdf";
	    FileSystem.downloadAsync(uri, fileUri)
	    .then(({ uri }) => {
	      this.saveFile(uri);
	    })
	    .catch(error => {
	      console.error(error);
	    })
	}

	saveFile = async (fileUri: string) => {
	    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
	    if (status === "granted") {
	        const asset = await MediaLibrary.createAssetAsync(fileUri)
	        await MediaLibrary.createAlbumAsync("Download", asset, false)
	        this.setState({isLoading: false});
	    }
	}
    render() {
    	const { isLoading } = this.state;
        if(isLoading){
        	return <View style={{position:'relative',right:10,}}><ActivityIndicator size="small" /></View>;
        }else{
        	return(
        		<TouchableOpacity style={{right:10,padding:10,zIndex:10,}} onPress={() => this.downloadFile()}>
               		<Ionicons name="md-download" color="#a4a6ac" size={22} />
           		</TouchableOpacity>
           );
       }
  }
}
