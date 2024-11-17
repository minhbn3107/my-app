import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCirclePlay } from "@fortawesome/free-solid-svg-icons/faCirclePlay";

const ARRAY_LIST_TOP_ARTIST = [
    {
        id: 1,
        image: "https://i.ibb.co/4MHWXDR/1.jpg",
        name: "Khalid",
    },
    {
        id: 2,
        image: "https://i.ibb.co/sVqS2Sd/4.jpg",
        name: "Jun Belend",
    },
    {
        id: 3,
        image: "https://i.ibb.co/4Z3WfmH/2.jpg",
        name: "Para Moule",
    },
    {
        id: 4,
        image: "https://i.ibb.co/qYdWKbP/6.jpg",
        name: "Para Moule",
    },
    {
        id: 5,
        image: "https://i.ibb.co/nrmJH8F/5.jpg",
        name: "Para Moule",
    },
];

const HomePage = () => {
    return (
        <View style={styles.container}>
            <ScrollView style={{ padding: 10 }}>
                <View>
                    <Text style={styles.text_heading}>TOP Artist</Text>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        style={styles.lineTopAr}
                    >
                        {ARRAY_LIST_TOP_ARTIST.map((item) => {
                            return (
                                <TouchableOpacity
                                    key={item.id}
                                    style={styles.itemtopAr}
                                >
                                    <Image
                                        source={{ uri: item.image }}
                                        style={styles.imageTop}
                                    />
                                    <Text
                                        style={{
                                            textAlign: "center",
                                            fontWeight: "500",
                                        }}
                                    >
                                        {item.name}
                                    </Text>
                                </TouchableOpacity>
                            );
                        })}
                    </ScrollView>
                </View>
                <View style={{ marginTop: 15 }}>
                    <Text style={styles.text_heading}>New Album</Text>
                    <View style={{ position: "relative" }}>
                        <Image
                            source={{
                                uri: "https://i.ibb.co/8rn2GGf/new-ab1.webp",
                            }}
                            style={styles.imgnewAb}
                        />
                        <View
                            style={{
                                height: "100%",
                                position: "absolute",
                                top: 0,
                                justifyContent: "flex-end",
                            }}
                        >
                            <View
                                style={{
                                    width: "100%",
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    padding: 15,
                                }}
                            >
                                <View>
                                    <Text
                                        style={{
                                            fontSize: 17,
                                            fontWeight: "500",
                                            color: "#fff",
                                        }}
                                    >
                                        Listen to best music today
                                    </Text>
                                    <Text
                                        style={{
                                            fontSize: 15,
                                            fontWeight: "500",
                                            color: "#fff",
                                        }}
                                    >
                                        12.00 - 114.00 MB
                                    </Text>
                                </View>
                                <View>
                                    <TouchableOpacity style={styles.btnPlay}>
                                        <FontAwesomeIcon icon={faCirclePlay} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>

                <View style={{ marginTop: 15 }}>
                    <Text style={styles.text_heading}>Recently Played</Text>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        style={styles.lineRP}
                    >
                        {ARRAY_LIST_TOP_ARTIST.map((item) => {
                            return (
                                <View key={item.id} style={styles.itemRP}>
                                    <Image
                                        source={{ uri: item.image }}
                                        style={styles.imageRP}
                                    />
                                    <Text
                                        style={{
                                            textAlign: "left",
                                            fontWeight: "600",
                                            fontSize: 16,
                                        }}
                                    >
                                        {item.name}
                                    </Text>
                                    <View
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                            position: "absolute",
                                            top: 0,
                                            justifyContent: "center",
                                            alignItems: "center",
                                        }}
                                    >
                                        <TouchableOpacity
                                            style={styles.btnPlay}
                                        >
                                            <FontAwesomeIcon
                                                icon={faCirclePlay}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            );
                        })}
                    </ScrollView>
                </View>

                <View style={{ marginTop: 15, marginBottom: 99 }}>
                    <Text style={styles.text_heading}>Active Played</Text>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        style={styles.lineRP}
                    >
                        {ARRAY_LIST_TOP_ARTIST.map((item) => {
                            return (
                                <View key={item.id} style={styles.itemRP}>
                                    <Image
                                        source={{ uri: item.image }}
                                        style={styles.imageRP}
                                    />
                                    <Text
                                        style={{
                                            textAlign: "left",
                                            fontWeight: "600",
                                            fontSize: 16,
                                        }}
                                    >
                                        {item.name}
                                    </Text>
                                    <View
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                            position: "absolute",
                                            top: 0,
                                            justifyContent: "center",
                                            alignItems: "center",
                                        }}
                                    >
                                        <TouchableOpacity
                                            style={styles.btnPlay}
                                        >
                                            <FontAwesomeIcon
                                                icon={faCirclePlay}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            );
                        })}
                    </ScrollView>
                </View>
            </ScrollView>
        </View>
    );
};

export default HomePage;

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        backgroundColor: "#fafafa",
    },
    text_heading: {
        fontSize: 19,
        fontWeight: "600",
        marginTop: 10,
    },

    lineTopAr: {
        flexDirection: "row",
    },
    itemtopAr: {
        margin: 10,
    },
    imageTop: {
        width: 60,
        height: 60,
        borderRadius: 100,
    },

    imgnewAb: {
        width: "100%",
        height: 160,
        objectFit: "cover",
        borderRadius: 15,
        marginTop: 10,
        opacity: 0.9,
    },

    btnPlay: {
        width: 45,
        height: 45,
        padding: 9,
        backgroundColor: "#fff",
        borderRadius: 100,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 2,
    },

    lineRP: {
        flexDirection: "row",
    },
    itemRP: {
        marginRight: 15,
        marginTop: 15,
        position: "relative",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 2,
    },

    imageRP: {
        width: 110,
        height: 110,
        borderRadius: 15,
        opacity: 0.8,
    },
});
