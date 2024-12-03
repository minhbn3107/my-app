import {
    ScrollView,
    StyleSheet,
    Alert,
    ActivityIndicator,
    View,
    Text,
    Modal,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";
import { useEffect, useState } from "react";
import UploadHeader from "../pages/UploadHeader";
import SongInfo from "../pages/SongInfo";
import handleUpdata from "../helpers/upload";
import { useNavigation } from "@react-navigation/native";
import { expressInstance } from "../helpers/axios";
import { getStored_id, getStoredDisplayName } from "../helpers/authStorage";

export interface SelectedFile {
    name: string;
    size: number;
    uri: string;
    mimeType: string;
}

const Upload = () => {
    const router = useNavigation();
    const [selectedFile, setSelectedFile] = useState<SelectedFile | null>(null);
    const [selectedFileUrl, setSelectedFileUrl] = useState<string>("");
    const [uploadProgress, setUploadProgress] = useState<number>(0);
    const [songTitle, setSongTitle] = useState("");
    const [songArtwork, setSongArtwork] = useState<SelectedFile | null>(null);
    const [mainVoiceGender, setMainVoiceGender] = useState<string>("male");
    const [languages, setLanguages] = useState<string[]>([]);
    const [genres, setGenres] = useState<string[]>([]);
    const [isCreatingNewPlaylist, setIsCreatingNewPlaylist] = useState(false);
    const [playlistName, setPlaylistName] = useState<string>("");
    const [existingPlaylists, setExistingPlaylists] = useState<string[]>([]);
    const [isPublic, setIsPublic] = useState<boolean>(false);
    const [playlistArtwork, setPlaylistArtwork] = useState<SelectedFile | null>(
        null
    );
    const [description, setDescription] = useState<string>("");
    const [isLoading, setIsLoading] = useState(false);
    const [_id, set_id] = useState(null);
    const [displayName, setDisplayName] = useState("");

    useEffect(() => {
        const fetchUser_id = async () => {
            try {
                const stored_id = await getStored_id();
                set_id(stored_id);
            } catch (error) {
                console.error("Failed to fetch username", error);
            }
        };
        const fetchDisplayName = async () => {
            try {
                const storedDisplayName = await getStoredDisplayName();
                setDisplayName(storedDisplayName);
            } catch (error) {
                console.error("Failed to fetch username", error);
            }
        };

        fetchUser_id();
        fetchDisplayName();
    }, []);

    const getAllPlaylistNames = async () => {
        try {
            const response = await expressInstance.get("/api/playlists/names", {
                params: {
                    userId: _id,
                },
            });

            if (response.data && response.data.playlists) {
                setExistingPlaylists(response.data.playlists);
            }
        } catch (error) {
            console.error("Failed to fetch playlists:", error);
        }
    };

    const requestPermission = async () => {
        const { status } =
            await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
            Alert.alert(
                "Permission Required",
                "Sorry, we need camera roll permissions to upload images!"
            );
            return false;
        }
        return true;
    };

    const pickSongArtwork = async () => {
        const hasPermission = await requestPermission();
        if (!hasPermission) return;

        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ["images"],
                allowsEditing: true,
                aspect: [1, 1],
                quality: 1,
            });

            if (!result.canceled) {
                const asset = result.assets[0];
                setSongArtwork({
                    name: asset.uri.split("/").pop() || "song-artwork.jpg",
                    size: 0,
                    uri: asset.uri,
                    mimeType: `image/${
                        asset.uri.split(".").pop()?.toLowerCase() || "jpeg"
                    }`,
                });
            }
        } catch (error) {
            Alert.alert(
                "Error",
                "An error occurred while picking the song artwork"
            );
        }
    };

    const pickPlaylistArtwork = async () => {
        const hasPermission = await requestPermission();
        if (!hasPermission) return;

        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ["images"],
                allowsEditing: true,
                aspect: [1, 1],
                quality: 1,
            });

            if (!result.canceled) {
                const asset = result.assets[0];
                setPlaylistArtwork({
                    name: asset.uri.split("/").pop() || "playlist-artwork.jpg",
                    size: 0,
                    uri: asset.uri,
                    mimeType: `image/${
                        asset.uri.split(".").pop()?.toLowerCase() || "jpeg"
                    }`,
                });
            }
        } catch (error) {
            Alert.alert(
                "Error",
                "An error occurred while picking the playlist artwork"
            );
        }
    };

    const pickDocument = async () => {
        try {
            const result = await DocumentPicker.getDocumentAsync({
                type: ["audio/*"],
                copyToCacheDirectory: false,
            });

            if (!result.canceled) {
                const file = result.assets[0];

                const fileSizeInMB = file.size / (1024 * 1024);

                if (fileSizeInMB > 10) {
                    Alert.alert(
                        "File Too Large",
                        "Please select an audio file smaller than 10MB"
                    );
                    return;
                }

                setSelectedFile({
                    name: file.name,
                    size: file.size,
                    uri: file.uri,
                    mimeType: file.mimeType ?? "audio/unknown",
                });
            }
        } catch (error) {
            Alert.alert(
                "Error",
                "An error occurred while picking the document"
            );
            console.error("Error picking document:", error);
        }
    };

    const removeFile = () => {
        Alert.alert(
            "Remove File",
            "Are you sure you want to remove this file?",
            [
                {
                    text: "Cancel",
                    style: "cancel",
                },
                {
                    text: "Remove",
                    onPress: () => {
                        setSelectedFile(null);
                        setUploadProgress(0);
                    },
                    style: "destructive",
                },
            ]
        );
    };

    const simulateUpload = () => {
        setUploadProgress(0);

        const interval = setInterval(() => {
            setUploadProgress((prevProgress) => {
                if (prevProgress >= 1) {
                    clearInterval(interval);
                    return 1;
                }
                return prevProgress + 0.1;
            });
        }, 500);
    };

    const uploadSong = async () => {
        if (!selectedFile) {
            console.error("No file selected");
            return;
        }

        try {
            const pickedFileUrl = await handleUpdata(selectedFile);
            setSelectedFileUrl(pickedFileUrl);
        } catch (error) {
            console.error("Error uploading song:", error);
            Alert.alert("Upload Error", "Failed to upload the song");
        }
    };

    const getFileDetails = () => {
        if (!selectedFile) return null;

        const totalSize = (selectedFile.size / (1024 * 1024)).toFixed(2);
        const uploadedSize = (Number(totalSize) * uploadProgress).toFixed(2);

        return {
            name: selectedFile.name,
            size: `${uploadedSize} / ${totalSize} MB`,
        };
    };

    useEffect(() => {
        getAllPlaylistNames();
    }, []);

    useEffect(() => {
        if (selectedFile) {
            uploadSong();
            simulateUpload();
        }
    }, [selectedFile]);

    const handleUpload = async () => {
        if (
            !selectedFile ||
            !songTitle ||
            !songArtwork ||
            !mainVoiceGender ||
            !languages.length ||
            !genres.length ||
            (!playlistName &&
                !isCreatingNewPlaylist &&
                !playlistArtwork &&
                !description)
        ) {
            Alert.alert("Error", "Please fill in all fields!");
            return;
        }

        setIsLoading(true);
        const songArtworkUrl = await handleUpdata(songArtwork);
        let playlistArtworkUrl = "";
        if (isCreatingNewPlaylist)
            playlistArtworkUrl = await handleUpdata(playlistArtwork);

        const body = {
            url: selectedFileUrl,
            title: songTitle,
            mainVoiceGender: mainVoiceGender,
            language: languages,
            genre: genres,
            artistId: _id,
            isPublic,
            artistName: displayName,
            artwork: songArtworkUrl,
            playlistName: playlistName,
            playlistArtwork: playlistArtworkUrl,
            description: description,
        };

        if (!isCreatingNewPlaylist) {
            delete body.playlistArtwork;
            delete body.description;
            delete body.isPublic;
        }

        const response = await expressInstance.post("/api/songs", body);

        setIsLoading(false);
        if (response.status === 201) {
            setIsLoading(false);
            router.navigate("Home" as never);
        } else {
            Alert.alert("Failed", "Song uploaded unsuccessful!");
        }
    };

    return (
        <ScrollView style={styles.container}>
            <UploadHeader
                pickDocument={pickDocument}
                selectedFile={selectedFile}
                removeFile={removeFile}
                uploadProgress={uploadProgress}
                getFileDetails={getFileDetails}
            />
            <SongInfo
                selectedFileUrl={selectedFileUrl}
                songTitle={songTitle}
                setSongTitle={setSongTitle}
                mainVoiceGender={mainVoiceGender}
                setMainVoiceGender={setMainVoiceGender}
                languages={languages}
                setLanguages={setLanguages}
                genres={genres}
                setGenres={setGenres}
                isCreatingNewPlaylist={isCreatingNewPlaylist}
                setIsCreatingNewPlaylist={setIsCreatingNewPlaylist}
                playlistName={playlistName}
                isPublic={isPublic}
                setIsPublic={setIsPublic}
                setPlaylistName={setPlaylistName}
                pickPlaylistArtwork={pickPlaylistArtwork}
                playlistArtwork={playlistArtwork}
                pickSongArtwork={pickSongArtwork}
                songArtwork={songArtwork}
                description={description}
                setDescription={setDescription}
                existingPlaylists={existingPlaylists}
                handleUpload={handleUpload}
            />
            {isLoading && (
                <Modal
                    transparent={true}
                    animationType="fade"
                    visible={isLoading}
                >
                    <View style={styles.overlay}>
                        <ActivityIndicator size="large" color="#fff" />
                        <Text style={styles.loadingText}>
                            Uploading Music...
                        </Text>
                    </View>
                </Modal>
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFDFB",
        padding: 20,
    },
    overlay: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    loadingText: {
        marginTop: 10,
        color: "#fff",
        fontSize: 16,
    },
});

export default Upload;
