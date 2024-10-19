import React, { useRef, useEffect } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

interface VideoItem {
  url: string;
  title: string;
  start?: number;
  end?: number;
}

const VideoCarousel: React.FC = () => {
  const videos: VideoItem[] = [
    { url: "https://youtu.be/FfVBOexTMTA?si=YxAlfbfvMw8p3vsJ", title: "Local Video 1", start: 3, end: 10 },
    { url: "https://youtu.be/FfVBOexTMTA?si=YxAlfbfvMw8p3vsJ", title: "Local Video 2", start: 6, end: 12 }
  ];

  const videoRefs = useRef<HTMLVideoElement[]>([]);

  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (video && videos[index]) {
        video.currentTime = videos[index].start || 0;

        const handleTimeUpdate = () => {
          if (videos[index].end !== undefined && video.currentTime >= videos[index]!.end!) {
            video.pause();
          }
        };

        video.addEventListener('timeupdate', handleTimeUpdate);

        return () => {
          video.removeEventListener('timeupdate', handleTimeUpdate);
        };
      }
    });
  }, []);

  return (
    <div style={{ width: "100%", margin: "auto" }}>
      <Carousel showThumbs={false} autoPlay infiniteLoop>
        {videos.map((video, index) => (
          <div key={index}>
            <video
              width="100%"
              height="500"
              controls
              ref={el => {
                if (el) videoRefs.current[index] = el;
              }}
            >
              <source src={video.url} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default VideoCarousel;
