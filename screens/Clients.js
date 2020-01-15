import React from 'react';
import { Text, View ,Dimensions, TouchableOpacity, Image, TextInput } from 'react-native';
import styles from '../styles/styles_template';
import { Ionicons } from '@expo/vector-icons';
import ButtonMenu from "../components/ButtonMenu";
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
      nameorder:'ASCENDENTE'
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
               <View style={[styles.box_information,styles.expand_box_information]}>
                 <View style={{flexDirection:'row'}}>
                   <View style={[styles.circle,styles.bgroundPurpple]}></View>
                   <TouchableOpacity onPress={() => this.props.navigation.navigate('ViewClient')}><Text style={[styles.title,{fontFamily:"Poppins-Bold",}]}>Jhon Denver Murillo Mendez</Text></TouchableOpacity>
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
               </View>
               <View style={[styles.box_information,styles.expand_box_information]}>
                 <View style={{flexDirection:'row'}}>
                   <View style={[styles.circle,styles.bgroundGreen]}></View>
                   <TouchableOpacity onPress={() => this.props.navigation.navigate('ViewClient')}><Text style={[styles.title,{fontFamily:"Poppins-Bold",}]}>Jhon Denver Murillo Mendez</Text></TouchableOpacity>
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
               </View>
               <View style={[styles.box_information,styles.expand_box_information]}>
                 <View style={{flexDirection:'row'}}>
                   <View style={[styles.circle,styles.bgroundYellow]}></View>
                   <TouchableOpacity onPress={() => this.props.navigation.navigate('ViewClient')}><Text style={[styles.title,{fontFamily:"Poppins-Bold",}]}>Jhon Denver Murillo Mendez</Text></TouchableOpacity>
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
               </View>
             </View>

        </View>
      );
  }
}
