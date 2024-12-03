import React, { useEffect, useLayoutEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { expressInstance } from "../helpers/axios";
import { TracksList } from "./TracksList";
import { FloatingPlayer } from "./FloatingPlayer";
import { useSoundStore } from "../hooks/useSoundStore";
import Ionicons from "@expo/vector-icons/Ionicons";
import { getStored_id, getStoredUsername } from "../helpers/authStorage";

const ArtistDetail = ({ route, navigation }) => {
    const { artist } = route.params;
    const [tracks, setTracks] = useState([]);
    const [followers_id, setFollowers_id] = useState([]);
    const [_id, set_id] = useState(null);
    const [username, setuserName] = useState(null);
    const { play, toggleShuffle } = useSoundStore();

    const getSongsOfArtists = async () => {
        const response = await expressInstance.get(
            `/api/songs/artist/${artist._id}`
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
            await expressInstance.post("/api/users/follow", {
                followID: artist._id,
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
        getSongsOfArtists();
        setFollowers_id(artist.followers.map((follower) => follower.userId));
    }, [artist, username, _id]);

    useLayoutEffect(() => {
        navigation.setOptions({
            title: artist.displayName,
        });
    });

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Image
                    source={{ uri: artist.imageURL }}
                    style={styles.artistImage}
                />
                <Text style={styles.artistName}>{artist.displayName}</Text>
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
                    {artist._id !== _id && (
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
                                {isFollowing ? "Following" : "Follow"}
                            </Text>
                        </TouchableOpacity>
                    )}
                </View>
            </View>
            <TracksList tracks={tracks} />
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
        backgroundColor: "#FFF",
        padding: 20,
    },
    header: {
        alignItems: "center",
        marginBottom: 20,
    },
    artistImage: {
        width: 120,
        height: 120,
        borderRadius: 60,
        marginBottom: 10,
    },
    artistName: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 15,
    },
    actionButtons: {
        flexDirection: "row",
    },
    playButton: {
        backgroundColor: "#000",
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 50,
        marginHorizontal: 10,
    },
    followButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
    },
    followButtonText: {
        fontSize: 14,
        fontWeight: "bold",
    },
    following: {
        backgroundColor: "#E0E0E0",
    },
    notFollowing: {
        backgroundColor: "#E0E0E0",
    },
});

export default ArtistDetail;
