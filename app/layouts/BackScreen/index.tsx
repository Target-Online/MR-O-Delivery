import { Text, View } from 'native-base';
import * as React from 'react';
import { TouchableOpacity as Btn, SafeAreaView , BackHandler, StyleSheet } from 'react-native';
import {Ionicons} from '@expo/vector-icons'
import { StackScreenProps } from '@react-navigation/stack/lib/typescript/src/types';
import {KeyboardAvoidingScrollView} from 'react-native-keyboard-avoiding-scroll-view';
import shadow from 'utils/shadow';

interface IProps {
  title?: string;
  children: React.ReactNode;
  scroll?: boolean;
  onBackPress?: () => void;
}

type Props = IProps &  StackScreenProps<{navigation : any}>;

class BackScreen extends React.Component<Props> {
 
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
        navigation.goBack()
    }
  }

  render() {
    const {title, children,scroll } = this.props

    return (
      <SafeAreaView style={{flex : 1 , backgroundColor : "white"}}>
        <View style={styles.topBarStyles}>
          <Btn style={styles.backBtnStyle} onPress={()=> this.navigateBack()}>
            <Ionicons name="md-arrow-round-back" color="#000" style={styles.backIcon} size={24} />
          </Btn>
          <View style={{alignItems : "center"}}>
            <Text style={styles.pageTitle}>{title}</Text>
          </View>
          <Btn style={styles.backBtnStyle} onPress={()=>{}} />
        </View>
        <KeyboardAvoidingScrollView 
          showsVerticalScrollIndicator={false}
          scrollEnabled={scroll} 
        >
          {children}
        </KeyboardAvoidingScrollView>
      </SafeAreaView>
    );
  }
}

export default (BackScreen);

const styles = StyleSheet.create({
    activeTextStyle:{
        color : 'red'
    },
    pageTitle: {
      fontSize : 16, fontWeight : "600"
    },
    topBarStyles : { 
      width: "100%",justifyContent : "space-between", 
      alignSelf : "center",alignItems : "center",
      backgroundColor : "#fff", height : 56,paddingHorizontal : 16,
      flexDirection : "row", ...shadow, shadowOffset : {height : 10 , width : 0}
    },
    backBtnStyle:{
      width : 30,height: 30
    },
    backIcon: {
      fontSize : 24, fontWeight : "600"
    },
})