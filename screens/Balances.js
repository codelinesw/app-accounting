import React from 'react';
import { Text, View ,Dimensions, TouchableOpacity, Image, TextInput, Modal } from 'react-native';
import styles from '../styles/styles_template';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export default class Home extends React.Component{

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
      nameorder:'ASCENDETE',
      modalVisible:false,
    };
    this._count_ = 0;
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
  showModal(){
    this.setState({modalVisible:true});
  }
  Viewmore(){
    this.setState({modalVisible:false});
    this.props.navigation.navigate('ViewClient');
  }
  render(){
    const { fontsLoaded, poppins, poppinsBold, value, showing, expand, nameicon, nameorder, modalVisible } = this.state;
      return(
        <View style={styles.container}>
             <View style={styles.body_}>
             <Modal
             animationType="fade"
             transparent={true}
             visible={modalVisible}
             onRequestClose={() => {
               Alert.alert('Modal has been closed.');
             }}
             >
               <View style={styles.containerModal}>
                 <View style={styles.containerOptions}>
                   <TouchableOpacity style={[styles.btnModal,{fontFamily:'Poppins'}]} onPress={this.Viewmore.bind(this)}><Text style={{fontSize:15,color:'#5c5b5e',fontFamily:'Poppins',}}>Ver más</Text></TouchableOpacity>
                   <TouchableOpacity style={[styles.btnModal,{fontFamily:'Poppins'},styles.btnTopradius]}><Text style={{fontSize:15,color:'#5c5b5e',fontFamily:'Poppins',}}>Reportar</Text></TouchableOpacity>
                 </View>
               </View>
             </Modal>
               <View style={styles.container_filters}>
                   <View style={[styles.bar_show_state_,styles.search_bar,{top:10,}]}>
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
                   <View style={[styles.btnGroup,styles.extandar_width]}>
                     <TouchableOpacity style={[styles.btnwgray,{flexDirection:'row'}]}>
                       <FontAwesome name="sliders" size={20} style={{ color: '#a4a6ac', marginLeft:2, }} />
                       <Text style={[styles.textlight,{fontFamily:"Poppins",}]}>Filtrar</Text>
                     </TouchableOpacity>
                     <TouchableOpacity style={[styles.btnwgray,{flexDirection:'column'}]}>
                       <Text style={[styles.textlight,{position:'relative',top:-2,right:5,fontFamily:"Poppins", fontSize:10,}]}>Desde</Text>
                       <Text style={[styles.title,{position:'relative',top:-6,right:6,fontFamily:"Poppins",fontSize:11,}]}>11 Ene 2020</Text>
                     </TouchableOpacity>
                     <TouchableOpacity style={[styles.btnwgray,{flexDirection:'column'}]}>
                       <Text style={[styles.textlight,{position:'relative',top:-2,right:5,fontFamily:"Poppins", fontSize:10,}]}>Hasta</Text>
                       <Text style={[styles.title,{position:'relative',top:-6,right:6,fontFamily:"Poppins",fontSize:11,}]}>11 Ene 2020</Text>
                     </TouchableOpacity>
                   </View>
               </View>
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
               <View style={styles.bar_show_state_}>
                 <View style={{flexDirection:'row'}}>
                   <View style={[styles.circle,styles.bgroundGreen]}></View>
                   <Text style={[styles.textlight,{fontFamily:"Poppins",fontSize:13,}]}>Controlado</Text>
                 </View>
                 <View style={{flexDirection:'row'}}>
                   <View style={[styles.circle,styles.bgroundYellow]}></View>
                   <Text style={[styles.textlight,{fontFamily:"Poppins",fontSize:13,}]}>Regulado</Text>
                 </View>
                 <View style={{flexDirection:'row'}}>
                   <View style={[styles.circle,styles.bgroundPurpple]}></View>
                   <Text style={[styles.textlight,{fontFamily:"Poppins",fontSize:13,}]}>Abandonado</Text>
                 </View>
               </View>
               <View style={[styles.box_information,styles.borderGreen]}>
                 <Text style={[styles.title,{fontFamily:"Poppins-Bold",}]}>Jhon Denver Murillo Mendez</Text>
                 <Text style={[styles.text,{fontFamily:"Poppins",}]}>Prenda: <Text style={[styles.textlight,{fontFamily:"Poppins",}]}>Jean</Text></Text>
                 <Text style={[styles.text,{fontFamily:"Poppins",}]}>Cantidad: <Text style={[styles.textlight,{fontFamily:"Poppins",}]}>1</Text></Text>
                 <Text style={[styles.text,{fontFamily:"Poppins",}]}>Fecha: <Text style={[styles.textlight,{fontFamily:"Poppins",}]}> 9/01/2019</Text></Text>
                 <Text style={[styles.text,{fontFamily:"Poppins",}]}>Valor: <Text style={[styles.textlight,{fontFamily:"Poppins",}]}>$80.000</Text></Text>
                 <Text style={[styles.text,{fontFamily:"Poppins",}]}>Abono: <Text style={[styles.textlight,{fontFamily:"Poppins",}]}>$10.000</Text></Text>
                 <Text style={[{fontFamily:"Poppins",},styles.bottomRight]}>Saldo: <Text style={[styles.textlight,{fontFamily:"Poppins-Bold",}]}>$70.000</Text></Text>
                 <TouchableOpacity style={[styles.btnfavorites,{width:15,}]} onPress={() => this.showModal()}>
                    <FontAwesome name="ellipsis-v" size={14} style={{ color: '#a4a6ac' }} />
                 </TouchableOpacity>
               </View>
               <View style={[styles.box_information,styles.borderYellow]}>
                 <Text style={[styles.title,{fontFamily:"Poppins-Bold",}]}>Jhon Denver Murillo Mendez</Text>
                 <Text style={[styles.text,{fontFamily:"Poppins",}]}>Prenda: <Text style={[styles.textlight,{fontFamily:"Poppins",}]}>Jean</Text></Text>
                 <Text style={[styles.text,{fontFamily:"Poppins",}]}>Cantidad: <Text style={[styles.textlight,{fontFamily:"Poppins",}]}>1</Text></Text>
                 <Text style={[styles.text,{fontFamily:"Poppins",}]}>Fecha: <Text style={[styles.textlight,{fontFamily:"Poppins",}]}> 9/01/2019</Text></Text>
                 <Text style={[styles.text,{fontFamily:"Poppins",}]}>Valor: <Text style={[styles.textlight,{fontFamily:"Poppins",}]}>$80.000</Text></Text>
                 <Text style={[styles.text,{fontFamily:"Poppins",}]}>Abono: <Text style={[styles.textlight,{fontFamily:"Poppins",}]}>$10.000</Text></Text>
                 <Text style={[{fontFamily:"Poppins",},styles.bottomRight]}>Saldo: <Text style={[styles.textlight,{fontFamily:"Poppins-Bold",}]}>$70.000</Text></Text>
                 <TouchableOpacity style={[styles.btnfavorites,{width:15,}]} onPress={() => this.showModal()}>
                    <FontAwesome name="ellipsis-v" size={14} style={{ color: '#a4a6ac' }} />
                 </TouchableOpacity>
               </View>

             </View>

        </View>
      );
  }
}
