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
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

export interface SelectedFile {
    name: string;
    size: number;
    uri: string;
    mimeType: string;
}

const Upload = () => {
    const router = useNavigation();
    const [selectedFile, setSelectedFile] = useState<SelectedFile | null>(null);
    const [uploadProgress, setUploadProgress] = useState<number>(0);
    const [songTitle, setSongTitle] = useState("");
    const [songArtwork, setSongArtwork] = useState<SelectedFile | null>(null);
    const [mainVoiceGender, setMainVoiceGender] = useState<string>("male");
    const [languages, setLanguages] = useState<string[]>([]);
    const [genres, setGenres] = useState<string[]>([]);
    const [isCreatingNewPlaylist, setIsCreatingNewPlaylist] = useState(false);
    const [playlistName, setPlaylistName] = useState<string>("");
    const [existingPlaylists, setExistingPlaylists] = useState<string[]>([]);
    const [playlistArtwork, setPlaylistArtwork] = useState<SelectedFile | null>(
        null
    );
    const [description, setDescription] = useState<string>("");
    const [isLoading, setIsLoading] = useState(false);

    const getAllPlaylistNames = async () => {
        try {
            const response = await axios.get(
                "http://192.168.101.20:3500/api/playlists/names",
                {
                    params: {
                        userId: "673b4f9b9fa09b0efbfb1a65",
                    },
                }
            );

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

                simulateUpload();
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
        const selectedFileUrl = await handleUpdata(selectedFile);
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
            artistId: "673b4f9b9fa09b0efbfb1a65",
            artistName: "Peter Parker",
            artwork: songArtworkUrl,
            playlistName: playlistName,
            playlistArtwork: playlistArtworkUrl,
            description: description,
        };

        if (!isCreatingNewPlaylist) {
            delete body.playlistArtwork;
            delete body.description;
        }

        const reponse = await axios.post(
            "http://192.168.101.20:3500/api/songs",
            body
        );

        if (reponse.status === 201) {
            setIsLoading(false);
            router.navigate("Music" as never);
        }

        setIsLoading(false);
        Alert.alert("Failed", "Song uploaded unsuccessful!");
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
                        <Text style={styles.loadingText}>Uploading...</Text>
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