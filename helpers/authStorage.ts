import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEYS = {
    _ID: "_id",
    USERNAME: "username",
    DISPLAY_NAME: "displayName",
    IMAGE_URL: "imageUrl",
};

export const checkLoginStatus = async () => {
    try {
        const storedUsername = await AsyncStorage.getItem(
            STORAGE_KEYS.USERNAME
        );
        return !!storedUsername;
    } catch (error) {
        console.error("Error checking login status", error);
        return false;
    }
};

export const saveLoginInfo = async (
    _id: string,
    username: string,
    displayName?: string,
    imageURL?: string
) => {
    try {
        await AsyncStorage.setItem(STORAGE_KEYS._ID, _id);
        await AsyncStorage.setItem(STORAGE_KEYS.USERNAME, username);

        if (displayName) {
            await AsyncStorage.setItem(STORAGE_KEYS.DISPLAY_NAME, displayName);
        }

        if (imageURL) {
            await AsyncStorage.setItem(STORAGE_KEYS.IMAGE_URL, imageURL);
        }

        return true;
    } catch (error) {
        console.error("Error saving login information", error);
        return false;
    }
};

export const getStored_id = async () => {
    try {
        return await AsyncStorage.getItem(STORAGE_KEYS._ID);
    } catch (error) {
        console.error("Error retrieving _id", error);
        return null;
    }
};

export const getStoredUsername = async () => {
    try {
        return await AsyncStorage.getItem(STORAGE_KEYS.USERNAME);
    } catch (error) {
        console.error("Error retrieving username", error);
        return null;
    }
};

export const getStoredDisplayName = async () => {
    try {
        return await AsyncStorage.getItem(STORAGE_KEYS.DISPLAY_NAME);
    } catch (error) {
        console.error("Error retrieving display name", error);
        return null;
    }
};

export const getStoredImageUrl = async () => {
    try {
        return await AsyncStorage.getItem(STORAGE_KEYS.IMAGE_URL);
    } catch (error) {
        console.error("Error retrieving image URL", error);
        return null;
    }
};

export const logout = async () => {
    try {
        await AsyncStorage.removeItem(STORAGE_KEYS.USERNAME);
        await AsyncStorage.removeItem(STORAGE_KEYS.DISPLAY_NAME);
        await AsyncStorage.removeItem(STORAGE_KEYS.IMAGE_URL);
        return true;
    } catch (error) {
        console.error("Logout error", error);
        return false;
    }
};
