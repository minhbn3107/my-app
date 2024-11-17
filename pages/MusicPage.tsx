import library from "../assets/data/library.json";
import { ScrollView, View, StyleSheet } from "react-native";
import { TracksList } from "./TracksList";

const MusicPage = () => {
    return (
        <View style={styles.contentContainer}>
            <ScrollView
                contentInsetAdjustmentBehavior="automatic"
                style={{
                    paddingHorizontal: 24,
                }}
            >
                <TracksList tracks={library} scrollEnabled={false} />
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
