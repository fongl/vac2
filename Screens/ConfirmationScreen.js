import React, { Component } from 'react';
import {View, Text, StyleSheet, ImageBackground, TextInput, TouchableOpacity, Image, Animated, Dimensions, Keyboard} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {Icon} from 'native-base';
import CodeInput from 'react-native-confirmation-code-input';

const SCREEN_HEIGHT = Dimensions.get('window').height 

class ConfirmationScreen extends Component {
    static navigationOptions = {
        header:null
    }

    constructor(){
        super()
        this.state = {placeholderText: 'Enter your mobile number'}
    }

    componentWillMount(){

        this.loginHeight = new Animated.Value(150)
        this.keyboardWillShowListener = Keyboard.addListener('keyboardWillShow',this.keyboardWillShow)
        this.keyboardWillHideListener = Keyboard.addListener('keyboardWillHide',this.keyboardWillHide)

        this.keyboardHeight = new Animated.Value(0)
        this.forwardArrowOpacity = new Animated.Value(0)
        this.borderBottomWidth = new Animated.Value(0)

    }
     
    keyboardWillShow = (event)=> {
        Animated.parallel([
            Animated.timing(this.keyboardHeight, {
                duration:event.duration+100,
                toValue:event.endCoordinates.height+10
            }),
            Animated.timing(this.forwardArrowOpacity, {
                duration:event.duration,
                toValue:1
            }),
            Animated.timing(this.borderBottomWidth, {
                duration:event.duration,
                toValue:1
            })
        ]).start()
    }
 
    keyboardWillHide = (event)=> {
        Animated.parallel([
            Animated.timing(this.keyboardHeight, {
                duration:event.duration+100,
                toValue:0 
            }),
            Animated.timing(this.forwardArrowOpacity, {
                duration:event.duration,
                toValue:0
            }),
            Animated.timing(this.borderBottomWidth, {
                duration:event.duration,
                toValue:0
            })
        ]).start()
    }

    increaseHeightOfLogin = () => {
        this.setState({placeholderText:''})
        Animated.timing(this.loginHeight,{
            toValue:SCREEN_HEIGHT,
            duratio:500
        }).start(()=>{
            this.refs.textInputMobile.focus()
        })
    }

    decreaseHeightOfLogin = () => {
        Keyboard.dismiss()
        Animated.timing(this.loginHeight,{
            toValue:150,
            duratio:500
        }).start()
    }

    render(){

        const headerTextOpacity = this.loginHeight.interpolate({
            inputRange:[150,SCREEN_HEIGHT],
            outputRange:[1,0]
        })

        const marginTop = this.loginHeight.interpolate({
            inputRange:[150,SCREEN_HEIGHT],
            outputRange:[25,100]
        })

        const headerBackArrowOpacity = this.loginHeight.interpolate({
            inputRange:[150,SCREEN_HEIGHT],
            outputRange:[0,1]
        })

        const titleTextLeft = this.loginHeight.interpolate({
            inputRange:[150,SCREEN_HEIGHT],
            outputRange:[100,25]
        })

        const titleTextBottom = this.loginHeight.interpolate({
            inputRange:[150,400,SCREEN_HEIGHT],
            outputRange:[0,0,100]
        })

        const titleTextOpacity = this.loginHeight.interpolate({
            inputRange:[150,SCREEN_HEIGHT],
            outputRange:[0,1]
        })

        const { navigate } = this.props.navigation;

        return(
            <View style={{flex:1}}>

                <Animated.View
                    style={{
                        position:'absolute',
                        height:60,width:60,top:60,left:25,zIndex:100,
                        opacity:1
                    }}
                >
                    <TouchableOpacity
                        onPress = {()=>this.decreaseHeightOfLogin()}
                    >
                        <Icon name="md-arrow-back" style={{color:'black'}}/>
                    </TouchableOpacity>
                </Animated.View>
                
                <Animated.View
                    style={{
                        position:'absolute',
                        height:60,width:60,right:10,bottom:20,
                        opacity:1,zIndex:100,backgroundColor:'#54575e',
                        alignItems:'center',justifyContent:'center',borderRadius:30
                    }}
                >
                <TouchableOpacity>
                    <Icon name='md-arrow-forward' style={{color:'white'}} onPress = {()=>navigate('MapScreen')}
                    />
                </TouchableOpacity>
                </Animated.View>
                    <Animated.View
                        style={{marginTop:marginTop,paddingHorizontal:25,flexDirection:'row'}}
                    >
                        <Animated.Text
                            style={{
                                fontSize:18,color:'grey',position:'absolute',
                                top:100,left:25,opacity:1
                                }}
                            >
                        Enter the 4 digit code sent to your phone
                        </Animated.Text>
                                    
                    </Animated.View>     
                

                    

                {/* {Bottom Half} */}

                <View>
                    <CodeInput
                    ref="codeInputRef2"
                    codeLength={4}
                    compareWithCode='1234'
                    activeColor='rgba(0, 0, 0, 1)'
                    inactiveColor='rgba(0, 0, 0, 0.3)'
                    autoFocus={false}
                    ignoreCase={true}
                    inputPosition='center'
                    size={50}
                    onFulfill={()=>navigate('TestScreen')}
                    containerStyle={{ marginTop: '38%' }}
                    codeInputStyle={{ borderWidth: 2.5 }}
                    keyboardType='numeric'
                    />
                    <View
                    style={{position:'absolute',top:'200%' }}
                    >
                    </View>
                </View>

            </View>
            
        );
    }
}

export default ConfirmationScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems:'center',
      justifyContent:'center',
    }
  });