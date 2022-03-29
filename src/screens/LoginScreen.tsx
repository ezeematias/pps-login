import { useNavigation } from "@react-navigation/core";
import React, { useEffect } from "react";
import { View, Text, StyleSheet, KeyboardAvoidingView, TextInput, TouchableOpacity, Image } from "react-native";
import { auth } from "../database/firebase";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { RootStackParamList } from "../../App";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

const LoginScreen = () => {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()

     useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {             
            if(user) {
                navigation.replace('Home');
            }
        })

        return unsubscribe;
    }, []); 

    const handlerLogin = async () => { 
        await signInWithEmailAndPassword(auth, email, password)
        .then((userCredential: { user: any; })  => {
            const user = userCredential.user;
            console.log("Logged in with", user.email);
        })
        .catch(error => {   
            switch (error.code) { 
                case 'auth/invalid-email':
                    alert('Invalid email')
                    break;                  
                case 'auth/user-not-found':
                    alert('User not found')
                    break;                
                case 'auth/wrong-password':
                    alert('Wrong password')
                    break;
                case 'auth/internal-error':
                    alert('Enter password')
                    break;
                default:
                    alert(error.message)  
                    break; 
            }
        })        
    }

    const handlerBack = () => {  
        navigation.replace('Index');
    }

    return (   
        <KeyboardAvoidingView style={styles.container} behavior="padding"> 
            <Image 
                source={require('../assets/EMU_Logo_01.png')}
                resizeMode="contain"                 
                style={styles.logo} 
            />    

            <View style= {styles.inputContainer}>  
                <TextInput  placeholder="Email"                
                value={email}
                onChangeText={text => setEmail(text)}
                style={styles.input}                
                />

                <TextInput  placeholder="Password"                               
                value={password}                
                onChangeText={text => setPassword(text)}
                    style={styles.input}
                    secureTextEntry
                />
            </View>

            <View style={styles.buttonContainer} >   
                <TouchableOpacity
                    onPress={handlerLogin}                   

                    style={styles.button}
                    >
                    <Text style={styles.buttonText}>Sign In</Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                    onPress={handlerBack}
                    style={[styles.button, styles.buttonOutline]}
                    >
                    <Text style={styles.buttonOutlineText}>Back</Text>
                </TouchableOpacity>
            </View>              
        </KeyboardAvoidingView> 
         
    );
}
        
export default LoginScreen

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
    inputContainer: {
        width: '80%',
        marginTop: 40,      

    },
    input: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 8,
        marginTop: 10,        
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