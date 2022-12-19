import React from 'react';
import './video-list.css';

export function VideoList(): JSX.Element {
  return (
    <>
      <div className='video-list-container'>
        <ul>
          <li>
            <h4>Treating prospects like paying customers</h4>
            <p>000:01:15</p>
            <div>Plus d&apos;infos</div>
          </li>
          <li>
            <h4>How creating customer confidence turns to leards</h4>
            <p>000:01:04</p>
            <div>Plus d&apos;infos</div>
          </li>
        </ul>
      </div>
    </>
  );
}

VideoList.displayName = 'VideoList';

export default VideoList;
