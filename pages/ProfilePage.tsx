import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Switch, ScrollView } from 'react-native';

const ProfilePage = () => {
    const [pushNotifications, setPushNotifications] = useState(false);
    const [play, setPlay] = useState(true);

    return (
        <ScrollView style={styles.container}>
            <View style={{ paddingBottom: 110 }}>
                <View style={styles.profileSection}>
                    <Image
                        source={{ uri: 'https://i.ibb.co/sVqS2Sd/4.jpg' }}
                        style={styles.avatar}
                    />
                    <Text style={styles.name}>NGUYEN VAN PHONG</Text>
                    <Text style={styles.email}>phong.brock@phogmail.com</Text>
                    <TouchableOpacity style={styles.editProfileButton}>
                        <Text style={styles.editProfileText}>Chỉnh sửa</Text>
                    </TouchableOpacity>
                </View>

                {/* Inventories Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Cá nhân</Text>
                    <View style={styles.item}>
                        <Text style={styles.itemText}>Đã lưu</Text>
                        <View style={styles.notificationBadge}>
                            <Text style={styles.badgeText}>8</Text>
                        </View>
                    </View>
                    <View style={styles.item}>
                        <Text style={styles.itemText}>Yêu thích</Text>
                    </View>
                </View>

                {/* Preferences Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Cài đặt</Text>
                    <View style={styles.item}>
                        <Text style={styles.itemText}>Thông báo đẩy</Text>
                        <Switch
                            value={pushNotifications}
                            onValueChange={(value) => setPushNotifications(value)}
                            trackColor={{ false: "#767577", true: "#6B39F4" }} 
                            thumbColor={pushNotifications ? "#6B39F4" : "#f4f3f4"} 

                        />
                    </View>
                    <View style={styles.item}>
                        <Text style={styles.itemText}>Tự động phát</Text>
                        <Switch
                            value={play}
                            onValueChange={(value) => setPlay(value)}
                            trackColor={{ false: "#767577", true: "#6B39F4" }} 
                            thumbColor={pushNotifications ? "#6B39F4" : "#f4f3f4"} 
                        />
                    </View>
                    <View style={styles.item}>
                        <TouchableOpacity style={styles.logoutButton}>
                            <Text style={styles.logoutText}>LOGOUT</Text>
                        </TouchableOpacity>
                    </View>
                </View>


            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    profileSection: {
        alignItems: 'center',
        marginBottom: 20,
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginBottom: 10,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    email: {
        color: '#888',
        marginBottom: 10,
    },
    editProfileButton: {
        backgroundColor: '#000',
        paddingVertical: 8,
        paddingHorizontal: 20,
        borderRadius: 20,
    },
    editProfileText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    section: {
        marginVertical: 10,
        padding: 10,
        borderRadius: 10,
        backgroundColor: '#f4f4f4',
    },
    sectionTitle: {
        fontSize: 16,
        color: '#888',
        marginBottom: 10,
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    itemText: {
        fontSize: 16,
        fontWeight: "500"
    },
    notificationBadge: {
        backgroundColor: '#0088ff',
        borderRadius: 10,
        paddingHorizontal: 8,
        paddingVertical: 2,
    },
    badgeText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    logoutButton: {
        alignItems: 'center',
        marginTop: 20,
        width:"100%",
        textAlign:"center"
    },
    logoutText: {
        color: '#ff3b30',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default ProfilePage;
