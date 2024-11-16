// import { create } from "zustand";
// import SoundPlayer from "react-native-sound-player";

// export interface Track {
//     url: string;
//     title: string;
//     artist?: string;
//     artwork?: string;
//     playlist?: string[];
// }

// interface SoundState {
//     isPlaying: boolean;
//     volume: number;
//     loops: number;
//     speed: number;
//     activeTrack: Track | null;
//     play: (track: Track) => Promise<void>;
//     pause: () => Promise<void>;
//     resume: () => Promise<void>;
//     setLoops: (newLoop: number) => void;
//     setVolume: (volume: number) => void;
//     setActiveTrack: (track: Track) => void;
//     onFinishedPlaying: () => void;
// }

// export const loopOrder: number[] = [0, 1, -1];

// const logAction = (action: string, details?: any) => {
//     const timestamp = new Date().toISOString();
//     console.log(
//         `[Sound Player ${timestamp}] ${action}`,
//         details ? details : ""
//     );
// };

// // Initialize event listeners
// const initializeSoundPlayer = () => {
//     try {
//         // Finish playing event
//         SoundPlayer.addEventListener("FinishedPlaying", ({ success }) => {
//             logAction("Finished playing", { success });
//             const { onFinishedPlaying } = useSoundStore.getState();
//             onFinishedPlaying();
//         });

//         // Error event
//         SoundPlayer.addEventListener(
//             "FinishedLoadingURL",
//             ({ success, url }) => {
//                 logAction("Finished loading URL", { success, url });
//             }
//         );
//     } catch (error) {
//         console.error("Failed to initialize sound player:", error);
//     }
// };

// export const useSoundStore = create<SoundState>((set, get) => ({
//     isPlaying: false,
//     volume: 1,
//     loops: 0,
//     speed: 1,
//     activeTrack: null,

//     play: async (track: Track) => {
//         try {
//             logAction("Starting playback", { url: track.url });

//             // Stop any currently playing audio
//             await SoundPlayer.stop();

//             // Load and play the new track
//             await SoundPlayer.loadUrl(track.url);

//             // Set volume
//             SoundPlayer.setVolume(get().volume);

//             // Handle looping
//             if (get().loops === -1) {
//                 SoundPlayer.setNumberOfLoops(0);
//             } else {
//                 SoundPlayer.play();
//             }

//             // Update state
//             set({ activeTrack: track, isPlaying: true });
//             logAction("Playback started", { url: track.url });
//         } catch (error) {
//             logAction("Playback failed", { url: track.url, error });
//             console.error("Failed to play sound:", error);
//         }
//     },

//     pause: async () => {
//         try {
//             logAction("Pausing playback");
//             await SoundPlayer.pause();
//             set({ isPlaying: false });
//             logAction("Playback paused");
//         } catch (error) {
//             logAction("Failed to pause playback", { error });
//             console.error("Failed to pause sound:", error);
//         }
//     },

//     resume: async () => {
//         try {
//             logAction("Resuming playback");
//             SoundPlayer.setVolume(get().volume);
//             await SoundPlayer.resume();
//             set({ isPlaying: true });
//             logAction("Playback resumed");
//         } catch (error) {
//             logAction("Failed to resume playback", { error });
//             console.error("Failed to resume sound:", error);
//         }
//     },

//     setLoops: (newLoop: number) => {
//         set({ loops: newLoop });
//     },

//     setVolume: async (newVolume: number) => {
//         logAction("Volume changed", {
//             previousVolume: get().volume,
//             newVolume,
//         });
//         set({ volume: newVolume });
//         SoundPlayer.setVolume(newVolume);
//     },

//     setActiveTrack: (track: Track) => set({ activeTrack: track }),

//     onFinishedPlaying: () => {
//         const { loops, setLoops } = get();
//         if (loops === 1) {
//             setLoops(0);
//             SoundPlayer.play();
//         } else if (loops === -1) {
//             SoundPlayer.play();
//         }
//     },
// }));

// // Initialize sound player when the store is created
// initializeSoundPlayer();

// // Clean up function to remove event listeners
// export const cleanup = () => {
//     SoundPlayer.unmount();
// };
import { create } from "zustand";
import { Audio } from "expo-av";

export type Track = {
    url: string;
    title: string;
    artist?: string;
    artwork?: string;
    rating?: number;
    playlist: string[];
};

interface SoundState {
    isPlaying: boolean;
    volume: number;
    loops: number;
    speed: number;
    activeTrack: Track | null;
    duration: number;
    positionMillis: number;
    isLooping: boolean;
    isLoading: boolean;
    play: (track: Track) => Promise<void>;
    pause: () => Promise<void>;
    resume: () => Promise<void>;
    seek: (seconds: number) => Promise<void>;
    setLoops: (newLoop: number) => void;
    setVolume: (volume: number) => void;
    setActiveTrack: (track: Track) => void;
}

export const loopOrder: number[] = [0, 1, -1];
let playingNow = false;
export let sound: Audio.Sound | null = null;

const unloadSound = async () => {
    if (sound) {
        console.log("Unloading sound...");
        await sound.unloadAsync();
        sound = null;
    }
};

const initializeSoundPlayer = () => {
    if (sound) {
        sound.setOnPlaybackStatusUpdate((status) => {
            if (status.isLoaded) {
                useSoundStore.setState({
                    duration: status.durationMillis! / 1000,
                    positionMillis: status.positionMillis / 1000,
                    isLooping: status.isLooping,
                    isLoading: status.isLoaded,
                });
            }
        });
    }
};

export const useSoundStore = create<SoundState>((set, get) => ({
    isPlaying: false,
    volume: 1,
    loops: 0,
    speed: 1,
    activeTrack: null,
    duration: 0,
    positionMillis: 0,
    isLooping: false,
    isLoading: false,

    play: async (track: Track) => {
        if (playingNow) return;

        playingNow = true;
        console.log("Attempting to play track:", track);
        try {
            await unloadSound();
            const { sound: newSound } = await Audio.Sound.createAsync(
                { uri: track.url },
                {
                    volume: get().volume,
                    shouldPlay: true,
                    isLooping: get().loops === -1,
                }
            );
            sound = newSound;

            if (get().loops === 1) {
                sound.setIsLoopingAsync(false);
            }

            initializeSoundPlayer();
            set({ activeTrack: track, isPlaying: true });
            console.log("Playing track:", track.title);
        } catch (error) {
            console.error("Failed to play sound:", error);
        } finally {
            playingNow = false; // Unlock play action
        }
    },

    pause: async () => {
        if (sound) {
            console.log("Pausing sound...");
            await sound.pauseAsync();
            set({ isPlaying: false });
        }
    },

    resume: async () => {
        if (sound) {
            console.log("Resuming sound...");
            await sound.playAsync();
            set({ isPlaying: true });
        }
    },

    seek: async (seconds: number) => {
        if (sound) {
            console.log(`Seeking to ${seconds} seconds...`);
            await sound.setPositionAsync(seconds * 1000);
            set({ positionMillis: seconds });
        }
    },

    setLoops: (newLoop: number) => {
        console.log("Setting loop mode to:", newLoop);
        set({ loops: newLoop });
        if (sound) {
            sound.setIsLoopingAsync(newLoop === -1 || newLoop === 1);
        }
    },

    setVolume: (newVolume: number) => {
        console.log("Setting volume to:", newVolume);
        set({ volume: newVolume });
        if (sound) {
            sound.setVolumeAsync(newVolume);
        }
    },

    setActiveTrack: (track: Track) => {
        console.log("Setting active track:", track);
        set({ activeTrack: track });
    },
}));
