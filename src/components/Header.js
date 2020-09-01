import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View, FlatList,TouchableOpacity } from 'react-native';


const styles = StyleSheet.create({
    container:{
        height:100,
        marginTop:50,
        marginBottom:20,
    },
title:{
   
    fontSize:50,
    color:'black',
}
});

class Header extends Component {
    render() {
        return (


            <View style={styles.container}>
               <Text style={styles.title}>Shopping Cart</Text>
            </View>



        );
    }
}
export default Header;