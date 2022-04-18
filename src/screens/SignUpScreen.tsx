import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, KeyboardAvoidingView, TextInput, TouchableOpacity, Image } from "react-native";
import { auth } from "../database/firebase";
import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { RootStackParamList } from "../../App";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Spinner from "react-native-loading-spinner-overlay/lib";

const SignScreen = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");
    const [displayName, setDisplayName] = useState("");
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

    const handlerSingUp = async () => {
        if (displayName === "" || email === "" || password === "" || rePassword === "") {
            setMessage("Todos los campos son obligatorios");
        } else if (password === rePassword) {
            setLoading(true);
            await createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential: { user: any; }) => {
                    userCredential.user
                })
                .catch(error => {
                    switch (error.code) {
                        case 'auth/invalid-email':
                            setMessage("Correo inválido");
                            break;
                        case 'auth/email-already-in-use':
                            setMessage("Correo ya registrado");
                            break;
                        case 'auth/missing-email':
                            setMessage("Correo no ingresado");
                            break;
                        case 'auth/internal-error':
                            setMessage("Ingrese contraseña");
                            break;
                        default:
                            setMessage(error.message)
                            break;
                    }
                }).finally(() => { setLoading(false) });
        } else {
            setMessage("Las contraseñas no coinciden");
        }
    }

    const handlerBack = () => {
        navigation.replace('Index');
    }

    return (
        <View style={styles.container}>
            {loading && <View style={styles.spinContainer}>
                    <Spinner
                        visible={loading}  
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
                    onPress={() => setMessage("")}
                >
                    <Text style={styles.buttonText}>{message}</Text>
                </TouchableOpacity> : null}

                <TextInput placeholder="Nombre"
                    value={displayName}
                    onChangeText={text => setDisplayName(text)}
                    style={styles.input}
                />
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
                <TextInput placeholder="Vuelva a escribir la contraseña"
                    value={rePassword}
                    onChangeText={text => setRePassword(text)}
                    style={styles.input}
                    secureTextEntry
                />
            </View>

            <View style={styles.buttonContainer} >

                <TouchableOpacity
                    onPress={handlerSingUp}
                    style={[styles.button]}
                >
                    <Text style={styles.buttonText}>Crear</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={handlerBack}
                    style={[styles.button, styles.buttonOutline]}
                >
                    <Text style={styles.buttonOutlineText}>Volver</Text>
                </TouchableOpacity>
            </View>
        </View>

    );
}

export default SignScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        width: '50%',
        height: '20%',
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
        marginTop: 20,
    },
    button: {
        backgroundColor: '#662483',
        width: '100%',
        padding: 10,
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