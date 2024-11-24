import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

const logo = require("../assets/logo.jpg");

const PageLogin = () => {
    const [username, setUsername] = useState("test");
    const [password, setPassword] = useState("");
    const navigation = useNavigation();

    const validUsers = [
        { username: "test", password: "123" },
        { username: "test1", password: "password123" },
    ];

    const handleLogin = () => {
        const isValid = validUsers.some(
            (user) => user.username === username && user.password === password
        );
        if (isValid) {
            navigation.navigate("Home");
        } else {
            Alert.alert("Thông báo", "Username hoặc mật khẩu không đúng!");
        }
    };

    return (
        <View style={styles.container}>

            <View>
                <Image source={logo} style={styles.imgLogo}/>
            </View>
            <Text style={styles.title}>Đăng nhập</Text>
            <TextInput
                style={styles.input}
                placeholder="Username"
                value={username}
                onChangeText={(text) => setUsername(text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Mật khẩu"
                secureTextEntry
                value={password}
                onChangeText={(text) => setPassword(text)}
            />
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Đăng nhập</Text>
            </TouchableOpacity>
        </View>
    );
};

export default PageLogin;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
        padding: 20,
    },
    imgLogo:{
        width:120,
        height:120,
        marginBottom:50,
        borderRadius:15
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 30,
        textTransform:"uppercase"
    },
    input: {
        width: "100%",
        height: 50,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 10,
        paddingHorizontal: 15,
        marginBottom: 15,
        backgroundColor: "#fff",
    },
    button: {
        width: "100%",
        height: 50,
        backgroundColor: "#6B39F4",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    buttonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },
});
