import { useEffect } from "react";
import { useSoundStore } from "../hooks/useSoundStore";
import { Ionicons } from "@expo/vector-icons";
import { View, ViewProps } from "react-native";
import { Slider } from "react-native-awesome-slider";
import { useSharedValue } from "react-native-reanimated";

export const PlayerVolumeBar = ({ style }: ViewProps) => {
    const { volume, setVolume } = useSoundStore();
    const progress = useSharedValue(0);
    const min = useSharedValue(0);
    const max = useSharedValue(1);

    // Synchronize shared value with the volume state
    useEffect(() => {
        progress.value = volume ?? 0;
    }, [volume, progress]);

    return (
        <View style={style}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Ionicons
                    name="volume-low"
                    size={20}
                    color="#fff"
                    style={{ opacity: 0.8 }}
                />
                <View
                    style={{
                        flex: 1,
                        flexDirection: "row",
                        paddingHorizontal: 10,
                    }}
                >
                    <Slider
                        progress={progress}
                        minimumValue={min}
                        containerStyle={{ height: 7, borderRadius: 16 }}
                        onValueChange={(value) => {
                            setVolume(value);
                        }}
                        renderBubble={() => null}
                        theme={{
                            maximumTrackTintColor: "rgba(255,255,255,0.4)",
                            minimumTrackTintColor: "rgba(255,255,255,0.6)",
                        }}
                        thumbWidth={0}
                        maximumValue={max}
                    />
                </View>
                <Ionicons
                    name="volume-high"
                    size={20}
                    color="#fff"
                    style={{ opacity: 0.8 }}
                />
            </View>
        </View>
    );
};
