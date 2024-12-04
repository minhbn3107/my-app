import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect } from "react";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { checkLoginStatus } from "../helpers/authStorage";

type RootStackParamList = {
    Login: { isRegister: boolean };
};

const LaunchScreen = () => {
    const router = useNavigation<NavigationProp<RootStackParamList>>();
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

    const handleNavigation = (isRegister: boolean = false) => {
        router.navigate("Login", { isRegister });
    };
    return (
        <View style={styles.container}>
            <Image source={require("../assets/anh_1.jpg")} style={styles.img} />
            <View style={styles.boxContainer}>
                <View>
                    <Text style={styles.colorText}>YOUR MUSIC</Text>
                    <Text style={[styles.colorText, { marginBottom: 70 }]}>
                        YOU ARTISTS
                    </Text>
                    <TouchableOpacity onPress={() => handleNavigation(true)}>
                        <Text style={[styles.textBtn, styles.bgrCr]}>
                            Create an account
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleNavigation()}>
                        <Text style={[styles.textBtn, styles.bgrRg]}>
                            I already have an account
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default LaunchScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: "relative",
    },
    boxContainer: {
        width: "100%",
        height: "100%",
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: 1,
        alignItems: "center",
        justifyContent: "flex-end",
    },
    img: {
        objectFit: "contain",
    },
    colorText: {
        fontSize: 40,
        color: "#fff",
        textAlign: "center",
    },
    textBtn: {
        padding: 15,
        borderRadius: 30,
        backgroundColor: "#171A1F",
        margin: 15,
        marginBottom: 20,
        fontSize: 15,
        textAlign: "center",
        fontWeight: "500",
    },
    bgrCr: {
        backgroundColor: "#EBFDFF",
        color: "blue",
    },
    bgrRg: {
        color: "#fff",
    },
});
