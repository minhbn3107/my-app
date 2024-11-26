import { Text, TouchableOpacity, View } from "react-native";
import React from "react";
import ProgressBar from "react-native-progress/Bar";
import { StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface UploadHeaderProps {
    pickDocument: () => void;
    selectedFile: any;
    removeFile: () => void;
    uploadProgress: number;
    getFileDetails: () => any;
}

const UploadHeader = ({
    pickDocument,
    selectedFile,
    removeFile,
    uploadProgress,
    getFileDetails,
}: UploadHeaderProps) => {
    return (
        <View style={styles.uploadArtworkCard}>
            <TouchableOpacity
                style={styles.uploadArtworkHeader}
                onPress={pickDocument}
            >
                <MaterialCommunityIcons
                    name="music-note-plus"
                    size={40}
                    color="#ffd45b"
                />
                <View style={styles.uploadContainer}>
                    <Text style={styles.uploadTitle}>Upload Song</Text>
                    <Text style={styles.uploadSubtitle}>
                        Audio Format: MP3, WAV, AAC
                    </Text>
                </View>
            </TouchableOpacity>
            {selectedFile && (
                <View style={styles.audioFileCard}>
                    <View style={styles.audioFileHeader}>
                        <Text style={styles.audioFileName}>
                            {getFileDetails()?.name || "Uploading file..."}
                        </Text>
                        <TouchableOpacity
                            onPress={removeFile}
                            style={styles.removeButton}
                        >
                            <MaterialCommunityIcons
                                name="close-circle"
                                size={24}
                                color="#FFF"
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.progressBar}>
                        <ProgressBar
                            progress={uploadProgress}
                            width={null}
                            color="#FFF"
                        />
                    </View>
                    <View style={styles.fileDetails}>
                        <Text style={styles.fileSize}>
                            {getFileDetails()?.size}
                        </Text>
                        <Text style={styles.fileTime}>
                            {uploadProgress >= 1 ? "Complete" : "Uploading..."}
                        </Text>
                    </View>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    uploadArtworkCard: {
        backgroundColor: "#1E1E1E",
        borderRadius: 20,
        padding: 20,
        marginBottom: 20,
    },
    uploadArtworkHeader: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
        justifyContent: "space-evenly",
    },
    uploadIcon: {
        width: 40,
        height: 40,
        marginRight: 10,
    },
    uploadContainer: {
        gap: 10,
    },
    uploadTitle: {
        fontSize: 16,
        fontWeight: "600",
        color: "#FFF",
    },
    uploadSubtitle: {
        fontSize: 12,
        color: "#B3B3B3",
        lineHeight: 18,
    },
    audioFileCard: {
        backgroundColor: "#FF6C3E",
        borderRadius: 15,
        padding: 15,
    },
    audioFileHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10,
    },
    audioFileName: {
        fontSize: 14,
        fontWeight: "600",
        color: "#FFF",
        flex: 1,
        marginRight: 10,
    },
    removeButton: {
        padding: 2,
    },
    progressBar: {
        height: 8,
        backgroundColor: "#FFA482",
        borderRadius: 4,
        overflow: "hidden",
        marginBottom: 10,
    },
    fileDetails: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    fileSize: {
        fontSize: 12,
        color: "#FFF",
    },
    fileTime: {
        fontSize: 12,
        color: "#FFF",
    },
});

export default UploadHeader;
