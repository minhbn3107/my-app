import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    Switch,
    ScrollView,
} from "react-native";


import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

import { faAngleRight } from "@fortawesome/free-solid-svg-icons/faAngleRight";

import { expressInstance } from "../helpers/axios";



const songData = {
    url: "https://example.com/song.mp3",
    title: "Song Title",
    mainVoiceGender: "male",
    language: ["English", "Spanish"],
    genre: ["Pop", "Rock"],
    artistName: "John Doe",
    artwork: "https://i.ibb.co/4MHWXDR/1.jpg",
    playlists: [
        { playlistId: "1", playlistName: "Favorites" },
        { playlistId: "2", playlistName: "Workout" },
    ],
    likes: 120,
    createdAt: "2024-12-01T00:00:00.000Z",
};




const ProfilePage = ({ navigation }) => {
    const [playlists, setPlaylists] = useState([]);

    const getAllPlaylists = async () => {
        const playlistResponse = await expressInstance.get("/api/playlists");
        setPlaylists(playlistResponse.data.playlists);
    };

    useEffect(() => {
        getAllPlaylists();
    }, []);

    return (
        <ScrollView style={styles.container}>
            <View style={{ paddingBottom: 100 }}>
                <View style={styles.profileSection}>
                    <View>
                        <Image
                            source={{ uri: "https://i.ibb.co/sVqS2Sd/4.jpg" }}
                            style={styles.avatar}
                        />
                        <Text style={styles.name}>NGUYEN PHONG</Text>
                        <Text style={styles.email}>@phong5555</Text>
                    </View>
                    <View style={{ justifyContent: "center", alignItems: "center" }}>
                        <Text style={{ fontSize: 16 }}>Following</Text>
                        <Text style={{ fontWeight: "700", fontSize: 19 }}>12</Text>
                    </View>
                    <View style={{ justifyContent: "center", alignItems: "center", paddingRight: 15 }}>
                        <Text style={{ fontSize: 16 }}>Follower</Text>
                        <Text style={{ fontWeight: "700", fontSize: 19 }}>45</Text>
                    </View>
                </View>

                <TouchableOpacity
                    style={styles.itemRP}
                    onPress={() => {
                        navigation.navigate("Song Detail", { song: songData });
                    }}
                >
                    <Text>demo song detail</Text>
                </TouchableOpacity>


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

                    </View>
                    {playlists.map((item) => (
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


                {/* Preferences Section */}
                <View style={styles.section}>

                    <View style={styles.item}>
                        <TouchableOpacity
                            style={styles.logoutButton}
                            onPress={() => navigation.navigate("Login")}
                        >
                            <Text style={styles.logoutText}>LOGOUT</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 10
    },
    profileSection: {
        width: "100%",
        // alignItems: "center",
        // marginBottom: 20,
        padding: 12,
        flexDirection: "row",
        justifyContent: "space-between",
        borderColor: "#e2e2e2",
        borderWidth: 1,
        borderRadius: 11
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginBottom: 10,
    },
    name: {
        fontSize: 11,
        fontWeight: "bold",
    },
    email: {
        color: "#888",
        marginBottom: 10,
    },
    editProfileButton: {
        backgroundColor: "#000",
        paddingVertical: 8,
        paddingHorizontal: 20,
        borderRadius: 20,
    },
    editProfileText: {
        color: "#fff",
        fontWeight: "bold",
    },
    section: {
        padding: 10,
        borderRadius: 10,
        backgroundColor: "#f4f4f4",
    },
    sectionTitle: {
        fontSize: 16,
        color: "#888",
    },
    item: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 12,
        borderBottomColor: "#e0e0e0",
    },
    itemText: {
        fontSize: 16,
        fontWeight: "500",
    },
    notificationBadge: {
        backgroundColor: "#0088ff",
        borderRadius: 10,
        paddingHorizontal: 8,
        paddingVertical: 2,
    },
    badgeText: {
        color: "#fff",
        fontWeight: "bold",
    },
    logoutButton: {
        alignItems: "center",
        width: "100%",
        textAlign: "center",
    },
    logoutText: {
        color: "#ff3b30",
        fontSize: 16,
        fontWeight: "bold",
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

export default ProfilePage;
