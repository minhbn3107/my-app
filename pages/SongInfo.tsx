import React, { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import {
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Modal,
    KeyboardAvoidingView,
    Platform,
} from "react-native";
import { View, Text } from "react-native";

interface SelectedFile {
    name: string;
    size: number;
    uri: string;
    mimeType: string;
}

interface SongInfoProps {
    songTitle: string;
    setSongTitle: (title: string) => void;
    mainVoiceGender: string;
    setMainVoiceGender: (gender: string) => void;
    languages: string[];
    setLanguages: (languages: string[]) => void;
    genres: string[];
    setGenres: (genres: string[]) => void;
    isCreatingNewPlaylist: boolean;
    setIsCreatingNewPlaylist: (isCreating: boolean) => void;
    playlistName: string;
    setPlaylistName: (name: string) => void;
    pickPlaylistArtwork: () => void;
    playlistArtwork: SelectedFile | null;
    songArtwork: SelectedFile | null;
    pickSongArtwork: () => void;
    description: string;
    setDescription: (description: string) => void;
    existingPlaylists: string[];
    handleUpload: () => void;
}

const DEFAULT_LANGUAGES = [
    "English",
    "Spanish",
    "French",
    "German",
    "Mandarin",
];
const DEFAULT_GENRES = ["Pop", "Rock", "Hip-Hop", "Jazz", "Classical"];

const SongInfo: React.FC<SongInfoProps> = ({
    songTitle,
    setSongTitle,
    mainVoiceGender,
    setMainVoiceGender,
    languages,
    setLanguages,
    genres,
    setGenres,
    isCreatingNewPlaylist,
    setIsCreatingNewPlaylist,
    playlistName,
    setPlaylistName,
    pickPlaylistArtwork,
    playlistArtwork,
    songArtwork,
    pickSongArtwork,
    description,
    setDescription,
    existingPlaylists,
    handleUpload,
}) => {
    const [isLanguageModalVisible, setLanguageModalVisible] = useState(false);
    const [isGenreModalVisible, setGenreModalVisible] = useState(false);
    const [newLanguage, setNewLanguage] = useState("");
    const [newGenre, setNewGenre] = useState("");

    const toggleOption = (
        option: string,
        currentOptions: string[],
        setOptions: (options: string[]) => void
    ) => {
        setOptions(
            currentOptions.includes(option)
                ? currentOptions.filter((item) => item !== option)
                : [...currentOptions, option]
        );
    };

    const addNewOption = (
        newOption: string,
        currentOptions: string[],
        defaultOptions: string[],
        setOptions: (options: string[]) => void,
        setModalVisible: (visible: boolean) => void
    ) => {
        const trimmedOption = newOption.trim();
        if (
            trimmedOption &&
            !currentOptions.includes(trimmedOption) &&
            !defaultOptions.includes(trimmedOption)
        ) {
            setOptions([...currentOptions, trimmedOption]);
        }
        setModalVisible(false);
    };

    const renderOptionModal = (
        isVisible: boolean,
        setVisibility: (visible: boolean) => void,
        newOption: string,
        setNewOption: (option: string) => void,
        onAddOption: () => void,
        title: string,
        placeholder: string
    ) => (
        <Modal
            animationType="slide"
            transparent={true}
            visible={isVisible}
            onRequestClose={() => setVisibility(false)}
        >
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.modalContainer}
            >
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>{title}</Text>
                    <TextInput
                        style={styles.modalInput}
                        placeholder={placeholder}
                        value={newOption}
                        onChangeText={setNewOption}
                    />
                    <View style={styles.modalButtonContainer}>
                        <TouchableOpacity
                            style={styles.modalCancelButton}
                            onPress={() => setVisibility(false)}
                        >
                            <Text style={styles.modalCancelText}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.modalAddButton}
                            onPress={onAddOption}
                        >
                            <Text style={styles.modalAddText}>Add</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </Modal>
    );

    return (
        <View style={styles.songInfoSection}>
            <View style={styles.songInfoHeader}>
                <Text style={styles.songInfoTitle}>Song Information</Text>
            </View>

            <Text style={styles.label}>Song Title</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter song title"
                value={songTitle}
                onChangeText={setSongTitle}
            />
            <Text style={styles.label}>Song Artwork</Text>
            <TouchableOpacity
                onPress={pickSongArtwork}
                style={styles.uploadArtworkButton}
            >
                <Text style={styles.uploadText}>
                    {songArtwork ? songArtwork.name : "Upload Song Artwork"}
                </Text>
            </TouchableOpacity>
            <Text style={styles.label}>Main Voice Gender</Text>
            <View style={styles.radioGroup}>
                {["male", "female"].map((gender) => (
                    <TouchableOpacity
                        key={gender}
                        style={[
                            styles.radioOption,
                            mainVoiceGender === gender && styles.radioSelected,
                        ]}
                        onPress={() => setMainVoiceGender(gender)}
                    >
                        <Text>{gender}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            <Text style={styles.label}>Languages</Text>
            <View style={styles.checkboxGroup}>
                {DEFAULT_LANGUAGES.map((language) => (
                    <TouchableOpacity
                        key={language}
                        style={[
                            styles.checkbox,
                            languages.includes(language) &&
                                styles.checkboxSelected,
                        ]}
                        onPress={() =>
                            toggleOption(language, languages, setLanguages)
                        }
                    >
                        <Text>{language}</Text>
                    </TouchableOpacity>
                ))}
                {languages
                    .filter((lang) => !DEFAULT_LANGUAGES.includes(lang))
                    .map((customLanguage) => (
                        <TouchableOpacity
                            key={customLanguage}
                            style={[styles.checkbox, styles.checkboxSelected]}
                            onPress={() =>
                                toggleOption(
                                    customLanguage,
                                    languages,
                                    setLanguages
                                )
                            }
                        >
                            <Text>{customLanguage}</Text>
                        </TouchableOpacity>
                    ))}
                <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => setLanguageModalVisible(true)}
                >
                    <Text style={styles.addButtonText}>+</Text>
                </TouchableOpacity>
            </View>

            <Text style={styles.label}>Genres</Text>
            <View style={styles.checkboxGroup}>
                {DEFAULT_GENRES.map((genre) => (
                    <TouchableOpacity
                        key={genre}
                        style={[
                            styles.checkbox,
                            genres.includes(genre) && styles.checkboxSelected,
                        ]}
                        onPress={() => toggleOption(genre, genres, setGenres)}
                    >
                        <Text>{genre}</Text>
                    </TouchableOpacity>
                ))}
                {genres
                    .filter((gen) => !DEFAULT_GENRES.includes(gen))
                    .map((customGenre) => (
                        <TouchableOpacity
                            key={customGenre}
                            style={[styles.checkbox, styles.checkboxSelected]}
                            onPress={() =>
                                toggleOption(customGenre, genres, setGenres)
                            }
                        >
                            <Text>{customGenre}</Text>
                        </TouchableOpacity>
                    ))}
                <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => setGenreModalVisible(true)}
                >
                    <Text style={styles.addButtonText}>+</Text>
                </TouchableOpacity>
            </View>
            <Text style={styles.label}>Playlist</Text>
            <View style={styles.radioGroup}>
                <TouchableOpacity
                    style={[
                        styles.radioOption,
                        !isCreatingNewPlaylist && styles.radioSelected,
                    ]}
                    onPress={() => setIsCreatingNewPlaylist(false)}
                >
                    <Text>Choose Existing Playlist</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        styles.radioOption,
                        isCreatingNewPlaylist && styles.radioSelected,
                    ]}
                    onPress={() => setIsCreatingNewPlaylist(true)}
                >
                    <Text>Create New Playlist</Text>
                </TouchableOpacity>
            </View>
            {!isCreatingNewPlaylist ? (
                <View style={styles.dropdown}>
                    <Picker
                        selectedValue={playlistName}
                        onValueChange={(itemValue) =>
                            setPlaylistName(itemValue)
                        }
                    >
                        <Picker.Item label="Select a playlist" value="" />
                        {existingPlaylists.map((playlist) => (
                            <Picker.Item
                                key={playlist}
                                label={playlist}
                                value={playlist}
                            />
                        ))}
                    </Picker>
                </View>
            ) : (
                <TextInput
                    style={styles.input}
                    placeholder="Enter new playlist name"
                    value={playlistName}
                    onChangeText={setPlaylistName}
                />
            )}

            {isCreatingNewPlaylist && (
                <>
                    <Text style={styles.label}>Playlist Artwork</Text>
                    <TouchableOpacity
                        onPress={pickPlaylistArtwork}
                        style={[
                            styles.uploadArtworkButton,
                            !isCreatingNewPlaylist && styles.disabledField,
                        ]}
                        disabled={!isCreatingNewPlaylist}
                    >
                        <Text style={styles.uploadText}>
                            {playlistArtwork
                                ? playlistArtwork.name
                                : "Upload Playlist Artwork"}
                        </Text>
                    </TouchableOpacity>

                    <Text style={styles.label}>Playlist Description</Text>
                    <TextInput
                        style={[
                            styles.input,
                            styles.textArea,
                            !isCreatingNewPlaylist && styles.disabledField,
                        ]}
                        placeholder="Enter playlist description"
                        value={description}
                        onChangeText={setDescription}
                        multiline
                        editable={isCreatingNewPlaylist}
                    />
                </>
            )}
            <TouchableOpacity
                style={styles.uploadButton}
                onPress={handleUpload}
            >
                <Text style={styles.uploadText}>Upload Song</Text>
            </TouchableOpacity>

            {renderOptionModal(
                isLanguageModalVisible,
                setLanguageModalVisible,
                newLanguage,
                setNewLanguage,
                () =>
                    addNewOption(
                        newLanguage,
                        languages,
                        DEFAULT_LANGUAGES,
                        setLanguages,
                        setLanguageModalVisible
                    ),
                "Add New Language",
                "Enter language name"
            )}

            {renderOptionModal(
                isGenreModalVisible,
                setGenreModalVisible,
                newGenre,
                setNewGenre,
                () =>
                    addNewOption(
                        newGenre,
                        genres,
                        DEFAULT_GENRES,
                        setGenres,
                        setGenreModalVisible
                    ),
                "Add New Genre",
                "Enter genre name"
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    songInfoSection: {
        backgroundColor: "#FFF",
        borderRadius: 20,
        padding: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 2,
    },
    songInfoHeader: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        marginBottom: 15,
    },
    songInfoTitle: {
        fontSize: 16,
        fontWeight: "700",
        color: "#1E1E1E",
    },
    uploadButton: {
        backgroundColor: "#fff",
        borderRadius: 30,
        padding: 10,
        borderColor: "#6B39F4",
        borderWidth: 1,
        margin: 20,
    },
    uploadText: {
        fontSize: 16,
        fontWeight: "700",
        color: "#6B39F4",
        textAlign: "center",
    },
    label: {
        fontSize: 14,
        color: "#707070",
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: "#EDEDED",
        borderRadius: 10,
        padding: 10,
        fontSize: 14,
        color: "#1E1E1E",
    },
    radioGroup: {
        flexDirection: "row",
        marginBottom: 15,
    },
    radioOption: {
        marginRight: 15,
        padding: 5,
        borderWidth: 1,
        borderColor: "#EDEDED",
        borderRadius: 10,
    },
    radioSelected: {
        borderColor: "#6B39F4",
    },
    checkboxGroup: {
        flexDirection: "row",
        flexWrap: "wrap",
        marginBottom: 15,
    },
    checkbox: {
        marginRight: 10,
        marginBottom: 10,
        padding: 5,
        borderWidth: 1,
        borderColor: "#EDEDED",
        borderRadius: 10,
    },
    checkboxSelected: {
        borderColor: "#6B39F4",
    },
    uploadArtworkButton: {
        borderWidth: 1,
        borderColor: "#EDEDED",
        borderRadius: 10,
        padding: 10,
        alignItems: "center",
        marginBottom: 15,
    },
    textArea: {
        height: 100,
        textAlignVertical: "top",
    },
    addButton: {
        marginRight: 10,
        marginBottom: 10,
        padding: 5,
        borderWidth: 1,
        borderColor: "#6B39F4",
        borderRadius: 10,
        width: 35,
        height: 35,
        justifyContent: "center",
        alignItems: "center",
    },
    addButtonText: {
        color: "#6B39F4",
        fontSize: 18,
        fontWeight: "bold",
    },
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.5)",
    },
    modalContent: {
        backgroundColor: "white",
        padding: 20,
        borderRadius: 20,
        width: "80%",
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: "700",
        marginBottom: 15,
        textAlign: "center",
    },
    modalInput: {
        borderWidth: 1,
        borderColor: "#EDEDED",
        borderRadius: 10,
        padding: 10,
        marginBottom: 15,
    },
    modalButtonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    modalCancelButton: {
        flex: 1,
        marginRight: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: "#6B39F4",
        borderRadius: 10,
    },
    modalCancelText: {
        color: "#6B39F4",
        textAlign: "center",
    },
    modalAddButton: {
        flex: 1,
        padding: 10,
        backgroundColor: "#6B39F4",
        borderRadius: 10,
    },
    modalAddText: {
        color: "white",
        textAlign: "center",
    },
    disabledField: {
        backgroundColor: "#f5f5f5",
        color: "#ccc",
        borderColor: "#e0e0e0",
    },
    dropdown: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        padding: 10,
        backgroundColor: "#fff",
        marginBottom: 15,
    },
});

export default SongInfo;
