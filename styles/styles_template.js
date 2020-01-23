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
const bgRed     = '#FF5244';

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

  fullwidth: {
    width:WIDTH,
  },
  extandar_width: {
    width: (WIDTH-35),
    left:0,
  },
  content_title:{
  	position:'relative',
  	width:WIDTH,
  	height:45,
  	marginTop:30,
  },

  headerTitle:{
    width:WIDTH,
    height:49,
    flexDirection: 'row',
    justifyContent:'space-between',
    alignItems:'center',
    paddingLeft:10,
    paddingRight:10,
  },

  headerColumn: {
    height:89,
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center',
    marginBottom:25,
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

  textwhite: {
    color:white,
  },

  textgreen: {
    color:bgGreen,
  },

  fontsizeDate: {
    fontSize:20,
    textAlign:'center',
    marginTop:5,
    marginBottom:0,
  },

  text_day_week_: {
    top:-10,
    fontSize:10,
    textAlign:'center',
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

  borderYellow: {
    borderLeftWidth:5,
    borderLeftColor:bgYellow,
  },

  borderPurpple: {
    borderLeftWidth:5,
    borderLeftColor:bgPurpple,
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

  btnExpand: {
  	position:'relative',
  	width:(WIDTH-35),
    height:45,
  	padding:5,
  	borderRadius:6,
  	color:dark,
  	marginRight:8,
    justifyContent:'center',
    alignItems:'center',
  },

  btngreen:{
    backgroundColor:bgGreen,
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

  btnwgreen: {
  	position:'relative',
  	padding:5,
  	paddingRight:12,
  	borderRadius:6,
  	backgroundColor:white,
  	borderWidth:2,
  	borderColor:bgGreen,
  	color:bgGreen,
  },

  btnModal: {
  	position:'relative',
    top:3,
    width:(WIDTH-200),
    height:35,
  	padding:5,
    paddingLeft:8,
  	paddingRight:12,
  	borderBottomLeftRadius:6,
    borderBottomRightRadius:6,
  	color:dark,
  },

  btnwground: {
    position:'relative',
    padding:10,
    marginLeft:8,
    marginRight:8,
  },

  btnTopradius: {
    paddingLeft:8,
    borderTopLeftRadius:6,
    borderTopRightRadius:6,
  },

  btnfavorites: {
  	position:'absolute',
  	right:10,
  	top:5,
  	color:darklight,
  	padding:5,

  },

  btndeletetext:{
    position:'relative',
    top:0,
    right:0,
    padding:6,
    width:30,
    marginLeft:5,
  },

  bgroundGreen: {
  	backgroundColor:bgGreen,
  },

  bgGreen: {
    backgroundColor:'#4FE067',
  },
  bgroundYellow: {
  	backgroundColor:bgYellow,
  },

  bgroundBlue: {
  	backgroundColor:bgBlue,
  },

  bgroundPurpple:{
  	backgroundColor:bgPurpple,
  },

  bgroundRed:{
  	backgroundColor:bgRed,
  },

  bgroundDark: {
    backgroundColor:'#535D7C',
  },

  //styles for bar state
  bar_show_state_: {
    width:(WIDTH-35),
    flexDirection:'row',
    height:35,
    padding:5,
    paddingRight:15,
    paddingLeft:12,
    backgroundColor:white,
    backgroundColor:white,
    borderRadius:6,
    shadowOffset: {width: 13, height: 13},
    shadowRadius: 16.00,
    // android (Android +5.0)
    shadowColor:'red',
    shadowOpacity: 0.010,
    elevation:4,
    justifyContent:'space-between',
    alignContent:'center',
  },

  //styles for search bar
  search_bar:{
    height:45,
    marginBottom:15,
    borderRadius:3,
    shadowOffset: {width: 13, height: 13},
    shadowRadius: 16.00,
    // android (Android +5.0)
    shadowColor:'red',
    shadowOpacity: 0.010,
    elevation:8,
  },
  inputSearch: {
    top:-2,
    width:(WIDTH-115),
    height:38,
    marginLeft:5,
    paddingLeft:6,
  },
  textsearch: {
    color:darklight,
  },

  inputExpand: {
    width:(WIDTH-80),
  },

  container_divider: {
    width:WIDTH,
    height:82,
    left:0,
    flexDirection:'row',
    borderBottomWidth:1,
    borderBottomColor:'#e1e1e6',
  },

  container_divider_white: {
    backgroundColor:'#ffffff',
  },
  panel_left: {
    width:(WIDTH-(WIDTH-62)),
    height:81,
  },
  panel_right: {
    width:(WIDTH-62),
    height:81,
  },
  avatar:{
    top:12,
    left:8,
    width:50,
    height:50,
    borderRadius:6,
  },

  buttonorder: {
    position:'relative',
    flexDirection:'row',
    padding:2,
  },

  iconArrow: {
    marginLeft:5,
  },

  container_pie_chart: {
    position:'relative',
    marginTop:10,
    width:(WIDTH-35),
    height:200,
    backgroundColor:white,
    borderRadius:3,
    shadowOffset: {width: 13, height: 13},
    shadowRadius: 16.00,
    // android (Android +5.0)
    shadowColor:'red',
    shadowOpacity: 0.010,
    elevation:8,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
  },

  left_middle_more: {
    width:210,
    height:210,
    alignItems:'center',
    justifyContent:'center',
  },

  right_middle_more: {
    width:((WIDTH-35)-210),
    height:200,
    alignItems:'center',
    justifyContent:'center',
  },

  //styles for modal window
  containerModal : {
    width:WIDTH,
    height:HEIGHT,
    backgroundColor:'rgba(0,0,0,0.2)',
    justifyContent:'center',
    alignItems:'center',
  },

  containerOptions: {
    position:'relative',
    width:(WIDTH-170),
    height:113,
    backgroundColor:white,
    borderRadius:6,
  },

  containerOptionsExpand: {
    position:'relative',
    width:(WIDTH-120),
    height:203*0.75,
    resizeMode:'contain',
    padding:8,

  },

  containerOptionsExpandPreloader: {
    position:'absolute',
    top:'40%',
    width:(WIDTH-120),
    height:203*0.70,
    resizeMode:'contain',
    padding:8,
    borderRadius:6,
    backgroundColor:'rgba(255,255,255,0.7)',
    
  },

  containerButton: {
    position:'relative',
    flexDirection:'row',
    justifyContent:'space-between',
    width:(WIDTH-140),
    left:1,
    top:5,
  },

  //styles for input
  input_group: {
    position:'relative',
    width:(WIDTH-35),
    right:8,
    resizeMode:'contain',
    margin:'auto',
    marginBottom:10,
    flexDirection:'row',
  },

  input_text: {
    position:'relative',
    width:(WIDTH-35),
    height:47,
    padding:10,
    paddingLeft:32,
    borderWidth:2,
    borderColor:bgGreen,
    borderRadius:6,
  },

  iconInput: {
    position:'absolute',
    left:18,
    top:12,
    color: '#59f090',
  },
  //styles for panel layout left
  container_menu: {
    width:(WIDTH-62),
    //height:686
    height:HEIGHT,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  panel_top:{
    position:'relative',
    top:30,
    width:(WIDTH-62),
    height:(HEIGHT-580),
    borderBottomColor: '#f3f3f6',
    borderBottomWidth: 2,
    flex:1,
    justifyContent:'center',

  },
  panel_body:{
    position:'relative',
    top:40,
    width:(WIDTH-60),
    height:265,
    borderBottomColor: '#f3f3f6',
    borderBottomWidth: 2,
    marginBottom:20,
  },

  panel_configuration: {
    top:25,
    width: (WIDTH-60),
    height: 310,
  },
  link_navigation:{
    padding:6,
    fontSize:26,
    paddingLeft:14,
    margin:6,
    textAlign:'left',
    flexDirection:'row',
  },

  icon_link: {
    width:25,
    height:25,
  },

  link_text:{
    top:1,
    marginLeft:10,
    color:'#737373',
    fontWeight: 'bold',
    fontSize:16,
  },

  //styles for card to home
  content_card: {
    width:WIDTH,
    height:520,
    flexDirection:'row',
    flexWrap:'wrap',
    justifyContent:'center',
  },

  card: {
    top:0,
    left:10,
    width:150,
    height:160,
    backgroundColor:'#ffffff',
    borderRadius:10,
    marginBottom:25,
    marginRight:20,
    backgroundColor: '#03A9F4',
    alignItems: 'center',
    shadowOffset: {width: 13, height: 13},
    shadowOpacity: 0.58,
    shadowRadius: 16.00,

    // android (Android +5.0)
    shadowColor:'red',
    elevation: 24,
    flexDirection: 'column',
    flexWrap: 'wrap',

  },
  circle_image:{
    marginHorizontal: 'auto',
    marginLeft:35,
    marginRight:35,
    marginTop:20,
    width:75,
    height:75,
    borderRadius:100,
    backgroundColor:'#ffffff',
    alignItems:'center',
  },

  image_card:{
    top:14,
    right:5,
    marginLeft:6,
    width:45,
    height:45,
    margin:'auto',
    alignItems:'center',
  },

  title_text: {
    color:'#ffffff',
    right:5,
    top:20,
    fontWeight:'bold',
    alignItems:'center',
  },

  //estilos para el contenedor de la precarga
  container_preloader: {
    position:'relative',
    top:0,
    zIndex:2000,
    width:(WIDTH-38),
    height:330,
    backgroundColor:'rgba(255,255,255,0.6)',
    justifyContent:'center',
    alignItems:'center',
  },

  container_preloader_expand: {
    position:'absolute',
    top:80,
    left:15,
    zIndex:2000,
    width:(WIDTH-30),
    height:250,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'rgba(255,255,255,0.6)'
  },

  toast: {
    position:'absolute',
    top:30,
    padding:5,
    paddingTop:10,
    paddingBottom:10,
    paddingRight:12,
    width:(WIDTH-25),
    height:55,
    justifyContent:'center',
    alignItems:'flex-start',
    borderRadius:6,
    left:12,
    zIndex:1000,
  },
  toast_bottom: {
    position:'absolute',
    bottom:120,
    padding:5,
    paddingTop:10,
    paddingBottom:10,
    paddingRight:12,
    width:(WIDTH-25),
    height:55,
    justifyContent:'center',
    alignItems:'flex-start',
    borderRadius:6,
    left:12,
    zIndex:1000,
  },

});


export default styles;
