import React from 'react';
import { Text, View ,Dimensions, TouchableOpacity, Image, TextInput } from 'react-native';
import styles from '../styles/styles_template';
import * as Font from 'expo-font';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import Pie from 'react-native-pie';

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

      return(
        <View style={styles.container}>

             <View style={styles.body_}>
               <View style={styles.container_pie_chart}>
                   <View style={[styles.panel_left,styles.left_middle_more]}>
                     <Pie
                        radius={75}
                        series={[10, 90,]}
                        colors={['#59f090', '#535D7C']}
                        style={styles.pie_}
                      />
                   </View>
                   <View style={[styles.panel_right,styles.right_middle_more]}>
                      <View style={{flexDirection:'row'}}>
                         <View style={[styles.circle,styles.bgroundDark]}></View>
                         <Text style={[styles.textlight,{fontFamily:"Poppins",fontSize:13,marginRight:40,}]}>Inversion</Text>
                       </View>
                      <View style={{flexDirection:'row'}}>
                         <View style={[styles.circle,styles.bgroundGreen]}></View>
                         <Text style={[styles.textlight,{fontFamily:"Poppins",fontSize:13,marginRight:43,}]}>Ingresos</Text>
                       </View>
                   </View>
               </View>
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
                  <Text style={[styles.textlight,{fontSize:12},{fontFamily:"Poppins",}]}>DETALLES DE LOS INGRESOS</Text>
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
               <View style={styles.container_details_accounting}>
                   <View style={[styles.container_divider,styles.container_divider_white]}>
                     <View style={styles.panel_left}>
                       <View style={[styles.avatar,styles.bgroundGreen]}>
                         <Text style={[styles.textwhite,styles.fontsizeDate,{fontFamily:"Poppins-Bold"}]}>01</Text>
                         <Text style={[styles.textwhite,{fontFamily:"Poppins"},styles.text_day_week_]}>Sabado</Text>
                       </View>
                     </View>
                     <View style={styles.panel_right}>
                       <Text style={[styles.title,{fontFamily:"Poppins-Bold",fontSize:12,marginTop:9,}]}>Venta</Text>
                       <Text style={[styles.textlight,{fontFamily:"Poppins",fontSize:11,}]}>Se vendio 2 Jeans importados</Text>
                       <View style={{flexDirection:'row'}}>
                         <Text style={[styles.text,{fontFamily:"Poppins",fontSize:12,}]}>01/02/2020</Text>
                       </View>
                       <Text style={[{fontFamily:"Poppins-Bold"},styles.bottomRight]}>$70.000</Text>
                     </View>
                   </View>
                   <View style={[styles.container_divider,styles.container_divider_white]}>
                     <View style={styles.panel_left}>
                       <View style={[styles.avatar,styles.bgroundGreen]}>
                         <Text style={[styles.textwhite,styles.fontsizeDate,{fontFamily:"Poppins-Bold"}]}>13</Text>
                         <Text style={[styles.textwhite,{fontFamily:"Poppins"},styles.text_day_week_]}>Jueves</Text>
                       </View>
                     </View>
                     <View style={styles.panel_right}>
                       <Text style={[styles.title,{fontFamily:"Poppins-Bold",fontSize:12,marginTop:9,}]}>Venta</Text>
                       <Text style={[styles.textlight,{fontFamily:"Poppins",fontSize:11,}]}>Se vendio 2 Jeans importados</Text>
                       <View style={{flexDirection:'row'}}>
                         <Text style={[styles.text,{fontFamily:"Poppins",fontSize:12,}]}>13/02/2020</Text>
                       </View>
                       <Text style={[{fontFamily:"Poppins-Bold"},styles.bottomRight]}>$50.000</Text>
                     </View>
                   </View>
                   <View style={[styles.container_divider,styles.container_divider_white]}>
                     <View style={styles.panel_left}>
                       <View style={[styles.avatar,styles.bgroundGreen]}>
                         <Text style={[styles.textwhite,styles.fontsizeDate,{fontFamily:"Poppins-Bold"}]}>15</Text>
                         <Text style={[styles.textwhite,{fontFamily:"Poppins"},styles.text_day_week_]}>Sabado</Text>
                       </View>
                     </View>
                     <View style={styles.panel_right}>
                       <Text style={[styles.title,{fontFamily:"Poppins-Bold",fontSize:12,marginTop:9,}]}>Venta</Text>
                       <Text style={[styles.textlight,{fontFamily:"Poppins",fontSize:11,}]}>Se vendio 2 Jeans importados</Text>
                       <View style={{flexDirection:'row'}}>
                         <Text style={[styles.text,{fontFamily:"Poppins",fontSize:12,}]}>15/02/2020</Text>
                       </View>
                       <Text style={[{fontFamily:"Poppins-Bold"},styles.bottomRight]}>$30.000</Text>
                     </View>
                   </View>
               </View>
             </View>

        </View>
      );
  }
}
