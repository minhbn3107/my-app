import React from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';



const ArtistDetail = ({ route }) => {
  const { artist } = route.params;  

  const renderPopularSong = ({ item }) => (
      <View style={styles.songContainer}>
          <Image source={{ uri: item.artwork }} style={styles.songImage} />
          <View style={styles.songInfo}>
              <Text style={styles.songTitle}>{item.title}</Text>
              <Text style={styles.songDetails}>{item.artist}</Text>
          </View>
          <TouchableOpacity>
              <Text style={styles.moreButton}>⋮</Text>
          </TouchableOpacity>
      </View>
  );

  return (
      <ScrollView style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
              <Image source={{ uri: artist.image }} style={styles.artistImage} />
              <Text style={styles.artistName}>{artist.displayName}</Text>
              <Text style={styles.artistFollowers}>{artist.followers}</Text>
              <View style={styles.actionButtons}>
                  <TouchableOpacity style={styles.followButton}>
                      <Text style={styles.followButtonText}>Follow</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.playButton}>
                      <Text style={styles.playButtonText}>▶</Text>
                  </TouchableOpacity>
              </View>
          </View>

          {/* Popular Songs */}
          <Text style={styles.sectionTitle}>Popular</Text>
          {artist.myPlaylists.map((song, songIndex) => (
              <View style={styles.songContainer} key={songIndex}>
                  <Image source={{ uri: song.artwork }} style={styles.songImage} />
                  <View style={styles.songInfo}>
                      <Text style={styles.songTitle}>{song.title}</Text>
                      <Text style={styles.songDetails}>{song.artist}</Text>
                  </View>
                  <TouchableOpacity>
                      <Text style={styles.moreButton}>⋮</Text>
                  </TouchableOpacity>
              </View>
          ))}

          {/* Albums Section */}
          <Text style={styles.sectionTitle}>Albums</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {artist.myPlaylists.map((album, albumIndex) => (
                  <View style={styles.albumContainer} key={albumIndex}>
                      <Image source={{ uri: album.artwork }} style={styles.albumImage} />
                      <Text style={styles.albumTitle}>{album.artist}</Text>
                  </View>
              ))}
          </ScrollView>
      </ScrollView>
  );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        padding: 20,
    },
    header: {
        alignItems: 'center',
        marginBottom: 20,
    },
    artistImage: {
        width: 120,
        height: 120,
        borderRadius: 60,
        marginBottom: 10,
    },
    artistName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    artistFollowers: {
        fontSize: 14,
        color: '#666',
        marginBottom: 10,
    },
    actionButtons: {
        flexDirection: 'row',
        marginTop: 10,
    },
    followButton: {
        backgroundColor: '#E0E0E0',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        marginRight: 10,
    },
    followButtonText: {
        fontSize: 14,
        color: '#333',
    },
    playButton: {
        backgroundColor: '#000',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
    },
    playButtonText: {
        fontSize: 14,
        color: '#FFF',
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
    },
    songContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    songImage: {
        width: 50,
        height: 50,
        borderRadius: 5,
        marginRight: 10,
    },
    songInfo: {
        flex: 1,
    },
    songTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    songDetails: {
        fontSize: 14,
        color: '#666',
    },
    moreButton: {
        fontSize: 18,
        color: '#999',
    },
    albumContainer: {
        marginRight: 10,
        alignItems: 'center',
    },
    albumImage: {
        width: 100,
        height: 100,
        borderRadius: 10,
        marginBottom: 5,
    },
    albumTitle: {
        fontSize: 12,
        color: '#333',
    },
});

export default ArtistDetail;
