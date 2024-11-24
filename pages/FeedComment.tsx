import React from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, TextInput, StyleSheet } from 'react-native';

const comments = [
    { id: '1', name: 'Sally Rooney', comment: 'Do duis cul', likes: 1, time: '17h', emoji: '😍' },
    { id: '2', name: 'Jason', comment: 'Minim magna exc', likes: 1, time: '48m', emoji: '😍' },
    { id: '3', name: 'Michael Key', comment: '@Jason Smith Deserunt officia consectetur adipi', likes: 2, time: '40m' },
    { id: '4', name: 'Liam Pham', comment: 'Commodo', likes: 1, time: '48m', emoji: '🔥' },
    { id: '5', name: 'Kiran Glaucus', comment: 'Esse consequat cillum ex', likes: 2, time: '40m' },
    { id: '6', name: 'Kiran Glaucus 2', comment: 'Esse consequat ád', likes: 77, time: '40m' }
];

const FeedComment = () => {
    const renderComment = ({ item }) => (
        <View style={styles.commentContainer}>
            <Image style={styles.profileImage} source={require("../assets/item_1.png")} />
            <View style={styles.commentContent}>
                <Text style={styles.nameText}>{item.name}</Text>
                <Text style={styles.commentText}>{item.comment} {item.emoji && <Text>{item.emoji}</Text>}</Text>
                <View style={styles.commentFooter}>
                    <Text style={styles.timeText}>{item.time}</Text>
                    <Text style={styles.likeText}>{item.likes} like</Text>
                    <TouchableOpacity>
                        <Text style={styles.replyText}>Reply</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>STACK FEED</Text>
            </View>
            <Text style={styles.commentsTitle}>3 comments</Text>
            <FlatList
                data={comments}
                keyExtractor={(item) => item.id}
                renderItem={renderComment}
            />
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Write a comment..."
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff'
    },
    header: {
        paddingVertical: 10,
        alignItems: 'center'
    },
    headerText: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    postContainer: {
        marginBottom: 16,
        alignItems: 'center'
    },
    postImage: {
        width: '100%',
        height: 200,
        borderRadius: 8
    },
    commentsTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 25
    },
    commentContainer: {
        flexDirection: 'row',
        marginBottom: 16
    },
    profileImage: {
        width: 40,
        height: 40,
        borderRadius: 20
    },
    commentContent: {
        marginLeft: 12,
        flex: 1
    },
    nameText: {
        fontSize: 14,
        fontWeight: 'bold'
    },
    commentText: {
        fontSize: 14,
        marginVertical: 4
    },
    commentFooter: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    timeText: {
        fontSize: 12,
        color: '#888',
        marginRight: 12
    },
    likeText: {
        fontSize: 12,
        color: '#888',
        marginRight: 12
    },
    replyText: {
        fontSize: 12,
        color: '#007AFF'
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8
    },
    input: {
        flex: 1,
        padding: 8,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 20,
        paddingHorizontal: 16
    },
});

export default FeedComment;
