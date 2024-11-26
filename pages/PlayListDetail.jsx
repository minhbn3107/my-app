import React from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    SafeAreaView,
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
    faChevronLeft,
    faEllipsisVertical,
    faPlay,
    faClock,
} from '@fortawesome/free-solid-svg-icons';

const PlayListDetail = ({ route, navigation }) => {
    const { item } = route.params;

    const formatDuration = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    return (
        <SafeAreaView style={styles.container}>

            <ScrollView style={styles.content}>
                {/* Playlist Info */}
                <View style={styles.playlistInfo}>
                    <Image source={{ uri: item.artwork }} style={styles.playlistImage} />
                    <View style={{paddingLeft:10}}>
                        <Text style={styles.playlistTitle}>{item.title}</Text>
                        <Text style={styles.creatorName}>{item.creatorName}</Text>
                        <Text style={styles.description}>{item.description}</Text>
                        <Text style={styles.songCount}>{item.songCount} songs</Text>
                    </View>
                </View>

                {/* Play Button */}
                <TouchableOpacity style={styles.playButton}>
                    <FontAwesomeIcon icon={faPlay} size={24} color="#FFF" />
                </TouchableOpacity>

                {/* Songs List */}
                <View style={styles.songsList}>
                    {item.songs.map((song, index) => (
                        <TouchableOpacity
                            key={song.songId}
                            style={styles.songItem}
                        >
                            <Image source={{ uri: song.artwork }} style={styles.songArtwork} />
                            <View style={styles.songInfo}>
                                <Text style={styles.songTitle}>{song.title}</Text>
                                <Text style={styles.artistName}>{song.artistName}</Text>
                            </View>
                            <View style={styles.songDuration}>
                                <FontAwesomeIcon icon={faClock} size={16} color="#666" />
                                <Text style={styles.durationText}>
                                    {formatDuration(song.duration)}
                                </Text>
                            </View>
                            <TouchableOpacity style={styles.songMenu}>
                                <FontAwesomeIcon icon={faEllipsisVertical} size={20} color="#666" />
                            </TouchableOpacity>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },

    content: {
        flex: 1,
    },
    playlistInfo: {
        flexDirection:"row",
        alignItems: 'center',
        padding: 20,
    },
    playlistImage: {
        width: 110,
        height: 110,
        borderRadius: 10,
        marginBottom: 16,
    },
    playlistTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    creatorName: {
        fontSize: 16,
        color: '#666',
        marginBottom: 8,
    },
    description: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
        marginBottom: 8,
    },
    songCount: {
        fontSize: 14,
        color: '#666',
    },
    playButton: {
        backgroundColor: '#000',
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginVertical: 20,
    },
    songsList: {
        padding: 16,
    },
    songItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    songArtwork: {
        width: 50,
        height: 50,
        borderRadius: 4,
    },
    songInfo: {
        flex: 1,
        marginLeft: 12,
    },
    songTitle: {
        fontSize: 16,
        fontWeight: '500',
        marginBottom: 4,
    },
    artistName: {
        fontSize: 14,
        color: '#666',
    },
    songDuration: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 16,
    },
    durationText: {
        marginLeft: 4,
        color: '#666',
        fontSize: 14,
    },
    songMenu: {
        padding: 8,
    },
});

export default PlayListDetail;