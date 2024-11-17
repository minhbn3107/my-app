export type Track = {
    url: string;
    title: string;
    artist?: string;
    artwork?: string;
    rating?: number;
    playlist?: string[];
};

export interface PlayerButtonProps {
    iconSize?: number;
}

import { create } from "zustand";
import { Audio } from "expo-av";

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
    queue: Track[];
    originalQueue: Track[];
    currentTrackIndex: number;
    canNext: boolean;
    canPrevious: boolean;
    isShuffled: boolean;
    play: (track: Track, playlist?: Track[]) => Promise<void>;
    pause: () => Promise<void>;
    resume: () => Promise<void>;
    seek: (seconds: number) => Promise<void>;
    setLoops: (newLoop: number) => void;
    setVolume: (volume: number) => void;
    setActiveTrack: (track: Track) => void;
    next: () => Promise<void>;
    previous: () => Promise<void>;
    addToQueue: (track: Track) => void;
    removeFromQueue: (index: number) => void;
    clearQueue: () => void;
    updateNavigationState: () => void;
    toggleShuffle: () => void;
}

let playingNow = false;
let sound: Audio.Sound | null = null;

const unloadSound = async () => {
    if (sound) {
        console.log("🔄 Unloading sound...");
        await sound.unloadAsync();
        sound = null;
    }
};

const createNewSound = async (
    trackUrl: string,
    volume: number,
    isLooping: boolean
): Promise<Audio.Sound> => {
    const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: trackUrl },
        { volume, shouldPlay: true, isLooping }
    );
    return newSound;
};

const shuffleArray = (array: Track[]): Track[] => {
    if (!array || array.length <= 1) return array;

    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));

        const temp = shuffled[i];
        shuffled[i] = shuffled[j];
        shuffled[j] = temp;
    }
    return shuffled;
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
    queue: [],
    originalQueue: [],
    currentTrackIndex: -1,
    canNext: false,
    canPrevious: false,
    isShuffled: false,

    updateNavigationState: () => {
        const { queue, currentTrackIndex } = get();
        const canNext = currentTrackIndex < queue.length - 1;
        const canPrevious = currentTrackIndex > 0;

        set({ canNext, canPrevious });
        console.log(
            `🚦 Navigation state - Next: ${canNext}, Previous: ${canPrevious}`
        );
    },

    toggleShuffle: () => {
        const { queue, originalQueue, activeTrack, isShuffled } = get();

        if (!isShuffled) {
            const originalQueueToSave = isShuffled ? originalQueue : [...queue];

            const currentTrackIndex = queue.findIndex(
                (track) => track.url === activeTrack?.url
            );
            const remainingTracks = queue.filter(
                (_, index) => index !== currentTrackIndex
            );
            const shuffledRemaining = shuffleArray(remainingTracks);

            const newQueue = [...shuffledRemaining];
            if (currentTrackIndex !== -1) {
                newQueue.splice(currentTrackIndex, 0, queue[currentTrackIndex]);
            }

            console.log("🎲 Shuffle enabled");
            set({
                queue: newQueue,
                originalQueue: originalQueueToSave,
                isShuffled: true,
                currentTrackIndex: currentTrackIndex,
            });
        } else {
            console.log("🎲 Shuffle disabled");
            const currentTrackIndex = originalQueue.findIndex(
                (track) => track.url === activeTrack?.url
            );
            set({
                queue: [...originalQueue],
                isShuffled: false,
                currentTrackIndex: currentTrackIndex,
            });
        }

        get().updateNavigationState();
    },

    play: async (track: Track, playlist?: Track[]) => {
        if (playingNow) {
            console.log("⚠️ Already playing");
            return;
        }

        playingNow = true;
        console.log("▶️ Playing:", track.title);

        try {
            await unloadSound();
            sound = await createNewSound(
                track.url,
                get().volume,
                get().loops === -1
            );

            if (sound) {
                sound.setOnPlaybackStatusUpdate((status) => {
                    if (status.isLoaded) {
                        const currentLoops = get().loops;

                        set({
                            duration: status.durationMillis! / 1000,
                            positionMillis: status.positionMillis / 1000,
                            isLooping: status.isLooping,
                            isLoading: false,
                        });

                        if (status.didJustFinish) {
                            console.log("🎵 Track finished");

                            if (currentLoops === 1) {
                                console.log(
                                    "🔄 Single loop completed, disabling loops"
                                );
                                set({ loops: 0 });
                                sound?.setIsLoopingAsync(false);
                            }

                            if (!status.isLooping) {
                                const state = get();
                                if (state.canNext) {
                                    state.next();
                                }
                            }
                        }
                    }
                });

                if (playlist) {
                    const trackIndex = playlist.findIndex(
                        (t) => t.url === track.url
                    );
                    console.log(
                        `📋 Queue: ${playlist.length} tracks, index: ${trackIndex}`
                    );
                    set({
                        queue: playlist,
                        originalQueue: [...playlist],
                        currentTrackIndex: Math.max(0, trackIndex),
                        activeTrack: track,
                        isPlaying: true,
                        isLoading: false,
                        isShuffled: false,
                    });
                } else {
                    console.log("📌 Single track mode");
                    set({
                        queue: [track],
                        originalQueue: [track],
                        currentTrackIndex: 0,
                        activeTrack: track,
                        isPlaying: true,
                        isLoading: false,
                        isShuffled: false,
                    });
                }

                get().updateNavigationState();
            }
        } catch (error) {
            console.error("❌ Playback error:", error);
            set({ isLoading: false });
        } finally {
            playingNow = false;
        }
    },

    next: async () => {
        const { queue, currentTrackIndex, canNext } = get();
        if (!canNext) {
            console.log("⚠️ No next track available");
            return;
        }

        const nextIndex = currentTrackIndex + 1;
        const nextTrack = queue[nextIndex];
        console.log(`⏭️ Next track: ${nextTrack.title}`);

        try {
            set({ isLoading: true });
            await unloadSound();
            sound = await createNewSound(
                nextTrack.url,
                get().volume,
                get().loops === -1
            );

            set({
                currentTrackIndex: nextIndex,
                activeTrack: nextTrack,
                isPlaying: true,
                isLoading: false,
            });

            get().updateNavigationState();
        } catch (error) {
            console.error("❌ Next track error:", error);
            set({ isLoading: false });
        }
    },

    previous: async () => {
        const { queue, currentTrackIndex, canPrevious } = get();
        if (!canPrevious) {
            console.log("⚠️ No previous track available");
            return;
        }

        const previousIndex = currentTrackIndex - 1;
        const previousTrack = queue[previousIndex];
        console.log(`⏮️ Previous track: ${previousTrack.title}`);

        try {
            set({ isLoading: true });
            await unloadSound();
            sound = await createNewSound(
                previousTrack.url,
                get().volume,
                get().loops === -1
            );

            set({
                currentTrackIndex: previousIndex,
                activeTrack: previousTrack,
                isPlaying: true,
                isLoading: false,
            });

            get().updateNavigationState();
        } catch (error) {
            console.error("❌ Previous track error:", error);
            set({ isLoading: false });
        }
    },

    pause: async () => {
        if (sound) {
            console.log("⏸️ Paused");
            await sound.pauseAsync();
            set({ isPlaying: false });
        }
    },

    resume: async () => {
        if (sound) {
            console.log("▶️ Resumed");
            await sound.playAsync();
            set({ isPlaying: true });
        }
    },

    seek: async (seconds: number) => {
        if (sound) {
            console.log(`⏩ Seek: ${seconds}s`);
            await sound.setPositionAsync(seconds * 1000);
            set({ positionMillis: seconds });
        }
    },

    setLoops: (newLoop: number) => {
        console.log("🔁 Loop mode:", newLoop);
        set({ loops: newLoop });
        if (sound) {
            sound.setIsLoopingAsync(newLoop === -1 || newLoop === 1);
        }
    },

    setVolume: (newVolume: number) => {
        console.log("🔊 Volume:", newVolume);
        set({ volume: newVolume });
        if (sound) {
            sound.setVolumeAsync(newVolume);
        }
    },

    setActiveTrack: (track: Track) => {
        console.log("📌 Active track:", track.title);
        set({ activeTrack: track });
    },

    addToQueue: (track: Track) => {
        console.log("📝 Queue add:", track.title);
        set((state) => ({
            queue: [...state.queue, track],
            originalQueue: [...state.originalQueue, track],
        }));
        get().updateNavigationState();
    },

    removeFromQueue: (index: number) => {
        console.log("🗑️ Queue remove index:", index);
        set((state) => {
            const newQueue = [...state.queue];
            const newOriginalQueue = [...state.originalQueue];
            newQueue.splice(index, 1);
            newOriginalQueue.splice(index, 1);

            const newIndex =
                index < state.currentTrackIndex
                    ? state.currentTrackIndex - 1
                    : state.currentTrackIndex;

            return {
                queue: newQueue,
                originalQueue: newOriginalQueue,
                currentTrackIndex: Math.min(newIndex, newQueue.length - 1),
            };
        });
        get().updateNavigationState();
    },

    clearQueue: () => {
        console.log("🧹 Queue cleared");
        set({
            queue: [],
            originalQueue: [],
            currentTrackIndex: -1,
            isShuffled: false,
        });
        get().updateNavigationState();
    },
}));
