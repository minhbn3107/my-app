import { useState, useEffect } from "react";
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    Switch,
    ScrollView,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons/faAngleRight";
import { expressInstance } from "../helpers/axios";
import { getStored_id, logout } from "../helpers/authStorage";
import { Artist } from "./Search";

const ProfilePage = ({ navigation }) => {
    const [playlists, setPlaylists] = useState([]);
    const [user, setUser] = useState<Artist>();
    const [_id, set_id] = useState(null);
    const [isArtist, setIsArtist] = useState(false);

    const getAllPlaylists = async () => {
        const playlistResponse = await expressInstance.get(
            `/api/playlists/artist/${_id}`
        );
        setPlaylists(playlistResponse.data.playlists);
    };

    const fetchUser_id = async () => {
        try {
            const stored_id = await getStored_id();
            set_id(stored_id);
        } catch (error) {
            console.error("Failed to fetch user ID", error);
        }
    };

    const getUserInfo = async () => {
        try {
            const userInfo = await expressInstance.get(`/api/users/${_id}`);
            setUser(userInfo.data);
            setIsArtist(userInfo.data.isArtist);
        } catch (error) {
            console.error("Failed to fetch user info", error);
        }
    };

    const handleArtistToggle = async () => {
        try {
            await expressInstance.patch("/api/users", {
                id: _id,
            });
            setIsArtist((prevState) => !prevState);
        } catch (error) {
            console.error("Failed to update artist status", error);
        }
    };

    useEffect(() => {
        fetchUser_id();
    }, []);

    useEffect(() => {
        if (_id) {
            getUserInfo();
            getAllPlaylists();
        }
    }, [_id]);

    const handleLogout = async () => {
        await logout();
        navigation.navigate("Login", { isRegister: false });
    };

    return (
        <ScrollView style={styles.container}>
            <View style={{ paddingBottom: 100 }}>
                <View style={styles.profileSection}>
                    {user && (
                        <View>
                            <Image
                                source={{ uri: user.imageURL }}
                                style={styles.avatar}
                            />
                            <Text style={styles.name}>{user.displayName}</Text>
                            <Text style={styles.email}>@{user.username}</Text>
                        </View>
                    )}

                    <View
                        style={{
                            justifyContent: "center",
                            alignItems: "center",
                            paddingRight: 15,
                        }}
                    >
                        <Text style={{ fontSize: 16 }}>Followers</Text>
                        <Text style={{ fontWeight: "700", fontSize: 19 }}>
                            {user?.followers.length}
                        </Text>
                    </View>
                    <View style={styles.artistSwitchContainer}>
                        <View style={styles.artistSwitchTextContainer}>
                            <Text style={styles.artistSwitchTitle}>
                                Artist Mode
                            </Text>
                            <Text style={styles.artistSwitchSubtitle}>
                                Enable artist features
                            </Text>
                        </View>
                        <Switch
                            value={isArtist}
                            onValueChange={handleArtistToggle}
                            trackColor={{ false: "#e0e0e0", true: "#6B39F4" }}
                            thumbColor={isArtist ? "#ffffff" : "#f4f3f4"}
                        />
                    </View>
                </View>
                <View
                    style={{ marginTop: 15, marginBottom: 20, paddingRight: 5 }}
                >
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                        }}
                    >
                        <Text style={styles.text_heading}>My Playlists</Text>
                    </View>
                    {playlists.map((item) => (
                        <View style={styles.lineRP} key={item._id}>
                            <TouchableOpacity
                                style={styles.itemRP}
                                onPress={() => {
                                    navigation.navigate("PlayListDetail", {
                                        playlist: item,
                                    });
                                }}
                            >
                                <View>
                                    <Image
                                        source={{ uri: item.artwork }}
                                        style={styles.imageRP}
                                    />
                                </View>
                                <View
                                    style={{
                                        width: "100%",
                                        paddingLeft: 10,
                                        paddingRight: 90,
                                        flexDirection: "row",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                    }}
                                >
                                    <View>
                                        <Text style={styles.title}>
                                            {item.title}
                                        </Text>
                                        <Text style={styles.creator}>
                                            {item.creatorName}
                                        </Text>
                                        <Text style={styles.songCount}>
                                            {item.songCount} songs
                                        </Text>
                                    </View>
                                    <View>
                                        <FontAwesomeIcon
                                            icon={faAngleRight}
                                            size={20}
                                        />
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>
                <View style={styles.section}>
                    <View style={styles.item}>
                        <TouchableOpacity
                            style={styles.logoutButton}
                            onPress={handleLogout}
                        >
                            <Text style={styles.logoutText}>LOG OUT</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ height: 60 }}></View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 10,
    },
    profileSection: {
        width: "100%",
        padding: 12,
        flexDirection: "row",
        gap: 10,
        borderColor: "#e2e2e2",
        borderWidth: 1,
        borderRadius: 11,
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginBottom: 10,
    },
    name: {
        fontSize: 15,
        fontWeight: "bold",
        textAlign: "center",
    },
    email: {
        color: "#888",
        marginBottom: 10,
        textAlign: "center",
    },
    editProfileButton: {
        backgroundColor: "#000",
        paddingVertical: 8,
        paddingHorizontal: 20,
        borderRadius: 20,
    },
    editProfileText: {
        color: "#fff",
        fontWeight: "bold",
    },
    section: {
        padding: 10,
        borderRadius: 10,
        backgroundColor: "#f4f4f4",
    },
    sectionTitle: {
        fontSize: 16,
        color: "#888",
    },
    item: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 12,
        borderBottomColor: "#e0e0e0",
    },
    itemText: {
        fontSize: 16,
        fontWeight: "500",
    },
    notificationBadge: {
        backgroundColor: "#0088ff",
        borderRadius: 10,
        paddingHorizontal: 8,
        paddingVertical: 2,
    },
    badgeText: {
        color: "#fff",
        fontWeight: "bold",
    },
    logoutButton: {
        alignItems: "center",
        width: "100%",
        textAlign: "center",
    },
    logoutText: {
        color: "#ff3b30",
        fontSize: 16,
        fontWeight: "bold",
    },

    text_heading: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 16,
        marginTop: 5,
    },
    playlist_heading: {
        color: "blue",
        fontWeight: "500",
        fontSize: 18,
    },

    laylist_heading: {
        color: "blue",
        fontWeight: "500",
        fontSize: 18,
    },
    lineTopAr: {
        flexDirection: "row",
    },
    itemtopAr: {
        margin: 10,
    },
    imageTop: {
        width: 60,
        height: 60,
        borderRadius: 100,
    },
    imgnewAb: {
        width: "100%",
        height: 160,
        objectFit: "cover",
        borderRadius: 15,
        marginTop: 10,
        opacity: 0.9,
    },
    btnPlay: {
        width: 45,
        height: 45,
        padding: 9,
        backgroundColor: "#fff",
        borderRadius: 100,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 2,
    },
    lineRP: {
        flexDirection: "column",
    },
    itemRP: {
        flexDirection: "row",
        marginTop: 15,
        borderBottomColor: "#eaeaea",
        borderBottomWidth: 1,
        paddingBottom: 15,
    },
    imageRP: {
        width: 90,
        height: 90,
        borderRadius: 10,
        opacity: 0.8,
    },
    title: {
        textAlign: "left",
        fontWeight: "600",
        fontSize: 18,
    },
    creator: {
        fontSize: 14,
        color: "#666",
    },
    songCount: {
        fontSize: 12,
        color: "#999",
    },
    artistSwitchContainer: {
        flex: 1,
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#ffffff",
        padding: 15,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#e0e0e0",
    },
    artistSwitchTextContainer: {
        flex: 1,
        marginRight: 15,
    },
    artistSwitchTitle: {
        fontSize: 16,
        fontWeight: "600",
        color: "#000",
    },
    artistSwitchSubtitle: {
        fontSize: 13,
        color: "#666",
        marginTop: 4,
    },
});

export default ProfilePage;
