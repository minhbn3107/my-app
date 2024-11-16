import library from "../assets/data/library.json";
import { trackTitleFilter } from "../helpers/filter";
import { useNavigationSearch } from "../hooks/useNavigationSearch";
import { useMemo } from "react";
import { ScrollView, View, StyleSheet } from "react-native";
import { TracksList } from "./TracksList";
import { Track } from "../hooks/useSoundStore";

const MusicPage = () => {
    const search = useNavigationSearch({
        searchBarOptions: {
            placeholder: "Find in songs",
        },
    });

    const filteredTracks = useMemo(() => {
        if (!search) return library as Track[];
        return (library as Track[]).filter(trackTitleFilter(search));
    }, [search]);

    return (
        <View style={styles.contentContainer}>
            <ScrollView
                contentInsetAdjustmentBehavior="automatic"
                style={{
                    paddingHorizontal: 24,
                }}
            >
                <TracksList tracks={filteredTracks} scrollEnabled={false} />
            </ScrollView>
        </View>
    );
};

export default MusicPage;

const styles = StyleSheet.create({
    contentContainer: {
        flex: 1,
    },
});
