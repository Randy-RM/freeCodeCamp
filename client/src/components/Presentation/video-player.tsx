import React from 'react';
import './video-player.css';

export function VideoPlayer(): JSX.Element {
  return (
    <>
      <div className='video-player-content'>
        <video className='bg-warning video-player' controls>
          <source
            src='https://videostream.cdn.contentraven.com/crcloud/uploads/content_raven_onboarding_11115/encryptedfile/518331/v1.0/fa2366ff_22_8_2022_18_59_53.mp4?Expires=9671450903&Signature=IH~E87wSWM98TuDWUyojjHUyrQ9HWI6tZ~elcSMV2Yiw-NRngkiarcYBhMM3joF~Kom2LI-zfZAlInW5Bjq9mcL-2jQWoNHnKFpn6EIIExOd863QYzcpt-2u4Y7TZCM74TZlEN8SrSlqO8pcW5pub5pZchlonEOqm98ofSgQRfk_&Key-Pair-Id=APKAILVQOTZN4SHI6YSA'
            type='video/mp4'
          />
          <track
            src='captions_en.vtt'
            kind='captions'
            label='english_captions'
          ></track>
          <track
            src='captions_es.vtt'
            kind='captions'
            label='spanish_captions'
          ></track>
        </video>
      </div>
    </>
  );
}

VideoPlayer.displayName = 'VideoPlayer';

export default VideoPlayer;
