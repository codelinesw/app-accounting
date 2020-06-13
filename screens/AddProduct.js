import React,{ createRef } from 'react';
import {connect} from 'react-redux';
import { TextInput, View ,Dimensions, TouchableOpacity, Image, Text, ActivityIndicator, Animated, Alert, Picker, FlatList } from 'react-native';
import styles from '../styles/styles_template';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import services from "../request/services";
import routes from "../request/routes";
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import {
  addProduct,
  getSelectedProductId,
  setProductId,
  selectProductId,
  showOptions,
  setIndexProduct
} from '../src/actions'

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

class AddClient extends React.Component{

	constructor(props) {
	  	super(props);
	  	this.state = {
		  value:'',
		  p_product_id:JSON.stringify(this.props.navigation.getParam('p_products_id','0')).replace(/\"/g,''),
		  p_name:JSON.stringify(this.props.navigation.getParam('p_name','')).replace(/\"/g,''),
		  p_description:JSON.stringify(this.props.navigation.getParam('p_description','')).replace(/\"/g,''),
		  p_product_categories_id:JSON.stringify(this.props.navigation.getParam('p_product_categories_id','')).replace(/\"/g,''),
      p_price:JSON.stringify(this.props.navigation.getParam('p_price','')).replace(/\"/g,''),
      p_sale_price:JSON.stringify(this.props.navigation.getParam('p_sale_price','')).replace(/\"/g,''),
      p_count:JSON.stringify(this.props.navigation.getParam('p_count','')).replace(/\"/g,''),
      updated:new Date(),
      Namecategory:'',
      itemIndex:0,
		  data_: [""],
      data:[""],
		  fadeValue: new Animated.Value(0),
		  message_alert: 'Por favor complete los campos vacios.',
		  val: true,
		  bgalert:'',
		  isLoaded:false,
      image: JSON.stringify(this.props.navigation.getParam('image',null)).replace(/\"/g,''),
      isLoaded:false,
      indexProduct:0,
      products:[
        {itemIndex:0},
        {itemIndex:1},
        {itemIndex:2}
      ],

	    };

      this.isMounted_ = false;
      this.CurrentSlide = 0;
      this.IntervalTime = 4000;
      this.flatList = createRef();
	}



	componentDidMount(){
		//alert(this.props.selectedClientId);
    this.getCategories();
    //alert(JSON.stringify(this.props.navigation));
 	}

  _renderItems_(){

  }
  getCategories(){
    this.isMounted_ = true;
    services.requestGet(routes.categories.list,null)
    .then(res => {
      if(this.isMounted_){
        //alert(res);
        if(this.state.p_product_categories_id != "" || this.state.p_product_categories_id > 0){
          let _index_ = res.indexOf(res.find(element => element.p_product_categories_id == this.state.p_product_categories_id));
          this.setState({data:res,data_:res,Namecategory:res[_index_].p_category_name});
        }
        this.setState({data:res,data_:res});
      }
    },
    (error) => {
      this.setState({
        //isLoaded: false,
        error
      });
    }).catch(function(error) {
      alert(
        error.message
      )
     // ADD THIS THROW error
      throw error;
    });
    this.setState({
      updated:new Date().getFullYear()+"-"+(new Date().getMonth().toString().length < 2 ? "0"+(new Date().getMonth()+1) : (new Date().getMonth()+1))+"-"+( new Date().getDate().toString().length < 2 ? "0"+new Date().getDate() : new Date().getDate())+" "+new Date().getHours()+":"+new Date().getMinutes()+":"+new Date().getSeconds()
    });
  }
	onChangeText(text){
		this.setState({value:text});
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

  componentWillUnmount() {
   	  Animated.timing(this.state.fadeValue).stop();
	}
  getCurrentData(){
    let data = new Date();
    return data.getFullYear()+"-"+(data.getMonth().toString().length < 2 ? "0"+(data.getMonth()+1) : (data.getMonth()+1))+"-"+( data.getDate().toString().length < 2 ? "0"+data.getDate() : data.getDate())+" "+data.getHours()+":"+data.getMinutes()+":"+data.getSeconds()
  }
	sendData(URL,data_){
	   this.setState({isLoaded:true});
	   let response_ = false;
	   let type_message = URL.split('/');
     //alert(JSON.stringify(data_));
	   services.requestUpload(URL,data_)
	   .then(res => {
		  this.setState({
		    isLoaded: false,
		  });
      let response = res.split('-');
		  if(response[0] == "ok"){
				if(type_message[5] == "add" || type_message[5] == "add_first_part"){
					this.setState({message_alert:'Se ha añadido este producto a tu lista correctamente!',bgalert:styles.bgroundGreen});
          let data_ = ({
            p_products_id: response[1],
            p_name: this.state.p_name,
            p_description: this.state.p_description,
            p_product_categories_id: this.state.p_product_categories_id,
            p_price: this.state.p_price,
            p_sale_price: this.state.p_sale_price,
            p_count: this.state.p_count,
            image: (response[3] == undefined || typeof response[3] == 'undefined') ? response[3] : response[2]+"-"+response[3]
          });
          this.props.addProduct(data_);
          this.props.getSelectedProductId(response[1]);
          this._start();

          //alter table p_products AUTO_INCREMENT = 1;
				}else{
					this.setState({message_alert:'Se ha actualizado el registro correctamente!',bgalert:styles.bgroundGreen});
          let old_Data = this.props.products.products;
          let data_ = ({
            p_products_id: this.state.p_product_id,
            p_name: this.state.p_name,
            p_description: this.state.p_description,
            p_product_categories_id: this.state.p_product_categories_id,
            p_price: this.state.p_price,
            p_sale_price: this.state.p_sale_price,
            p_count: this.state.p_count,
            image: (response[2] == undefined || typeof response[2] == 'undefined') ? response[2] : response[1]+"-"+response[2]

          });
          old_Data[this.props.products.IndexProduct] = data_;
          console.log(JSON.stringify(old_Data));
          this.props.setProductId(old_Data);
          this.props.getSelectedProductId(0);
          this._start();
          this.props.showOptions(false);
          this.props.setIndexProduct(9999);
          //alert(response);
				}

		  }else{
				if(type_message[5] == "update"){
					this.setState({message_alert:'Ah ocurrido un problema, intentelo de nuevo más tarde',bgalert:styles.bgroundYellow});
			  	this._start();
				}else{
					this.setState({message_alert:'Realice algunos cambios para actualizar la informacion de este cliente',bgalert:styles.bgroundYellow});
			  	this._start();
          this.props.getSelectedProductId(0);
				}

		  }
	   },
	   (error) => {
      alert(error);
		 this.setState({
		   isLoaded: false,
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

	validateForm(){
		const { p_product_id, p_name, p_description, p_product_categories_id, p_price, p_sale_price, p_count, image } = this.state;
			if(p_name == "" && p_product_categories_id == "" && (p_pice == "" || p_price == "0") && (p_sale_pice == "" || p_sale_price == "0") && (p_count == "" || p_count == "0")){
				this.setState({message_alert: 'Por favor complete los campos vacios todos.',bgalert:styles.bgroundRed});
				this._start();
			}else if(p_name == ""){
				this.setState({message_alert: 'Por favor complete los campos vacios nombre .',bgalert:styles.bgroundRed});
				this._start();
			}else if(p_product_categories_id == "" || p_product_categories_id == "0"){
				this.setState({message_alert: 'Por favor complete los campos vacios categorias.',bgalert:styles.bgroundRed});
				this._start();
      }else if(p_price == "" || p_price == "0"){
				this.setState({message_alert: 'Por favor complete los campos vacios precio compra .',bgalert:styles.bgroundRed});
				this._start();
      }else if(p_sale_price == "" || p_sale_price == "0"){
				this.setState({message_alert: 'Por favor complete los campos vacios precio venta.',bgalert:styles.bgroundRed});
				this._start();
			}else if(p_count == "" || p_count == "0"){
				this.setState({message_alert: 'Por favor complete los campos vacios cantidad.',bgalert:styles.bgroundRed});
				this._start();
			}else{
				if(p_product_id == "" || p_product_id == "0"){
					let data_ = JSON.stringify({
            p_product_id: p_product_id,
            p_name: p_name,
            p_description: p_description,
            p_product_categories_id: p_product_categories_id,
            p_price: p_price,
            p_sale_price: p_sale_price,
            p_count: p_count,
            image:image
          });
          let uploadData = new FormData();
          uploadData.append('p_name',p_name);
          uploadData.append('p_description',p_description);
          uploadData.append('p_product_categories_id',p_product_categories_id);
          uploadData.append('p_price',p_price);
          uploadData.append('p_sale_price',p_sale_price);
          uploadData.append('p_count',p_count);
          if((image == "" || image == null || image == "undefined")){
  					this.sendData(routes.products.add,uploadData);
          }else{
            uploadData.append('file',{type:'image/jpg',uri:image,name:'uploadimage.jpg'});
  					this.sendData(routes.products.add,uploadData);
          //  alert('saving...');
          }

				}else{
          let uploadData = new FormData();
          uploadData.append('p_products_id',p_product_id);
          uploadData.append('p_name',p_name);
          uploadData.append('p_description',p_description);
          uploadData.append('p_product_categories_id',p_product_categories_id);
          uploadData.append('p_price',p_price);
          uploadData.append('p_sale_price',p_sale_price);
          uploadData.append('p_count',p_count);

          //alert(image);
          let img = (image != null || image != "") ? image.split('/') : image;
          img = img[1] == "app-accounting" ? null : (img != null || img != "" || img == "null") ? img : null;

          if((img == "" || img == null || img == "undefined")){
  					this.sendData(routes.products.update,uploadData);
          }else{
            uploadData.append('file',{type:'image/jpg',uri:image,name:'uploadimage.jpg'});
  					this.sendData(routes.products.update,uploadData);
            //alert('saving...');
          }

        //this.props.getClients(res)
					//alert('updating...');
				}
			}

	}

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  }

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  };

  chooseImage(){
    this.getPermissionAsync();
    this._pickImage();
  }
  _goToNextPage = () => {
    if(this.CurrentSlide >= this.state.products.length-1){
      this.CurrentSlide = 0;
    }else{
      this.CurrentSlide = this.CurrentSlide+1;
    }
    this.flatList.current.scrollToIndex({animated: true,index:this.CurrentSlide});
  };

  _renderItems_(item,index){
    const {
    	value, isLoaded, message_alert,fadeValue, bgalert,
   		p_name, p_price,p_sale_price,p_count, p_description,image,data_,
      indexProduct, Namecategory
	} = this.state;
    let img = (image != null || image != "") ? image.split('/') : image;

    if(index == 0){
      return(<View style={[styles.container,{backgroundColor:'white',}]}>
        <View style={[styles.headerTitle,{flexDirection:'column', justifyContent:'flex-start',textAlign:'left',alignItems:'flex-start',height:95,resizeMode: 'contain',marginBottom:10}]}>
            <Text style={[styles.title,{fontFamily:'Poppins-Bold', marginTop:25,}]}>Añade un nuevo cliente</Text>
            <Text style={[styles.textlight,{fontFamily:'Poppins'}]}>En esta zona puedes agrega un nuevo cliente a tu lista</Text>
        </View>
        <Animated.View style={[styles.toast,bgalert,{opacity: fadeValue}]}>
        <Text style={[styles.textwhite,{position:'relative',left:7,fontFamily:'Poppins'}]}>{message_alert}</Text>
        </Animated.View>
        <View style={[styles.body,{justifyContent:'center',alignItems:'center'}]}>
          <View style={styles.input_group}>
            <FontAwesome name="inbox" size={19} style={[styles.iconInput,{top:15}]} />
            <TextInput
              style={[styles.input_text,{fontFamily:'Poppins',},styles.textlight]}
              placeholder='Nombre del Producto'
                  onChangeText={text => this.setState({p_name:text})}
                  value={p_name || ''}
            />
          </View>
          <View style={styles.input_group}>
            <View style={[styles.input_text,{fontFamily:'Poppins',},styles.textlight]}>
            <Ionicons
              name="md-shirt"
              color="#a4a6ac"
              size={19}
              style={[styles.iconInput,{left:8,},]}
             />
            <Text style={[styles.textlight,{fontFamily:'Poppins',position:'absolute',top:11,left:25,width:(WIDTH-60),height:47,zIndex: 2}]}>{this.state.itemIndex == 0 && (this.state.p_product_categories_id == "" || this.state.p_product_categories_id == 0) ? this.state.data_[this.state.itemIndex].p_category_name : (this.state.p_product_categories_id != 0 || this.state.p_product_categories_id != "") ? Namecategory : this.state.data_[0].p_category_name}</Text>
            <Picker
            selectedValue={this.state.p_product_categories_id}
            style={[{fontFamily:'Poppins',},styles.textlight,{position:'absolute',top:-5,left:15,width:(WIDTH-60),height:47,zIndex:1,color:'white'}]}
            itemStyle={{ fontFamily: 'Poppins' }}
            onValueChange={(itemValue, itemIndex_) =>
              this.setState({p_product_categories_id: itemValue, itemIndex: itemIndex_})
            }>
              <Picker.Item key="400" label="Selecciones una categoria" value="0" />
              {this.state.data.map((data,i) => {
                    if((data == "" || data == undefined)){
                      return <Picker.Item key="900" label="Selecciones una categoria" color="#a4a6ac" value="load" />
                    }else if(Object.values(data) == "empty" || data.response == "empty"){
                      return <Picker.Item key="1400" label="No hay categorias" color="#a4a6ac" value="none" />
                    }else{
                      return <Picker.Item key={i} value={data.p_product_categories_id} color="#a4a6ac" label={data.p_category_name} />
                    }
              })}
            </Picker>

            </View>
          </View>
          <View style={styles.input_group}>
            <FontAwesome name="pencil" size={19} style={styles.iconInput} />
            <TextInput
             style={[styles.input_text,{fontFamily:'Poppins',height:80},styles.textlight]}
             placeholder='Descripcion breve'
             multiline={true}
             numberOfLines={8}
             onChangeText={text => this.setState({p_description:text})}
             value={p_description ||''}
              />
          </View>
          <View style={[styles.input_group,{right:0,}]}>
            <TouchableOpacity style={[styles.btnExpand,styles.btngreen]} onPress={()=> this._goToNextPage()}>
              <Text style={[styles.textwhite,{fontFamily:"Poppins",}]}>Siguiente</Text>
            </TouchableOpacity>
          </View>
        </View>
        {
          isLoaded ? (<View style={styles.container_preloader_expand}>
            <View style={styles.preloader}><ActivityIndicator size="large" /></View>
          </View>) : null
        }
      </View>)
    }else if(index == 1){

      return(<View style={[styles.container,{backgroundColor:'white',}]}>
        <View style={[styles.headerTitle,{flexDirection:'column', justifyContent:'flex-start',textAlign:'left',alignItems:'flex-start',height:95,resizeMode: 'contain',marginBottom:10}]}>
            <Text style={[styles.title,{fontFamily:'Poppins-Bold', marginTop:25,}]}>Añade un nuevo cliente</Text>
            <Text style={[styles.textlight,{fontFamily:'Poppins'}]}>En esta zona puedes agrega un nuevo cliente a tu lista</Text>
        </View>
        <Animated.View style={[styles.toast,bgalert,{opacity: fadeValue}]}>
        <Text style={[styles.textwhite,{position:'relative',left:7,fontFamily:'Poppins'}]}>{message_alert}</Text>
        </Animated.View>
        <View style={[styles.body,{justifyContent:'center',alignItems:'center'}]}>
          <View style={styles.input_group}>
            <FontAwesome name="dollar" size={18} style={styles.iconInput} />
            <TextInput
             style={[styles.input_text,{fontFamily:'Poppins',},styles.textlight]}
             placeholder='Precio de compra'
                 onChangeText={text => this.setState({p_price:text})}
                 value={p_price || ''}
            />
          </View>
          <View style={styles.input_group}>
            <FontAwesome name="location-arrow" size={18} style={styles.iconInput} />
            <TextInput
             style={[styles.input_text,{fontFamily:'Poppins',},styles.textlight]}
             placeholder='Precio de venta'
                 onChangeText={text => this.setState({p_sale_price:text})}
                 value={p_sale_price || ''}
            />
          </View>
          <View style={styles.input_group}>
            <FontAwesome name="location-arrow" size={18} style={styles.iconInput} />
            <TextInput
             style={[styles.input_text,{fontFamily:'Poppins',},styles.textlight]}
             placeholder='Cantidad'
                 onChangeText={text => this.setState({p_count:text})}
                 value={p_count || ''}
            />
          </View>
          <View style={[styles.input_group,{right:0,}]}>
            <TouchableOpacity style={[styles.btnExpand,styles.btngreen]} onPress={()=> this._goToNextPage()}>
              <Text style={[styles.textwhite,{fontFamily:"Poppins",}]}>Siguiente</Text>
            </TouchableOpacity>
          </View>
        </View>
        {
          isLoaded ? (<View style={styles.container_preloader_expand}>
            <View style={styles.preloader}><ActivityIndicator size="large" /></View>
          </View>) : null
        }
      </View>)
    }else{
      return(<View style={[styles.container,{backgroundColor:'white',}]}>
            <View style={[styles.headerTitle,{flexDirection:'column', justifyContent:'flex-start',textAlign:'left',alignItems:'flex-start',height:95,resizeMode: 'contain',marginBottom:10}]}>
                <Text style={[styles.title,{fontFamily:'Poppins-Bold', marginTop:25,}]}>Añade un nuevo cliente</Text>
                <Text style={[styles.textlight,{fontFamily:'Poppins'}]}>En esta zona puedes agrega un nuevo cliente a tu lista</Text>
            </View>
            <Animated.View style={[styles.toast,bgalert,{opacity: fadeValue}]}>
            <Text style={[styles.textwhite,{position:'relative',left:7,fontFamily:'Poppins'}]}>{message_alert}</Text>
            </Animated.View>
            <View style={[styles.body,{justifyContent:'center',alignItems:'center'}]}>
              <View style={[styles.input_image,{top:12,marginBottom:25}]}>
                {image &&<Image source={img[1] == "app-accounting" ? {uri:routes.baseurl.url+image} : (image != null || image != "") ? { uri: image } : { uri: image }} style={[styles.showImage]} />}
                <TouchableOpacity style={styles.buttonChooseImage} onPress={() => this.chooseImage()}><FontAwesome name="image" size={62} style={[{top:0,left:0,color:'#59f090',opacity:0.7}]} /></TouchableOpacity>
              </View>
              <View style={[styles.input_group,{right:0,}]}>
                <TouchableOpacity style={[styles.btnExpand,styles.btngreen]} onPress={()=> this.validateForm()}>
                  <Text style={[styles.textwhite,{fontFamily:"Poppins",}]}>Guardar y terminar</Text>
                </TouchableOpacity>
              </View>
            </View>
            {
              isLoaded ? (<View style={styles.container_preloader_expand}>
                <View style={styles.preloader}><ActivityIndicator size="large" /></View>
              </View>) : null
            }
      </View>)
    }

  }



	render(){
    const {
      	value, isLoaded, message_alert,fadeValue, bgalert,
     		p_name, p_price,p_sale_price,p_count, p_description,image,data_,
        indexProduct
	  } = this.state;
    let scrollx = new Animated.Value(0);
    let position = Animated.divide(scrollx,(WIDTH-20));

		return(
        <View style={{top:5}}>
        <View style={styles.containerBarProgress}>
          {this.state.products.map(( item, index ) => {
              let style = (item == 0) ? styles.baruno : (item == 1) ? styles.bardos : styles.bartres;
              let opacity = position.interpolate({
                inputRange: [ index - 1, index, index + 1],
                outputRange: [0.3, 1 , 0.3],
                extrapolate:"clamp"
              })
              //,Consolas, Meslo,Ubuntu Mono,Fira Code
              return(
                <Animated.View
                  key={index+1}
                  style={[styles.bar,style,{opacity}]}
                />
              )
          })}
        </View>
          <FlatList
           horizontal
           paddingEnable={false}
           showHorizontalScrollIndicator={false}
           onScroll={Animated.event(
           // scrollX = e.nativeEvent.contentOffset.x
           [{ nativeEvent: {
                contentOffset: {
                  x: scrollx
                }
              }
            }]
         )}
           contentContainerStyle={{ justifyContent: 'center', alignItems:'center'}}
           style={{width:WIDTH}}
           data={this.state.products}
           renderItem={({ item,index }) => this._renderItems_(item,index)}
           keyExtractor={(item,index) => {return index.toString()}}
           ref={this.flatList}
          />
        </View>
			);

		//SF Mono,Fira Code, Menlo, Consolas, DejaVu Sans Mono, monospace
	}
}


const mapStateToProps = state => {
  return {
    products: state.products
  }
}

const mapDispatchToProps = {
  addProduct,
  getSelectedProductId,
  setProductId,
  selectProductId,
  showOptions,
  setIndexProduct
};

export default connect( mapStateToProps , mapDispatchToProps )(AddClient)
