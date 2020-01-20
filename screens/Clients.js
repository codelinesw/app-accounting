import React from 'react';
import { Text, View ,Dimensions, TouchableOpacity, Image, TextInput, FlatList,ActivityIndicator } from 'react-native';
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
      value:'',
      showing:false,
      expand:true,
      nameicon:'md-arrow-up',
      nameorder:'ASCENDENTE',
      isLoaded:false,
      data_:[''],
      type:JSON.stringify(this.props.navigation.getParam('type', 'TODOS'))
    };
    this._count_ = 0;
    this.isMounted_ = false;
  }

  shouldComponentUpdate(nextProps, nextState){
    if(this.state.data_ !== nextState.data_){
      return true;
    }else{
      false;
    }
  }

  componentDidUpdate(nextProps, nextState){
    if(this.state.data_ !== nextState.data_){
      this.getClients();
    }
  }

  componentDidMount(){
    this.getClients();
    this.isMounted_ = true;
  }

  componentWillUnmount(){
    this.isMounted_ = false;
  }

  onchangetext(text){
    let lenghtText = text.toString();
    if(lenghtText.length > 0){
      this.setState({value:text,showing:true,expand:false});
    }else{
      this.setState({value:text,showing:false,expand:true});
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
              <TouchableOpacity style={styles.btnwgray}>
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
  render(){
    const { fontsLoaded, poppins, poppinsBold, value, showing, expand, nameicon, nameorder } = this.state;
      return(
        <View style={styles.container}>
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
                    value={value}
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
