import React, { useState, useEffect } from "react";
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
    Modal,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { expressInstance } from "../helpers/axios";
import { checkLoginStatus, saveLoginInfo } from "../helpers/authStorage";

if (
    Platform.OS === "android" &&
    UIManager.setLayoutAnimationEnabledExperimental
) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

const Login = ({ route }) => {
    const [username, setUsername] = useState("spiderman");
    const [displayName, setDisplayName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("nomay");
    const [isRegister, setIsRegister] = useState(
        route.params.isRegister || false
    );
    const [isForgetPassword, setIsForgetPassword] = useState(false);
    const [resetToken, setResetToken] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [countdown, setCountdown] = useState(0);

    const navigation = useNavigation();
    useEffect(() => {
        const verifyLoginStatus = async () => {
            const isLoggedIn = await checkLoginStatus();
            if (isLoggedIn) {
                navigation.navigate("Home" as never);
            }
        };

        verifyLoginStatus();
    }, []);

    const handleLogin = async () => {
        try {
            const response = await expressInstance.post(
                isRegister ? "/register" : "/login",
                isRegister
                    ? {
                          user: username,
                          pwd: password,
                          displayName,
                          email,
                      }
                    : { user: username, pwd: password }
            );

            if (response.data.match) {
                await saveLoginInfo(
                    response.data.foundUser._id,
                    username,
                    response.data.foundUser.displayName,
                    response.data.foundUser.imageURL
                );

                navigation.navigate("Home" as never);
            } else {
                setIsRegister(false);
            }
            setDisplayName("");
            setEmail("");
            setPassword("");
            setUsername("");
        } catch (error) {
            Alert.alert("Error", "Something went wrong. Please try again.");
        }
    };

    const toggleForm = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setIsRegister(!isRegister);
        setDisplayName("");
        setEmail("");
        setPassword("");
        setUsername("");
    };

    useEffect(() => {
        let timer: NodeJS.Timeout | null = null;
        if (countdown > 0) {
            timer = setTimeout(() => setCountdown(countdown - 1), 1000);
        }
        return () => {
            if (timer) clearTimeout(timer);
        };
    }, [countdown]);

    const handleSendResetEmail = async () => {
        try {
            await expressInstance.post("/api/users/send-email", {
                email,
                token: Math.random().toString().slice(2, 8),
            });
            setCountdown(30);
            Alert.alert("Success", "Reset token sent to your email");
        } catch (error) {
            Alert.alert("Error", "Failed to send reset email");
        }
    };

    const handleResetPassword = async () => {
        if (!email || !resetToken || !newPassword) {
            Alert.alert("Error", "Please fill all fields");
            return;
        }

        try {
            await expressInstance.post("/api/users/reset-password", {
                email,
                newPassword,
            });
            Alert.alert("Success", "Password reset successful");
            setIsForgetPassword(false);
            resetFields();
        } catch (error) {
            Alert.alert("Error", "Failed to reset password");
        }
    };

    const resetFields = () => {
        setEmail("");
        setResetToken("");
        setNewPassword("");
        setCountdown(0);
    };

    const renderForgetPasswordModal = () => (
        <Modal
            animationType="slide"
            transparent={true}
            visible={isForgetPassword}
            onRequestClose={() => setIsForgetPassword(false)}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.title}>Reset Password</Text>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Email</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter your email"
                            keyboardType="email-address"
                            autoCapitalize="none"
                            value={email}
                            onChangeText={(text) => setEmail(text)}
                        />
                    </View>

                    <TouchableOpacity
                        style={[
                            styles.button,
                            countdown > 0 && styles.disabledButton,
                        ]}
                        onPress={handleSendResetEmail}
                        disabled={countdown > 0}
                    >
                        <Text style={styles.buttonText}>
                            {countdown > 0
                                ? `Resend in ${countdown}s`
                                : "Send Reset Token"}
                        </Text>
                    </TouchableOpacity>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Reset Token</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter reset token"
                            value={resetToken}
                            onChangeText={(text) => setResetToken(text)}
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>New Password</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter new password"
                            secureTextEntry
                            value={newPassword}
                            onChangeText={(text) => setNewPassword(text)}
                        />
                    </View>

                    <TouchableOpacity
                        style={[
                            styles.button,
                            (!email || !resetToken || !newPassword) &&
                                styles.disabledButton,
                        ]}
                        onPress={handleResetPassword}
                        disabled={!email || !resetToken || !newPassword}
                    >
                        <Text style={styles.buttonText}>Reset Password</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.switchButton}
                        onPress={() => setIsForgetPassword(false)}
                    >
                        <Text style={styles.switchButtonText}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );

    return (
        <View style={styles.container}>
            {renderForgetPasswordModal()}
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

            {/* Email Field (Only for Registration) */}
            {isRegister && (
                <>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Email</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter your email"
                            keyboardType="email-address"
                            autoCapitalize="none"
                            value={email}
                            onChangeText={(text) => setEmail(text)}
                        />
                    </View>

                    {/* Display Name Field */}
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Display Name</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter your display name"
                            value={displayName}
                            onChangeText={(text) => setDisplayName(text)}
                        />
                    </View>
                </>
            )}

            {/* Submit Button */}
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>
                    {isRegister ? "Register" : "Log in"}
                </Text>
            </TouchableOpacity>

            {!isRegister && (
                <TouchableOpacity
                    onPress={() => setIsForgetPassword(true)}
                    style={styles.forgetPasswordButton}
                >
                    <Text style={styles.forgetPasswordText}>
                        Forget Password?
                    </Text>
                </TouchableOpacity>
            )}

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
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.5)",
    },
    modalContent: {
        width: "90%",
        backgroundColor: "#fff",
        borderRadius: 20,
        padding: 20,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    forgetPasswordButton: {
        marginTop: 10,
    },
    forgetPasswordText: {
        color: "#6B39F4",
        fontSize: 16,
        fontWeight: "bold",
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
    disabledButton: {
        backgroundColor: "#A0A0A0",
    },
});
