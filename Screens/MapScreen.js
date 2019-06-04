import React, { Component } from 'react';
import {View, Text, StyleSheet, ImageBackground, TextInput, TouchableOpacity, Image, Animated, Dimensions, Keyboard} from 'react-native';
import { MapView, Permissions, Location } from 'expo';
import { DestinationButton } from '../components/DestinationButton'
import {CurrentLocationButton} from '../components/CurrentLocationButton'
const SCREEN_HEIGHT = Dimensions.get('window').height 

class MapScreen extends Component {

    static navigationOptions = {
        header:null
    }

    constructor(props) {
        super(props);
        this.state={
            region:null
        }
        this._getLocationAsync();
    }

    _getLocationAsync = async () => {
        let {status} = await Permissions.askAsync(Permissions.LOCATION);
        if(status!=='granted'){
            console.log("Permission to location not granted");
        }
        let location = await Location.getCurrentPositionAsync({enabledHighAccuracy:true})
        let region = {
            latitude:location.coords.latitude,
            longitude:location.coords.longitude,
            latitudeDelta:0.045,
            longitudeDelta:0.045
        }

        this.setState({region:region})

    } 

    centerMap() {
        const {latitude, longitude, latitudeDelta, longitudeDelta } = this.state.region;
        this.map.animateToRegion({
            latitude, longitude, latitudeDelta, longitudeDelta,
        })
    }
    
    render(){
        const { navigate } = this.props.navigation;
        return(
            <View
            style={styles.container}
            >
                <DestinationButton/>
                <CurrentLocationButton cb={()=>{this.centerMap()}}/>
                <MapView
                initialRegion={this.state.region}
                showsUserLocation={true}
                showsCompass={true}
                rotateEnabled={false}
                ref={(map)=>this.map=map}
                style={{flex:1}}
                />
            </View>
    
    
        );
    }
}

export default MapScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:'#fff'
    }
  });