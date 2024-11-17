import { useSoundStore } from "../hooks/useSoundStore";
import {
    FontAwesome6,
    FontAwesome,
    Entypo,
    MaterialCommunityIcons,
} from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity, View, ViewStyle } from "react-native";
type PlayerControlsProps = {
    style?: ViewStyle;
};
type PlayerButtonProps = {
    style?: ViewStyle;
    iconSize?: number;
};
export const PlayerControls = ({ style }: PlayerControlsProps) => {
    return (
        <View style={[styles.container, style]}>
            <View style={styles.row}>
                <ShuttleButton />
                <SkipToPreviousButton />
                <PlayPauseButton />
                <SkipToNextButton />
                <ThreeDotsButton />
            </View>
        </View>
    );
};
export const ShuttleButton = ({ iconSize = 30 }: PlayerButtonProps) => {
    const { isShuffled, toggleShuffle } = useSoundStore();
    return (
        <TouchableOpacity activeOpacity={0.7} onPress={() => toggleShuffle()}>
            {isShuffled ? (
                <FontAwesome name="random" size={iconSize} color="#fff" />
            ) : (
                <MaterialCommunityIcons
                    name="shuffle-disabled"
                    size={iconSize}
                    color="#fff"
                />
            )}
        </TouchableOpacity>
    );
};
export const PlayPauseButton = ({
    style,
    iconSize = 48,
}: PlayerButtonProps) => {
    const { isPlaying, pause, resume } = useSoundStore();
    return (
        <View style={[{ height: iconSize }, style]}>
            <TouchableOpacity
                activeOpacity={0.85}
                onPress={isPlaying ? pause : resume}
            >
                <FontAwesome6
                    name={isPlaying ? "pause" : "play"}
                    size={iconSize}
                    color="#fff"
                />
            </TouchableOpacity>
        </View>
    );
};
export const SkipToNextButton = ({ iconSize = 30 }: PlayerButtonProps) => {
    const { next, canNext, isLoading } = useSoundStore();

    return (
        <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => canNext && !isLoading && next()}
            disabled={!canNext || isLoading}
            style={{ opacity: canNext && !isLoading ? 1 : 0.5 }}
        >
            <FontAwesome6
                name="forward"
                size={iconSize}
                color={canNext && !isLoading ? "#fff" : "#666"}
            />
        </TouchableOpacity>
    );
};
export const SkipToPreviousButton = ({ iconSize = 30 }: PlayerButtonProps) => {
    const { previous, canPrevious, isLoading } = useSoundStore();

    return (
        <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => canPrevious && !isLoading && previous()}
            disabled={!canPrevious || isLoading}
            style={{ opacity: canPrevious && !isLoading ? 1 : 0.5 }}
        >
            <FontAwesome6
                name="backward"
                size={iconSize}
                color={canPrevious && !isLoading ? "#fff" : "#666"}
            />
        </TouchableOpacity>
    );
};
export const ThreeDotsButton = ({ iconSize = 30 }: PlayerButtonProps) => {
    return (
        <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => console.log("three")}
        >
            <Entypo name="dots-three-horizontal" size={iconSize} color="#fff" />
        </TouchableOpacity>
    );
};
const styles = StyleSheet.create({
    container: {
        width: "100%",
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
    },
});
