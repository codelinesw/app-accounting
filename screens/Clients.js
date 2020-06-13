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
  Animated,
  RefreshControl
} from 'react-native';
import styles from '../styles/styles_template';
import { Ionicons } from '@expo/vector-icons';
import ButtonMenu from "../components/ButtonMenu";
import services from "../request/services";
import routes from "../request/routes";
import { connect } from 'react-redux';
import {
  getClients,
  getSelectedClientId,
  setClientId,
  deleteClientId
} from '../src/actions'

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

class Clients extends React.Component{

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
      indexItem:0
    };
    this._count_ = 0;
    this.isMounted_ = false;
    this.arrayholder = [];
  }

  componentDidMount(){
    this.getClients();
    //this.makeRemoteRequest();
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
      const newData = this.props.clients.data.filter(item => {
        let itemData = `${item.c_name}`;
        return itemData.indexOf(text) > -1;
      });
      if(JSON.stringify(newData)=='{}'){
        this.getClients();
      }else{
        this.props.setClientId(newData);
      }
    }else{
      this.setState({s_value:text,showing:false,expand:true});
      this.getClients();
    }

  }

  clearInputSearch(){
    this.setState({s_value:'',showing:false,expand:true});
    this.getClients();
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
    this.setState({isLoaded:true});
    services.requestGet(URL,type)
    .then(res => {
      //alert(res);
      if(this.isMounted_){
        //this.setState({data_:res});
        this.props.getClients(res);
        this.arrayholder = res;
      }
    },
    (error) => {
      this.setState({
        //isLoaded: false,
        error
      });
    }).finally(() => {
      this.setState({isLoaded:false})
    }).catch(function(error) {
      alert(
        error.message
      );

     // ADD THIS THROW error
      throw error;
    });
  }

  deleteClients(){
    let data_ = JSON.stringify({
      c_client_id: this.state.c_client_id,
    });
    services.requestSet(routes.clients.delete,data_)
    .then(res => {
      if(res == "ok"){
		  	this.setState({message_alert:'Se ha eliminado el cliente correctamente!',bgalert:styles.bgroundGreen});
        this.props.deleteClientId(this.state.indexItem);
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
        isLoaded: false,
        error
      });
    }).catch(function(error) {
      alert(
        error.message
      )
     // ADD THIS THROW error
      throw error;
    });
  }

  handleAddClient = (selectedId,data,indexItem)=>{
    this.props.getSelectedClientId(indexItem);
    this.props.navigation.navigate('AddClient',data);
  }

  _renderItems_(item,index){
    //alert(JSON.stringify(item));
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
        //index > (this.state.data.length-2)
        return(
          <View style={[styles.box_information,styles.expand_box_information]}>
            <View style={{flexDirection:'row'}}>
              <View style={[styles.circle,style_]}></View>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('ViewClient',{c_client_id:item.c_client_id,c_name:item.c_name,c_phone:item.c_phone})}><Text style={[styles.title,{fontFamily:"Poppins-Bold",}]}>{item.c_name}</Text></TouchableOpacity>
            </View>
            <Text style={[styles.textlight,{fontFamily:"Poppins",}]}>(+57) {item.c_phone}</Text>
            <Text style={[styles.textlight,{fontFamily:"Poppins",}]}>{item.c_name.substring(0,item.c_name.indexOf(" "))} es un cliente que le gusta hacer compras constantemente de jeans</Text>
            <View style={styles.btnGroup}>
              <TouchableOpacity style={styles.btngray} onPress={() => this.handleAddClient(item.c_client_id,{c_client_id:item.c_client_id,c_name:item.c_name,c_phone:item.c_phone,c_address:item.c_address,c_date:item.c_date},index)}>
                <Text style={[styles.textlight]}>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btnwgray} onPress={() => this.showModal(item.c_client_id,index)}>
                <Text style={[styles.textlight]}>Eliminar</Text>
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

  showModal(id,indexItem_){
    this.setState({modalVisible:true,c_client_id:id,indexItem:indexItem_});
  }

  hideModal(){
    this.setState({modalVisible:false});
  }

  onRefresh() {
    //Clear old data of the list
    this.setState({ data_: [] });
    //Call the Service to get the latest data
    this.getClients();
  }

  render(){
    //alert(JSON.stringify(this.props));
    const { fontsLoaded, poppins, poppinsBold, s_value, showing, expand, nameicon, nameorder,modalVisible, bgalert, fadeValue, message_alert, showingPreloader, isLoaded } = this.state;
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
                    onChangeText={(text) => this.onchangetext(text)}
                    value={s_value}
                    placeholder="Buscas algo?"
                  />
                  {showing ? <TouchableOpacity style={[styles.btnfavorites,styles.btndeletetext]} onPress={() => this.clearInputSearch()}>
                    <Ionicons name="md-close" color="#a4a6ac" size={22} />
                 </TouchableOpacity> : null}
               </View>
               <View style={{width:WIDTH,alignItems: 'center'}}>
                 <FlatList
                 contentContainerStyle={{ justifyContent: 'center', alignItems:'center' ,paddingBottom:60}}
                  style={{width:WIDTH}}
                  data={this.props.clients.data}
                  renderItem={({ item,index }) => this._renderItems_(item,index)}
                  keyExtractor={(item,index) => {return index.toString()}}
                  refreshing={isLoaded}
                  onRefresh={this.getClients}
                  refreshControl={
                    <RefreshControl
                      //refresh control used for the Pull to Refresh
                      refreshing={isLoaded}
                      onRefresh={this.onRefresh.bind(this)}
                    />
                  }
                />
               </View>
             </View>

        </View>
      );
  }
}

const mapStateToProps = state => {
  return {
    clients: state.data
  }
}

const mapDispatchToProps = {
  getClients,
  getSelectedClientId,
  setClientId,
  deleteClientId
};

export default connect( mapStateToProps , mapDispatchToProps )(Clients)
