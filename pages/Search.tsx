import React, { useEffect, useState } from "react";
import {
    StyleSheet,
    View,
    TextInput,
    FlatList,
    Text,
    TouchableOpacity,
    Image,
} from "react-native";
import { expressInstance } from "../helpers/axios";
import { Track, useSoundStore } from "../hooks/useSoundStore";

interface SearchResults {
    results: {
        songs: Track[];
        playlists: Playlist[];
        artists: Artist[];
    };
}

interface Playlist {
    _id: string;
    title: string;
    isPublic: boolean;
    artwork: string;
    creator: string;
    creatorName: string;
    songs: SongReference[];
    description: string;
    songCount: number;
    followers: string[];
    createdAt: string;
    updatedAt: string;
    __v: number;
}

interface SongReference {
    songId: string;
    title: string;
    artistName: string;
    artwork: string;
    _id: string;
}

interface Artist {
    _id: string;
    username: string;
    imageURL: string;
    password: string;
    displayName: string;
    isArtist: boolean;
    likedSongs: string[];
    myPlaylists: string[];
    __v: number;
}

const Search = ({ navigation }) => {
    const [data, setData] = useState<SearchResults>({
        results: {
            songs: [],
            playlists: [],
            artists: [],
        },
    });
    const [query, setQuery] = useState("");
    const [activeTab, setActiveTab] = useState("Songs");
    const { play } = useSoundStore();

    const handleSearch = (text: string) => {
        setQuery(text.toLowerCase());
    };

    useEffect(() => {
        if (!query) {
            setData({
                results: {
                    songs: [],
                    playlists: [],
                    artists: [],
                },
            });
            return;
        }

        const delayDebounceFn = setTimeout(() => {
            const fetchSearchResults = async () => {
                try {
                    const response = await expressInstance.get("/api/search", {
                        params: { query },
                    });

                    setData({
                        results: {
                            songs: response.data?.results?.songs || [],
                            playlists: response.data?.results?.playlists || [],
                            artists: response.data?.results?.artists || [],
                        },
                    });
                } catch (error) {
                    console.error("Search error:", error);

                    setData({
                        results: {
                            songs: [],
                            playlists: [],
                            artists: [],
                        },
                    });
                }
            };

            fetchSearchResults();
        }, 400);

        return () => clearTimeout(delayDebounceFn);
    }, [query]);

    const renderSongItem = ({ item }) => {
        if (
            query &&
            !item.title.toLowerCase().includes(query) &&
            !item.artistName.toLowerCase().includes(query)
        )
            return null;

        return (
            <TouchableOpacity
                style={styles.resultItem}
                onPress={async () => {
                    await play(item, data.results.songs);
                }}
            >
                <Image source={{ uri: item.artwork }} style={styles.artwork} />
                <View style={styles.resultTextContainer}>
                    <Text style={styles.resultTitle}>{item.title}</Text>
                    <Text style={styles.resultSubtitle}>{item.artistName}</Text>
                </View>
            </TouchableOpacity>
        );
    };

    const renderPlaylistItem = ({ item }) => {
        if (
            query &&
            !item.title.toLowerCase().includes(query) &&
            !item.creatorName.toLowerCase().includes(query)
        )
            return null;

        return (
            <TouchableOpacity
                style={styles.playlistItem}
                onPress={() => {
                    navigation.navigate("PlayListDetail", {
                        playlist: item,
                    });
                }}
            >
                <Image
                    source={{ uri: item.artwork }}
                    style={styles.playlistArtwork}
                />
                <View style={styles.playlistTextContainer}>
                    <Text style={styles.playlistTitle}>{item.title}</Text>
                    <Text style={styles.playlistSubtitle}>
                        By {item.creatorName} • {item.songCount} Songs
                    </Text>
                </View>
            </TouchableOpacity>
        );
    };

    const renderArtistItem = ({ item }) => {
        if (
            query &&
            !item.displayName.toLowerCase().includes(query) &&
            !item.username.toLowerCase().includes(query)
        )
            return null;

        return (
            <TouchableOpacity
                style={styles.artistItem}
                onPress={() => {
                    navigation.navigate("ArtistDetail", {
                        artist: item,
                    });
                }}
            >
                <Image
                    source={{ uri: item.imageURL }}
                    style={styles.artistAvatar}
                />
                <View style={styles.artistTextContainer}>
                    <Text style={styles.artistName}>{item.displayName}</Text>
                    <Text style={styles.artistUsername}>@{item.username}</Text>
                </View>
            </TouchableOpacity>
        );
    };

    const renderTabContent = () => {
        let dataToRender = [];
        switch (activeTab) {
            case "Songs":
                dataToRender = data.results.songs || [];
                return (
                    <FlatList
                        data={dataToRender}
                        keyExtractor={(item) => item._id}
                        renderItem={renderSongItem}
                        contentContainerStyle={styles.listContainer}
                        showsVerticalScrollIndicator={false}
                        ListEmptyComponent={
                            <View style={styles.emptyContainer}>
                                <Text style={styles.emptyText}>
                                    No songs found
                                </Text>
                            </View>
                        }
                    />
                );
            case "Playlists":
                dataToRender = data.results.playlists || [];
                return (
                    <FlatList
                        data={dataToRender}
                        keyExtractor={(item) => item._id}
                        renderItem={renderPlaylistItem}
                        contentContainerStyle={styles.listContainer}
                        showsVerticalScrollIndicator={false}
                        ListEmptyComponent={
                            <View style={styles.emptyContainer}>
                                <Text style={styles.emptyText}>
                                    No playlists found
                                </Text>
                            </View>
                        }
                    />
                );
            case "Artists":
                dataToRender = data.results.artists || [];
                return (
                    <FlatList
                        data={dataToRender}
                        keyExtractor={(item) => item._id}
                        renderItem={renderArtistItem}
                        contentContainerStyle={styles.listContainer}
                        showsVerticalScrollIndicator={false}
                        ListEmptyComponent={
                            <View style={styles.emptyContainer}>
                                <Text style={styles.emptyText}>
                                    No artists found
                                </Text>
                            </View>
                        }
                    />
                );
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.searchInput}
                placeholder="Search for music..."
                value={query}
                onChangeText={handleSearch}
                clearButtonMode="while-editing"
            />
            <View style={styles.tabContainer}>
                {["Songs", "Playlists", "Artists"].map((tab) => (
                    <TouchableOpacity
                        key={tab}
                        style={[
                            styles.tabButton,
                            activeTab === tab && styles.activeTabButton,
                        ]}
                        onPress={() => setActiveTab(tab)}
                    >
                        <Text
                            style={[
                                styles.tabButtonText,
                                activeTab === tab && styles.activeTabButtonText,
                            ]}
                        >
                            {tab}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
            {renderTabContent()}
        </View>
    );
};

export default Search;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    searchInput: {
        height: 50,
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        margin: 16,
    },
    tabContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginBottom: 16,
    },
    tabButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
    },
    activeTabButton: {
        backgroundColor: "#007bff",
    },
    tabButtonText: {
        color: "#333",
    },
    activeTabButtonText: {
        color: "white",
    },
    listContainer: {
        paddingHorizontal: 16,
        paddingBottom: 80,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 50,
    },
    emptyText: {
        fontSize: 18,
        color: "#888",
    },
    resultItem: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },
    artwork: {
        width: 60,
        height: 60,
        borderRadius: 10,
        marginRight: 15,
    },
    resultTextContainer: {
        flex: 1,
    },
    resultTitle: {
        fontSize: 16,
        fontWeight: "bold",
    },
    resultSubtitle: {
        fontSize: 14,
        color: "#666",
    },
    playlistItem: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },
    playlistArtwork: {
        width: 70,
        height: 70,
        borderRadius: 10,
        marginRight: 15,
    },
    playlistTextContainer: {
        flex: 1,
    },
    playlistTitle: {
        fontSize: 16,
        fontWeight: "bold",
    },
    playlistSubtitle: {
        fontSize: 14,
        color: "#666",
    },
    artistItem: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },
    artistAvatar: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginRight: 15,
    },
    artistTextContainer: {
        flex: 1,
    },
    artistName: {
        fontSize: 16,
        fontWeight: "bold",
    },
    artistUsername: {
        fontSize: 14,
        color: "#666",
    },
});
