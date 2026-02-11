import { Image } from "antd";
import { useEffect, useState } from "react";
import { extractYouTubeId } from "../../helper/helper";
type ThumbnailQuality = 'default' | 'mqdefault' | 'hqdefault' | 'sddefault' | 'maxresdefault';

type Props = {
    name: string
    url: string;
    quality?: ThumbnailQuality;
}

const YouTubeThumbnail = (props: Props) => {
    const {
        name,
        url,
        quality = 'maxresdefault'
    } = props;
    const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        try {
            const videoId = extractYouTubeId(url);
            if (!videoId) {
                throw new Error('Invalid YouTube URL');
            }

            // Construct thumbnail URL
            const thumbUrl = `https://img.youtube.com/vi/${videoId}/${quality}.jpg`;
            setThumbnailUrl(thumbUrl);
            setError(null);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to extract thumbnail');
            setThumbnailUrl(null);
        }
    }, [url, quality]);

    if (error) {
        return <div className="error">{error}</div>;
    }

    if (!thumbnailUrl) {
        return <div className="loading"></div>;
    }

    return (
        <div className="youtube-thumbnail">
            <Image
                src={thumbnailUrl}
                alt={name}
                width={400}
            />
        </div>
    );
};

export default YouTubeThumbnail;