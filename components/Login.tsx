import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Alert,
    Image,
    LayoutAnimation,
    Platform,
    UIManager,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { expressInstance } from "../helpers/axios";

// Enable LayoutAnimation on Android
if (
    Platform.OS === "android" &&
    UIManager.setLayoutAnimationEnabledExperimental
) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

const Login = () => {
    const [username, setUsername] = useState("spiderman");
    const [displayName, setDisplayName] = useState("");
    const [password, setPassword] = useState("nomay");
    const [isRegister, setIsRegister] = useState(false);
    const navigation = useNavigation();

    const handleLogin = async () => {
        try {
            const response = await expressInstance.post(
                isRegister ? "/register" : "/login",
                isRegister
                    ? { user: username, pwd: password, displayName }
                    : { user: username, pwd: password }
            );

            if (response.data.match) {
                navigation.navigate("Home" as never);
            } else {
                Alert.alert(
                    "Thông báo",
                    isRegister
                        ? "All fields are required"
                        : "Username or Password is incorrect"
                );
            }
        } catch (error) {
            Alert.alert("Error", "Something went wrong. Please try again.");
        }
    };

    const toggleForm = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setIsRegister(!isRegister);
    };

    return (
        <View style={styles.container}>
            <View>
                <Image
                    source={require("../assets/logo.jpg")}
                    style={styles.imgLogo}
                />
            </View>
            <Text style={styles.title}>
                {isRegister ? "Register" : "Log in"}
            </Text>

            {/* Username Field */}
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Username</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter your username"
                    value={username}
                    onChangeText={(text) => setUsername(text)}
                />
            </View>

            {/* Password Field */}
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Password</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter your password"
                    secureTextEntry
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                />
            </View>

            {/* Display Name Field (Only for Registration) */}
            {isRegister && (
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Display Name</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your display name"
                        value={displayName}
                        onChangeText={(text) => setDisplayName(text)}
                    />
                </View>
            )}

            {/* Submit Button */}
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>
                    {isRegister ? "Register" : "Log in"}
                </Text>
            </TouchableOpacity>

            {/* Toggle Form Button */}
            <TouchableOpacity onPress={toggleForm} style={styles.switchButton}>
                <Text style={styles.switchButtonText}>
                    {isRegister
                        ? "Already have an account? Log in"
                        : "Don't have an account? Register"}
                </Text>
            </TouchableOpacity>
        </View>
    );
};

export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
        padding: 20,
    },
    imgLogo: {
        width: 120,
        height: 120,
        marginBottom: 50,
        borderRadius: 15,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 30,
        textTransform: "uppercase",
    },
    inputContainer: {
        width: "100%",
        marginBottom: 15,
    },
    label: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 5,
        color: "#333",
    },
    input: {
        width: "100%",
        height: 50,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 10,
        paddingHorizontal: 15,
        backgroundColor: "#fff",
    },
    button: {
        width: "100%",
        height: 50,
        backgroundColor: "#6B39F4",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 10,
    },
    buttonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },
    switchButton: {
        marginTop: 10,
    },
    switchButtonText: {
        color: "#6B39F4",
        fontSize: 16,
        fontWeight: "bold",
    },
});
