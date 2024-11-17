import { useSoundStore } from "../hooks/useSoundStore";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ComponentProps } from "react";
import { match } from "ts-pattern";
type IconProps = Omit<ComponentProps<typeof MaterialCommunityIcons>, "name">;
type IconName = ComponentProps<typeof MaterialCommunityIcons>["name"];
export const PlayerRepeatToggle = ({ ...iconProps }: IconProps) => {
    const { loops, setLoops } = useSoundStore();
    const toggleRepeatMode = () => {
        const nextLoop = loops === 0 ? 1 : loops === 1 ? -1 : 0;
        setLoops(nextLoop);
    };
    const icon = match(loops)
        .returnType<IconName>()
        .with(0, () => "repeat-off")
        .with(1, () => "repeat-once")
        .with(-1, () => "repeat")
        .otherwise(() => "repeat-off");
    return (
        <MaterialCommunityIcons
            name={icon}
            onPress={toggleRepeatMode}
            color="#fff"
            {...iconProps}
        />
    );
};
