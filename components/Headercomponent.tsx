import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
const logo = require("../assets/logo.jpg");

const Headercomponent = () => {
    return (
        <View style={styles.containerheader}>
            <Image source={logo} style={styles.img_logo} />
            <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View style={styles.borderLine}>
                    <Text>Ten nguoi dung</Text>
                </View>
                <View>
                    <Image
                        source={{ uri: "https://i.ibb.co/sVqS2Sd/4.jpg" }}
                        style={styles.avatar_img}
                    />
                </View>
            </View>
        </View>
    );
};

export default Headercomponent;

const styles = StyleSheet.create({
    containerheader: {
        width: "100%",
        // backgroundColor: "#f2f2f2",
        backgroundColor: "#fafafa",
        borderBottomColor: "#efeded",
        borderBottomWidth: 1,
        padding: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 30,
    },
    img_logo: {
        width: 40,
        height: 40,
        borderRadius: 10,
    },
    avatar_img: {
        width: 40,
        height: 40,
        marginLeft: 10,
        borderRadius: 110,
    },
    borderLine: {
        padding: 6,
        borderRadius: 100,
        borderWidth: 1,
        borderColor: "#8b8a8c",
    },
});
