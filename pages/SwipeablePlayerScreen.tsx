import { useNavigation } from "@react-navigation/native";
import React, { type PropsWithChildren } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { GestureDetector, Gesture } from "react-native-gesture-handler";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    withTiming,
    runOnJS,
    type SharedValue,
} from "react-native-reanimated";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");
const DISMISS_THRESHOLD = SCREEN_HEIGHT * 0.2;

interface GestureContext {
    y: number;
}

interface SwipeablePlayerScreenProps extends PropsWithChildren {
    onDismiss?: () => void;
}

export const SwipeablePlayerScreen: React.FC<SwipeablePlayerScreenProps> = ({
    children,
    onDismiss,
}) => {
    const translateY: SharedValue<number> = useSharedValue(0);
    const context: SharedValue<GestureContext> = useSharedValue({ y: 0 });
    const overlayOpacity = useSharedValue(1);
    const router = useNavigation();

    const dismissScreen = () => {
        if (onDismiss) {
            onDismiss();
        }
        router.goBack();
    };

    const panGesture = Gesture.Pan()
        .onStart(() => {
            context.value = { y: translateY.value };
        })
        .onUpdate((event) => {
            if (event.translationY < 0) {
                translateY.value = context.value.y + event.translationY * 0.1;
            } else {
                translateY.value = context.value.y + event.translationY;
            }
            overlayOpacity.value = Math.max(
                0,
                1 - translateY.value / SCREEN_HEIGHT
            );
        })
        .onEnd((event) => {
            if (translateY.value > DISMISS_THRESHOLD && event.velocityY > 0) {
                overlayOpacity.value = withTiming(0, { duration: 200 });
                translateY.value = withSpring(
                    SCREEN_HEIGHT,
                    {
                        damping: 20,
                        stiffness: 90,
                        velocity: event.velocityY,
                    },
                    () => {
                        runOnJS(dismissScreen)();
                    }
                );
            } else {
                overlayOpacity.value = withTiming(1, { duration: 200 });
                translateY.value = withSpring(0, {
                    damping: 20,
                    stiffness: 90,
                });
            }
        });

    const containerStyle = useAnimatedStyle(() => ({
        transform: [{ translateY: translateY.value }],
        height: SCREEN_HEIGHT,
    }));

    const overlayStyle = useAnimatedStyle(() => ({
        opacity: overlayOpacity.value,
    }));

    return (
        <View style={styles.wrapper}>
            <Animated.View style={[styles.overlay, overlayStyle]} />
            <GestureDetector gesture={panGesture}>
                <Animated.View style={[styles.container, containerStyle]}>
                    <View style={styles.contentWrapper}>
                        <View style={styles.content}>{children}</View>
                    </View>
                </Animated.View>
            </GestureDetector>
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: "transparent",
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    container: {
        flex: 1,
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "transparent",
    },
    contentWrapper: {
        flex: 1,
        backgroundColor: "transparent",
    },
    content: {
        flex: 1,
        marginTop: 50,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        overflow: "hidden",
        backgroundColor: "transparent",
    },
});
