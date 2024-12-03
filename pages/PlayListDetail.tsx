import React, { useEffect, useLayoutEffect, useState } from "react";
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useSoundStore } from "../hooks/useSoundStore";
import { expressInstance } from "../helpers/axios";
import { TracksList } from "./TracksList";
import { FloatingPlayer } from "./FloatingPlayer";
import { getStored_id, getStoredUsername } from "../helpers/authStorage";

const PlayListDetail = ({ route, navigation }) => {
    const { playlist } = route.params;
    const [tracks, setTracks] = useState([]);
    const { play, toggleShuffle } = useSoundStore();
    const [followers_id, setFollowers_id] = useState([]);
    const [_id, set_id] = useState(null);
    const [username, setuserName] = useState(null);

    const getSongsOfPlaylists = async () => {
        const response = await expressInstance.get(
            `/api/songs/playlist/${playlist._id}`
        );
        setTracks(response.data.songs);
    };

    const fetchUser_id = async () => {
        try {
            const stored_id = await getStored_id();
            set_id(stored_id);
        } catch (error) {
            console.error("Failed to fetch user ID", error);
        }
    };

    const fetchUsername = async () => {
        try {
            const username = await getStoredUsername();
            setuserName(username);
        } catch (error) {
            console.error("Failed to fetch user ID", error);
        }
    };

    const handleToggleFollow = async () => {
        try {
            await expressInstance.post("/api/playlists/follow", {
                followID: playlist._id,
                id: _id,
                username: username,
            });

            if (isFollowing) {
                setFollowers_id(followers_id.filter((id) => id !== _id));
            } else {
                setFollowers_id([...followers_id, _id]);
            }
        } catch (error) {
            console.error("Error toggling follow status:", error);
        }
    };

    const handlePlayFromStart = async () => {
        await play(tracks[0], tracks);
    };

    const handlePlayShuffle = async () => {
        await play(tracks[0], tracks);
        toggleShuffle();
    };

    const isFollowing = followers_id.includes(_id);

    useEffect(() => {
        fetchUser_id();
        fetchUsername();
        getSongsOfPlaylists();
        setFollowers_id(playlist.followers.map((follower) => follower.userId));
    }, [playlist, username, _id]);

    useLayoutEffect(() => {
        navigation.setOptions({
            title: playlist.title,
        });
    });

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                {/* Playlist Info */}
                <View style={styles.playlistInfo}>
                    <Image
                        source={{ uri: playlist.artwork }}
                        style={styles.playlistImage}
                    />
                    <View style={styles.textContainer}>
                        <Text style={styles.playlistTitle}>
                            {playlist.title}
                        </Text>
                        <Text style={styles.creatorName}>
                            {playlist.creatorName}
                        </Text>
                        <Text
                            style={styles.description}
                            numberOfLines={1}
                            ellipsizeMode="tail"
                        >
                            {playlist.description}
                        </Text>
                        <Text style={styles.songCount}>
                            {playlist.songCount} songs
                        </Text>
                    </View>
                </View>

                <View style={styles.actionButtons}>
                    <TouchableOpacity
                        style={styles.playButton}
                        onPress={() => handlePlayShuffle()}
                    >
                        <Ionicons name="shuffle" size={24} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.playButton}
                        onPress={() => handlePlayFromStart()}
                    >
                        <Ionicons name="play-outline" size={24} color="white" />
                    </TouchableOpacity>
                    {playlist.creator !== _id && (
                        <TouchableOpacity
                            style={[
                                styles.followButton,
                                isFollowing
                                    ? styles.following
                                    : styles.notFollowing,
                            ]}
                            onPress={handleToggleFollow}
                        >
                            <Text style={styles.followButtonText}>
                                {isFollowing
                                    ? "Added to Playlist"
                                    : "Add to Playlist"}
                            </Text>
                        </TouchableOpacity>
                    )}
                </View>
                <View style={{ paddingHorizontal: 10, marginRight: 10 }}>
                    <TracksList tracks={tracks} />
                </View>
            </View>
            <FloatingPlayer
                style={{
                    position: "absolute",
                    left: 8,
                    right: 8,
                    bottom: 5,
                }}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    content: {
        flex: 1,
    },
    playlistInfo: {
        flexDirection: "row",
        alignItems: "center",
        padding: 20,
    },
    playlistImage: {
        width: 110,
        height: 110,
        borderRadius: 10,
    },
    textContainer: {
        flexShrink: 1,
        paddingLeft: 10,
        maxWidth: "70%",
    },
    playlistTitle: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 8,
    },
    creatorName: {
        fontSize: 16,
        color: "#666",
        marginBottom: 8,
    },
    description: {
        fontSize: 14,
        color: "#666",
        marginBottom: 8,
        overflow: "hidden",
        flexShrink: 1,
    },
    songCount: {
        fontSize: 14,
        color: "#666",
    },
    actionButtons: {
        flexDirection: "row",
        paddingHorizontal: 10,
        paddingBottom: 10,
    },
    followButton: {
        backgroundColor: "#E0E0E0",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
    },
    followButtonText: {
        fontSize: 14,
        color: "#333",
    },
    playButton: {
        backgroundColor: "#000",
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: "100%",
        marginHorizontal: 10,
    },
    following: {
        backgroundColor: "#E0E0E0",
    },
    notFollowing: {
        backgroundColor: "#E0E0E0",
    },
});

export default PlayListDetail;
