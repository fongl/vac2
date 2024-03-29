import React, { Component } from 'react';
import {View, Text, StyleSheet, ImageBackground, TextInput, TouchableOpacity, Image, Animated, Dimensions, Keyboard} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {Icon} from 'native-base';

const SCREEN_HEIGHT = Dimensions.get('window').height 

class LoginScreen extends Component {
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
        this.setState({placeholderText:'9876543210'})
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
                        opacity:headerBackArrowOpacity
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
                        height:60,width:60,right:10,bottom:this.keyboardHeight,
                        opacity:this.forwardArrowOpacity,zIndex:100,backgroundColor:'#54575e',
                        alignItems:'center',justifyContent:'center',borderRadius:30
                    }}
                >
                    <Icon name='md-arrow-forward' style={{color:'white'}} onPress = {()=>navigate('ConfirmationScreen')}
                    />
                </Animated.View>

                <ImageBackground
                    source={require('../assets/vacawaybackground.jpg')}
                    style={{flex:1}}
                >
                    <View 
                    style={{flex:1,justifyContent:'center',alignItems:'center'}}
                    >
                        <View>
                        </View>
                    </View>

                {/* {Bottom Half} */}

                    <Animatable.View animation='slideInUp' iteration={1}>
                        <Animated.View
                        style={{height:this.loginHeight,backgroundColor:'white'}}
                        >
                            <Animated.View
                            style={{opacity:headerTextOpacity,alignItems:'flex-start',paddingHorizontal:25,marginTop:marginTop}}
                            >
                                <Text style={{fontSize:24}}>
                                    Get started with Vacay Away
                                </Text>
                            </Animated.View>

                            <TouchableOpacity
                                onPress= {()=>this.increaseHeightOfLogin()}
                             >
                                <Animated.View
                                style={{marginTop:marginTop,paddingHorizontal:25,flexDirection:'row'}}
                                >
                                    <Animated.Text
                                    style={{
                                        fontSize:24,color:'grey',position:'absolute',
                                        bottom:titleTextBottom,left:titleTextLeft,opacity:titleTextOpacity
                                    }}
                                    >
                                    Enter your mobile number
                                    </Animated.Text>
                                    <Image source={require('../assets/flag.png')}
                                    style={{height:24,width:24,resizeMode:'contain'}}
                                    />
                                    <Animated.View
                                    pointerEvents='none'
                                    style={{flexDirection:'row',flex:1,borderBottomWidth:this.borderBottomWidth}}
                                    >
                                        <Text style={{fontSize:20,paddingHorizontal:10}}>+1</Text> 
                                        <TextInput
                                        ref='textInputMobile'
                                        style={{flex:1,fontSize:20}}
                                        placeholder = {this.state.placeholderText}
                                        underlineColorAndroid='transparent'
                                        keyboardType='numeric'
                                        />
                                    </Animated.View>
                                </Animated.View>     
                            </TouchableOpacity>
                        </Animated.View>

                        <View
                        style={{
                            height:70,backgroundColor:'white',alignItems:'flex-start',
                            justifyContent:'center',borderTopColor:'#e8e8ec',borderTopWidth:1,paddingHorizontal:25
                        }}
                        >
                            <Text 
                            style={{color:'#5a7fdf',fontWeight:'bold',}}
                            >
                             Or connect with a social account
                            </Text>    
                        </View>
                    </Animatable.View>
                </ImageBackground>
            </View>
        );
    }
}

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems:'center',
      justifyContent:'center',
    }
  });