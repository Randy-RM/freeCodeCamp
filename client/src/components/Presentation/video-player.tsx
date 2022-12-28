import React from 'react';
import './video-player.css';
import ReactPlayer from 'react-player/file';

export function VideoPlayer(props: { videoLink: string }): JSX.Element {
  const [selectedVideo, setSelectedVideo] = React.useState(props.videoLink);

  React.useEffect(() => {
    setSelectedVideo(props.videoLink);
  }, [props.videoLink]);

  return (
    <>
      <div className='video-player-content'>
        <ReactPlayer
          className='bg-warning video-player'
          width='100%'
          height='100%'
          controls={true}
          url={selectedVideo}
        />
      </div>
    </>
  );
}

VideoPlayer.displayName = 'VideoPlayer';

export default VideoPlayer;
