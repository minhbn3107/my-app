import React, { useEffect, useLayoutEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { expressInstance } from "../helpers/axios";
import { TracksList } from "./TracksList";
import { FloatingPlayer } from "./FloatingPlayer";
import { useSoundStore } from "../hooks/useSoundStore";
import Ionicons from "@expo/vector-icons/Ionicons";

const ArtistDetail = ({ route, navigation }) => {
    const { artist } = route.params;
    const [tracks, setTracks] = useState([]);
    const { play, toggleShuffle, setVolume } = useSoundStore();

    const getSongsOfArtists = async () => {
        const response = await expressInstance.get(
            `/api/songs/artist/${artist._id}`
        );
        setTracks(response.data.songs);
    };

    const handlePlayFromStart = async () => {
        await play(tracks[0], tracks);
        setVolume(1);
    };

    const handlePlayShuffle = async () => {
        await play(tracks[0], tracks);
        toggleShuffle();
        setVolume(1);
    };

    useEffect(() => {
        getSongsOfArtists();
    }, []);

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
                <Text style={styles.artistFollowers}>{artist.followers}</Text>
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
                    <TouchableOpacity style={styles.followButton}>
                        <Text style={styles.followButtonText}>Follow</Text>
                    </TouchableOpacity>
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
    },
    artistFollowers: {
        fontSize: 14,
        color: "#666",
    },
    actionButtons: {
        flexDirection: "row",
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
});

export default ArtistDetail;
