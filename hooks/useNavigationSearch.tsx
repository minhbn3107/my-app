import { useLayoutEffect, useState } from "react";
import { SearchBarProps } from "react-native-screens";
import { useNavigation } from "@react-navigation/native";
const defaultSearchOptions: SearchBarProps = {
    tintColor: "#1ce5ff",
    textColor: "#000",
    hideWhenScrolling: false,
    headerIconColor: "#000",
    hintTextColor: "#000",
    barTintColor: "#9ca3af",
};
export const useNavigationSearch = ({
    searchBarOptions,
}: {
    searchBarOptions?: SearchBarProps;
}) => {
    const [search, setSearch] = useState("");
    const navigation = useNavigation();
    const handleOnChangeText: SearchBarProps["onChangeText"] = ({
        nativeEvent: { text },
    }) => {
        setSearch(text);
    };
    useLayoutEffect(() => {
        navigation.setOptions({
            headerSearchBarOptions: {
                ...defaultSearchOptions,
                ...searchBarOptions,
                onChangeText: handleOnChangeText,
            },
        });
    }, [navigation, searchBarOptions]);
    return search;
};
