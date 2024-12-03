import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
    faCirclePlay,
    height,
} from "@fortawesome/free-solid-svg-icons/faCirclePlay";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons/faAngleRight";
import { useEffect, useState } from "react";
import { expressInstance } from "../helpers/axios";
import { Track, useSoundStore } from "../hooks/useSoundStore";

const HomePage = ({ navigation }) => {
    const [artistList, setArtistList] = useState([]);
    const [playlists, setPlaylists] = useState([]);
    const [newestSong, setNewestSong] = useState([]);
    const { play } = useSoundStore();

    const getAllArtists = async () => {
        const artistResponse = await expressInstance.get("/api/artists");
        setArtistList(artistResponse.data.artists);
    };

    const getAllPlaylists = async () => {
        const playlistResponse = await expressInstance.get("/api/playlists");
        setPlaylists(playlistResponse.data.playlists);
    };

    const getNewestSong = async () => {
        const songResponse = await expressInstance.get("/api/songs/newest");
        setNewestSong(songResponse.data.songs);
    };

    const handlePlay = (track: Track) => {
        play(track, newestSong);
    };

    useEffect(() => {
        getAllArtists();
        getAllPlaylists();
        getNewestSong();
    }, []);

    return (
        <View style={styles.container}>
            <ScrollView style={{ padding: 10 }}>
                {/* Top Artists Section */}
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
                                    <Text style={styles.artistName}>
                                        {item.displayName}
                                    </Text>
                                </TouchableOpacity>
                            );
                        })}
                    </ScrollView>
                </View>

                {/* New Songs Section */}
                <View style={{ marginTop: 15 }}>
                    <Text style={styles.text_heading}>New Songs</Text>
                    {newestSong.map((song) => (
                        <TouchableOpacity
                            key={song._id}
                            style={styles.newSongContainer}
                        >
                            <Image
                                source={{ uri: song.artwork }}
                                style={styles.newSongArtwork}
                            />
                            <View style={styles.newSongDetails}>
                                <Text style={styles.newSongTitle}>
                                    {song.title}
                                </Text>
                                <Text style={styles.newSongArtist}>
                                    {song.artistName}
                                </Text>
                                <Text style={styles.newSongGenre}>
                                    {song.genre.join(", ")}
                                </Text>
                            </View>
                            <TouchableOpacity
                                style={styles.btnPlay}
                                onPress={() => handlePlay(song)}
                            >
                                <FontAwesomeIcon
                                    icon={faCirclePlay}
                                    size={25}
                                    color="#000"
                                />
                            </TouchableOpacity>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* My Playlists Section */}
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
                    <View style={{ height: 100 }}></View>
                </View>
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
        alignItems: "center",
    },
    artistName: {
        textAlign: "center",
        fontWeight: "500",
    },
    imageTop: {
        width: 60,
        height: 60,
        borderRadius: 100,
    },
    newSongContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
        backgroundColor: "#fff",
        padding: 10,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 2,
    },
    newSongArtwork: {
        width: 70,
        height: 70,
        borderRadius: 10,
    },
    newSongDetails: {
        flex: 1,
        marginLeft: 10,
    },
    newSongTitle: {
        fontSize: 16,
        fontWeight: "bold",
    },
    newSongArtist: {
        fontSize: 14,
        color: "#555",
    },
    newSongGenre: {
        fontSize: 12,
        color: "#888",
    },
    btnPlay: {
        width: 40,
        height: 40,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 100,
        backgroundColor: "#fff",
        elevation: 3,
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
