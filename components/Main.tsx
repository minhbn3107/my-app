import { StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import React from "react";
import HeaderComponent from "./HeaderComponent";
import MenuComponent from "./MenuComponents";
import { FloatingPlayer } from "../pages/FloatingPlayer";

const Main = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <HeaderComponent />
            <StatusBar style="dark" />
            <MenuComponent navigation={navigation} />
            <FloatingPlayer
                style={{
                    position: "absolute",
                    left: 8,
                    right: 8,
                    bottom: 75,
                }}
            />
        </View>
    );
};

export default Main;

const styles = StyleSheet.create({
    container: {
        height: "100%",
        position: "relative",
    },
});
