import { Marquee } from "@animatereactnative/marquee";
import { PlayerControls } from "../pages/PlayerControls";
import { PlayerProgressBar } from "../pages/PlayerProgressbar";
import { PlayerRepeatToggle } from "../pages/PlayerRepeatToggle";
import { PlayerVolumeBar } from "../pages/PlayerVolumeBar";
import { SwipeablePlayerScreen } from "../pages/SwipeablePlayerScreen";
// import { usePlayerBackground } from "@/hooks/usePlayerBackground";
import {
    FontAwesome,
    AntDesign,
    MaterialCommunityIcons,
    Feather,
} from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import {
    ActivityIndicator,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useSoundStore } from "../hooks/useSoundStore";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { getStored_id } from "../helpers/authStorage";
import { expressInstance } from "../helpers/axios";
import { set } from "ts-pattern/dist/patterns";

const Player = () => {
    const { activeTrack } = useSoundStore();
    // const { imageColors } = usePlayerBackground(
    //     activeTrack?.artwork ?? unknownTrackImageUri
    // );
    const { top, bottom } = useSafeAreaInsets();
    const [likedSongs, setLikedSongs] = useState([]);
    const [isFavorite, setIsFavorite] = useState(false);
    const [_id, set_id] = useState(null);

    const fetchUser_id = async () => {
        try {
            const stored_id = await getStored_id();
            set_id(stored_id);
        } catch (error) {
            console.error("Failed to fetch user ID", error);
        }
    };

    const getLikedSongsOfUser = async () => {
        try {
            const response = await expressInstance.get(
                `/api/users/liked/${_id}`
            );
            setLikedSongs(response.data);
        } catch (error) {
            console.error("Failed to fetch liked songs", error);
        }
    };

    const handleToggleFavorite = async () => {
        try {
            await expressInstance.post("/api/songs/like", {
                userId: _id,
                songId: activeTrack._id,
            });

            if (isFavorite) {
                setLikedSongs(likedSongs.filter((id) => id !== _id));
                setIsFavorite(false);
            } else {
                setLikedSongs([...likedSongs, _id]);
                setIsFavorite(true);
            }
        } catch (error) {
            console.error("Error toggling like status:", error);
        }
    };

    useEffect(() => {
        fetchUser_id();
        if (_id) {
            getLikedSongsOfUser();
        }
        setIsFavorite(likedSongs.includes(activeTrack._id));
    }, [isFavorite, likedSongs]);

    if (!activeTrack) {
        return (
            <View
                style={{
                    justifyContent: "center",
                    flex: 1,
                    backgroundColor: "#fff",
                }}
            >
                <ActivityIndicator color="#fc3c44" />
            </View>
        );
    }
    return (
        <SwipeablePlayerScreen>
            <LinearGradient
                style={{ flex: 1 }}
                colors={
                    // imageColors
                    //     ? [imageColors.palette, imageColors.average]
                    //     : [colors.background, colors.primary]
                    ["#fff", "#000"]
                }
            >
                <View style={styles.overlayContainer}>
                    <DismissPlayerSymbol />
                    <View
                        style={{
                            flex: 1,
                            marginTop: top + 30,
                            marginBottom: bottom,
                        }}
                    >
                        <View style={styles.artworkImageContainer}>
                            <Image
                                source={{
                                    uri:
                                        activeTrack.artwork ??
                                        "https://i.ibb.co/njPK5kh/unknown-track.png",
                                }}
                                resizeMode="cover"
                                style={styles.artworkImage}
                            />
                        </View>
                        <View style={{ flex: 1 }}>
                            <View style={{ marginTop: "auto" }}>
                                <View style={{ height: 60 }}>
                                    <View
                                        style={{
                                            flexDirection: "row",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                        }}
                                    >
                                        <View
                                            style={styles.trackTitleContainer}
                                        >
                                            {activeTrack.title?.length &&
                                            activeTrack.title?.length > 25 ? (
                                                <Marquee
                                                    spacing={150}
                                                    speed={1}
                                                >
                                                    <Text
                                                        style={
                                                            styles.trackTitleText
                                                        }
                                                    >
                                                        {activeTrack.title}
                                                    </Text>
                                                </Marquee>
                                            ) : (
                                                <Text
                                                    style={
                                                        styles.trackTitleText
                                                    }
                                                >
                                                    {activeTrack.title}
                                                </Text>
                                            )}
                                        </View>

                                        <View
                                            style={{
                                                flexDirection: "row",
                                                alignItems: "center",
                                                justifyContent: "center",
                                            }}
                                        >
                                            <View
                                                style={{
                                                    flexDirection: "row",
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                }}
                                            >
                                                <TouchableOpacity
                                                    onPress={
                                                        handleToggleFavorite
                                                    }
                                                >
                                                    <FontAwesome
                                                        name={
                                                            isFavorite
                                                                ? "heart"
                                                                : "heart-o"
                                                        }
                                                        size={25}
                                                        color={
                                                            isFavorite
                                                                ? "#fe2c55"
                                                                : "#fff"
                                                        }
                                                        style={{
                                                            marginHorizontal: 14,
                                                        }}
                                                    />
                                                </TouchableOpacity>
                                                <PlayerRepeatToggle size={30} />
                                            </View>
                                        </View>
                                    </View>
                                    {activeTrack.artistName?.length &&
                                    activeTrack.artistName?.length > 30 ? (
                                        <Marquee spacing={150} speed={1}>
                                            <Text
                                                style={styles.trackArtistText}
                                            >
                                                {activeTrack.artistName}
                                            </Text>
                                        </Marquee>
                                    ) : (
                                        <Text style={styles.trackArtistText}>
                                            {activeTrack.artistName ||
                                                "Unknown Artist"}
                                        </Text>
                                    )}
                                </View>
                                <PlayerProgressBar style={{ marginTop: 32 }} />
                                <PlayerControls style={{ marginTop: 40 }} />
                            </View>
                            <PlayerVolumeBar
                                style={{ marginTop: "auto", marginBottom: 80 }}
                            />
                        </View>
                    </View>
                </View>
            </LinearGradient>
        </SwipeablePlayerScreen>
    );
};
const DismissPlayerSymbol = () => {
    const { top } = useSafeAreaInsets();
    const router = useNavigation();
    return (
        <View
            style={{
                position: "absolute",
                top: top - 20,
                left: 0,
                right: 0,
                flexDirection: "row",
                justifyContent: "center",
            }}
        >
            <TouchableOpacity onPress={() => router.goBack()}>
                <AntDesign
                    name="down"
                    size={50}
                    color="#aaa"
                    style={{ opacity: 0.7 }}
                />
            </TouchableOpacity>
        </View>
    );
};
const styles = StyleSheet.create({
    overlayContainer: {
        flex: 1,
        paddingHorizontal: 24,
        backgroundColor: "transparent",
    },
    artworkImageContainer: {
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.44,
        shadowRadius: 11.0,
        flexDirection: "row",
        justifyContent: "center",
        height: "45%",
    },
    artworkImage: {
        width: "100%",
        height: "100%",
        resizeMode: "cover",
        borderRadius: 12,
    },
    trackTitleContainer: {
        flex: 1,
        overflow: "hidden",
    },
    trackTitleText: {
        color: "#fff",
        fontSize: 22,
        fontWeight: "700",
    },
    trackArtistText: {
        color: "#fff",
        fontSize: 20,
        opacity: 0.8,
        maxWidth: "90%",
    },
});
export default Player;
