import axios from "axios";
import { SelectedFile } from "../components/Upload";

const handleUpdata = async (file: SelectedFile) => {
    const data = new FormData();

    data.append("file", {
        uri: file.uri,
        type: file.mimeType,
        name: file.name,
    } as any);

    data.append("upload_preset", "music-stream-app");

    try {
        const response = await axios.post(
            "https://api.cloudinary.com/v1_1/duckw8jlp/upload",
            data,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );
        console.log(response.data);
        return response.data.secure_url;
    } catch (error) {
        console.error("Upload error:", error);
    }
};

export default handleUpdata;
