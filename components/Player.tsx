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

const Player = () => {
    const { activeTrack } = useSoundStore();
    // const { imageColors } = usePlayerBackground(
    //     activeTrack?.artwork ?? unknownTrackImageUri
    // );
    const { top, bottom } = useSafeAreaInsets();
    const isFavorite = false;
    const toggleFavorite = () => {};
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
                            <View
                                style={{
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                }}
                            >
                                <View
                                    style={{
                                        flexDirection: "row",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                    }}
                                >
                                    <FontAwesome
                                        name={isFavorite ? "heart" : "heart-o"}
                                        size={25}
                                        color={isFavorite ? "#1ce5ff" : "#fff"}
                                        style={{ marginHorizontal: 14 }}
                                        onPress={toggleFavorite}
                                    />
                                    <Text
                                        style={{
                                            color: "#fff",
                                            marginRight: 20,
                                            fontSize: 15,
                                        }}
                                    >
                                        12K
                                    </Text>
                                    <MaterialCommunityIcons
                                        name="comment-text-outline"
                                        size={25}
                                        color="#fff"
                                        style={{ marginHorizontal: 14 }}
                                    />
                                    <Text
                                        style={{
                                            color: "#fff",
                                            fontSize: 15,
                                        }}
                                    >
                                        450
                                    </Text>
                                </View>
                                <Feather name="upload" size={30} color="#fff" />
                            </View>
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
