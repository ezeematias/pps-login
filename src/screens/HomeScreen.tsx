import { useNavigation } from '@react-navigation/core';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, KeyboardAvoidingView, Image } from 'react-native';
import { RootStackParamList } from '../../App';
import { auth } from "../database/firebase";

const HomeScreen = () => {

    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()

    function handlerSingOut() {
        auth
            .signOut()
            .then(() => {navigation.replace('Index')})
            .catch((error: any) => alert(error.message))
    }    

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding"> 
        
        <Text style={styles.textHome}>¡Welcome!</Text>
        <Text style={styles.textDescription}>We are working on a better design. Thank you very much for starting session.</Text>
        
        <View style={styles.buttonContainer} >   
                <TouchableOpacity 
                    onPress={handlerSingOut}
                    style={styles.button}
                >
                <Text style={styles.buttonText}>Sign out</Text>
                </TouchableOpacity>
            </View>                       
            <Image 
                source={require('../assets/EMU_Logo_01.png')}
                resizeMode="contain"                 
                style={styles.logo} 
            />    
        
    </KeyboardAvoidingView>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',  
        justifyContent: 'center',                         
    },
    textHome:{
        fontSize: 60,
        marginTop: 40, 
        color: '#662483',
        fontWeight: 'bold',        
    },
    textDescription:{
        fontSize: 20,
        marginTop: 100, 
        color: '#662483',
        fontWeight: 'bold',        
    },
    logo:{
        width: '50%',
        height: 100,   
        marginTop: 100,  
    },
    buttonContainer: {
        width: '80%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,        
    },
    button: {
        backgroundColor: '#662483',
        width: '100%',
        padding: 15,
        borderRadius: 8,
        marginTop: 80,
        alignItems: 'center',        
    },
    buttonOutline: {
        backgroundColor: 'white',
        marginTop: 5,
        borderColor: '#662483',
        borderWidth: 2,

    },
    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
    },
    buttonOutlineText: {
        color: '#662483',
        fontWeight: '700',
        fontSize: 16,
    },
});