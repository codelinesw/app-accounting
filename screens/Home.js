import React from 'react';
import { Text, View ,Dimensions, TouchableOpacity, Image, TextInput } from 'react-native';
import styles from '../styles/styles_template';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';

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
    };
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

  render(){
		const { fontsLoaded, poppins, poppinsBold, value, showing, expand } = this.state;

    if(fontsLoaded){
      return(
        <View style={styles.container}>
             <View style={styles.content_title}>
               <Text style={[styles.title,{fontFamily:poppinsBold,}]}>Acceso rapido</Text>
             </View>
             <View style={[styles.container_divider,styles.container_divider_white]}>
               <View style={styles.panel_left}>
                 <Image source={require('../images/user.png')} style={styles.avatar} />
               </View>
               <View style={styles.panel_right}>
                 <Text style={[styles.title,{fontFamily:poppinsBold,fontSize:12,marginTop:9,}]}>Jhon Denver Murillo</Text>
                 <Text style={[styles.textlight,{fontFamily:poppins,fontSize:11,}]}>(+57) 3117222333</Text>
                 <View style={{flexDirection:'row'}}>
                   <View style={[styles.circle,styles.bgroundGreen]}></View>
                   <Text style={[styles.text,{fontFamily:poppins,fontSize:12,}]}>Cliente constante</Text>
                 </View>
                 <TouchableOpacity style={styles.btnfavorites}>
                    <Ionicons name="md-star" color="#a4a6ac" size={22} />
                 </TouchableOpacity>
               </View>
             </View>
             <View style={styles.body_}>
               <Text style={[styles.title,{fontFamily:poppins,}]}>Acceso rapido</Text>
               <View style={[styles.bar_show_state_,styles.search_bar]}>
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
                 <Text style={[styles.title,{fontFamily:poppinsBold,}]}>Compra</Text>
                 <Text style={[styles.text,{fontFamily:poppins,}]}>Prenda: <Text style={[styles.textlight,{fontFamily:poppins,}]}>Jean</Text></Text>
                 <Text style={[styles.text,{fontFamily:poppins,}]}>Cantidad: <Text style={[styles.textlight,{fontFamily:poppins,}]}>1</Text></Text>
                 <Text style={[styles.text,{fontFamily:poppins,}]}>Fecha: <Text style={[styles.textlight,{fontFamily:poppins,}]}> 9/01/2019</Text></Text>
                 <Text style={[styles.text,{fontFamily:poppins,}]}>Valor: <Text style={[styles.textlight,{fontFamily:poppins,}]}>$80.000</Text></Text>
                 <Text style={[styles.text,{fontFamily:poppins,}]}>Abono: <Text style={[styles.textlight,{fontFamily:poppins,}]}>$10.000</Text></Text>
                 <Text style={[{fontFamily:poppins,},styles.bottomRight]}>Saldo: <Text style={[styles.textlight,{fontFamily:poppinsBold,},styles.colorGreen]}>$70.000</Text></Text>
               </View>
               <View style={[styles.box_information,styles.expand_box_information]}>
                 <View style={{flexDirection:'row'}}>
                   <View style={[styles.circle,styles.bgroundPurpple]}></View>
                   <Text style={[styles.title,{fontFamily:poppinsBold,}]}>Jhon Denver Murillo Mendez</Text>
                 </View>
                 <Text style={[styles.textlight,{fontFamily:poppins,}]}>(+57) 3117222333</Text>
                 <Text style={[styles.textlight,{fontFamily:poppins,}]}>Jhon es un cliente que le gusta hacer compras constantemente de jeans</Text>
                 <View style={styles.btnGroup}>
                   <TouchableOpacity style={styles.btngray}>
                     <Text style={[styles.textlight,{fontFamily:poppins,}]}>Editar</Text>
                   </TouchableOpacity> 
                   <TouchableOpacity style={styles.btnwgray}>
                     <Text style={[styles.textlight,{fontFamily:poppins,}]}>Eliminar</Text>
                   </TouchableOpacity> 
                 </View>
                 <TouchableOpacity style={styles.btnfavorites}>
                    <Ionicons name="md-star" color="#a4a6ac" size={22} />
                 </TouchableOpacity>
                 <Text style={[styles.textdate,{fontFamily:poppins,}]}>09/01/2019</Text>
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
