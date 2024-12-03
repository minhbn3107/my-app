import { Image, StyleSheet, Text, View } from "react-native";
import {
    getStoredDisplayName,
    getStoredImageUrl,
} from "../helpers/authStorage";
import { useEffect, useState } from "react";

const HeaderComponent = () => {
    const [displayName, setDisplayName] = useState("");
    const [imageURL, setImageURL] = useState("");

    useEffect(() => {
        getStoredDisplayName().then((displayName) => {
            setDisplayName(displayName);
        }),
            getStoredImageUrl().then((imageURL) => {
                setImageURL(imageURL);
            });
    }, []);
    return (
        <View style={styles.containerheader}>
            <Image
                source={require("../assets/logo.jpg")}
                style={styles.img_logo}
            />
            <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View style={styles.borderLine}>
                    <Text>{displayName}</Text>
                </View>
                <View>
                    <Image
                        source={{ uri: imageURL || "https://ibb.co/7gY27ny" }}
                        style={styles.avatar_img}
                    />
                </View>
            </View>
        </View>
    );
};

export default HeaderComponent;

const styles = StyleSheet.create({
    containerheader: {
        width: "100%",
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
