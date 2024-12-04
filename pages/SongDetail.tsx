import { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons/faAngleRight";
import { expressInstance } from "../helpers/axios";
import { FloatingPlayer } from "./FloatingPlayer";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

const SongDetail = ({ route, navigation }) => {
    const {
        _id,
        title,
        mainVoiceGender,
        language,
        genre,
        artistName,
        artwork,
        likes,
        createdAt,
    } = route.params.song;

    const [playlists, setPlaylists] = useState([]);

    const getAllPlaylist = async () => {
        const playlistResponse = await expressInstance.get(
            `/api/playlists/song/${_id}`
        );
        setPlaylists(playlistResponse.data.playlist);
    };

    useEffect(() => {
        getAllPlaylist();
    }, []);

    return (
        <View style={styles.container}>
            <Image source={{ uri: artwork }} style={styles.artwork} />
            <View style={styles.boxName}>
                <View style={{ flexDirection: "row" }}>
                    <Image
                        source={{ uri: artwork }}
                        style={styles.artworkAvt}
                    />
                    <View style={styles.flexLineBox}>
                        <Text style={styles.title}>{title}</Text>
                        <Text style={styles.artistName}>{artistName}</Text>
                    </View>
                </View>

                <View
                    style={{
                        paddingTop: 10,
                        borderTopColor: "#eaeaea",
                        borderTopWidth: 1,
                    }}
                >
                    <Text style={styles.detail}>
                        <Text style={styles.detailTitle}>Main Voice: </Text>
                        {mainVoiceGender.charAt(0).toUpperCase() +
                            mainVoiceGender.slice(1)}
                    </Text>
                    <Text style={styles.detail}>
                        <Text style={styles.detailTitle}>Languages: </Text>
                        {language.join(", ")}
                    </Text>
                    <Text style={styles.detail}>
                        <Text style={styles.detailTitle}>Genres: </Text>
                        {genre.join(", ")}
                    </Text>
                    <Text style={styles.detail}>
                        <Text style={styles.detailTitle}>Released: </Text>
                        {new Date(createdAt).toDateString()}
                    </Text>
                </View>
            </View>
            <View style={styles.likesContainer}>
                <View style={styles.totalLikesLabelContainer}>
                    <Text style={styles.totalLikesLabel}>Total Likes</Text>
                </View>
                <View style={styles.likesContentContainer}>
                    <Text style={styles.likesCount}>
                        {likes.toLocaleString()}
                    </Text>
                    <View style={styles.likesIconContainer}>
                        <FontAwesomeIcon
                            icon={faHeart}
                            size={20}
                            color="#FF6B6B"
                        />
                    </View>
                    <Text style={styles.likesLabel}>
                        {likes === 1 ? "Like" : "Likes"}
                    </Text>
                </View>
            </View>
            <View style={{ marginTop: 15, marginBottom: 50, paddingRight: 5 }}>
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                    }}
                >
                    <Text style={styles.text_heading}>Belongs to Playlist</Text>
                </View>
                {playlists.map((item) => (
                    <View style={styles.lineRP} key={item._id}>
                        <TouchableOpacity
                            style={styles.itemRP}
                            onPress={() => {
                                navigation.navigate("PlayListDetail" as never, {
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
            <FloatingPlayer
                style={{
                    position: "absolute",
                    left: 8,
                    right: 8,
                    bottom: 5,
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: "#f8f8f8",
    },
    artwork: {
        width: "100%",
        height: 120,
        borderRadius: 10,
        marginBottom: 20,
    },
    boxName: {
        backgroundColor: "#fff",
        marginTop: -50,
        margin: 12,
        padding: 10,
        borderRadius: 15,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 2,
    },
    artworkAvt: {
        width: 60,
        height: 60,
        borderRadius: 100,
    },
    flexLineBox: {
        width: "100%",
        padding: 10,
    },
    likesContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#F7F7F7",
        borderRadius: 15,
        padding: 10,
        marginVertical: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
    },
    totalLikesLabelContainer: {
        flex: 1,
    },
    totalLikesLabel: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
        textTransform: "uppercase",
    },
    likesContentContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    likesIconContainer: {
        marginHorizontal: 5,
    },
    likesCount: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#333",
        marginRight: 5,
    },
    likesLabel: {
        fontSize: 16,
        color: "#666",
        marginLeft: 5,
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#333",
        marginTop: -20,
        textAlign: "left",
    },
    artistName: {
        fontSize: 15,
        color: "#666",
    },
    detail: {
        fontSize: 16,
        color: "#555",
        marginBottom: 5,
    },
    detailTitle: {
        fontWeight: "bold",
        color: "#333",
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#333",
        marginTop: 20,
        marginBottom: 10,
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
    laylist_heading: {
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
    creator: {
        fontSize: 14,
        color: "#666",
    },
    songCount: {
        fontSize: 12,
        color: "#999",
    },
});

export default SongDetail;
