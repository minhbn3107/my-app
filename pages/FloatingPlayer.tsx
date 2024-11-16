import { PlayPauseButton, SkipToNextButton } from "./PlayerControls";
import {
    StyleSheet,
    TouchableOpacity,
    View,
    ViewProps,
    Text,
    Image,
} from "react-native";
import { Marquee } from "@animatereactnative/marquee";
import { useSoundStore } from "../hooks/useSoundStore";
import { useNavigation } from "@react-navigation/native";

export const FloatingPlayer = ({ style }: ViewProps) => {
    const router = useNavigation();
    const { activeTrack } = useSoundStore();

    const handlePress = () => {
        router.navigate("Player" as never);
    };

    if (!activeTrack) return null;
    return (
        <TouchableOpacity
            onPress={handlePress}
            activeOpacity={0.9}
            style={[styles.container, style]}
        >
            <>
                <Image
                    source={{
                        uri:
                            activeTrack.artwork ??
                            "https://i.ibb.co/njPK5kh/unknown-track.png",
                    }}
                    style={styles.trackArtworkImage}
                />
                <View style={styles.trackTitleContainer}>
                    {activeTrack.title?.length &&
                    activeTrack.title?.length > 25 ? (
                        <Marquee spacing={150} speed={1}>
                            <Text style={styles.trackTitle}>
                                {activeTrack.title}
                            </Text>
                        </Marquee>
                    ) : (
                        <Text style={styles.trackTitle}>
                            {activeTrack.title}
                        </Text>
                    )}
                    {activeTrack.artist?.length &&
                    activeTrack.artist?.length > 30 ? (
                        <Marquee spacing={150} speed={1}>
                            <Text style={styles.trackArtist}>
                                {activeTrack.artist}
                            </Text>
                        </Marquee>
                    ) : (
                        <Text style={styles.trackArtist}>
                            {activeTrack.artist || "Unknown Artist"}
                        </Text>
                    )}
                </View>
                <View style={styles.trackControlsContainer}>
                    <PlayPauseButton iconSize={24} />
                    <SkipToNextButton iconSize={22} />
                </View>
            </>
        </TouchableOpacity>
    );
};
const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#252525",
        padding: 8,
        borderRadius: 12,
        paddingVertical: 10,
    },
    trackArtworkImage: {
        width: 40,
        height: 40,
        borderRadius: 8,
    },
    trackTitleContainer: {
        flex: 1,
        overflow: "hidden",
        marginLeft: 10,
    },
    trackTitle: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "600",
        paddingLeft: 10,
    },
    trackArtist: {
        color: "#fff",
        fontSize: 15,
        fontWeight: "600",
        paddingLeft: 10,
    },
    trackControlsContainer: {
        flexDirection: "row",
        alignItems: "center",
        columnGap: 20,
        marginRight: 16,
        paddingLeft: 16,
    },
});
