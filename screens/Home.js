import React from 'react';
import { Text, View ,Dimensions, TouchableOpacity, Image, TextInput } from 'react-native';
import styles from '../styles/styles_template';
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
      return(
        <View style={styles.container}>
             <View style={[styles.headerTitle,styles.headerColumn]}>
               <Text style={[styles.title,{fontFamily:"Poppins-Bold",textAlign:'center',fontSize:20,marginTop:12,}]}>Bienvenido a AppBalance</Text>
               <Text style={[styles.textlight,{fontFamily:"Poppins",textAlign:'center',fontSize:14,}]}>Atraves de estos paneles puedes acceder rapidamente a cada uno de esos modulos</Text>
             </View>
             {/*<View style={[styles.container_divider,styles.container_divider_white]}>
               <View style={styles.panel_left}>
                 <Image source={require('../images/user.png')} style={styles.avatar} />
               </View>
               <View style={styles.panel_right}>
                 <Text style={[styles.title,{fontFamily:"Poppins-Bold",fontSize:12,marginTop:9,}]}>Jhon Denver Murillo</Text>
                 <Text style={[styles.textlight,{fontFamily:"Poppins",fontSize:11,}]}>(+57) 3117222333</Text>
                 <View style={{flexDirection:'row'}}>
                   <View style={[styles.circle,styles.bgroundGreen]}></View>
                   <Text style={[styles.text,{fontFamily:"Poppins",fontSize:12,}]}>Cliente constante</Text>
                 </View>
                 <TouchableOpacity style={styles.btnfavorites}>
                    <Ionicons name="md-star" color="#a4a6ac" size={22} />
                 </TouchableOpacity>
               </View>
             </View>*/}
             <View style={styles.body_}>
               {/*<Text style={[styles.title,{fontFamily:"Poppins",}]}>Acceso rapido</Text>
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
                 <Text style={[styles.title,{fontFamily:"Poppins-Bold",}]}>Compra</Text>
                 <Text style={[styles.text,{fontFamily:"Poppins",}]}>Prenda: <Text style={[styles.textlight,{fontFamily:"Poppins",}]}>Jean</Text></Text>
                 <Text style={[styles.text,{fontFamily:"Poppins",}]}>Cantidad: <Text style={[styles.textlight,{fontFamily:"Poppins",}]}>1</Text></Text>
                 <Text style={[styles.text,{fontFamily:"Poppins",}]}>Fecha: <Text style={[styles.textlight,{fontFamily:"Poppins",}]}> 9/01/2019</Text></Text>
                 <Text style={[styles.text,{fontFamily:"Poppins",}]}>Valor: <Text style={[styles.textlight,{fontFamily:"Poppins",}]}>$80.000</Text></Text>
                 <Text style={[styles.text,{fontFamily:"Poppins",}]}>Abono: <Text style={[styles.textlight,{fontFamily:"Poppins",}]}>$10.000</Text></Text>
                 <Text style={[{fontFamily:"Poppins",},styles.bottomRight]}>Saldo: <Text style={[styles.textlight,{fontFamily:"Poppins-Bold",},styles.colorGreen]}>$70.000</Text></Text>
               </View>
               <View style={[styles.box_information,styles.expand_box_information]}>
                 <View style={{flexDirection:'row'}}>
                   <View style={[styles.circle,styles.bgroundPurpple]}></View>
                   <Text style={[styles.title,{fontFamily:"Poppins-Bold",}]}>Jhon Denver Murillo Mendez</Text>
                 </View>
                 <Text style={[styles.textlight,{fontFamily:"Poppins",}]}>(+57) 3117222333</Text>
                 <Text style={[styles.textlight,{fontFamily:"Poppins",}]}>Jhon es un cliente que le gusta hacer compras constantemente de jeans</Text>
                 <View style={styles.btnGroup}>
                   <TouchableOpacity style={styles.btngray}>
                     <Text style={[styles.textlight,{fontFamily:"Poppins",}]}>Editar</Text>
                   </TouchableOpacity>
                   <TouchableOpacity style={styles.btnwgray}>
                     <Text style={[styles.textlight,{fontFamily:"Poppins",}]}>Eliminar</Text>
                   </TouchableOpacity>
                 </View>
                 <TouchableOpacity style={styles.btnfavorites}>
                    <Ionicons name="md-star" color="#a4a6ac" size={22} />
                 </TouchableOpacity>
                 <Text style={[styles.textdate,{fontFamily:"Poppins",}]}>09/01/2019</Text>
               </View>*/}
               <View style={styles.content_card}>
                    <TouchableOpacity style={[styles.card,styles.bgroundPurpple]} onPress={() => this.props.navigation.navigate('Accounting')}>
                      <View style={styles.circle_image}>
                        <Image source={require('../images/PNG/001-taxes.png')} style={styles.image_card} />
                      </View>
                      <Text style={[styles.title,{fontFamily:'Poppins-Bold',top:20,color:'white',}]}>Mis Cuentas</Text>
                    </TouchableOpacity> 
                    <TouchableOpacity style={[styles.card,styles.bgroundYellow]} onPress={() => this.props.navigation.navigate('Clients')}>
                    <View style={styles.circle_image}><Image source={require('../images/PNG/002-target.png')} style={styles.image_card} /></View>
                    <Text style={[styles.title,{fontFamily:'Poppins-Bold',top:20,color:'white',}]}>Mis Clientes</Text>
                   </TouchableOpacity>
                   <TouchableOpacity style={[styles.card,styles.bgroundGreen]} onPress={() => this.props.navigation.navigate('Balances')}>
                      <View style={styles.circle_image}><Image source={require('../images/PNG/003-paper-plane.png')} style={styles.image_card} /></View>
                      <Text style={[styles.title,{fontFamily:'Poppins-Bold',top:20,color:'white',}]}>Saldos Pendientes</Text>
                   </TouchableOpacity>
                   <TouchableOpacity style={[styles.card,styles.bgroundBlue]}>
                      <View style={styles.circle_image}><Image source={require('../images/PNG/004-shopping-bag.png')} style={styles.image_card} /></View>
                      <Text style={[styles.title,{fontFamily:'Poppins-Bold',top:20,color:'white',}]}>Mis Compras</Text>
                   </TouchableOpacity>
              </View>
             </View>

        </View>
      );
	}
}
