import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import YouTube from 'react-youtube';
import qrCode from '../../assets/images/qr-code.png';

const PromoVideo: React.FC = () => {
  const [showBanner, setShowBanner] = useState(false);
  const location = useLocation();
  const playerRef = useRef<any>(null);
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/input');
  }

  const handleVideoPlay = () => {
    const timeoutId = setTimeout(() => {
      setShowBanner(true);
    }, 5000);

    return () => {
      clearTimeout(timeoutId);
    };
  }

  const handleVideoStateChange = (event: any) => {
    if (event.data === YouTube.PlayerState.PAUSED) {
      const currentTime = playerRef.current.getCurrentTime();
      localStorage.setItem('videoTime', JSON.stringify(currentTime));
    }
  };

  const videoOptions = {
    height: '720',
    width: '1280',
    playerVars: {
      autoplay: 1,
      mute: 1 
    },
  };

  useEffect(() => {
    if (playerRef.current) {
      playerRef.current.pauseVideo();
    }

    return () => {
      if (playerRef.current) {
        playerRef.current.playVideo();
      }
    };
  }, [location]);

  return (
    <div>
      <YouTube
        videoId="M7FIvfx5J10"
        opts={videoOptions}
        onPlay={handleVideoPlay}
        onReady={(event) => {
          playerRef.current = event.target;
          const savedTime = JSON.parse(localStorage.getItem('videoTime') || '0');
          playerRef.current.seekTo(savedTime, true);
        }}
        onStateChange={handleVideoStateChange}
      />

      {showBanner && (
        <div style={{position: 'absolute', top: '220px', right: 0}}>
          <button onClick={handleButtonClick} style={{height: '52px', width: '156px'}}>ОК</button>
          <img src={qrCode} alt="Баннер" />
        </div>
      )}
    </div>
  );
}

export default PromoVideo;
