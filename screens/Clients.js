import React from 'react';
import {
  Text,
  View ,
  Dimensions,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
  ActivityIndicator,
  Modal,
  Animated
} from 'react-native';
import styles from '../styles/styles_template';
import { Ionicons } from '@expo/vector-icons';
import ButtonMenu from "../components/ButtonMenu";
import services from "../request/services";
import routes from "../request/routes";
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export default class Clients extends React.Component{

  constructor(props){
    super(props);

    this.state = {
      fontsLoaded: false,
      poppins:'',
      poppinsBold:'',
      s_value:'',
      showing:false,
      expand:true,
      nameicon:'md-arrow-up',
      nameorder:'ASCENDENTE',
      isLoaded:false,
      data_:[''],
      data:[''],
      type:JSON.stringify(this.props.navigation.getParam('type', 'TODOS')),
      modalVisible:false,
      fadeValue: new Animated.Value(0),
		  message_alert: 'Por favor complete los campos vacios.',
      bgalert:'',
      showingPreloader:false,
      c_client_id:0,
    };
    this._count_ = 0;
    this.isMounted_ = false;
    this.arrayholder = [];
  }

  // shouldComponentUpdate(nextProps, nextState){
  //   if(this.state.data_ !== nextState.data_){
  //     return true;
  //   }else{
  //     return false;
  //   }
  // }

  // componentDidUpdate(nextProps, nextState){
  //   if(this.state.data_ !== nextState.data_){
  //     this.getClients();
  //   }
  // }

  componentDidMount(){
    this.getClients();
    this.makeRemoteRequest();
    this.isMounted_ = true;
    
  }

  componentWillUnmount(){
    this.isMounted_ = false;
  }

  _start = () => {

	   const { fadeValue } = this.state;
     Animated.sequence([
           Animated.parallel([
             Animated.timing(fadeValue, {
               toValue: 1,
               duration: 400,
             }),

           ]),
           Animated.delay(2500),
         Animated.parallel([
           Animated.timing(fadeValue, {
             toValue: 0,
             duration: 400,
           }),
         ]),
        ]).start();

  	};

  onchangetext(text){
    text = text.toString();
    if(text.trim().length > 0){
      this.setState({s_value:text,showing:true,expand:false});
      const newData = this.state.data_.filter(item => {
        let itemData = `${item.c_name}`;
        return itemData.indexOf(text) > -1;
      });
      if(JSON.stringify(newData)=='{}'){
        this.getClients();
      }else{
        this.setState({ data_: newData});
      }
    }else{
      this.setState({s_value:text,showing:false,expand:true});
      this.getClients();
    }

  }
  changeOrder(){
    if(this._count_ == 0){
      this.setState({nameicon:'md-arrow-down',nameorder:'DESCENDENTE'});
      this._count_ = 1;
    }else{
      this.setState({nameicon:'md-arrow-up',nameorder:'ASCENDENTE'});
      this._count_ = 0;
    }
  }

  formatDate(date){
    let new_date = String(date).substring(0,String(date).indexOf(" "));
    new_date = new_date.split("-");
    new_date = new_date[2]+'/'+new_date[1]+'/'+new_date[0];
    return new_date;
  }
  getClients(){
    const { type } = this.state;
    const URL = (type.replace(/\"/g,'') == "TODOS") ? routes.clients.list : routes.clients.list_new;
    services.request(URL,type)
    .then(res => res.json())
    .then(res => {
      if(this.isMounted_){
        this.setState({
          isLoaded: true,
          data_:res,
        });
        this.arrayholder = res;
      }
    },
    (error) => {
      this.setState({
        isLoaded: true,
        error
      });
    }).catch(function(error) {
      Alert.alert(
        error.message
      )
     // ADD THIS THROW error
      throw error;
    });
  }

  deleteClients(){
    let data_ = JSON.stringify({
      c_client_id: this.state.c_client_id,
    });
    services.request(routes.clients.delete,data_)
    .then(res => res.text())
    .then(res => {
      if(res == "ok"){
		  	this.setState({message_alert:'Se ha eliminado el cliente correctamente!',bgalert:styles.bgroundGreen});
		  	this._start();
        this.setState({modalVisible:false,c_client_id:0});
		  }else{
		  	this.setState({message_alert:'Ah ocurrido un error al intentar eliminar este cliente',bgalert:styles.bgroundRed});
		  	this._start();
        this.setState({modalVisible:false,c_client_id:0});
		  }
    },
    (error) => {
      this.setState({
        isLoaded: true,
        error
      });
    }).catch(function(error) {
      Alert.alert(
        error.message
      )
     // ADD THIS THROW error
      throw error;
    });
  }

  _renderItems_(item,index){
    let style_ = (index%2) ? styles.bgroundPurpple : styles.bgroundGreen;
    if(item == "" || item == "undefined" || item == null){
      return  (<View style={[styles.container_preloader,{backgroundColor:'transparent'}]}>
        <View style={styles.preloader}><ActivityIndicator size="large" /></View>
      </View>)
    }else{
      if(Object.values(item) == "empty"){
        return (
          <View><Text style={{fontFamily:"Poppins",}}>No hay clientes aún</Text></View>
        )
      }else{
        return(
          <View style={[styles.box_information,styles.expand_box_information]}>
            <View style={{flexDirection:'row'}}>
              <View style={[styles.circle,style_]}></View>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('ViewClient',{c_client_id:item.c_client_id,c_name:item.c_name,c_phone:item.c_phone})}><Text style={[styles.title,{fontFamily:"Poppins-Bold",}]}>{item.c_name}</Text></TouchableOpacity>
            </View>
            <Text style={[styles.textlight,{fontFamily:"Poppins",}]}>(+57) {item.c_phone}</Text>
            <Text style={[styles.textlight,{fontFamily:"Poppins",}]}>Jhon es un cliente que le gusta hacer compras constantemente de jeans</Text>
            <View style={styles.btnGroup}>
              <TouchableOpacity style={styles.btngray} onPress={() => this.props.navigation.navigate('AddClient',{c_client_id:item.c_client_id,c_name:item.c_name,c_address:item.c_address,c_phone:item.c_phone})}>
                <Text style={[styles.textlight,{fontFamily:"Poppins",}]}>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btnwgray} onPress={() => this.showModal(item.c_client_id)}>
                <Text style={[styles.textlight,{fontFamily:"Poppins",}]}>Eliminar</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.btnfavorites}>
               <Ionicons name="md-star" color="#a4a6ac" size={22} />
            </TouchableOpacity>
            <Text style={[styles.textdate,{fontFamily:"Poppins",}]}>{this.formatDate(item.c_date)}</Text>
         </View>
        )
      }

    }
  }

  showModal(id){
    this.setState({modalVisible:true,c_client_id:id});
  }

  hideModal(){
    this.setState({modalVisible:false});
  }
  makeRemoteRequest = () => {    
    const url = 'https://randomuser.me/api/?&results=20';
    fetch(url)      
      .then(res => res.json())      
      .then(res => {        
        this.setState({          
          data: res.results       
        });        
        
       this.arrayholder = res.results;      
     })      
     .catch(error => {        
       this.setState({ data:error });      
     });  
  };

  render(){
    const { fontsLoaded, poppins, poppinsBold, s_value, showing, expand, nameicon, nameorder,modalVisible, bgalert, fadeValue, message_alert, showingPreloader } = this.state;
      return(
        <View style={styles.container}>
            <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
            }}
            >
              <View style={styles.containerModal}>
                <View style={[styles.containerOptions,styles.containerOptionsExpand]}>
                  <Text style={[styles.title,{fontFamily:'Poppins-Bold',right:5,marginTop:4,}]}>¿Deseas Eliminar este Cliente?</Text>
                  <Text style={[{fontFamily:'Poppins',left:5,color:'#a4a6ac'}]}>Recuerda que al aceptar,este cliente y sus registros serán borrados</Text>
                  <View style={styles.containerButton}>
                    <TouchableOpacity style={[styles.btnwground,{fontFamily:'Poppins'}]} onPress={() => this.deleteClients()}><Text style={[{fontSize:12,color:'#5c5b5e',fontFamily:'Poppins-Bold',},styles.textgreen]}>ACEPTAR</Text></TouchableOpacity>
                    <TouchableOpacity style={[styles.btnwground,{fontFamily:'Poppins'}]} onPress={() => this.hideModal()}><Text style={[{fontSize:12,color:'#5c5b5e',fontFamily:'Poppins-Bold',},styles.textgreen]}>CANCELAR</Text></TouchableOpacity>
                  </View>
                </View>
                {
                  showingPreloader ? <View style={[styles.container_preloader,{backgroundColor:'transparent'},styles.containerOptionsExpandPreloader]}>
                    <View style={[styles.preloader,{top:-13}]}><ActivityIndicator size="large" /></View>
                  </View> : null
                }
              </View>
            </Modal>
            <Animated.View style={[styles.toast_bottom,bgalert,{opacity: fadeValue}]}>
              <Text style={[styles.textwhite,{position:'relative',left:7,fontFamily:'Poppins'}]}>{message_alert}</Text>
             </Animated.View>
             <View style={styles.body_}>
               <View style={styles.headerTitle}>
                  <Text style={[styles.textlight,{fontSize:12},{fontFamily:"Poppins",}]}>TODOS</Text>
                  <TouchableOpacity style={styles.buttonorder} onPress={() => this.changeOrder()}>
                    <Text style={[styles.textlight,{fontSize:12},{fontFamily:"Poppins",}]}>{nameorder}</Text>
                    <Ionicons
                      name={nameicon}
                      color="#a4a6ac"
                      size={18}
                      style={styles.iconArrow}
                     />
                   </TouchableOpacity>
               </View>
               <View style={[styles.bar_show_state_,styles.search_bar]}>
                 <Ionicons name="md-search" size={30} color="#a4a6ac" style={{top:1,}}/>
                 <TextInput
                    style={[styles.inputSearch,styles.textsearch,{fontFamily:"Poppins",},expand ? styles.inputExpand : '']}
                    onChangeText={text => this.onchangetext(text)}
                    value={s_value}
                    placeholder="Buscas algo?"
                  />
                  {showing ? <TouchableOpacity style={[styles.btnfavorites,styles.btndeletetext]}>
                    <Ionicons name="md-close" color="#a4a6ac" size={22} />
                 </TouchableOpacity> : null}
               </View>
               <View style={{width:WIDTH,alignItems: 'center'}}>
                 <FlatList
                 contentContainerStyle={{ justifyContent: 'center', alignItems:'center', }}
                  style={{width:WIDTH}}
                  data={this.state.data_}
                  renderItem={({ item,index }) => this._renderItems_(item,index)}
                  keyExtractor={(item,index) => {return index.toString()}}
                />
               </View>
             </View>

        </View>
      );
  }
}
