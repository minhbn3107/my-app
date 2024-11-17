import { Track } from "../hooks/useSoundStore";

export type Playlist = {
    name: string;
    tracks: Track[];
    artworkPreview: string;
};
export type Artist = {
    name: string;
    tracks: Track[];
};
