import {
    ScrollView,
    View,
    StyleSheet,
    Text,
    Image,
    TouchableOpacity,
} from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { expressInstance } from "../helpers/axios";
import { getStored_id } from "../helpers/authStorage";
import { formatDate } from "../helpers/formatDate";
import { ThreeDotsButton } from "./PlayerControls";
import { Track, useSoundStore } from "../hooks/useSoundStore";

const MusicPage = () => {
    const [limit, setLimit] = useState(3);
    const [view, setView] = useState("See All");
    const [_id, set_id] = useState(null);
    const [trackData, setTrackData] = useState([]);
    const { play } = useSoundStore();
    const router = useNavigation();

    const fetchUser_id = async () => {
        try {
            const stored_id = await getStored_id();
            set_id(stored_id);
        } catch (error) {
            console.error("Failed to fetch username", error);
        }
    };

    const getUploadedSong = async () => {
        const response = await expressInstance.get(`/api/songs/artist/${_id}`);
        setTrackData(response.data.songs);
    };

    useEffect(() => {
        fetchUser_id();
        getUploadedSong();
    }, [_id]);

    const toggleView = () => {
        setLimit(limit === 3 ? trackData.length : 3);
        setView(limit === 3 ? "See Less" : "See All");
    };

    const handlePlay = (track: Track) => {
        play(track, trackData);
    };
    return (
        <View style={styles.contentContainer}>
            <ScrollView
                contentInsetAdjustmentBehavior="automatic"
                style={{
                    paddingHorizontal: 24,
                }}
            >
                <View style={styles.container}>
                    <Text style={styles.title}>New Song</Text>
                    <Text style={styles.subtitle}>
                        Upload any song on cloud and share on social
                    </Text>
                    <Image
                        source={require("../assets/disk.png")}
                        style={styles.vinylImage}
                    />
                    <TouchableOpacity style={styles.uploadButton}>
                        <Feather name="upload-cloud" size={24} color="#fff" />
                        <Text
                            style={styles.uploadButtonText}
                            onPress={() => router.navigate("Upload" as never)}
                        >
                            Upload
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.trackSection}>
                    <View style={styles.footer}>
                        <Text style={styles.sectionTitle}>Uploaded Song</Text>
                        {trackData.length > 0 && (
                            <TouchableOpacity
                                style={styles.seeAllButton}
                                onPress={toggleView}
                            >
                                <Text style={styles.seeAllText}>{view}</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                    {trackData.slice(0, limit).map((item) => (
                        <TouchableOpacity
                            key={item._id}
                            style={styles.trackItem}
                            onPress={() => handlePlay(item)}
                        >
                            <Image
                                source={{ uri: item.artwork }}
                                style={styles.trackImage}
                            />
                            <View style={styles.trackDetails}>
                                <Text style={styles.trackTitle}>
                                    {item.title}
                                </Text>
                                <Text style={styles.trackDate}>
                                    {formatDate(item.createdAt)}
                                </Text>
                            </View>
                            <ThreeDotsButton color="#000" track={item} />
                        </TouchableOpacity>
                    ))}
                </View>
                <View style={{ height: 150 }}></View>
            </ScrollView>
        </View>
    );
};

export default MusicPage;

const styles = StyleSheet.create({
    contentContainer: {
        flex: 1,
        marginTop: 10,
    },
    container: {
        backgroundColor: "#FFFDFB",
        borderRadius: 15,
        padding: 20,
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
    },
    title: {
        fontSize: 18,
        fontWeight: "600",
        color: "#000",
        marginBottom: 5,
    },
    subtitle: {
        fontSize: 14,
        color: "#707070",
        textAlign: "center",
        marginBottom: 20,
        lineHeight: 18,
    },
    vinylImage: {
        width: 120,
        height: 120,
        marginBottom: 20,
        resizeMode: "contain",
    },
    uploadButton: {
        backgroundColor: "#6B39F4",
        borderRadius: 25,
        paddingVertical: 10,
        paddingHorizontal: 30,
        flexDirection: "row",
        gap: 10,
    },
    uploadButtonText: {
        color: "#FFF",
        fontSize: 16,
        fontWeight: "600",
    },
    trackSection: {
        marginTop: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "700",
        color: "#1E1E1E",
        marginBottom: 15,
    },
    trackItem: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 10,
    },
    trackImage: {
        width: 60,
        height: 60,
        borderRadius: 10,
        marginRight: 15,
    },
    trackDetails: {
        flex: 1,
    },
    trackTitle: {
        fontSize: 16,
        fontWeight: "600",
        color: "#1E1E1E",
    },
    trackDate: {
        fontSize: 12,
        color: "#707070",
        marginVertical: 5,
    },
    separator: {
        height: 1,
        backgroundColor: "#EDEDED",
        marginVertical: 5,
    },
    footer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 20,
        paddingTop: 15,
        borderTopWidth: 1,
        borderTopColor: "#EDEDED",
    },
    seeAllButton: {
        backgroundColor: "#F3F3F3",
        borderRadius: 20,
        paddingVertical: 8,
        paddingHorizontal: 15,
    },
    seeAllText: {
        fontSize: 14,
        fontWeight: "600",
        color: "#6B39F4",
    },
});
