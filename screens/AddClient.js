import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Button, Alert, Image, ActivityIndicator } from 'react-native';
import { Input } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export default class AddClient extends React.Component{
	constructor(props) {
  	super(props);
  	this.state = { 
      typeIcon: 'md-arrow-up', 
      changeColor: '#c3c3c3',
      name_:'',
      address:'',
      phone:'',
      isactive: false,
      textMessage:'',
      typeMsg: true,
      textBody:'',
      error: null,
      isLoaded: false,
      showing:false,
      ready_:false,
      active:false,
    };
	}

  _onHideUnderlay(tmpMsg,typemsg) {
    this.setState({ isactive: false, textMessage: tmpMsg, typeMsg: typemsg });
  }
  _onShowUnderlay(tmpMsg,typemsg) {
    this.setState({ isactive: true, textMessage: tmpMsg, typeMsg: typemsg });
  }
  getStyles(state_){
    if(state_)
      return styles.success;
    else
      return styles.error;
  }
  someFunction(){

    // fetch('http://localhost:8089/webservicetesting/')
    // .then(res => res.json())
    // .then(res => {
    //   Alert.alert(
    //     res
    //   )
    // });

  }
  showAlert(){
		if(count == 0){
			this.setState({typeIcon: 'md-arrow-down',});
			count++;
		}else{
			this.setState({typeIcon: 'md-arrow-up',});
			count--;
		}
	}

	changeState(){
		if(countTwo == 0){
			this.setState({changeColor: '#c3c3c3',});
			countTwo++;
		}else{
			this.setState({changeColor: '#FFD91C',});
			countTwo--;
		}
	}

  progressStatus(response){
    if (response.status === 200 || response.status === 0) {
        return Promise.resolve(response)
    } else {
        return Promise.reject(new Error(response.statusText))
    }
  }
  validateForm(){

    let { name_, address, phone }  = this.state;

    if(name_ == "" && address == "" && phone){
      this._onShowUnderlay("por favor llene los datos",styles.error);
    }else if(name_ == ""){
      this._onShowUnderlay("complete por favor el nombre",styles.error);
    }else if(address == ""){
      this._onShowUnderlay("complete por favor la direccion",styles.error);
    }else if(phone == ""){
      this._onShowUnderlay("complete por favor el numero",styles.error);
    }else{
      this.setState({ready_:true,active:true});
  
      fetch('https://cdfb345f.ngrok.io/website-testing/borrower/list_info/',{
            method: 'post',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            
        })
        .then(res => res.json())
        .then(res => {
          this.setState({
            textBody:JSON.stringify(res),
            isLoaded: true,
            ready_:false,
            active:false,
          });
          if(this.state.isLoaded)
          {
            if(!this.state.isactive){
              this._onShowUnderlay("Se ha aniadido correctamente un cliente a tu lista",styles.success);
              setTimeout(() => {this._onHideUnderlay()},4000);
            }else{
              this._onShowUnderlay("Se ha aniadido correctamente un cliente a tu lista",styles.success);
              setTimeout(() => {this._onHideUnderlay()},4000);
            }
          }
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        })
        .catch(function(error) {
          Alert.alert(
            error.message
          )
         // ADD THIS THROW error
          throw error;
        });
      
    }

    
  }
	render(){
    const { error, isLoaded, items } = this.state;
		return(
			  <View style={styles.container}>
          <View style={styles.headerTitle}>
              <Text style={styles.text}>Aqui puedes Agregar un nuevo cliente</Text>
          </View>
          <View style={styles.ContainerForm}>
              <View style={styles.head_form}>
                <Text style={styles.title_form}>Agrega un Nuevo cliente</Text>
              </View>
              <View style={styles.Form}>
                <View style={styles.input_group}>
                  <Text style={styles.labelform}>NOMBRE COMPLETO</Text>
                  <Input
                  placeholder='Ingresa el Nombre Completo'
                  inputStyle={{ fontSize:15, }}
                  onChangeText={(name_) => this.setState({name_})}
                  value={this.state.name_}
                  />
                </View>
                <View style={styles.input_group}>
                  <Text style={styles.labelform}>DIRECCIÓN</Text>
                  <Input
                  placeholder='Ingresa la dirección'
                  inputStyle={{ fontSize:15, }}
                  onChangeText={(address) => this.setState({address})}
                  value={this.state.address}
                  />
                </View>
                <View style={styles.input_group}>
                  <Text style={styles.labelform}>TELEFONO</Text>
                  <Input
                  placeholder='Ingresa el telefono'
                  inputStyle={{ fontSize:15, }}
                  onChangeText={(phone) => this.setState({phone})}
                  value={this.state.phone}
                  />
                </View>
                 <Button title='Guardar' loading color={'#ffbd3e'} onPress={() => this.validateForm()} disabled={this.state.active} />
                <Text>{this.state.isLoaded ? this.state.textBody : ''}</Text>
                {this.state.ready_ ?
                  <View style={styles.container_preloader}>
                    <View style={styles.preloader}><ActivityIndicator size="large" /></View>
                  </View> : null
                }
              </View>
          </View>
          <View style={[styles.alert_,this.state.isactive ? this.state.typeMsg : '']}>
            <Text style={styles.textwhite}>{this.state.textMessage}</Text>
          </View>
          
    		</View>
			);
	}
}

const styles = StyleSheet.create({
  container: {
    position:'relative',
    flex: 1,
		width:WIDTH,
    height:HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
  },

	headerTitle:{
		width:WIDTH,
		height:73,
		flexDirection: 'row',
		justifyContent:'space-between',
		alignItems:'center',
		backgroundColor:'#fcfcfc',
		borderBottomColor:'#dedede',
		borderBottomWidth:1,
	},
  text:{
		left:10,
		top:22,
  	fontSize: 13,
		height:23,
		marginBottom:10,
		color:'#c3c3c3',
  },

	bodyContent:{
		width:WIDTH,
		height:(HEIGHT-105),

	},

	button_order: {
		top:30,
    width: 150,
    height: 50,
    right: 5,
    bottom: 30,
		zIndex:12,
		flexDirection:'row',
  },

	text_button:{
		fontSize:13,
		color:'#c3c3c3',
		marginRight:7,
	},

	IconArrow:{
		top:0,
	},

  ContainerForm: {
      position:'relative',
      width:WIDTH,
      height:(HEIGHT-73),
      alignItems:'center',
  },

  title_form:{
    marginTop:15,
    marginBottom:15,
    marginLeft:8,
    textAlign:'left',
    alignItems:'flex-start',
    fontWeight:'bold',
  },

  head_form:{
    width:(WIDTH-55),
    height:55,
    
  },
  Form: {
    position:'relative',
    width:(WIDTH-45),
  },

  button:{
    position:'relative',
    marginTop:10,
    backgroundColor:'green',
    zIndex:0,
  },

  input_group: {
    width:(WIDTH-45),
    marginBottom:15,
  },
  labelform:{
    top:8,
    marginLeft:8,
    fontWeight:'bold',
    color:'#636363',
  },
  alert_: {
    position:'absolute',
    bottom:-100,
    width:WIDTH,
    height:52,
    padding:15,
  },

  success: {
    bottom:0,
    backgroundColor:'#7EE393',
    color:'#ffffff',
  },

  error: {
    bottom:0,
    backgroundColor:'#FF604A',
    color:'#ffffff',
  },
  textwhite:{
    color:'#ffffff',
  },

  bgroundprueba: {
    width:(WIDTH-45),
    height:45,
    padding:10,

  },

  pruebatexto: {
    color:'#ffffff',
  },

  container_preloader: {
    position:'absolute',
    top:0,
    zIndex:2000,
    width:(WIDTH-38),
    height:330,
    backgroundColor:'rgba(255,255,255,0.6)',
    justifyContent:'center',
    alignItems:'center',

  },

  preloader:{
    position:'relative',
    top:-42,
    right:0,
    width:80,
    height:80,
    zIndex:200,
    justifyContent:'center',
    alignItems:'center',
    
  },

  Button: {
    backgroundColor:'blue',
  },
});
