import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const MyPlayList = ({ route, navigation }) => {
    const { ARRAY_MY_PLAYLIST } = route.params;

    return (
        <View style={styles.container}>
            <Text style={styles.text_heading}>Your playlists</Text>
            <View style={styles.lineRP}>
                {ARRAY_MY_PLAYLIST.map((item, index) => (
                    <TouchableOpacity
                        key={index}
                        style={styles.itemRP}
                        onPress={() => navigation.navigate('PlayListDetail', { item })}
                    >
                        <View>
                            <Image source={{ uri: item.artwork }} style={styles.imageRP} />
                        </View>
                        <View style={{
                            width: "100%", paddingLeft: 10, paddingRight: 90,
                            flexDirection: "row", justifyContent: "space-between", alignItems: "center"
                        }}>
                            <View>
                                <Text style={styles.title}>{item.title}</Text>
                                <Text style={styles.creator}>{item.creatorName}</Text>
                                <Text style={styles.songCount}>{item.songCount} songs</Text></View>
                            <View>
                                <FontAwesomeIcon icon={faAngleRight} size={20} />
                            </View>
                        </View>
                    </TouchableOpacity>
                ))}
            </View>
            <TouchableOpacity style={styles.addButton}>
                <Text style={styles.addButtonText}>+</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    text_heading: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    itemRP: {
        flexDirection: "row",
        marginTop: 15,
        position: "relative",
        borderBottomColor:"#eaeaea",
        borderBottomWidth:1,
        paddingBottom:15
    },

    imageRP: {
        width: 90,
        height: 90,
        borderRadius: 10,
        opacity: 0.8,
    },
    title: {
        textAlign: 'left',
        fontWeight: '600',
        fontSize: 18,
    },
    creator: {
        fontSize: 14,
        color: '#666',
    },
    songCount: {
        fontSize: 12,
        color: '#999',
    },
    addButton: {
        position: 'absolute',
        bottom: 30,
        right: 30,
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#6B39F4',
        justifyContent: 'center',
        alignItems: 'center',
    },
    addButtonText: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
    },
});

export default MyPlayList;
