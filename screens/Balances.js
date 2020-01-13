import React from 'react';
import { Text, View ,Dimensions, TouchableOpacity, Image, TextInput } from 'react-native';
import styles from '../styles/styles_template';
import * as Font from 'expo-font';
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
      nameorder:'ASCENDETE'
    };
    this._count_ = 0;
  }

  componentDidMount() {
    Font.loadAsync({
      'Poppins': require('../assets/fonts/Poppins/Poppins-Light.ttf'),
      'Poppins-Bold': require('../assets/fonts/Poppins/Poppins-Bold.ttf'),
    }).then( () => this.setState( { fontsLoaded: true, poppins:'Poppins', poppinsBold:'Poppins-Bold' } ) );
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

  render(){
    const { fontsLoaded, poppins, poppinsBold, value, showing, expand, nameicon, nameorder } = this.state;

    if(fontsLoaded){
      return(
        <View style={styles.container}>
             
             <View style={styles.body_}>
               <View style={styles.container_filters}>
                   <View style={[styles.bar_show_state_,styles.search_bar,{top:10,}]}>
                     <Ionicons name="md-search" size={30} color="#a4a6ac" style={{top:1,}}/>
                     <TextInput
                        style={[styles.inputSearch,styles.textsearch,{fontFamily:poppins,},expand ? styles.inputExpand : '']}
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
                       <Text style={[styles.textlight,{fontFamily:poppins,}]}>Filtrar</Text>
                     </TouchableOpacity>
                     <TouchableOpacity style={[styles.btnwgray,{flexDirection:'column'}]}>
                       <Text style={[styles.textlight,{position:'relative',top:-2,right:5,fontFamily:poppins, fontSize:10,}]}>Desde</Text>
                       <Text style={[styles.title,{position:'relative',top:-6,right:6,fontFamily:poppins,fontSize:11,}]}>11 Ene 2020</Text>
                     </TouchableOpacity>
                     <TouchableOpacity style={[styles.btnwgray,{flexDirection:'column'}]}>
                       <Text style={[styles.textlight,{position:'relative',top:-2,right:5,fontFamily:poppins, fontSize:10,}]}>Hasta</Text>
                       <Text style={[styles.title,{position:'relative',top:-6,right:6,fontFamily:poppins,fontSize:11,}]}>11 Ene 2020</Text>
                     </TouchableOpacity> 
                   </View>
               </View>
               <View style={styles.headerTitle}>
                  <Text style={[styles.textlight,{fontSize:12},{fontFamily:poppins,}]}>TODOS</Text>
                  <TouchableOpacity style={styles.buttonorder} onPress={() => this.changeOrder()}>
                    <Text style={[styles.textlight,{fontSize:12},{fontFamily:poppins,}]}>{nameorder}</Text>
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
                   <Text style={[styles.textlight,{fontFamily:poppins,fontSize:13,}]}>Controlado</Text>
                 </View>
                 <View style={{flexDirection:'row'}}>
                   <View style={[styles.circle,styles.bgroundYellow]}></View>
                   <Text style={[styles.textlight,{fontFamily:poppins,fontSize:13,}]}>Regulado</Text>
                 </View>
                 <View style={{flexDirection:'row'}}>
                   <View style={[styles.circle,styles.bgroundPurpple]}></View>
                   <Text style={[styles.textlight,{fontFamily:poppins,fontSize:13,}]}>Abandonado</Text>
                 </View>
               </View>
               <View style={[styles.box_information,styles.borderGreen]}>
                 <Text style={[styles.title,{fontFamily:poppinsBold,}]}>Jhon Denver Murillo Mendez</Text>
                 <Text style={[styles.text,{fontFamily:poppins,}]}>Prenda: <Text style={[styles.textlight,{fontFamily:poppins,}]}>Jean</Text></Text>
                 <Text style={[styles.text,{fontFamily:poppins,}]}>Cantidad: <Text style={[styles.textlight,{fontFamily:poppins,}]}>1</Text></Text>
                 <Text style={[styles.text,{fontFamily:poppins,}]}>Fecha: <Text style={[styles.textlight,{fontFamily:poppins,}]}> 9/01/2019</Text></Text>
                 <Text style={[styles.text,{fontFamily:poppins,}]}>Valor: <Text style={[styles.textlight,{fontFamily:poppins,}]}>$80.000</Text></Text>
                 <Text style={[styles.text,{fontFamily:poppins,}]}>Abono: <Text style={[styles.textlight,{fontFamily:poppins,}]}>$10.000</Text></Text>
                 <Text style={[{fontFamily:poppins,},styles.bottomRight]}>Saldo: <Text style={[styles.textlight,{fontFamily:poppinsBold,}]}>$70.000</Text></Text>
               </View>
               <View style={[styles.box_information,styles.borderYellow]}>
                 <Text style={[styles.title,{fontFamily:poppinsBold,}]}>Jhon Denver Murillo Mendez</Text>
                 <Text style={[styles.text,{fontFamily:poppins,}]}>Prenda: <Text style={[styles.textlight,{fontFamily:poppins,}]}>Jean</Text></Text>
                 <Text style={[styles.text,{fontFamily:poppins,}]}>Cantidad: <Text style={[styles.textlight,{fontFamily:poppins,}]}>1</Text></Text>
                 <Text style={[styles.text,{fontFamily:poppins,}]}>Fecha: <Text style={[styles.textlight,{fontFamily:poppins,}]}> 9/01/2019</Text></Text>
                 <Text style={[styles.text,{fontFamily:poppins,}]}>Valor: <Text style={[styles.textlight,{fontFamily:poppins,}]}>$80.000</Text></Text>
                 <Text style={[styles.text,{fontFamily:poppins,}]}>Abono: <Text style={[styles.textlight,{fontFamily:poppins,}]}>$10.000</Text></Text>
                 <Text style={[{fontFamily:poppins,},styles.bottomRight]}>Saldo: <Text style={[styles.textlight,{fontFamily:poppinsBold,}]}>$70.000</Text></Text>
               </View>
              
             </View>

        </View>
      );
    }else{
      return(
        <View style={styles.container}>
             <View style={styles.content_title}>
                <Text style={styles.title}>Acceso rapido</Text>
             </View>
        </View>
      );
    }
  }
}

