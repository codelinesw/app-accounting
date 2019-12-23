import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Button, Alert, Image, ActivityIndicator  } from 'react-native';
import { Ionicons } from '@expo/vector-icons';



import FloatButton from '../components/FloatButton';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

var count = 0,
    countTwo = 0;

export default class Clients extends React.Component{
   _isMounted = false;
  constructor(props) {
    super(props);
    this.state = { 
       data_:[""],
       typeIcon: 'md-arrow-up', 
       changeColor: '#c3c3c3',
       ready_:false,
    };
  }

  requestData(){
    this._isMounted = true;

    fetch('https://3563826c.ngrok.io/app-accounting/clients.php',{
            method: 'post',
            headers: {
              'Accept': 'application/json, text/plain, */*',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              action:'list',
            })
            
        })
        .then(res => res.json())
        .then(res => {
          if(this._isMounted){
            this.setState({
              isLoaded: true,
              ready_:true,
              data_:res,
            });
          }
          //alert(JSON.stringify(res));
          
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
  componentDidMount(){
    this.requestData();
  }
  
  componentWillUnmount() {
    this._isMounted = false;
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


  returnData(){
    //alert(JSON.parse(this.state.data_));
   if(!this._isMounted){
     return  (<View style={styles.container_preloader}>
        <View style={styles.preloader}><ActivityIndicator size="large" /></View>
      </View>)
   }else{
      var ComponentRender =  this.state.data_.map((data,i) => {
          return(
              <View style={styles.content_info_user} key={data.c_client_id}>
                <Image source={require('../images/user.png')} style={styles.avatar} />
                <View style={styles.info_user}>
                  <Text style={styles.name_user}>{data.c_name}</Text>
                  <Text style={styles.current_user}>(+57) {data.c_phone}</Text>
                  <Text style={styles.date_client}>{data.c_date}</Text>
                  <TouchableOpacity style={styles.buttonStar} onPress={() => this.changeState()}><Ionicons name="md-star" color={this.state.changeColor} size={22} style={styles.IconArrow}/></TouchableOpacity>
                  <Text style={styles.sale_price}>$180.0000</Text>
                </View>
            </View>
            )
      });
     return ComponentRender;
   } 
                  
                
   
  }
  render(){
    return(
        <View style={styles.container}>
            <View style={styles.bodyContent}>
              <View style={styles.headerTitle}>
                  <Text style={styles.text}>Todos</Text>
                  <TouchableOpacity style={styles.button_order} onPress={() => this.showAlert()}><Text style={styles.text_button}>Mostrar los primeros</Text><Ionicons
                    name={this.state.typeIcon}
                    color="#c3c3c3"
                    size={20}
                    style={styles.IconArrow}
                   /></TouchableOpacity>
              </View>
              <View style={styles.containerClients}>
                <FloatButton style={[styles.menuIcon,styles.bgroundGreen]} navigation={this.props.navigation}/>
                {this.returnData()}
              </View>
            </View>
        </View>
      );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width:WIDTH,
    alignItems: 'center',
    justifyContent: 'center',
  },

  headerTitle:{
    width:WIDTH,
    height:49,
    flexDirection: 'row',
    justifyContent:'space-between',
    alignItems:'center',
    backgroundColor:'#fcfcfc',
    borderBottomColor:'#dedede',
    borderBottomWidth:1,
  },
  text:{
    left:10,
    top:6,
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
    top:14,
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

  containerClients: {
    width:WIDTH,
    height:(HEIGHT-45),

  },
  content_info_user:{
    width:WIDTH,
    height:76,
    left:0,
    flexDirection:'row',
    borderBottomWidth:1,
    borderBottomColor:'#dedede',
  },
  avatar:{
    top:12,
    left:6,
    width:50,
    height:50,
    borderWidth:2,
    borderColor:'#78e88d',
    borderRadius:6,
  },
  info_user: {
    width:(WIDTH-65),
    left:15,

  },

  name_user:{
    marginTop:10,
    fontSize:13,
    color:'#737373',
    fontWeight: 'bold',
  },

  current_user:{
    top:3,
    color:'#c3c3c3',
    fontSize:12,
  },
  user_current:{
    width:18,
    height:18,

  },

  sale_price:{
    position:'absolute',
    bottom:10,
    right:10,
    fontSize:13,
    fontWeight:'bold',
    color:'#7EE393',
  },

  date_client:{
    top:8,
    fontSize:11,
    color:'#888888',
  },

  buttonStar: {
    position:'absolute',
    top:7,
    right:15,
    width:30,
    height:30,
    justifyContent:'center',
    alignItems:'center',
  },
  menuIcon: {
    position:'absolute',
    zIndex: 9,
    bottom:130,
    right:20,
    padding:10,
    width:55,
    height:55,
    borderRadius:100,
    justifyContent:'flex-end',
    alignItems:'center',
    textAlign:'center',
    backgroundColor:'red',
    shadowOffset: {width: 13, height: 13},
    shadowOpacity: 0.78,
    shadowRadius: 16.00,
    // android (Android +5.0)
    shadowColor:'#000000',
    elevation: 24,
  },

  bgroundYellow:{
      backgroundColor:'#ffbd3e',
  },

  bgroundGreen: {
    backgroundColor:'#7EE393',
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
    left:20,
    width:80,
    height:80,
    zIndex:200,
    justifyContent:'center',
    alignItems:'center',
    
  },
});
