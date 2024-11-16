import { FlatList, FlatListProps, View, Text, Image } from "react-native";
import { TrackListItem } from "./TrackListItem";
import { useSoundStore, Track } from "..//hooks/useSoundStore";
import { StyleSheet } from "react-native";
export type TracksListProps = Partial<FlatListProps<Track>> & {
    tracks: Track[];
};
const ItemDivider = () => (
    <View
        style={{
            borderColor: "#9ca3af",
            borderWidth: StyleSheet.hairlineWidth,
            opacity: 0.3,
            marginVertical: 9,
            marginLeft: 60,
        }}
    />
);
export const TracksList = ({ tracks, ...flatlistProps }: TracksListProps) => {
    const { play, setVolume } = useSoundStore();
    const handleTrackSelect = async (track: Track) => {
        await play(track);
        setVolume(1);
    };

    return (
        <FlatList
            data={tracks}
            contentContainerStyle={{ paddingTop: 10, paddingBottom: 128 }}
            ListFooterComponent={ItemDivider}
            ItemSeparatorComponent={ItemDivider}
            ListEmptyComponent={
                <View>
                    <Text
                        style={{
                            fontSize: 20,
                            color: "#9ca3af",
                            textAlign: "center",
                            marginTop: 20,
                        }}
                    >
                        No songs found
                    </Text>
                    <Image
                        source={{
                            uri: "https://ibb.co/BzJ67Rc",
                        }}
                        style={{
                            width: 200,
                            height: 200,
                            alignSelf: "center",
                            marginTop: 40,
                            opacity: 0.2,
                        }}
                    />
                </View>
            }
            renderItem={({ item: track }) => (
                <TrackListItem
                    track={track}
                    onTrackSelect={handleTrackSelect}
                />
            )}
            {...flatlistProps}
        />
    );
};
