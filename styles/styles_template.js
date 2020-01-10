import { StyleSheet, Dimensions } from 'react-native';

const bgGreen 	= '#59f090';
const bgYellow 	= '#ffbd3e';
const bgPurpple = '#9b34ff';
const bgGray 	= '#f7f7f7';
const dark 		= '#5c5b5e';
const darklight = '#a4a6ac';
const light		= '#e1e1e6';
const white 	= '#ffffff';
const bgBlue 		= '#00e6e9';
const btnGray   = '#f5f5f5';

/* The following dimensions are defined */

const WIDTH  = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

/* Here all style are defined */

const styles = StyleSheet.create({
  container: {
  	width:WIDTH,
    height:HEIGHT,
    backgroundColor: bgGray,
  },
  content_title:{
  	position:'relative',
  	width:WIDTH,
  	height:45,
  	marginTop:30,
  },

  //container all items of body
  body_: {
  	width:WIDTH,
  	height:(HEIGHT * 0.75),
    resizeMode: 'contain',
    //backgroundColor:'red',
    alignItems:'center',
  },

  //styles for text title
  title:{
  	marginLeft:8,
  	top:2,
  	color:dark,
  },

  circle: {
  	position:'relative',
  	width:8,
  	height:8,
  	borderRadius:100,
  	left:3,
  	top:7,
  },

  text:{
  	marginLeft:8,
  	top:2,
  	height:22,
  	color:dark,
  },

  textlight: {
  	marginLeft:8,
  	top:2,
  	color:darklight,
  },

  //styles for box where is all info for clients or balances
  box_information: {
  	position:'relative',
  	top:10,
  	padding:3,
    marginBottom:16,
    width: (WIDTH-35),
    height:150,
    backgroundColor:white,
    borderRadius:6,
    shadowOffset: {width: 13, height: 13}, 
    shadowRadius: 16.00,
    // android (Android +5.0)
    shadowColor:'red',
    shadowOpacity: 0.010,
    elevation:4,	
  },

  expand_box_information: {
  	padding:10,
  	height:160,
  },

  bottomRight: {
  	position:'absolute',
  	right:10,
  	bottom:10,
  	color:dark,
  },

  textdate:{
  	position:'absolute',
  	right:10,
  	bottom:10,
  	color:darklight,
  },

  colorGreen: {
  	color:bgGreen,
  },

  borderGreen: {
  	borderLeftWidth:5,
  	borderLeftColor:bgGreen,
  },

  //styles for container of button
  btnGroup: {
  	position:'relative',
  	flexDirection:'row',
  	width:(WIDTH-70),
  	height:40,
  	left:10,
  	marginTop:6,
  },
  //styles for buttons
  btngray: {
  	position:'relative',
  	width:65,
  	padding:5,
  	borderRadius:6,
  	backgroundColor:btnGray,
  	color:dark,
  	marginRight:8,
  },

  btnwgray: {
  	position:'relative',
  	padding:5,
  	paddingRight:12,
  	borderRadius:6,
  	backgroundColor:white,
  	borderWidth:2,
  	borderColor:btnGray,
  	color:dark,
  },

  btnfavorites: {
  	position:'absolute',
  	right:10,
  	top:5,
  	color:darklight,
  	padding:5,
  	
  },

  bgroundGreen: {
  	backgroundColor:bgGreen,
  },

  bgroundYellow: {
  	backgroundColor:bgYellow,
  },

  bgroundBlue: {
  	backgroundColor:bgBlue,
  },

  bgroundPurpple:{
  	backgroundColor:bgPurpple,
  }
});


export default styles;