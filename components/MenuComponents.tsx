import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import HomePage from "../pages/HomePage";
import FeedMain from "../pages/Search";
import MusicPage from "../pages/MusicPage";
import ProfilePage from "../pages/ProfilePage";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons/faHome";
import { faHeadphones } from "@fortawesome/free-solid-svg-icons/faHeadphones";
import { faUser } from "@fortawesome/free-solid-svg-icons/faUser";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

type MenuTab = {
    key: string;
    icon: any;
    label: string;
};

const MenuComponent = ({ navigation }) => {
    const ARRAY_LIST_MENU: MenuTab[] = [
        {
            key: "Home",
            icon: faHome,
            label: "Home",
        },
        {
            key: "Search",
            icon: faSearch,
            label: "Search",
        },
        {
            key: "Music",
            icon: faHeadphones,
            label: "Music",
        },
        {
            key: "Profile",
            icon: faUser,
            label: "Profile",
        },
    ];

    const [currentScreen, setCurrentScreen] = useState<string>("Home");

    const renderScreen = () => {
        switch (currentScreen) {
            case "Home":
                return <HomePage navigation={navigation} />;
            case "Search":
                return <FeedMain navigation={navigation} />;
            case "Music":
                return <MusicPage />;
            case "Profile":
                return <ProfilePage navigation={navigation} />;
            default:
                return <HomePage navigation={navigation} />;
        }
    };

    const handleTabPress = (tabKey: string) => {
        setCurrentScreen(tabKey);
    };

    return (
        <>
            <View style={styles.mainView}>{renderScreen()}</View>
            <View style={styles.boxMenu}>
                <View style={styles.bottomTab}>
                    {ARRAY_LIST_MENU.map((tab) => (
                        <TouchableOpacity
                            key={tab.key}
                            onPress={() => handleTabPress(tab.key)}
                            style={[
                                styles.tabItem,
                                currentScreen === tab.key &&
                                    styles.activeTabItem,
                            ]}
                        >
                            <FontAwesomeIcon
                                icon={tab.icon}
                                style={
                                    currentScreen === tab.key
                                        ? styles.activeTabIcon
                                        : styles.styleIcon
                                }
                                size={24}
                            />
                            <Text
                                style={[
                                    styles.tabText,
                                    currentScreen === tab.key &&
                                        styles.activeTabText,
                                ]}
                            >
                                {tab.label}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        backgroundColor: "#ededed",
    },
    boxMenu: {
        width: "100%",
        position: "absolute",
        bottom: 0,
    },
    bottomTab: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        backgroundColor: "#FAFAFA",
        borderTopColor: "#efeded",
        borderTopWidth: 1,
        position: "relative",
        zIndex: 2,
    },
    tabItem: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 12,
    },
    activeTabItem: {},
    tabText: {
        fontSize: 11,
        color: "#474545",
        marginTop: 8,
    },
    styleIcon: {
        color: "#474545",
    },
    activeTabIcon: {
        color: "#6B39F4",
    },
    activeTabText: {
        color: "#6B39F4",
        fontWeight: "700",
        fontSize: 12,
    },
});

export default MenuComponent;
