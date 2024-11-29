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
import { faAngleRight } from "@fortawesome/free-solid-svg-icons/faAngleRight";
import { useEffect, useState } from "react";
import { expressInstance } from "../helpers/axios";

const HomePage = ({ navigation }) => {
    const [artistList, setArtistList] = useState([]);
    const [playlists, setPlaylists] = useState([]);

    const getAllArtists = async () => {
        const artistResponse = await expressInstance.get("/api/artists");
        setArtistList(artistResponse.data.artists);
    };

    const getAllPlaylists = async () => {
        const playlistResponse = await expressInstance.get("/api/playlists");
        setPlaylists(playlistResponse.data.playlists);
    };

    useEffect(() => {
        getAllArtists();
        getAllPlaylists();
    }, []);

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
                        {artistList.map((item) => {
                            return (
                                <TouchableOpacity
                                    key={item._id}
                                    style={styles.itemtopAr}
                                    onPress={() =>
                                        navigation.navigate("ArtistDetail", {
                                            artist: item,
                                        })
                                    }
                                >
                                    <Image
                                        source={{ uri: item.imageURL }}
                                        style={styles.imageTop}
                                    />
                                    <Text
                                        style={{
                                            textAlign: "center",
                                            fontWeight: "500",
                                        }}
                                    >
                                        {item.displayName}
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

                <View
                    style={{ marginTop: 15, marginBottom: 50, paddingRight: 5 }}
                >
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                        }}
                    >
                        <Text style={styles.text_heading}>My Playlists</Text>
                        <TouchableOpacity
                            onPress={() =>
                                navigation.navigate("MyplayList", {
                                    playlists,
                                })
                            }
                        >
                            <Text style={styles.playlist_heading}>
                                Show all
                            </Text>
                        </TouchableOpacity>
                    </View>
                    {playlists.slice(0, 3).map((item) => (
                        <View style={styles.lineRP} key={item._id}>
                            <TouchableOpacity
                                style={styles.itemRP}
                                onPress={() => {
                                    navigation.navigate("PlayListDetail", {
                                        playlist: item,
                                    });
                                }}
                            >
                                <View>
                                    <Image
                                        source={{ uri: item.artwork }}
                                        style={styles.imageRP}
                                    />
                                </View>
                                <View
                                    style={{
                                        width: "100%",
                                        paddingLeft: 10,
                                        paddingRight: 90,
                                        flexDirection: "row",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                    }}
                                >
                                    <View>
                                        <Text style={styles.title}>
                                            {item.title}
                                        </Text>
                                        <Text style={styles.creator}>
                                            {item.creatorName}
                                        </Text>
                                        <Text style={styles.songCount}>
                                            {item.songCount} songs
                                        </Text>
                                    </View>
                                    <View>
                                        <FontAwesomeIcon
                                            icon={faAngleRight}
                                            size={20}
                                        />
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>
                <View style={{ paddingTop: 100 }}></View>
            </ScrollView>
        </View>
    );
};

export default HomePage;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fafafa",
    },
    text_heading: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 16,
        marginTop: 5,
    },
    playlist_heading: {
        color: "blue",
        fontWeight: "500",
        fontSize: 18,
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
        flexDirection: "column",
    },
    itemRP: {
        flexDirection: "row",
        marginTop: 15,
        borderBottomColor: "#eaeaea",
        borderBottomWidth: 1,
        paddingBottom: 15,
    },
    imageRP: {
        width: 90,
        height: 90,
        borderRadius: 10,
        opacity: 0.8,
    },
    title: {
        textAlign: "left",
        fontWeight: "600",
        fontSize: 18,
    },
    creator: {
        fontSize: 14,
        color: "#666",
    },
    songCount: {
        fontSize: 12,
        color: "#999",
    },
});
