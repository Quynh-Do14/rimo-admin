import React, { useEffect, useRef, useState } from 'react'

declare global {
    interface Window {
        YT: {
            Player: new (
                elementId: string,
                options: {
                    height: string;
                    width: string;
                    videoId: string;
                    events: {
                        onReady: (event: { target: YT.Player }) => void;
                        onStateChange: (event: { data: number }) => void;
                    };
                }
            ) => YT.Player;
            PlayerState: {
                ENDED: number;
                PLAYING: number;
                PAUSED: number;
                BUFFERING: number;
                CUED: number;
            };
        };
        onYouTubeIframeAPIReady: () => void;
    }

    interface YT {
        Player: YT.Player;
    }

    namespace YT {
        interface Player {
            playVideo: () => void;
            pauseVideo: () => void;
            seekTo: (seconds: number, allowSeekAhead?: boolean) => void;
            getCurrentTime: () => number;
            getPlayerState: () => number;
            getDuration: () => number;
        }
    }
}

type Props = {
    videoId: string | null;
}
const YoutubeVideo = (props: Props) => {
    const { videoId } = props;
    const playerRef = useRef<YT.Player | null>(null);

    const [playerState, setPlayerState] = useState<string>('UNSTARTED');
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (videoId) {
            if (document.querySelector('script[src="https://www.youtube.com/iframe_api"]')) {
                // Script already exists

                initializePlayer();
                return;
            }
            const tag = document.createElement('script');
            tag.src = 'https://www.youtube.com/iframe_api';

            // Try to insert after first script tag, fallback to head
            const firstScriptTag = document.getElementsByTagName('script')[0];
            if (firstScriptTag?.parentNode) {
                firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
            } else {
                document.head.appendChild(tag);
            }

            window.onYouTubeIframeAPIReady = initializePlayer;

            return () => {
                if (intervalRef.current) {
                    clearInterval(intervalRef.current);
                }
            };
        }
        return
    }, [videoId]);

    // Initialize YouTube player
    const initializePlayer = () => {
        if (!window.YT) {
            console.error('YouTube API not loaded');
            return;
        }
        if (videoId) {
            playerRef.current = new window.YT.Player('youtube-player', {
                height: '100%',
                width: '100%',
                videoId: videoId,
                events: {
                    onReady: onPlayerReady,
                    onStateChange: onPlayerStateChange,
                },
            });
        }
    };

    // When player is ready
    const onPlayerReady = (event: { target: YT.Player }) => {

        // Update current time every second
        intervalRef.current = setInterval(() => {
            const time = event.target.getCurrentTime();
        }, 1000);
    };

    // Handle player state changes
    const onPlayerStateChange = (event: { data: number }) => {
        const states = {
            0: 'ENDED',
            1: 'PLAYING',
            2: 'PAUSED',
            3: 'BUFFERING',
            5: 'CUED'
        };
        const newState = states[event.data as keyof typeof states] || 'UNKNOWN';
        setPlayerState(newState);
        console.log("Player state changed to:", newState);
    };



    return (
        <div className="video-container">
            <div id="youtube-player"></div>
        </div>
    )
};

export default YoutubeVideo