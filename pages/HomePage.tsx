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

const ARRAY_LIST_TOP_ARTIST = [
    {
        id: 1,
        image: "https://i.ibb.co/4MHWXDR/1.jpg",
        displayName: "Khalid",
        followers: "2.3M Followers",
        myPlaylists: [
            {
                url: "https://audio.jukehost.co.uk/vTRYaTEbpaYRCxiWGgL2S91mnOuMKfLw",
                title: "Guess I'll Never Know",
                artist: "TrackTribe",
                artwork: "https://f4.bcbits.com/img/a3736661212_65",
                rating: 1,
                playlist: ["Chill 🌱"],
            },
            {
                url: "https://audio.jukehost.co.uk/rSmGXxf0OJLipPwFRyvoFKodDOj5VuWf",
                title: "Anxiety",
                artist: "NEFFEX",
                artwork:
                    "https://i1.sndcdn.com/artworks-iCqupgQNLXSjKspS-0CGreg-t500x500.jpg",
                playlist: ["Chill 🌱", "Instrumental 🎵", "Rap 🎤"],
            },
        ],
    },
    {
        id: 2,
        image: "https://i.ibb.co/sVqS2Sd/4.jpg",
        displayName: "Jun Belend",
        followers: "1.1M Followers",
        myPlaylists: [
            {
                url: "https://audio.jukehost.co.uk/vTRYaTEbpaYRCxiWGgL2S91mnOuMKfLw",
                title: "Guess I'll Never Know",
                artist: "TrackTribe",
                artwork: "https://f4.bcbits.com/img/a3736661212_65",
                rating: 1,
                playlist: ["Chill 🌱"],
            },
            {
                url: "https://audio.jukehost.co.uk/rSmGXxf0OJLipPwFRyvoFKodDOj5VuWf",
                title: "Anxiety",
                artist: "NEFFEX",
                artwork:
                    "https://i1.sndcdn.com/artworks-iCqupgQNLXSjKspS-0CGreg-t500x500.jpg",
                playlist: ["Chill 🌱", "Instrumental 🎵", "Rap 🎤"],
            },
        ],
    },
];

const ARRAY_MY_PLAYLIST = [
    {
        title: "Chill Vibes",
        isPublic: true,
        artwork: "https://i.ibb.co/f15bK7w/saostar-8svn795m1eeyow83.jpg",
        creator: "602d2149e7732f4b24f29e7e",
        creatorName: "John Doe",
        songs: [
            {
                songId: "603d2149e7732f4b24f29e7f",
                title: "Relaxing Beats",
                artistName: "Artist One",
                duration: 180,
                artwork: "https://i.ibb.co/xyz123/relaxing-beats.jpg",
            },
            {
                songId: "603d2149e7732f4b24f29e80",
                title: "Evening Chill",
                artistName: "Artist Two",
                duration: 210,
                artwork: "https://i.ibb.co/xyz456/evening-chill.jpg",
            },
        ],
        description: "A collection of chill songs to relax and unwind.",
        followers: [
            {
                userId: "602d2149e7732f4b24f29e81",
                username: "Alice",
            },
        ],
        songCount: 2,
        createdAt: "2024-11-20T12:34:56Z",
        updatedAt: "2024-11-20T12:34:56Z",
    },
    {
        title: "Workout Playlist",
        isPublic: false,
        artwork: "https://i.ibb.co/SvWZxXC/31stillprocessing-superjumbo.jpg",
        creator: "602d2149e7732f4b24f29e82",
        creatorName: "Jane Smith",
        songs: [
            {
                songId: "603d2149e7732f4b24f29e83",
                title: "Power Up",
                artistName: "Artist Three",
                duration: 250,
                artwork: "https://i.ibb.co/xyz789/power-up.jpg",
            },
            {
                songId: "603d2149e7732f4b24f29e84",
                title: "Endorphin Rush",
                artistName: "Artist Four",
                duration: 200,
                artwork: "https://i.ibb.co/xyz012/endorphin-rush.jpg",
            },
        ],
        description: "Songs to pump you up during your workout.",
        followers: [
            {
                userId: "602d2149e7732f4b24f29e85",
                username: "Bob",
            },
        ],
        songCount: 2,
        createdAt: "2024-11-21T10:20:30Z",
        updatedAt: "2024-11-21T10:20:30Z",
    },
    {
        title: "PHONG",
        isPublic: false,
        artwork: "https://i.ibb.co/SvWZxXC/31stillprocessing-superjumbo.jpg",
        creator: "602d2149e7732f4b24f29e82",
        creatorName: "Jane Smith",
        songs: [
            {
                songId: "603d2149e7732f4b24f29e83",
                title: "Power Up",
                artistName: "Artist Three",
                duration: 250,
                artwork: "https://i.ibb.co/xyz789/power-up.jpg",
            },
            {
                songId: "603d2149e7732f4b24f29e84",
                title: "Endorphin Rush",
                artistName: "Artist Four",
                duration: 200,
                artwork: "https://i.ibb.co/xyz012/endorphin-rush.jpg",
            },
        ],
        description: "Songs to pump you up during your workout.",
        followers: [
            {
                userId: "602d2149e7732f4b24f29e85",
                username: "Bob",
            },
        ],
        songCount: 2,
        createdAt: "2024-11-21T10:20:30Z",
        updatedAt: "2024-11-21T10:20:30Z",
    },
    {
        title: "BTS Playlist",
        isPublic: false,
        artwork: "https://i.ibb.co/f15bK7w/saostar-8svn795m1eeyow83.jpg",
        creator: "602d2149e7732f4b24f29e82",
        creatorName: "Jane Smith",
        songs: [
            {
                songId: "603d2149e7732f4b24f29e83",
                title: "Power Up",
                artistName: "Artist Three",
                duration: 250,
                artwork: "https://i.ibb.co/xyz789/power-up.jpg",
            },
            {
                songId: "603d2149e7732f4b24f29e84",
                title: "Endorphin Rush",
                artistName: "Artist Four",
                duration: 200,
                artwork: "https://i.ibb.co/xyz012/endorphin-rush.jpg",
            },
        ],
        description: "Songs to pump you up during your workout.",
        followers: [
            {
                userId: "602d2149e7732f4b24f29e85",
                username: "Bob",
            },
        ],
        songCount: 2,
        createdAt: "2024-11-21T10:20:30Z",
        updatedAt: "2024-11-21T10:20:30Z",
    },
];

const item = ARRAY_MY_PLAYLIST[0];

const HomePage = ({ navigation }) => {
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
                                    onPress={() =>
                                        navigation.navigate("ArtistDetail", {
                                            artist: item,
                                        })
                                    }
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
                                    ARRAY_MY_PLAYLIST,
                                })
                            }
                        >
                            <Text style={{ color: "blue", fontWeight: "500" }}>
                                Show all
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.lineRP}>
                        <TouchableOpacity
                            style={styles.itemRP}
                            onPress={() =>
                                navigation.navigate("PlayListDetail", { item })
                            }
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
                </View>
                <View style={{ paddingTop: 100 }}></View>
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
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 16,
        marginTop: 5,
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
        position: "relative",
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
