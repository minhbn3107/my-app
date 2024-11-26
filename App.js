import { StyleSheet, Dimensions } from "react-native";
import Main from "./components/Main";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Player from "./components/Player";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Upload from "./components/Upload";

const Stack = createStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <GestureHandlerRootView style={styles.container}>
                <Stack.Navigator
                    initialRouteName="Home"
                    screenOptions={{
                        cardStyle: { backgroundColor: "transparent" },
                        cardOverlayEnabled: true,
                    }}
                >
                    <Stack.Screen
                        name="Home"
                        component={Main}
                        options={{
                            headerShown: false,
                        }}
                    />
                    <Stack.Screen name="Upload" component={Upload} />
                    <Stack.Screen
                        name="Player"
                        component={Player}
                        options={{
                            presentation: "modal",
                            gestureEnabled: true,
                            gestureDirection: "vertical",
                            gestureResponseDistance:
                                Dimensions.get("window").height,
                            headerShown: false,
                            cardStyle: { backgroundColor: "transparent" },
                            detachPreviousScreen: false,
                            cardOverlayEnabled: true,
                            cardStyleInterpolator: ({ current, layouts }) => ({
                                cardStyle: {
                                    transform: [
                                        {
                                            translateY:
                                                current.progress.interpolate({
                                                    inputRange: [0, 1],
                                                    outputRange: [
                                                        layouts.screen.height,
                                                        0,
                                                    ],
                                                }),
                                        },
                                    ],
                                    opacity: current.progress,
                                },
                                overlayStyle: {
                                    opacity: current.progress.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [0, 0.5],
                                        extrapolate: "clamp",
                                    }),
                                },
                            }),
                            transitionSpec: {
                                open: {
                                    animation: "timing",
                                    config: {
                                        duration: 300,
                                    },
                                },
                                close: {
                                    animation: "timing",
                                    config: {
                                        duration: 300,
                                    },
                                },
                            },
                        }}
                    />
                </Stack.Navigator>
            </GestureHandlerRootView>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "transparent",
    },
});
