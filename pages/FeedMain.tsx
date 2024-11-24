import React from 'react';
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faThumbsUp, faComment } from '@fortawesome/free-solid-svg-icons';

const posts = [
    {
        id: '1',
        userName: 'Alan Patterson',
        time: '2m',
        content: 'Was great meeting up with Anna Ferguson and Dave Bishop at the breakfast talk! 🥂🥐',
        imageUrl: 'https://i.ibb.co/njbB1SX/K-Pop-Star-IU-1-600x400.jpg', // Example image URL
        avatarUrl: 'https://i.ibb.co/4MHWXDR/1.jpg',
        likes: 45,
        comments: 3,
    },
    {
        id: '2',
        userName: 'Sarah Johnson',
        time: '5m',
        content: 'Enjoyed the beautiful sunset with some friends!',
        imageUrl: 'https://i.ibb.co/L6xQh66/Anh-IU-1.jpg',
        avatarUrl: 'https://i.ibb.co/sVqS2Sd/4.jpg',
        likes: 76,
        comments: 12,
    },
    {
        id: '3',
        userName: 'Sarah Johnson',
        time: '5m',
        content: 'Enjoyed the beautiful sunset with some friends!',
        imageUrl: 'https://i.ibb.co/JQQPGVh/37eab5f4-09a6-46fc-8bae-2996fd3c5ffeyzlwhw30.jpg',
        avatarUrl: 'https://i.ibb.co/sVqS2Sd/4.jpg',
        likes: 76,
        comments: 12,
    },
];

const PostItem = ({ post }) => {
    return (
        <View style={styles.postContainer}>
            <View style={styles.header}>
                <Image source={{ uri: post.avatarUrl }} style={styles.avatar} />
                <View style={styles.userInfo}>
                    <Text style={styles.userName}>{post.userName}</Text>
                    <Text style={styles.time}>{post.time}</Text>
                </View>
            </View>
            <Text style={styles.content}>{post.content}</Text>
            <Image source={{ uri: post.imageUrl }} style={styles.postImage} />
            <View style={styles.footer}>
                <TouchableOpacity style={styles.iconContainer}>
                    <FontAwesomeIcon icon={faThumbsUp} size={18} color="#606770" />
                    <Text style={styles.iconText}>{post.likes}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconContainer}>
                    <FontAwesomeIcon icon={faComment} size={18} color="#606770" />
                    <Text style={styles.iconText}>{post.comments}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const FeedMain = () => {
    return (
        <View style={{paddingBottom:60}}>

            <FlatList
                data={posts}
                renderItem={({ item }) => <PostItem post={item} />}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.container}
            />
        </View>
    );
};

export default FeedMain;

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    postContainer: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 10,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 2,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
    },
    userInfo: {
        flexDirection: 'column',
    },
    userName: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    time: {
        color: '#888',
        fontSize: 12,
    },
    content: {
        marginBottom: 10,
        fontSize: 14,
    },
    postImage: {
        width: '100%',
        height: 200,
        borderRadius: 10,
        marginBottom: 10,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    iconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconText: {
        marginLeft: 5,
        color: '#606770',
    },
});
