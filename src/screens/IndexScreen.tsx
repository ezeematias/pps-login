import { useNavigation } from "@react-navigation/core";
import React from "react";
import { View, Text, StyleSheet, KeyboardAvoidingView, TouchableOpacity, Image } from "react-native";

import { RootStackParamList } from "../../App";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

const IndexScreen = () => {

    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()


    const handlerSignUp = () => {  
        navigation.replace('SignUp');
    }

    const handlerSingIn = () => {
        navigation.replace('Login');
    }

    return (   
        <KeyboardAvoidingView style={styles.container} behavior="padding"> 
            <Image 
                source={require('../assets/EMU_Logo_01.png')}
                resizeMode="contain"                 
                style={styles.logo} 
            />   

            <View style={styles.buttonContainer} >   
                <TouchableOpacity
                    onPress={handlerSingIn}                   

                    style={styles.button}
                    >
                    <Text style={styles.buttonText}>Iniciar Sesión</Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                    onPress={handlerSignUp}
                    style={[styles.button, styles.buttonOutline]}
                    >
                    <Text style={styles.buttonOutlineText}>Registrarse</Text>
                </TouchableOpacity>
            </View>              
        </KeyboardAvoidingView> 
         
    );
}
        
export default IndexScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',  
        justifyContent: 'center',                         
    },
    logo:{
        width: '100%',
        height: 250, 
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
})