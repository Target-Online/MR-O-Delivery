import { Body, Button, H1, Header, Left, Right, Text, View } from 'native-base';
import * as React from 'react';
import { Image, TouchableOpacity as Btn, TextStyle, SafeAreaView, ScrollView, BackHandler, StyleSheet } from 'react-native';
import {Ionicons} from '@expo/vector-icons'
import { StackScreenProps } from '@react-navigation/stack/lib/typescript/src/types';

interface IProps {
  title?: string;
  children: React.ReactNode;
  subtitle?: string;
  noMargin?: boolean;
  contentPadding?: string | number;
  noShadow?: boolean;
  right?: React.ReactNode;
  noHeader?: boolean;
  scroll?: boolean;
  backRoute?: string;
  onBackPress?: () => void;
  enableBack?: boolean;
  totalProducts?: Number;
  accordion_data?: any;
  styledTitle?: TextStyle;
  offsetNumber?: number | null;
  onEndReached?: () => void;
  onScroll?: () => void;
}
const shadow =  {
  shadowColor: '#000000',
  shadowOpacity: 0.05,
  shadowRadius: 4,
  shadowOffset: {
    height: 8
  },
  elevation: 8
}

type Props = IProps &  StackScreenProps<{navigation : any}>;

interface IState {
  filterListActive?: boolean;
  specials_search?: boolean;
  xsave_search?: boolean;
  border?: boolean;
}

class BackScreen extends React.Component<Props, IState> {
  state = {
    filterListActive: true,
    accordion_data: null,
    specials_search: false,
    xsave_search: false,
    border: false
  };
  constructor(props: Props) {
    super(props);
  }

  componentWillMount(){
    BackHandler.addEventListener('hardwareBackPress', this.back_Button_Press);
    
  }
  componentWillUnmount(){

    BackHandler.removeEventListener('hardwareBackPress', this.back_Button_Press);
  }

  back_Button_Press = () => {
    this.navigateBack()
  }

  navigateBack(){
    const {onBackPress , navigation} = this.props
    if (onBackPress) {
      return onBackPress();
    }
    else if (navigation){
        navigation.goBack() // === A navigation service
    }
  }

  handleScroll = (event: any) => {
    if (
      event.nativeEvent!.contentOffset.y > this.props.offsetNumber! &&
      !this.state.border
    ) {
      this.setState({ border: true });
    } else if (
      event.nativeEvent!.contentOffset.y < this.props.offsetNumber! &&
      this.state.border
    ) {
      this.setState({ border: false });
    }
  };

  render() {
    
    const {onBackPress ,title, children,scroll } = this.props

    return (
      <SafeAreaView style={{flex : 1}}>
        <View style={styles.topBarStyles}>
                <Btn style={styles.backBtnStyle} onPress={()=> this.navigateBack()}>
                  <Ionicons name="md-arrow-round-back" color="#000" style={{fontSize : 24, fontWeight : "600"}} size={24} />
                </Btn>
                <View style={{alignItems : "center"}}>
                  <Text style={{fontSize : 16, fontWeight : "600"}}>{title}</Text>
                </View>
                <Btn style={styles.backBtnStyle} onPress={()=>{}} />
        </View>
        <ScrollView scrollEnabled={scroll} >
            {children}
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default (BackScreen);


const styles = StyleSheet.create({
    activeTextStyle:{
        color : 'red'
    },
    topBarStyles : { 
      width: "100%",justifyContent : "space-between", 
      alignSelf : "center",alignItems : "center",
      backgroundColor : "#fff", height : 56,paddingHorizontal : 16,
      flexDirection : "row", ...shadow
    },
    backBtnStyle:{
      width : 30,height: 30
    },
    addressResultsItem : { 
      height :  54, borderBottomColor : "rgba(0,0,0,0.09)", 
      borderBottomWidth :  0.5, flexDirection : "row",
      alignItems : "center",
    },
    addressInputWrapper: { 
      height : 38, flex :0, 
      backgroundColor : "rgba(0,0,0,0.04)",
      borderRadius : 2  ,paddingVertical : 0
    },
    addressInput : { 
      flex : 1 ,
      fontSize :  14, height: "100%",
      textAlignVertical : "center"
    },
    textAreaStyles:{
      flex : 1, height : 243, borderRadius : 8,paddingVertical: 16,
      flexDirection : "row",backgroundColor : "rgba(0,0,0,0.035)",
      alignItems:"center" ,borderWidth : 2, borderColor: "#f9f9f9", 
      paddingHorizontal : 16 
    },
    container: {
      flex : 1 ,
      paddingTop : 42,
      backgroundColor : "#FEFEFE", 
      paddingHorizontal : 24,
      paddingVertical : 36,
      alignItems : "center"
    },
    btnStyle:{ 
      width: 250, height: 86,
      borderRadius: 3,
      backgroundColor :"#fff",alignItems : "center",
      justifyContent : "flex-start", 
      flexDirection : "row",
      paddingHorizontal : 24 
    },
    tabStyle : {backgroundColor : 'white'}
  
  })

 
