import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, KeyboardAvoidingView, TextInput, TouchableOpacity, Image, SafeAreaView } from "react-native";
import { auth } from "../database/firebase";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { RootStackParamList } from "../../App";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Spinner from "react-native-loading-spinner-overlay/lib";

const LoginScreen = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                navigation.replace('Home');
            }
        })
        return unsubscribe;
    }, []);

    const handlerLogin = async () => {
        setLoading(true);
        await signInWithEmailAndPassword(auth, email, password)
            .then((userCredential: { user: any; }) => {
                const user = userCredential.user;
                console.log("Logged in with", user.email);
            })
            .catch(error => {
                switch (error.code) {
                    case 'auth/invalid-email':
                    case 'auth/user-not-found':
                    case 'auth/wrong-password':
                    case 'auth/internal-error':
                    case 'auth/too-many-requests':
                        setMessage("Credenciales inválidas");
                        break;
                    default:
                        setMessage(error.message)
                        break;
                }
            }).finally(() => { setLoading(false) });
    }

    const guestLogin = () => {
        setEmail("invitado@gmail.com");
        setPassword("123456");
    }

    const adminLogin = () => {
        setEmail("admin@gmail.com");
        setPassword("123456");
    }

    const supplierLogin = () => {
        setEmail("proveedores@gmail.com");
        setPassword("123456");
    }

    const handlerBack = () => {
        navigation.replace('Index');
    }

    return (
        
        <KeyboardAvoidingView style={styles.container} behavior="padding">
                {loading && <View style={styles.spinContainer}>
                    <Spinner
                        visible={loading}
                        textContent={'Loading...'}
                        textStyle={styles.spinnerTextStyle}
                    />
                </View>}
                <Image
                    source={require('../assets/EMU_Logo_01.png')}
                    resizeMode="contain"
                    style={styles.logo}
                />

                <View style={styles.inputContainer}>
                    {!!message ? <TouchableOpacity
                        style={styles.buttonError}
                    >
                        <Text style={styles.buttonText}>{message}</Text>
                    </TouchableOpacity> : null}

                    <TextInput placeholder="Correo electrónico"
                        value={email}
                        onChangeText={text => setEmail(text)}
                        style={styles.input}
                    />

                    <TextInput placeholder="Contraseña"
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
                        <Text style={styles.buttonText}>Iniciar Sesión</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={handlerBack}
                        style={[styles.button, styles.buttonOutline]}
                    >
                        <Text style={styles.buttonOutlineText}>Volver</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.buttonContainer} >
                    <TouchableOpacity
                        onPress={guestLogin}
                        style={[styles.buttonRole, styles.buttonOutlineRole]}
                    >
                        <Text style={styles.buttonOutlineTextRole}>Invitado</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={adminLogin}
                        style={[styles.buttonRole, styles.buttonOutlineRole]}
                    >
                        <Text style={styles.buttonOutlineTextRole}>Administrador</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={supplierLogin}
                        style={[styles.buttonRole, styles.buttonOutlineRole]}
                    >
                        <Text style={styles.buttonOutlineTextRole}>Proveedores</Text>
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
    logo: {
        width: '100%',
        height: 250,
    },
    inputContainer: {
        width: '80%',
        marginTop: 10,
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
    buttonRole: {
        backgroundColor: '#662483',
        width: '100%',
        padding: 5,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonError: {
        backgroundColor: 'red',
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
    buttonOutlineRole: {
        backgroundColor: 'white',
        marginTop: 5,
        borderColor: '#e31773',
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
    buttonOutlineTextRole: {
        color: '#e31773',
        fontWeight: '700',
        fontSize: 16,
    },
    spinnerTextStyle: {
        color: 'white',
    },
    spinContainer: {
        position: 'absolute',
        display: 'flex',
        backgroundColor: 'rgba(0,0,0,0.5)',
        alignItems: 'center',
        justifyContent: 'center',
        top: 0,
        height: '100%',
        width: '100%',
        zIndex: 100,
    },
})