import { formatSecondsToMinutes } from "../helpers/miscellaneous";
import { StyleSheet, Text, View, ViewProps } from "react-native";
import { Slider } from "react-native-awesome-slider";
import { useSharedValue } from "react-native-reanimated";
import { useEffect } from "react";
import { useSoundStore } from "../hooks/useSoundStore";

export const PlayerProgressBar = ({ style }: ViewProps) => {
    const { duration, positionMillis, seek } = useSoundStore((state) => state);
    const isSliding = useSharedValue(false);
    const progress = useSharedValue(0);
    const min = useSharedValue(0);
    const max = useSharedValue(1);

    useEffect(() => {
        if (duration > 0) {
            progress.value = positionMillis / duration;
        }
    }, [positionMillis, duration]);

    // Format times
    const trackElapsedTime = formatSecondsToMinutes(positionMillis);
    const trackRemainingTime = formatSecondsToMinutes(
        duration - positionMillis
    );

    const handleSeek = async (value: number) => {
        try {
            await seek(value * duration);
        } catch (error) {
            console.error("Error seeking:", error);
        }
    };

    return (
        <View style={style}>
            <Slider
                progress={progress}
                minimumValue={min}
                maximumValue={max}
                containerStyle={{ height: 7, borderRadius: 16 }}
                thumbWidth={0}
                renderBubble={() => null}
                theme={{
                    minimumTrackTintColor: "rgba(255,255,255,0.4)",
                    maximumTrackTintColor: "rgba(255,255,255,0.6)",
                }}
                onSlidingStart={() => {
                    isSliding.value = true;
                }}
                onValueChange={async (value) => {
                    await handleSeek(value);
                }}
                onSlidingComplete={async (value) => {
                    // if the user is not sliding, we should not update the position
                    if (!isSliding.value) return;
                    isSliding.value = false;
                    await handleSeek(value);
                }}
            />
            <View style={styles.timeRow}>
                <Text style={styles.timeText}>{trackElapsedTime}</Text>
                <Text style={styles.timeText}>
                    {"-"} {trackRemainingTime}
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    timeRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "baseline",
        marginTop: 20,
    },
    timeText: {
        color: "#fff",
        opacity: 0.75,
        fontSize: 12,
        letterSpacing: 0.7,
        fontWeight: "500",
    },
});
